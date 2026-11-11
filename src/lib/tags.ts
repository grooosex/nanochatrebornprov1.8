const ZH_FIX: Record<string, string> = {
  solo: "单人",
  "1girl": "1个女孩",
  "1boy": "1个男孩",
  "2girls": "2个女孩",
  "multiple girls": "多个女孩",
  breasts: "胸部",
  "looking at viewer": "看向观众",
  "commentary request": "求评论",
  commentary: "评论",
  highres: "高分辨率",
  absurdres: "超高分辨率",
  "open mouth": "张嘴",
  "closed mouth": "闭嘴",
  "large breasts": "巨乳",
  "small breasts": "贫乳",
  "medium breasts": "中等胸部",
  navel: "肚脐",
  panties: "内裤",
  pussy: "小穴",
  penis: "阴茎",
  ass: "臀部",
  nude: "裸体",
  hetero: "男女",
  sex: "性交",
  sitting: "坐着",
  standing: "站立",
  lying: "躺着",
  "cowboy shot": "七分身",
  "upper body": "上半身",
  "full body": "全身",
  "from behind": "从后方",
  "from side": "侧面",
  "from above": "俯视",
  "from below": "仰视",
  "looking back": "回眸",
  "spread legs": "张开腿",
  "animal ears": "兽耳",
  "cat ears": "猫耳",
  tail: "尾巴",
  blush: "脸红",
  smile: "微笑",
  nipples: "乳头",
  uncensored: "无码",
  censored: "有码",
  cum: "精液",
  vaginal: "阴道插入",
  anal: "肛交",
  fellatio: "口交",
  paizuri: "乳交",
  missionary: "传教士",
  doggystyle: "后入",
  "cowgirl position": "骑乘",
  ahegao: "阿黑颜",
  bondage: "捆绑",
  tentacles: "触手",
  "heart-shaped pupils": "爱心瞳",
  "tongue out": "吐舌",
  sweat: "出汗",
  "steaming body": "热气",
  "pussy juice": "爱液",
  "female ejaculation": "潮吹",
  "object insertion": "物体插入",
  "anal object insertion": "肛门异物插入",
  "anus peek": "肛门窥视",
  "after anal": "肛交后",
  "anal beads": "肛珠",
  "anal tail": "尾巴肛塞",
  "anal fingering": "肛门指交",
  anus: "肛门",
  holding: "手持",
  fang: "虎牙",
  "simple background": "简单背景",
  "white background": "白背景",
  original: "原创",
  translated: "已翻译",
  "bad id": "错误ID",
  "bad pixiv id": "错误pixiv ID",
};

const EXTRA_GLOSS: Record<string, string> = {
  "suction tentacles": "吸盘触手",
  mucus: "黏液",
  "see-through tentacles": "透视触手",
  bound: "束缚",
  restrained: "拘束",
  cuffs: "束缚具",
  "bound wrists": "束缚手腕",
  harness: "束缚带/背带",
  shibari: "绳缚",
  "bound arms": "双臂束缚",
  "bound legs": "双腿捆绑",
  "shibari over clothes": "隔衣束缚",
  "bound ankles": "脚踝捆绑",
  suspension: "吊缚",
  frogtie: "蛙式捆绑",
  chained: "锁链束缚",
  "breast bondage": "乳房束缚",
  "grabbed by tentacles": "被触手抓取",
  "stationary restraints": "固定式束缚",
  "ankle cuffs": "脚踝束缚具",
  "bondage outfit": "束缚装",
  "gag harness": "口塞束缚带",
  "bound torso": "躯干捆绑",
  straitjacket: "拘束衣",
  "spreader bar": "束缚撑杆",
  hogtie: "手脚背后相缚",
  "bound thighs": "大腿捆绑",
  "ball and chain restraint": "球链束缚",
  "o-ring harness": "O型环束缚带",
  "box tie": "箱型束缚",
  "tied to chair": "捆绑在椅子上",
  "bound toes": "捆绑脚趾",
  "shibari under clothes": "衣下缚",
  "upright restraints": "直立束缚",
  monsterhentai: "怪物触手",
  "anal fisting": "肛门拳交",
  "anal grip": "肛门紧夹",
  "gimp suit": "束缚衣",
  "anal cross-section": "肛门横截面",
  "anal ball wear": "肛珠固定式服饰",
  "anal prolapse": "脱肛",
  "x-cross (bdsm)": "X型拘束架",
  "after anilingus": "肛交后",
  "bound puppy pose": "束缚小狗式",
  "tied nipples": "乳头系缚",
  "anal object extraction": "肛门异物取出",
  "open-chest straitjacket": "露胸束缚衣",
  "cleft anus": "肛门裂沟",
  "heart butt plug": "心形肛塞",
  "implied anilingus": "暗示舔肛",
  sleepsack: "睡袋束缚",
  "tail in ass": "尾巴插入肛门",
  "one bar prison": "单杆束缚",
  "tentacle dildo": "触手假阳具",
  "anus piercing": "肛门穿孔",
  "anal vore": "肛门吞噬",
  "imminent anilingus": "即将舔肛",
  "implied tentacle sex": "暗示触手性行为",
  "assisted anal": "辅助肛交",
  "anilingus through clothes": "隔衣舔肛",
  "carrot butt plug": "胡萝卜肛塞",
  "inflatable buttplug": "充气肛塞",
  "ass onahole": "肛门自慰器",
  "glass butt plug": "玻璃肛塞",
  "anal wink": "肛门收缩",
  "pectoral bondage": "胸部束缚",
  "clitoris tied": "阴蒂束缚",
  "anal assassin glove": "肛门刺客手套",
  "anal fluid overflow": "肛门体液溢出",
  "anal squirting": "肛门潮吹",
  "mole on anus": "肛门痣",
  "anal birth": "肛门分娩",
  "anal tug of war": "肛门拔河",
  "flower in ass": "肛门花卉",
  "cum in ass": "肛内射精",
  guro: "猎奇",
  "butt plug": "肛塞",
  ryona: "凌辱",
  anilingus: "舔肛",
  "tentacle in mouth": "口中触手",
  "spreading own anus": "掰开自己的肛门",
  "spreading another's anus": "掰开他人的肛门",
  "wooden horse": "木马（BDSM）",
  "rape face": "凌辱脸",
  "presenting own anus": "展示肛门",
  pegging: "逆肛交",
  "double anal": "双重肛交",
  "vibrator in anus": "肛门跳蛋",
  "presenting anus": "露肛",
  tentaclejob: "触手责",
  "x anus": "X形肛门",
  "gimp mask": "束缚面具",
  "food in ass": "塞入肛门的食物",
  "imminent tentacle sex": "即将发生的触手性行为",
  "anal invitation": "肛交邀请",
  "anal hook": "肛钩",
  "anus cutout": "肛门开洞衣物",
  "tail anus": "尾根肛门",
  bitchsuit: "束缚奴隶衣",
  "anal beads reveal": "肛珠露出",
  "anal tube": "肛门管道",
  sticky: "粘液覆盖",
  "scorpion harness": "蝎形束缚带",
  "separated arms": "双臂分开束缚",
  "bound knees": "束缚双膝",
  "mummification (bound)": "木乃伊捆绑",
  restraints: "束缚具",
  "belt bondage": "皮带束缚",
  "tentacle around neck": "触手缠颈",
  "self bondage": "自缚",
  "standing restraints": "站立式拘束",
  "bound tail": "束缚尾巴",
  "arms bound above head": "双臂高举被缚",
  "wrists bound apart": "双腕分开束缚",
  "tail bondage": "尾部束缚",
  "shrimp tie": "虾式捆绑",
  "bound thumbs": "拇指捆绑",
  "hogtie carry": "捆绑搬运",
  shibarikini: "绳缚比基尼",
  "bound calves": "束缚小腿",
  "licking tentacle": "舔舐触手",
  "harness belt": "束缚带",
  "vine bondage": "藤蔓束缚",
  "bound elbows": "肘部捆绑",
  kinbaku: "紧缚",
  "bondage under clothes": "衣内束缚",
  "tentacle between legs": "双腿间触手",
  "tentacle chair": "触手椅",
  "reverse straitjacket": "反向束缚衣",
  "tied to bed": "束缚在床上",
  "vine harness": "藤蔓束缚",
  "tentacle over eye": "触手遮眼",
  "tentacles in thighhighs": "触手过膝袜",
  "tentacle around leg": "触手缠腿",
  "chain harness": "锁链束缚带",
  "shibari tan": "缚痕",
  "sticky restraint": "粘性束缚",
  "leather shibari": "皮质束缚",
  "tentacle around arm": "触手缠臂",
};

function glossOverrides() {
  return { ...ZH_FIX, ...EXTRA_GLOSS };
}

function applyGloss(rows: Tag[]) {
  const over = glossOverrides();
  const next = rows.map((t) => ({ ...t, c: over[t.e] || t.c }));
  const have = new Set(next.map((t) => t.e));
  for (const [e, c] of Object.entries(over)) {
    if (!have.has(e)) next.push({ e, c, n: 80_000 });
  }
  return next;
}

export type Tag = { e: string; c: string; n: number };

let tags: Tag[] = [];
let loaded = false;
let loading: Promise<void> | null = null;
let glossMap: Map<string, string> | null = null;

function glossKey(raw: string) {
  return raw.toLowerCase().replaceAll("_", " ").replace(/\s+/g, " ").trim();
}

function rebuildGloss() {
  glossMap = new Map();
  for (const tag of tags) {
    const zh = tag.c.trim();
    if (!zh || zh.toLowerCase() === tag.e.toLowerCase()) continue;
    glossMap.set(glossKey(tag.e), zh);
  }
}

export function tagGloss(body: string) {
  if (!glossMap) rebuildGloss();
  const key = glossKey(body);
  if (!key) return null;
  return glossMap?.get(key) ?? null;
}

export function loadTags() {
  if (loaded) return Promise.resolve();
  if (loading) return loading;
  loading = fetch("/data/tags.json")
    .then((r) => r.json())
    .then((rows: Tag[]) => {
      tags = applyGloss(rows.map((t) => ({ ...t, c: t.c })));
      rebuildGloss();
      loaded = true;
    })
    .catch(() => {
      tags = applyGloss(Object.entries(glossOverrides()).map(([e, c], i) => ({ e, c, n: 1_000_000 - i })));
      rebuildGloss();
      loaded = true;
    });
  return loading;
}

function lastToken(text: string, caret: number) {
  const left = text.slice(0, caret);
  const m = left.match(/([^,\n]*)$/);
  return (m?.[1] ?? "").trim();
}

export function suggestTags(text: string, caret: number, limit = 40) {
  const q = lastToken(text, caret).toLowerCase();
  if (!q) return { q, total: 0, items: [] as Tag[] };
  const hits: Tag[] = [];
  for (const t of tags) {
    const en = t.e.toLowerCase();
    const zh = t.c;
    if (en.startsWith(q) || en.includes(q) || zh.includes(q)) hits.push(t);
  }
  hits.sort((a, b) => {
    const as = a.e.toLowerCase().startsWith(q) ? 1 : 0;
    const bs = b.e.toLowerCase().startsWith(q) ? 1 : 0;
    if (as !== bs) return bs - as;
    return b.n - a.n;
  });
  return { q, total: hits.length, items: hits.slice(0, limit) };
}

export function insertTag(text: string, caret: number, tag: string) {
  const left = text.slice(0, caret);
  const right = text.slice(caret);
  const m = left.match(/^(.*?)([^,\n]*)$/s);
  const prefix = m?.[1] ?? left;
  const lead = prefix && !prefix.endsWith("\n") && !/,\s*$/.test(prefix) ? (prefix.endsWith(",") ? " " : ", ") : "";
  const next = `${prefix}${lead}${tag}, `;
  return { text: next + right.replace(/^\s*,?\s*/, ""), caret: next.length };
}
