const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation - What is an LLM";
pres.title = "What is a Large Language Model (LLM)?";

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

function addHeader(slide, topic, title, subtitle) {
  // Topic
  slide.addText(topic.toUpperCase(), { x: 0.6, y: 0.18, w: 8.8, h: 0.20, fontSize: 8.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.2 });
  // Title
  slide.addText(title, { x: 0.6, y: 0.38, w: 8.8, h: 0.32, fontSize: 17, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  // Subtitle
  if (subtitle) {
    slide.addText(subtitle, { x: 0.6, y: 0.70, w: 8.8, h: 0.20, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  }
  // Divider
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 0.96, w: 8.8, h: 0.015, fill: { color: C.cardBorder } });
}

function createSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.white };
  return s;
}

// Slide 1: What is an LLM? - LEFT: Text | RIGHT: Image
{
  const s = createSlide();
  addHeader(s, "1. Introduction & Foundations", "What is a Large Language Model?", "A probabilistic next-token predictor");

  // LEFT Column: 3 Concept Cards (Text)
  const rx = 0.60;
  const rw = 4.90;

  // RIGHT Column: Image Card Container
  const imgCardX = 5.70;
  const imgCardY = 1.10;
  const imgCardW = 3.70;
  const imgCardH = 3.38;

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: imgCardX, y: imgCardY, w: imgCardW, h: imgCardH,
    fill: { color: C.white },
    line: { color: C.cardBorder, width: 1.0 },
    rectRadius: 0.06
  });

  // Top pill inside image card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: imgCardX + 0.12, y: imgCardY + 0.10, w: 2.40, h: 0.22,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 0.6 },
    rectRadius: 0.04
  });
  s.addText("TRANSFORMER PIPELINE", {
    x: imgCardX + 0.12, y: imgCardY + 0.10, w: 2.40, h: 0.22,
    fontSize: 7.0, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Embed Image - right side
  const imgPath = path.resolve(__dirname, "images/llm_architecture.jpg");
  s.addImage({
    path: imgPath,
    x: imgCardX + 0.10,
    y: imgCardY + 0.36,
    w: 3.50,
    h: 2.60
  });

  // Image sub-caption
  s.addText("Prompt -> Tokenization -> Self-Attention -> Softmax -> Next Token", {
    x: imgCardX + 0.10, y: imgCardY + 3.02, w: 3.50, h: 0.24,
    fontSize: 6.5, fontFace: BODY_FONT, color: C.muted, italic: true, align: "center", valign: "middle", margin: 0
  });
  const cards = [
    {
      pill: "01 | AUTOREGRESSIVE",
      title: "Next-Token Prediction",
      desc: "Predicts the next token, one at a time.",
      borderColor: C.primary,
      pillBg: C.primaryLight,
      pillColor: C.primaryDark
    },
    {
      pill: "02 | FROZEN WEIGHTS",
      title: "No Live Truth",
      desc: "Billions of fixed weights. No external check.",
      borderColor: C.green,
      pillBg: C.greenLight,
      pillColor: C.greenDark
    },
    {
      pill: "03 | FRAGILE REASONING",
      title: "Errors Cascade",
      desc: "One small error corrupts all later steps.",
      borderColor: C.amberDark,
      pillBg: C.amberLight,
      pillColor: C.amberDark
    }
  ];

  cards.forEach((c, i) => {
    const cy = 1.10 + i * 1.14;
    const ch = 1.04;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rx, y: cy, w: rw, h: ch,
      fill: { color: C.cardBg },
      line: { color: c.borderColor, width: 0.9 },
      rectRadius: 0.05
    });

    // Pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rx + 0.12, y: cy + 0.08, w: 2.30, h: 0.20,
      fill: { color: c.pillBg },
      line: { color: c.borderColor, width: 0.5 },
      rectRadius: 0.03
    });
    s.addText(c.pill, {
      x: rx + 0.12, y: cy + 0.08, w: 2.30, h: 0.20,
      fontSize: 6.8, fontFace: BODY_FONT, color: c.pillColor, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Title
    s.addText(c.title, {
      x: rx + 0.12, y: cy + 0.32, w: rw - 0.24, h: 0.22,
      fontSize: 9.2, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0
    });

    // Desc - minimal single line
    s.addText(c.desc, {
      x: rx + 0.12, y: cy + 0.56, w: rw - 0.24, h: 0.32,
      fontSize: 8.2, fontFace: BODY_FONT, color: C.slateLight, margin: 0, lineSpacingMultiple: 1.1
    });
  });

  // Bottom Takeaway Banner
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.60, y: 4.58, w: 8.80, h: 0.42,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 0.7 },
    rectRadius: 0.04
  });
  s.addText("Core Principle: An LLM predicts tokens. It cannot verify its own reasoning.", {
    x: 0.70, y: 4.58, w: 8.60, h: 0.42,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Speaker notes - updated for LEFT text / RIGHT image layout
  s.addNotes("To understand why self-correction fails, we first need to look at what a Large Language Model actually is. As shown on the left, three properties define an LLM. First, generation is autoregressive and sequential, one token at a time. Second, during inference the billions of neural weights are completely frozen, with no external ground truth. Third, multi-step reasoning is fragile, any small mistake in early steps gets baked into the context. On the right, the architecture diagram visualizes this pipeline. A prompt is tokenized, passes through layers of multi-head self-attention and feed-forward networks, and produces a probability distribution over the vocabulary to sample the next token. Because the weights are frozen and no internal oracle exists, asking the model to check its own reasoning cannot magically create new verification signals.");

  addFooter(s, 1);
}

const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v19.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log(`Presentation v19 generated: ${outPath} with ${TOTAL} slides`);
}).catch((err) => {
  console.error("Error generating v19:", err);
});
