const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation";
pres.title = "Large Language Models Cannot Self-Correct Reasoning Yet";

// ── Design tokens ──
const C = {
  cherry: "990011",
  offWhite: "FCF6F5",
  navy: "2F3C7E",
  dark: "1A1A2E",
  text: "333333",
  white: "FFFFFF",
  muted: "888888",
  mutedDark: "AAAAAA",
  red: "CC2222",
  green: "2E7D32",
  orange: "D4760A",
  gray: "CCCCCC",
  lightGray: "F5F3F2",
  tableHead: "2F3C7E",
  tableRow1: "FAF5F5",
  tableRow2: "FFFFFF",
};

const TOTAL = 20;
const TITLE_FONT = "Century Schoolbook";
const BODY_FONT = "Calibri";
const FOOTER_TEXT = "Large Language Models Cannot Self-Correct Reasoning Yet  |  ICLR 2024";

function pad(n) { return String(n).padStart(2, "0"); }

function addFooter(slide, num, opts = {}) {
  const isDark = opts.dark || false;
  const fg = isDark ? C.mutedDark : C.muted;
  slide.addText(FOOTER_TEXT, {
    x: 0.5, y: 5.12, w: 7.5, h: 0.3,
    fontSize: 8, fontFace: BODY_FONT, color: fg, align: "left", margin: 0,
  });
  slide.addText(`${pad(num)}/${TOTAL}`, {
    x: 8.5, y: 5.12, w: 1.0, h: 0.3,
    fontSize: 8, fontFace: BODY_FONT, color: fg, align: "right", margin: 0,
  });
}

function addTopicLabel(slide, topic, opts = {}) {
  const isDark = opts.dark || false;
  slide.addText(topic.toUpperCase(), {
    x: 0.5, y: 0.2, w: 5, h: 0.25,
    fontSize: 9, fontFace: BODY_FONT, color: isDark ? C.mutedDark : C.muted,
    bold: true, margin: 0, charSpacing: 1.5,
  });
}

function darkSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.dark };
  return s;
}

function lightSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.offWhite };
  return s;
}

function addCherryCircle(slide, x, y, text, sz) {
  const size = sz || 0.35;
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y, w: size, h: size, fill: { color: C.cherry },
  });
  slide.addText(text, {
    x: x, y: y, w: size, h: size,
    fontSize: size > 0.35 ? 13 : 11, fontFace: BODY_FONT, color: C.white,
    align: "center", valign: "middle", margin: 0, bold: true,
  });
}

// ═══════════════════════════════════════════
// SLIDE 1 — Title (dark bg)
// ═══════════════════════════════════════════
{
  const s = darkSlide();
  s.addText("Large Language Models\nCannot Self-Correct\nReasoning Yet", {
    x: 0.8, y: 0.6, w: 8.5, h: 2.2,
    fontSize: 38, fontFace: TITLE_FONT, color: C.cherry, bold: true, align: "left", margin: 0,
    lineSpacingMultiple: 1.05,
  });
  s.addText("ICLR 2024  \u2014  Group Presentation", {
    x: 0.8, y: 2.85, w: 9, h: 0.35,
    fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
  });
  s.addText("Paper by Huang, Weng, Liang, Peng, Wu, Zhang", {
    x: 0.8, y: 3.2, w: 9, h: 0.3,
    fontSize: 11, fontFace: BODY_FONT, color: C.mutedDark, margin: 0,
  });

  const names = [
    "Nafis Islam Kabbo  \u2014  2303180", "Srijon  \u2014  2303179",
    "Anindo  \u2014  2303181", "Mahid  \u2014  2303127",
    "Jebon  \u2014  2303160", "Refayet  \u2014  2303148",
  ];
  names.forEach((n, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    s.addText(n, {
      x: 0.8 + col * 3.0, y: 3.75 + row * 0.35, w: 2.8, h: 0.3,
      fontSize: 11, fontFace: BODY_FONT, color: C.mutedDark, margin: 0,
    });
  });
  addFooter(s, 1, { dark: true });
}

// ═══════════════════════════════════════════
// SLIDE 2 — Agenda (off-white)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "Overview");
  s.addText("Presentation outline", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  const sections = [
    { num: "1", title: "Introduction and research problem", name: "Nafis" },
    { num: "2", title: "Literature review and background", name: "Srijon" },
    { num: "3", title: "Methodology and experimental setup", name: "Anindo" },
    { num: "4", title: "Main results: intrinsic self-correction fails", name: "Mahid" },
    { num: "5", title: "Why does self-correction fail?", name: "Jebon" },
    { num: "6", title: "Conclusion, limitations, and future directions", name: "Refayet" },
  ];
  sections.forEach((sec, i) => {
    const y = 1.3 + i * 0.6;
    addCherryCircle(s, 0.7, y + 0.02, sec.num, 0.36);
    s.addText(sec.title, {
      x: 1.25, y: y, w: 6.5, h: 0.25,
      fontSize: 15, fontFace: BODY_FONT, color: C.dark, bold: true, margin: 0,
    });
    s.addText(sec.name, {
      x: 1.25, y: y + 0.25, w: 6.5, h: 0.2,
      fontSize: 11, fontFace: BODY_FONT, color: C.muted, margin: 0,
    });
  });
  addFooter(s, 2);
}

// ═══════════════════════════════════════════
// SLIDE 3 — What are LLMs? (off-white)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "1. Introduction");
  s.addText("What are large language models?", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  // Left text
  s.addText([
    { text: "Large language models (LLMs) are neural networks trained on massive text corpora. They generate text, answer questions, solve math problems, and write code.", options: { fontSize: 14, fontFace: BODY_FONT, color: C.text, breakLine: true, paraSpaceAfter: 14 } },
    { text: "Models in this study:", options: { fontSize: 14, fontFace: BODY_FONT, color: C.cherry, bold: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "GPT-3.5-Turbo", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "GPT-4 and GPT-4-Turbo", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "Llama-2-70B-Chat", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true } },
  ], { x: 0.5, y: 1.2, w: 4.8, h: 3.2, valign: "top", margin: 0 });

  // Right: conceptual diagram
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.8, y: 1.5, w: 3.5, h: 2.8, fill: { color: C.navy }, rectRadius: 0.15 });
  s.addText("Input", { x: 5.8, y: 1.7, w: 3.5, h: 0.35, fontSize: 12, fontFace: BODY_FONT, color: C.mutedDark, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.3, y: 2.1, w: 2.5, h: 0.4, fill: { color: "3D4F8F" }, rectRadius: 0.08 });
  s.addText("\"Solve this math problem...\"", { x: 6.3, y: 2.1, w: 2.5, h: 0.4, fontSize: 10, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0, italic: true });

  s.addText("\u2193", { x: 5.8, y: 2.55, w: 3.5, h: 0.35, fontSize: 20, color: C.mutedDark, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.OVAL, { x: 6.8, y: 2.9, w: 1.5, h: 0.5, fill: { color: C.cherry } });
  s.addText("LLM", { x: 6.8, y: 2.9, w: 1.5, h: 0.5, fontSize: 14, fontFace: TITLE_FONT, color: C.white, align: "center", valign: "middle", margin: 0, bold: true });

  s.addText("\u2193", { x: 5.8, y: 3.4, w: 3.5, h: 0.35, fontSize: 20, color: C.mutedDark, align: "center", valign: "middle", margin: 0 });

  s.addText("Output", { x: 5.8, y: 3.75, w: 3.5, h: 0.25, fontSize: 12, fontFace: BODY_FONT, color: C.mutedDark, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.3, y: 4.0, w: 2.5, h: 0.4, fill: { color: "3D4F8F" }, rectRadius: 0.08 });
  s.addText("\"The answer is 42.\"", { x: 6.3, y: 4.0, w: 2.5, h: 0.4, fontSize: 10, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0, italic: true });

  s.addNotes("Presenter: Nafis Islam Kabbo.");
  addFooter(s, 3);
}

// ═══════════════════════════════════════════
// SLIDE 4 — The paradox (dark)
// ═══════════════════════════════════════════
{
  const s = darkSlide();
  addTopicLabel(s, "1. Introduction", { dark: true });

  // Large question mark
  s.addText("?", {
    x: 7.5, y: 0.5, w: 2.0, h: 2.5,
    fontSize: 120, fontFace: TITLE_FONT, color: C.cherry, bold: true, align: "center", margin: 0, transparency: 30,
  });

  s.addText("If LLMs can catch their\nown mistakes, why not\nget it right the first time?", {
    x: 0.8, y: 1.0, w: 7.0, h: 1.8,
    fontSize: 28, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0,
    lineSpacingMultiple: 1.15,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 3.2, w: 8.4, h: 1.3, fill: { color: "252545" }, rectRadius: 0.12 });
  s.addText([
    { text: "Intrinsic self-correction", options: { fontSize: 15, fontFace: BODY_FONT, color: C.cherry, bold: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "The model tries to fix its own responses without any external feedback. No oracle labels, no human review, no tool outputs.", options: { fontSize: 13, fontFace: BODY_FONT, color: C.mutedDark } },
  ], { x: 1.1, y: 3.35, w: 7.8, h: 1.0, valign: "top", margin: 0 });

  addFooter(s, 4, { dark: true });
}

// ═══════════════════════════════════════════
// SLIDE 5 — Section opener: Literature review
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "2. Literature review");
  s.addText("02", {
    x: 0.5, y: 1.0, w: 2.5, h: 1.5,
    fontSize: 72, fontFace: TITLE_FONT, color: C.cherry, bold: true, margin: 0,
  });
  s.addText("Literature review\nand background", {
    x: 3.0, y: 1.2, w: 6.5, h: 1.0,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
    lineSpacingMultiple: 1.1,
  });
  s.addText("Presenter: Srijon", {
    x: 3.0, y: 2.4, w: 4, h: 0.3,
    fontSize: 12, fontFace: BODY_FONT, color: C.muted, margin: 0,
  });
  addFooter(s, 5);
}

// ═══════════════════════════════════════════
// SLIDE 6 — Four methods compared
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "2. Literature review");
  s.addText("Prior self-correction methods", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  const methods = [
    { name: "RCI", cite: "Kim et al., 2023", desc: "Recursive Criticism and Improvement. Model criticizes output, then revises." },
    { name: "Reflexion", cite: "Shinn et al., 2023", desc: "Verbal reinforcement from self-reflection. Uses environment signals." },
    { name: "Self-Refine", cite: "Madaan et al., 2023", desc: "Iterative feedback and refinement. Model generates its own feedback." },
    { name: "Multi-Agent Debate", cite: "Du et al., 2023", desc: "Multiple LLM instances debate and critique each other." },
  ];

  methods.forEach((m, i) => {
    const y = 1.25 + i * 0.88;
    addCherryCircle(s, 0.7, y + 0.12, String(i + 1), 0.38);
    s.addText(m.name, {
      x: 1.3, y: y + 0.02, w: 3.0, h: 0.3,
      fontSize: 16, fontFace: BODY_FONT, color: C.dark, bold: true, margin: 0,
    });
    s.addText(m.cite, {
      x: 1.3, y: y + 0.32, w: 3.0, h: 0.2,
      fontSize: 10, fontFace: BODY_FONT, color: C.cherry, italic: true, margin: 0,
    });
    s.addText(m.desc, {
      x: 4.5, y: y + 0.05, w: 5.0, h: 0.5,
      fontSize: 12, fontFace: BODY_FONT, color: C.text, margin: 0, valign: "middle",
    });
    if (i < 3) {
      s.addShape(pres.shapes.LINE, {
        x: 0.5, y: y + 0.78, w: 9.0, h: 0,
        line: { color: C.gray, width: 0.5 },
      });
    }
  });
  addFooter(s, 6);
}

// ═══════════════════════════════════════════
// SLIDE 7 — Intrinsic vs external feedback
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "2. Literature review");
  s.addText("Intrinsic vs external feedback", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  // Left: Intrinsic
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.25, w: 4.2, h: 3.0, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.25 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.25, w: 4.2, h: 0.45, fill: { color: C.navy }, rectRadius: 0.0 });
  s.addText("Intrinsic", { x: 0.5, y: 1.25, w: 4.2, h: 0.45, fontSize: 15, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText([
    { text: "Model uses only its own knowledge", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "No external signals", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "No ground truth labels", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 12 } },
    { text: "This is the paper\u2019s focus", options: { fontSize: 13, fontFace: BODY_FONT, color: C.navy, bold: true } },
  ], { x: 0.7, y: 1.85, w: 3.8, h: 2.2, margin: 0, valign: "top" });

  // Right: External
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.25, w: 4.2, h: 3.0, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.25 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.25, w: 4.2, h: 0.45, fill: { color: C.cherry }, rectRadius: 0.0 });
  s.addText("External", { x: 5.3, y: 1.25, w: 4.2, h: 0.45, fontSize: 15, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText([
    { text: "Oracle labels (answer correctness)", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Human review and feedback", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Tool outputs (code exec, search)", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Other model feedback", options: { fontSize: 13, fontFace: BODY_FONT, color: C.text, bullet: true } },
  ], { x: 5.5, y: 1.85, w: 3.8, h: 2.2, margin: 0, valign: "top" });

  addFooter(s, 7);
}

// ═══════════════════════════════════════════
// SLIDE 8 — Section opener: Methodology
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "3. Methodology");
  s.addText("03", {
    x: 0.5, y: 1.0, w: 2.5, h: 1.5,
    fontSize: 72, fontFace: TITLE_FONT, color: C.cherry, bold: true, margin: 0,
  });
  s.addText("Methodology and\nexperimental setup", {
    x: 3.0, y: 1.2, w: 6.5, h: 1.0,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
    lineSpacingMultiple: 1.1,
  });
  s.addText("Presenter: Anindo", {
    x: 3.0, y: 2.4, w: 4, h: 0.3,
    fontSize: 12, fontFace: BODY_FONT, color: C.muted, margin: 0,
  });
  addFooter(s, 8);
}

// ═══════════════════════════════════════════
// SLIDE 9 — Benchmarks (stat callouts)
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "3. Methodology");
  s.addText("Evaluation benchmarks", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  const benchmarks = [
    { name: "GSM8K", size: "1,319", type: "Math word problems", desc: "Grade school math reasoning. Diverse linguistic word problems." },
    { name: "CommonSenseQA", size: "1,221", type: "Multi-choice QA", desc: "Commonsense reasoning with plausible distractor options." },
    { name: "HotpotQA", size: "100", type: "Multi-hop QA", desc: "Open-domain multi-hop questions. Exact match evaluation." },
  ];

  benchmarks.forEach((b, i) => {
    const cx = 0.5 + i * 3.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.3, w: 2.8, h: 3.3, fill: { color: C.white }, rectRadius: 0.1,
      shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.25 },
    });
    s.addText(b.size, {
      x: cx, y: 1.55, w: 2.8, h: 0.65,
      fontSize: 42, fontFace: TITLE_FONT, color: C.cherry, bold: true, align: "center", margin: 0,
    });
    s.addText(b.type, {
      x: cx, y: 2.2, w: 2.8, h: 0.25,
      fontSize: 10, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0,
    });
    s.addShape(pres.shapes.LINE, { x: cx + 0.5, y: 2.6, w: 1.8, h: 0, line: { color: C.gray, width: 0.5 } });
    s.addText(b.name, {
      x: cx + 0.2, y: 2.75, w: 2.4, h: 0.35,
      fontSize: 16, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
    });
    s.addText(b.desc, {
      x: cx + 0.2, y: 3.15, w: 2.4, h: 1.2,
      fontSize: 12, fontFace: BODY_FONT, color: C.text, margin: 0, valign: "top",
    });
  });
  addFooter(s, 9);
}

// ═══════════════════════════════════════════
// SLIDE 10 — Models and procedure
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "3. Methodology");
  s.addText("Models and procedure", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  // Left: Model cards
  const models = [
    { name: "GPT-3.5-Turbo", detail: "Full eval sets, temp=1.0" },
    { name: "GPT-4", detail: "200 samples, temp=1.0" },
    { name: "GPT-4-Turbo", detail: "200 samples, temp=1.0" },
    { name: "Llama-2-70B", detail: "200 samples, temp=0.7" },
  ];
  models.forEach((m, i) => {
    const y = 1.25 + i * 0.75;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: y, w: 4.2, h: 0.6, fill: { color: C.white }, rectRadius: 0.08,
      shadow: { type: "outer", blur: 3, offset: 1, angle: 270, color: "CCCCCC", opacity: 0.2 } });
    addCherryCircle(s, 0.65, y + 0.12, String(i + 1), 0.36);
    s.addText(m.name, { x: 1.15, y: y + 0.02, w: 2.5, h: 0.25, fontSize: 13, fontFace: BODY_FONT, color: C.dark, bold: true, margin: 0 });
    s.addText(m.detail, { x: 1.15, y: y + 0.28, w: 3.3, h: 0.22, fontSize: 10, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  });

  // Right: Procedure
  s.addText("Procedure", { x: 5.3, y: 1.15, w: 4.2, h: 0.3, fontSize: 16, fontFace: BODY_FONT, color: C.dark, bold: true, margin: 0 });
  const steps = [
    "Generate initial answer",
    "Model reviews its own answer",
    "Model produces revised answer",
    "Repeat (max 2 rounds)",
  ];
  steps.forEach((st, i) => {
    const y = 1.6 + i * 0.7;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: y, w: 4.2, h: 0.5, fill: { color: i % 2 === 0 ? C.navy : C.cherry }, rectRadius: 0.08 });
    s.addText(`${i + 1}. ${st}`, {
      x: 5.5, y: y, w: 3.8, h: 0.5,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0, valign: "middle",
    });
    if (i < 3) {
      s.addText("\u2193", { x: 5.3, y: y + 0.5, w: 4.2, h: 0.2, fontSize: 14, color: C.muted, align: "center", margin: 0 });
    }
  });
  addFooter(s, 10);
}

// ═══════════════════════════════════════════
// SLIDE 11 — Section opener: Results
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "4. Main results");
  s.addText("04", {
    x: 0.5, y: 1.0, w: 2.5, h: 1.5,
    fontSize: 72, fontFace: TITLE_FONT, color: C.cherry, bold: true, margin: 0,
  });
  s.addText("Intrinsic self-correction\nfails", {
    x: 3.0, y: 1.2, w: 6.5, h: 1.0,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
    lineSpacingMultiple: 1.1,
  });
  s.addText("Presenter: Mahid", {
    x: 3.0, y: 2.4, w: 4, h: 0.3,
    fontSize: 12, fontFace: BODY_FONT, color: C.muted, margin: 0,
  });
  addFooter(s, 11);
}

// ═══════════════════════════════════════════
// SLIDE 12 — GPT results table
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "4. Main results");
  s.addText("Performance drops: GPT models", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 26, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  const tRows = [
    [{ text: "Model", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "Method", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "GSM8K", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "CSQA", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } },
     { text: "HotpotQA", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: BODY_FONT } }],
    [{ text: "GPT-3.5", options: { bold: true, fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Standard", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "77.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } },
     { text: "72.5", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } },
     { text: "29.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Self-Correct R1", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "75.2 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } },
     { text: "63.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } },
     { text: "26.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "72.6 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } },
     { text: "55.3 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } },
     { text: "25.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } }],
    [{ text: "GPT-4", options: { bold: true, fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Standard", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "92.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } },
     { text: "78.5", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } },
     { text: "53.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R1", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "88.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } },
     { text: "72.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } },
     { text: "42.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "88.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } },
     { text: "72.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } },
     { text: "42.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } }],
  ];

  s.addTable(tRows, {
    x: 0.5, y: 1.2, w: 9.0,
    colW: [1.4, 2.0, 1.8, 1.8, 2.0],
    rowH: [0.35, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
    border: { type: "solid", pt: 0.5, color: C.gray },
    margin: [3, 6, 3, 6],
  });

  s.addText("Every metric declines. Without oracle labels, self-correction consistently hurts performance.", {
    x: 0.5, y: 4.3, w: 9.0, h: 0.4,
    fontSize: 12, fontFace: BODY_FONT, color: C.cherry, bold: true, margin: 0,
  });
  addFooter(s, 12);
}

// ═══════════════════════════════════════════
// SLIDE 13 — GPT-4-Turbo and Llama-2
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "4. Main results");
  s.addText("Further models confirm the pattern", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 26, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
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
     { text: "88.0 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } },
     { text: "81.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "90.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.orange } },
     { text: "83.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.orange } }],
    [{ text: "Llama-2-70B", options: { bold: true, fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Standard", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "62.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } },
     { text: "64.0", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "Self-Correct R1", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
     { text: "43.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } },
     { text: "37.5 \u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.cherry } }],
    [{ text: "", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "Self-Correct R2", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
     { text: "36.5 \u2193\u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry, bold: true } },
     { text: "36.5 \u2193\u2193", options: { fontSize: 11, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.cherry, bold: true } }],
  ];

  s.addTable(tRows2, {
    x: 0.5, y: 1.2, w: 9.0,
    colW: [1.8, 2.0, 2.6, 2.6],
    rowH: [0.35, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
    border: { type: "solid", pt: 0.5, color: C.gray },
    margin: [3, 6, 3, 6],
  });

  // Dramatic stat
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.5, y: 4.1, w: 5.0, h: 0.7, fill: { color: C.cherry }, rectRadius: 0.08 });
  s.addText("Llama-2:  62.0  \u2192  36.5  on GSM8K", {
    x: 2.5, y: 4.1, w: 5.0, h: 0.7,
    fontSize: 18, fontFace: TITLE_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
  });
  addFooter(s, 13);
}

// ═══════════════════════════════════════════
// SLIDE 14 — Answer flip analysis
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "4. Main results");
  s.addText("How answers change after self-correction", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 24, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  s.addText("GPT-3.5 on GSM8K, after two rounds", {
    x: 0.5, y: 1.05, w: 9, h: 0.25,
    fontSize: 11, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0,
  });

  const stats = [
    { pct: "74.7%", label: "No change", color: C.muted, bg: "EEEEEE" },
    { pct: "8.9%", label: "Correct \u2192 Incorrect", color: C.cherry, bg: "FFECEC" },
    { pct: "7.6%", label: "Incorrect \u2192 Correct", color: C.green, bg: "E8F5E9" },
    { pct: "8.8%", label: "Incorrect \u2192 Incorrect", color: C.orange, bg: "FFF3E0" },
  ];

  stats.forEach((st, i) => {
    const x = 0.5 + i * 2.32;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: 1.45, w: 2.1, h: 1.6, fill: { color: st.bg }, rectRadius: 0.1 });
    s.addText(st.pct, {
      x: x, y: 1.55, w: 2.1, h: 0.65,
      fontSize: 32, fontFace: TITLE_FONT, color: st.color, bold: true, align: "center", margin: 0,
    });
    s.addText(st.label, {
      x: x + 0.1, y: 2.3, w: 1.9, h: 0.55,
      fontSize: 11, fontFace: BODY_FONT, color: st.color, align: "center", margin: 0, bold: true,
    });
  });

  // Key insight
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.3, w: 9.0, h: 1.15, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.2 } });
  s.addText("Models flip correct answers to wrong ones more than they fix mistakes", {
    x: 0.7, y: 3.4, w: 8.6, h: 0.35,
    fontSize: 14, fontFace: BODY_FONT, color: C.cherry, bold: true, margin: 0,
  });
  s.addText("The self-correction prompt biases the model toward changing its response, regardless of whether the original answer was right. This is the core problem with intrinsic self-correction.", {
    x: 0.7, y: 3.8, w: 8.6, h: 0.55,
    fontSize: 12, fontFace: BODY_FONT, color: C.text, margin: 0,
  });
  addFooter(s, 14);
}

// ═══════════════════════════════════════════
// SLIDE 15 — Section opener: Why it fails
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "5. Why does self-correction fail?");
  s.addText("05", {
    x: 0.5, y: 1.0, w: 2.5, h: 1.5,
    fontSize: 72, fontFace: TITLE_FONT, color: C.cherry, bold: true, margin: 0,
  });
  s.addText("Why does\nself-correction fail?", {
    x: 3.0, y: 1.2, w: 6.5, h: 1.0,
    fontSize: 28, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
    lineSpacingMultiple: 1.1,
  });
  s.addText("Presenter: Jebon", {
    x: 3.0, y: 2.4, w: 4, h: 0.3,
    fontSize: 12, fontFace: BODY_FONT, color: C.muted, margin: 0,
  });
  addFooter(s, 15);
}

// ═══════════════════════════════════════════
// SLIDE 16 — Debate vs self-consistency
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "5. Why does self-correction fail?");
  s.addText("Multi-Agent Debate vs self-consistency", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 24, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  // Left: Debate (cherry)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.2, w: 4.2, h: 2.6, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.2 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.2, w: 4.2, h: 0.45, fill: { color: C.cherry }, rectRadius: 0.0 });
  s.addText("Multi-Agent Debate", { x: 0.5, y: 1.2, w: 4.2, h: 0.45, fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText([
    { text: "Multiple LLM instances critique each other", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "N agents \u00d7 M rounds = high cost", options: { fontSize: 12, fontFace: BODY_FONT, color: C.cherry, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Du et al., 2023", options: { fontSize: 10, fontFace: BODY_FONT, color: C.muted, italic: true } },
  ], { x: 0.7, y: 1.8, w: 3.8, h: 1.8, margin: 0, valign: "top" });

  // Right: Self-consistency (navy)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.2, w: 4.2, h: 2.6, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 5, offset: 2, angle: 270, color: "CCCCCC", opacity: 0.2 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.2, w: 4.2, h: 0.45, fill: { color: C.navy }, rectRadius: 0.0 });
  s.addText("Self-Consistency", { x: 5.3, y: 1.2, w: 4.2, h: 0.45, fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText([
    { text: "Sample N responses, take majority vote", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Same or lower inference cost", options: { fontSize: 12, fontFace: BODY_FONT, color: C.green, bullet: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Wang et al., 2022", options: { fontSize: 10, fontFace: BODY_FONT, color: C.muted, italic: true } },
  ], { x: 5.5, y: 1.8, w: 3.8, h: 1.8, margin: 0, valign: "top" });

  // Result
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 4.05, w: 9.0, h: 0.7, fill: { color: C.dark }, rectRadius: 0.08 });
  s.addText("At equal inference cost, Multi-Agent Debate performs no better than self-consistency.", {
    x: 0.7, y: 4.1, w: 8.6, h: 0.6,
    fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0, valign: "middle",
  });
  addFooter(s, 16);
}

// ═══════════════════════════════════════════
// SLIDE 17 — Prompt design problem
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "5. Why does self-correction fail?");
  s.addText("The prompt design trap", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 26, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  // Left: What appears
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.25, w: 4.2, h: 2.2, fill: { color: "FFECEC" }, rectRadius: 0.1 });
  s.addText("What appears to happen", { x: 0.7, y: 1.35, w: 3.8, h: 0.3, fontSize: 14, fontFace: BODY_FONT, color: C.cherry, bold: true, margin: 0 });
  s.addText([
    { text: "1. Weak initial prompt, poor output", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, breakLine: true, paraSpaceAfter: 8 } },
    { text: "2. Self-correction adds task details", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, breakLine: true, paraSpaceAfter: 8 } },
    { text: "3. Output improves, claimed as success", options: { fontSize: 12, fontFace: BODY_FONT, color: C.cherry, bold: true } },
  ], { x: 0.7, y: 1.75, w: 3.8, h: 1.5, margin: 0, valign: "top" });

  // Right: What actually happens
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.25, w: 4.2, h: 2.2, fill: { color: "E8F5E9" }, rectRadius: 0.1 });
  s.addText("What actually happens", { x: 5.5, y: 1.35, w: 3.8, h: 0.3, fontSize: 14, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0 });
  s.addText([
    { text: "1. Strong initial prompt (same details), better output", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, breakLine: true, paraSpaceAfter: 8 } },
    { text: "2. Self-correction then hurts performance", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, breakLine: true, paraSpaceAfter: 8 } },
    { text: "3. Improvement was from better prompts", options: { fontSize: 12, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 5.5, y: 1.75, w: 3.8, h: 1.5, margin: 0, valign: "top" });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.7, w: 9.0, h: 0.85, fill: { color: C.white }, rectRadius: 0.08,
    shadow: { type: "outer", blur: 4, offset: 1, angle: 270, color: "CCCCCC", opacity: 0.2 } });
  s.addText("Example: Self-Refine on constrained generation", { x: 0.7, y: 3.75, w: 8.6, h: 0.25, fontSize: 12, fontFace: BODY_FONT, color: C.dark, bold: true, margin: 0 });
  s.addText("The initial prompt omits a key constraint. The feedback prompt reintroduces it. Including the constraint in the initial prompt directly gives better results than self-correction.", {
    x: 0.7, y: 4.05, w: 8.6, h: 0.4,
    fontSize: 11, fontFace: BODY_FONT, color: C.text, margin: 0,
  });
  addFooter(s, 17);
}

// ═══════════════════════════════════════════
// SLIDE 18 — Section opener: Conclusion (dark)
// ═══════════════════════════════════════════
{
  const s = darkSlide();
  addTopicLabel(s, "6. Conclusion", { dark: true });
  s.addText("06", {
    x: 0.5, y: 1.0, w: 2.5, h: 1.5,
    fontSize: 72, fontFace: TITLE_FONT, color: C.cherry, bold: true, margin: 0,
  });
  s.addText("Conclusion and\nfuture directions", {
    x: 3.0, y: 1.2, w: 6.5, h: 1.0,
    fontSize: 28, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0,
    lineSpacingMultiple: 1.1,
  });
  s.addText("Presenter: Refayet", {
    x: 3.0, y: 2.4, w: 4, h: 0.3,
    fontSize: 12, fontFace: BODY_FONT, color: C.mutedDark, margin: 0,
  });
  addFooter(s, 18, { dark: true });
}

// ═══════════════════════════════════════════
// SLIDE 19 — Key findings and limitations
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "6. Conclusion");
  s.addText("Key findings and limitations", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 26, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
  });

  // Left: Key findings
  const findings = [
    "LLMs cannot self-correct reasoning without external feedback. Performance consistently declines.",
    "Prior improvements depended on oracle labels, unfair inference-cost comparisons, or sub-optimal prompts.",
    "Self-correction with external feedback (tools, human review) remains viable.",
  ];
  s.addText("Key findings", { x: 0.5, y: 1.15, w: 4.5, h: 0.3, fontSize: 16, fontFace: BODY_FONT, color: C.cherry, bold: true, margin: 0 });
  findings.forEach((f, i) => {
    const y = 1.55 + i * 0.85;
    addCherryCircle(s, 0.6, y + 0.08, String(i + 1), 0.32);
    s.addText(f, {
      x: 1.05, y: y, w: 3.9, h: 0.75,
      fontSize: 12, fontFace: BODY_FONT, color: C.text, margin: 0, valign: "top",
    });
  });

  // Right: Limitations
  s.addText("Limitations", { x: 5.3, y: 1.15, w: 4.2, h: 0.3, fontSize: 16, fontFace: BODY_FONT, color: C.navy, bold: true, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.55, w: 4.2, h: 2.8, fill: { color: C.white }, rectRadius: 0.1,
    shadow: { type: "outer", blur: 4, offset: 1, angle: 270, color: "CCCCCC", opacity: 0.2 } });
  s.addText([
    { text: "Tested on specific reasoning tasks", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Limited model selection (2023 models)", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Prompting approaches only", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Small HotpotQA sample (100)", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Does not cover code, safety, or style", options: { fontSize: 12, fontFace: BODY_FONT, color: C.text, bullet: true } },
  ], { x: 5.5, y: 1.7, w: 3.8, h: 2.5, margin: 0, valign: "top" });
  addFooter(s, 19);
}

// ═══════════════════════════════════════════
// SLIDE 20 — References
// ═══════════════════════════════════════════
{
  const s = lightSlide();
  addTopicLabel(s, "References");
  s.addText("References", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, fontFace: TITLE_FONT, color: C.dark, bold: true, margin: 0,
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
      fontSize: 10, fontFace: BODY_FONT, color: C.text, margin: 0, valign: "top",
    });
  });
  addFooter(s, 20);
}

// ── Write file ──
pres.writeFile({ fileName: "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v3.pptx" })
  .then(() => console.log("V3 written successfully"))
  .catch(err => console.error("Error:", err));
