const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation Variant Deck v18";
pres.title = "VARIANT 8A Expanded - Single Slide with Axis Labels";

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
  cardBg: "F8FAFC",
  cardBorder: "E2E8F0",
};

const TOTAL = 1;
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

// ==========================================================================
// SINGLE SLIDE: VARIANT 8A • EXPANDED : Exact copy from v14 V8-A2 with axis labels added
// ==========================================================================
{
  const s = createSlide();
  addVariantHeading(s, "2. Background: Flaws in Prior Evaluations", "Forensic: Reported vs Controlled", "Paired bars make inflation obvious", "VARIANT 8A • EXPANDED");

  // Left chart : EXACT as v14 V8-A2 (x 0.6 y 1.14 w 4.85 h 3.25, colors primary/green, val -5 to 15)
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

  // X and Y axis labels : what each axis indicates (added for v18 as requested)
  // X axis (horizontal, categories): confounder type
  s.addText("X axis: Confounder type (Oracle = leakage, Compute = budget, Prompt = withheld rules)", { x: 0.6, y: 4.42, w: 4.85, h: 0.14, fontSize: 6.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", margin: 0, italic: true });
  // Y axis (vertical, values): accuracy change in percentage points
  // Rotated text along left side of chart
  s.addText("Y axis: Accuracy change (%): reported gain vs controlled", { x: 0.12, y: 1.14, w: 0.30, h: 3.25, fontSize: 6.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, align: "center", valign: "middle", margin: 0, rotate: 270 });

  // Right cards condensed : EXACT as v14
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
  s.addText("Read the chart: red collapses to green at or below zero. No confounder survives a fair test.", { x: 0.7, y: 4.58, w: 8.6, h: 0.42, fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0 });

  addFooter(s, 1);
}

const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v18.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log(`Presentation v18 generated: ${outPath} with ${TOTAL} slides`);
}).catch((err) => {
  console.error("Error generating v18:", err);
});
