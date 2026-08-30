const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation Variant Deck v17";
pres.title = "Selected Variants v17: Refined 6C Compact, 7A, 7B, 8A";

const C = {
  white: "FFFFFF",
  slateDark: "0F172A",
  slate: "1E293B",
  slateLight: "334155",
  muted: "64748B",
  mutedLight: "CBD5E1",
  primary: "800020",
  primaryDark: "5C0017",
  primaryLight: "FFF1F2",
  primaryBorder: "FECDD3",
  amber: "D97706",
  amberDark: "B45309",
  amberLight: "FFFBEB",
  green: "166534",
  greenDark: "14532D",
  greenLight: "F0FDF4",
  greenMuted: "DCFCE7",
  cardBg: "F8FAFC",
  cardBorder: "E2E8F0",
  axisLine: "94A3B8",
  zeroLine: "0F172A",
};

const TOTAL = 4;
const TITLE_FONT = "Century Schoolbook";
const BODY_FONT = "Calibri";
const FOOTER_TEXT = "Large Language Models Cannot Self-Correct Reasoning Yet | ICLR 2024";

function pad(n) { return String(n).padStart(2, "0"); }
function addFooter(slide, num) {
  slide.addText(FOOTER_TEXT, { x: 0.6, y: 5.18, w: 7.2, h: 0.3, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "left", margin: 0 });
  slide.addText(`${pad(num)}/${pad(TOTAL)}`, { x: 8.4, y: 5.18, w: 1.0, h: 0.3, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "right", margin: 0, bold: true });
}
function addTopicHeader(slide, topic) {
  slide.addText(topic.toUpperCase(), { x: 0.6, y: 0.18, w: 8.8, h: 0.20, fontSize: 8.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.2 });
}
function addVariantHeading(slide, topic, title, subtitle, variantPill) {
  addTopicHeader(slide, topic);
  slide.addText(title, { x: 0.6, y: 0.38, w: 6.8, h: 0.32, fontSize: 17, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  if (subtitle) slide.addText(subtitle, { x: 0.6, y: 0.70, w: 6.8, h: 0.20, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.4, y: 0.36, w: 2.0, h: 0.32, fill: { color: C.slateDark }, line: { color: C.slateDark, width: 1 }, rectRadius: 0.04 });
  slide.addText(variantPill, { x: 7.4, y: 0.36, w: 2.0, h: 0.32, fontSize: 8, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 0.96, w: 8.8, h: 0.015, fill: { color: C.cardBorder } });
}
function createSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.white };
  return s;
}
function addArrow(slide, x, y, w = 0.30, h = 0.16, color = C.primary) {
  slide.addShape(pres.shapes.RIGHT_ARROW, { x: x, y: y, w: w, h: h, fill: { color: color }, line: { color: color } });
}

// ==========================================================================
// SLIDE 1: VARIANT 6C • COMPACT — Timeline of Claims (Improved)
// Based on v14 V6-C1, polished for projector clarity, same content
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "Timeline of Claims", "2023 surge, same hidden helpers", "VARIANT 6C • COMPACT");

  const ty = 1.45;
  // Subtle track background for timeline (improved)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: ty + 1.56, w: 8.8, h: 0.26, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.09 });
  // Timeline axis — slightly thicker
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ty + 1.65, w: 8.8, h: 0.04, fill: { color: C.slateDark } });
  // Ticks and quarter labels
  ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"].forEach((q, i) => {
    const tx = 0.6 + i * 2.20;
    s.addShape(pres.shapes.OVAL, { x: tx + 0.95, y: ty + 1.60, w: 0.14, h: 0.14, fill: { color: C.slateDark }, line: { color: C.white, width: 1 } });
    s.addText(q, { x: tx, y: ty + 1.78, w: 2.05, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  });

  const items = [
    { x: 0.75, title: "RCI", cite: "Kim et al.", gain: "+7%", color: C.primary, bg: C.primaryLight, desc: "Recursive\ncritic", icon: "◉" },
    { x: 2.95, title: "Reflexion", cite: "Shinn et al.", gain: "+11%", color: C.green, bg: C.greenLight, desc: "Verbal\nreinforcement", icon: "◎" },
    { x: 5.15, title: "Self-Refine", cite: "Madaan et al.", gain: "+10%", color: C.amberDark, bg: C.amberLight, desc: "Feedback\nrefine", icon: "⬢" },
    { x: 7.35, title: "Debate", cite: "Du et al.", gain: "+4%", color: C.slate, bg: C.cardBg, desc: "Multi-agent\ndebate", icon: "⬣" },
  ];

  items.forEach((it) => {
    const ix = it.x;
    // Card with top accent strip (improved)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix, y: ty, w: 1.85, h: 1.45, fill: { color: C.white }, line: { color: it.color, width: 1.1 }, rectRadius: 0.08 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix, y: ty, w: 1.85, h: 0.06, fill: { color: it.color }, line: { color: it.color }, rectRadius: 0.08 });
    // Header badge with icon
    s.addShape(pres.shapes.OVAL, { x: ix + 0.12, y: ty + 0.14, w: 0.22, h: 0.22, fill: { color: it.bg }, line: { color: it.color, width: 0.7 } });
    s.addText(it.icon, { x: ix + 0.12, y: ty + 0.14, w: 0.22, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: it.color, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(it.title, { x: ix + 0.38, y: ty + 0.14, w: 1.37, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: it.color, bold: true, valign: "middle", margin: 0 });
    s.addText(it.cite, { x: ix, y: ty + 0.40, w: 1.85, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });
    s.addText(it.desc, { x: ix, y: ty + 0.60, w: 1.85, h: 0.52, fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix + 0.30, y: ty + 1.16, w: 1.25, h: 0.22, fill: { color: C.white }, line: { color: it.color, width: 0.6 }, rectRadius: 0.04 });
    s.addText(it.gain + " claimed", { x: ix + 0.30, y: ty + 1.16, w: 1.25, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: it.color, bold: true, align: "center", valign: "middle", margin: 0 });
    // Connector to timeline
    s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.925 - 0.01, y: ty + 1.45, w: 0.02, h: 0.20, fill: { color: it.color } });
  });

  // Bottom insight: 3 confounder icons — improved spacing and hierarchy
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.55, w: 8.8, h: 1.35, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("WHAT THE TIMELINE HIDES", { x: 0.75, y: 3.68, w: 8.5, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1 });
  const hides = [
    { icon: "◉", title: "Oracle leakage", desc: "Only wrong answers\nare critiqued", c: C.primary },
    { icon: "◈", title: "Prompt trick", desc: "Rules withheld\nthen re-added", c: C.amberDark },
    { icon: "⬢", title: "Compute gap", desc: "Debate uses 3 to 6x\ncalls vs single shot", c: C.slate },
  ];
  hides.forEach((h, i) => {
    const hx = 0.85 + i * 2.85;
    s.addShape(pres.shapes.OVAL, { x: hx, y: 3.92, w: 0.32, h: 0.32, fill: { color: h.c } });
    s.addText(h.icon, { x: hx, y: 3.92, w: 0.32, h: 0.32, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(h.title, { x: hx + 0.40, y: 3.92, w: 2.15, h: 0.18, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, valign: "middle" });
    s.addText(h.desc, { x: hx + 0.40, y: 4.12, w: 2.15, h: 0.62, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, margin: 0, lineSpacingMultiple: 1.05 });
  });

  addFooter(s, 1);
}

// ==========================================================================
// SLIDE 2: VARIANT 7A • COMPACT — Closed Loop vs Grounded Loop
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Closed Loop vs Grounded Loop", "Same model, different information: why internal reflection fails but external verification works", "VARIANT 7A • COMPACT");

  const leftX = 0.6; const rightX = 5.15; const cw = 4.25; const ch = 3.00;

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 1.14, w: cw, h: ch, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1.2 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fill: { color: C.primary }, line: { color: C.primary }, rectRadius: 0.04 });
  s.addText("INTRINSIC  •  Closed Loop: Paper Scope", { x: leftX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fontSize: 8.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.OVAL, { x: leftX + cw/2 - 0.60, y: 1.68, w: 1.20, h: 1.20, fill: { color: C.white }, line: { color: C.primary, width: 1.4 } });
  s.addText("LLM", { x: leftX + cw/2 - 0.60, y: 1.94, w: 1.20, h: 0.28, fontSize: 13, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Frozen weights", { x: leftX + cw/2 - 0.60, y: 2.22, w: 1.20, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  s.addShape(pres.shapes.OVAL, { x: leftX + 0.25, y: 1.68, w: 3.75, h: 1.20, fill: { color: C.white, transparency: 100 }, line: { color: C.primary, width: 1, dashType: "dash" } });
  s.addText("Generate", { x: leftX + 0.30, y: 1.56, w: 1.00, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Self-critique", { x: leftX + cw - 1.30, y: 1.56, w: 1.00, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Revise blind", { x: leftX + cw/2 - 0.60, y: 2.92, w: 1.20, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.15, y: 3.14, w: cw - 0.30, h: 0.86, fill: { color: C.white }, line: { color: C.primary, width: 0.8 }, rectRadius: 0.05 });
  s.addText("ACCURACY CHANGE  •  Huang et al. Tables 3-4", { x: leftX + 0.20, y: 3.20, w: cw - 0.40, h: 0.16, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("-1.3%  to  -27.5%", { x: leftX + 0.20, y: 3.36, w: cw - 0.40, h: 0.30, fontSize: 14, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Zero new facts. Compliance bias invents errors.", { x: leftX + 0.25, y: 3.68, w: cw - 0.50, h: 0.28, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0, lineSpacingMultiple: 1.05 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 1.14, w: cw, h: ch, fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.04 });
  s.addText("EXTERNAL  •  Grounded Loop: Tool-Assisted", { x: rightX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fontSize: 8.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.30, y: 1.70, w: 1.55, h: 1.05, fill: { color: C.white }, line: { color: C.green, width: 1.1 }, rectRadius: 0.06 });
  s.addText("LLM", { x: rightX + 0.30, y: 1.88, w: 1.55, h: 0.26, fontSize: 12, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addText("Drafts solution", { x: rightX + 0.30, y: 2.16, w: 1.55, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  addArrow(s, rightX + 1.95, 2.05, 0.35, 0.14, C.green);
  s.addText("Executes", { x: rightX + 1.88, y: 1.88, w: 0.50, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.LEFT_ARROW, { x: rightX + 1.95, y: 2.38, w: 0.35, h: 0.10, fill: { color: C.green }, line: { color: C.green } });
  s.addText("Traceback", { x: rightX + 1.88, y: 2.50, w: 0.50, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 2.40, y: 1.70, w: 1.55, h: 1.05, fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.06 });
  s.addText("TOOL", { x: rightX + 2.40, y: 1.85, w: 1.55, h: 0.26, fontSize: 12, fontFace: TITLE_FONT, color: C.white, bold: true, align: "center", margin: 0 });
  s.addText("Python / Oracle", { x: rightX + 2.40, y: 2.14, w: 1.55, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, align: "center", bold: true, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.15, y: 3.14, w: cw - 0.30, h: 0.86, fill: { color: C.white }, line: { color: C.green, width: 0.8 }, rectRadius: 0.05 });
  s.addText("ACCURACY CHANGE  •  Chen et al. 2023b; Gou et al. 2023", { x: rightX + 0.20, y: 3.20, w: cw - 0.40, h: 0.16, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("+7.0%  to  +15.0%", { x: rightX + 0.20, y: 3.36, w: cw - 0.40, h: 0.30, fontSize: 14, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("Deterministic signal. Error localized exactly.", { x: rightX + 0.25, y: 3.68, w: cw - 0.50, h: 0.28, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0, lineSpacingMultiple: 1.05 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.30, w: 8.8, h: 0.56, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.05 });
  s.addText("Core Principle: A frozen model cannot act as an independent verifier of its own output without external grounding.  •  Huang et al. Sec 3.3, Sec 6", { x: 0.7, y: 4.30, w: 8.6, h: 0.56, fontSize: 8.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 2);
}

// ==========================================================================
// SLIDE 3: VARIANT 7B • EXPANDED — Evidence: Why Signal Matters
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Evidence: Why Signal Matters", "One line of code execution beats a paragraph of recursive self-doubt", "VARIANT 7B • EXPANDED");

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.12, w: 8.8, h: 0.96, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.75, y: 1.24, w: 1.80, h: 0.72, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.8 }, rectRadius: 0.05 });
  s.addText("INTRINSIC", { x: 0.75, y: 1.28, w: 1.80, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0, charSpacing: 1 });
  s.addText("-1.3% to -27.5%", { x: 0.75, y: 1.48, w: 1.80, h: 0.28, fontSize: 11.5, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Self-doubt without data", { x: 0.75, y: 1.76, w: 1.80, h: 0.16, fontSize: 6.8, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  s.addText("Intrinsic asks the same frozen model to verify itself. No new facts enter. Prompt says \"Review and find problems\" and the model complies by inventing a flaw even when the draft is correct (Huang Fig. 2, yogurt).", { x: 2.70, y: 1.26, w: 2.05, h: 0.68, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.1 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.95, y: 1.24, w: 1.80, h: 0.72, fill: { color: C.greenLight }, line: { color: C.green, width: 0.8 }, rectRadius: 0.05 });
  s.addText("EXTERNAL", { x: 4.95, y: 1.28, w: 1.80, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0, charSpacing: 1 });
  s.addText("+7.0% to +15.0%", { x: 4.95, y: 1.48, w: 1.80, h: 0.28, fontSize: 11.5, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("Tool gives grounding", { x: 4.95, y: 1.76, w: 1.80, h: 0.16, fontSize: 6.8, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  s.addText("External injects a fact the model did not have: Python traceback, unit test failure, or retrieval hit. Fix is anchored to that evidence (Chen self-debug, Gou CRITIC).", { x: 6.90, y: 1.26, w: 2.35, h: 0.68, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.1 });

  const leftX = 0.6; const rightX = 5.15; const cw = 4.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 2.22, w: cw, h: 1.35, fill: { color: C.white }, line: { color: C.primary, width: 1 }, rectRadius: 0.08 });
  s.addText("CLOSED LOOP: SELF-DOUBT DRIFT", { x: leftX + 0.15, y: 2.32, w: cw - 0.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 0.8 });
  const lSteps = [
    { title: "Draft CoT", desc: "Initial correct\nreasoning" },
    { title: "Prompt: Review", desc: "\"Find flaws\nin step 2\"" },
    { title: "Invented Error", desc: "Hallucinates bug\nunder bias" },
    { title: "Wrong Flip", desc: "Changes to\nincorrect $37.50" },
  ];
  lSteps.forEach((st, i) => {
    const bx = leftX + 0.12 + i * 1.00;
    const isLast = i === 3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 2.56, w: 0.94, h: 0.58, fill: { color: isLast ? C.primaryLight : C.cardBg }, line: { color: isLast ? C.primary : C.cardBorder, width: 0.7 }, rectRadius: 0.04 });
    s.addText(st.title, { x: bx, y: 2.58, w: 0.94, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: isLast ? C.primary : C.slateDark, bold: true, align: "center", margin: 0 });
    s.addText(st.desc, { x: bx, y: 2.78, w: 0.94, h: 0.34, fontSize: 6.2, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0, lineSpacingMultiple: 1.0 });
    if (i < 3) addArrow(s, bx + 0.94, 2.76, 0.06, 0.10, C.primary);
  });
  s.addText("Result: Correct -> Incorrect flips exceed Incorrect -> Correct. Fig. 1 yogurt: $75.00 correct -> $37.50 after self-correction.", { x: leftX + 0.15, y: 3.24, w: cw - 0.30, h: 0.24, fontSize: 6.5, fontFace: BODY_FONT, color: C.primaryDark, italic: true, align: "center", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 2.22, w: cw, h: 1.35, fill: { color: C.white }, line: { color: C.green, width: 1 }, rectRadius: 0.08 });
  s.addText("GROUNDED LOOP: TARGETED TOOL REPAIR", { x: rightX + 0.15, y: 2.32, w: cw - 0.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0, charSpacing: 0.8 });
  const rSteps = [
    { title: "Draft Code", desc: "Initial solution\nwith bug" },
    { title: "Python Run", desc: "Executes in\nsandbox" },
    { title: "Traceback", desc: "ZeroDivisionError\nLine 14" },
    { title: "Targeted Fix", desc: "Modifies only\nfailing logic" },
  ];
  rSteps.forEach((st, i) => {
    const bx = rightX + 0.12 + i * 1.00;
    const isLast = i === 3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 2.56, w: 0.94, h: 0.58, fill: { color: isLast ? C.greenLight : C.cardBg }, line: { color: isLast ? C.green : C.cardBorder, width: 0.7 }, rectRadius: 0.04 });
    s.addText(st.title, { x: bx, y: 2.58, w: 0.94, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: isLast ? C.green : C.slateDark, bold: true, align: "center", margin: 0 });
    s.addText(st.desc, { x: bx, y: 2.78, w: 0.94, h: 0.34, fontSize: 6.2, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0, lineSpacingMultiple: 1.0 });
    if (i < 3) addArrow(s, bx + 0.94, 2.76, 0.06, 0.10, C.green);
  });
  s.addText("Result: Independent verifier isolates exact failure. No guessing. Keep correct answers.", { x: rightX + 0.15, y: 3.24, w: cw - 0.30, h: 0.24, fontSize: 6.5, fontFace: BODY_FONT, color: C.greenDark, italic: true, align: "center", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.70, w: 8.8, h: 1.25, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.70, w: 8.8, h: 0.26, fill: { color: C.slateDark } });
  s.addText("PROPERTY", { x: 0.80, y: 3.70, w: 2.0, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, valign: "middle", margin: 0 });
  s.addText("INTRINSIC SELF-CORRECTION", { x: 2.80, y: 3.70, w: 3.0, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("EXTERNAL TOOL FEEDBACK", { x: 6.00, y: 3.70, w: 3.2, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  const compRows = [
    { prop: "Information Source", intr: "Zero new facts (Same weights)", ext: "New execution result (External state)", c1: C.primary, c2: C.green },
    { prop: "Verification Mechanism", intr: "Prompt compliance (Invents bugs)", ext: "Deterministic interpreter / Oracle", c1: C.primary, c2: C.green },
    { prop: "Empirical Impact", intr: "-1.3% to -27.5% (Degrades)", ext: "+7.0% to +15.0% (Repairs)", c1: C.primary, c2: C.green },
  ];
  compRows.forEach((r, i) => {
    const ry = 4.00 + i * 0.28;
    s.addText(r.prop, { x: 0.80, y: ry, w: 2.0, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.80, y: ry, w: 3.0, h: 0.24, fill: { color: C.primaryLight }, line: { color: C.primaryBorder, width: 0.5 }, rectRadius: 0.03 });
    s.addText(r.intr, { x: 2.80, y: ry, w: 3.0, h: 0.24, fontSize: 7.5, fontFace: BODY_FONT, color: r.c1, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.00, y: ry, w: 3.2, h: 0.24, fill: { color: C.greenLight }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.03 });
    s.addText(r.ext, { x: 6.00, y: ry, w: 3.2, h: 0.24, fontSize: 7.5, fontFace: BODY_FONT, color: r.c2, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  addFooter(s, 3);
}

// ==========================================================================
// SLIDE 4: VARIANT 8A • EXPANDED — Forensic Reported vs Controlled
// Same as v14 V8-A2, with labels fixed: 0 vs negative distinct
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Forensic: Reported vs Controlled", "Paired bars make inflation obvious", "VARIANT 8A • EXPANDED");

  // Left chart — same position/size as v14, but with label fixes
  const chartData = [
    { name: "Reported", labels: ["Oracle", "Compute", "Prompt"], values: [10.5, 4.0, 10.0] },
    { name: "Controlled", labels: ["Oracle", "Compute", "Prompt"], values: [-2.5, -1.5, 0.0] },
  ];
  s.addChart(pres.charts.BAR, chartData, {
    x: 0.6, y: 1.14, w: 4.85, h: 3.25,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 7,
    chartColors: [C.amberDark, C.primary],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slateDark, dataLabelFontSize: 7,
    valAxisMaxVal: 15, valAxisMinVal: -5,
    catAxisLabelColor: C.slateDark, catAxisLabelFontSize: 7,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 7,
    valAxisLineShow: true, valAxisLineColor: C.cardBorder,
    catAxisLineShow: true, catAxisLineColor: C.cardBorder,
    valGridLine: { color: C.mutedLight, size: 0.5, style: "dash" },
    catGridLine: { style: "none" },
    showTitle: false, barGrouping: "clustered", barDir: "bar",
  });

  // Overlay to make 0 vs negative unmistakably distinct (keeps native chart, fixes label readability)
  // Zero flat marker at Prompt (third category) — slate, not crimson
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.70, y: 3.72, w: 0.88, h: 0.18, fill: { color: C.white }, line: { color: C.slateDark, width: 0.7 }, rectRadius: 0.04 });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.74, y: 3.80, w: 0.22, h: 0.02, fill: { color: C.slateDark } });
  s.addShape(pres.shapes.OVAL, { x: 2.83, y: 3.77, w: 0.06, h: 0.06, fill: { color: C.slateDark } });
  s.addText("0.0% flat", { x: 2.98, y: 3.72, w: 0.52, h: 0.18, fontSize: 6.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
  // Small label helpers for negatives — left arrows below chart near negative bars
  s.addShape(pres.shapes.LEFT_ARROW, { x: 1.35, y: 2.22, w: 0.10, h: 0.08, fill: { color: C.primary }, line: { color: C.primary } });
  s.addText("below 0", { x: 0.95, y: 2.30, w: 0.50, h: 0.12, fontSize: 6, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.LEFT_ARROW, { x: 1.65, y: 2.78, w: 0.10, h: 0.08, fill: { color: C.primary }, line: { color: C.primary } });
  s.addText("below 0", { x: 1.25, y: 2.86, w: 0.50, h: 0.12, fontSize: 6, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0 });

  // Right cards — same as v14
  const rx = 5.70; const rw = 3.70;
  const items = [
    { title: "1. Oracle Leakage", pill: "+10.5% to -2.5%", desc: "Shield correct answers, only fix wrong ones.", c: C.primary },
    { title: "2. Compute Gap", pill: "+4.0% to -1.5%", desc: "Debate loses to Self-Consistency at equal cost.", c: C.amberDark },
    { title: "3. Prompt Trick", pill: "+10.0% to 0.0%", desc: "Weak start vs rule rich feedback.", c: C.slateDark },
  ];
  items.forEach((it, i) => {
    const ry = 1.14 + i * 1.12;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: ry, w: rw, h: 1.02, fill: { color: C.white }, line: { color: it.c, width: 0.9 }, rectRadius: 0.06 });
    s.addText(it.title, { x: rx + 0.12, y: ry + 0.08, w: rw - 1.30, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: it.c, bold: true, margin: 0, valign: "middle" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + rw - 1.10, y: ry + 0.08, w: 1.00, h: 0.22, fill: { color: C.cardBg }, line: { color: it.c, width: 0.6 }, rectRadius: 0.04 });
    s.addText(it.pill, { x: rx + rw - 1.10, y: ry + 0.08, w: 1.00, h: 0.22, fontSize: 7, fontFace: BODY_FONT, color: it.c, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(it.desc, { x: rx + 0.12, y: ry + 0.34, w: rw - 0.24, h: 0.58, fontSize: 7.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.1 });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.58, w: 8.8, h: 0.42, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.6 }, rectRadius: 0.04 });
  s.addText("Read the chart: amber collapses to crimson below zero, or to slate flat at zero. No confounder survives a fair test.", { x: 0.7, y: 4.58, w: 8.6, h: 0.42, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 4);
}

const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v17.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log(`Presentation v17 generated: ${outPath} with ${TOTAL} slides`);
}).catch((err) => {
  console.error("Error generating v17:", err);
});
