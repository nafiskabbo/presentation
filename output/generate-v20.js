const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation - What is an LLM";
pres.title = "What is a Large Language Model (LLM)? - v20 Minimal";

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
  slide.addText(topic.toUpperCase(), { x: 0.6, y: 0.20, w: 8.8, h: 0.20, fontSize: 8.5, fontFace: BODY_FONT, color: C.primary, bold: true, margin: 0, charSpacing: 1.2 });
  // Title
  slide.addText(title, { x: 0.6, y: 0.40, w: 8.8, h: 0.32, fontSize: 17, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0 });
  // Subtitle
  if (subtitle) {
    slide.addText(subtitle, { x: 0.6, y: 0.72, w: 8.8, h: 0.20, fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  }
  // Divider
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 0.98, w: 8.8, h: 0.015, fill: { color: C.cardBorder } });
}

function createSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.white };
  return s;
}

// Slide 1: What is an LLM? (v20 Minimal, Visual-First)
{
  const s = createSlide();
  addHeader(s, "1. Introduction & Foundations", "What is a Large Language Model?", "Autoregressive token predictor with frozen neural parameters");

  // Left Column: Large Image Card
  const imgCardX = 0.60;
  const imgCardY = 1.14;
  const imgCardW = 5.15;
  const imgCardH = 3.32;

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: imgCardX, y: imgCardY, w: imgCardW, h: imgCardH,
    fill: { color: C.white },
    line: { color: C.cardBorder, width: 1.0 },
    rectRadius: 0.06
  });

  // Top pill inside image card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: imgCardX + 0.14, y: imgCardY + 0.10, w: 2.40, h: 0.22,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 0.6 },
    rectRadius: 0.04
  });
  s.addText("TRANSFORMER PIPELINE", {
    x: imgCardX + 0.14, y: imgCardY + 0.10, w: 2.40, h: 0.22,
    fontSize: 7.5, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Embed Image
  const imgPath = path.resolve(__dirname, "images/llm_architecture.jpg");
  s.addImage({
    path: imgPath,
    x: imgCardX + 0.12,
    y: imgCardY + 0.36,
    w: 4.91,
    h: 2.74
  });

  // Right Column: 3 Ultra-Clean Concept Cards (Less Text, High Signal)
  const rx = 5.90;
  const rw = 3.50;
  const cards = [
    {
      pill: "01 | NEXT-TOKEN PREDICTION",
      title: "Autoregressive Sampling",
      bullets: [
        "Predicts probability distribution P(wt | w<t)",
        "Generates strictly left to right, token by token"
      ],
      borderColor: C.primary,
      pillBg: C.primaryLight,
      pillColor: C.primaryDark
    },
    {
      pill: "02 | FROZEN INFERENCE",
      title: "Static Neural Parameters",
      bullets: [
        "Weights remain fixed during runtime",
        "Zero dynamic ground truth without external tools"
      ],
      borderColor: C.green,
      pillBg: C.greenLight,
      pillColor: C.greenDark
    },
    {
      pill: "03 | REASONING CASCADE",
      title: "Sequential Vulnerability",
      bullets: [
        "A step-two logic slip corrupts all downstream tokens",
        "No native backtracking or internal verification"
      ],
      borderColor: C.amberDark,
      pillBg: C.amberLight,
      pillColor: C.amberDark
    }
  ];

  cards.forEach((c, i) => {
    const cy = 1.14 + i * 1.15;
    const ch = 1.02;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rx, y: cy, w: rw, h: ch,
      fill: { color: C.cardBg },
      line: { color: c.borderColor, width: 0.9 },
      rectRadius: 0.05
    });

    // Pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: rx + 0.12, y: cy + 0.08, w: 2.10, h: 0.20,
      fill: { color: c.pillBg },
      line: { color: c.borderColor, width: 0.5 },
      rectRadius: 0.03
    });
    s.addText(c.pill, {
      x: rx + 0.12, y: cy + 0.08, w: 2.10, h: 0.20,
      fontSize: 6.8, fontFace: BODY_FONT, color: c.pillColor, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Title
    s.addText(c.title, {
      x: rx + 0.12, y: cy + 0.30, w: rw - 0.24, h: 0.22,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0
    });

    // Clean bullets
    const bulletText = c.bullets.map((b) => `•  ${b}`).join("\n");
    s.addText(bulletText, {
      x: rx + 0.12, y: cy + 0.52, w: rw - 0.24, h: 0.44,
      fontSize: 7.4, fontFace: BODY_FONT, color: C.slateLight, margin: 0, lineSpacingMultiple: 1.15
    });
  });

  // Bottom Takeaway Banner (Crisp 1-Liner)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.60, y: 4.58, w: 8.80, h: 0.42,
    fill: { color: C.primaryLight },
    line: { color: C.primary, width: 0.7 },
    rectRadius: 0.04
  });
  s.addText("Core Principle: LLMs predict probable tokens with frozen weights. They cannot independently verify their own reasoning.", {
    x: 0.70, y: 4.58, w: 8.60, h: 0.42,
    fontSize: 8.3, fontFace: BODY_FONT, color: C.primaryDark, bold: true, align: "center", valign: "middle", margin: 0
  });

  // Speaker notes
  s.addNotes("To understand why self-correction fails, look at the architecture on the left. An LLM tokenizes input text, routes it through multi-head self-attention layers, and samples the next token from a probability distribution. Notice the three pillars on the right: generation is autoregressive, parameters are completely frozen at runtime, and multi-step reasoning is strictly sequential. When a model makes a mistake in an intermediate step, it has no native backtracking mechanism. Asking a frozen model to verify itself cannot produce new truth signals.");

  addFooter(s, 1);
}

const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v20.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log(`Presentation v20 generated: ${outPath} with ${TOTAL} slides`);
}).catch((err) => {
  console.error("Error generating v20:", err);
});
