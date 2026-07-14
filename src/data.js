export function mapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function item(time, title, detail, tag, zone, mapsQuery) {
  return { time, title, detail, tag, zone, mapsQuery };
}

export const TRIP_START = new Date(2026, 7, 20); // Aug 20, 2026
export const TRIP_DAYS = 7;

export const PLACES = [
  {
    id: "scramble",
    zone: "near",
    category: "地標",
    name: "澀谷十字路口 / Scramble Square",
    detail: "經典人潮浪潮與展望台。",
    transit: "走路可達澀谷站",
    mapsQuery: "Shibuya Scramble Crossing Tokyo",
  },
  {
    id: "parco",
    zone: "near",
    category: "商場",
    name: "Shibuya PARCO",
    detail: "動漫、遊戲、模型與興趣選物天堂。",
    transit: "澀谷站步行",
    mapsQuery: "Shibuya PARCO Tokyo",
  },
  {
    id: "miyashita",
    zone: "near",
    category: "商場",
    name: "Miyashita Park",
    detail: "屋頂公園、逛街與輕食。",
    transit: "澀谷站步行",
    mapsQuery: "Miyashita Park Shibuya Tokyo",
  },
  {
    id: "takeshita",
    zone: "near",
    category: "街頭",
    name: "竹下通",
    detail: "原宿潮流小吃與逛街。",
    transit: "原宿站步行",
    mapsQuery: "Takeshita Street Harajuku Tokyo",
  },
  {
    id: "cat-street",
    zone: "near",
    category: "Cafe",
    name: "Cat Street 巷弄 Cafe",
    detail: "安靜咖啡與選物店散步。",
    transit: "原宿／表參道步行",
    mapsQuery: "Cat Street Harajuku cafe Tokyo",
  },
  {
    id: "meiji",
    zone: "near",
    category: "文化",
    name: "明治神宮",
    detail: "原宿旁森林參道，早晨最安靜。",
    transit: "原宿站步行",
    mapsQuery: "Meiji Jingu Tokyo",
  },
  {
    id: "akihabara",
    zone: "expedition",
    category: "遠征",
    name: "秋葉原電氣街",
    detail: "模型、遊戲與動漫店一日遠征。",
    transit: "JR／地鐵轉乘",
    mapsQuery: "Akihabara Electric Town Tokyo",
  },
  {
    id: "shinjuku-gyoen",
    zone: "expedition",
    category: "遠征",
    name: "新宿御苑",
    detail: "綠地散步半日，轉乘可達。",
    transit: "地鐵至新宿御苑前",
    mapsQuery: "Shinjuku Gyoen National Garden Tokyo",
  },
];

/** 7 fully detailed days — no free days. ~1 excursion day (~5–14%). */
export const ITINERARY = [
  {
    id: "2026-08-20",
    day: 1,
    week: 1,
    title: "抵達 · 澀谷安頓",
    vibe: "落樓即到 · 熟悉基地",
    mode: "near",
    items: [
      item("13:00", "入住澀谷／原宿附近", "安頓行李，設定基地為澀谷站步行圈。", "生活", "near", "Shibuya Station Tokyo hotel"),
      item("16:00", "澀谷十字路口初體驗", "先感受人潮節奏，別急著逛街。", "地標", "near", "Shibuya Scramble Crossing"),
      item("19:00", "Miyashita Park 晚餐", "屋頂公園旁找一間輕鬆晚餐。", "美食", "near", "Miyashita Park Shibuya restaurants"),
    ],
  },
  {
    id: "2026-08-21",
    day: 2,
    week: 1,
    title: "原宿竹下 · Cat Street",
    vibe: "落樓即到 · 街頭節奏",
    mode: "near",
    items: [
      item("10:30", "明治神宮晨間散步", "避開人潮，走參道吸一口氣。", "文化", "near", "Meiji Jingu Tokyo"),
      item("12:30", "竹下通小吃與逛街", "可麗餅、雜貨，慢慢晃。", "街頭", "near", "Takeshita Street Harajuku"),
      item("15:30", "Cat Street 巷弄 Cafe", "找間安靜咖啡放空，適合久坐。", "Cafe", "near", "Cat Street Harajuku cafe Tokyo"),
      item("19:00", "表參道／原宿晚餐", "步行回澀谷前解決晚餐。", "美食", "near", "Omotesando restaurants Tokyo"),
    ],
  },
  {
    id: "2026-08-22",
    day: 3,
    week: 1,
    title: "PARCO 模型獵寶日",
    vibe: "落樓即到 · 興趣選物",
    mode: "near",
    items: [
      item("11:00", "Shibuya PARCO 開逛", "動漫、遊戲、模型樓層慢慢挖寶。", "購物", "near", "Shibuya PARCO Tokyo"),
      item("14:30", "PARCO Cafe／休息", "休息腿力，整理想買清單。", "Cafe", "near", "Shibuya PARCO cafe"),
      item("17:00", "Scramble Square 展望（可選）", "有體力再上展望台看澀谷夜景。", "地標", "near", "Shibuya Scramble Square"),
      item("19:30", "澀谷居酒屋", "串燒與高湯收工。", "美食", "near", "Shibuya izakaya"),
    ],
  },
  {
    id: "2026-08-23",
    day: 4,
    week: 1,
    title: "遠征 · 秋葉原",
    vibe: "5% 遠征 · 興趣＋模型",
    mode: "expedition",
    items: [
      item("10:30", "澀谷出發往秋葉原", "JR 山手線或地鐵轉乘，預留時間。", "交通", "expedition", "Shibuya to Akihabara Tokyo"),
      item("12:00", "秋葉原電氣街獵寶", "模型店、遊戲中心、動漫大樓。", "購物", "expedition", "Akihabara Electric Town Tokyo"),
      item("16:00", "秋葉原 Cafe 休息", "坐下來清點戰利品。", "Cafe", "expedition", "Akihabara cafe Tokyo"),
      item("18:30", "回澀谷晚餐", "傍晚前返回基地圈。", "美食", "near", "Shibuya Station restaurants"),
    ],
  },
  {
    id: "2026-08-24",
    day: 5,
    week: 1,
    title: "Miyashita · 澀谷室內日",
    vibe: "落樓即到 · 恢復腿力",
    mode: "near",
    items: [
      item("11:00", "Miyashita Park 半日", "逛街、屋頂公園、輕食。", "商場", "near", "Miyashita Park Shibuya"),
      item("14:30", "澀谷巷弄 Cafe", "安靜久坐，補日記或咖啡足跡。", "Cafe", "near", "quiet cafe Shibuya Tokyo"),
      item("18:00", "PARCO 二訪補貨", "只買昨天猶豫的那一件。", "購物", "near", "Shibuya PARCO Tokyo"),
      item("20:00", "十字路口夜景散步", "人潮夜景收工。", "漫步", "near", "Shibuya Crossing at night"),
    ],
  },
  {
    id: "2026-08-25",
    day: 6,
    week: 1,
    title: "原宿深度 · 選物日",
    vibe: "落樓即到 · 慢逛",
    mode: "near",
    items: [
      item("10:30", "Cat Street 晨間咖啡", "開機前先來一杯。", "Cafe", "near", "Cat Street cafe Harajuku"),
      item("13:00", "原宿選物店巡禮", "服飾、雜貨、小玩具店。", "購物", "near", "Harajuku shopping Tokyo"),
      item("16:30", "竹下通尾聲補給", "伴手禮與零食。", "街頭", "near", "Takeshita Street Harajuku"),
      item("19:00", "澀谷告別前晚餐", "回訪最愛的那一間。", "美食", "near", "Shibuya dinner Tokyo"),
    ],
  },
  {
    id: "2026-08-26",
    day: 7,
    week: 1,
    title: "收心 · 返程準備",
    vibe: "落樓即到 · 行李日",
    mode: "near",
    items: [
      item("10:30", "最後一杯 Cat Street Cafe", "整理足跡與開支。", "Cafe", "near", "Cat Street Harajuku cafe"),
      item("13:00", "PARCO／Miyashita 補漏", "只買必要伴手禮。", "購物", "near", "Shibuya PARCO souvenirs"),
      item("16:00", "酒店整理行李", "檢查護照、充電器、模型包裝。", "生活", "near", "Shibuya Station Tokyo"),
      item("依航班", "出發往機場", "預留交通與安檢時間。", "交通", "near", "Shibuya to Haneda or Narita"),
    ],
  },
];

export const CHECKLIST = [
  {
    category: "護照與重要文件",
    items: [
      { id: "passport", label: "護照／回程機票" },
      { id: "hotel", label: "酒店訂單（澀谷／原宿）" },
      { id: "ic-card", label: "Suica／Pasmo" },
      { id: "cash-card", label: "現金與信用卡" },
      { id: "insurance", label: "旅遊保險文件" },
      { id: "copies", label: "證件雲端備份" },
    ],
  },
  {
    category: "衣物鞋襪",
    items: [
      { id: "tops", label: "上衣 5–7 件" },
      { id: "bottoms", label: "長褲／短褲 3–4 件" },
      { id: "underwear", label: "內衣褲襪子" },
      { id: "jacket", label: "薄外套（空調房）" },
      { id: "shoes", label: "好走的鞋 ×2（澀谷常走路）" },
      { id: "rain", label: "摺疊傘" },
    ],
  },
  {
    category: "隨身電子產品",
    items: [
      { id: "phone", label: "手機＋充電器" },
      { id: "powerbank", label: "行動電源" },
      { id: "adapter", label: "轉插（日本兩腳）" },
      { id: "earbuds", label: "耳機" },
      { id: "cable", label: "傳輸線備援" },
      { id: "sim", label: "網卡／eSIM" },
    ],
  },
  {
    category: "個人護理",
    items: [
      { id: "toothbrush", label: "牙刷牙膏" },
      { id: "skincare", label: "洗面／保濕／防曬" },
      { id: "hygiene", label: "濕紙巾／衛生用品" },
      { id: "bottle", label: "環保杯／水壺" },
      { id: "mask", label: "口罩（地鐵人潮）" },
    ],
  },
  {
    category: "常用藥物",
    items: [
      { id: "prescription", label: "個人處方藥" },
      { id: "pain", label: "止痛／感冒藥" },
      { id: "stomach", label: "腸胃藥" },
      { id: "bandages", label: "OK蹦、消毒棉片" },
      { id: "allergy", label: "抗過敏藥（如需要）" },
    ],
  },
];

export const CAFE_TAGS = [
  { id: "outlets", label: "有插座", badge: "badge-teal" },
  { id: "quiet", label: "安靜適合久坐放空", badge: "badge-sky" },
  { id: "coffee", label: "咖啡極正", badge: "badge-rose" },
  { id: "nolimit", label: "不限時", badge: "badge-amber" },
  { id: "dessert", label: "甜點優秀", badge: "badge-pink" },
  { id: "hobby", label: "附近有玩具模型店可逛", badge: "badge-lime" },
];

export const EXPENSE_CATEGORIES = [
  { id: "food", label: "餐飲", note: "餐飲", color: "#e11d48" },
  { id: "cafe", label: "咖啡", note: "咖啡", color: "#0f766e" },
  { id: "shopping", label: "購物", note: "購物", color: "#ea580c" },
  { id: "transport", label: "交通", note: "交通", color: "#0369a1" },
  { id: "hobby", label: "玩具／興趣", note: "玩具／興趣", color: "#7c3aed" },
  { id: "other", label: "其他", note: "其他", color: "#64748b" },
];

export const DEFAULT_RATE = 0.051; // 100 JPY = 5.1 HKD
export const DEFAULT_BUDGET_JPY = 80000;
