const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const elements = ["木", "火", "土", "金", "水"];
const stemElement = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水"
};
const branchElement = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
};
const yinYang = {
  甲: "阳", 乙: "阴", 丙: "阳", 丁: "阴", 戊: "阳", 己: "阴", 庚: "阳", 辛: "阴", 壬: "阳", 癸: "阴",
  子: "阳", 丑: "阴", 寅: "阳", 卯: "阴", 辰: "阳", 巳: "阴", 午: "阳", 未: "阴", 申: "阳", 酉: "阴", 戌: "阳", 亥: "阴"
};
const hiddenStems = {
  子: ["癸"], 丑: ["己", "癸", "辛"], 寅: ["甲", "丙", "戊"], 卯: ["乙"], 辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"], 午: ["丁", "己"], 未: ["己", "丁", "乙"], 申: ["庚", "壬", "戊"],
  酉: ["辛"], 戌: ["戊", "辛", "丁"], 亥: ["壬", "甲"]
};
const generate = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
const control = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
const liuHe = new Set(["子丑", "寅亥", "卯戌", "辰酉", "巳申", "午未"]);
const clashes = new Set(["子午", "丑未", "寅申", "卯酉", "辰戌", "巳亥"]);
const harms = new Set(["子未", "丑午", "寅巳", "卯辰", "申亥", "酉戌"]);
const punishments = new Set(["子卯", "寅巳", "巳申", "申寅", "丑戌", "戌未", "未丑"]);
const sanHeGroups = [
  ["申", "子", "辰", "水"],
  ["亥", "卯", "未", "木"],
  ["寅", "午", "戌", "火"],
  ["巳", "酉", "丑", "金"]
];
const careerProfiles = {
  木: {
    tone: "成长、教育、策划、审美与长期耕耘",
    fields: ["教育培训", "文化内容", "品牌策划", "设计咨询", "环保健康"],
    strength: "适合把复杂事情梳理成方法，靠专业积累和持续输出形成影响力。"
  },
  火: {
    tone: "表达、传播、产品、审美与人群连接",
    fields: ["传媒传播", "互联网产品", "市场品牌", "餐饮美业", "演讲培训"],
    strength: "适合站到台前或承担连接角色，用热度、表达和体验感推动事情。"
  },
  土: {
    tone: "管理、运营、资产、组织与稳定交付",
    fields: ["运营管理", "地产建筑", "供应链", "人力行政", "风控财务"],
    strength: "适合做承接复杂责任的人，重流程、秩序、资源整合与长期信用。"
  },
  金: {
    tone: "规则、结构、审美、技术与高标准执行",
    fields: ["金融审计", "法律合规", "工程技术", "数据安全", "医疗器械"],
    strength: "适合处理标准、边界、质量和决策，越专业化越能发挥价值。"
  },
  水: {
    tone: "流动、信息、研究、交易与跨界适应",
    fields: ["贸易流通", "研究咨询", "心理服务", "旅行文旅", "数据分析"],
    strength: "适合在变化中找机会，靠信息敏感度、学习速度和连接能力打开局面。"
  }
};
const tenGodCareer = {
  比肩: "适合自主型、合伙型或需要个人品牌的工作，但合伙边界要清晰。",
  劫财: "适合竞争、BD、创业和资源开拓，需管理冲动决策与财务分配。",
  食神: "适合内容、教育、产品体验、餐饮美学等靠稳定输出变现的方向。",
  伤官: "适合创意、表达、技术突破、营销传播，忌被过细规则压住。",
  偏财: "适合商业拓展、销售、投资、资源撮合，机会感强但要控风险。",
  正财: "适合财务、运营、项目管理、稳定经营，重现金流与可复制流程。",
  七杀: "适合管理、攻坚、法务、技术安全、竞争压力大的岗位。",
  正官: "适合制度型组织、管理、行政、公职、合规和长期责任角色。",
  偏印: "适合研究、策略、心理、玄学文化、非标专业，重独立判断。",
  正印: "适合教育、学术、咨询、资质型专业，贵在沉淀口碑。"
};
const zodiacSigns = [
  { cn: "摩羯座", en: "Capricorn", start: [12, 22], end: [1, 19], element: "土象", mode: "开创", traits: ["责任", "长期主义", "现实规划"], career: "适合管理、运营、金融、工程、制度型岗位。" },
  { cn: "水瓶座", en: "Aquarius", start: [1, 20], end: [2, 18], element: "风象", mode: "固定", traits: ["独立", "创新", "系统思维"], career: "适合科技、产品、社群、研究和创新型组织。" },
  { cn: "双鱼座", en: "Pisces", start: [2, 19], end: [3, 20], element: "水象", mode: "变动", traits: ["共情", "想象", "融合"], career: "适合艺术、疗愈、内容、服务、影像和人文方向。" },
  { cn: "白羊座", en: "Aries", start: [3, 21], end: [4, 19], element: "火象", mode: "开创", traits: ["主动", "快速", "开局能力"], career: "适合创业、销售、竞技、项目启动和需要冲劲的岗位。" },
  { cn: "金牛座", en: "Taurus", start: [4, 20], end: [5, 20], element: "土象", mode: "固定", traits: ["稳定", "审美", "价值感"], career: "适合财务、消费品、美业、地产、农业和资产经营。" },
  { cn: "双子座", en: "Gemini", start: [5, 21], end: [6, 21], element: "风象", mode: "变动", traits: ["沟通", "学习", "信息流动"], career: "适合媒体、销售、培训、运营、商务和多任务角色。" },
  { cn: "巨蟹座", en: "Cancer", start: [6, 22], end: [7, 22], element: "水象", mode: "开创", traits: ["照顾", "安全感", "家庭意识"], career: "适合服务、教育、餐饮、地产、心理和组织照护类工作。" },
  { cn: "狮子座", en: "Leo", start: [7, 23], end: [8, 22], element: "火象", mode: "固定", traits: ["表现", "领导", "创造力"], career: "适合品牌、公关、管理、娱乐、教育和需要个人魅力的方向。" },
  { cn: "处女座", en: "Virgo", start: [8, 23], end: [9, 22], element: "土象", mode: "变动", traits: ["细节", "优化", "服务"], career: "适合数据、医疗、编辑、流程优化、咨询和精细运营。" },
  { cn: "天秤座", en: "Libra", start: [9, 23], end: [10, 23], element: "风象", mode: "开创", traits: ["协调", "审美", "关系平衡"], career: "适合法律、公关、设计、咨询、商务谈判和合作型岗位。" },
  { cn: "天蝎座", en: "Scorpio", start: [10, 24], end: [11, 22], element: "水象", mode: "固定", traits: ["深度", "洞察", "掌控力"], career: "适合金融、心理、研究、风控、医疗、调查和深度策略。" },
  { cn: "射手座", en: "Sagittarius", start: [11, 23], end: [12, 21], element: "火象", mode: "变动", traits: ["探索", "远见", "传播"], career: "适合教育、出版、旅行、跨境业务、咨询和公共表达。" }
];
const zodiacElementPairs = {
  火象: "风象",
  风象: "火象",
  土象: "水象",
  水象: "土象"
};
const monthStarts = [
  { m: 2, d: 4, branch: "寅" },
  { m: 3, d: 6, branch: "卯" },
  { m: 4, d: 5, branch: "辰" },
  { m: 5, d: 6, branch: "巳" },
  { m: 6, d: 6, branch: "午" },
  { m: 7, d: 7, branch: "未" },
  { m: 8, d: 8, branch: "申" },
  { m: 9, d: 8, branch: "酉" },
  { m: 10, d: 8, branch: "戌" },
  { m: 11, d: 7, branch: "亥" },
  { m: 12, d: 7, branch: "子" },
  { m: 1, d: 6, branch: "丑" }
];
const hourBranches = [
  { start: 23, branch: "子" }, { start: 1, branch: "丑" }, { start: 3, branch: "寅" }, { start: 5, branch: "卯" },
  { start: 7, branch: "辰" }, { start: 9, branch: "巳" }, { start: 11, branch: "午" }, { start: 13, branch: "未" },
  { start: 15, branch: "申" }, { start: 17, branch: "酉" }, { start: 19, branch: "戌" }, { start: 21, branch: "亥" }
];

const form = document.querySelector("#compatibility-form");
const results = document.querySelector("#results");
const modeButtons = document.querySelectorAll(".mode-button");
let currentMode = "single";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const personA = readPerson(data, "a");
  const chartA = buildChart(personA);
  if (currentMode === "single") {
    const report = buildPersonalReport(chartA);
    renderPersonalReport(chartA, report);
  } else {
    const personB = readPerson(data, "b");
    const chartB = buildChart(personB);
    const report = buildCompatibility(chartA, chartB);
    renderCompatibilityReport(chartA, chartB, report);
  }
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

document.querySelector("#sample-button").addEventListener("click", () => {
  fillSample(currentMode);
  form.requestSubmit();
});

document.querySelector("#print-button").addEventListener("click", () => window.print());

window.addEventListener("load", () => {
  setMode("single");
  if (window.lucide) window.lucide.createIcons();
});

function setMode(mode) {
  currentMode = mode;
  const isSingle = mode === "single";
  modeButtons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelector("[data-person='b']").hidden = isSingle;
  document.querySelector("#a-legend").textContent = isSingle ? "本人" : "甲方";
  document.querySelector("#submit-button span").textContent = isSingle ? "生成命盘" : "生成合盘";
  document.querySelector("#submit-button i")?.setAttribute("data-lucide", isSingle ? "scan-line" : "scan-heart");
  form.classList.toggle("single-mode", isSingle);
  if (window.lucide) window.lucide.createIcons();
}

function fillSample(mode) {
  setValue("a-name", mode === "single" ? "沈明澜" : "林知衡");
  setValue("a-gender", mode === "single" ? "female" : "male");
  setValue("a-place", mode === "single" ? "广东省广州市" : "浙江省杭州市");
  setValue("a-date", mode === "single" ? "1991-11-07" : "1992-08-18");
  setValue("a-time", mode === "single" ? "14:40" : "09:30");
  if (mode === "couple") {
    setValue("b-name", "许清棠");
    setValue("b-gender", "female");
    setValue("b-place", "江苏省苏州市");
    setValue("b-date", "1994-03-26");
    setValue("b-time", "18:20");
  }
}

function setValue(name, value) {
  form.elements[name].value = value;
}

function readPerson(data, prefix) {
  return {
    name: String(data.get(`${prefix}-name`) || "").trim(),
    gender: data.get(`${prefix}-gender`),
    place: String(data.get(`${prefix}-place`) || "").trim(),
    date: data.get(`${prefix}-date`),
    time: data.get(`${prefix}-time`)
  };
}

function buildChart(person) {
  const date = new Date(`${person.date}T${person.time || "12:00"}:00`);
  const yearPillar = getYearPillar(date);
  const monthPillar = getMonthPillar(date, yearPillar.stem);
  const dayPillar = getDayPillar(date);
  const hourPillar = person.time ? getHourPillar(date, dayPillar.stem) : null;
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const dayMaster = dayPillar.stem;
  const scores = elementScores(pillars);
  const strength = dayStrength(dayMaster, monthPillar.branch, scores);
  const favors = favorableElements(dayMaster, strength.level);
  const zodiac = getZodiacSign(date);

  return {
    person,
    pillars,
    dayMaster,
    scores,
    strength,
    favors,
    zodiac,
    tenGods: pillars.map((pillar, index) => pillar && index !== 2 ? tenGod(dayMaster, pillar.stem) : "日主")
  };
}

function getYearPillar(date) {
  const year = date.getFullYear();
  const afterLiChun = date.getMonth() + 1 > 2 || (date.getMonth() + 1 === 2 && date.getDate() >= 4);
  const ganzhiYear = afterLiChun ? year : year - 1;
  const index = mod(ganzhiYear - 4, 60);
  return pillarFromIndex(index);
}

function getMonthPillar(date, yearStem) {
  const monthBranch = getMonthBranch(date);
  const branchOffset = mod(branches.indexOf(monthBranch) - branches.indexOf("寅"), 12);
  const yearStemIndex = stems.indexOf(yearStem);
  const startStem = [0, 5].includes(yearStemIndex) ? 2 :
    [1, 6].includes(yearStemIndex) ? 4 :
      [2, 7].includes(yearStemIndex) ? 6 :
        [3, 8].includes(yearStemIndex) ? 8 : 0;
  return {
    stem: stems[mod(startStem + branchOffset, 10)],
    branch: monthBranch
  };
}

function getMonthBranch(date) {
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  let branch = "丑";
  for (const item of monthStarts) {
    const value = item.m * 100 + item.d;
    if (item.m === 1) {
      if (md >= value && md < 204) branch = item.branch;
    } else if (md >= value) {
      branch = item.branch;
    }
  }
  return branch;
}

function getDayPillar(date) {
  const adjusted = new Date(date);
  if (adjusted.getHours() >= 23) adjusted.setDate(adjusted.getDate() + 1);
  const y = adjusted.getFullYear();
  const m = adjusted.getMonth() + 1;
  const d = adjusted.getDate();
  const jdn = gregorianToJdn(y, m, d);
  return pillarFromIndex(mod(jdn + 11, 60));
}

function getHourPillar(date, dayStem) {
  const hour = date.getHours();
  const branch = hour === 23 || hour === 0 ? "子" : hourBranchFor(hour);
  const dayStemIndex = stems.indexOf(dayStem);
  const ziStem = [0, 5].includes(dayStemIndex) ? 0 :
    [1, 6].includes(dayStemIndex) ? 2 :
      [2, 7].includes(dayStemIndex) ? 4 :
        [3, 8].includes(dayStemIndex) ? 6 : 8;
  const offset = branches.indexOf(branch);
  return {
    stem: stems[mod(ziStem + offset, 10)],
    branch
  };
}

function getZodiacSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return zodiacSigns.find((sign) => {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    if (startMonth > endMonth) {
      return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
    }
    return (month > startMonth || (month === startMonth && day >= startDay)) &&
      (month < endMonth || (month === endMonth && day <= endDay));
  });
}

function hourBranchFor(hour) {
  let branch = "子";
  for (const item of hourBranches) {
    if (hour >= item.start) branch = item.branch;
  }
  return branch;
}

function gregorianToJdn(y, m, d) {
  const a = Math.floor((14 - m) / 12);
  const year = y + 4800 - a;
  const month = m + 12 * a - 3;
  return d + Math.floor((153 * month + 2) / 5) + 365 * year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400) - 32045;
}

function pillarFromIndex(index) {
  return {
    stem: stems[mod(index, 10)],
    branch: branches[mod(index, 12)]
  };
}

function tenGod(dayStem, otherStem) {
  const self = stemElement[dayStem];
  const other = stemElement[otherStem];
  const samePolarity = yinYang[dayStem] === yinYang[otherStem];
  if (self === other) return samePolarity ? "比肩" : "劫财";
  if (generate[other] === self) return samePolarity ? "偏印" : "正印";
  if (generate[self] === other) return samePolarity ? "食神" : "伤官";
  if (control[other] === self) return samePolarity ? "七杀" : "正官";
  if (control[self] === other) return samePolarity ? "偏财" : "正财";
  return "—";
}

function elementScores(pillars) {
  const scores = Object.fromEntries(elements.map((element) => [element, 0]));
  for (const pillar of pillars) {
    if (!pillar) continue;
    scores[stemElement[pillar.stem]] += 1.2;
    scores[branchElement[pillar.branch]] += 1.4;
    hiddenStems[pillar.branch].forEach((stem, index) => {
      scores[stemElement[stem]] += [0.6, 0.3, 0.15][index] || 0.1;
    });
  }
  return scores;
}

function dayStrength(dayMaster, monthBranch, scores) {
  const element = stemElement[dayMaster];
  const supporters = scores[element] + scores[elementGeneratedBy(element)] * 0.72;
  const drainers = scores[generate[element]] * 0.48 + scores[control[element]] * 0.58 + scores[elementControlledBy(element)] * 0.52;
  const seasonalBoost = branchElement[monthBranch] === element ? 1.2 : generate[branchElement[monthBranch]] === element ? 0.72 : 0;
  const value = supporters + seasonalBoost - drainers;
  const level = value >= 2.2 ? "身旺" : value <= -1.2 ? "身弱" : "中和";
  return { value, level };
}

function favorableElements(dayMaster, level) {
  const self = stemElement[dayMaster];
  if (level === "身弱") return [self, elementGeneratedBy(self)];
  if (level === "身旺") return [generate[self], control[self], elementControlledBy(self)];
  return [self, generate[self]];
}

function elementGeneratedBy(element) {
  return Object.keys(generate).find((key) => generate[key] === element);
}

function elementControlledBy(element) {
  return Object.keys(control).find((key) => control[key] === element);
}

function buildPersonalReport(chart) {
  const career = careerProfile(chart);
  const balance = personalBalanceScore(chart);
  const careerScore = personalCareerScore(chart);
  const loveScore = personalLoveScore(chart);
  const vitalityScore = personalVitalityScore(chart);
  const yearScore = clamp(55 + annualPersonalRhythm(chart, new Date().getFullYear()).score, 20, 96);
  const total = Math.round(balance * 0.24 + careerScore * 0.24 + loveScore * 0.18 + vitalityScore * 0.18 + yearScore * 0.16);

  return {
    total,
    scores: [
      { label: "综合走势", value: total },
      { label: "命局平衡", value: Math.round(balance) },
      { label: "事业潜力", value: Math.round(careerScore) },
      { label: "感情稳定", value: Math.round(loveScore) },
      { label: "生命节奏", value: Math.round(vitalityScore) }
    ],
    summary: personalSummary(chart, total),
    fits: personalFitPoints(chart),
    relations: personalTriggerPoints(chart),
    risks: personalRiskPoints(chart),
    careers: [career, personalLifeProfile(chart), personalActionProfile(chart)],
    workFits: personalWorkFits(chart, career),
    workRisks: personalWorkRisks(chart),
    zodiac: zodiacPersonal(chart),
    curves: buildPersonalCurves(chart),
    timeline: personalTimelineItems(chart)
  };
}

function buildCompatibility(a, b) {
  const interactions = pillarInteractions(a, b);
  const careerA = careerProfile(a);
  const careerB = careerProfile(b);
  const zodiac = zodiacCompatibility(a, b);
  const attraction = clamp(52 + interactions.affinity * 4 + dayMasterEffect(a, b) + sharedSanHe(a, b) * 5, 20, 96);
  const stability = clamp(58 + interactions.harmony * 4 - interactions.friction * 5 + mutualFavorScore(a, b) * 2.3, 18, 94);
  const complement = clamp(48 + mutualFavorScore(a, b) * 5 + balanceScore(a, b), 22, 97);
  const communication = clamp(54 + sameOrGenerated(a.dayMaster, b.dayMaster) * 7 + interactions.stemCombos * 4 - interactions.branchClashes * 5, 24, 94);
  const rhythm = clamp(50 + annualRhythm(a, b, new Date().getFullYear()).score, 28, 92);
  const total = Math.round((attraction * 0.22 + stability * 0.28 + complement * 0.24 + communication * 0.14 + rhythm * 0.12));
  const type = relationshipType(total, attraction, stability, complement);

  return {
    total,
    type,
    scores: [
      { label: "总缘分", value: total },
      { label: "吸引力", value: Math.round(attraction) },
      { label: "稳定度", value: Math.round(stability) },
      { label: "互补度", value: Math.round(complement) },
      { label: "沟通感", value: Math.round(communication) }
    ],
    summary: summaryText(a, b, type, total),
    fits: fitPoints(a, b),
    relations: relationPoints(a, b, interactions),
    risks: riskPoints(a, b, interactions),
    careers: [careerA, careerB, coupleCareerProfile(a, b, careerA, careerB)],
    workFits: workFitPoints(a, b, careerA, careerB, zodiac),
    workRisks: workRiskPoints(a, b, interactions, careerA, careerB, zodiac),
    zodiac,
    curves: buildCoupleCurves(a, b),
    timeline: timelineItems(a, b)
  };
}

function pillarInteractions(a, b) {
  const result = { affinity: 0, harmony: 0, friction: 0, stemCombos: 0, branchClashes: 0, notes: [] };
  a.pillars.forEach((pa, index) => {
    const pb = b.pillars[index];
    if (!pa || !pb) return;
    const stemPair = orderedPair(pa.stem, pb.stem);
    const branchPair = orderedPair(pa.branch, pb.branch);
    if (["甲己", "乙庚", "丙辛", "丁壬", "戊癸"].includes(stemPair)) {
      result.affinity += index === 2 ? 3 : 1;
      result.harmony += 1;
      result.stemCombos += 1;
    }
    if (liuHe.has(branchPair)) {
      result.affinity += index === 2 ? 4 : 2;
      result.harmony += index === 2 ? 3 : 1;
    }
    if (clashes.has(branchPair)) {
      result.friction += index === 2 ? 4 : 2;
      result.branchClashes += 1;
    }
    if (harms.has(branchPair) || punishments.has(branchPair)) {
      result.friction += index === 2 ? 3 : 1;
    }
  });
  return result;
}

function orderedPair(a, b) {
  const direct = `${a}${b}`;
  const reverse = `${b}${a}`;
  return liuHe.has(direct) || clashes.has(direct) || harms.has(direct) || punishments.has(direct) ||
    ["甲己", "乙庚", "丙辛", "丁壬", "戊癸"].includes(direct) ? direct : reverse;
}

function dayMasterEffect(a, b) {
  const ea = stemElement[a.dayMaster];
  const eb = stemElement[b.dayMaster];
  if (ea === eb) return 4;
  if (generate[ea] === eb || generate[eb] === ea) return 9;
  if (control[ea] === eb || control[eb] === ea) return -2;
  return 1;
}

function sameOrGenerated(aStem, bStem) {
  const aElement = stemElement[aStem];
  const bElement = stemElement[bStem];
  return aElement === bElement || generate[aElement] === bElement || generate[bElement] === aElement ? 1 : 0;
}

function mutualFavorScore(a, b) {
  const scoreA = a.favors.reduce((sum, element) => sum + (b.scores[element] || 0), 0);
  const scoreB = b.favors.reduce((sum, element) => sum + (a.scores[element] || 0), 0);
  return Math.min(10, (scoreA + scoreB) / 1.55);
}

function balanceScore(a, b) {
  const merged = Object.fromEntries(elements.map((element) => [element, a.scores[element] + b.scores[element]]));
  const values = Object.values(merged);
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + Math.abs(value - avg), 0) / values.length;
  return clamp(18 - variance * 3.2, -12, 18);
}

function sharedSanHe(a, b) {
  const branchesA = a.pillars.filter(Boolean).map((pillar) => pillar.branch);
  const branchesB = b.pillars.filter(Boolean).map((pillar) => pillar.branch);
  return sanHeGroups.filter(([x, y, z]) => {
    const all = [...branchesA, ...branchesB];
    return [x, y, z].filter((branch) => all.includes(branch)).length >= 2;
  }).length;
}

function annualRhythm(a, b, year) {
  const current = pillarFromIndex(mod(year - 4, 60));
  let score = 0;
  for (const chart of [a, b]) {
    const dayBranch = chart.pillars[2].branch;
    const relation = orderedPair(dayBranch, current.branch);
    if (liuHe.has(relation)) score += 8;
    if (clashes.has(relation)) score -= 7;
    if (chart.favors.includes(stemElement[current.stem]) || chart.favors.includes(branchElement[current.branch])) score += 5;
  }
  return { score, current };
}

function annualPersonalRhythm(chart, year) {
  const current = pillarFromIndex(mod(year - 4, 60));
  const dayBranch = chart.pillars[2].branch;
  const yearBranch = chart.pillars[0].branch;
  const dayRelation = orderedPair(dayBranch, current.branch);
  const yearRelation = orderedPair(yearBranch, current.branch);
  let score = 0;
  if (chart.favors.includes(stemElement[current.stem])) score += 8;
  if (chart.favors.includes(branchElement[current.branch])) score += 6;
  if (liuHe.has(dayRelation)) score += 8;
  if (clashes.has(dayRelation)) score -= 9;
  if (harms.has(dayRelation) || punishments.has(dayRelation)) score -= 5;
  if (liuHe.has(yearRelation)) score += 4;
  if (clashes.has(yearRelation)) score -= 4;
  return { score, current };
}

function relationshipType(total, attraction, stability, complement) {
  if (total >= 78 && stability >= 70) return "稳定互补型";
  if (attraction >= 76 && stability < 62) return "强吸引磨合型";
  if (complement >= 76) return "互相成就型";
  if (total < 55) return "阶段磨合型";
  return "渐进经营型";
}

function careerProfile(chart) {
  const dominant = strongestElement(chart.scores);
  const dayElement = stemElement[chart.dayMaster];
  const profile = careerProfiles[dayElement];
  const tenGodCounts = countTenGods(chart);
  const mainTenGod = Object.entries(tenGodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "正印";
  const usefulFields = unique([...profile.fields, ...careerProfiles[dominant].fields]).slice(0, 6);
  const caution = chart.strength.level === "身旺" ?
    "职业上宜多输出、承担结果或进入规则清楚的赛道，避免只凭主观硬推。" :
    chart.strength.level === "身弱" ?
      "职业上宜先借平台、资质、团队与流程，等资源稳定后再扩大自主空间。" :
      "职业上适合在稳定结构中保留灵活度，既能守成也能做阶段突破。";

  return {
    title: `${chart.person.name} · ${dayElement}日主`,
    badge: `${chart.zodiac.cn} / ${chart.zodiac.element}`,
    summary: `${profile.tone}。${profile.strength}`,
    tenGod: `${mainTenGod}较显：${tenGodCareer[mainTenGod]}`,
    caution,
    tags: usefulFields
  };
}

function coupleCareerProfile(a, b, careerA, careerB) {
  const merged = mergedScores(a, b);
  const dominant = strongestElement(merged);
  const weakest = weakestElement(merged);
  const complement = mutualFavorScore(a, b);
  const summary = complement >= 7 ?
    `两人在事业上有较强互补性，合局最旺为${dominant}、最缺为${weakest}，适合一人负责推进与资源，一人负责秩序与收束。` :
    `两人在事业上更适合先分工再合作，合局最旺为${dominant}，容易在同一种节奏里互相放大，需要明确边界。`;
  return {
    title: "共同发展",
    badge: `${dominant}旺 · 补${weakest}`,
    summary,
    tenGod: `适合把${careerA.tags[0]}、${careerB.tags[0]}这类优势组合成具体项目，而不是只停留在情绪支持。`,
    caution: "若共同创业或理财，建议先定权责、预算、退出机制，再谈愿景。",
    tags: unique([careerA.tags[0], careerA.tags[1], careerB.tags[0], careerB.tags[1], "共同项目", "长期规划"])
  };
}

function workFitPoints(a, b, careerA, careerB, zodiac) {
  const points = [
    `${a.person.name}更适合${careerA.tags.slice(0, 3).join("、")}，${b.person.name}更适合${careerB.tags.slice(0, 3).join("、")}，可以把各自优势拆成清楚分工。`,
    mutualFavorScore(a, b) >= 7 ? "彼此能补到对方喜用，适合共同做长期计划、资产配置、学习进阶或事业转型。" : "事业合作宜轻资产、短周期、低承诺起步，先验证节奏再放大投入。",
    zodiac.score >= 70 ? `星座层面${zodiac.type}，日常生活容易形成互相鼓励的节奏。` : `星座层面${zodiac.type}，适合把兴趣、社交和私人空间分开安排。`
  ];
  if (sameOrGenerated(a.dayMaster, b.dayMaster)) points.push("八字日主有同气或相生关系，适合在关键节点互相打气、共同学习或协作输出。");
  return points;
}

function workRiskPoints(a, b, interactions, careerA, careerB, zodiac) {
  const points = [];
  if (interactions.friction >= 4) points.push("事业或生活压力一大，刑冲害会让双方更容易互相挑错，重要议题要避开疲惫和情绪化时段。");
  if (strongestElement(a.scores) === strongestElement(b.scores)) points.push(`双方命局都偏重${strongestElement(a.scores)}，生活里容易坚持同一种做法，谁都觉得自己有道理。`);
  if (careerA.tags.some((tag) => careerB.tags.includes(tag))) points.push("职业优势有重叠，合作时容易抢同一个决策位置，需要指定谁主导、谁复核。");
  if (zodiac.score < 58) points.push("星座元素或模式差异较明显，休息方式、社交频率和表达速度可能不一致。");
  points.push("共同财务、家庭边界、居住节奏是长期关系里最需要提前约定的三件事。");
  return unique(points);
}

function zodiacCompatibility(a, b) {
  const za = a.zodiac;
  const zb = b.zodiac;
  let score = 54;
  const notes = [];
  if (za.element === zb.element) {
    score += 18;
    notes.push(`同为${za.element}，天然理解彼此的行动和情绪节奏。`);
  } else if (zodiacElementPairs[za.element] === zb.element) {
    score += 14;
    notes.push(`${za.element}与${zb.element}互为支持元素，容易在兴趣、表达或安全感上互补。`);
  } else {
    score -= 4;
    notes.push(`${za.element}与${zb.element}差异较大，吸引感常来自新鲜，但日常节奏要磨合。`);
  }
  if (za.mode === zb.mode) {
    score += 4;
    notes.push(`同为${za.mode}星座，处理问题的启动方式相近，但也容易同时固执或同时摇摆。`);
  } else {
    score += 2;
    notes.push(`${za.mode}与${zb.mode}组合能带来不同节奏，一个负责启动或稳定，另一个提供调整空间。`);
  }
  const type = score >= 72 ? "星座互补较强" : score >= 60 ? "星座中度协调" : "星座差异磨合";
  return {
    score: clamp(score, 30, 92),
    type,
    signs: [za, zb],
    notes
  };
}

function countTenGods(chart) {
  return chart.tenGods.reduce((counts, item) => {
    if (item && item !== "日主") counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});
}

function strongestElement(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function weakestElement(scores) {
  return Object.entries(scores).sort((a, b) => a[1] - b[1])[0][0];
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function personalBalanceScore(chart) {
  const values = Object.values(chart.scores);
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + Math.abs(value - avg), 0) / values.length;
  return clamp(88 - variance * 8 + (chart.strength.level === "中和" ? 8 : 0), 28, 96);
}

function personalCareerScore(chart) {
  const useful = chart.favors.reduce((sum, element) => sum + chart.scores[element], 0);
  const tenGodCounts = countTenGods(chart);
  const careerGods = ["正官", "七杀", "正财", "偏财", "食神", "伤官"];
  const careerForce = careerGods.reduce((sum, god) => sum + (tenGodCounts[god] || 0), 0);
  return clamp(50 + useful * 3.2 + careerForce * 6 + (chart.strength.level === "中和" ? 5 : 0), 30, 96);
}

function personalLoveScore(chart) {
  const dayBranch = chart.pillars[2].branch;
  let score = 58;
  for (const pillar of chart.pillars.filter(Boolean)) {
    const pair = orderedPair(dayBranch, pillar.branch);
    if (liuHe.has(pair)) score += 6;
    if (clashes.has(pair)) score -= 7;
    if (harms.has(pair) || punishments.has(pair)) score -= 4;
  }
  if (["正官", "正财", "正印", "食神"].some((god) => chart.tenGods.includes(god))) score += 8;
  return clamp(score, 26, 94);
}

function personalVitalityScore(chart) {
  const useful = chart.favors.reduce((sum, element) => sum + chart.scores[element], 0);
  const overdone = Math.max(...Object.values(chart.scores)) > 5.8 ? -8 : 0;
  return clamp(58 + useful * 2.6 + (chart.strength.level === "中和" ? 9 : 1) + overdone, 28, 95);
}

function personalSummary(chart, total) {
  const day = `${chart.pillars[2].stem}${chart.pillars[2].branch}`;
  const element = stemElement[chart.dayMaster];
  const dominant = strongestElement(chart.scores);
  const weakest = weakestElement(chart.scores);
  return [
    `${chart.person.name}日柱为${day}，日主属${element}，命局判断为${chart.strength.level}。综合走势为${total}，整体属于${total >= 75 ? "发展空间较清楚、适合主动经营的人生节奏" : total >= 62 ? "机会与压力并存，需要阶段性校准方向的人生节奏" : "更需要借势、蓄力和稳住基本盘的人生节奏"}。`,
    `五行中${dominant}较旺、${weakest}较弱，喜用倾向为${chart.favors.join("、")}。做选择时，越能补到喜用之气，越容易把个人能力转成稳定成果。`,
    `${chart.zodiac.cn}带来${chart.zodiac.traits.join("、")}的外在表达，可作为观察性格和节奏的辅助；八字部分则更偏向判断资源结构、人生阶段和取舍方向。`
  ];
}

function personalFitPoints(chart) {
  const career = careerProfile(chart);
  return [
    `适合围绕${career.tags.slice(0, 3).join("、")}发展，把兴趣变成可积累的技能或资源。`,
    chart.strength.level === "身弱" ? "宜先借平台、贵人、资质和稳定团队，不急着孤军推进。" : "宜主动承担关键责任，用输出、作品或结果建立个人信用。",
    `喜${chart.favors.join("、")}，生活中可多靠近对应的环境、行业、作息和协作方式。`,
    "重大选择以三年为一个周期观察，不宜因一时情绪频繁换方向。"
  ];
}

function personalTriggerPoints(chart) {
  const dayBranch = chart.pillars[2].branch;
  const points = [];
  chart.pillars.forEach((pillar, index) => {
    if (!pillar || index === 2) return;
    const pair = orderedPair(dayBranch, pillar.branch);
    const label = ["年柱", "月柱", "日柱", "时柱"][index];
    if (liuHe.has(pair)) points.push(`${label}与日支有合，容易在对应人生领域得到助力或关系牵引。`);
    if (clashes.has(pair)) points.push(`${label}与日支相冲，遇到家庭、事业或亲密关系变化时，容易出现迁移、转向或重新选择。`);
    if (harms.has(pair) || punishments.has(pair)) points.push(`${label}与日支有刑害，适合提前管理边界、沟通和健康作息。`);
  });
  if (!points.length) points.push("原局内部冲合不算强，人生起伏更多来自大运流年和个人选择，而非命局本身的剧烈拉扯。");
  return points;
}

function personalRiskPoints(chart) {
  const dominant = strongestElement(chart.scores);
  return [
    `命局${dominant}偏旺时，容易把同一种处理方式反复用在不同问题上，需要有意识补${chart.favors.join("、")}。`,
    chart.strength.level === "身旺" ? "身旺时忌硬扛和过度控制，越重要的事越要留出协商空间。" : chart.strength.level === "身弱" ? "身弱时忌过早透支，长期稳定比短期爆发更重要。" : "中和命局忌犹豫过久，机会来时需要明确优先级。",
    "健康、投资和重大关系问题都不适合只凭命理判断，仍应回到现实证据。"
  ];
}

function personalLifeProfile(chart) {
  const dominant = strongestElement(chart.scores);
  const weakest = weakestElement(chart.scores);
  return {
    title: "生活经营",
    badge: `${dominant}旺 · 补${weakest}`,
    summary: `生活节奏以${dominant}气较明显，越能补${weakest}，越容易从忙乱转向稳定。`,
    tenGod: "适合把作息、居住、财务和人际边界做成可重复的系统。",
    caution: "当某一阶段感觉停滞，先看环境和习惯是否补到了喜用，而不是急着推翻全部选择。",
    tags: unique([`${dominant}旺`, `补${weakest}`, "作息管理", "财务秩序", "人际边界", "长期习惯"])
  };
}

function personalActionProfile(chart) {
  const rhythm = annualPersonalRhythm(chart, new Date().getFullYear());
  const label = rhythm.score >= 10 ? "主动推进" : rhythm.score <= -6 ? "修整蓄力" : "稳步调整";
  return {
    title: "当前策略",
    badge: `${new Date().getFullYear()} · ${rhythm.current.stem}${rhythm.current.branch}`,
    summary: `当前流年节奏偏“${label}”，重点不是求快，而是把最有价值的方向做深。`,
    tenGod: rhythm.score >= 10 ? "适合确定目标、争取资源、推进关系和职业升级。" : rhythm.score <= -6 ? "适合复盘、修补、减少高风险承诺，先稳住基本盘。" : "适合观察机会、调试节奏、逐步增强确定性。",
    caution: "流年只是触发条件，真正决定结果的是选择、执行和现实资源。",
    tags: unique([label, "年度节奏", "选择优先级", "资源校准", "行动建议"])
  };
}

function personalWorkFits(chart, career) {
  return [
    `${career.title}适合从${career.tags.slice(0, 4).join("、")}中选择主线，尽量让技能可沉淀、成果可展示。`,
    chart.tenGods.includes("正官") || chart.tenGods.includes("七杀") ? "命局带官杀信号，适合承担管理、规则、专业责任或攻坚任务。" : "命局官杀不重时，事业更适合靠作品、资源、人脉或专业口碑慢慢打开。",
    chart.tenGods.includes("正财") || chart.tenGods.includes("偏财") ? "财星可用，适合关注现金流、商业模式和资源转化。" : "财星不明显时，先做能力复利，再谈大规模变现。"
  ];
}

function personalWorkRisks(chart) {
  const points = [];
  if (chart.strength.level === "身弱") points.push("事业上不宜长期高压单打独斗，容易先耗气再失判断。");
  if (chart.strength.level === "身旺") points.push("事业上不宜只按自己的节奏推进，容易与团队、伴侣或市场反馈脱节。");
  if (Math.max(...Object.values(chart.scores)) > 5.8) points.push(`五行${strongestElement(chart.scores)}过旺时，容易形成单一路径依赖，换个环境或合作方式反而能打开局面。`);
  points.push("关系、金钱、健康三类议题要分开判断，不要用一个领域的顺逆推断全部人生。");
  return unique(points);
}

function zodiacPersonal(chart) {
  return {
    score: 72,
    type: `${chart.zodiac.cn}性格辅助`,
    signs: [chart.zodiac],
    notes: [`${chart.zodiac.cn}属于${chart.zodiac.element}/${chart.zodiac.mode}，关键词是${chart.zodiac.traits.join("、")}。`, chart.zodiac.career]
  };
}

function summaryText(a, b, type, total) {
  const aDay = `${a.pillars[2].stem}${a.pillars[2].branch}`;
  const bDay = `${b.pillars[2].stem}${b.pillars[2].branch}`;
  return [
    `${a.person.name}日柱为${aDay}，${b.person.name}日柱为${bDay}，合盘类型偏向“${type}”。整体缘分指数为${total}，属于${total >= 75 ? "可以长期经营的组合" : total >= 62 ? "有吸引也需要主动磨合的组合" : "阶段感较强、需要看现实配合的组合"}。`,
    `两人的日主分别属${stemElement[a.dayMaster]}与${stemElement[b.dayMaster]}，关系核心落在${sameOrGenerated(a.dayMaster, b.dayMaster) ? "气场容易接住、节奏较易同频" : "差异明显、容易互相牵动"}。甲方喜${a.favors.join("、")}，乙方喜${b.favors.join("、")}，彼此能否补到对方所需，是这段关系发展质量的关键。`,
    "以传统命理看，合盘不只看相合，也要看冲刑害是否被双方的沟通方式消化。强吸引若缺少稳定安排，会变成反复拉扯；平稳互补若缺少共同目标，也容易变淡。"
  ];
}

function fitPoints(a, b) {
  const shared = elements.filter((element) => a.favors.includes(element) && b.favors.includes(element));
  const aSupport = a.favors.filter((element) => b.scores[element] >= 2.2);
  const bSupport = b.favors.filter((element) => a.scores[element] >= 2.2);
  return [
    shared.length ? `共同喜${shared.join("、")}，适合围绕同一生活节奏或长期目标积累关系。` : "喜用方向不同，适合把亲密关系与个人成长空间同时保留。",
    aSupport.length ? `${b.person.name}的命局能补${a.person.name}所喜的${aSupport.join("、")}，更容易带来安全感或行动资源。` : `${b.person.name}对${a.person.name}的助力更偏现实陪伴，需靠沟通放大效果。`,
    bSupport.length ? `${a.person.name}的命局能补${b.person.name}所喜的${bSupport.join("、")}，适合在事业规划、情绪支持或生活秩序上互相加分。` : `${a.person.name}对${b.person.name}的吸引不一定等同稳定，需要把承诺落到具体安排。`,
    "若共同经营项目、旅行、学习或居住规划，关系更容易从情绪吸引转为稳定协作。"
  ];
}

function relationPoints(a, b, interactions) {
  const dayPair = orderedPair(a.pillars[2].branch, b.pillars[2].branch);
  const points = [];
  if (liuHe.has(dayPair)) points.push("双方夫妻宫六合，亲密关系的自然靠近感较强，容易把对方视为稳定对象。");
  if (clashes.has(dayPair)) points.push("双方夫妻宫相冲，吸引与分歧会同时放大，重要决定不宜在情绪高点完成。");
  if (harms.has(dayPair) || punishments.has(dayPair)) points.push("日支有刑害信号，容易因边界、表达方式或家庭议题产生暗耗。");
  if (!points.length) points.push("夫妻宫没有明显合冲刑害，关系走向更依赖双方大运流年与现实互动。");
  if (interactions.stemCombos) points.push(`天干出现${interactions.stemCombos}处相合，说明表层互动有吸引、欣赏或互相牵挂的线索。`);
  if (sharedSanHe(a, b)) points.push("两人地支能构成半合或三合气势，适合共同建立习惯、团队或生活系统。");
  return points;
}

function riskPoints(a, b, interactions) {
  const points = [];
  if (interactions.branchClashes) points.push(`四柱同位有${interactions.branchClashes}处地支相冲，遇到搬迁、事业压力、家庭议题时更容易触发争执。`);
  if (interactions.friction >= 4) points.push("刑冲害偏多，关系里要避免用试探代替表达，越沉默越容易误读。");
  if (Math.max(...Object.values(mergedScores(a, b))) > 8.5) points.push("两人合局后某一五行过旺，容易形成同一种情绪或做事模式反复叠加。");
  if (a.strength.level === b.strength.level) points.push(`双方日主同为${a.strength.level}，相处时容易在同一个问题上一起用力或一起退让。`);
  if (!points.length) points.push("主要风险不在命局冲突，而在节奏管理：承诺、金钱、家庭边界需要提前说清。");
  return points;
}

function timelineItems(a, b) {
  const year = new Date().getFullYear();
  return [year, year + 1, year + 2].map((itemYear) => {
    const rhythm = annualRhythm(a, b, itemYear);
    const label = rhythm.score >= 10 ? "升温年" : rhythm.score <= -6 ? "磨合年" : "调整年";
    const text = rhythm.score >= 10 ?
      `流年${rhythm.current.stem}${rhythm.current.branch}对双方有补益或合动，适合明确关系安排、共同计划与资源整合。` :
      rhythm.score <= -6 ?
        `流年${rhythm.current.stem}${rhythm.current.branch}容易触发夫妻宫或喜忌波动，适合慢决策、少翻旧账。` :
        `流年${rhythm.current.stem}${rhythm.current.branch}偏向观察与调整，关系质量取决于日常稳定投入。`;
    return { year: itemYear, label, text };
  });
}

function personalTimelineItems(chart) {
  const year = new Date().getFullYear();
  return [year, year + 1, year + 2].map((itemYear) => {
    const rhythm = annualPersonalRhythm(chart, itemYear);
    const label = rhythm.score >= 10 ? "推进年" : rhythm.score <= -6 ? "修整年" : "调整年";
    const text = rhythm.score >= 10 ?
      `流年${rhythm.current.stem}${rhythm.current.branch}对命局有补益，适合推进事业、关系或长期计划。` :
      rhythm.score <= -6 ?
        `流年${rhythm.current.stem}${rhythm.current.branch}容易引动冲害，适合修补、蓄力、减少高风险承诺。` :
        `流年${rhythm.current.stem}${rhythm.current.branch}偏向观察与调整，关键在于稳住节奏和优先级。`;
    return { year: itemYear, label, text };
  });
}

function buildPersonalCurves(chart) {
  const birthYear = new Date(`${chart.person.date}T12:00:00`).getFullYear();
  const ages = [0, 10, 20, 30, 40, 50, 60, 70, 80];
  return [
    {
      key: "life",
      label: "生命线",
      note: "体力、稳定性与生活基本盘",
      points: ages.map((age) => curvePoint(chart, birthYear, age, "life"))
    },
    {
      key: "career",
      label: "事业线",
      note: "职业上升、资源转化与责任承担",
      points: ages.map((age) => curvePoint(chart, birthYear, age, "career"))
    },
    {
      key: "love",
      label: "感情线",
      note: "亲密关系、表达与情绪稳定",
      points: ages.map((age) => curvePoint(chart, birthYear, age, "love"))
    }
  ];
}

function buildCoupleCurves(a, b) {
  const baseYear = Math.max(
    new Date(`${a.person.date}T12:00:00`).getFullYear(),
    new Date(`${b.person.date}T12:00:00`).getFullYear()
  );
  const ages = [0, 10, 20, 30, 40, 50, 60, 70, 80];
  return [
    {
      key: "life",
      label: "生活线",
      note: "共同生活稳定度与长期经营",
      points: ages.map((age) => coupleCurvePoint(a, b, baseYear, age, "life"))
    },
    {
      key: "career",
      label: "事业线",
      note: "共同目标、事业协作与资源互补",
      points: ages.map((age) => coupleCurvePoint(a, b, baseYear, age, "career"))
    },
    {
      key: "love",
      label: "感情线",
      note: "吸引、沟通与亲密关系温度",
      points: ages.map((age) => coupleCurvePoint(a, b, baseYear, age, "love"))
    }
  ];
}

function curvePoint(chart, birthYear, age, type) {
  const rhythm = annualPersonalRhythm(chart, birthYear + age);
  const wave = Math.sin((age + stems.indexOf(chart.dayMaster) * 3) / 8) * 6;
  const yearTenGod = tenGod(chart.dayMaster, rhythm.current.stem);
  let score = 55 + rhythm.score + wave;
  if (type === "life") score += personalVitalityScore(chart) * 0.18 - 10;
  if (type === "career") {
    score += personalCareerScore(chart) * 0.18 - 10;
    if (["正官", "七杀", "正财", "偏财", "食神", "伤官"].includes(yearTenGod)) score += 7;
  }
  if (type === "love") {
    score += personalLoveScore(chart) * 0.18 - 10;
    const pair = orderedPair(chart.pillars[2].branch, rhythm.current.branch);
    if (liuHe.has(pair)) score += 8;
    if (clashes.has(pair)) score -= 8;
  }
  return { age, year: birthYear + age, value: Math.round(clamp(score, 18, 96)), pillar: `${rhythm.current.stem}${rhythm.current.branch}` };
}

function coupleCurvePoint(a, b, baseYear, age, type) {
  const year = baseYear + age;
  const rhythm = annualRhythm(a, b, year);
  const interactions = pillarInteractions(a, b);
  let score = 54 + rhythm.score + Math.sin((age + sharedSanHe(a, b) * 5) / 9) * 5;
  if (type === "life") score += interactions.harmony * 5 - interactions.friction * 2 + mutualFavorScore(a, b) * 1.2;
  if (type === "career") score += mutualFavorScore(a, b) * 2.4 + balanceScore(a, b) * 0.6;
  if (type === "love") score += interactions.affinity * 4 - interactions.branchClashes * 4 + dayMasterEffect(a, b);
  return { age, year, value: Math.round(clamp(score, 18, 96)), pillar: `${rhythm.current.stem}${rhythm.current.branch}` };
}

function mergedScores(a, b) {
  return Object.fromEntries(elements.map((element) => [element, a.scores[element] + b.scores[element]]));
}

function renderPersonalReport(chart, report) {
  setReportMode("single");
  renderScores(report.scores);
  renderChart("a", chart);
  document.querySelector("#summary-block").innerHTML = report.summary.map((text) => `<p>${text}</p>`).join("");
  renderList("#fit-list", report.fits);
  renderList("#relation-list", report.relations);
  renderList("#risk-list", report.risks);
  renderCareers(report.careers);
  renderList("#work-fit-list", report.workFits);
  renderList("#work-risk-list", report.workRisks);
  renderZodiacSingle(chart, report.zodiac);
  renderLifeCurves(report.curves);
  renderTimeline(report.timeline);
  if (window.lucide) window.lucide.createIcons();
}

function renderCompatibilityReport(a, b, report) {
  setReportMode("couple");
  renderScores(report.scores);
  renderChart("a", a);
  renderChart("b", b);
  document.querySelector("#summary-block").innerHTML = report.summary.map((text) => `<p>${text}</p>`).join("");
  renderList("#fit-list", report.fits);
  renderList("#relation-list", report.relations);
  renderList("#risk-list", report.risks);
  renderCareers(report.careers);
  renderList("#work-fit-list", report.workFits);
  renderList("#work-risk-list", report.workRisks);
  renderZodiac(a, b, report.zodiac);
  renderLifeCurves(report.curves);
  renderTimeline(report.timeline);
  if (window.lucide) window.lucide.createIcons();
}

function setReportMode(mode) {
  const isSingle = mode === "single";
  document.querySelector("#report-eyebrow").textContent = isSingle ? "Personal Report" : "Compatibility Report";
  document.querySelector("#report-title").textContent = isSingle ? "个人命盘" : "缘分结构";
  document.querySelector("#summary-title").textContent = isSingle ? "命盘结论" : "合盘结论";
  document.querySelector("#fit-title").textContent = isSingle ? "适合的点" : "适合的点";
  document.querySelector("#relation-title").textContent = isSingle ? "命局触发点" : "关系触发点";
  document.querySelector("#risk-title").textContent = isSingle ? "需要留意" : "需要磨合";
  document.querySelector("#curve-title").textContent = isSingle ? "人生发展曲线" : "双人发展曲线";
  document.querySelector("#timeline-title").textContent = isSingle ? "近年个人节奏" : "近年发展节奏";
  document.querySelector("#chart-b-card").hidden = isSingle;
  document.querySelector(".chart-layout").classList.toggle("single-chart", isSingle);
}

function renderScores(scores) {
  document.querySelector("#score-grid").innerHTML = scores.map((score) => `
    <article class="score-card">
      <strong>${score.label}</strong>
      <div class="score-value">${score.value}<span>/100</span></div>
      <div class="meter" aria-hidden="true"><span style="width:${score.value}%"></span></div>
    </article>
  `).join("");
}

function renderTimeline(items) {
  document.querySelector("#timeline").innerHTML = items.map((item) => `
    <section class="timeline-item">
      <strong>${item.year} · ${item.label}</strong>
      <p>${item.text}</p>
    </section>
  `).join("");
}

function renderCareers(careers) {
  document.querySelector("#career-grid").innerHTML = careers.map((item) => `
    <section class="insight-card">
      <div class="zodiac-badge">${item.badge}</div>
      <h4>${item.title}</h4>
      <p>${item.summary}</p>
      <p>${item.tenGod}</p>
      <p>${item.caution}</p>
      <div class="mini-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </section>
  `).join("");
}

function renderZodiac(a, b, zodiac) {
  document.querySelector("#zodiac-grid").innerHTML = [a, b].map((chart) => `
    <section class="insight-card">
      <div class="zodiac-badge">${chart.zodiac.en}</div>
      <h4>${chart.person.name} · ${chart.zodiac.cn}</h4>
      <p>${chart.zodiac.element} / ${chart.zodiac.mode}。关键词：${chart.zodiac.traits.join("、")}。</p>
      <p>${chart.zodiac.career}</p>
      <div class="mini-tags">${chart.zodiac.traits.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </section>
  `).join("") + `
    <section class="insight-card">
      <div class="zodiac-badge">${zodiac.score}/100</div>
      <h4>${zodiac.type}</h4>
      <p>${zodiac.notes.join(" ")}</p>
      <p>星座只作为性格和相处节奏的辅助参考，最终仍以两人的实际沟通、选择和共同目标为主。</p>
    </section>
  `;
  document.querySelector("#zodiac-summary").innerHTML = `<p>${a.person.name}是${a.zodiac.cn}，${b.person.name}是${b.zodiac.cn}。从西方太阳星座看，这组关系偏“${zodiac.type}”；与八字合盘结合时，可用它补充观察表达方式、社交节奏和情绪需求。</p>`;
}

function renderZodiacSingle(chart, zodiac) {
  document.querySelector("#zodiac-grid").innerHTML = `
    <section class="insight-card">
      <div class="zodiac-badge">${chart.zodiac.en}</div>
      <h4>${chart.person.name} · ${chart.zodiac.cn}</h4>
      <p>${chart.zodiac.element} / ${chart.zodiac.mode}。关键词：${chart.zodiac.traits.join("、")}。</p>
      <p>${chart.zodiac.career}</p>
      <div class="mini-tags">${chart.zodiac.traits.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </section>
    <section class="insight-card">
      <div class="zodiac-badge">${zodiac.score}/100</div>
      <h4>${zodiac.type}</h4>
      <p>${zodiac.notes.join(" ")}</p>
      <p>星座用于补充外在性格与表达方式；八字用于观察资源结构、人生阶段和取舍方向。</p>
    </section>
  `;
  document.querySelector("#zodiac-summary").innerHTML = `<p>${chart.person.name}是${chart.zodiac.cn}。太阳星座显示外在表达偏${chart.zodiac.traits.join("、")}；与八字结合时，可重点观察这种表达如何服务职业、感情和生活节奏。</p>`;
}

function renderLifeCurves(curves) {
  const width = 980;
  const height = 340;
  const padding = { left: 58, right: 34, top: 34, bottom: 46 };
  const allPoints = curves[0].points;
  const maxAge = allPoints[allPoints.length - 1].age;
  const xFor = (age) => padding.left + (age / maxAge) * (width - padding.left - padding.right);
  const yFor = (value, offset = 0) => padding.top + (1 - value / 100) * (height - padding.top - padding.bottom) + offset;
  const smoothPath = (points, offset) => {
    const mapped = points.map((point) => [xFor(point.age), yFor(point.value, offset)]);
    return mapped.reduce((path, point, index) => {
      if (index === 0) return `M ${point[0]} ${point[1]}`;
      const prev = mapped[index - 1];
      const cx = (prev[0] + point[0]) / 2;
      return `${path} C ${cx} ${prev[1]}, ${cx} ${point[1]}, ${point[0]} ${point[1]}`;
    }, "");
  };
  const offsets = { life: 0, career: 12, love: -10 };
  const ages = allPoints.map((point) => point.age);
  const grid = ages.map((age) => `<line class="curve-grid" x1="${xFor(age)}" y1="${padding.top}" x2="${xFor(age)}" y2="${height - padding.bottom}" />`).join("");
  const labels = ages.map((age) => `<text class="curve-age" x="${xFor(age)}" y="${height - 18}" text-anchor="middle">${age}岁</text>`).join("");
  const lines = curves.map((curve, index) => {
    const offset = offsets[curve.key] || 0;
    const last = curve.points[curve.points.length - 1];
    const labelX = xFor(last.age) - 74;
    const labelY = yFor(last.value, offset) - 28;
    return `
      <path class="curve-line ${curve.key}" d="${smoothPath(curve.points, offset)}" />
      ${curve.points.map((point) => `<circle class="curve-dot ${curve.key}" cx="${xFor(point.age)}" cy="${yFor(point.value, offset)}" r="4.5" />`).join("")}
      <rect class="curve-label-bg" x="${labelX - 8}" y="${labelY - 17}" width="76" height="24" rx="5" />
      <text class="curve-label ${curve.key}" x="${labelX}" y="${labelY}">${curve.label}</text>
      <text class="curve-note" x="${padding.left}" y="${28 + index * 22}">${curve.label}：${curve.note}</text>
    `;
  }).join("");

  document.querySelector("#life-curves").innerHTML = `
    <div class="curve-legend" aria-hidden="true">
      ${curves.map((curve) => `<span class="${curve.key}"><i class="curve-swatch"></i>${curve.label}</span>`).join("")}
    </div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="人生发展曲线图">
      <line class="curve-axis" x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" />
      <line class="curve-axis" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" />
      ${grid}
      <line class="curve-grid" x1="${padding.left}" y1="${yFor(75)}" x2="${width - padding.right}" y2="${yFor(75)}" />
      <line class="curve-grid" x1="${padding.left}" y1="${yFor(50)}" x2="${width - padding.right}" y2="${yFor(50)}" />
      <line class="curve-grid" x1="${padding.left}" y1="${yFor(25)}" x2="${width - padding.right}" y2="${yFor(25)}" />
      ${lines}
      ${labels}
      <text class="curve-age" x="20" y="${yFor(75) + 4}">强</text>
      <text class="curve-age" x="20" y="${yFor(50) + 4}">平</text>
      <text class="curve-age" x="20" y="${yFor(25) + 4}">弱</text>
    </svg>
  `;
}

function renderChart(prefix, chart) {
  document.querySelector(`#chart-${prefix}-title`).textContent = `${chart.person.name}命盘`;
  document.querySelector(`#chart-${prefix}-tag`).textContent = `${chart.dayMaster}${stemElement[chart.dayMaster]} · ${chart.strength.level} · ${chart.zodiac.cn}`;
  const labels = ["年柱", "月柱", "日柱", "时柱"];
  const rows = [
    ["天干", ...chart.pillars.map((pillar) => pillar ? `<span class="stem">${pillar.stem}</span>` : "未知")],
    ["地支", ...chart.pillars.map((pillar) => pillar ? `<span class="branch">${pillar.branch}</span>` : "未知")],
    ["十神", ...chart.tenGods],
    ["藏干", ...chart.pillars.map((pillar) => pillar ? hiddenStems[pillar.branch].join(" ") : "未知")]
  ];
  document.querySelector(`#chart-${prefix}`).innerHTML = [
    `<div class="pillar-cell pillar-head"></div>`,
    ...labels.map((label) => `<div class="pillar-cell pillar-head">${label}</div>`),
    ...rows.flatMap((row) => row.map((cell, index) => `<div class="pillar-cell ${index === 0 ? "row-head" : ""}">${cell}</div>`))
  ].join("");
}

function renderList(selector, items) {
  document.querySelector(selector).innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mod(value, base) {
  return ((value % base) + base) % base;
}
