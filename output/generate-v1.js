const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation";
pres.title = "Large Language Models Cannot Self-Correct Reasoning Yet";

// ── Design tokens ──
const C = {
  navy: "1A1F36",
  ice: "F0F4FF",
  blue: "4A90D9",
  white: "FFFFFF",
  black: "111111",
  muted: "8891A5",
  mutedLight: "B0B8CC",
  red: "CC3333",
  green: "2E8B57",
  orange: "D4760A",
  gray: "CCCCCC",
  tableHead: "2A3558",
  tableRow1: "F5F7FC",
  tableRow2: "FFFFFF",
};

const TOTAL = 20;
const TITLE_FONT = "Cambria";
const BODY_FONT = "Calibri";
const FOOTER_TEXT = "Large Language Models Cannot Self-Correct Reasoning Yet  |  ICLR 2024";

function pad(n) {
  return String(n).padStart(2, "0");
}

// ── Helpers ──
function addFooter(slide, num, opts = {}) {
  const isDark = opts.dark || false;
  const fg = isDark ? C.mutedLight : C.muted;
  // Title footer
  slide.addText(FOOTER_TEXT, {
    x: 0.5, y: 5.12, w: 7.5, h: 0.3,
    fontSize: 8, fontFace: BODY_FONT, color: fg, align: "left", margin: 0,
  });
  // Slide counter
  slide.addText(`${pad(num)}/${TOTAL}`, {
    x: 8.5, y: 5.12, w: 1.0, h: 0.3,
    fontSize: 8, fontFace: BODY_FONT, color: fg, align: "right", margin: 0,
  });
}

function addTopicLabel(slide, topic, opts = {}) {
  const isDark = opts.dark || false;
  slide.addText(topic.toUpperCase(), {
    x: 0.5, y: 0.2, w: 5, h: 0.25,
    fontSize: 9, fontFace: BODY_FONT, color: isDark ? C.mutedLight : C.muted,
    bold: true, margin: 0, charSpacing: 1.5,
  });
}

function darkSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.navy };
  return s;
}

function lightSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.white };
  return s;
}

function addIconCircle(slide, x, y, text, size) {
  const sz = size || 0.35;
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y, w: sz, h: sz, fill: { color: C.blue },
  });
  slide.addText(text, {
    x: x, y: y, w: sz, h: sz,
    fontSize: 11, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0, bold: true,
  });
}

// ═══════════════════════════════════════════
// SLIDE 1 — Title (dark)
// ═══════════════════════════════════════════
{
  const s = darkSlide();
  s.addText("Large Language Models\nCannot Self-Correct\nReasoning Yet", {
    x: 0.5, y: 0.5, w: 9, h: 2.2,
    fontSize: 38, fontFace: TITLE_FONT, color: C.white, bold: true, align: "left", margin: 0,
    lineSpacingMultiple: 1.05,
  });
  s.addText("ICLR 2024  \u2014  Group Presentation", {
    x: 0.5, y: 2.75, w: 9, h: 0.35,
    fontSize: 14, fontFace: BODY_FONT, color: C.blue, margin: 0,
  });
  s.addText("Paper by Huang, Weng, Liang, Peng, Wu, Zhang", {
    x: 0.5, y: 3.15, w: 9, h: 0.3,
    fontSize: 11, fontFace: BODY_FONT, color: C.muted, margin: 0,
  });

  const names = [
    "Nafis Islam Kabbo  \u2014  2303180", "Srijon  \u2014  2303179",
    "Anindo  \u2014  2303181", "Mahid  \u2014  2303127",
    "Jebon  \u2014  2303160", "Refayet  \u2014  2303148",
  ];
  const cols = 3; const startX = 0.5; const startY = 3.7; const colW = 3.0; const rowH = 0.35;
  names.forEach((n, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    s.addText(n, {
      x: startX + col * colW, y: startY + row * rowH, w: 2.8, h: 0.3,
      fontSize: 11, fontFace: BODY_FONT, color: C.mutedLight, margin: 0,
    });
  });

  addFooter(s, 1, { dark: true });
}

// ═══════════════════════════════════════════
// SLIDE 2 — Agenda (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "Overview");
  s.addText("Presentation outline", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const sections = [
    { num: "1", title: "Introduction and research problem", name: "Nafis" },
    { num: "2", title: "Literature review and background", name: "Srijon" },
    { num: "3", title: "Methodology and experimental setup", name: "Anindo" },
    { num: "4", title: "Main results: intrinsic self-correction fails", name: "Mahid" },
    { num: "5", title: "Why does self-correction fail?", name: "Jebon" },
    { num: "6", title: "Conclusion, limitations, and future directions", name: "Refayet" },
  ];
  const baseY = 1.3;
  sections.forEach((sec, i) => {
    const y = baseY + i * 0.6;
    addIconCircle(s, 0.7, y + 0.03, sec.num, 0.35);
    s.addText(sec.title, {
      x: 1.25, y: y, w: 6.0, h: 0.25,
      fontSize: 15, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0,
    });
    s.addText(sec.name, {
      x: 1.25, y: y + 0.25, w: 6.0, h: 0.2,
      fontSize: 11, fontFace: BODY_FONT, color: C.muted, margin: 0,
    });
  });
  addFooter(s, 2);
}

// ═══════════════════════════════════════════
// SLIDE 3 — What are LLMs? (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "1. Introduction");
  s.addText("What are large language models?", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  // Left column
  s.addText([
    { text: "Large language models (LLMs) are neural networks trained on massive text corpora. They generate fluent text, solve math problems, write code, and answer complex questions.", options: { fontSize: 14, fontFace: BODY_FONT, color: C.black, breakLine: true, paraSpaceAfter: 12 } },
    { text: "Key models in this study:", options: { fontSize: 14, fontFace: BODY_FONT, color: C.navy, bold: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "GPT-3.5-Turbo", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "GPT-4 and GPT-4-Turbo", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "Llama-2-70B-Chat", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true } },
  ], {
    x: 0.5, y: 1.2, w: 4.5, h: 3.2, valign: "top", margin: 0,
  });

  // Right: flow diagram
  const boxW = 2.0; const boxH = 0.55; const rx = 6.0; const gap = 0.8;
  // Input box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 1.6, w: boxW, h: boxH, fill: { color: C.ice }, rectRadius: 0.1 });
  s.addText("Text input", { x: rx, y: 1.6, w: boxW, h: boxH, fontSize: 13, fontFace: BODY_FONT, color: C.navy, align: "center", valign: "middle", margin: 0, bold: true });

  // Arrow down
  s.addText("\u2193", { x: rx, y: 1.6 + boxH, w: boxW, h: 0.4, fontSize: 22, color: C.blue, align: "center", valign: "middle", margin: 0 });

  // LLM box
  const midY = 1.6 + boxH + 0.4;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: midY, w: boxW, h: boxH, fill: { color: C.blue } });
  s.addText("LLM", { x: rx, y: midY, w: boxW, h: boxH, fontSize: 16, fontFace: TITLE_FONT, color: C.white, align: "center", valign: "middle", margin: 0, bold: true });

  // Arrow down
  s.addText("\u2193", { x: rx, y: midY + boxH, w: boxW, h: 0.4, fontSize: 22, color: C.blue, align: "center", valign: "middle", margin: 0 });

  // Output box
  const outY = midY + boxH + 0.4;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: outY, w: boxW, h: boxH, fill: { color: C.ice }, rectRadius: 0.1 });
  s.addText("Generated response", { x: rx, y: outY, w: boxW, h: boxH, fontSize: 13, fontFace: BODY_FONT, color: C.navy, align: "center", valign: "middle", margin: 0, bold: true });

  s.addNotes("Presenter: Nafis Islam Kabbo. Introduce what LLMs are, the key models studied in the paper.");
  addFooter(s, 3);
}

// ═══════════════════════════════════════════
// SLIDE 4 — The self-correction paradox (dark)
// ═══════════════════════════════════════════
{
  const s = darkSlide();
  addTopicLabel(s, "1. Introduction", { dark: true });

  s.addText("If an LLM can self-correct,\nwhy doesn\u2019t it give the right\nanswer the first time?", {
    x: 0.8, y: 0.9, w: 8.5, h: 2.2,
    fontSize: 30, fontFace: TITLE_FONT, color: C.white, bold: true, align: "left", margin: 0,
    lineSpacingMultiple: 1.1,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 3.3, w: 8.4, h: 1.4, fill: { color: "232948" }, rectRadius: 0.12 });
  s.addText([
    { text: "Intrinsic self-correction", options: { fontSize: 16, fontFace: BODY_FONT, color: C.blue, bold: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "The model attempts to fix its own responses using only its internal capabilities, without any external feedback such as oracle labels, human review, or tool outputs.", options: { fontSize: 13, fontFace: BODY_FONT, color: C.mutedLight } },
  ], {
    x: 1.1, y: 3.45, w: 7.8, h: 1.1, valign: "top", margin: 0,
  });

  addFooter(s, 4, { dark: true });
}

// ═══════════════════════════════════════════
// SLIDE 5 — Prior self-correction methods (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "2. Literature review");
  s.addText("Prior self-correction methods", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const methods = [
    { name: "RCI", cite: "Kim et al., 2023", desc: "Recursive Criticism and Improvement. The model criticizes its output, then revises based on its own critique." },
    { name: "Reflexion", cite: "Shinn et al., 2023", desc: "Verbal reinforcement through self-reflection. Uses environment signals to guide the next attempt." },
    { name: "Self-Refine", cite: "Madaan et al., 2023", desc: "Iterative feedback and refinement loop. The model generates feedback on its own output, then refines." },
    { name: "Multi-Agent Debate", cite: "Du et al., 2023", desc: "Multiple LLM instances debate and critique each other\u2019s responses to reach consensus." },
  ];

  const cardW = 4.05; const cardH = 1.55; const gapX = 0.4; const gapY = 0.35;
  methods.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = 0.5 + col * (cardW + gapX);
    const cy = 1.3 + row * (cardH + gapY);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.ice }, rectRadius: 0.1,
      shadow: { type: "outer", blur: 6, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.3 },
    });
    s.addText(m.name, {
      x: cx + 0.2, y: cy + 0.15, w: cardW - 0.4, h: 0.3,
      fontSize: 16, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
    });
    s.addText(m.cite, {
      x: cx + 0.2, y: cy + 0.45, w: cardW - 0.4, h: 0.22,
      fontSize: 10, fontFace: BODY_FONT, color: C.blue, margin: 0, italic: true,
    });
    s.addText(m.desc, {
      x: cx + 0.2, y: cy + 0.72, w: cardW - 0.4, h: 0.7,
      fontSize: 11, fontFace: BODY_FONT, color: C.black, margin: 0, valign: "top",
    });
  });

  s.addNotes("Presenter: Srijon. Cover RCI, Reflexion, Self-Refine, Multi-Agent Debate.");
  addFooter(s, 5);
}

// ═══════════════════════════════════════════
// SLIDE 6 — Feedback types (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "2. Literature review");
  s.addText("Intrinsic vs external feedback", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  // Intrinsic card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.3, w: 4.2, h: 3.2, fill: { color: C.ice }, rectRadius: 0.1 });
  addIconCircle(s, 0.8, 1.5, "I", 0.4);
  s.addText("Intrinsic self-correction", {
    x: 1.35, y: 1.52, w: 3.0, h: 0.3,
    fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0,
  });
  s.addText([
    { text: "Model uses only its own parameters and knowledge", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "No external signals of any kind", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "The focus of this paper", options: { fontSize: 13, fontFace: BODY_FONT, color: C.blue, bullet: true, bold: true } },
  ], { x: 0.8, y: 2.1, w: 3.6, h: 2.0, margin: 0, valign: "top" });

  // External card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.3, w: 4.2, h: 3.2, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 6, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.3 } });
  addIconCircle(s, 5.6, 1.5, "E", 0.4);
  s.addText("External feedback", {
    x: 6.15, y: 1.52, w: 3.0, h: 0.3,
    fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0,
  });
  s.addText([
    { text: "Oracle labels (ground truth correctness)", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Human review and annotations", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Tool outputs (code execution, search)", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Other model feedback", options: { fontSize: 13, fontFace: BODY_FONT, color: C.black, bullet: true } },
  ], { x: 5.6, y: 2.1, w: 3.6, h: 2.0, margin: 0, valign: "top" });

  addFooter(s, 6);
}

// ═══════════════════════════════════════════
// SLIDE 7 — Issues in prior evaluations (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "2. Literature review");
  s.addText("Issues in prior evaluation setups", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const tableRows = [
    [{ text: "Method", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 13, fontFace: BODY_FONT } },
     { text: "Issue identified", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 13, fontFace: BODY_FONT } },
     { text: "Paper section", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 13, fontFace: BODY_FONT } }],
    [{ text: "RCI (Kim et al., 2023)", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Uses oracle labels to guide self-correction", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Section 3", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } }],
    [{ text: "Reflexion (Shinn et al., 2023)", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Uses oracle labels to guide self-correction", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Section 3", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } }],
    [{ text: "Multi-Agent Debate (Du et al., 2023)", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Unfair comparison to self-consistency (unequal inference cost)", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Section 4", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } }],
    [{ text: "Self-Refine (Madaan et al., 2023)", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Sub-optimal initial prompt design", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Section 5", options: { fontSize: 12, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } }],
  ];

  s.addTable(tableRows, {
    x: 0.5, y: 1.4, w: 9.0,
    colW: [3.2, 4.2, 1.6],
    rowH: [0.4, 0.45, 0.45, 0.45, 0.45],
    border: { type: "solid", pt: 0.5, color: C.gray },
    margin: [4, 8, 4, 8],
  });

  s.addText("Table 1 from the paper. Each method\u2019s evaluation has a specific flaw that inflates the reported improvement.", {
    x: 0.5, y: 3.9, w: 9.0, h: 0.3,
    fontSize: 10, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0,
  });

  addFooter(s, 7);
}

// ═══════════════════════════════════════════
// SLIDE 8 — Evaluation benchmarks (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "3. Methodology");
  s.addText("Evaluation benchmarks", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const benchmarks = [
    { name: "GSM8K", size: "1,319", type: "Math word problems", desc: "Grade school math reasoning. Kim et al. reported ~7% improvement with self-correction using oracle labels." },
    { name: "CommonSenseQA", size: "1,221", type: "Multi-choice questions", desc: "Commonsense reasoning with distractor options. Kim et al. reported ~15% improvement with oracle-guided correction." },
    { name: "HotpotQA", size: "100", type: "Multi-hop QA", desc: "Open-domain multi-hop questions. Closed-book setting, exact match metric. Shinn et al. showed improvement." },
  ];

  benchmarks.forEach((b, i) => {
    const cx = 0.5 + i * 3.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.3, w: 2.8, h: 3.3, fill: { color: C.ice }, rectRadius: 0.1,
      shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.25 },
    });
    // Big number
    s.addText(b.size, {
      x: cx, y: 1.5, w: 2.8, h: 0.55,
      fontSize: 36, fontFace: TITLE_FONT, color: C.blue, bold: true, align: "center", margin: 0,
    });
    s.addText(b.type, {
      x: cx, y: 2.05, w: 2.8, h: 0.25,
      fontSize: 10, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0,
    });
    s.addText(b.name, {
      x: cx + 0.2, y: 2.5, w: 2.4, h: 0.3,
      fontSize: 16, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
    });
    s.addText(b.desc, {
      x: cx + 0.2, y: 2.85, w: 2.4, h: 1.5,
      fontSize: 11, fontFace: BODY_FONT, color: C.black, margin: 0, valign: "top",
    });
  });

  s.addNotes("Presenter: Anindo. Explain the three benchmark datasets.");
  addFooter(s, 8);
}

// ═══════════════════════════════════════════
// SLIDE 9 — Models and setup (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "3. Methodology");
  s.addText("Models and experimental setup", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  // Left: Models
  s.addText("Models tested", {
    x: 0.5, y: 1.25, w: 4.2, h: 0.3,
    fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0,
  });
  const models = ["GPT-3.5-Turbo (gpt-3.5-turbo-0613)", "GPT-4 (accessed 2023/08/29)", "GPT-4-Turbo (gpt-4-1106-preview)", "Llama-2-70B-Chat"];
  models.forEach((m, i) => {
    const y = 1.7 + i * 0.55;
    addIconCircle(s, 0.7, y + 0.05, String(i + 1), 0.3);
    s.addText(m, {
      x: 1.15, y: y, w: 3.5, h: 0.4,
      fontSize: 13, fontFace: BODY_FONT, color: C.black, margin: 0, valign: "middle",
    });
  });

  // Right: Setup
  s.addText("Experimental setup", {
    x: 5.3, y: 1.25, w: 4.2, h: 0.3,
    fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.65, w: 4.2, h: 2.8, fill: { color: C.ice }, rectRadius: 0.1 });
  s.addText([
    { text: "Max 2 rounds of self-correction per question", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Temperature: 1.0 for GPT models, 0.7 for Llama-2", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "GPT-3.5: full evaluation sets", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Other models: 200 random samples per dataset (100 for HotpotQA)", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Comparison: oracle feedback vs intrinsic self-correction", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true } },
  ], { x: 5.5, y: 1.8, w: 3.8, h: 2.5, margin: 0, valign: "top" });

  addFooter(s, 9);
}

// ═══════════════════════════════════════════
// SLIDE 10 — Self-correction process (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "3. Methodology");
  s.addText("Self-correction process", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  // Flow: 4 boxes with arrows
  const steps = [
    { label: "Step 1", text: "Generate\ninitial response", color: C.blue },
    { label: "Step 2", text: "Model reviews\nits answer", color: C.navy },
    { label: "Step 3", text: "Model produces\nrevised answer", color: C.blue },
    { label: "Step 4", text: "Repeat\n(max 2 rounds)", color: C.navy },
  ];

  steps.forEach((st, i) => {
    const x = 0.5 + i * 2.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: 1.5, w: 2.0, h: 1.2, fill: { color: st.color }, rectRadius: 0.1 });
    s.addText(st.label, { x: x, y: 1.55, w: 2.0, h: 0.3, fontSize: 10, fontFace: BODY_FONT, color: C.mutedLight, align: "center", margin: 0 });
    s.addText(st.text, { x: x, y: 1.8, w: 2.0, h: 0.7, fontSize: 13, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0, bold: true });
    if (i < 3) {
      s.addText("\u2192", { x: x + 2.0, y: 1.8, w: 0.4, h: 0.6, fontSize: 24, color: C.muted, align: "center", valign: "middle", margin: 0 });
    }
  });

  // Oracle vs Intrinsic
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.2, w: 4.2, h: 1.2, fill: { color: "E8F5E9" }, rectRadius: 0.1 });
  s.addText("With oracle feedback", { x: 0.7, y: 3.3, w: 3.8, h: 0.3, fontSize: 14, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0 });
  s.addText("Model receives correctness signal at Step 2. Performance typically improves.", { x: 0.7, y: 3.65, w: 3.8, h: 0.6, fontSize: 12, fontFace: BODY_FONT, color: C.black, margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 3.2, w: 4.2, h: 1.2, fill: { color: "FFF3E0" }, rectRadius: 0.1 });
  s.addText("Intrinsic (no feedback)", { x: 5.5, y: 3.3, w: 3.8, h: 0.3, fontSize: 14, fontFace: BODY_FONT, color: C.orange, bold: true, margin: 0 });
  s.addText("Model judges its own answer at Step 2 with no external signal. Performance drops.", { x: 5.5, y: 3.65, w: 3.8, h: 0.6, fontSize: 12, fontFace: BODY_FONT, color: C.black, margin: 0 });

  addFooter(s, 10);
}

// ═══════════════════════════════════════════
// SLIDE 11 — Section opener: Results (dark)
// ═══════════════════════════════════════════
{
  const s = darkSlide();
  addTopicLabel(s, "4. Main results", { dark: true });
  s.addText("Main results", {
    x: 0.8, y: 1.2, w: 8.5, h: 1.0,
    fontSize: 42, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0,
  });
  s.addText("Intrinsic self-correction fails\nacross all models and benchmarks", {
    x: 0.8, y: 2.4, w: 8.5, h: 1.0,
    fontSize: 18, fontFace: BODY_FONT, color: C.mutedLight, margin: 0, lineSpacingMultiple: 1.3,
  });
  s.addText("Presenter: Mahid", {
    x: 0.8, y: 3.6, w: 4, h: 0.3,
    fontSize: 12, fontFace: BODY_FONT, color: C.blue, margin: 0,
  });
  addFooter(s, 11, { dark: true });
}

// ═══════════════════════════════════════════
// SLIDE 12 — GPT-3.5 and GPT-4 results (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "4. Main results");
  s.addText("Performance drops after self-correction", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const tRows = [
    [{ text: "Model", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "Method", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "GSM8K", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "CSQA", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "HotpotQA", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } }],
    // GPT-3.5
    [{ text: "GPT-3.5", options: { bold: true, fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Standard", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "77.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } },
     { text: "72.5", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } },
     { text: "29.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Self-Correct R1", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "75.2 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } },
     { text: "63.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } },
     { text: "26.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "72.6 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } },
     { text: "55.3 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } },
     { text: "25.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } }],
    // GPT-4
    [{ text: "GPT-4", options: { bold: true, fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Standard", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "92.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } },
     { text: "78.5", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } },
     { text: "53.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R1", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "88.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } },
     { text: "72.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } },
     { text: "42.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "88.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } },
     { text: "72.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } },
     { text: "42.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } }],
  ];

  s.addTable(tRows, {
    x: 0.5, y: 1.2, w: 9.0,
    colW: [1.4, 2.0, 1.8, 1.8, 2.0],
    rowH: [0.35, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
    border: { type: "solid", pt: 0.5, color: C.gray },
    margin: [3, 6, 3, 6],
  });

  s.addText("Every metric declines after intrinsic self-correction. Without oracle labels, self-correction consistently hurts.", {
    x: 0.5, y: 4.3, w: 9.0, h: 0.4,
    fontSize: 12, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0,
  });

  addFooter(s, 12);
}

// ═══════════════════════════════════════════
// SLIDE 13 — GPT-4-Turbo and Llama-2 (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "4. Main results");
  s.addText("Results extend to more models", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const tRows2 = [
    [{ text: "Model", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "Method", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "GSM8K", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "CommonSenseQA", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } }],
    [{ text: "GPT-4-Turbo", options: { bold: true, fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Standard", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "91.5", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } },
     { text: "84.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Self-Correct R1", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "88.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } },
     { text: "81.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "90.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.orange } },
     { text: "83.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.orange } }],
    [{ text: "Llama-2-70B", options: { bold: true, fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Standard", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "62.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } },
     { text: "64.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R1", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "43.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } },
     { text: "37.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "36.5 \u2193\u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true } },
     { text: "36.5 \u2193\u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true } }],
  ];

  s.addTable(tRows2, {
    x: 0.5, y: 1.2, w: 9.0,
    colW: [1.8, 2.0, 2.6, 2.6],
    rowH: [0.35, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
    border: { type: "solid", pt: 0.5, color: C.gray },
    margin: [3, 6, 3, 6],
  });

  // Llama callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.15, w: 9.0, h: 0.65, fill: { color: "FFF0F0" }, rectRadius: 0.08 });
  s.addText("Llama-2 drops from 62.0 to 36.5 on GSM8K after two rounds. Self-correction nearly halves its accuracy.", {
    x: 0.7, y: 4.2, w: 8.6, h: 0.5,
    fontSize: 12, fontFace: BODY_FONT, color: C.red, bold: true, margin: 0, valign: "middle",
  });

  addFooter(s, 13);
}

// ═══════════════════════════════════════════
// SLIDE 14 — Answer change analysis (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "4. Main results");
  s.addText("What happens to answers after self-correction?", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 26, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  s.addText("GPT-3.5 on GSM8K, after two rounds of self-correction", {
    x: 0.5, y: 1.1, w: 9, h: 0.25,
    fontSize: 11, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0,
  });

  // 4 stat boxes
  const stats = [
    { pct: "74.7%", label: "No change", color: C.muted, bg: C.ice },
    { pct: "8.9%", label: "Correct \u2192 Incorrect", color: C.red, bg: "FFF0F0" },
    { pct: "7.6%", label: "Incorrect \u2192 Correct", color: C.green, bg: "E8F5E9" },
    { pct: "8.8%", label: "Incorrect \u2192 Incorrect", color: C.orange, bg: "FFF3E0" },
  ];

  stats.forEach((st, i) => {
    const x = 0.5 + i * 2.32;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: 1.5, w: 2.1, h: 1.6, fill: { color: st.bg }, rectRadius: 0.1 });
    s.addText(st.pct, {
      x: x, y: 1.65, w: 2.1, h: 0.65,
      fontSize: 32, fontFace: TITLE_FONT, color: st.color, bold: true, align: "center", margin: 0,
    });
    s.addText(st.label, {
      x: x + 0.1, y: 2.35, w: 1.9, h: 0.55,
      fontSize: 11, fontFace: BODY_FONT, color: st.color, align: "center", margin: 0, bold: true,
    });
  });

  // Key insight
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.4, w: 9.0, h: 1.1, fill: { color: C.ice }, rectRadius: 0.1 });
  s.addText("Key finding", {
    x: 0.7, y: 3.5, w: 8.6, h: 0.3,
    fontSize: 14, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0,
  });
  s.addText("Models change correct answers to incorrect ones (8.9%) more often than they fix incorrect answers (7.6%). The self-correction prompt biases the model toward changing its response, regardless of whether the original answer was right.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.55,
    fontSize: 12, fontFace: BODY_FONT, color: C.black, margin: 0,
  });

  addFooter(s, 14);
}

// ═══════════════════════════════════════════
// SLIDE 15 — Multi-Agent Debate vs Self-Consistency (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "5. Why does self-correction fail?");
  s.addText("Multi-Agent Debate vs self-consistency", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  // Left card: Debate
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.25, w: 4.2, h: 2.6, fill: { color: C.ice }, rectRadius: 0.1 });
  s.addText("Multi-Agent Debate", { x: 0.7, y: 1.35, w: 3.8, h: 0.3, fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0 });
  s.addText([
    { text: "Multiple LLM instances critique each other", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Each instance generates a response, then reviews others", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "High inference cost: N agents \u00d7 M rounds", options: { fontSize: 12, fontFace: BODY_FONT, color: C.red, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Du et al. (2023)", options: { fontSize: 10, fontFace: BODY_FONT, color: C.muted, italic: true } },
  ], { x: 0.7, y: 1.75, w: 3.8, h: 2.0, margin: 0, valign: "top" });

  // Right card: Self-consistency
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.25, w: 4.2, h: 2.6, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.25 } });
  s.addText("Self-Consistency", { x: 5.5, y: 1.35, w: 3.8, h: 0.3, fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0 });
  s.addText([
    { text: "Sample N independent responses", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Take majority vote", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Same or lower inference cost", options: { fontSize: 12, fontFace: BODY_FONT, color: C.green, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Wang et al. (2022)", options: { fontSize: 10, fontFace: BODY_FONT, color: C.muted, italic: true } },
  ], { x: 5.5, y: 1.75, w: 3.8, h: 2.0, margin: 0, valign: "top" });

  // Result callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.1, w: 9.0, h: 0.7, fill: { color: C.navy }, rectRadius: 0.08 });
  s.addText("At equal inference cost, Multi-Agent Debate performs no better than self-consistency.", {
    x: 0.7, y: 4.15, w: 8.6, h: 0.6,
    fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0, valign: "middle",
  });

  s.addNotes("Presenter: Jebon. Multi-Agent Debate vs self-consistency.");
  addFooter(s, 15);
}

// ═══════════════════════════════════════════
// SLIDE 16 — Prompt design trap (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "5. Why does self-correction fail?");
  s.addText("Prompt design creates misleading improvements", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 26, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  // Scenario A
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.3, w: 4.2, h: 2.2, fill: { color: "FFF3E0" }, rectRadius: 0.1 });
  s.addText("What appears to happen", { x: 0.7, y: 1.4, w: 3.8, h: 0.3, fontSize: 14, fontFace: BODY_FONT, color: C.orange, bold: true, margin: 0 });
  s.addText([
    { text: "1. Weak initial prompt produces poor output", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, breakLine: true, paraSpaceAfter: 8 } },
    { text: "2. Self-correction prompt adds task details", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, breakLine: true, paraSpaceAfter: 8 } },
    { text: "3. Output improves \u2192 \"self-correction works!\"", options: { fontSize: 12, fontFace: BODY_FONT, color: C.orange, bold: true } },
  ], { x: 0.7, y: 1.8, w: 3.8, h: 1.5, margin: 0, valign: "top" });

  // Scenario B
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.3, w: 4.2, h: 2.2, fill: { color: "E8F5E9" }, rectRadius: 0.1 });
  s.addText("What actually happens", { x: 5.5, y: 1.4, w: 3.8, h: 0.3, fontSize: 14, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0 });
  s.addText([
    { text: "1. Strong initial prompt (with the same details) produces better output", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, breakLine: true, paraSpaceAfter: 8 } },
    { text: "2. Self-correction then hurts performance", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, breakLine: true, paraSpaceAfter: 8 } },
    { text: "3. The \"improvement\" was from better prompts, not self-correction", options: { fontSize: 12, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 5.5, y: 1.8, w: 3.8, h: 1.5, margin: 0, valign: "top" });

  // Example
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.75, w: 9.0, h: 0.95, fill: { color: C.ice }, rectRadius: 0.08 });
  s.addText("Example: Constrained Generation", { x: 0.7, y: 3.8, w: 8.6, h: 0.25, fontSize: 12, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0 });
  s.addText("Self-Refine\u2019s initial prompt omits the constraint that all concepts must appear. The feedback prompt reintroduces this constraint. Adding it to the initial prompt directly outperforms self-correction.", {
    x: 0.7, y: 4.1, w: 8.6, h: 0.5,
    fontSize: 11, fontFace: BODY_FONT, color: C.black, margin: 0,
  });

  addFooter(s, 16);
}

// ═══════════════════════════════════════════
// SLIDE 17 — The core problem (dark)
// ═══════════════════════════════════════════
{
  const s = darkSlide();
  addTopicLabel(s, "5. Why does self-correction fail?", { dark: true });
  s.addText("LLMs cannot reliably judge\nthe correctness of their\nown reasoning", {
    x: 0.8, y: 1.0, w: 8.5, h: 2.0,
    fontSize: 32, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0, lineSpacingMultiple: 1.1,
  });

  s.addText("The self-correction prompt biases models toward changing their answers. Correct answers get flipped to incorrect more often than mistakes get fixed. This is the core barrier to intrinsic self-correction.", {
    x: 0.8, y: 3.2, w: 8.4, h: 1.0,
    fontSize: 14, fontFace: BODY_FONT, color: C.mutedLight, margin: 0, lineSpacingMultiple: 1.3,
  });

  addFooter(s, 17, { dark: true });
}

// ═══════════════════════════════════════════
// SLIDE 18 — What the paper supports (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "6. Conclusion");
  s.addText("What the paper supports", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const takeaways = [
    { num: "1", text: "Self-correction without external feedback does not improve LLM reasoning. Performance consistently declines across models and tasks." },
    { num: "2", text: "Prior reported improvements relied on oracle labels, unfair inference-cost comparisons, or sub-optimal initial prompts." },
    { num: "3", text: "Self-correction can work when paired with external feedback sources like tools, code execution, or human review." },
  ];

  takeaways.forEach((t, i) => {
    const y = 1.3 + i * 1.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: y, w: 9.0, h: 0.95, fill: { color: C.ice }, rectRadius: 0.1 });
    addIconCircle(s, 0.75, y + 0.28, t.num, 0.4);
    s.addText(t.text, {
      x: 1.35, y: y + 0.12, w: 7.9, h: 0.7,
      fontSize: 13, fontFace: BODY_FONT, color: C.black, margin: 0, valign: "middle",
    });
  });

  s.addNotes("Presenter: Refayet. Summarize the paper's conclusions.");
  addFooter(s, 18);
}

// ═══════════════════════════════════════════
// SLIDE 19 — Limitations and future directions (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "6. Conclusion");
  s.addText("Limitations and future directions", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  // Left: Limitations
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.25, w: 4.2, h: 3.2, fill: { color: C.ice }, rectRadius: 0.1 });
  s.addText("Limitations", { x: 0.7, y: 1.35, w: 3.8, h: 0.3, fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0 });
  s.addText([
    { text: "Focused on reasoning tasks (math, commonsense, QA)", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Tested on a specific set of models available in 2023", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Only examines prompting-based approaches", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "HotpotQA sample size is small (100 questions)", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Does not cover self-correction for code, safety, or style tasks", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true } },
  ], { x: 0.7, y: 1.75, w: 3.8, h: 2.5, margin: 0, valign: "top" });

  // Right: Future
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.25, w: 4.2, h: 3.2, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.25 } });
  s.addText("Future directions", { x: 5.5, y: 1.35, w: 3.8, h: 0.3, fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0 });
  s.addText([
    { text: "Training-based self-correction methods", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Better verification and validation tools", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Tool-augmented self-correction (code exec, search)", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Fair evaluation standards for self-correction claims", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Study newer models with stronger reasoning", options: { fontSize: 12, fontFace: BODY_FONT, color: C.black, bullet: true } },
  ], { x: 5.5, y: 1.75, w: 3.8, h: 2.5, margin: 0, valign: "top" });

  addFooter(s, 19);
}

// ═══════════════════════════════════════════
// SLIDE 20 — References (light)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "References");
  s.addText("References", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.navy, bold: true, margin: 0,
  });

  const refs = [
    "Huang, J., Weng, X., Liang, Z., Peng, H., Wu, Z., & Zhang, M. (2024). Large Language Models Cannot Self-Correct Reasoning Yet. ICLR 2024.",
    "Kim, G., Baldi, P., & McAleer, S. (2023). Language Models can Solve Computer Tasks. NeurIPS 2023.",
    "Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. NeurIPS 2023.",
    "Madaan, A., Tandon, N., Gupta, P., et al. (2023). Self-Refine: Iterative Refinement with Self-Feedback. NeurIPS 2023.",
    "Du, Y., Li, S., Torralba, A., Tenenbaum, J., & Mordatch, I. (2023). Improving Factuality and Reasoning in Language Models through Multiagent Debate.",
    "Wang, X., Wei, J., Schuurmans, D., et al. (2022). Self-Consistency Improves Chain of Thought Reasoning in Language Models. ICLR 2023.",
    "Cobbe, K., Kosaraju, V., Bavarian, M., et al. (2021). Training Verifiers to Solve Math Word Problems.",
  ];

  refs.forEach((r, i) => {
    s.addText(r, {
      x: 0.5, y: 1.25 + i * 0.5, w: 9.0, h: 0.45,
      fontSize: 10, fontFace: BODY_FONT, color: C.black, margin: 0, valign: "top",
    });
  });

  addFooter(s, 20);
}

// ── Write file ──
pres.writeFile({ fileName: "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v1.pptx" })
  .then(() => console.log("V1 written successfully"))
  .catch(err => console.error("Error:", err));
