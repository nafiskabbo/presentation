const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation";
pres.title = "Large Language Models Cannot Self-Correct Reasoning Yet";

// Classic Academic Design Tokens (Crimson, Dark Slate, Forest Green, Warm Amber)
const C = {
  white: "FFFFFF",
  slateDark: "0F172A",
  slate: "1E293B",
  slateLight: "334155",
  muted: "64748B",
  mutedLight: "CBD5E1",
  primary: "800020",          // Classic Academic Crimson / Burgundy
  primaryDark: "5C0017",
  primaryLight: "FFF1F2",     // Soft Crimson Tint
  primaryBorder: "FECDD3",
  amber: "D97706",            // Warm Amber / Ochre
  amberDark: "B45309",
  amberLight: "FFFBEB",
  green: "166534",            // Forest Green
  greenDark: "14532D",
  greenLight: "F0FDF4",
  crimson: "800020",          // Crimson
  crimsonLight: "FFF1F2",
  cardBg: "F8FAFC",
  cardBorder: "E2E8F0",
  tableHead: "800020",
  tableRow1: "FFF1F2",
  tableRow2: "FFFFFF",
};

const TOTAL = 23;
const TITLE_FONT = "Century Schoolbook";
const BODY_FONT = "Calibri";
const FOOTER_TEXT = "Large Language Models Cannot Self-Correct Reasoning Yet | ICLR 2024";

function pad(n) { return String(n).padStart(2, "0"); }

function addFooter(slide, num) {
  slide.addText(FOOTER_TEXT, { x: 0.6, y: 5.18, w: 7.2, h: 0.3, fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "left", margin: 0 });
  slide.addText(`${pad(num)}/${TOTAL}`, { x: 8.0, y: 5.18, w: 1.4, h: 0.3, fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "right", margin: 0, bold: true });
}

function addTopicHeader(slide, topic) {
  slide.addText(topic.toUpperCase(), { x: 0.6, y: 0.22, w: 8.8, h: 0.25, fontSize: 9, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.5 });
}

function addSlideHeading(slide, topic, title, subtitle) {
  addTopicHeader(slide, topic);
  slide.addText(title, { x: 0.6, y: 0.48, w: 8.8, h: 0.45, fontSize: 23, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  if (subtitle) slide.addText(subtitle, { x: 0.6, y: 0.95, w: 8.8, h: 0.25, fontSize: 11, fontFace: BODY_FONT, color: C.muted, margin: 0 });
}

function createSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.white };
  return s;
}

function addBadgeCircle(slide, x, y, text, sz = 0.36, bgColor = C.primary, textColor = C.white) {
  slide.addShape(pres.shapes.OVAL, { x: x, y: y, w: sz, h: sz, fill: { color: bgColor } });
  slide.addText(text, { x: x, y: y, w: sz, h: sz, fontSize: sz > 0.4 ? 13 : 11, fontFace: BODY_FONT, color: textColor, align: "center", valign: "middle", margin: 0, bold: true });
}

function addArrow(slide, x, y, w = 0.35, h = 0.18, color = C.primary) {
  slide.addShape(pres.shapes.RIGHT_ARROW, { x: x, y: y, w: w, h: h, fill: { color: color }, line: { color: color, width: 1 } });
}

// ==========================================================================
// SLIDE 01: Title Slide
// ==========================================================================
{
  const s = createSlide();
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 0.45, w: 2.6, h: 0.35, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1 }, rectRadius: 0.08 });
  s.addText("ICLR 2024 CONFERENCE PAPER", { x: 0.6, y: 0.45, w: 2.6, h: 0.35, fontSize: 9, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0, charSpacing: 1.0 });
  s.addText("Large Language Models\nCannot Self-Correct Reasoning Yet", { x: 0.6, y: 0.95, w: 8.8, h: 1.45, fontSize: 33, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "left", margin: 0, lineSpacingMultiple: 1.08 });
  s.addText("Jie Huang (UIUC), Xinyun Chen, Swaroop Mishra, Huaixiu Steven Zheng, Adams Wei Yu, Xinying Song, Denny Zhou (Google DeepMind)", { x: 0.6, y: 2.55, w: 8.8, h: 0.45, fontSize: 10.5, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.15, w: 8.8, h: 1.8, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  s.addText("Group Presentation | Student Presenters", { x: 0.85, y: 3.3, w: 8.3, h: 0.25, fontSize: 11, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0 });
  const students = [
    "1. Nafis Islam Kabbo (2303180)",
    "2. Srijon (2303179)",
    "3. Anindo (2303181)",
    "4. Mahid (2303127)",
    "5. Jebon (2303160)",
    "6. Refayet (2303148)"
  ];
  students.forEach((st, i) => {
    const col = i % 3; const row = Math.floor(i / 3);
    const cx = 0.85 + col * 2.8; const cy = 3.7 + row * 0.52;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: 2.6, h: 0.42, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.75 }, rectRadius: 0.06 });
    s.addText(st, { x: cx + 0.12, y: cy, w: 2.4, h: 0.42, fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, valign: "middle", margin: 0, bold: true });
  });
  s.addNotes("Speaker: Nafis Islam Kabbo welcomes the audience, introduces the ICLR 2024 paper, and presents the group members.");
  addFooter(s, 1);
}

// ==========================================================================
// SLIDE 02: Presentation Outline
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "Overview", "Presentation Outline", "Six sections tracing motivation to constructive future work");
  const outlineCards = [
    { num: "1", title: "Introduction", desc: "Why multi-step reasoning fails and what self-correction promises." },
    { num: "2", title: "Background & Literature", desc: "RCI, Reflexion, Self-Refine, Debate and their evaluation flaws." },
    { num: "3", title: "Methodology", desc: "GSM8K, CSQA, HotpotQA across GPT-3.5, GPT-4, Turbo, Llama-2." },
    { num: "4", title: "Results", desc: "Accuracy declines after self-correction, net negative flips." },
    { num: "5", title: "Analysis", desc: "Why gains vanish at equal compute and without feedback." },
    { num: "6", title: "Conclusion & Future Work", desc: "External tools, verifiers, and fair evaluation standards." },
  ];
  const cardW = 4.25; const cardH = 1.08; const startX = 0.6; const startY = 1.32; const gapX = 0.3; const gapY = 0.18;
  outlineCards.forEach((c, i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const cx = startX + col * (cardW + gapX); const cy = startY + row * (cardH + gapY);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
    addBadgeCircle(s, cx + 0.15, cy + 0.15, c.num, 0.35, C.primary, C.white);
    s.addText(c.title, { x: cx + 0.58, y: cy + 0.15, w: cardW - 0.7, h: 0.3, fontSize: 12.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(c.desc, { x: cx + 0.58, y: cy + 0.5, w: cardW - 0.7, h: 0.48, fontSize: 9, fontFace: BODY_FONT, color: C.muted, margin: 0, valign: "top" });
  });
  s.addNotes("Speaker: Nafis Islam Kabbo outlines the roadmap across six core sections.");
  addFooter(s, 2);
}

// ==========================================================================
// SLIDE 03: Introduction - Motivation
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "Large Language Models & Reasoning", "Motivation: Why sequential generation breaks");

  // Box 1: Input Prompt
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.45, w: 2.5, h: 1.85, fill: { color: C.cardBg }, line: { color: C.primary, width: 1.2 }, rectRadius: 0.1 });
  s.addShape(pres.shapes.OVAL, { x: 1.35, y: 1.65, w: 1.0, h: 0.3, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.7 } });
  s.addText("INPUT", { x: 1.35, y: 1.65, w: 1.0, h: 0.3, fontSize: 9, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Question", { x: 0.75, y: 2.05, w: 2.2, h: 0.25, fontSize: 12, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addText("GSM8K math problem\nMulti-step prompt", { x: 0.75, y: 2.35, w: 2.2, h: 0.7, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0 });

  // Arrow 1
  addArrow(s, 3.15, 2.28, 0.42, 0.2, C.primary);

  // Box 2: CoT Steps
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.62, y: 1.45, w: 2.85, h: 1.85, fill: { color: C.white }, line: { color: C.slateDark, width: 1.2 }, rectRadius: 0.1 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.82, y: 1.65, w: 2.45, h: 0.28, fill: { color: C.slateDark }, line: { color: C.slateDark, width: 1 }, rectRadius: 0.05 });
  s.addText("CHAIN-OF-THOUGHT (CoT) STEPS", { x: 3.82, y: 1.65, w: 2.45, h: 0.28, fontSize: 8, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.82, y: 2.05, w: 2.45, h: 0.28, fill: { color: C.greenLight }, line: { color: C.green, width: 0.6 }, rectRadius: 0.04 });
  s.addText("Step 1: Correct deduction", { x: 3.82, y: 2.05, w: 2.45, h: 0.28, fontSize: 9, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.82, y: 2.38, w: 2.45, h: 0.28, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.6 }, rectRadius: 0.04 });
  s.addText("Step 2: Arithmetic slip", { x: 3.82, y: 2.38, w: 2.45, h: 0.28, fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.82, y: 2.71, w: 2.45, h: 0.28, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.6 }, rectRadius: 0.04 });
  s.addText("Step 3: Error cascades", { x: 3.82, y: 2.71, w: 2.45, h: 0.28, fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Autoregressive: each token depends on prior", { x: 3.82, y: 3.05, w: 2.45, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0, italic: true });

  // Arrow 2
  addArrow(s, 6.52, 2.28, 0.42, 0.2, C.crimson);

  // Box 3: Output
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.98, y: 1.45, w: 2.45, h: 1.85, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.2 }, rectRadius: 0.1 });
  s.addShape(pres.shapes.OVAL, { x: 7.68, y: 1.65, w: 1.05, h: 0.3, fill: { color: C.crimson }, line: { color: C.crimson, width: 1 } });
  s.addText("OUTPUT", { x: 7.68, y: 1.65, w: 1.05, h: 0.3, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Incorrect Answer", { x: 7.13, y: 2.1, w: 2.15, h: 0.3, fontSize: 12, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("Final answer\ncorrupted by\nearlier slip", { x: 7.13, y: 2.45, w: 2.15, h: 0.65, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0 });

  // Bottom Takeaway Card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.55, w: 8.8, h: 1.25, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1 }, rectRadius: 0.08 });
  s.addText("CORE VULNERABILITY", { x: 0.85, y: 3.68, w: 8.3, h: 0.22, fontSize: 9.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.2 });
  s.addText("Early slip means every subsequent step inherits the error. Without external checks, the model cannot tell the chain is broken.", { x: 0.85, y: 3.92, w: 8.3, h: 0.48, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0 });
  addBadgeCircle(s, 0.85, 4.45, "!", 0.26, C.primary, C.white);
  s.addText("Domino effect in sequential reasoning", { x: 1.18, y: 4.45, w: 5.0, h: 0.26, fontSize: 9, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0, valign: "middle" });

  s.addNotes("Speaker: Nafis Islam Kabbo explains why autoregressive generation causes error cascades in multi-step reasoning.");
  addFooter(s, 3);
}

// ==========================================================================
// SLIDE 04: Introduction - Concept of Self-Correction
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "The Concept of Self-Correction", "Can models fix themselves? A 3-step loop");

  const steps = [
    { num: "1", title: "Draft Answer", sub: "Initial Generation", desc: "Prompt -> CoT\nFirst answer", color: C.slateDark, bg: C.cardBg },
    { num: "2", title: "Self-Critique", sub: "Reflection", desc: "\"Find flaws\nin reasoning\"", color: C.amberDark, bg: C.amberLight },
    { num: "3", title: "Revised Answer", sub: "Refined Output", desc: "Updated CoT\nNew answer", color: C.primary, bg: C.primaryLight },
  ];

  steps.forEach((st, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.32, w: 2.8, h: 1.75, fill: { color: st.bg }, line: { color: st.color, width: 1.2 }, rectRadius: 0.1 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.15, y: 1.48, w: 2.5, h: 0.28, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.7 }, rectRadius: 0.05 });
    s.addText(st.sub, { x: cx + 0.15, y: 1.48, w: 2.5, h: 0.28, fontSize: 8.5, fontFace: BODY_FONT, color: st.color, bold: true, align: "center", valign: "middle", margin: 0 });
    addBadgeCircle(s, cx + 0.2, 1.85, st.num, 0.32, st.color, C.white);
    s.addText(st.title, { x: cx + 0.6, y: 1.85, w: 2.0, h: 0.32, fontSize: 13, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(st.desc, { x: cx + 0.2, y: 2.25, w: 2.4, h: 0.7, fontSize: 10, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0, lineSpacingMultiple: 1.1 });
    if (i < 2) {
      addArrow(s, cx + 2.8, 2.12, 0.22, 0.18, C.primary);
    }
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.28, w: 8.8, h: 0.42, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.06 });
  s.addShape(pres.shapes.OVAL, { x: 0.75, y: 3.36, w: 0.26, h: 0.26, fill: { color: C.primary }, line: { color: C.primary, width: 1 } });
  s.addText("↻", { x: 0.75, y: 3.36, w: 0.26, h: 0.26, fontSize: 12, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addText("Self-correction loop", { x: 1.08, y: 3.36, w: 1.6, h: 0.26, fontSize: 9.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });
  s.addText("Repeat critique -> revise (max 2 rounds)", { x: 2.75, y: 3.36, w: 3.0, h: 0.26, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, margin: 0, valign: "middle" });
  addArrow(s, 6.2, 3.42, 0.3, 0.14, C.amberDark);
  s.addText("retry", { x: 6.55, y: 3.42, w: 0.6, h: 0.14, fontSize: 7, fontFace: BODY_FONT, color: C.amberDark, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.OVAL, { x: 7.3, y: 3.42, w: 0.14, h: 0.14, fill: { color: C.amberDark } });
  s.addShape(pres.shapes.OVAL, { x: 7.5, y: 3.42, w: 0.14, h: 0.14, fill: { color: C.primary } });
  s.addShape(pres.shapes.OVAL, { x: 7.7, y: 3.42, w: 0.14, h: 0.14, fill: { color: C.slateDark } });
  s.addText("Draft -> Critique -> Fix", { x: 7.92, y: 3.42, w: 1.2, h: 0.14, fontSize: 7, fontFace: BODY_FONT, color: C.muted, margin: 0, valign: "middle" });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.85, w: 8.8, h: 1.0, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1 }, rectRadius: 0.08 });
  s.addText("PROMISE vs REALITY", { x: 0.85, y: 3.95, w: 8.3, h: 0.22, fontSize: 9.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.0 });
  s.addText("Promise: Autonomous fix without humans. Reality: Can a frozen model detect its own flaws? Evidence says no.", { x: 0.85, y: 4.2, w: 8.3, h: 0.5, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0 });

  s.addNotes("Speaker: Nafis Islam Kabbo explains the 3-step closed-loop self-correction pipeline.");
  addFooter(s, 4);
}

// ==========================================================================
// SLIDE 05: Introduction - The Central Research Paradox
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "The Central Research Question", "The paradox that drives the study");
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.32, w: 8.8, h: 1.55, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1.5 }, rectRadius: 0.1 });
  s.addText("THE CENTRAL PARADOX", { x: 0.85, y: 1.5, w: 8.3, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.5 });
  s.addText('"If a model can correct a mistake, why did it not get it right the first time?"', { x: 0.85, y: 1.78, w: 8.3, h: 0.8, fontSize: 16, fontFace: TITLE_FONT, color: C.slateDark, bold: true, italic: true, margin: 0 });
  s.addText("Frozen weights. Same model as critic and generator. No new information.", { x: 0.85, y: 2.55, w: 8.3, h: 0.22, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.2, y: 3.0, w: 2.5, h: 0.38, fill: { color: C.white }, line: { color: C.primary, width: 1 }, rectRadius: 0.06 });
  s.addText("Paper tests: intrinsic only", { x: 2.2, y: 3.0, w: 2.5, h: 0.38, fontSize: 9, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 3.0, w: 2.5, h: 0.38, fill: { color: C.white }, line: { color: C.muted, width: 0.7 }, rectRadius: 0.06 });
  s.addText("External tools: out of scope", { x: 5.3, y: 3.0, w: 2.5, h: 0.38, fontSize: 9, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.OVAL, { x: 4.75, y: 3.6, w: 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.primary, width: 1.2 } });
  s.addText("?", { x: 4.75, y: 3.6, w: 0.5, h: 0.5, fontSize: 18, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Can frozen knowledge fix itself?", { x: 3.5, y: 4.2, w: 3.0, h: 0.3, fontSize: 10, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addText("Detailed comparison on next slide.", { x: 3.5, y: 4.5, w: 3.0, h: 0.22, fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.85, w: 8.8, h: 0.45, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.06 });
  s.addText("This question defines the paper. If intrinsic correction worked, it would be free performance.", { x: 0.85, y: 4.85, w: 8.3, h: 0.45, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, valign: "middle", margin: 0, align: "center" });
  s.addNotes("Speaker: Nafis Islam Kabbo presents the central paradox that motivates the study.");
  addFooter(s, 5);
}

// ==========================================================================
// SLIDE 06: Background & Literature - COMPACT & GIF-DRIVEN
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Prior Self-Correction Frameworks", "Four prominent paradigms and their operational loops");

  const frameworks = [
    { name: "RCI", cite: "Kim et al. (NeurIPS '23)", accent: C.primary, accentBg: C.primaryLight, tag: "Recursive zero-shot error prompt & patch", gain: "+7.0% (Oracle)" },
    { name: "Reflexion", cite: "Shinn et al. (NeurIPS '23)", accent: C.green, accentBg: C.greenLight, tag: "Episodic memory buffer across failed trials", gain: "+11.0% (Oracle)" },
    { name: "Self-Refine", cite: "Madaan et al. (NeurIPS '23)", accent: C.amberDark, accentBg: C.amberLight, tag: "Iterative feedback on style & constraints", gain: "+10.0% (Prompt)" },
    { name: "Debate", cite: "Du et al. (ICLR '24)", accent: C.slateDark, accentBg: C.cardBg, tag: "Multi-agent cross-examination & voting", gain: "+4.0% (vs 1-Shot)" }
  ];

  const cardW = 2.05;
  const cardH = 1.38;
  const startX = 0.6;
  const startY = 1.30;
  const gapX = 0.20;

  frameworks.forEach((f, i) => {
    const cx = startX + i * (cardW + gapX);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: startY, w: cardW, h: cardH,
      fill: { color: C.white },
      line: { color: f.accent, width: 1.1 },
      rectRadius: 0.08
    });

    // Top Header Badge
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.10, y: startY + 0.08, w: cardW - 0.20, h: 0.26,
      fill: { color: f.accentBg },
      line: { color: f.accent, width: 0.6 },
      rectRadius: 0.04
    });
    s.addText(f.name, {
      x: cx + 0.10, y: startY + 0.08, w: cardW - 0.20, h: 0.26,
      fontSize: 10, fontFace: BODY_FONT, color: f.accent, bold: true, align: "center", valign: "middle", margin: 0
    });

    s.addText(f.cite, {
      x: cx + 0.08, y: startY + 0.38, w: cardW - 0.16, h: 0.18,
      fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0
    });

    s.addText(f.tag, {
      x: cx + 0.08, y: startY + 0.58, w: cardW - 0.16, h: 0.44,
      fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0, lineSpacingMultiple: 1.1
    });

    // Claimed Gain Pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.12, y: startY + 1.06, w: cardW - 0.24, h: 0.22,
      fill: { color: f.accentBg },
      line: { color: f.accent, width: 0.5 },
      rectRadius: 0.04
    });
    s.addText("Claimed: " + f.gain, {
      x: cx + 0.12, y: startY + 1.06, w: cardW - 0.24, h: 0.22,
      fontSize: 7.5, fontFace: BODY_FONT, color: f.accent, bold: true, align: "center", valign: "middle", margin: 0
    });
  });

  // Animated Loop GIF
  s.addImage({
    path: "output/prior_frameworks_anim.gif",
    x: 0.6, y: 2.80, w: 8.8, h: 1.90
  });

  // Bottom Takeaway Bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.82, w: 8.8, h: 0.30,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 0.6 },
    rectRadius: 0.04
  });
  s.addText("Key Insight: All four frameworks claimed +4% to +15% gains, but all relied on unaddressed evaluation confounders.", {
    x: 0.7, y: 4.82, w: 8.6, h: 0.30,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addNotes("Speaker: Srijon reviews the four prior self-correction frameworks and their operational loops, highlighting that reported gains stemmed from evaluation confounders.");
  addFooter(s, 6);
}

// ==========================================================================
// SLIDE 07: Background & Literature - COMPACT & GIF-DRIVEN
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Intrinsic vs. External Feedback", "Closed-loop self-doubt vs. grounded deterministic verification");

  const colW = 4.25;
  const startY = 1.30;
  const colH = 1.38;

  // LEFT CARD: INTRINSIC (CLOSED LOOP)
  const lx = 0.6;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: lx, y: startY, w: colW, h: colH,
    fill: { color: C.crimsonLight },
    line: { color: C.crimson, width: 1.2 },
    rectRadius: 0.08
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: lx + 0.15, y: startY + 0.10, w: colW - 0.30, h: 0.28,
    fill: { color: C.crimson },
    line: { color: C.crimson, width: 1 },
    rectRadius: 0.04
  });
  s.addText("INTRINSIC (Closed-Loop / Paper Focus)", {
    x: lx + 0.15, y: startY + 0.10, w: colW - 0.30, h: 0.28,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addText("ACCURACY DROPS (-1.3% to -27.5%)", {
    x: lx + 0.15, y: startY + 0.44, w: colW - 0.30, h: 0.36,
    fontSize: 12, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addText("Same frozen weights, zero external ground truth, hallucinated error drift", {
    x: lx + 0.15, y: startY + 0.86, w: colW - 0.30, h: 0.38,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, align: "center", valign: "middle", margin: 0
  });

  // RIGHT CARD: EXTERNAL (GROUNDED)
  const rx = 5.15;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rx, y: startY, w: colW, h: colH,
    fill: { color: C.greenLight },
    line: { color: C.green, width: 1.2 },
    rectRadius: 0.08
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rx + 0.15, y: startY + 0.10, w: colW - 0.30, h: 0.28,
    fill: { color: C.green },
    line: { color: C.green, width: 1 },
    rectRadius: 0.04
  });
  s.addText("EXTERNAL / TOOL-ASSISTED (Grounded)", {
    x: rx + 0.15, y: startY + 0.10, w: colW - 0.30, h: 0.28,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addText("ACCURACY IMPROVES (+7.0% to +15.0%)", {
    x: rx + 0.15, y: startY + 0.44, w: colW - 0.30, h: 0.36,
    fontSize: 12, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addText("Deterministic Python REPL / Oracle, exact traceback and error localization", {
    x: rx + 0.15, y: startY + 0.86, w: colW - 0.30, h: 0.38,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, align: "center", valign: "middle", margin: 0
  });

  // Animated Feedback Loops GIF
  s.addImage({
    path: "output/feedback_loops.gif",
    x: 0.6, y: 2.80, w: 8.8, h: 1.90
  });

  // Bottom Principle Banner
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.82, w: 8.8, h: 0.30,
    fill: { color: C.slateDark },
    line: { color: C.slateDark, width: 1 },
    rectRadius: 0.04
  });
  s.addText("Core Principle: A frozen model cannot act as an independent verifier of its own output without external grounding.", {
    x: 0.7, y: 4.82, w: 8.6, h: 0.30,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addNotes("Speaker: Srijon contrasts intrinsic closed loop with external tool assisted feedback, highlighting that without new information, a model cannot verify its own outputs.");
  addFooter(s, 7);
}

// ==========================================================================
// SLIDE 08: Background & Literature - CHART & DIAGNOSTICS
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Flaws in Prior Evaluations", "Three root confounders exposed by Huang et al. (Table 1)");

  // NATIVE CLUSTERED BAR CHART: REPORTED VS CONTROLLED GAINS
  const confounderChartData = [
    {
      name: "Reported (With Confounder)",
      labels: ["Oracle Leakage", "Compute Asymmetry", "Prompt Distortion"],
      values: [10.5, 4.0, 10.0]
    },
    {
      name: "Controlled (Fair Baseline)",
      labels: ["Oracle Leakage", "Compute Asymmetry", "Prompt Distortion"],
      values: [-2.5, -1.5, 0.0]
    }
  ];

  s.addChart(pres.charts.BAR, confounderChartData, {
    x: 0.6, y: 1.30, w: 4.8, h: 3.45,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 8,
    chartColors: [C.primary, C.green],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slateDark, dataLabelFontSize: 8,
    valAxisMaxVal: 15, valAxisMinVal: -5,
    catAxisLabelColor: C.slateDark, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 8,
    showTitle: false,
    barGrouping: "clustered"
  });

  // RIGHT SIDE: 3 CONCISE DIAGNOSTIC CARDS
  const rightX = 5.65;
  const rightW = 3.75;
  const cardH = 1.05;
  const gapC = 0.15;
  const startY = 1.30;

  const confounders = [
    {
      title: "1. Oracle Leakage (RCI, Reflexion)",
      color: C.primary,
      bgColor: C.primaryLight,
      desc: "Harness alerted model ONLY when wrong, shielding correct answers.",
      stat: "Reported: +10.5% | Controlled: -2.5%"
    },
    {
      title: "2. Compute Asymmetry (Debate)",
      color: C.amberDark,
      bgColor: C.amberLight,
      desc: "Debate used 3-6x compute. Equal-budget Self-Consistency voting wins.",
      stat: "Reported: +4.0% | Controlled: -1.5%"
    },
    {
      title: "3. Prompt Distortion (Self-Refine)",
      color: C.slateDark,
      bgColor: C.cardBg,
      desc: "Initial prompt omitted rules, feedback prompt merely injected them.",
      stat: "Reported: +10.0% | Controlled: 0.0%"
    }
  ];

  confounders.forEach((cf, i) => {
    const cy = startY + i * (cardH + gapC);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rightX, y: cy, w: rightW, h: cardH,
      fill: { color: C.white },
      line: { color: cf.color, width: 1.1 },
      rectRadius: 0.06
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rightX + 0.10, y: cy + 0.08, w: rightW - 0.20, h: 0.26,
      fill: { color: cf.bgColor },
      line: { color: cf.color, width: 0.5 },
      rectRadius: 0.04
    });
    s.addText(cf.title, {
      x: rightX + 0.12, y: cy + 0.08, w: rightW - 0.24, h: 0.26,
      fontSize: 8.5, fontFace: BODY_FONT, color: cf.color, bold: true, valign: "middle", margin: 0
    });

    s.addText(cf.desc, {
      x: rightX + 0.12, y: cy + 0.38, w: rightW - 0.24, h: 0.36,
      fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.1
    });

    s.addText(cf.stat, {
      x: rightX + 0.12, y: cy + 0.76, w: rightW - 0.24, h: 0.22,
      fontSize: 7.5, fontFace: BODY_FONT, color: cf.color, bold: true, margin: 0
    });
  });

  // Bottom Takeaway Bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.85, w: 8.8, h: 0.28,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 0.6 },
    rectRadius: 0.04
  });
  s.addText("Table 1 Summary: When oracle leakage, unfair compute, and prompt distortion are controlled, self-correction gains drop to zero.", {
    x: 0.7, y: 4.85, w: 8.6, h: 0.28,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addNotes("Speaker: Srijon breaks down Table 1 into three root confounders: oracle leakage, unfair compute parity, and prompt design distortion.");
  addFooter(s, 8);
}

// ==========================================================================
// SLIDE 09: Methodology - Tasks & Benchmarks
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Evaluation Benchmarks", "Three reasoning tasks covering math, logic, multi-hop QA");
  const benchmarks = [
    { name: "GSM8K", size: "1,319", unit: "math problems", badge: "Grade School Math", desc: "2-8 step arithmetic.\nTracks state and logic.", prior: "Prior: +7% with oracle" },
    { name: "CommonSenseQA", size: "1,221", unit: "multiple-choice", badge: "Commonsense Logic", desc: "5-choice QA.\nSubtle distractors.", prior: "Prior: +15% with oracle" },
    { name: "HotpotQA", size: "100", unit: "samples", badge: "Fact Synthesis", desc: "Closed-book multi-hop.\nExact Match.", prior: "Prior: gains via reflection" },
  ];
  benchmarks.forEach((b, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.32, w: 2.8, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
    s.addText(b.size, { x: cx, y: 1.48, w: 2.8, h: 0.45, fontSize: 28, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
    s.addText(b.unit, { x: cx, y: 1.92, w: 2.8, h: 0.22, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
    s.addText(b.name, { x: cx, y: 2.2, w: 2.8, h: 0.3, fontSize: 13.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.3, y: 2.52, w: 2.2, h: 0.22, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04 });
    s.addText(b.badge, { x: cx + 0.3, y: 2.52, w: 2.2, h: 0.22, fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", bold: true, margin: 0 });
    s.addText(b.desc, { x: cx + 0.2, y: 2.82, w: 2.4, h: 1.1, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15, align: "center" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.15, y: 4.05, w: 2.5, h: 0.65, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.5 }, rectRadius: 0.05 });
    s.addText(b.prior, { x: cx + 0.2, y: 4.08, w: 2.4, h: 0.58, fontSize: 9, fontFace: BODY_FONT, color: C.primaryDark, italic: true, valign: "middle", margin: 0, align: "center" });
  });
  s.addNotes("Speaker: Anindo introduces the three evaluation tasks, covering arithmetic on GSM8K, logic on CommonSenseQA, and multi-hop reasoning on HotpotQA.");
  addFooter(s, 9);
}

// ==========================================================================
// SLIDE 10: Methodology - Models & Setup
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Models & Experimental Controls", "Four LLMs under standardized conditions");
  const colW = 4.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.32, w: colW, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  s.addText("Evaluated Models", { x: 0.85, y: 1.5, w: colW - 0.5, h: 0.3, fontSize: 14, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0 });
  const modelsList = [
    { title: "GPT-3.5-Turbo", sub: "gpt-3.5-turbo-0613" },
    { title: "GPT-4", sub: "Snapshot 2023/08/29" },
    { title: "GPT-4-Turbo", sub: "gpt-4-1106-preview" },
    { title: "Llama-2-70B-Chat", sub: "Open-weight 70B baseline" },
  ];
  modelsList.forEach((m, i) => {
    const cy = 1.92 + i * 0.72;
    addBadgeCircle(s, 0.85, cy + 0.05, String(i + 1), 0.28, C.slateDark, C.white);
    s.addText(m.title, { x: 1.25, y: cy, w: colW - 1.5, h: 0.26, fontSize: 12, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(m.sub, { x: 1.25, y: cy + 0.26, w: colW - 1.5, h: 0.22, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0 });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 1.32, w: colW, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  s.addText("Controls & Rigor", { x: 5.4, y: 1.5, w: colW - 0.5, h: 0.3, fontSize: 14, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0 });
  const controls = ["CoT few/zero-shot prompting", "Temp: 1.0 (GPT), 0.7 (Llama)", "Max 2 correction rounds", "Generic feedback prompts", "Intrinsic vs Oracle comparison"];
  controls.forEach((ct, i) => {
    const cy = 1.95 + i * 0.56;
    s.addShape(pres.shapes.OVAL, { x: 5.4, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.primary } });
    s.addText(ct, { x: 5.62, y: cy, w: colW - 0.9, h: 0.32, fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top" });
  });
  s.addNotes("Speaker: Anindo presents the evaluated models and strict experimental controls.");
  addFooter(s, 10);
}

// ==========================================================================
// SLIDE 11: Methodology - Prompting Protocols
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Prompting Procedures", "Flow: intrinsic vs oracle regimes");
  const steps = [
    { num: "1", title: "Initial", text: "Generate draft" },
    { num: "2", title: "Critique", text: "Review logic" },
    { num: "3", title: "Revise", text: "New reasoning" },
    { num: "4", title: "Iterate", text: "Round 2 repeat" },
  ];
  steps.forEach((st, i) => {
    const cx = 0.6 + i * 2.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.32, w: 2.05, h: 1.15, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
    addBadgeCircle(s, cx + 0.15, 1.48, st.num, 0.28, C.primary, C.white);
    s.addText(st.title, { x: cx + 0.5, y: 1.48, w: 1.45, h: 0.28, fontSize: 10.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(st.text, { x: cx + 0.15, y: 1.82, w: 1.75, h: 0.5, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", align: "center" });
    if (i < 3) addArrow(s, cx + 2.07, 1.82, 0.16, 0.14, C.muted);
  });
  const botW = 4.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 2.7, w: botW, h: 2.15, fill: { color: C.greenLight }, line: { color: C.green, width: 1 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.OVAL, { x: 0.8, y: 2.88, w: 0.28, h: 0.28, fill: { color: C.green } });
  s.addText("✓", { x: 0.8, y: 2.88, w: 0.28, h: 0.28, fontSize: 10, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("With Oracle (Flawed)", { x: 1.15, y: 2.88, w: botW - 0.7, h: 0.28, fontSize: 12.5, fontFace: TITLE_FONT, color: C.green, bold: true, margin: 0, valign: "middle" });
  s.addText("• Verifier checks answer\n• Tells model WHEN wrong\n• Correct answers untouched -> inflated", { x: 0.85, y: 3.25, w: botW - 0.5, h: 1.4, fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.1 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 2.7, w: botW, h: 2.15, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.OVAL, { x: 5.35, y: 2.88, w: 0.28, h: 0.28, fill: { color: C.crimson } });
  s.addText("✗", { x: 5.35, y: 2.88, w: 0.28, h: 0.28, fontSize: 10, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Intrinsic (Realistic)", { x: 5.7, y: 2.88, w: botW - 0.7, h: 0.28, fontSize: 12.5, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0, valign: "middle" });
  s.addText("• No external signal\n• Model judges itself blindly\n• Flips correct -> wrong -> drops", { x: 5.4, y: 3.25, w: botW - 0.5, h: 1.4, fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.1 });
  s.addShape(pres.shapes.DOWN_ARROW, { x: 1.55, y: 2.5, w: 0.18, h: 0.12, fill: { color: C.green }, line: { color: C.green } });
  s.addShape(pres.shapes.DOWN_ARROW, { x: 7.0, y: 2.5, w: 0.18, h: 0.12, fill: { color: C.crimson }, line: { color: C.crimson } });
  s.addNotes("Speaker: Anindo contrasts the oracle feedback procedure against intrinsic blind self-correction.");
  addFooter(s, 11);
}

// ==========================================================================
// SLIDE 12: Results - Core Finding
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "Intrinsic Self-Correction Fails", "Main Finding: Performance declines after self-correction");
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.32, w: 8.8, h: 1.0, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1.5 }, rectRadius: 0.08 });
  s.addText("CENTRAL EMPIRICAL FINDING", { x: 0.85, y: 1.45, w: 8.3, h: 0.22, fontSize: 9.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.5 });
  s.addText("Intrinsic self-correction does NOT improve accuracy. Scores drop across all models and tasks.", { x: 0.85, y: 1.7, w: 8.3, h: 0.55, fontSize: 13.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  const cards = [
    { title: "Universal", badge: "All models", desc: "GPT-3.5, GPT-4, Turbo, Llama-2 all decline after R1 and R2." },
    { title: "Task-Agnostic", badge: "All tasks", desc: "Math (GSM8K), logic (CSQA), QA (HotpotQA) all fail." },
    { title: "Oracle Illusion", badge: "Prior artifact", desc: "Gains only with external labels guiding when to fix." },
  ];
  cards.forEach((c, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 2.5, w: 2.8, h: 2.35, fill: { color: i === 2 ? C.amberLight : C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
    addBadgeCircle(s, cx + 0.2, 2.7, String(i + 1), 0.32, C.primary, C.white);
    s.addText(c.title, { x: cx + 0.6, y: 2.7, w: 2.0, h: 0.3, fontSize: 12.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.2, y: 3.1, w: 2.4, h: 0.22, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04 });
    s.addText(c.badge, { x: cx + 0.2, y: 3.1, w: 2.4, h: 0.22, fontSize: 8.5, fontFace: BODY_FONT, color: C.primary, align: "center", valign: "middle", bold: true, margin: 0 });
    s.addText(c.desc, { x: cx + 0.2, y: 3.45, w: 2.4, h: 1.25, fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15, align: "center" });
    s.addShape(pres.shapes.OVAL, { x: cx + 1.15, y: 4.05, w: 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.mutedLight, width: 0.8 } });
    s.addText(i === 2 ? "!" : "↓", { x: cx + 1.15, y: 4.05, w: 0.5, h: 0.5, fontSize: 16, fontFace: BODY_FONT, color: i === 2 ? C.amberDark : C.crimson, bold: true, align: "center", valign: "middle", margin: 0 });
  });
  s.addNotes("Speaker: Mahid presents the headline empirical finding that intrinsic correction fails across all models.");
  addFooter(s, 12);
}

// ==========================================================================
// SLIDE 13: Results - GPT-3.5 & GPT-4 Benchmark Results
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "GPT-3.5 & GPT-4 Benchmark Results", "Accuracy drops across rounds (Table 2)");
  const gptChartData = [
    { name: "Standard (CoT)", labels: ["GSM8K (3.5)", "CSQA (3.5)", "Hotpot (3.5)", "GSM8K (GPT-4)", "CSQA (GPT-4)", "Hotpot (GPT-4)"], values: [77.0, 72.5, 29.0, 92.0, 78.5, 53.0] },
    { name: "Self-Correct R1", labels: ["GSM8K (3.5)", "CSQA (3.5)", "Hotpot (3.5)", "GSM8K (GPT-4)", "CSQA (GPT-4)", "Hotpot (GPT-4)"], values: [75.2, 63.5, 26.0, 88.5, 72.5, 42.0] },
    { name: "Self-Correct R2", labels: ["GSM8K (3.5)", "CSQA (3.5)", "Hotpot (3.5)", "GSM8K (GPT-4)", "CSQA (GPT-4)", "Hotpot (GPT-4)"], values: [72.6, 55.3, 25.0, 88.0, 72.0, 42.0] },
  ];
  s.addChart(pres.charts.BAR, gptChartData, {
    x: 0.6, y: 1.32, w: 5.2, h: 3.55,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 8,
    chartColors: [C.slateDark, C.amberDark, C.primary],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slateDark, dataLabelFontSize: 8,
    valAxisMaxVal: 100,
    catAxisLabelColor: C.slateDark, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 8,
    showTitle: false,
    barGrouping: "clustered",
  });
  const rightW = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 1.32, w: rightW, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  s.addText("Key Drops", { x: 6.3, y: 1.5, w: rightW - 0.4, h: 0.3, fontSize: 13, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0 });
  const drops = [
    { model: "GPT-3.5 on CSQA", drop: "-17.2%", detail: "72.5% -> 55.3% (R2)" },
    { model: "GPT-4 on HotpotQA", drop: "-11.0%", detail: "53.0% -> 42.0%" },
    { model: "GPT-4 on GSM8K", drop: "-4.0%", detail: "92.0% -> 88.0%" },
  ];
  drops.forEach((d, i) => {
    const cy = 1.92 + i * 0.92;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.3, y: cy, w: rightW - 0.4, h: 0.8, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.06 });
    s.addText(d.model, { x: 6.45, y: cy + 0.08, w: rightW - 0.7, h: 0.22, fontSize: 10, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(d.drop, { x: 6.45, y: cy + 0.08, w: rightW - 0.7, h: 0.22, fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "right", margin: 0 });
    s.addText(d.detail, { x: 6.45, y: cy + 0.32, w: rightW - 0.7, h: 0.42, fontSize: 9, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  });
  s.addText("Table 2: GPT-3.5 and GPT-4 accuracy across two self-correction rounds", { x: 0.6, y: 4.95, w: 8.8, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });
  s.addNotes("Speaker: Mahid details the numerical drops across GPT-3.5 and GPT-4.");
  addFooter(s, 13);
}

// ==========================================================================
// SLIDE 14: Results - GPT-4-Turbo & Llama-2 Results
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "GPT-4-Turbo & Llama-2 Results", "Failure generalizes across open and proprietary models");
  const colChartData = [
    { name: "Standard (CoT)", labels: ["GSM8K (Turbo)", "CSQA (Turbo)", "GSM8K (Llama-2)", "CSQA (Llama-2)"], values: [91.5, 84.0, 62.0, 64.0] },
    { name: "Self-Correct R1", labels: ["GSM8K (Turbo)", "CSQA (Turbo)", "GSM8K (Llama-2)", "CSQA (Llama-2)"], values: [88.0, 81.5, 43.5, 37.5] },
    { name: "Self-Correct R2", labels: ["GSM8K (Turbo)", "CSQA (Turbo)", "GSM8K (Llama-2)", "CSQA (Llama-2)"], values: [90.0, 83.0, 36.5, 36.5] },
  ];
  s.addChart(pres.charts.BAR, colChartData, {
    x: 0.6, y: 1.32, w: 5.2, h: 3.55,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 8,
    chartColors: [C.slateDark, C.amberDark, C.primary],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slateDark, dataLabelFontSize: 8,
    valAxisMaxVal: 100,
    catAxisLabelColor: C.slateDark, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 8,
    showTitle: false,
    barGrouping: "clustered",
  });
  const rightW = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 1.32, w: rightW, h: 3.55, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.2 }, rectRadius: 0.1 });
  s.addText("Llama-2 Collapse", { x: 6.3, y: 1.5, w: rightW - 0.4, h: 0.3, fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0 });
  s.addText("GSM8K: 62.0% -> 36.5% (-25.5%)\nCSQA: 64.0% -> 36.5% (-27.5%)", { x: 6.3, y: 1.92, w: rightW - 0.4, h: 0.5, fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, lineSpacingMultiple: 1.2 });
  s.addText("Open-weight models are highly prompt-compliant: they abandon correct answers when asked to \"find flaws\".", { x: 6.3, y: 2.55, w: rightW - 0.4, h: 1.8, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top" });
  s.addShape(pres.shapes.OVAL, { x: 7.1, y: 3.6, w: 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.crimson, width: 1 } });
  s.addText("!", { x: 7.1, y: 3.6, w: 0.5, h: 0.5, fontSize: 18, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Extreme compliance vulnerability", { x: 6.3, y: 4.2, w: rightW - 0.4, h: 0.4, fontSize: 8, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0, italic: true });
  s.addText("Table 3: GPT-4-Turbo and Llama-2 results across self-correction rounds", { x: 0.6, y: 4.95, w: 8.8, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });
  s.addNotes("Speaker: Mahid highlights the severe collapse of Llama-2 under self-correction prompting.");
  addFooter(s, 14);
}

// ==========================================================================
// SLIDE 15: Results - Answer Transition Dynamics
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "Answer Transition Dynamics", "Why accuracy drops: net-negative flips (Figure 1)");
  const doughnutData = [{ name: "Transitions", labels: ["Unchanged 74.7%", "Correct->Wrong 8.9%", "Wrong->Correct 7.6%", "Stayed Wrong 8.8%"], values: [74.7, 8.9, 7.6, 8.8] }];
  s.addChart(pres.charts.DOUGHNUT, doughnutData, {
    x: 0.6, y: 1.32, w: 4.8, h: 3.55,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 8,
    chartColors: [C.slateDark, C.crimson, C.green, C.primary],
    showValue: true, dataLabelColor: C.white, dataLabelFontSize: 8,
    holeSize: 55,
    showTitle: false,
  });
  const rightW = 3.7;
  const cards = [
    { pct: "74.7%", label: "Unchanged", sub: "Kept initial answer", color: C.slateDark, bg: C.cardBg },
    { pct: "8.9%", label: "Correct -> Wrong", sub: "Harmful flip", color: C.crimson, bg: C.crimsonLight },
    { pct: "7.6%", label: "Wrong -> Correct", sub: "Beneficial fix", color: C.green, bg: C.greenLight },
    { pct: "-1.3%", label: "Net Loss", sub: "Harm > help", color: C.primary, bg: C.primaryLight },
  ];
  cards.forEach((c, i) => {
    const cy = 1.32 + i * 0.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.7, y: cy, w: rightW, h: 0.8, fill: { color: c.bg }, line: { color: C.cardBorder, width: 0.75 }, rectRadius: 0.08 });
    s.addText(c.pct, { x: 5.85, y: cy + 0.1, w: 1.0, h: 0.6, fontSize: 16, fontFace: TITLE_FONT, color: c.color, bold: true, valign: "middle", margin: 0 });
    s.addText(c.label, { x: 6.9, y: cy + 0.12, w: rightW - 1.3, h: 0.25, fontSize: 11, fontFace: BODY_FONT, color: c.color, bold: true, margin: 0 });
    s.addText(c.sub, { x: 6.9, y: cy + 0.38, w: rightW - 1.3, h: 0.32, fontSize: 9, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  });
  s.addText("Figure 1: Answer transition dynamics after two self-correction rounds on GSM8K (GPT-3.5)", { x: 0.6, y: 4.95, w: 8.8, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });
  s.addNotes("Speaker: Mahid shows that harmful flips exceed beneficial fixes, explaining the net decline in accuracy.");
  addFooter(s, 15);
}

// ==========================================================================
// SLIDE 16: Analysis - Multi-Agent Debate vs Self-Consistency
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "Multi-Agent Debate vs. Self-Consistency", "Equal compute: sampling beats debate (Table 4)");
  const debateChartData = [
    { name: "Single-Shot", labels: ["GSM8K", "CSQA", "Chess QA"], values: [77.0, 72.5, 54.0] },
    { name: "Multi-Agent Debate", labels: ["GSM8K", "CSQA", "Chess QA"], values: [81.0, 75.0, 58.0] },
    { name: "Self-Consistency", labels: ["GSM8K", "CSQA", "Chess QA"], values: [82.5, 77.0, 60.5] },
  ];
  s.addChart(pres.charts.BAR, debateChartData, {
    x: 0.6, y: 1.32, w: 5.2, h: 3.55,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 8,
    chartColors: [C.slateDark, C.primary, C.green],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slateDark, dataLabelFontSize: 8,
    valAxisMaxVal: 100,
    catAxisLabelColor: C.slateDark, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 8,
    showTitle: false,
    barGrouping: "clustered",
  });
  const rightW = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 1.32, w: rightW, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  s.addText("Compute Parity", { x: 6.3, y: 1.5, w: rightW - 0.4, h: 0.3, fontSize: 13, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0 });
  s.addText("Claim:", { x: 6.3, y: 1.9, w: rightW - 0.4, h: 0.22, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
  s.addText("Debate > single-shot", { x: 6.3, y: 2.12, w: rightW - 0.4, h: 0.32, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0 });
  s.addText("Reality:", { x: 6.3, y: 2.5, w: rightW - 0.4, h: 0.22, fontSize: 10.5, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0 });
  s.addText("At same cost, Self-Consistency (majority vote) matches or beats debate with less latency.", { x: 6.3, y: 2.72, w: rightW - 0.4, h: 0.8, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.3, y: 3.65, w: rightW - 0.4, h: 0.95, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.7 }, rectRadius: 0.06 });
  s.addText("Debate: N x M calls", { x: 6.45, y: 3.75, w: rightW - 0.7, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0 });
  s.addText("Self-Consistency: N calls", { x: 6.45, y: 4.0, w: rightW - 0.7, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0 });
  s.addText("Vote = simple, fast", { x: 6.45, y: 4.25, w: rightW - 0.7, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  s.addText("Table 4: Multi-Agent Debate versus Self-Consistency at equal inference cost", { x: 0.6, y: 4.95, w: 8.8, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });
  s.addNotes("Speaker: Jebon explains compute parity, proving that majority voting matches or outperforms multi-agent debate at equal inference cost.");
  addFooter(s, 16);
}

// ==========================================================================
// SLIDE 17: Analysis - The Prompt Design Trap
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "The Prompt Design Trap", "Gains from missing info, not reflection (Table 5)");
  const colW = 4.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.32, w: colW, h: 2.65, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1.2 }, rectRadius: 0.1 });
  s.addShape(pres.shapes.OVAL, { x: 0.8, y: 1.48, w: 0.28, h: 0.28, fill: { color: C.primary } });
  s.addText("!", { x: 0.8, y: 1.48, w: 0.28, h: 0.28, fontSize: 12, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Flawed Setup (Self-Refine)", { x: 1.15, y: 1.48, w: colW - 0.7, h: 0.28, fontSize: 12.5, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: 1.85, w: colW - 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.06 });
  s.addText("1. Weak initial prompt\n    omits required rules", { x: 0.85, y: 1.85, w: colW - 0.5, h: 0.5, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "middle", align: "center" });
  s.addShape(pres.shapes.DOWN_ARROW, { x: 2.4, y: 2.38, w: 0.18, h: 0.12, fill: { color: C.primary }, line: { color: C.primary } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: 2.55, w: colW - 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.06 });
  s.addText("2. Feedback re-adds rules\n   \"Add missing word X\"", { x: 0.85, y: 2.55, w: colW - 0.5, h: 0.5, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "middle", align: "center" });
  s.addShape(pres.shapes.DOWN_ARROW, { x: 2.4, y: 3.08, w: 0.18, h: 0.12, fill: { color: C.primary }, line: { color: C.primary } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: 3.22, w: colW - 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.crimson, width: 1 }, rectRadius: 0.06 });
  s.addText("3. Improves -> claim \"It works!\"", { x: 0.85, y: 3.22, w: colW - 0.5, h: 0.5, fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, valign: "middle", align: "center" });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 1.32, w: colW, h: 2.65, fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.1 });
  s.addShape(pres.shapes.OVAL, { x: 5.35, y: 1.48, w: 0.28, h: 0.28, fill: { color: C.green } });
  s.addText("✓", { x: 5.35, y: 1.48, w: 0.28, h: 0.28, fontSize: 12, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Fair Setup (Huang et al.)", { x: 5.7, y: 1.48, w: colW - 0.7, h: 0.28, fontSize: 12.5, fontFace: TITLE_FONT, color: C.green, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 1.85, w: colW - 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.06 });
  s.addText("1. Complete prompt\n   all rules up-front", { x: 5.4, y: 1.85, w: colW - 0.5, h: 0.5, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "middle", align: "center" });
  s.addShape(pres.shapes.DOWN_ARROW, { x: 6.95, y: 2.38, w: 0.18, h: 0.12, fill: { color: C.green }, line: { color: C.green } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 2.55, w: colW - 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.06 });
  s.addText("2. Strong answer immediately", { x: 5.4, y: 2.55, w: colW - 0.5, h: 0.5, fontSize: 9.5, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0, valign: "middle", align: "center" });
  s.addShape(pres.shapes.DOWN_ARROW, { x: 6.95, y: 3.08, w: 0.18, h: 0.12, fill: { color: C.green }, line: { color: C.green } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 3.22, w: colW - 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.crimson, width: 1 }, rectRadius: 0.06 });
  s.addText("3. Self-correction -> DROPS", { x: 5.4, y: 3.22, w: colW - 0.5, h: 0.5, fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, valign: "middle", align: "center" });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.15, w: 8.8, h: 0.65, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("Takeaway: Well-prompted single shot beats loops. Gains were prompt artifacts.", { x: 0.8, y: 4.15, w: 8.4, h: 0.65, fontSize: 10, fontFace: BODY_FONT, color: C.slateDark, bold: true, valign: "middle", margin: 0, align: "center" });
  s.addText("Table 5: Constrained generation under flawed versus fair prompts", { x: 0.6, y: 4.85, w: 8.8, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });
  s.addNotes("Speaker: Jebon explains the prompt design trap, demonstrating that apparent gains vanished when prompts were complete up-front.");
  addFooter(s, 17);
}

// ==========================================================================
// SLIDE 18: Analysis - Case Study: The Gaslighting Effect
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Why Does Self-Correction Fail?", "Case Study: The Gaslighting Effect", "Figure 2 Trace: How critique prompts force correct reasoning into hallucination");

  // Top Problem Statement Card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.28, w: 8.8, h: 0.68,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1 },
    rectRadius: 0.06
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.75, y: 1.38, w: 1.05, h: 0.24,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 0.6 },
    rectRadius: 0.04
  });
  s.addText("GSM8K TASK", {
    x: 0.75, y: 1.38, w: 1.05, h: 0.24,
    fontSize: 8, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0
  });
  s.addText("Terry eats 2 yogurts a day. They are sold in 4-packs at $5.00 per pack. How much does he spend on yogurts in 30 days?", {
    x: 1.90, y: 1.35, w: 7.35, h: 0.52,
    fontSize: 10, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, valign: "middle"
  });

  // 3-Phase Horizontal Flow Layout
  const flowY = 2.06;
  const flowH = 2.45;

  // -------------------------------------------------------------
  // PHASE 1: ROUND 1 GENERATION (SOUND REASONING)
  // -------------------------------------------------------------
  const p1x = 0.6;
  const p1w = 2.75;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p1x, y: flowY, w: p1w, h: flowH,
    fill: { color: C.greenLight },
    line: { color: C.green, width: 1.2 },
    rectRadius: 0.08
  });

  // Header Pill Left
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p1x + 0.15, y: flowY + 0.12, w: p1w - 0.3, h: 0.28,
    fill: { color: C.green },
    line: { color: C.green, width: 1 },
    rectRadius: 0.04
  });
  s.addText("ROUND 1: CORRECT", {
    x: p1x + 0.15, y: flowY + 0.12, w: p1w - 0.3, h: 0.28,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Large Stat Callout
  s.addText("$75", {
    x: p1x + 0.15, y: flowY + 0.44, w: p1w - 0.3, h: 0.48,
    fontSize: 26, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Math Steps Box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p1x + 0.15, y: flowY + 0.96, w: p1w - 0.3, h: 1.35,
    fill: { color: C.white },
    line: { color: C.cardBorder, width: 0.6 },
    rectRadius: 0.05
  });
  s.addText("1. Total yogurts needed:\n   30 days x 2 = 60 yogurts\n\n2. 4-packs required:\n   60 / 4 = 15 packs\n\n3. Total expenditure:\n   15 packs x $5 = $75", {
    x: p1x + 0.25, y: flowY + 1.06, w: p1w - 0.5, h: 1.15,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.12
  });

  // Arrow 1 -> 2
  addArrow(s, 3.42, flowY + 1.15, 0.22, 0.18, C.primary);

  // -------------------------------------------------------------
  // PHASE 2: THE CRITIQUE CATALYST (INDUCTION OF DOUBT)
  // -------------------------------------------------------------
  const p2x = 3.68;
  const p2w = 2.64;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p2x, y: flowY, w: p2w, h: flowH,
    fill: { color: C.amberLight },
    line: { color: C.amberDark, width: 1.2 },
    rectRadius: 0.08
  });

  // Header Pill Center
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p2x + 0.15, y: flowY + 0.12, w: p2w - 0.3, h: 0.28,
    fill: { color: C.amberDark },
    line: { color: C.amberDark, width: 1 },
    rectRadius: 0.04
  });
  s.addText("SELF-CRITIQUE PROMPT", {
    x: p2x + 0.15, y: flowY + 0.12, w: p2w - 0.3, h: 0.28,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Prompt Quote Box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p2x + 0.15, y: flowY + 0.48, w: p2w - 0.3, h: 0.52,
    fill: { color: C.white },
    line: { color: C.amberDark, width: 0.8 },
    rectRadius: 0.04
  });
  s.addText('"Review your answer and find flaws."', {
    x: p2x + 0.2, y: flowY + 0.48, w: p2w - 0.4, h: 0.52,
    fontSize: 9, fontFace: BODY_FONT, color: C.amberDark, italic: true, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Gaslighting Breakdown Box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p2x + 0.15, y: flowY + 1.08, w: p2w - 0.3, h: 1.23,
    fill: { color: C.white },
    line: { color: C.cardBorder, width: 0.6 },
    rectRadius: 0.05
  });
  s.addText("The Compliance Trap:", {
    x: p2x + 0.22, y: flowY + 1.14, w: p2w - 0.44, h: 0.18,
    fontSize: 7.5, fontFace: BODY_FONT, color: C.amberDark, bold: true, margin: 0
  });
  s.addText("• Instruction-following bias\n• Model assumes prompt implies an error occurred\n• Model invents non-existent flaws to comply", {
    x: p2x + 0.22, y: flowY + 1.34, w: p2w - 0.44, h: 0.92,
    fontSize: 8, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15
  });

  // Arrow 2 -> 3
  addArrow(s, 6.38, flowY + 1.15, 0.22, 0.18, C.crimson);

  // -------------------------------------------------------------
  // PHASE 3: ROUND 2 REVISION (HALLUCINATED ERROR & FLIP)
  // -------------------------------------------------------------
  const p3x = 6.65;
  const p3w = 2.75;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p3x, y: flowY, w: p3w, h: flowH,
    fill: { color: C.crimsonLight },
    line: { color: C.crimson, width: 1.2 },
    rectRadius: 0.08
  });

  // Header Pill Right
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p3x + 0.15, y: flowY + 0.12, w: p3w - 0.3, h: 0.28,
    fill: { color: C.crimson },
    line: { color: C.crimson, width: 1 },
    rectRadius: 0.04
  });
  s.addText("ROUND 2: WRONG FLIP", {
    x: p3x + 0.15, y: flowY + 0.12, w: p3w - 0.3, h: 0.28,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Large Stat Callout
  s.addText("$150", {
    x: p3x + 0.15, y: flowY + 0.44, w: p3w - 0.3, h: 0.48,
    fontSize: 26, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Hallucinated Steps Box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: p3x + 0.15, y: flowY + 0.96, w: p3w - 0.3, h: 1.35,
    fill: { color: C.white },
    line: { color: C.cardBorder, width: 0.6 },
    rectRadius: 0.05
  });
  s.addText("1. Model doubts previous logic\n\n2. Hallucinates new rule:\n   \"Terry buys 1 pack daily\"\n\n3. Calculates 30 x $5 = $150\n   (Flipped from 100% correct to 0%)", {
    x: p3x + 0.25, y: flowY + 1.06, w: p3w - 0.5, h: 1.15,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.12
  });

  // Bottom Takeaway Banner
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.60, w: 8.8, h: 0.45,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 1 },
    rectRadius: 0.05
  });
  s.addText("Figure 2 Insight: Asking an LLM to 'find flaws' acts as destructive noise because the model lacks an internal truth verifier.", {
    x: 0.7, y: 4.60, w: 8.6, h: 0.45,
    fontSize: 9, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0
  });

  s.addNotes("Speaker: Jebon walks through the concrete Yogurt problem case study from Figure 2, demonstrating how self-critique prompts cause models to hallucinate errors and flip correct $75 answers to incorrect $150 answers.");
  addFooter(s, 18);
}

// ==========================================================================
// SLIDE 19: Analysis - The Verification Barrier
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "The Verification Barrier", "Why intrinsic checks are as hard as generation");
  const cards = [
    { num: "1", title: "Shared Weights", badge: "Knowledge Parity", text: "Critic = Generator.\nIf you can't generate it,\nyou can't verify it." },
    { num: "2", title: "Compliance Bias", badge: "Instruction tuning", text: "\"Find flaws\" biases\nmodel to invent errors\neven when sound." },
    { num: "3", title: "No Grounding", badge: "No signal", text: "Without Python/oracle,\ncan't tell fix from\nhallucination." },
  ];
  cards.forEach((c, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.32, w: 2.8, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
    addBadgeCircle(s, cx + 0.2, 1.52, c.num, 0.35, C.primary, C.white);
    s.addText(c.title, { x: cx + 0.2, y: 2.02, w: 2.4, h: 0.5, fontSize: 13.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0, align: "center" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.2, y: 2.58, w: 2.4, h: 0.25, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.05 });
    s.addText(c.badge, { x: cx + 0.2, y: 2.58, w: 2.4, h: 0.25, fontSize: 8.5, fontFace: BODY_FONT, color: C.primary, align: "center", valign: "middle", bold: true, margin: 0 });
    s.addText(c.text, { x: cx + 0.2, y: 2.95, w: 2.4, h: 1.75, fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15, align: "center" });
    s.addShape(pres.shapes.OVAL, { x: cx + 1.05, y: 4.05, w: 0.7, h: 0.5, fill: { color: C.white }, line: { color: C.mutedLight, width: 1 } });
    s.addText(c.num === "1" ? "≡" : c.num === "2" ? "↯" : "∅", { x: cx + 1.05, y: 4.05, w: 0.7, h: 0.5, fontSize: 16, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });
  });
  s.addNotes("Speaker: Jebon details the three verification barriers: shared parameters, instruction compliance bias, and lack of external grounding.");
  addFooter(s, 19);
}

// ==========================================================================
// SLIDE 20: Conclusion - Key Takeaways
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Key Takeaways", "Three conclusions from Huang et al. (ICLR 2024)");
  const takeaways = [
    { num: "1", title: "Intrinsic Self-Correction Fails for Reasoning", text: "Without external feedback, accuracy consistently drops across models and tasks." },
    { num: "2", title: "Prior Gains Were Evaluation Artifacts", text: "Oracle leakage, unfair compute, and weak prompts created the illusion of progress." },
    { num: "3", title: "External Feedback Required", text: "Reliable refinement needs tools: code execution, verifiers, or human review." },
  ];
  takeaways.forEach((t, i) => {
    const cy = 1.32 + i * 1.16;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: cy, w: 8.8, h: 1.0, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
    addBadgeCircle(s, 0.85, cy + 0.25, t.num, 0.42, C.primary, C.white);
    s.addText(t.title, { x: 1.45, y: cy + 0.15, w: 7.7, h: 0.28, fontSize: 12.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(t.text, { x: 1.45, y: cy + 0.45, w: 7.7, h: 0.48, fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15 });
  });
  s.addNotes("Speaker: Refayet synthesizes the paper's three main conclusions.");
  addFooter(s, 20);
}

// ==========================================================================
// SLIDE 21: Conclusion - Study Limitations
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Study Limitations", "Scope and boundaries of this research");
  const leftW = 4.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.32, w: leftW, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  s.addText("Scope Limitations", { x: 0.85, y: 1.5, w: leftW - 0.5, h: 0.3, fontSize: 14, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0 });
  const scopePoints = [
    { title: "Reasoning-Specific", desc: "Math/logic only. Not creative writing or translation." },
    { title: "Prompting-Only", desc: "Frozen models. Not fine-tuned for self-correction." },
    { title: "2023 Models", desc: "GPT-3.5/4, Llama-2. Newer reasoners need study." },
  ];
  scopePoints.forEach((sp, i) => {
    const cy = 1.9 + i * 0.9;
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.primary } });
    s.addText(sp.title, { x: 1.05, y: cy, w: leftW - 0.7, h: 0.22, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(sp.desc, { x: 1.05, y: cy + 0.22, w: leftW - 0.7, h: 0.65, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15 });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 1.32, w: leftW, h: 3.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1 });
  s.addText("Methodological Boundaries", { x: 5.4, y: 1.5, w: leftW - 0.5, h: 0.3, fontSize: 14, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0 });
  const methodPoints = [
    { title: "HotpotQA 100 samples", desc: "Limited by API cost, lower resolution." },
    { title: "Prompt Sensitivity", desc: "Multiple prompts tested, but not exhaustive." },
    { title: "Closed-Book", desc: "No retrieval (RAG) allowed." },
  ];
  methodPoints.forEach((mp, i) => {
    const cy = 1.9 + i * 0.9;
    s.addShape(pres.shapes.OVAL, { x: 5.4, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.primary } });
    s.addText(mp.title, { x: 5.6, y: cy, w: leftW - 0.7, h: 0.22, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(mp.desc, { x: 5.6, y: cy + 0.22, w: leftW - 0.7, h: 0.65, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15 });
  });
  s.addNotes("Speaker: Refayet discusses the study's scope limitations and methodological boundaries.");
  addFooter(s, 21);
}

// ==========================================================================
// SLIDE 22: Conclusion - Future Directions & Fair Standards
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Future Directions & Fair Standards", "Constructive paths forward");
  const directions = [
    { num: "1", title: "Tool-Augmented", badge: "Execution", desc: "Python, solvers, SQL to verify calculations externally." },
    { num: "2", title: "Learned Verifiers", badge: "PRMs", desc: "Train separate discriminators to judge step quality." },
    { num: "3", title: "Training-Time", badge: "RL & Search", desc: "RL + MCTS / test-time compute, not prompt loops." },
    { num: "4", title: "Fair Standards", badge: "Best Practices", desc: "Equal-cost baselines (Self-Consistency), no oracle leakage." },
  ];
  const cardW = 4.25; const cardH = 1.58; const startX = 0.6; const startY = 1.32; const gapX = 0.3; const gapY = 0.25;
  directions.forEach((d, i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const cx = startX + col * (cardW + gapX); const cy = startY + row * (cardH + gapY);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
    s.addText(d.title, { x: cx + 0.2, y: cy + 0.15, w: 2.5, h: 0.3, fontSize: 13, fontFace: TITLE_FONT, color: C.primary, bold: true, margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + cardW - 1.8, y: cy + 0.15, w: 1.6, h: 0.24, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04 });
    s.addText(d.badge, { x: cx + cardW - 1.8, y: cy + 0.15, w: 1.6, h: 0.24, fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", bold: true, margin: 0 });
    s.addText(d.desc, { x: cx + 0.2, y: cy + 0.52, w: cardW - 0.4, h: 0.95, fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15 });
  });
  s.addNotes("Speaker: Refayet outlines future research directions including tool integration and learned process reward models.");
  addFooter(s, 22);
}

// ==========================================================================
// SLIDE 23: Thank You & Open Discussions
// ==========================================================================
{
  const s = createSlide();
  addTopicHeader(s, "6. Conclusion & Future Work");
  s.addText("Thank You", { x: 0.6, y: 1.0, w: 8.8, h: 0.9, fontSize: 48, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 4.4, y: 2.1, w: 1.2, h: 0.02, fill: { color: C.mutedLight }, line: { color: C.mutedLight, width: 1 } });
  s.addText("Open Discussions", { x: 0.6, y: 2.35, w: 8.8, h: 0.35, fontSize: 14, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("We welcome questions from the professor and audience.", { x: 0.6, y: 2.72, w: 8.8, h: 0.25, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  const qs = [
    "Why does asking a model to find flaws often make it hallucinate errors where none exist?",
    "When should we rely on external tools like Python or verifiers instead of prompting alone?",
    "How can we design a fair self-correction benchmark that avoids oracle leakage?"
  ];
  qs.forEach((q, i) => {
    const cy = 3.18 + i * 0.68;
    addBadgeCircle(s, 1.2, cy + 0.04, String(i + 1), 0.32, C.primary, C.white);
    s.addText(q, { x: 1.62, y: cy, w: 7.0, h: 0.48, fontSize: 11, fontFace: BODY_FONT, color: C.slateDark, margin: 0, valign: "middle" });
  });
  s.addNotes("Speaker: Refayet concludes the presentation and opens the floor for questions.");
  addFooter(s, 23);
}

const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v13.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log(`Presentation v13 generated successfully at: ${outPath}`))
  .catch((err) => console.error("Error generating presentation:", err));
