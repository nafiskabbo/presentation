const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation Variant Deck";
pres.title = "Slides 6-8 Variants: Selection Deck";

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
  crimson: "800020",
  crimsonLight: "FFF1F2",
  cardBg: "F8FAFC",
  cardBorder: "E2E8F0",
  tableHead: "800020",
  tableRow1: "FFF1F2",
  tableRow2: "FFFFFF",
};

const TOTAL = 18;
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
  // variant pill top right
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.6, y: 0.38, w: 1.8, h: 0.30, fill: { color: C.slateDark }, line: { color: C.slateDark, width: 1 }, rectRadius: 0.04 });
  slide.addText(variantPill, { x: 7.6, y: 0.38, w: 1.8, h: 0.30, fontSize: 8, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  // underline
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
// V6-A1: Compact Loop Gallery (4 frameworks as mini circuits)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "Four Claimed Frameworks", "Operational loop at a glance, citation and claimed gain", "VARIANT 6A • COMPACT");

  const frameworks = [
    { name: "RCI", cite: "Kim et al. NeurIPS 23", accent: C.primary, bg: C.primaryLight, loop: ["Draft", "Critique", "Refine"], gain: "+7.0%" },
    { name: "Reflexion", cite: "Shinn et al. NeurIPS 23", accent: C.green, bg: C.greenLight, loop: ["Act", "Reflect", "Retry"], gain: "+11%" },
    { name: "Self-Refine", cite: "Madaan et al. NeurIPS 23", accent: C.amberDark, bg: C.amberLight, loop: ["Generate", "Feedback", "Refine"], gain: "+10%" },
    { name: "Multi-Agent Debate", cite: "Du et al. ICLR 24", accent: C.slate, bg: C.cardBg, loop: ["Propose", "Debate", "Vote"], gain: "+4%" },
  ];

  frameworks.forEach((f, i) => {
    const cx = 0.6 + i * 2.25;
    const cw = 2.05;
    // card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.12, w: cw, h: 3.45, fill: { color: C.white }, line: { color: f.accent, width: 1.1 }, rectRadius: 0.08 });
    // header
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.10, y: 1.22, w: cw - 0.20, h: 0.28, fill: { color: f.bg }, line: { color: f.accent, width: 0.7 }, rectRadius: 0.04 });
    s.addText(f.name, { x: cx + 0.10, y: 1.22, w: cw - 0.20, h: 0.28, fontSize: 10.5, fontFace: BODY_FONT, color: f.accent, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(f.cite, { x: cx, y: 1.52, w: cw, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });
    // mini loop: three nodes vertical with arrows forming cycle
    const lx = cx + 0.22;
    const lw = cw - 0.44;
    // node 1
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: 1.78, w: lw, h: 0.30, fill: { color: C.white }, line: { color: f.accent, width: 0.8 }, rectRadius: 0.04 });
    s.addText(f.loop[0], { x: lx, y: 1.78, w: lw, h: 0.30, fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    addDownArrow(s, cx + cw/2 - 0.08, 2.10, 0.16, 0.10, f.accent);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: 2.22, w: lw, h: 0.30, fill: { color: C.white }, line: { color: f.accent, width: 0.8 }, rectRadius: 0.04 });
    s.addText(f.loop[1], { x: lx, y: 2.22, w: lw, h: 0.30, fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    addDownArrow(s, cx + cw/2 - 0.08, 2.54, 0.16, 0.10, f.accent);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: 2.66, w: lw, h: 0.30, fill: { color: f.bg }, line: { color: f.accent, width: 0.8 }, rectRadius: 0.04 });
    s.addText(f.loop[2], { x: lx, y: 2.66, w: lw, h: 0.30, fontSize: 8.5, fontFace: BODY_FONT, color: f.accent, bold: true, align: "center", valign: "middle", margin: 0 });
    // curved return arrow (right side)
    s.addShape(pres.shapes.RIGHT_ARROW, { x: cx + cw - 0.28, y: 2.22, w: 0.12, h: 0.70, fill: { color: f.accent }, line: { color: f.accent } });
    // gain pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.20, y: 3.14, w: cw - 0.40, h: 0.26, fill: { color: C.white }, line: { color: f.accent, width: 0.6 }, rectRadius: 0.04 });
    s.addText("Claimed " + f.gain, { x: cx + 0.20, y: 3.14, w: cw - 0.40, h: 0.26, fontSize: 8, fontFace: BODY_FONT, color: f.accent, bold: true, align: "center", valign: "middle", margin: 0 });
    // oracle tag
    const oracleText = i === 3 ? "Compute gap" : i === 2 ? "Prompt gap" : "Oracle leak";
    s.addShape(pres.shapes.OVAL, { x: cx + cw/2 - 0.42, y: 3.45, w: 0.84, h: 0.16, fill: { color: C.white }, line: { color: C.mutedLight, width: 0.5 } });
    s.addText(oracleText, { x: cx + cw/2 - 0.42, y: 3.45, w: 0.84, h: 0.16, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.72, w: 8.8, h: 0.32, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.6 }, rectRadius: 0.04 });
  s.addText("All gains assumed self-correction, but each relied on hidden help. Details in next variant.", { x: 0.7, y: 4.72, w: 8.6, h: 0.32, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addNotes("Variant 6A compact: minimal text, loop circuits for each framework, emphasis on claimed gain and hidden confounder tag.");
  addFooter(s, 1);
}

// ==========================================================================
// V6-A2: Expanded Loop Anatomy with Signal
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "Framework Anatomy & Hidden Signal", "What each loop actually needs to work", "VARIANT 6A • EXPANDED");

  const frameworks = [
    { name: "RCI", dot: C.primary, sig: "Oracle tells WHEN wrong", why: "Correct answers never challenged", icon: "◉" },
    { name: "Reflexion", dot: C.green, sig: "Oracle + episodic memory", why: "Only fails are reflected, wins skipped", icon: "◎" },
    { name: "Self-Refine", dot: C.amberDark, sig: "Missing rules injected late", why: "Weak start vs strong feedback", icon: "⬢" },
    { name: "Debate", dot: C.slate, sig: "3 to 6x inference cost", why: "Beats 1 shot, loses to vote at same compute", icon: "⬣" },
  ];

  // Top diagram: 4 columns with signal arrow
  frameworks.forEach((f, i) => {
    const cx = 0.6 + i * 2.25;
    const cw = 2.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.12, w: cw, h: 2.15, fill: { color: C.white }, line: { color: f.dot, width: 1.1 }, rectRadius: 0.08 });
    s.addShape(pres.shapes.OVAL, { x: cx + cw/2 - 0.16, y: 1.22, w: 0.32, h: 0.32, fill: { color: f.dot } });
    s.addText(f.icon, { x: cx + cw/2 - 0.16, y: 1.22, w: 0.32, h: 0.32, fontSize: 10, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0, bold: true });
    s.addText(f.name, { x: cx, y: 1.58, w: cw, h: 0.22, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.12, y: 1.82, w: cw - 0.24, h: 0.42, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.04 });
    s.addText(f.sig, { x: cx + 0.12, y: 1.82, w: cw - 0.24, h: 0.42, fontSize: 7.5, fontFace: BODY_FONT, color: C.slate, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
    s.addText(f.why, { x: cx + 0.08, y: 2.28, w: cw - 0.16, h: 0.75, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0, lineSpacingMultiple: 1.1 });
  });

  // Bottom flow: unified critique loop with warning
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.42, w: 8.8, h: 1.18, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  // flow steps
  const steps = [
    { label: "Prompt\n+ Task", color: C.slateDark },
    { label: "Generate\n(CoT)", color: C.slateDark },
    { label: "Critique\n\"find flaws\"", color: C.amberDark },
    { label: "Revise", color: C.primary },
  ];
  steps.forEach((st, i) => {
    const sx = 0.85 + i * 2.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: sx, y: 3.62, w: 1.65, h: 0.60, fill: { color: C.white }, line: { color: st.color, width: 1 }, rectRadius: 0.06 });
    s.addText(st.label, { x: sx, y: 3.62, w: 1.65, h: 0.60, fontSize: 8.5, fontFace: BODY_FONT, color: st.color, bold: true, align: "center", valign: "middle", margin: 0 });
    if (i < 3) addArrow(s, sx + 1.65, 3.85, 0.32, 0.14, C.muted);
  });
  // loop back arrow
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.15, y: 4.30, w: 1.65, h: 0.18, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.04 });
  s.addText("LOOP max 2 rounds", { x: 7.15, y: 4.30, w: 1.65, h: 0.18, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.LEFT_ARROW, { x: 0.85, y: 4.32, w: 6.2, h: 0.08, fill: { color: C.mutedLight }, line: { color: C.mutedLight } });
  s.addText("Without new information, loop adds noise, not signal. Huang et al. Table 1", { x: 0.85, y: 4.48, w: 6.2, h: 0.14, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });

  addFooter(s, 2);
}

// ==========================================================================
// V6-B1: Compact Comparison Matrix
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "Comparison Matrix", "Mechanism vs signal vs claim in one view", "VARIANT 6B • COMPACT");

  // Table header
  const headerY = 1.14;
  const rowH = 0.68;
  const colX = [0.6, 2.45, 4.65, 6.55, 7.85]; // name, mechanism, signal, gain
  const colW = [1.85, 2.20, 1.90, 1.30, 1.55];
  // header bg
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: headerY, w: 8.8, h: 0.32, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.05 });
  ["FRAMEWORK", "MECHANISM", "HIDDEN SIGNAL", "CLAIMED", "FLAW"].forEach((h, i) => {
    s.addText(h, { x: colX[i], y: headerY, w: colW[i], h: 0.32, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: i === 3 || i === 4 ? "center" : "left", valign: "middle", margin: 0, charSpacing: 0.8 });
  });

  const rows = [
    { name: "RCI", mech: "Recursive critic and improve", sig: "Oracle: fix only if wrong", gain: "+7%", flaw: "Leakage", c: C.primary },
    { name: "Reflexion", mech: "Verbal memory over trials", sig: "Oracle + retry memory", gain: "+11%", flaw: "Leakage", c: C.green },
    { name: "Self-Refine", mech: "Iterative style feedback", sig: "Rules added in feedback", gain: "+10%", flaw: "Prompt", c: C.amberDark },
    { name: "Debate", mech: "Agents debate and vote", sig: "3 to 6x compute", gain: "+4%", flaw: "Compute", c: C.slate },
  ];

  rows.forEach((r, i) => {
    const ry = headerY + 0.36 + i * (rowH + 0.08);
    const bg = i % 2 === 0 ? C.primaryLight : C.white;
    const border = C.cardBorder;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: ry, w: 8.8, h: rowH, fill: { color: bg }, line: { color: border, width: 0.7 }, rectRadius: 0.06 });
    // accent bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ry, w: 0.06, h: rowH, fill: { color: r.c } });
    s.addText(r.name, { x: colX[0] + 0.08, y: ry, w: colW[0] - 0.08, h: rowH, fontSize: 9.5, fontFace: BODY_FONT, color: r.c, bold: true, valign: "middle", margin: 0 });
    s.addText(r.mech, { x: colX[1], y: ry, w: colW[1], h: rowH, fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, valign: "middle", margin: 0 });
    s.addText(r.sig, { x: colX[2], y: ry, w: colW[2], h: rowH, fontSize: 8, fontFace: BODY_FONT, color: C.slate, valign: "middle", margin: 0 });
    s.addText(r.gain, { x: colX[3], y: ry, w: colW[3], h: rowH, fontSize: 9, fontFace: BODY_FONT, color: r.c, bold: true, align: "center", valign: "middle", margin: 0 });
    // flaw pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: colX[4] + 0.10, y: ry + 0.18, w: colW[4] - 0.20, h: 0.32, fill: { color: C.white }, line: { color: r.c, width: 0.7 }, rectRadius: 0.04 });
    s.addText(r.flaw, { x: colX[4] + 0.10, y: ry + 0.18, w: colW[4] - 0.20, h: 0.32, fontSize: 7.5, fontFace: BODY_FONT, color: r.c, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  // bottom diagram: simple 3-step pipeline
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.38, w: 8.8, h: 0.70, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("LOOP", { x: 0.75, y: 4.52, w: 0.60, h: 0.42, fontSize: 8, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.75, y: 4.52, w: 0.60, h: 0.42, fill: { color: C.slateDark }, line: { color: C.slateDark } });
  ["Generate", "Critique", "Revise"].forEach((t, i) => {
    const bx = 1.65 + i * 2.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 4.52, w: 1.85, h: 0.42, fill: { color: C.white }, line: { color: C.slateDark, width: 0.8 }, rectRadius: 0.05 });
    s.addText(t, { x: bx, y: 4.52, w: 1.85, h: 0.42, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    if (i < 2) addArrow(s, bx + 1.85, 4.66, 0.24, 0.14, C.primary);
  });
  s.addText("Huang et al. ICLR 2024 Table 1 controls for each flaw, gains vanish.", { x: 0.6, y: 5.10, w: 8.8, h: 0.14, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });

  addFooter(s, 3);
}

// ==========================================================================
// V6-B2: Expanded Matrix with Gain Bars
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "What Happens After Controls", "Reported vs fair gain side by side", "VARIANT 6B • EXPANDED");

  // Left matrix (compact) + right bar visualization
  // Left: same table but narrower
  const headerY = 1.14;
  const rowH = 0.60;
  const leftW = 5.4;
  // header
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: headerY, w: leftW, h: 0.28, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.04 });
  s.addText("FRAMEWORK :  CLAIMED vs CONTROLLED", { x: 0.7, y: headerY, w: leftW - 0.2, h: 0.28, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, valign: "middle", margin: 0, charSpacing: 0.8 });

  const rows = [
    { name: "RCI", reported: 7, controlled: -2.5, c: C.primary },
    { name: "Reflexion", reported: 11, controlled: -2.5, c: C.green },
    { name: "Self-Refine", reported: 10, controlled: 0, c: C.amberDark },
    { name: "Debate", reported: 4, controlled: -1.5, c: C.slate },
  ];

  rows.forEach((r, i) => {
    const ry = headerY + 0.32 + i * (rowH + 0.08);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: ry, w: leftW, h: rowH, fill: { color: i % 2 === 0 ? C.primaryLight : C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.05 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ry, w: 0.05, h: rowH, fill: { color: r.c } });
    s.addText(r.name, { x: 0.72, y: ry, w: 1.15, h: rowH, fontSize: 9, fontFace: BODY_FONT, color: r.c, bold: true, valign: "middle", margin: 0 });
    // bar area
    const barX = 1.95;
    const barW = 3.85;
    const scale = 15; // max
    // reported bar (positive)
    const repW = Math.max(0, (r.reported / scale) * barW);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barX, y: ry + 0.10, w: repW, h: 0.14, fill: { color: r.c }, line: { color: r.c }, rectRadius: 0.03 });
    s.addText("+" + r.reported + "%", { x: barX + repW + 0.06, y: ry + 0.08, w: 0.70, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: r.c, bold: true, margin: 0, valign: "middle" });
    // controlled bar (could be negative)
    const ctrlW = Math.abs(r.controlled / scale) * barW;
    const ctrlX = r.controlled < 0 ? barX - ctrlW + 1.6 : barX;
    // Instead draw thin line for controlled at zero crossing
    // Draw axis line
    s.addShape(pres.shapes.RECTANGLE, { x: barX + (8/scale)*barW, y: ry + 0.28, w: 0.015, h: 0.18, fill: { color: C.mutedLight } });
    // controlled value as pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barX, y: ry + 0.30, w: 1.00, h: 0.16, fill: { color: C.white }, line: { color: C.muted, width: 0.5 }, rectRadius: 0.03 });
    s.addText((r.controlled > 0 ? "+" : "") + r.controlled + "% fair", { x: barX, y: ry + 0.30, w: 1.00, h: 0.16, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", margin: 0 });
  });

  // Right side: small vertical chart alternative
  const rx = 6.25;
  const rw = 3.15;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: headerY, w: rw, h: 2.78, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("Visual delta", { x: rx + 0.15, y: headerY + 0.08, w: rw - 0.30, h: 0.22, fontSize: 9.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  s.addText("Reported inflates, controlled collapses to zero or negative. No intrinsic win.", { x: rx + 0.15, y: headerY + 0.30, w: rw - 0.30, h: 0.42, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  // inline horizontal bars for controlled vs reported
  const chartData = [
    { label: "Reported avg", val: 8.0, color: C.primary },
    { label: "Controlled avg", val: -1.6, color: C.green },
  ];
  chartData.forEach((d, i) => {
    const by = headerY + 0.85 + i * 0.55;
    s.addText(d.label, { x: rx + 0.15, y: by, w: 1.35, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: C.slate, bold: true, margin: 0, valign: "middle" });
    const bx = rx + 1.55;
    const bw = 1.30;
    const maxV = 10;
    const w = Math.abs(d.val / maxV) * bw;
    const cx = d.val < 0 ? bx + bw - w : bx;
    s.addShape(pres.shapes.RECTANGLE, { x: bx + bw, y: by + 0.04, w: 0.01, h: 0.14, fill: { color: C.mutedLight } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: by + 0.04, w: w, h: 0.14, fill: { color: d.color }, line: { color: d.color }, rectRadius: 0.03 });
    s.addText((d.val > 0 ? "+" : "") + d.val + "%", { x: bx + bw + 0.08, y: by, w: 0.40, h: 0.22, fontSize: 7, fontFace: BODY_FONT, color: d.color, bold: true, valign: "middle", margin: 0 });
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + 0.15, y: headerY + 2.05, w: rw - 0.30, h: 0.55, fill: { color: C.white }, line: { color: C.primary, width: 0.7 }, rectRadius: 0.05 });
  s.addText("Takeaway: When leakage, compute, and prompt are fixed, self-correction does not help.", { x: rx + 0.20, y: headerY + 2.05, w: rw - 0.40, h: 0.55, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, valign: "middle", margin: 0, align: "center" });

  // bottom loop mini
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.15, w: 8.8, h: 0.75, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.7 }, rectRadius: 0.06 });
  s.addText("Bottom line", { x: 0.75, y: 4.22, w: 1.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1 });
  s.addText("Four frameworks share one loop pattern. Remove hidden help and the loop adds bias toward hallucinated fixes.", { x: 0.75, y: 4.40, w: 8.5, h: 0.42, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, margin: 0, valign: "middle" });

  addFooter(s, 4);
}

// ==========================================================================
// V6-C1: Timeline Lanes (Compact)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "Timeline of Claims", "2023 surge, same hidden helpers", "VARIANT 6C • COMPACT");

  // Timeline axis
  const ty = 1.45;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ty + 1.65, w: 8.8, h: 0.04, fill: { color: C.slateDark } });
  // ticks
  ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"].forEach((q, i) => {
    const tx = 0.6 + i * 2.20;
    s.addShape(pres.shapes.OVAL, { x: tx + 0.95, y: ty + 1.60, w: 0.14, h: 0.14, fill: { color: C.slateDark } });
    s.addText(q, { x: tx, y: ty + 1.78, w: 2.05, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  });

  const items = [
    { x: 0.75, title: "RCI", cite: "Kim et al.", gain: "+7%", color: C.primary, desc: "Recursive\ncritic" },
    { x: 2.95, title: "Reflexion", cite: "Shinn et al.", gain: "+11%", color: C.green, desc: "Verbal\nreinforcement" },
    { x: 5.15, title: "Self-Refine", cite: "Madaan et al.", gain: "+10%", color: C.amberDark, desc: "Feedback\nrefine" },
    { x: 7.35, title: "Debate", cite: "Du et al.", gain: "+4%", color: C.slate, desc: "Multi-agent\ndebate" },
  ];

  items.forEach((it) => {
    const ix = it.x;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix, y: ty, w: 1.85, h: 1.45, fill: { color: C.white }, line: { color: it.color, width: 1.1 }, rectRadius: 0.08 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix + 0.10, y: ty + 0.10, w: 1.65, h: 0.26, fill: { color: it.color === C.primary ? C.primaryLight : it.color === C.green ? C.greenLight : it.color === C.amberDark ? C.amberLight : C.cardBg }, line: { color: it.color, width: 0.6 }, rectRadius: 0.04 });
    s.addText(it.title, { x: ix + 0.10, y: ty + 0.10, w: 1.65, h: 0.26, fontSize: 9, fontFace: BODY_FONT, color: it.color, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(it.cite, { x: ix, y: ty + 0.40, w: 1.85, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });
    s.addText(it.desc, { x: ix, y: ty + 0.60, w: 1.85, h: 0.52, fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix + 0.30, y: ty + 1.16, w: 1.25, h: 0.22, fill: { color: C.white }, line: { color: it.color, width: 0.6 }, rectRadius: 0.04 });
    s.addText(it.gain + " claimed", { x: ix + 0.30, y: ty + 1.16, w: 1.25, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: it.color, bold: true, align: "center", valign: "middle", margin: 0 });
    // connector to timeline
    s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.925 - 0.01, y: ty + 1.45, w: 0.02, h: 0.20, fill: { color: it.color } });
  });

  // Bottom insight: 3 confounder icons
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.55, w: 8.8, h: 1.35, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("WHAT THE TIMELINE HIDES", { x: 0.75, y: 3.68, w: 8.5, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1 });
  const hides = [
    { icon: "◉", title: "Oracle leakage", desc: "Only wrong answers\nare critiqued" , c: C.primary },
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

  addFooter(s, 5);
}

// ==========================================================================
// V6-C2: Timeline with Confounder Overlay (Expanded)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Prior Frameworks", "Claim vs Reality Overlay", "Same timeline, controlled results collapse", "VARIANT 6C • EXPANDED");

  // Same timeline but with second row showing controlled
  const ty = 1.18;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: ty + 1.15, w: 8.8, h: 0.04, fill: { color: C.slateDark } });
  const items = [
    { x: 0.75, title: "RCI", claimed: 7, controlled: -2.5, color: C.primary },
    { x: 2.95, title: "Reflexion", claimed: 11, controlled: -2.5, color: C.green },
    { x: 5.15, title: "Self-Refine", claimed: 10, controlled: 0, color: C.amberDark },
    { x: 7.35, title: "Debate", claimed: 4, controlled: -1.5, color: C.slate },
  ];
  items.forEach((it) => {
    const ix = it.x;
    // claimed bubble
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix, y: ty, w: 1.85, h: 1.05, fill: { color: C.white }, line: { color: it.color, width: 1 }, rectRadius: 0.06 });
    s.addText(it.title, { x: ix, y: ty + 0.10, w: 1.85, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: it.color, bold: true, align: "center", margin: 0 });
    s.addText("Claimed +" + it.claimed + "%", { x: ix, y: ty + 0.32, w: 1.85, h: 0.22, fontSize: 10, fontFace: TITLE_FONT, color: it.color, bold: true, align: "center", margin: 0 });
    s.addText("with hidden help", { x: ix, y: ty + 0.54, w: 1.85, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: ix + 0.925 - 0.01, y: ty + 1.05, w: 0.02, h: 0.14, fill: { color: it.color } });
    s.addShape(pres.shapes.OVAL, { x: ix + 0.925 - 0.06, y: ty + 1.13, w: 0.12, h: 0.12, fill: { color: it.color } });
    // controlled bubble below axis
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ix, y: ty + 1.30, w: 1.85, h: 0.72, fill: { color: C.cardBg }, line: { color: C.mutedLight, width: 0.7 }, rectRadius: 0.06 });
    s.addText("Controlled", { x: ix, y: ty + 1.34, w: 1.85, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
    s.addText((it.controlled > 0 ? "+" : "") + it.controlled + "%", { x: ix, y: ty + 1.52, w: 1.85, h: 0.24, fontSize: 10, fontFace: TITLE_FONT, color: it.controlled <= 0 ? C.crimson : C.green, bold: true, align: "center", margin: 0 });
    s.addText(it.controlled <= 0 ? "no gain" : "flat", { x: ix, y: ty + 1.74, w: 1.85, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  });

  // Bottom waterfall-ish collapsed gain chart
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.42, w: 5.20, h: 1.60, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("Average inflated gain vs fair baseline", { x: 0.75, y: 3.52, w: 4.9, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
  // simple two-bar comparison
  const barX = 0.85;
  const barW = 4.90;
  // reported avg +8.0 width
  s.addText("Reported", { x: barX, y: 3.82, w: 1.20, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barX + 1.20, y: 3.84, w: 2.60, h: 0.18, fill: { color: C.primary }, line: { color: C.primary }, rectRadius: 0.03 });
  s.addText("+8.0%", { x: barX + 3.90, y: 3.82, w: 0.60, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });
  // controlled avg -1.6
  s.addText("Controlled", { x: barX, y: 4.18, w: 1.20, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.slate, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barX + 1.20, y: 4.20, w: 0.42, h: 0.18, fill: { color: C.slate }, line: { color: C.slate }, rectRadius: 0.03 });
  s.addText("-1.6%", { x: barX + 1.68, y: 4.18, w: 0.60, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: barX + 1.20 + 1.30, y: 3.78, w: 0.015, h: 0.70, fill: { color: C.mutedLight } });
  s.addText("0%", { x: barX + 1.20 + 1.30 - 0.10, y: 3.62, w: 0.30, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });

  // Right card: takeaway
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.05, y: 3.42, w: 3.35, h: 1.60, fill: { color: C.primaryLight }, line: { color: C.primary, width: 1 }, rectRadius: 0.08 });
  s.addText("INSIGHT", { x: 6.20, y: 3.54, w: 3.05, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1 });
  s.addText("The story is not progress over time. It is inflation over time. Fix the flaws and the curve flattens.", { x: 6.20, y: 3.74, w: 3.05, h: 0.85, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("Huang et al. Table 1", { x: 6.20, y: 4.68, w: 3.05, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0 });

  addFooter(s, 6);
}

// ==========================================================================
// V7-A1: Closed vs Open Loop (Compact)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Closed Loop vs Grounded Loop", "Same model, different information", "VARIANT 7A • COMPACT");

  const leftX = 0.6; const rightX = 5.15; const cw = 4.25; const ch = 2.95;

  // LEFT: Intrinsic
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 1.12, w: cw, h: ch, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.2 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.15, y: 1.22, w: cw - 0.30, h: 0.28, fill: { color: C.crimson }, line: { color: C.crimson }, rectRadius: 0.04 });
  s.addText("INTRINSIC  •  Closed Loop", { x: leftX + 0.15, y: 1.22, w: cw - 0.30, h: 0.28, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  // diagram: circle with model at center and loop arrow
  s.addShape(pres.shapes.OVAL, { x: leftX + cw/2 - 0.55, y: 1.62, w: 1.10, h: 1.10, fill: { color: C.white }, line: { color: C.crimson, width: 1.2 } });
  s.addText("LLM", { x: leftX + cw/2 - 0.55, y: 1.88, w: 1.10, h: 0.28, fontSize: 12, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("frozen", { x: leftX + cw/2 - 0.55, y: 2.14, w: 1.10, h: 0.20, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  // loop arrows around
  s.addShape(pres.shapes.OVAL, { x: leftX + 0.35, y: 1.62, w: 3.55, h: 1.10, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.2, dashType: "dash" } });
  // small labels
  s.addText("Generate", { x: leftX + 0.35, y: 1.52, w: 1.00, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("Critique self", { x: leftX + cw - 1.35, y: 1.52, w: 1.00, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("Revise blind", { x: leftX + cw/2 - 0.50, y: 2.80, w: 1.00, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  // bottom stats
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.15, y: 3.05, w: cw - 0.30, h: 0.72, fill: { color: C.white }, line: { color: C.crimson, width: 0.7 }, rectRadius: 0.05 });
  s.addText("Accuracy change", { x: leftX + 0.20, y: 3.10, w: cw - 0.40, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("-1.3%  to  -27.5%", { x: leftX + 0.20, y: 3.28, w: cw - 0.40, h: 0.28, fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("No new facts, bias to invent flaws", { x: leftX + 0.20, y: 3.56, w: cw - 0.40, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });

  // RIGHT: External
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 1.12, w: cw, h: ch, fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.08 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.15, y: 1.22, w: cw - 0.30, h: 0.28, fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.04 });
  s.addText("EXTERNAL  •  Grounded Loop", { x: rightX + 0.15, y: 1.22, w: cw - 0.30, h: 0.28, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  // diagram: model + tool
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.35, y: 1.62, w: 1.55, h: 1.10, fill: { color: C.white }, line: { color: C.green, width: 1.2 }, rectRadius: 0.06 });
  s.addText("LLM", { x: rightX + 0.35, y: 1.88, w: 1.55, h: 0.28, fontSize: 11, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addText("generator", { x: rightX + 0.35, y: 2.12, w: 1.55, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
  addArrow(s, rightX + 1.95, 2.10, 0.35, 0.14, C.green);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 2.35, y: 1.62, w: 1.55, h: 1.10, fill: { color: C.green }, line: { color: C.green }, rectRadius: 0.06 });
  s.addText("TOOL", { x: rightX + 2.35, y: 1.84, w: 1.55, h: 0.28, fontSize: 11, fontFace: TITLE_FONT, color: C.white, bold: true, align: "center", margin: 0 });
  s.addText("Python / Oracle", { x: rightX + 2.35, y: 2.12, w: 1.55, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.white, align: "center", margin: 0 });
  s.addText("executes", { x: rightX + 1.88, y: 1.92, w: 0.50, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.LEFT_ARROW, { x: rightX + 1.95, y: 2.35, w: 0.35, h: 0.10, fill: { color: C.green }, line: { color: C.green } });
  s.addText("traceback", { x: rightX + 1.88, y: 2.48, w: 0.50, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  // bottom stats
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.15, y: 3.05, w: cw - 0.30, h: 0.72, fill: { color: C.white }, line: { color: C.green, width: 0.7 }, rectRadius: 0.05 });
  s.addText("Accuracy change", { x: rightX + 0.20, y: 3.10, w: cw - 0.40, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("+7%  to  +15%", { x: rightX + 0.20, y: 3.28, w: cw - 0.40, h: 0.28, fontSize: 13, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("Deterministic signal, exact error", { x: rightX + 0.20, y: 3.56, w: cw - 0.40, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", italic: true, margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.28, w: 8.8, h: 0.56, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.05 });
  s.addText("Principle: A frozen model cannot verify its own output. Grounding is required.", { x: 0.7, y: 4.28, w: 8.6, h: 0.56, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 7);
}

// ==========================================================================
// V7-A2: Expanded Pipeline with Metrics
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Why One Loop Fails, One Helps", "Signal source determines outcome", "VARIANT 7A • EXPANDED");

  // Top: two flowcharts detailed
  const leftX = 0.6; const rightX = 5.15; const cw = 4.25;

  // Left flow
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 1.12, w: cw, h: 2.05, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1 }, rectRadius: 0.08 });
  s.addText("INTRINSIC FLOW", { x: leftX + 0.15, y: 1.20, w: cw - 0.30, h: 0.20, fontSize: 7.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1 });
  const lSteps = ["Q + CoT", "Draft", "Self critique", "New answer"];
  lSteps.forEach((t, i) => {
    const bx = leftX + 0.15 + i * 1.00;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 1.55, w: 0.88, h: 0.52, fill: { color: C.white }, line: { color: C.crimson, width: 0.8 }, rectRadius: 0.05 });
    s.addText(t, { x: bx, y: 1.55, w: 0.88, h: 0.52, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    if (i < 3) addArrow(s, bx + 0.88, 1.75, 0.12, 0.12, C.crimson);
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.15, y: 2.28, w: cw - 0.30, h: 0.72, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.05 });
  s.addText("• No truth signal  • Shares weights  • Compliance bias to invent error", { x: leftX + 0.20, y: 2.28, w: cw - 0.40, h: 0.72, fontSize: 7.5, fontFace: BODY_FONT, color: C.crimson, margin: 0, lineSpacingMultiple: 1.1, valign: "middle" });

  // Right flow
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 1.12, w: cw, h: 2.05, fill: { color: C.greenLight }, line: { color: C.green, width: 1 }, rectRadius: 0.08 });
  s.addText("EXTERNAL FLOW", { x: rightX + 0.15, y: 1.20, w: cw - 0.30, h: 0.20, fontSize: 7.5, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0, charSpacing: 1 });
  const rSteps = ["Q + CoT", "Draft", "Tool check", "Grounded fix"];
  rSteps.forEach((t, i) => {
    const bx = rightX + 0.15 + i * 1.00;
    const col = i === 2 ? C.green : C.greenDark;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 1.55, w: 0.88, h: 0.52, fill: { color: i === 2 ? C.green : C.white }, line: { color: col, width: 0.8 }, rectRadius: 0.05 });
    s.addText(t, { x: bx, y: 1.55, w: 0.88, h: 0.52, fontSize: 7.5, fontFace: BODY_FONT, color: i === 2 ? C.white : C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    if (i < 3) addArrow(s, bx + 0.88, 1.75, 0.12, 0.12, C.green);
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.15, y: 2.28, w: cw - 0.30, h: 0.72, fill: { color: C.white }, line: { color: C.cardBorder, width: 0.6 }, rectRadius: 0.05 });
  s.addText("• Python traceback  • Oracle label  • Exact localization", { x: rightX + 0.20, y: 2.28, w: cw - 0.40, h: 0.72, fontSize: 7.5, fontFace: BODY_FONT, color: C.green, margin: 0, lineSpacingMultiple: 1.1, valign: "middle" });

  // Bottom comparison table
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.35, w: 8.8, h: 1.45, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  // header
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.35, w: 8.8, h: 0.30, fill: { color: C.slateDark } });
  s.addText("PROPERTY", { x: 0.75, y: 3.35, w: 2.00, h: 0.30, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, valign: "middle", margin: 0 });
  s.addText("INTRINSIC", { x: 2.80, y: 3.35, w: 2.90, h: 0.30, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("EXTERNAL", { x: 5.80, y: 3.35, w: 2.90, h: 0.30, fontSize: 7.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  const compRows = [
    { prop: "Information", intr: "Zero new facts", ext: "New execution result", c1: C.crimson, c2: C.green },
    { prop: "Verifier", intr: "Same LLM, same bias", ext: "Independent tool", c1: C.crimson, c2: C.green },
    { prop: "Result", intr: "-1.3% to -27.5%", ext: "+7% to +15%", c1: C.crimson, c2: C.green },
  ];
  compRows.forEach((r, i) => {
    const ry = 3.70 + i * 0.34;
    s.addText(r.prop, { x: 0.75, y: ry, w: 2.00, h: 0.28, fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, bold: true, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.80, y: ry, w: 2.90, h: 0.28, fill: { color: C.crimsonLight }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04 });
    s.addText(r.intr, { x: 2.80, y: ry, w: 2.90, h: 0.28, fontSize: 8, fontFace: BODY_FONT, color: r.c1, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.80, y: ry, w: 2.90, h: 0.28, fill: { color: C.greenLight }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04 });
    s.addText(r.ext, { x: 5.80, y: ry, w: 2.90, h: 0.28, fontSize: 8, fontFace: BODY_FONT, color: r.c2, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  addFooter(s, 8);
}

// ==========================================================================
// V7-B1: Verdict Cards (Compact)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Two Verdicts, One Principle", "Outcome is determined by signal, not effort", "VARIANT 7B • COMPACT");

  // Two large verdict cards
  const leftX = 0.6; const rightX = 5.15; const cw = 4.25;

  // Left
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 1.12, w: cw, h: 3.30, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.2 }, rectRadius: 0.10 });
  s.addShape(pres.shapes.OVAL, { x: leftX + cw/2 - 0.28, y: 1.28, w: 0.56, h: 0.56, fill: { color: C.crimson } });
  s.addText("✕", { x: leftX + cw/2 - 0.28, y: 1.28, w: 0.56, h: 0.56, fontSize: 18, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("INTRINSIC", { x: leftX, y: 1.92, w: cw, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", margin: 0, charSpacing: 1.5 });
  s.addText("DOES NOT HELP", { x: leftX, y: 2.14, w: cw, h: 0.32, fontSize: 18, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("GSM8K, CSQA, HotpotQA\nGPT-3.5, GPT-4, Turbo, Llama-2", { x: leftX + 0.25, y: 2.55, w: cw - 0.50, h: 0.55, fontSize: 8.5, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.35, y: 3.18, w: cw - 0.70, h: 0.52, fill: { color: C.white }, line: { color: C.crimson, width: 0.8 }, rectRadius: 0.05 });
  s.addText("Typical drop", { x: leftX + 0.35, y: 3.20, w: cw - 0.70, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("-4% to -27%", { x: leftX + 0.35, y: 3.38, w: cw - 0.70, h: 0.24, fontSize: 11, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });

  // Right
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 1.12, w: cw, h: 3.30, fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.10 });
  s.addShape(pres.shapes.OVAL, { x: rightX + cw/2 - 0.28, y: 1.28, w: 0.56, h: 0.56, fill: { color: C.green } });
  s.addText("✓", { x: rightX + cw/2 - 0.28, y: 1.28, w: 0.56, h: 0.56, fontSize: 18, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("EXTERNAL / TOOL", { x: rightX, y: 1.92, w: cw, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0, charSpacing: 1.5 });
  s.addText("DOES HELP", { x: rightX, y: 2.14, w: cw, h: 0.32, fontSize: 18, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("Code execution, oracle labels\nhuman feedback, retrieval", { x: rightX + 0.25, y: 2.55, w: cw - 0.50, h: 0.55, fontSize: 8.5, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.35, y: 3.18, w: cw - 0.70, h: 0.52, fill: { color: C.white }, line: { color: C.green, width: 0.8 }, rectRadius: 0.05 });
  s.addText("Typical lift", { x: rightX + 0.35, y: 3.20, w: cw - 0.70, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, bold: true, align: "center", margin: 0 });
  s.addText("+7% to +15%", { x: rightX + 0.35, y: 3.38, w: cw - 0.70, h: 0.24, fontSize: 11, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.58, w: 8.8, h: 0.42, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.05 });
  s.addText("Paper scope is intrinsic only. External help is effective but answers a different question.", { x: 0.7, y: 4.58, w: 8.6, h: 0.42, fontSize: 8.5, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0, bold: true });

  addFooter(s, 9);
}

// ==========================================================================
// V7-B2: Expanded Verdict + Flow
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Evidence: Why Signal Matters", "One line of code beats a paragraph of self doubt", "VARIANT 7B • EXPANDED");

  // Top verdict compact row
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.12, w: 8.8, h: 0.95, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  // intrinsic badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.75, y: 1.28, w: 1.65, h: 0.65, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.8 }, rectRadius: 0.05 });
  s.addText("INTRINSIC", { x: 0.75, y: 1.32, w: 1.65, h: 0.18, fontSize: 8, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("-1.3% to -27.5%", { x: 0.75, y: 1.50, w: 1.65, h: 0.28, fontSize: 11, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0 });
  s.addText("Self doubt without data", { x: 2.55, y: 1.38, w: 2.30, h: 0.45, fontSize: 8.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "middle" });
  // external
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.05, y: 1.28, w: 1.65, h: 0.65, fill: { color: C.greenLight }, line: { color: C.green, width: 0.8 }, rectRadius: 0.05 });
  s.addText("EXTERNAL", { x: 5.05, y: 1.32, w: 1.65, h: 0.18, fontSize: 8, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("+7% to +15%", { x: 5.05, y: 1.50, w: 1.65, h: 0.28, fontSize: 11, fontFace: TITLE_FONT, color: C.green, bold: true, align: "center", margin: 0 });
  s.addText("Tool gives grounding", { x: 6.85, y: 1.38, w: 2.15, h: 0.45, fontSize: 8.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "middle" });

  // Middle: two flow lanes with signal illustration
  const leftX = 0.6; const rightX = 5.15; const cw = 4.25;
  // left lane
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 2.22, w: cw, h: 1.35, fill: { color: C.white }, line: { color: C.crimson, width: 1 }, rectRadius: 0.08 });
  s.addText("Closed loop", { x: leftX + 0.15, y: 2.32, w: cw - 0.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1 });
  // mini flow boxes
  ["Draft", "Ask: find flaws", "Invented bug", "Wrong flip"].forEach((t, i) => {
    const bx = leftX + 0.15 + i * 1.02;
    const isLast = i === 3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 2.58, w: 0.92, h: 0.42, fill: { color: isLast ? C.crimsonLight : C.white }, line: { color: C.crimson, width: 0.7 }, rectRadius: 0.04 });
    s.addText(t, { x: bx, y: 2.58, w: 0.92, h: 0.42, fontSize: 7, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    if (i < 3) addArrow(s, bx + 0.92, 2.73, 0.10, 0.12, C.crimson);
  });
  s.addText("Model obeys prompt, hallucinates error where none exists.", { x: leftX + 0.15, y: 3.12, w: cw - 0.30, h: 0.28, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });

  // right lane
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 2.22, w: cw, h: 1.35, fill: { color: C.white }, line: { color: C.green, width: 1 }, rectRadius: 0.08 });
  s.addText("Grounded loop", { x: rightX + 0.15, y: 2.32, w: cw - 0.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0, charSpacing: 1 });
  ["Draft", "Run code", "Traceback", "Precise fix"].forEach((t, i) => {
    const bx = rightX + 0.15 + i * 1.02;
    const isTool = i === 1 || i === 2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: 2.58, w: 0.92, h: 0.42, fill: { color: isTool ? C.green : C.white }, line: { color: C.green, width: 0.7 }, rectRadius: 0.04 });
    s.addText(t, { x: bx, y: 2.58, w: 0.92, h: 0.42, fontSize: 7, fontFace: BODY_FONT, color: isTool ? C.white : C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    if (i < 3) addArrow(s, bx + 0.92, 2.73, 0.10, 0.12, C.green);
  });
  s.addText("Tool returns exact line and error type. Fix is surgical.", { x: rightX + 0.15, y: 3.12, w: cw - 0.30, h: 0.28, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });

  // bottom example micro case
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.75, w: 8.8, h: 0.85, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.06 });
  s.addShape(pres.shapes.OVAL, { x: 0.75, y: 3.88, w: 0.22, h: 0.22, fill: { color: C.primary } });
  s.addText("i", { x: 0.75, y: 3.88, w: 0.22, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Example distinction: Yogurt $75 correct -> intrinsic flips to $150. With Python, 60/4*5 is checked deterministically and $75 is kept.", { x: 1.05, y: 3.82, w: 8.15, h: 0.42, fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, valign: "middle" });
  s.addText("Figure 2 in paper. Huang et al. ICLR 2024", { x: 1.05, y: 4.28, w: 8.15, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0 });

  addFooter(s, 10);
}

// ==========================================================================
// V7-C1: Mirror vs Judge Metaphor (Compact)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Mirror vs Judge", "Self reflection or outside verification", "VARIANT 7C • COMPACT");

  const leftX = 0.6; const rightX = 5.15; const cw = 4.25;

  // Left mirror
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 1.12, w: cw, h: 3.35, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.2 }, rectRadius: 0.10 });
  s.addShape(pres.shapes.OVAL, { x: leftX + cw/2 - 0.42, y: 1.28, w: 0.84, h: 0.84, fill: { color: C.white }, line: { color: C.crimson, width: 1 } });
  s.addText("◐", { x: leftX + cw/2 - 0.42, y: 1.28, w: 0.84, h: 0.84, fontSize: 28, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", margin: 0 });
  s.addText("MIRROR", { x: leftX, y: 2.20, w: cw, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", margin: 0, charSpacing: 1.5 });
  s.addText("Ask a model to judge itself", { x: leftX, y: 2.42, w: cw, h: 0.22, fontSize: 11, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addText("Same eyes, same blind spot.\nWill agree with itself or\ninvent a flaw to comply.", { x: leftX + 0.25, y: 2.70, w: cw - 0.50, h: 0.85, fontSize: 9, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0, lineSpacingMultiple: 1.1 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.40, y: 3.68, w: cw - 0.80, h: 0.32, fill: { color: C.white }, line: { color: C.crimson, width: 0.7 }, rectRadius: 0.04 });
  s.addText("No independent truth", { x: leftX + 0.40, y: 3.68, w: cw - 0.80, h: 0.32, fontSize: 8.5, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0 });

  // Right judge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX, y: 1.12, w: cw, h: 3.35, fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.10 });
  s.addShape(pres.shapes.OVAL, { x: rightX + cw/2 - 0.42, y: 1.28, w: 0.84, h: 0.84, fill: { color: C.green }, line: { color: C.green } });
  s.addText("⚖", { x: rightX + cw/2 - 0.42, y: 1.28, w: 0.84, h: 0.84, fontSize: 22, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addText("JUDGE", { x: rightX, y: 2.20, w: cw, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", margin: 0, charSpacing: 1.5 });
  s.addText("Check output with a tool", { x: rightX, y: 2.42, w: cw, h: 0.22, fontSize: 11, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0 });
  s.addText("Separate verifier, fresh signal.\nCan point to line number\nand correct value.", { x: rightX + 0.25, y: 2.70, w: cw - 0.50, h: 0.85, fontSize: 9, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0, lineSpacingMultiple: 1.1 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rightX + 0.40, y: 3.68, w: cw - 0.80, h: 0.32, fill: { color: C.white }, line: { color: C.green, width: 0.7 }, rectRadius: 0.04 });
  s.addText("Independent grounding", { x: rightX + 0.40, y: 3.68, w: cw - 0.80, h: 0.32, fontSize: 8.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", valign: "middle", margin: 0 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.62, w: 8.8, h: 0.38, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.04 });
  s.addText("Memorable rule: Mirror doubts. Judge measures.", { x: 0.7, y: 4.62, w: 8.6, h: 0.38, fontSize: 9, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 11);
}

// ==========================================================================
// V7-C2: Mirror vs Judge Expanded + Principle
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Intrinsic vs External", "Why the Mirror Fails", "Knowledge parity and prompt bias", "VARIANT 7C • EXPANDED");

  // Top mirror vs judge compact
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.12, w: 5.50, h: 1.55, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("Analogy", { x: 0.75, y: 1.22, w: 5.20, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1 });
  s.addShape(pres.shapes.OVAL, { x: 0.85, y: 1.45, w: 0.55, h: 0.55, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.8 } });
  s.addText("◐", { x: 0.85, y: 1.45, w: 0.55, h: 0.55, fontSize: 16, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", margin: 0 });
  s.addText("Mirror: same model", { x: 1.50, y: 1.48, w: 1.80, h: 0.18, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
  s.addText("sees same blind spot", { x: 1.50, y: 1.66, w: 1.80, h: 0.18, fontSize: 8, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  s.addShape(pres.shapes.OVAL, { x: 3.50, y: 1.45, w: 0.55, h: 0.55, fill: { color: C.green }, line: { color: C.green } });
  s.addText("⚖", { x: 3.50, y: 1.45, w: 0.55, h: 0.55, fontSize: 14, fontFace: BODY_FONT, color: C.white, align: "center", valign: "middle", margin: 0 });
  s.addText("Judge: separate tool", { x: 4.15, y: 1.48, w: 1.75, h: 0.18, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
  s.addText("fresh measurement", { x: 4.15, y: 1.66, w: 1.75, h: 0.18, fontSize: 8, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  s.addText("Intrinsic asks the mirror to find new truth. External asks the judge to measure.", { x: 0.75, y: 2.12, w: 5.20, h: 0.38, fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, valign: "middle" });

  // Right stats
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.35, y: 1.12, w: 3.45, h: 1.55, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("Empirical split", { x: 6.50, y: 1.22, w: 3.15, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, bold: true, margin: 0 });
  s.addText("Intrinsic  -1.3% to -27.5%", { x: 6.50, y: 1.42, w: 3.15, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0 });
  s.addText("External  +7% to +15%", { x: 6.50, y: 1.66, w: 3.15, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0 });
  s.addText("Same loops, different signals.", { x: 6.50, y: 1.95, w: 3.15, h: 0.32, fontSize: 7.5, fontFace: BODY_FONT, color: C.slate, margin: 0 });

  // Bottom three barriers diagram
  s.addText("Three barriers that make intrinsic verification as hard as generation", { x: 0.6, y: 2.82, w: 8.8, h: 0.22, fontSize: 9, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  const barriers = [
    { num: "1", title: "Shared weights", desc: "Critic = Generator\nNo new knowledge", icon: "≡" },
    { num: "2", title: "Compliance bias", desc: "\"Find flaws\" means\nmodel invents them", icon: "↯" },
    { num: "3", title: "No grounding", desc: "Cannot tell fix from\nhallucination", icon: "∅" },
  ];
  barriers.forEach((b, i) => {
    const cx = 0.6 + i * 3.02;
    const cw = 2.80;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 3.08, w: cw, h: 1.35, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
    addBadgeCircle(s, cx + 0.15, 3.22, b.num, 0.28, C.primary, C.white);
    s.addText(b.title, { x: cx + 0.50, y: 3.22, w: cw - 0.65, h: 0.28, fontSize: 10.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0, valign: "middle" });
    s.addText(b.desc, { x: cx + 0.15, y: 3.58, w: cw - 0.50, h: 0.55, fontSize: 8.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.05 });
    s.addShape(pres.shapes.OVAL, { x: cx + cw - 0.55, y: 3.90, w: 0.32, h: 0.32, fill: { color: C.white }, line: { color: C.mutedLight, width: 0.7 } });
    s.addText(b.icon, { x: cx + cw - 0.55, y: 3.90, w: 0.32, h: 0.32, fontSize: 11, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.60, w: 8.8, h: 0.40, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.7 }, rectRadius: 0.04 });
  s.addText("Takeaway for audience: If the checker knows no more than the writer, it cannot reliably correct the writer.", { x: 0.7, y: 4.60, w: 8.6, h: 0.40, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 12);
}

// ==========================================================================
// V8-A1: Forensic Triple Cards (Compact)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Three Confounders at a Glance", "Reported gain vs controlled truth", "VARIANT 8A • COMPACT");

  const confs = [
    { num: "1", title: "Oracle Leakage", sub: "RCI, Reflexion", color: C.primary, bg: C.primaryLight, reported: 10.5, controlled: -2.5, desc: "Only wrong answers get critiqued.\nCorrect answers stay protected." },
    { num: "2", title: "Compute Asymmetry", sub: "Debate vs 1 shot", color: C.amberDark, bg: C.amberLight, reported: 4.0, controlled: -1.5, desc: "3 to 6x calls. Fair vote wins\nat equal budget." },
    { num: "3", title: "Prompt Distortion", sub: "Self-Refine", color: C.slateDark, bg: C.cardBg, reported: 10.0, controlled: 0.0, desc: "Rules hidden at start,\nre-added as feedback." },
  ];

  confs.forEach((cf, i) => {
    const cx = 0.6 + i * 3.02;
    const cw = 2.80;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.14, w: cw, h: 3.25, fill: { color: C.white }, line: { color: cf.color, width: 1.1 }, rectRadius: 0.08 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.12, y: 1.26, w: cw - 0.24, h: 0.28, fill: { color: cf.bg }, line: { color: cf.color, width: 0.6 }, rectRadius: 0.04 });
    s.addText(cf.title, { x: cx + 0.12, y: 1.26, w: cw - 0.24, h: 0.28, fontSize: 10, fontFace: BODY_FONT, color: cf.color, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(cf.sub, { x: cx, y: 1.56, w: cw, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });
    // big reported number
    s.addText("+" + cf.reported + "%", { x: cx, y: 1.82, w: cw, h: 0.30, fontSize: 18, fontFace: TITLE_FONT, color: cf.color, bold: true, align: "center", margin: 0 });
    s.addText("reported", { x: cx, y: 2.10, w: cw, h: 0.16, fontSize: 7, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });
    // arrow down
    addDownArrow(s, cx + cw/2 - 0.08, 2.30, 0.16, 0.12, C.muted);
    // controlled pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.35, y: 2.46, w: cw - 0.70, h: 0.32, fill: { color: C.cardBg }, line: { color: cf.color, width: 0.8 }, rectRadius: 0.05 });
    s.addText((cf.controlled > 0 ? "+" : "") + cf.controlled + "% controlled", { x: cx + 0.35, y: 2.46, w: cw - 0.70, h: 0.32, fontSize: 8, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(cf.desc, { x: cx + 0.12, y: 2.86, w: cw - 0.24, h: 0.78, fontSize: 7.5, fontFace: BODY_FONT, color: C.slate, align: "center", margin: 0, lineSpacingMultiple: 1.1 });
    // icon badge
    addBadgeCircle(s, cx + cw/2 - 0.15, 3.66, cf.num, 0.30, cf.color, C.white);
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.58, w: 8.8, h: 0.42, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.7 }, rectRadius: 0.04 });
  s.addText("Huang et al. Table 1: After fixes, all positive bars disappear. Self-correction does not beat a fair baseline.", { x: 0.7, y: 4.58, w: 8.6, h: 0.42, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 13);
}

// ==========================================================================
// V8-A2: Expanded Cards + Paired Bars (chart)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Forensic: Reported vs Controlled", "Paired bars make inflation obvious", "VARIANT 8A • EXPANDED");

  // Left chart
  const chartData = [
    { name: "Reported", labels: ["Oracle", "Compute", "Prompt"], values: [10.5, 4.0, 10.0] },
    { name: "Controlled", labels: ["Oracle", "Compute", "Prompt"], values: [-2.5, -1.5, 0.0] },
  ];
  s.addChart(pres.charts.BAR, chartData, {
    x: 0.6, y: 1.14, w: 4.85, h: 3.25,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 7,
    chartColors: [C.primary, C.green],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slateDark, dataLabelFontSize: 7,
    valAxisMaxVal: 15, valAxisMinVal: -5,
    catAxisLabelColor: C.slateDark, catAxisLabelFontSize: 7,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 7,
    showTitle: false, barGrouping: "clustered"
  });

  // Right cards condensed
  const rx = 5.70; const rw = 3.70;
  const items = [
    { title: "1. Oracle Leakage", pill: "+10.5% → -2.5%", desc: "Shield correct answers, only fix wrong ones.", c: C.primary },
    { title: "2. Compute Gap", pill: "+4.0% → -1.5%", desc: "Debate loses to Self-Consistency at equal cost.", c: C.amberDark },
    { title: "3. Prompt Trick", pill: "+10.0% → 0.0%", desc: "Weak start vs rule rich feedback.", c: C.slateDark },
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
  s.addText("Read the chart: red collapses to green at or below zero. No confounder survives a fair test.", { x: 0.7, y: 4.58, w: 8.6, h: 0.42, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 14);
}

// ==========================================================================
// V8-B1: Waterfall Collapse (Compact)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "The Inflation Collapse", "Waterfall from claimed to fair", "VARIANT 8B • COMPACT");

  // Waterfall diagram built with shapes
  const baseY = 3.90; const barH = 0.22; const leftX = 1.10; const chartW = 6.0;
  // Title inside chart area
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.14, w: 8.8, h: 3.35, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("Gains are inflated, then removed step by step", { x: 0.75, y: 1.26, w: 8.5, h: 0.22, fontSize: 9, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });

  // Step 1: Reported avg
  const step1Val = 8.2;
  const scale = 12;
  // draw horizontal waterfall
  // Start bar
  s.addText("Reported avg", { x: leftX - 0.85, y: 1.62, w: 0.85, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "right", margin: 0, valign: "middle" });
  // base line
  s.addShape(pres.shapes.RECTANGLE, { x: leftX, y: 1.64, w: chartW, h: 0.015, fill: { color: C.mutedLight } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: 1.62, w: (step1Val/scale)*chartW, h: barH, fill: { color: C.primary }, line: { color: C.primary }, rectRadius: 0.03 });
  s.addText("+" + step1Val + "%", { x: leftX + (step1Val/scale)*chartW + 0.06, y: 1.62, w: 0.80, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, valign: "middle" });

  // connector down
  // Step subtractions
  const steps = [
    { label: "- Oracle leak", val: 4.5, color: C.crimsonLight, textColor: C.crimson },
    { label: "- Compute fair", val: 1.8, color: C.amberLight, textColor: C.amberDark },
    { label: "- Prompt fix", val: 3.5, color: C.slateLight, textColor: C.slateDark },
  ];
  let curX = (step1Val/scale)*chartW;
  let curY = 2.02;
  steps.forEach((st, i) => {
    const w = (st.val/scale)*chartW;
    curX = curX - w;
    s.addText(st.label, { x: leftX - 0.85, y: curY, w: 0.85, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, align: "right", margin: 0, valign: "middle" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + curX, y: curY, w: w, h: barH, fill: { color: st.color }, line: { color: st.textColor, width: 0.7 }, rectRadius: 0.03 });
    // delta arrow
    s.addText("-" + st.val, { x: leftX + curX + w/2 - 0.20, y: curY + 0.02, w: 0.40, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: st.textColor, bold: true, align: "center", valign: "middle", margin: 0 });
    // dashed connector to previous
    if (i < 3) {
      s.addShape(pres.shapes.RECTANGLE, { x: leftX + curX + w, y: curY - 0.10, w: 0.012, h: 0.14, fill: { color: C.mutedLight } });
    }
    curY += 0.42;
  });

  // Final bar: controlled
  const finalVal = -1.6;
  s.addText("Controlled", { x: leftX - 0.85, y: curY, w: 0.85, h: 0.22, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "right", margin: 0, valign: "middle" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX, y: curY, w: 0.28, h: barH, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.03 });
  s.addText(finalVal + "%", { x: leftX + 0.32, y: curY, w: 0.60, h: 0.22, fontSize: 8, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, valign: "middle" });
  s.addShape(pres.shapes.RECTANGLE, { x: leftX, y: curY + 0.22, w: chartW, h: 0.015, fill: { color: C.mutedLight } });
  s.addText("0% baseline", { x: leftX + chartW/2 - 0.40, y: curY + 0.26, w: 0.80, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0 });

  // Right annotation
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.50, y: 1.62, w: 1.65, h: 2.10, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.7 }, rectRadius: 0.06 });
  s.addText("Collapse", { x: 7.60, y: 1.72, w: 1.45, h: 0.18, fontSize: 8, fontFace: BODY_FONT, color: C.primary, bold: true, align: "center", margin: 0 });
  s.addText("Each fix\nremoves a\nchunk of\ninflated\ngain until\nnothing\nremains.", { x: 7.60, y: 1.92, w: 1.45, h: 1.55, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, align: "center", margin: 0, lineSpacingMultiple: 1.05 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.68, w: 8.8, h: 0.32, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 0.7 }, rectRadius: 0.04 });
  s.addText("Waterfall insight: The gains ladder collapses to zero. Not progress, just leakage and unfair comparison.", { x: 0.7, y: 4.68, w: 8.6, h: 0.32, fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 15);
}

// ==========================================================================
// V8-B2: Waterfall + Checklist (Expanded)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Collapse + How to Fix Each", "What was wrong and the fair alternative", "VARIANT 8B • EXPANDED");

  // Left waterfall (compact version small)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.14, w: 4.60, h: 3.35, fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("From claimed to fair", { x: 0.75, y: 1.26, w: 4.30, h: 0.20, fontSize: 8.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
  // simplified waterfall as stacked subtraction illustration
  // reported bar
  const chartW = 3.90;
  const scale = 12;
  const leftX = 0.85;
  s.addText("Reported", { x: leftX, y: 1.55, w: 0.85, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.85, y: 1.58, w: (8.2/scale)*chartW*0.5, h: 0.14, fill: { color: C.primary }, line: { color: C.primary }, rectRadius: 0.03 });
  s.addText("+8.2%", { x: leftX + 0.85 + (8.2/scale)*chartW*0.5 + 0.06, y: 1.55, w: 0.60, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0 });
  const steps = [
    { label: "Oracle leak", val: 4.5 },
    { label: "Compute", val: 1.8 },
    { label: "Prompt", val: 3.5 },
  ];
  let y = 1.85;
  steps.forEach(st => {
    s.addText("- " + st.label, { x: leftX, y: y, w: 0.85, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.85, y: y + 0.02, w: (st.val/scale)*chartW*0.5, h: 0.12, fill: { color: C.mutedLight }, line: { color: C.muted, width: 0.5 }, rectRadius: 0.03 });
    y += 0.28;
  });
  s.addText("Controlled", { x: leftX, y: y + 0.10, w: 0.85, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: leftX + 0.85, y: y + 0.12, w: 0.18, h: 0.14, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.03 });
  s.addText("-1.6%", { x: leftX + 1.08, y: y + 0.10, w: 0.60, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0 });
  s.addText("Gains evaporate when tested fairly.", { x: 0.75, y: 3.05, w: 4.30, h: 0.28, fontSize: 7.5, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.75, y: 3.40, w: 4.30, h: 0.85, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.6 }, rectRadius: 0.05 });
  s.addText("Paper: Huang et al. ICLR 2024 Table 1\nReproduced with fair prompts and equal compute.", { x: 0.80, y: 3.45, w: 4.20, h: 0.75, fontSize: 7.5, fontFace: BODY_FONT, color: C.primaryDark, margin: 0, valign: "middle", align: "center" });

  // Right checklist
  const rx = 5.45; const rw = 3.95;
  s.addText("Fair fix checklist", { x: rx, y: 1.14, w: rw, h: 0.22, fontSize: 9, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  const fixes = [
    { title: "Oracle leakage", bad: "Critique only if wrong", good: "Always critique, blind", c: C.primary },
    { title: "Compute fairness", bad: "Debate vs 1 shot", good: "Debate vs Self-Consistency vote", c: C.amberDark },
    { title: "Prompt completeness", bad: "Hide rules then add", good: "Full rules up front", c: C.slateDark },
  ];
  fixes.forEach((f, i) => {
    const ry = 1.42 + i * 1.06;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: ry, w: rw, h: 0.96, fill: { color: C.white }, line: { color: f.c, width: 0.9 }, rectRadius: 0.06 });
    s.addText(f.title, { x: rx + 0.12, y: ry + 0.08, w: rw - 0.24, h: 0.20, fontSize: 8.5, fontFace: BODY_FONT, color: f.c, bold: true, margin: 0 });
    s.addShape(pres.shapes.OVAL, { x: rx + 0.12, y: ry + 0.34, w: 0.14, h: 0.14, fill: { color: C.crimson } });
    s.addText(f.bad, { x: rx + 0.30, y: ry + 0.32, w: rw - 0.42, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.slate, margin: 0 });
    s.addShape(pres.shapes.OVAL, { x: rx + 0.12, y: ry + 0.56, w: 0.14, h: 0.14, fill: { color: C.green } });
    s.addText(f.good, { x: rx + 0.30, y: ry + 0.54, w: rw - 0.42, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.green, bold: true, margin: 0 });
  });

  addFooter(s, 16);
}

// ==========================================================================
// V8-C1: Diagnostic Checklist (Compact)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Diagnostic Checklist", "Spot the flaw in any self-correction claim", "VARIANT 8C • COMPACT");

  const items = [
    { num: "1", title: "Is there an oracle?", q: "Does the system know when it is wrong?", bad: "Yes: only critiques failures", fix: "Fix: blind critique always", color: C.primary, icon: "◉" },
    { num: "2", title: "Is compute equal?", q: "Does the baseline use same cost?", bad: "No: 3 to 6x vs 1 shot", fix: "Fix: compare to vote at same N", color: C.amberDark, icon: "⬢" },
    { num: "3", title: "Is the prompt fair?", q: "Are rules complete up front?", bad: "No: rules added in feedback", fix: "Fix: strong prompt from start", color: C.slateDark, icon: "≡" },
  ];

  items.forEach((it, i) => {
    const cx = 0.6 + i * 3.02;
    const cw = 2.80;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 1.14, w: cw, h: 3.35, fill: { color: C.white }, line: { color: it.color, width: 1.1 }, rectRadius: 0.08 });
    // header
    s.addShape(pres.shapes.OVAL, { x: cx + cw/2 - 0.22, y: 1.26, w: 0.44, h: 0.44, fill: { color: it.color } });
    s.addText(it.icon, { x: cx + cw/2 - 0.22, y: 1.26, w: 0.44, h: 0.44, fontSize: 12, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(it.title, { x: cx, y: 1.76, w: cw, h: 0.22, fontSize: 10, fontFace: BODY_FONT, color: it.color, bold: true, align: "center", margin: 0 });
    s.addText(it.q, { x: cx + 0.12, y: 2.00, w: cw - 0.24, h: 0.32, fontSize: 7.5, fontFace: BODY_FONT, color: C.slateDark, italic: true, align: "center", margin: 0 });
    // bad
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.12, y: 2.38, w: cw - 0.24, h: 0.42, fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.6 }, rectRadius: 0.04 });
    s.addText("✕ " + it.bad, { x: cx + 0.12, y: 2.38, w: cw - 0.24, h: 0.42, fontSize: 7.5, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0 });
    // arrow
    addDownArrow(s, cx + cw/2 - 0.08, 2.84, 0.16, 0.10, it.color);
    // fix
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.12, y: 2.98, w: cw - 0.24, h: 0.42, fill: { color: C.greenLight }, line: { color: C.green, width: 0.6 }, rectRadius: 0.04 });
    s.addText("✓ " + it.fix, { x: cx + 0.12, y: 2.98, w: cw - 0.24, h: 0.42, fontSize: 7.5, fontFace: BODY_FONT, color: C.green, bold: true, align: "center", valign: "middle", margin: 0 });
    // tag at bottom
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.35, y: 3.55, w: cw - 0.70, h: 0.22, fill: { color: C.white }, line: { color: it.color, width: 0.6 }, rectRadius: 0.04 });
    s.addText("Table 1 check", { x: cx + 0.35, y: 3.55, w: cw - 0.70, h: 0.22, fontSize: 7, fontFace: BODY_FONT, color: it.color, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.68, w: 8.8, h: 0.32, fill: { color: C.slateDark }, line: { color: C.slateDark }, rectRadius: 0.04 });
  s.addText("Use this checklist to audit any self-correction paper. If any box fails, the gain is not real.", { x: 0.7, y: 4.68, w: 8.6, h: 0.32, fontSize: 8.5, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 17);
}

// ==========================================================================
// V8-C2: Checklist + Chart (Expanded)
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Checklist + Evidence", "Each flaw maps to a bar that collapses", "VARIANT 8C • EXPANDED");

  // Left checklist condensed
  const lx = 0.6; const lw = 4.60;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: 1.14, w: lw, h: 3.35, fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08 });
  s.addText("Three audits", { x: lx + 0.15, y: 1.26, w: lw - 0.30, h: 0.18, fontSize: 7.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1 });
  const audits = [
    { t: "1. Oracle leakage", q: "Only wrong gets fixed?", a: "Inflates by shielding wins", c: C.primary },
    { t: "2. Compute parity", q: "Same budget baseline?", a: "Debate vs vote at equal N", c: C.amberDark },
    { t: "3. Prompt parity", q: "Rules up front?", a: "Weak start vs strong feedback", c: C.slateDark },
  ];
  audits.forEach((ad, i) => {
    const ay = 1.48 + i * 0.92;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx + 0.15, y: ay, w: lw - 0.30, h: 0.80, fill: { color: C.white }, line: { color: ad.c, width: 0.8 }, rectRadius: 0.06 });
    addBadgeCircle(s, lx + 0.25, ay + 0.12, String(i+1), 0.24, ad.c, C.white);
    s.addText(ad.t, { x: lx + 0.55, y: ay + 0.10, w: lw - 1.00, h: 0.18, fontSize: 8.5, fontFace: BODY_FONT, color: ad.c, bold: true, margin: 0 });
    s.addText(ad.q, { x: lx + 0.55, y: ay + 0.28, w: lw - 0.70, h: 0.18, fontSize: 7, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0 });
    s.addText(ad.a, { x: lx + 0.55, y: ay + 0.46, w: lw - 0.70, h: 0.28, fontSize: 7.5, fontFace: BODY_FONT, color: C.slate, margin: 0 });
  });

  // Right chart
  const chartData = [
    { name: "Claimed", labels: ["Oracle", "Compute", "Prompt"], values: [10.5, 4.0, 10.0] },
    { name: "Fair", labels: ["Oracle", "Compute", "Prompt"], values: [-2.5, -1.5, 0.0] },
  ];
  s.addChart(pres.charts.BAR, chartData, {
    x: 5.45, y: 1.14, w: 4.55, h: 3.35,
    showLegend: true, legendPos: "b", legendColor: C.slateDark, legendFontSize: 7,
    chartColors: [C.primary, C.green],
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.slateDark, dataLabelFontSize: 7,
    valAxisMaxVal: 15, valAxisMinVal: -5,
    catAxisLabelColor: C.slateDark, catAxisLabelFontSize: 7,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 7,
    showTitle: false, barGrouping: "clustered"
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 4.68, w: 8.8, h: 0.32, fill: { color: C.primaryLight }, line: { color: C.primary, width: 0.6 }, rectRadius: 0.04 });
  s.addText("Bottom line: After all three audits, no positive bar remains. Use equal compute, blind critique, and full prompts.", { x: 0.7, y: 4.68, w: 8.6, h: 0.32, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 18);
}

const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v14.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log(`Presentation v14 generated: ${outPath} with ${TOTAL} slides`))
  .catch((err) => console.error("Error generating v14:", err));
