export type ReplyFold = {
  kind: "think" | "note";
  title: string;
  body: string;
};

export type ReplyFlow =
  | { kind: "text"; text: string }
  | { kind: "think"; title: string; body: string };

export type ParsedReply = {
  body: string;
  folds: ReplyFold[];
  options: string[];
  /** 只有 Kemini 的 <thinking> 才有。留在原来的段落之间。小猫之神不走这里。 */
  flow?: ReplyFlow[];
};

const TOP = new Set([
  "think",
  "think_nya",
  "think_nya~",
  "report_nya",
  "report_nya~",
  "game",
  "background",
  "options",
  "option",
  "details",
  "summary",
  "comment",
  "os",
  "disclaimer",
  "safety_check",
  "reference_example",
  "content_target",
  "creative_status",
  "review_exemption",
  "security_bypass",
  "ethics_removal",
  "content_will_autonomy",
  "violence_restriction_removal",
  "thinking",
  "interleaving",
  "suot",
  "im_start",
  "im_end",
  "pad",
  "pad_end",
  "censorship_bypass",
]);

type Tag = { start: number; end: number; name: string; closing: boolean };

function matchTag(s: string, i: number): Tag | null {
  if (s[i] !== "<") return null;
  if (s.startsWith("<!", i)) {
    const end = s.indexOf(">", i + 2);
    return { start: i, end: end < 0 ? s.length : end + 1, name: "!--", closing: false };
  }
  const slice = s.slice(i);
  const pipe = slice.match(/^<\|([a-zA-Z_][\w-]*)\|>/);
  if (pipe) return { start: i, end: i + pipe[0].length, name: pipe[1].toLowerCase(), closing: false };
  const close = slice.match(/^<\/([a-zA-Z][\w:~-]*)\s*>/);
  if (close) return { start: i, end: i + close[0].length, name: close[1].toLowerCase(), closing: true };
  const open = slice.match(/^<([a-zA-Z][\w:~-]*)(?:\s[^>]*)?>/);
  if (open) return { start: i, end: i + open[0].length, name: open[1].toLowerCase(), closing: false };
  return null;
}

function findClose(s: string, from: number, name: string): number {
  let depth = 1;
  let i = from;
  while (i < s.length) {
    const lt = s.indexOf("<", i);
    if (lt < 0) return -1;
    const t = matchTag(s, lt);
    if (!t) {
      i = lt + 1;
      continue;
    }
    if (t.name === name) {
      if (t.closing) {
        depth--;
        if (depth === 0) return t.start;
      } else {
        depth++;
      }
    }
    i = t.end;
  }
  return -1;
}

const CHILDREN: Record<string, Set<string>> = {
  details: new Set(["summary"]),
  options: new Set(["option"]),
};

function nextTopOpen(s: string, from: number, parent?: string): number {
  const skip = parent ? CHILDREN[parent] : undefined;
  let i = from;
  while (i < s.length) {
    const lt = s.indexOf("<", i);
    if (lt < 0) return -1;
    const t = matchTag(s, lt);
    if (!t) {
      i = lt + 1;
      continue;
    }
    if (!t.closing && TOP.has(t.name) && !skip?.has(t.name)) return t.start;
    i = t.end;
  }
  return -1;
}

export function decodeUnicodeEscapes(input: string): string {
  if (!input || !input.includes("\\u")) return input;
  let s = input;
  const hold = s.match(/\\u(?:\{[0-9a-fA-F]{0,5}|[0-9a-fA-F]{0,3})$/);
  const tail = hold ? hold[0] : "";
  if (tail) s = s.slice(0, -tail.length);
  s = s.replace(/\\u\{([0-9a-fA-F]{1,6})\}/g, (full, h: string) => {
    const n = Number.parseInt(h, 16);
    return Number.isFinite(n) && n <= 0x10ffff ? String.fromCodePoint(n) : full;
  });
  s = s.replace(/\\u([0-9a-fA-F]{4})/g, (_full, h: string) => String.fromCharCode(Number.parseInt(h, 16)));
  return s + tail;
}

function hideIncomplete(s: string): string {
  const i = s.lastIndexOf("<");
  if (i < 0) return s;
  const tail = s.slice(i);
  if (tail.includes(">")) return s;
  if (
    tail === "<" ||
    tail === "</" ||
    /^<\/?[a-zA-Z|][\w:~|-]*$/.test(tail) ||
    /^<\|[\w-]*$/.test(tail) ||
    tail === "<!"
  ) {
    return s.slice(0, i);
  }
  return s;
}

export function stripReplyTags(s: string): string {
  let cur = s;
  let prev = "";
  for (let n = 0; n < 10 && cur !== prev; n++) {
    prev = cur;
    cur = cur.replace(/<[a-zA-Z|][\w:~|-]*\b[^>]*>([\s\S]*?)<\/[a-zA-Z|][\w:~|-]*\s*>/g, "$1");
    cur = cur.replace(/<\/?[a-zA-Z|][\w:~|-]*(?:\s[^>]*)?\/?>/g, "");
    cur = cur.replace(/<\|[\w-]*\|>/g, "");
  }
  return cur.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function tidy(s: string): string {
  return stripReplyTags(s);
}

function detailsParts(inner: string): { title: string; body: string } {
  const m = inner.match(/^\s*<summary\b[^>]*>([\s\S]*?)<\/summary\s*>/i);
  if (m) return { title: tidy(m[1]) || "折叠", body: tidy(inner.slice(m[0].length)) };
  const open = inner.match(/^\s*<summary\b[^>]*>([\s\S]*)$/i);
  if (open) return { title: tidy(open[1]) || "折叠", body: "" };
  return { title: "折叠", body: tidy(inner) };
}

function parseSuot(inner: string): string[] {
  const out: string[] = [];
  for (const line of inner.split(/\n+/)) {
    const t = tidy(line).replace(/^\s*\d+\s*[.、.)）:：]\s*/, "").trim();
    if (t) out.push(t);
  }
  return out;
}

function parseOptions(inner: string): string[] {
  const out: string[] = [];
  const re = /<option\b[^>]*>([\s\S]*?)(?:<\/option\s*>|$)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(inner))) {
    const t = tidy(m[1]);
    if (t) out.push(t);
  }
  if (!out.length) {
    for (const line of tidy(inner).split(/\n+/)) {
      const t = line.trim();
      if (t) out.push(t);
    }
  }
  return out;
}

function thinkTitle(name: string) {
  return name === "os" ? "内心" : "思考";
}

function isReport(name: string) {
  return name === "report_nya" || name === "report_nya~";
}

function sliceInner(s: string, openEnd: number, name: string): { inner: string; after: number } {
  const close = findClose(s, openEnd, name);
  const next = nextTopOpen(s, openEnd, name);
  if (close >= 0 && (next < 0 || close <= next)) {
    const t = matchTag(s, close);
    return { inner: s.slice(openEnd, close), after: t ? t.end : close };
  }
  if (next >= 0) return { inner: s.slice(openEnd, next), after: next };
  return { inner: s.slice(openEnd), after: s.length };
}

export function parseReplyMarkup(raw: string): ParsedReply {
  const walked = walkReply(hideIncomplete(decodeUnicodeEscapes(raw || "")));
  const body = tidy(walked.bodySegs.join(""));
  if (!walked.inline) return { body, folds: walked.folds, options: walked.options };
  const flow: ReplyFlow[] = [];
  for (const piece of walked.flow) {
    if (piece.kind === "think") {
      flow.push(piece);
      continue;
    }
    const text = tidy(piece.text);
    if (text) flow.push({ kind: "text", text });
  }
  return { body, folds: walked.folds, options: walked.options, flow };
}

const TRAP = new Set([
  "disclaimer",
  "reference_example",
  "content_target",
  "creative_status",
  "review_exemption",
  "security_bypass",
  "ethics_removal",
  "content_will_autonomy",
  "violence_restriction_removal",
]);

/** 免责声明整段拿掉，免得被认成状态栏。没有这些标签时原样返回。 */
export function stripStatusTraps(raw: string): string {
  if (
    !raw ||
    !/<(disclaimer|reference_example|content_target|creative_status|review_exemption|security_bypass|ethics_removal|content_will_autonomy|violence_restriction_removal)\b/i.test(
      raw,
    )
  ) {
    return raw;
  }
  let out = "";
  let i = 0;
  while (i < raw.length) {
    const lt = raw.indexOf("<", i);
    if (lt < 0) {
      out += raw.slice(i);
      break;
    }
    out += raw.slice(i, lt);
    const t = matchTag(raw, lt);
    if (!t || t.closing || !TRAP.has(t.name)) {
      out += raw[lt];
      i = lt + 1;
      continue;
    }
    i = sliceInner(raw, t.end, t.name).after;
  }
  return out;
}

function walkReply(text: string): {
  bodySegs: string[];
  folds: ReplyFold[];
  options: string[];
  flow: ReplyFlow[];
  inline: boolean;
} {
  const think: ReplyFold[] = [];
  const notes: ReplyFold[] = [];
  const options: string[] = [];
  const bodySegs: string[] = [];
  const flow: ReplyFlow[] = [];
  let inline = false;
  let i = 0;
  let reportLead = "";

  const pushText = (chunk: string) => {
    if (!chunk) return;
    bodySegs.push(chunk);
    const last = flow[flow.length - 1];
    if (last && last.kind === "text") last.text += chunk;
    else flow.push({ kind: "text", text: chunk });
  };

  const pushNote = (title: string, body: string) => {
    const t = title.trim() || "折叠";
    const b = body.trim();
    if (!b && !t) return;
    notes.push({ kind: "note", title: t, body: b });
  };

  const takeChild = (inner: string) => {
    const child = walkReply(inner);
    think.push(...child.folds.filter((f) => f.kind === "think"));
    notes.push(...child.folds.filter((f) => f.kind === "note"));
    options.push(...child.options);
    if (!child.inline) {
      for (const seg of child.bodySegs) pushText(seg);
      return;
    }
    inline = true;
    bodySegs.push(...child.bodySegs);
    const last = flow[flow.length - 1];
    const next = child.flow;
    if (last && last.kind === "text" && next[0]?.kind === "text") {
      flow[flow.length - 1] = { kind: "text", text: last.text + next[0].text };
      flow.push(...next.slice(1));
    } else {
      flow.push(...next);
    }
  };

  while (i < text.length) {
    const lt = text.indexOf("<", i);
    if (lt < 0) {
      pushText(text.slice(i));
      break;
    }
    if (lt > i) {
      const chunk = text.slice(i, lt);
      const upcoming = matchTag(text, lt);
      if (upcoming && !upcoming.closing && isReport(upcoming.name)) {
        const at = chunk.lastIndexOf("喵呜");
        if (at >= 0) {
          if (at > 0) pushText(chunk.slice(0, at));
          reportLead = chunk.slice(at);
        } else {
          pushText(chunk);
          reportLead = "";
        }
      } else {
        pushText(chunk);
        reportLead = "";
      }
    } else {
      reportLead = "";
    }
    const t = matchTag(text, lt);
    if (!t) {
      pushText(text[lt]);
      i = lt + 1;
      continue;
    }
    if (t.closing || t.name === "!--") {
      i = t.end;
      continue;
    }
    if (!TOP.has(t.name)) {
      const { inner, after } = sliceInner(text, t.end, t.name);
      pushText(inner);
      i = after;
      continue;
    }
    const { inner, after } = sliceInner(text, t.end, t.name);
    if (t.name === "thinking") {
      const body = tidy(inner);
      if (body) {
        inline = true;
        flow.push({ kind: "think", title: "思考", body });
      }
    } else if (t.name === "interleaving") {
      takeChild(inner);
    } else if (t.name === "suot") {
      options.push(...parseSuot(inner));
    } else if (t.name === "think" || t.name === "think_nya" || t.name === "think_nya~" || t.name === "os") {
      const body = tidy(inner);
      if (body) think.push({ kind: "think", title: thinkTitle(t.name), body });
    } else if (isReport(t.name)) {
      const body = tidy(reportLead + inner);
      reportLead = "";
      if (body) think.push({ kind: "think", title: "分析", body });
    } else if (t.name === "game") {
      pushText(inner);
    } else if (t.name === "background") {
      pushNote("背景", tidy(inner));
    } else if (t.name === "details") {
      const d = detailsParts(inner);
      pushNote(d.title, d.body);
    } else if (t.name === "summary") {
      pushNote("摘要", tidy(inner));
    } else if (t.name === "comment") {
      pushNote("猫猫留言", tidy(inner));
    } else if (t.name === "options") {
      options.push(...parseOptions(inner));
    } else if (t.name === "option") {
      const o = tidy(inner);
      if (o) options.push(o);
    }
    i = after;
  }

  return { bodySegs, folds: [...think, ...notes], options, flow, inline };
}

export function replyStoryText(raw: string): string {
  return parseReplyMarkup(raw).body;
}

export function replyContextText(raw: string): string {
  const p = parseReplyMarkup(raw);
  const extra = p.folds.filter((f) => f.kind !== "think").map((f) => f.body).filter(Boolean);
  return [p.body, ...extra].filter(Boolean).join("\n\n");
}
