const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation Variant Deck";
pres.title = "Selected Variants Refinement Deck (v16)";

// Classic Academic Design Tokens
const C = {
  white: "FFFFFF",
  slateDark: "0F172A",
  slate: "1E293B",
  slateLight: "334155",
  muted: "64748B",
  mutedLight: "CBD5E1",
  primary: "800020",          // Academic Crimson / Burgundy
  primaryDark: "5C0017",
  primaryLight: "FFF1F2",     // Soft Crimson Tint
  primaryBorder: "FECDD3",
  amber: "D97706",            // Warm Amber
  amberDark: "B45309",
  amberLight: "FFFBEB",
  green: "166534",            // Forest Green
  greenDark: "14532D",
  greenLight: "F0FDF4",
  cardBg: "F8FAFC",
  cardBorder: "E2E8F0",
  tableHead: "800020",
  tableRow1: "FFF1F2",
  tableRow2: "FFFFFF",
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
  // Variant pill top right
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.4, y: 0.36, w: 2.0, h: 0.32, fill: { color: C.slateDark }, line: { color: C.slateDark, width: 1 }, rectRadius: 0.04 });
  slide.addText(variantPill, { x: 7.4, y: 0.36, w: 2.0, h: 0.32, fontSize: 8, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  // Subtle divider
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 0.96, w: 8.8, h: 0.015, fill: { color: C.cardBorder } });
}

function createSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.white };
  return s;
}

function addBadgeCircle(slide, x, y, text, sz = 0.32, bgColor = C.primary, textColor = C.white) {
  slide.addShape(pres.shapes.OVAL, { x: x, y: y, w: sz, h: sz, fill: { color: bgColor } });
  slide.addText(text, { x: x, y: y, w: sz, h: sz, fontSize: sz > 0.35 ? 11 : 9, fontFace: BODY_FONT, color: textColor, align: "center", valign: "middle", margin: 0, bold: true });
}

function addArrow(slide, x, y, w = 0.30, h = 0.16, color = C.primary) {
  slide.addShape(pres.shapes.RIGHT_ARROW, { x: x, y: y, w: w, h: h, fill: { color: color }, line: { color: color } });
}

function addDownArrow(slide, x, y, w = 0.16, h = 0.12, color = C.primary) {
  slide.addShape(pres.shapes.DOWN_ARROW, { x: x, y: y, w: w, h: h, fill: { color: color }, line: { color: color } });
}

// ==========================================================================
// SLIDE 1: VARIANT 6C • EXPANDED (Refined & Enhanced Representation)
// Topic 2: Prior Frameworks Timeline & Claim vs Reality Overlay
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "Timeline of Claims vs Controlled Reality", "2023 surge in self-correction claims collapses under fair testing", "VARIANT 6C • EXPANDED");

  // Section label top left of timeline
  s.addText("2023 PUBLICATION TIMELINE & REPORTED GAINS", { x: 0.6, y: 1.04, w: 8.8, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, bold: true, charSpacing: 1, margin: 0 });

  const ty = 1.24;
  // Main horizontal timeline line
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ty + 1.16, w: 8.8, h: 0.03, fill: { color: C.slateDark } });

  const frameworks = [
    {
      x: 0.65,
      w: 2.05,
      quarter: "Q1 2023",
      title: "RCI",
      cite: "Kim et al. (NeurIPS '23)",
      mechanism: "Recursive Critic & Patch",
      claimed: "+7.0%",
      confounder: "Oracle Stop Signal",
      controlled: "-2.5%",
      controlledLabel: "Degrades (-2.5%)",
      color: C.primary,
      bg: C.primaryLight,
    },
    {
      x: 2.90,
      w: 2.05,
      quarter: "Q2 2023",
      title: "Reflexion",
      cite: "Shinn et al. (NeurIPS '23)",
      mechanism: "Episodic Trial Memory",
      claimed: "+11.0%",
      confounder: "Multi-Trial Oracle",
      controlled: "-2.5%",
      controlledLabel: "Degrades (-2.5%)",
      color: C.green,
      bg: C.greenLight,
    },
    {
      x: 5.15,
      w: 2.05,
      quarter: "Q3 2023",
      title: "Self-Refine",
      cite: "Madaan et al. (NeurIPS '23)",
      mechanism: "Iterative Feedback Loop",
      claimed: "+10.0%",
      confounder: "Feedback Prompt Bias",
      controlled: "0.0%",
      controlledLabel: "No Gain (0.0% Flat)",
      color: C.amberDark,
      bg: C.amberLight,
    },
    {
      x: 7.40,
      w: 2.00,
      quarter: "Q4 2023",
      title: "Debate",
      cite: "Du et al. (ICLR '24)",
      mechanism: "Multi-Agent Cross Exam",
      claimed: "+4.0%",
      confounder: "Compute Asymmetry",
      controlled: "-1.5%",
      controlledLabel: "Loses to SC (-1.5%)",
      color: C.slate,
      bg: C.cardBg,
    },
  ];

  frameworks.forEach((f) => {
    const ix = f.x;
    const iw = f.w;

    // Timeline node circle & Quarter Tag
    s.addShape(pres.shapes.OVAL, { x: ix + iw / 2 - 0.07, y: ty + 1.11, w: 0.14, h: 0.14, fill: { color: f.color }, line: { color: C.white, width: 1.5 } });
    s.addText(f.quarter, { x: ix, y: ty + 1.20, w: iw, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", bold: true, margin: 0 });

    // ABOVE TIMELINE: Claimed Card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix, y: ty, w: iw, h: 1.04, fill: { color: C.white }, line: { color: f.color, width: 1.1 }, rectRadius: 0.06 });
    // Card Title Header
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix + 0.08, y: ty + 0.07, w: iw - 0.16, h: 0.24, fill: { color: f.bg }, line: { color: f.color, width: 0.5 }, rectRadius: 0.04 });
    s.addText(f.title, { x: ix + 0.08, y: ty + 0.07, w: iw - 0.16, h: 0.24, fontSize: 9, fontFace: BODY_FONT, color: f.color, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(f.cite, { x: ix, y: ty + 0.32, w: iw, h: 0.16, fontSize: 6.8, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });
    // Claimed number
    s.addText(`Claimed ${f.claimed}`, { x: ix, y: ty + 0.49, w: iw, h: 0.22, fontSize: 10.5, fontFace: TITLE_FONT, color: f.color, bold: true, align: "center", margin: 0 });
    s.addText(f.confounder, { x: ix + 0.1, y: ty + 0.74, w: iw - 0.2, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0, bold: true });

    // Connector down to timeline
    s.addShape(pres.shapes.RECTANGLE, { x: ix + iw / 2 - 0.01, y: ty + 1.04, w: 0.02, h: 0.07, fill: { color: f.color } });

    // BELOW TIMELINE: Controlled Reality Card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix, y: ty + 1.38, w: iw, h: 0.72, fill: { color: C.cardBg }, line: { color: f.controlled === "0.0%" ? C.mutedLight : C.primaryBorder, width: 0.9 }, rectRadius: 0.06 });
    s.addText("FAIR CONTROLLED RESULT", { x: ix, y: ty + 1.42, w: iw, h: 0.15, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0, charSpacing: 0.5 });
    s.addText(f.controlled, { x: ix, y: ty + 1.57, w: iw, h: 0.26, fontSize: 11, fontFace: TITLE_FONT, color: f.controlled === "0.0%" ? C.slateDark : C.primary, bold: true, align: "center", margin: 0 });
    s.addText(f.controlledLabel, { x: ix, y: ty + 1.83, w: iw, h: 0.18, fontSize: 6.8, fontFace: BODY_FONT, color: f.controlled === "0.0%" ? C.muted : C.primaryDark, align: "center", bold: true, margin: 0 });
  });

  // BOTTOM PANELS: High Impact Summary & Forensic Comparison
  const bottomY = 3.52;

  // Left card: Macro Metrics (Claimed Average vs Controlled Average)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: bottomY, w: 5.0, h: 1.50, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("MACRO SUMMARY: CLAIMED AVERAGE VS FAIR BASELINE", { x: 0.8, y: bottomY + 0.12, w: 4.6, h: 0.20, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, charSpacing: 0.8 });

  // Reported Average Bar
  s.addText("Reported Average Gain", { x: 0.8, y: bottomY + 0.38, w: 1.8, h: 0.20, fontSize: 8, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.65, y: bottomY + 0.39, w: 2.05, h: 0.20, fill: { color: C.primary }, line: { color: C.primary }, rectRadius: 0.03 });
  s.addText("+8.0% Claimed", { x: 2.70, y: bottomY + 0.39, w: 1.95, h: 0.20, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // Controlled Average Bar
  s.addText("Controlled Baseline Gain", { x: 0.8, y: bottomY + 0.68, w: 1.8, h: 0.20, fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.65, y: bottomY + 0.69, w: 0.70, h: 0.20, fill: { color: C.primaryDark }, line: { color: C.primaryDark }, rectRadius: 0.03 });
  s.addText("-1.6%", { x: 2.65, y: bottomY + 0.69, w: 0.70, h: 0.20, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Degradation under fair evaluation", { x: 3.42, y: bottomY + 0.68, w: 1.8, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });

  // Footnote in left card
  s.addText("Controls applied: removal of oracle stopping labels, equal-compute baselines, and complete initial prompts.", { x: 0.8, y: bottomY + 0.98, w: 4.6, h: 0.38, fontSize: 7, fontFace: BODY_FONT, color: C.muted, margin: 0, lineSpacingMultiple: 1.05 });

  // Right card: Key Insight Callout
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.8, y: bottomY, w: 3.6, h: 1.50, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1.2 }, rectRadius: 0.08 });
  s.addText("KEY TAKEAWAY", { x: 6.0, y: bottomY + 0.12, w: 3.2, h: 0.18, fontSize: 8, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1 });
  s.addText("The literature's apparent 2023 progress was not algorithmic self-correction. It was compounding evaluation confounders.", { x: 6.0, y: bottomY + 0.34, w: 3.2, h: 0.64, fontSize: 9.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, lineSpacingMultiple: 1.15 });
  s.addText("When controlled, every positive gain vanishes across all four paradigms.", { x: 6.0, y: bottomY + 1.02, w: 3.2, h: 0.36, fontSize: 8, fontFace: BODY_FONT, color: C.primaryDark, italic: true, margin: 0 });

  addFooter(s, 1);
}

// ==========================================================================
// SLIDE 2: VARIANT 7A • COMPACT
// Topic 2: Intrinsic vs External Feedback (Closed Loop vs Grounded Loop)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Closed Loop vs Grounded Loop", "Same model, different information: why internal reflection fails but external verification works", "VARIANT 7A • COMPACT");

  const leftX = 0.6;
  const rightX = 5.15;
  const cw = 4.25;
  const ch = 3.00;

  // LEFT: Intrinsic (Closed Loop)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 1.14, w: cw, h: ch, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1.2 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fill: { color: C.primary }, line: { color: C.primary }, rectRadius: 0.04 });
  s.addText("INTRINSIC : Closed Loop (Paper Focus)", { x: leftX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // Center node LLM
  s.addShape(pres.shapes.OVAL, { x: leftX + cw / 2 - 0.55, y: 1.70, w: 1.10, h: 1.10, fill: { color: C.white }, line: { color: C.primary, width: 1.4 } });
  s.addText("LLM", { x: leftX + cw / 2 - 0.55, y: 1.94, w: 1.10, h: 0.28, fontSize: 13, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Frozen Weights", { x: leftX + cw / 2 - 0.55, y: 2.22, w: 1.10, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });

  // Flow nodes surrounding the frozen LLM
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.25, y: 1.75, w: 1.10, h: 0.38, fill: { color: C.white }, line: { color: C.primary, width: 0.8 }, rectRadius: 0.04 });
  s.addText("1. Generate", { x: leftX + 0.25, y: 1.75, w: 1.10, h: 0.38, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + cw - 1.35, y: 1.75, w: 1.10, h: 0.38, fill: { color: C.white }, line: { color: C.primary, width: 0.8 }, rectRadius: 0.04 });
  s.addText("2. Self-Critique", { x: leftX + cw - 1.35, y: 1.75, w: 1.10, h: 0.38, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + cw / 2 - 0.70, y: 2.42, w: 1.40, h: 0.34, fill: { color: C.white }, line: { color: C.primary, width: 0.8 }, rectRadius: 0.04 });
  s.addText("3. Revise Blind", { x: leftX + cw / 2 - 0.70, y: 2.42, w: 1.40, h: 0.34, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });

  // Bottom stats box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.15, y: 2.92, w: cw - 0.30, h: 1.08, fill: { color: C.white }, line: { color: C.primary, width: 0.8 }, rectRadius: 0.05 });
  s.addText("ACCURACY CHANGE", { x: leftX + 0.20, y: 2.98, w: cw - 0.40, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("-1.3%  to  -27.5%", { x: leftX + 0.20, y: 3.16, w: cw - 0.40, h: 0.32, fontSize: 14, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Zero new facts. Shared weights and prompt bias invent errors where none existed.", { x: leftX + 0.25, y: 3.52, w: cw - 0.50, h: 0.38, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0, lineSpacingMultiple: 1.05 });

  // RIGHT: External (Grounded Loop)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 1.14, w: cw, h: ch, fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.04 });
  s.addText("EXTERNAL : Grounded Loop (Tool-Assisted)", { x: rightX + 0.15, y: 1.26, w: cw - 0.30, h: 0.30, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // LLM generator box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.30, y: 1.70, w: 1.55, h: 1.05, fill: { color: C.white }, line: { color: C.green, width: 1.1 }, rectRadius: 0.06 });
  s.addText("LLM", { x: rightX + 0.30, y: 1.88, w: 1.55, h: 0.26, fontSize: 12, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addText("Drafts Code / Solution", { x: rightX + 0.30, y: 2.16, w: 1.55, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });

  // Interaction arrows
  addArrow(s, rightX + 1.95, 2.05, 0.35, 0.14, C.green);
  s.addText("Executes", { x: rightX + 1.88, y: 1.88, w: 0.50, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });

  s.addShape(pres.shapes.LEFT_ARROW, { x: rightX + 1.95, y: 2.38, w: 0.35, h: 0.10, fill: { color: C.green }, line: { color: C.green } });
  s.addText("Traceback", { x: rightX + 1.88, y: 2.50, w: 0.50, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });

  // Tool verifier box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 2.40, y: 1.70, w: 1.55, h: 1.05, fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.06 });
  s.addText("TOOL", { x: rightX + 2.40, y: 1.85, w: 1.55, h: 0.26, fontSize: 12, fontFace: TITLE_FONT, color: C.white, bold: true, align: "center", margin: 0 });
  s.addText("Python / Oracle", { x: rightX + 2.40, y: 2.14, w: 1.55, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, align: "center", bold: true, margin: 0 });

  // Bottom stats box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.15, y: 2.92, w: cw - 0.30, h: 1.08, fill: { color: C.white }, line: { color: C.green, width: 0.8 }, rectRadius: 0.05 });
  s.addText("ACCURACY CHANGE", { x: rightX + 0.20, y: 2.98, w: cw - 0.40, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("+7.0%  to  +15.0%", { x: rightX + 0.20, y: 3.16, w: cw - 0.40, h: 0.32, fontSize: 14, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("Deterministic ground truth. Execution errors provide localized, factual correction signals.", { x: rightX + 0.25, y: 3.52, w: cw - 0.50, h: 0.38, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0, lineSpacingMultiple: 1.05 });

  // Bottom principle bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.30, w: 8.8, h: 0.56, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.05 });
  s.addText("Core Principle: A frozen model cannot act as an independent verifier of its own output without external grounding.", { x: 0.7, y: 4.30, w: 8.6, h: 0.56, fontSize: 9.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 2);
}

// ==========================================================================
// SLIDE 3: VARIANT 7B • EXPANDED
// Topic 2: Intrinsic vs External Feedback (Evidence: Why Signal Matters)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Evidence: Why Signal Matters", "One line of code execution beats a paragraph of recursive self-doubt", "VARIANT 7B • EXPANDED");

  // Top summary row comparing Intrinsic vs External
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.12, w: 8.8, h: 0.96, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });

  // Intrinsic badge left
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.75, y: 1.24, w: 1.80, h: 0.72, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.8 }, rectRadius: 0.05 });
  s.addText("INTRINSIC", { x: 0.75, y: 1.28, w: 1.80, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0, charSpacing: 1 });
  s.addText("-1.3% to -27.5%", { x: 0.75, y: 1.48, w: 1.80, h: 0.28, fontSize: 11.5, fontFace: TITLE_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Self-doubt without data", { x: 0.75, y: 1.76, w: 1.80, h: 0.16, fontSize: 6.8, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });

  s.addText("Intrinsic feedback relies on the same frozen model querying its own weights. Without ground truth, asking 'Review your answer' triggers prompt compliance, causing the model to doubt correct steps.", { x: 2.70, y: 1.26, w: 2.05, h: 0.68, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.1 });

  // External badge right
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.95, y: 1.24, w: 1.80, h: 0.72, fill: { color: C.greenLight }, line: { color: C.green, width: 0.8 }, rectRadius: 0.05 });
  s.addText("EXTERNAL", { x: 4.95, y: 1.28, w: 1.80, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0, charSpacing: 1 });
  s.addText("+7.0% to +15.0%", { x: 4.95, y: 1.48, w: 1.80, h: 0.28, fontSize: 11.5, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("Tool gives grounding", { x: 4.95, y: 1.76, w: 1.80, h: 0.16, fontSize: 6.8, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });

  s.addText("External feedback injects verified ground truth (Python interpreter traceback, unit test execution, or oracle label). The model repairs syntax or logic against deterministic evidence.", { x: 6.90, y: 1.26, w: 2.35, h: 0.68, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.1 });

  // Middle: Two Operational Flow Lanes
  const leftX = 0.6;
  const rightX = 5.15;
  const cw = 4.25;

  // Left Lane: Closed Loop Failure
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 2.22, w: cw, h: 1.35, fill: { color: C.white }, line: { color: C.primary, width: 1 }, rectRadius: 0.08 });
  s.addText("CLOSED LOOP: SELF-DOUBT DRIFT", { x: leftX + 0.15, y: 2.32, w: cw - 0.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 0.8 });

  const lSteps = [
    { title: "Draft CoT", desc: "Initial correct\nreasoning" },
    { title: "Prompt: Review", desc: "\"Find flaws\nin step 2\"" },
    { title: "Invented Error", desc: "Hallucinates bug\nunder bias" },
    { title: "Wrong Flip", desc: "Changes to\nincorrect answer" },
  ];
  lSteps.forEach((st, i) => {
    const bx = leftX + 0.12 + i * 1.00;
    const isLast = i === 3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 2.56, w: 0.94, h: 0.58, fill: { color: isLast ? C.primaryLight : C.cardBg }, line: { color: isLast ? C.primary : C.cardBorder, width: 0.7 }, rectRadius: 0.04 });
    s.addText(st.title, { x: bx, y: 2.58, w: 0.94, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: isLast ? C.primary : C.slateDark, bold: true, align: "center", margin: 0 });
    s.addText(st.desc, { x: bx, y: 2.78, w: 0.94, h: 0.34, fontSize: 6.2, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0, lineSpacingMultiple: 1.0 });
    if (i < 3) addArrow(s, bx + 0.94, 2.76, 0.06, 0.10, C.primary);
  });
  s.addText("Result: Correct answers flip to incorrect (Correct -> Incorrect >> Incorrect -> Correct).", { x: leftX + 0.15, y: 3.24, w: cw - 0.30, h: 0.24, fontSize: 7, fontFace: BODY_FONT, color: C.primaryDark, italic: true, align: "center", margin: 0 });

  // Right Lane: Grounded Loop Success
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
  s.addText("Result: Independent verifier isolates exact failure point without guessing.", { x: rightX + 0.15, y: 3.24, w: cw - 0.30, h: 0.24, fontSize: 7, fontFace: BODY_FONT, color: C.greenDark, italic: true, align: "center", margin: 0 });

  // Bottom Comparison Table
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.70, w: 8.8, h: 1.25, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.70, w: 8.8, h: 0.26, fill: { color: C.slateDark } });
  s.addText("PROPERTY", { x: 0.8, y: 3.70, w: 2.0, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, valign: "middle", margin: 0 });
  s.addText("INTRINSIC SELF-CORRECTION", { x: 2.8, y: 3.70, w: 3.0, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("EXTERNAL TOOL FEEDBACK", { x: 6.0, y: 3.70, w: 3.2, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  const compRows = [
    { prop: "Information Source", intr: "Zero new facts (Same weights)", ext: "New execution results (External state)", c1: C.primary, c2: C.green },
    { prop: "Verification Mechanism", intr: "Prompt compliance (Hallucinates bugs)", ext: "Deterministic interpreter / Oracle", c1: C.primary, c2: C.green },
    { prop: "Empirical Reasoning Impact", intr: "-1.3% to -27.5% (Degrades reasoning)", ext: "+7.0% to +15.0% (Repairs execution)", c1: C.primary, c2: C.green },
  ];
  compRows.forEach((r, i) => {
    const ry = 4.00 + i * 0.28;
    s.addText(r.prop, { x: 0.8, y: ry, w: 2.0, h: 0.26, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.8, y: ry, w: 3.0, h: 0.24, fill: { color: C.primaryLight }, line: { color: C.primaryBorder, width: 0.5 }, rectRadius: 0.03 });
    s.addText(r.intr, { x: 2.8, y: ry, w: 3.0, h: 0.24, fontSize: 7.5, fontFace: BODY_FONT, color: r.c1, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.0, y: ry, w: 3.2, h: 0.24, fill: { color: C.greenLight }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.03 });
    s.addText(r.ext, { x: 6.0, y: ry, w: 3.2, h: 0.24, fontSize: 7.5, fontFace: BODY_FONT, color: r.c2, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  addFooter(s, 3);
}

// ==========================================================================
// SLIDE 4: VARIANT 8A • EXPANDED (Refined with Distinct 0.0% & Negative Labels)
// Topic 2: Flaws in Prior Evaluations (Forensic Reported vs Controlled)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Forensic: Reported Claims vs Controlled Truth", "Audience Forensic: Positive Claims vs Negative Regressions (< 0) vs Zero Gain (0.0% Flat)", "VARIANT 8A • EXPANDED");

  // Left Section: Visual Bar Forensic Matrix
  const chartCardX = 0.6;
  const chartCardW = 5.10;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: chartCardX, y: 1.12, w: chartCardW, h: 3.32, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });

  s.addText("CONFINDER FORENSIC: REPORTED INFLATION VS FAIR CONTROL", { x: chartCardX + 0.15, y: 1.24, w: chartCardW - 0.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, charSpacing: 0.8 });

  // Legend header
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: chartCardX + 1.20, y: 1.48, w: 1.10, h: 0.20, fill: { color: C.amberLight }, line: { color: C.amberDark, width: 0.6 }, rectRadius: 0.03 });
  s.addText("Claimed Gain", { x: chartCardX + 1.20, y: 1.48, w: 1.10, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: C.amberDark, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: chartCardX + 2.40, y: 1.48, w: 1.10, h: 0.20, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.6 }, rectRadius: 0.03 });
  s.addText("Negative (< 0%)", { x: chartCardX + 2.40, y: 1.48, w: 1.10, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: chartCardX + 3.60, y: 1.48, w: 1.10, h: 0.20, fill: { color: C.cardBg }, line: { color: C.slateDark, width: 0.6 }, rectRadius: 0.03 });
  s.addText("Zero Gain (0.0%)", { x: chartCardX + 3.60, y: 1.48, w: 1.10, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });

  const confounderBars = [
    {
      name: "1. Oracle Leakage",
      sub: "RCI / Reflexion",
      reportedVal: "+10.5%",
      reportedWidth: 2.10,
      controlledVal: "-2.5%",
      controlledType: "negative",
      controlledLabel: "-2.5% (Regression)",
      controlledWidth: 0.50,
      delta: "-13.0% collapse",
    },
    {
      name: "2. Compute Gap",
      sub: "Debate vs 1-Shot",
      reportedVal: "+4.0%",
      reportedWidth: 0.80,
      controlledVal: "-1.5%",
      controlledType: "negative",
      controlledLabel: "-1.5% (Regression)",
      controlledWidth: 0.30,
      delta: "-5.5% collapse",
    },
    {
      name: "3. Prompt Distortion",
      sub: "Self-Refine",
      reportedVal: "+10.0%",
      reportedWidth: 2.00,
      controlledVal: "0.0%",
      controlledType: "zero",
      controlledLabel: "0.0% (Flat / No Gain)",
      controlledWidth: 0.04,
      delta: "-10.0% collapse",
    },
  ];

  confounderBars.forEach((cb, i) => {
    const rowY = 1.80 + i * 0.84;

    // Confounder title & sub
    s.addText(cb.name, { x: chartCardX + 0.15, y: rowY, w: 1.40, h: 0.20, fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(cb.sub, { x: chartCardX + 0.15, y: rowY + 0.20, w: 1.40, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0 });
    s.addText(cb.delta, { x: chartCardX + 0.15, y: rowY + 0.38, w: 1.40, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0 });

    // Bar 1: Reported Gain
    const barStartX = chartCardX + 1.60;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barStartX, y: rowY, w: cb.reportedWidth, h: 0.22, fill: { color: C.amberDark }, line: { color: C.amberDark }, rectRadius: 0.03 });
    s.addText(`Claimed ${cb.reportedVal}`, { x: barStartX + cb.reportedWidth + 0.08, y: rowY, w: 1.30, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: C.amberDark, bold: true, margin: 0, valign: "middle" });

    // Bar 2: Controlled Reality (Distinct Handling for 0.0% Flat vs Negative < 0)
    if (cb.controlledType === "negative") {
      // Crimson negative bar
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barStartX, y: rowY + 0.28, w: cb.controlledWidth, h: 0.22, fill: { color: C.primary }, line: { color: C.primary }, rectRadius: 0.03 });
      // Distinct Down Arrow & Label
      s.addShape(pres.shapes.DOWN_ARROW, { x: barStartX + cb.controlledWidth + 0.08, y: rowY + 0.32, w: 0.12, h: 0.14, fill: { color: C.primary }, line: { color: C.primary } });
      s.addText(cb.controlledLabel, { x: barStartX + cb.controlledWidth + 0.24, y: rowY + 0.28, w: 1.60, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });
    } else {
      // Distinct Zero Marker: Neutral Slate Pill (not red, not zero-length bug)
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barStartX, y: rowY + 0.28, w: 0.18, h: 0.22, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.03 });
      s.addText("●", { x: barStartX, y: rowY + 0.28, w: 0.18, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0 });
      s.addText(cb.controlledLabel, { x: barStartX + 0.26, y: rowY + 0.28, w: 1.80, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, valign: "middle" });
    }

    // Divider between rows
    if (i < 2) {
      s.addShape(pres.shapes.RECTANGLE, { x: chartCardX + 0.15, y: rowY + 0.64, w: chartCardW - 0.30, h: 0.01, fill: { color: C.cardBorder } });
    }
  });

  // Right Section: 3 Forensic Explanation Cards
  const rightX = 5.85;
  const rightW = 3.55;

  const items = [
    {
      title: "1. Oracle Leakage",
      tag: "Shielding Effect",
      c: C.primary,
      bg: C.primaryLight,
      desc: "Prior harness alerted model ONLY when initial answer was wrong. Correct answers were locked and protected. When all answers are critiqued, accuracy drops (-2.5%).",
    },
    {
      title: "2. Compute Asymmetry",
      tag: "Budget Parity",
      c: C.amberDark,
      bg: C.amberLight,
      desc: "Debate consumed 3 to 6x compute calls against a 1-shot baseline. Under equal-compute budget, standard Self-Consistency voting wins (-1.5% disadvantage for debate).",
    },
    {
      title: "3. Prompt Distortion",
      tag: "Withheld Rules",
      c: C.slateDark,
      bg: C.cardBg,
      desc: "Initial prompts intentionally omitted format constraints, then re-added them in feedback. When full prompt is given upfront, self-correction gain drops to 0.0% Flat.",
    },
  ];

  items.forEach((it, i) => {
    const ry = 1.12 + i * 1.12;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: ry, w: rightW, h: 1.04, fill: { color: C.white }, line: { color: it.c, width: 1 }, rectRadius: 0.06 });
    // Title
    s.addText(it.title, { x: rightX + 0.12, y: ry + 0.08, w: rightW - 1.30, h: 0.20, fontSize: 8.5, fontFace: BODY_FONT, color: it.c, bold: true, margin: 0 });
    // Badge top right
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + rightW - 1.20, y: ry + 0.08, w: 1.10, h: 0.20, fill: { color: it.bg }, line: { color: it.c, width: 0.5 }, rectRadius: 0.03 });
    s.addText(it.tag, { x: rightX + rightW - 1.20, y: ry + 0.08, w: 1.10, h: 0.20, fontSize: 6.8, fontFace: BODY_FONT, color: it.c, bold: true, align: "center", valign: "middle", margin: 0 });
    // Description
    s.addText(it.desc, { x: rightX + 0.12, y: ry + 0.32, w: rightW - 0.24, h: 0.64, fontSize: 7.2, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.1 });
  });

  // Bottom Takeaway Banner
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.54, w: 8.8, h: 0.48, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1 }, rectRadius: 0.05 });
  s.addText("Audience Takeaway: When evaluation flaws are corrected, claimed double-digit gains vanish. Two confounders cause severe regression (< 0), and prompt repair produces exactly 0.0% gain.", { x: 0.75, y: 4.54, w: 8.5, h: 0.48, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 4);
}

// Write presentation
const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v16.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log(`Presentation v16 successfully generated: ${outPath} with ${TOTAL} slides`);
}).catch((err) => {
  console.error("Error generating presentation:", err);
});
