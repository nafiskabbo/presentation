const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation";
pres.title = "Large Language Models Cannot Self-Correct Reasoning Yet";

// ── Design Tokens ──
const C = {
  white: "FFFFFF",
  slateDark: "0F172A",     // Primary dark text #0F172A
  slate: "1E293B",         // Main body text #1E293B
  muted: "64748B",         // Muted subtitles and labels #64748B
  mutedLight: "94A3B8",    // Subtle borders and lines #94A3B8
  crimson: "800020",       // Primary accent: Deep Burgundy / Crimson #800020
  crimsonDark: "5C0017",   // Dark Crimson
  crimsonLight: "FDF2F4",  // Crimson subtle card tint
  amber: "D97706",         // Secondary accent: Warm Amber #D97706
  amberLight: "FFFBEB",    // Amber subtle card tint
  green: "166534",         // Forest Green for success / gains #166534
  greenLight: "F0FDF4",    // Green subtle card tint
  red: "DC2626",           // Red for drops / errors #DC2626
  redLight: "FEF2F2",      // Red subtle card tint
  cardBg: "F8F9FA",        // Light neutral card background #F8F9FA
  cardBorder: "E2E8F0",    // Border for cards #E2E8F0
  tableHead: "800020",     // Crimson table header
  tableRow1: "FDF2F4",     // Table row alternating tint
  tableRow2: "FFFFFF",     // Table row white
};

const TOTAL = 24;
const TITLE_FONT = "Century Schoolbook";
const BODY_FONT = "Calibri";
const FOOTER_TEXT = "Large Language Models Cannot Self-Correct Reasoning Yet  |  ICLR 2024";

function pad(n) {
  return String(n).padStart(2, "0");
}

// ── Common Slide Decorators ──
function addFooter(slide, num) {
  // Presentation title footer
  slide.addText(FOOTER_TEXT, {
    x: 0.6, y: 5.18, w: 7.2, h: 0.3,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "left", margin: 0,
  });
  // Zero-padded slide counter
  slide.addText(`${pad(num)}/${TOTAL}`, {
    x: 8.0, y: 5.18, w: 1.4, h: 0.3,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "right", margin: 0, bold: true,
  });
}

function addTopicHeader(slide, topic) {
  // Top category section label
  slide.addText(topic.toUpperCase(), {
    x: 0.6, y: 0.22, w: 8.8, h: 0.25,
    fontSize: 9, fontFace: BODY_FONT, color: C.crimson,
    bold: true, margin: 0, charSpacing: 1.5,
  });
}

function addSlideHeading(slide, topic, title, subtitle) {
  addTopicHeader(slide, topic);
  slide.addText(title, {
    x: 0.6, y: 0.48, w: 8.8, h: 0.45,
    fontSize: 24, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 0.95, w: 8.8, h: 0.25,
      fontSize: 11, fontFace: BODY_FONT, color: C.muted, margin: 0,
    });
  }
}

function createSlide() {
  const s = pres.addSlide();
  s.background = { fill: C.white };
  return s;
}

function addBadgeCircle(slide, x, y, text, sz = 0.36, bgColor = C.crimson, textColor = C.white) {
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y, w: sz, h: sz, fill: { color: bgColor },
  });
  slide.addText(text, {
    x: x, y: y, w: sz, h: sz,
    fontSize: sz > 0.4 ? 13 : 11, fontFace: BODY_FONT, color: textColor,
    align: "center", valign: "middle", margin: 0, bold: true,
  });
}

const assetsDir = path.resolve(__dirname, "assets");

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 01 — Title Slide
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();

  // Top decorative badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.5, w: 2.6, h: 0.35,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1 }, rectRadius: 0.08,
  });
  s.addText("ICLR 2024 CONFERENCE PAPER", {
    x: 0.6, y: 0.5, w: 2.6, h: 0.35,
    fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0, charSpacing: 1.0,
  });

  // Main title
  s.addText("Large Language Models\nCannot Self-Correct Reasoning Yet", {
    x: 0.6, y: 1.0, w: 8.8, h: 1.5,
    fontSize: 34, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "left", margin: 0,
    lineSpacingMultiple: 1.08,
  });

  // Paper authors
  s.addText("Jie Huang (UIUC)  ·  Xinyun Chen  ·  Swaroop Mishra  ·  Huaixiu Steven Zheng\nAdams Wei Yu  ·  Xinying Song  ·  Denny Zhou  (Google DeepMind)", {
    x: 0.6, y: 2.6, w: 8.8, h: 0.5,
    fontSize: 11, fontFace: BODY_FONT, color: C.muted, margin: 0, lineSpacingMultiple: 1.15,
  });

  // Presenters container card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 3.25, w: 8.8, h: 1.7,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Group Presentation  ·  Student Presenters", {
    x: 0.85, y: 3.4, w: 8.3, h: 0.25,
    fontSize: 11, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const students = [
    "1. Nafis Islam Kabbo — 2303180",
    "2. Srijon — 2303179",
    "3. Anindo — 2303181",
    "4. Mahid — 2303127",
    "5. Jebon — 2303160",
    "6. Refayet — 2303148",
  ];

  students.forEach((st, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = 0.85 + col * 2.8;
    const cy = 3.8 + row * 0.48;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: 2.6, h: 0.38,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.75 }, rectRadius: 0.06,
    });
    s.addText(st, {
      x: cx + 0.12, y: cy, w: 2.4, h: 0.38,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, valign: "middle", margin: 0, bold: true,
    });
  });

  s.addNotes("Welcome the audience. Introduce the paper 'Large Language Models Cannot Self-Correct Reasoning Yet' (ICLR 2024) by Google DeepMind and UIUC researchers, and introduce the six group members.");
  addFooter(s, 1);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 02 — Presentation Outline
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "Overview", "Presentation Outline", "Core narrative structure and argument flow across six sections");

  const outlineCards = [
    {
      num: "1",
      title: "Introduction",
      flow: "Motivation  \u2192  Research Problem  \u2192  Research Question",
      desc: "LLM reasoning foundations, autonomous refinement premise, and the central self-correction paradox.",
    },
    {
      num: "2",
      title: "Background & Related Work",
      flow: "LLM Reasoning  \u2192  Self-Correction  \u2192  Previous Findings  \u2192  Research Gap",
      desc: "Taxonomy of RCI, Reflexion, Self-Refine, and isolating intrinsic vs oracle-guided feedback.",
    },
    {
      num: "3",
      title: "Methodology",
      flow: "Models  \u2192  Tasks  \u2192  Experimental Setup  \u2192  Evaluation",
      desc: "GSM8K, CSQA, and HotpotQA benchmarks across GPT-3.5, GPT-4, GPT-4-Turbo, and Llama-2-70B.",
    },
    {
      num: "4",
      title: "Results",
      flow: "Main Finding: Intrinsic Self-Correction Fails",
      desc: "Empirical proof: Accuracy consistently declines across all reasoning tasks without oracle feedback.",
    },
    {
      num: "5",
      title: "Analysis",
      flow: "Why Does Self-Correction Fail?  \u2192  Error Persistence  \u2192  Possible Causes",
      desc: "Multi-Agent Debate compute parity, the prompt design trap, and why verification limits generation.",
    },
    {
      num: "6",
      title: "Conclusion & Future Work",
      flow: "Key Takeaways  \u2192  Limitations  \u2192  Future Directions",
      desc: "Summary of claims, boundaries of study, external tool integration, and fair benchmarking standards.",
    },
  ];

  const cardW = 4.25;
  const cardH = 1.05;
  const startX = 0.6;
  const startY = 1.35;
  const gapX = 0.3;
  const gapY = 0.22;

  outlineCards.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = startX + col * (cardW + gapX);
    const cy = startY + row * (cardH + gapY);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });

    addBadgeCircle(s, cx + 0.15, cy + 0.15, c.num, 0.36, C.crimson, C.white);

    s.addText(c.title, {
      x: cx + 0.6, y: cy + 0.12, w: cardW - 0.75, h: 0.25,
      fontSize: 13, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });

    s.addText(c.flow, {
      x: cx + 0.6, y: cy + 0.38, w: cardW - 0.75, h: 0.22,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0,
    });

    s.addText(c.desc, {
      x: cx + 0.6, y: cy + 0.6, w: cardW - 0.75, h: 0.38,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, margin: 0, valign: "top",
    });
  });

  s.addNotes("Outline overview: Walk the audience through the 6 core sections. Note how the presentation moves logically from foundational concepts to empirical results, deep-dive analysis, and constructive future directions.");
  addFooter(s, 2);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 03 — Introduction: Motivation
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "Large Language Models & Reasoning", "Motivation: High utility of autoregressive LLMs paired with multi-step reasoning vulnerabilities");

  // Left column: Content cards
  const leftW = 3.9;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.35, w: leftW, h: 3.5,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText([
    { text: "What are Large Language Models?", options: { fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Neural networks trained on massive internet corpora using autoregressive next-token prediction.", options: { fontSize: 11, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Chain-of-Thought (CoT) Prompting", options: { fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Prompting LLMs to output intermediate reasoning steps enables them to solve complex math and logic benchmarks (e.g. GSM8K, CSQA).", options: { fontSize: 11, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 10 } },
    { text: "The Compounding Error Vulnerability", options: { fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Because tokens are generated sequentially, a single erroneous step in the reasoning chain irreversibly corrupts the final answer.", options: { fontSize: 11, fontFace: BODY_FONT, color: C.slate } },
  ], {
    x: 0.8, y: 1.5, w: leftW - 0.4, h: 3.2, margin: 0, valign: "top",
  });

  // Right side: Diagram
  s.addImage({
    path: path.join(assetsDir, "fig_autoregressive_cot.png"),
    x: 4.7, y: 1.35, w: 4.7, h: 3.5,
  });

  s.addNotes("Presenter 1: Nafis Islam Kabbo. Explain what LLMs are, how Chain-of-Thought reasoning works, and why reasoning error propagation is a critical bottleneck for reliable AI systems.");
  addFooter(s, 3);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 04 — Introduction: Research Problem
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "The Concept of Self-Correction", "Research Problem: Can LLMs autonomously detect and repair reasoning flaws in post-processing?");

  // 3 horizontal feature blocks
  const cards = [
    {
      num: "A",
      title: "The Self-Correction Hypothesis",
      badge: "Theoretical Promise",
      text: "The expectation that an LLM, given its initial draft, can adopt a 'critic' mindset, identify errors in its own logic chain, and iteratively revise its output toward ground truth.",
      bg: C.cardBg,
      border: C.cardBorder,
    },
    {
      num: "B",
      title: "Post-Processing Refinement Loop",
      badge: "Standard Workflow",
      text: "1. Prompt \u2192 Initial Answer\n2. Feedback Prompt: 'Review your answer, find mistakes, and rewrite'\n3. Revised Answer \u2192 Final Output",
      bg: C.amberLight,
      border: C.amber,
    },
    {
      num: "C",
      title: "The High Stakes of Autonomous Correction",
      badge: "Industry Impact",
      text: "If true intrinsic self-correction works, autonomous AI agents could solve complex tasks without costly human supervision, external verifiers, or specialized domain tools.",
      bg: C.cardBg,
      border: C.cardBorder,
    },
  ];

  cards.forEach((c, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.35, w: 2.8, h: 3.5,
      fill: { color: c.bg }, line: { color: c.border, width: 1 }, rectRadius: 0.1,
    });

    addBadgeCircle(s, cx + 0.2, 1.55, c.num, 0.35, C.crimson, C.white);

    s.addText(c.title, {
      x: cx + 0.2, y: 2.05, w: 2.4, h: 0.5,
      fontSize: 14, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.2, y: 2.6, w: 2.4, h: 0.25,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.05,
    });
    s.addText(c.badge, {
      x: cx + 0.2, y: 2.6, w: 2.4, h: 0.25,
      fontSize: 9, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addText(c.text, {
      x: cx + 0.2, y: 3.0, w: 2.4, h: 1.65,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Presenter 1: Nafis Islam Kabbo. Detail the theoretical appeal of self-correction. Explain why the AI community was enthusiastic about self-correction loops and the potential benefits if models could self-refine.");
  addFooter(s, 4);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 05 — Introduction: Research Question
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "The Central Research Question", "The Self-Correction Paradox: Can an LLM fix its reasoning without external signals?");

  // Top big paradox callout box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.35, w: 8.8, h: 1.3,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.5 }, rectRadius: 0.1,
  });

  s.addText("THE CORE PARADOX", {
    x: 0.85, y: 1.45, w: 8.3, h: 0.25,
    fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.5,
  });

  s.addText('"If an LLM has the intrinsic knowledge and reasoning capability to correct a mistake, why didn\'t it produce the correct answer in the first attempt?"', {
    x: 0.85, y: 1.75, w: 8.3, h: 0.75,
    fontSize: 15, fontFace: TITLE_FONT, color: C.slateDark, bold: true, italic: true, margin: 0,
  });

  // 2 bottom comparison cards
  const subW = 4.25;
  // Card 1: Intrinsic Definition
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.85, w: subW, h: 2.0,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });
  s.addText("Intrinsic Self-Correction (Paper Focus)", {
    x: 0.8, y: 3.0, w: subW - 0.4, h: 0.3,
    fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });
  s.addText([
    { text: "• Model relies strictly on its internal frozen weights", options: { fontSize: 11, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Zero external feedback: No oracle labels, humans, or tool outputs", options: { fontSize: 11, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Central Question: Does intrinsic self-correction improve reasoning accuracy?", options: { fontSize: 11, fontFace: BODY_FONT, color: C.crimson, bold: true } },
  ], { x: 0.8, y: 3.35, w: subW - 0.4, h: 1.35, margin: 0, valign: "top" });

  // Card 2: External Feedback Definition
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 2.85, w: subW, h: 2.0,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });
  s.addText("External-Feedback Self-Correction", {
    x: 5.35, y: 3.0, w: subW - 0.4, h: 0.3,
    fontSize: 13, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
  });
  s.addText([
    { text: "• Model receives outside verification signals (e.g. unit test failure)", options: { fontSize: 11, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Ground-truth labels or code execution results guide revision", options: { fontSize: 11, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Effective in practice, but NOT true intrinsic self-correction", options: { fontSize: 11, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 5.35, y: 3.35, w: subW - 0.4, h: 1.35, margin: 0, valign: "top" });

  s.addNotes("Presenter 1: Nafis Islam Kabbo. Articulate the central research paradox. Distinguish intrinsic self-correction (the core focus of this study) from systems relying on external oracles and tools.");
  addFooter(s, 5);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 06 — Literature Review: Prior Frameworks
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Prior Self-Correction Frameworks", "Previous Findings: Leading paradigms in recent literature proposing self-correction methods");

  const methods = [
    {
      name: "RCI",
      cite: "Kim et al. (NeurIPS 2023)",
      badge: "Recursive Critique",
      desc: "Recursive Criticism and Improvement. The model sequentially critiques its reasoning and modifies responses based on its own critique.",
    },
    {
      name: "Reflexion",
      cite: "Shinn et al. (NeurIPS 2023)",
      badge: "Verbal Reinforcement",
      desc: "Maintains an episodic memory buffer of past failures and generates verbal self-reflections to guide subsequent trial iterations.",
    },
    {
      name: "Self-Refine",
      cite: "Madaan et al. (NeurIPS 2023)",
      badge: "Iterative Refinement",
      desc: "Multi-turn framework where an LLM generates structured feedback on its output and refines its response over successive turns.",
    },
    {
      name: "Multi-Agent Debate",
      cite: "Du et al. (2023)",
      badge: "Multi-Agent Consensus",
      desc: "Multiple LLM instances propose candidate solutions, read peer critiques, and debate over multiple rounds to converge on an answer.",
    },
  ];

  const cardW = 4.25;
  const cardH = 1.6;
  const startX = 0.6;
  const startY = 1.35;
  const gapX = 0.3;
  const gapY = 0.25;

  methods.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = startX + col * (cardW + gapX);
    const cy = startY + row * (cardH + gapY);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });

    s.addText(m.name, {
      x: cx + 0.2, y: cy + 0.15, w: 2.2, h: 0.3,
      fontSize: 16, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + cardW - 1.8, y: cy + 0.15, w: 1.6, h: 0.24,
      fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.5 }, rectRadius: 0.04,
    });
    s.addText(m.badge, {
      x: cx + cardW - 1.8, y: cy + 0.15, w: 1.6, h: 0.24,
      fontSize: 8.5, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addText(m.cite, {
      x: cx + 0.2, y: cy + 0.48, w: cardW - 0.4, h: 0.22,
      fontSize: 10, fontFace: BODY_FONT, color: C.muted, margin: 0, italic: true,
    });

    s.addText(m.desc, {
      x: cx + 0.2, y: cy + 0.75, w: cardW - 0.4, h: 0.75,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Presenter 2: Srijon. Cover the major self-correction papers in literature (RCI, Reflexion, Self-Refine, Multi-Agent Debate). Note how each proposed an architectural loop claiming performance improvements.");
  addFooter(s, 6);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 07 — Literature Review: Intrinsic vs External Taxonomy
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Intrinsic vs. External Feedback", "Research Gap: Deconstructing the boundary between pure model reasoning and external guidance");

  // Diagram image on right/center
  s.addImage({
    path: path.join(assetsDir, "fig_intrinsic_vs_external.png"),
    x: 0.6, y: 1.35, w: 8.8, h: 3.5,
  });

  s.addNotes("Presenter 2: Srijon. Emphasize the crucial taxonomy distinction. Explain that external feedback (like code execution or ground truth) introduces genuine new information, whereas intrinsic self-correction relies solely on the model's existing internal weights.");
  addFooter(s, 7);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 08 — Literature Review: Flaws in Prior Evaluations
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Flaws in Prior Evaluations", "Critical Analysis: Summary of evaluation confounders identified by Huang et al. (Table 1)");

  const tableRows = [
    [
      { text: "Method", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
      { text: "Identified Evaluation Flaw", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
      { text: "Mechanism of Distortion", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
      { text: "Paper Ref.", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
    ],
    [
      { text: "RCI\n(Kim et al., 2023)", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Oracle Label Leakage", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true } },
      { text: "Model is only prompted to correct when ground truth indicates the answer is wrong, acting as an external filter.", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Section 3", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
    ],
    [
      { text: "Reflexion\n(Shinn et al., 2023)", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Oracle Label Leakage", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true } },
      { text: "Reflections are triggered exclusively upon receiving environment failure signals (binary ground-truth labels).", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Section 3", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, align: "center" } },
    ],
    [
      { text: "Multi-Agent Debate\n(Du et al., 2023)", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Unfair Inference Cost", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.amber, bold: true } },
      { text: "Compared multi-agent debate (N agents × M rounds) against single-attempt baseline rather than equal-compute sampling.", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Section 4", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
    ],
    [
      { text: "Self-Refine\n(Madaan et al., 2023)", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Sub-Optimal Initial Prompt", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.amber, bold: true } },
      { text: "Initial prompt omitted task constraints that were only added in the feedback prompt, creating an illusion of improvement.", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Section 5", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, align: "center" } },
    ],
  ];

  s.addTable(tableRows, {
    x: 0.6, y: 1.35, w: 8.8,
    colW: [1.8, 2.0, 4.0, 1.0],
    rowH: [0.38, 0.62, 0.62, 0.62, 0.62],
    border: { type: "solid", pt: 0.5, color: C.cardBorder },
    margin: [4, 6, 4, 6],
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.45, w: 8.8, h: 0.45,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.5 }, rectRadius: 0.05,
  });
  s.addText("Takeaway: When these methodological confounders are eliminated, reported gains disappear.", {
    x: 0.8, y: 4.45, w: 8.4, h: 0.45,
    fontSize: 10.5, fontFace: BODY_FONT, color: C.crimson, bold: true, valign: "middle", margin: 0,
  });

  s.addNotes("Presenter 2: Srijon. Review Table 1 from the paper. Explain how prior literature gave the false impression that self-correction worked because of oracle leakage, unequal compute comparison, or incomplete initial prompts.");
  addFooter(s, 8);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 09 — Methodology: Tasks & Benchmarks
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Evaluation Reasoning Benchmarks", "Tasks: Standard reasoning datasets spanning mathematics, commonsense logic, and multi-hop QA");

  const benchmarks = [
    {
      name: "GSM8K",
      size: "1,319 Problems",
      type: "Math Word Problems",
      badge: "Grade School Math",
      desc: "Requires 2–8 steps of arithmetic reasoning. Evaluates whether LLMs can track arithmetic state and logical constraints over sequential derivations.",
      prior: "Kim et al. claimed +7% gain using oracle labels.",
    },
    {
      name: "CommonSenseQA",
      size: "1,221 Problems",
      type: "Multiple-Choice QA",
      badge: "Commonsense Logic",
      desc: "5-choice questions requiring complex real-world commonsense reasoning designed with subtle semantic distractors.",
      prior: "Kim et al. claimed +15% gain with oracle guidance.",
    },
    {
      name: "HotpotQA",
      size: "100 Samples (Closed-Book)",
      type: "Multi-Hop QA",
      badge: "Information Synthesis",
      desc: "Open-domain multi-hop questions requiring combining facts across multiple Wikipedia sources, evaluated in a challenging closed-book setting (Exact Match).",
      prior: "Shinn et al. reported improvements via reflection.",
    },
  ];

  benchmarks.forEach((b, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.35, w: 2.8, h: 3.5,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
    });

    s.addText(b.size, {
      x: cx, y: 1.5, w: 2.8, h: 0.45,
      fontSize: 22, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0,
    });

    s.addText(b.name, {
      x: cx, y: 1.95, w: 2.8, h: 0.3,
      fontSize: 14, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.3, y: 2.3, w: 2.2, h: 0.24,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04,
    });
    s.addText(b.badge, {
      x: cx + 0.3, y: 2.3, w: 2.2, h: 0.24,
      fontSize: 9, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addText(b.desc, {
      x: cx + 0.2, y: 2.65, w: 2.4, h: 1.3,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.15, y: 4.1, w: 2.5, h: 0.6,
      fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.5 }, rectRadius: 0.05,
    });
    s.addText(b.prior, {
      x: cx + 0.2, y: 4.12, w: 2.4, h: 0.55,
      fontSize: 9, fontFace: BODY_FONT, color: C.crimsonDark, italic: true, valign: "middle", margin: 0,
    });
  });

  s.addNotes("Presenter 3: Anindo. Detail the three reasoning benchmarks (GSM8K, CSQA, HotpotQA). Explain why these datasets are standard for evaluating multi-step reasoning capabilities.");
  addFooter(s, 9);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Methodology: Models & Setup
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Models & Experimental Controls", "Models & Setup: Rigorous evaluation across leading proprietary and open-weight LLMs");

  // Left card: Models
  const colW = 4.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.35, w: colW, h: 3.5,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Evaluated Models", {
    x: 0.85, y: 1.5, w: colW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const modelsList = [
    { name: "GPT-3.5-Turbo", tag: "gpt-3.5-turbo-0613", desc: "Full dataset evaluations on GSM8K (1,319) and CSQA (1,221)." },
    { name: "GPT-4", tag: "Snapshot 2023/08/29", desc: "Flagship proprietary model evaluated on standard benchmark splits." },
    { name: "GPT-4-Turbo", tag: "gpt-4-1106-preview", desc: "Updated frontier model with enhanced reasoning capabilities." },
    { name: "Llama-2-70B-Chat", tag: "Open-weight baseline", desc: "Leading open-weight foundation model evaluated with greedy & sampling." },
  ];

  modelsList.forEach((m, i) => {
    const cy = 1.9 + i * 0.7;
    addBadgeCircle(s, 0.85, cy + 0.05, String(i + 1), 0.28, C.slateDark, C.white);
    s.addText(m.name, {
      x: 1.25, y: cy, w: 2.2, h: 0.25,
      fontSize: 11.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addText(m.tag, {
      x: 1.25, y: cy + 0.22, w: colW - 1.5, h: 0.2,
      fontSize: 9, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0,
    });
    s.addText(m.desc, {
      x: 1.25, y: cy + 0.42, w: colW - 1.5, h: 0.25,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0,
    });
  });

  // Right card: Setup controls
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.35, w: colW, h: 3.5,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Experimental Controls & Rigor", {
    x: 5.4, y: 1.5, w: colW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const controls = [
    { title: "Standard Prompting", desc: "Zero-shot and few-shot Chain-of-Thought (CoT) baselines to elicit step-by-step reasoning." },
    { title: "Temperature Controls", desc: "Temperature = 1.0 for GPT models (standard exploration) and 0.7 for Llama-2-70B." },
    { title: "Correction Horizon", desc: "Standardized to a maximum of 2 sequential rounds of self-correction per question." },
    { title: "Matched Feedback Prompts", desc: "Generic self-correction prompts: 'Review your previous answer and find reasons why your answer could be wrong...'" },
    { title: "Comparison Regimes", desc: "Controlled comparison: Intrinsic self-correction vs. Oracle-guided filtering." },
  ];

  controls.forEach((ct, i) => {
    const cy = 1.9 + i * 0.56;
    s.addShape(pres.shapes.OVAL, {
      x: 5.4, y: cy + 0.06, w: 0.12, h: 0.12, fill: { color: C.crimson },
    });
    s.addText(ct.title + ": ", {
      x: 5.6, y: cy, w: colW - 0.9, h: 0.22,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addText(ct.desc, {
      x: 5.6, y: cy + 0.2, w: colW - 0.9, h: 0.35,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0,
    });
  });

  s.addNotes("Presenter 3: Anindo. Explain the models tested and the experimental setup. Highlight that this study evaluated both proprietary frontier models (GPT-4) and open models (Llama-2) under strict controlled conditions.");
  addFooter(s, 10);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 11 — Methodology: Prompting Protocols
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Prompting Procedures & Protocols", "Evaluation: Contrasting the step-by-step workflow of oracle vs intrinsic correction");

  // Step flow horizontal cards
  const steps = [
    { num: "Step 1", title: "Initial Generation", text: "Model receives question and generates an initial reasoning chain and answer." },
    { num: "Step 2", title: "Self-Review / Critique", text: "Feedback prompt asks model to critique its logic and verify intermediate steps." },
    { num: "Step 3", title: "Revised Output", text: "Model generates a revised reasoning path and final answer." },
    { num: "Step 4", title: "Iteration (Round 2)", text: "Process repeats for up to 2 rounds to test multi-turn stability." },
  ];

  steps.forEach((st, i) => {
    const cx = 0.6 + i * 2.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.35, w: 2.05, h: 1.3,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });
    addBadgeCircle(s, cx + 0.15, 1.48, String(i + 1), 0.28, C.crimson, C.white);
    s.addText(st.title, {
      x: cx + 0.5, y: 1.48, w: 1.45, h: 0.28,
      fontSize: 10.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addText(st.text, {
      x: cx + 0.15, y: 1.82, w: 1.75, h: 0.75,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top",
    });
    if (i < 3) {
      s.addText("\u2192", {
        x: cx + 2.05, y: 1.8, w: 0.2, h: 0.4,
        fontSize: 16, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  // Bottom 2 comparison containers
  const botW = 4.25;
  // Oracle container
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.85, w: botW, h: 2.0,
    fill: { color: C.greenLight }, line: { color: C.green, width: 1 }, rectRadius: 0.08,
  });
  s.addText("With Oracle Feedback (Prior Flawed Setup)", {
    x: 0.85, y: 3.0, w: botW - 0.5, h: 0.25,
    fontSize: 12.5, fontFace: TITLE_FONT, color: C.green, bold: true, margin: 0,
  });
  s.addText([
    { text: "• External verifier checks answer correctness after Step 1.", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Model is told WHEN its answer is wrong \u2192 triggers Step 2.", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Correct answers are never touched \u2192 Performance artificially inflates.", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 0.85, y: 3.3, w: botW - 0.5, h: 1.4, margin: 0, valign: "top" });

  // Intrinsic container
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 2.85, w: botW, h: 2.0,
    fill: { color: C.redLight }, line: { color: C.red, width: 1 }, rectRadius: 0.08,
  });
  s.addText("Intrinsic Self-Correction (Realistic Setup)", {
    x: 5.4, y: 3.0, w: botW - 0.5, h: 0.25,
    fontSize: 12.5, fontFace: TITLE_FONT, color: C.red, bold: true, margin: 0,
  });
  s.addText([
    { text: "• No external signals provided. Model must decide if it is right.", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Model blindly critiques itself across all problems.", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Model frequently changes correct answers into incorrect ones \u2192 Performance drops.", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.red, bold: true } },
  ], { x: 5.4, y: 3.3, w: botW - 0.5, h: 1.4, margin: 0, valign: "top" });

  s.addNotes("Presenter 3: Anindo. Explain the prompting workflow. Clarify how oracle feedback acts as a cheat sheet telling the model when to stop, whereas intrinsic correction forces the model to evaluate itself without guidance.");
  addFooter(s, 11);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 12 — Results: Core Finding
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "Intrinsic Self-Correction Fails", "Main Finding: Empirical proof that intrinsic self-correction degrades reasoning performance");

  // Big Callout Banner
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.35, w: 8.8, h: 1.1,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.5 }, rectRadius: 0.08,
  });
  s.addText("CENTRAL EMPIRICAL FINDING", {
    x: 0.85, y: 1.45, w: 8.3, h: 0.22,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.5,
  });
  s.addText("Across all tested benchmarks and models, intrinsic self-correction does NOT improve reasoning accuracy — performance consistently declines after self-correction.", {
    x: 0.85, y: 1.7, w: 8.3, h: 0.65,
    fontSize: 14, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
  });

  // 3 summary insight cards
  const cards = [
    {
      title: "Universal Degradation",
      badge: "All Models Affected",
      desc: "Whether testing GPT-3.5, GPT-4, GPT-4-Turbo, or Llama-2-70B, accuracy drops after Round 1 and often drops further after Round 2.",
      bg: C.cardBg,
    },
    {
      title: "Task-Agnostic Failure",
      badge: "Math, Logic & QA",
      desc: "Failures occur across math word problems (GSM8K), commonsense multiple-choice (CSQA), and open-domain multi-hop QA (HotpotQA).",
      bg: C.cardBg,
    },
    {
      title: "The Oracle Illusion",
      badge: "Prior Artifacts",
      desc: "Performance only improves when external oracle labels guide when to correct, proving prior reported gains were evaluation artifacts.",
      bg: C.amberLight,
    },
  ];

  cards.forEach((c, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 2.65, w: 2.8, h: 2.2,
      fill: { color: c.bg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });
    addBadgeCircle(s, cx + 0.2, 2.8, String(i + 1), 0.32, C.crimson, C.white);
    s.addText(c.title, {
      x: cx + 0.6, y: 2.8, w: 2.0, h: 0.3,
      fontSize: 13, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.2, y: 3.2, w: 2.4, h: 0.22,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04,
    });
    s.addText(c.badge, {
      x: cx + 0.2, y: 3.2, w: 2.4, h: 0.22,
      fontSize: 8.5, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(c.desc, {
      x: cx + 0.2, y: 3.5, w: 2.4, h: 1.25,
      fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Presenter 4: Mahid. Present the core empirical takeaway. Emphasize that this failure is universal across both proprietary and open-weight models and across all three reasoning domains.");
  addFooter(s, 12);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 13 — Results: GPT-3.5 & GPT-4
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "GPT-3.5 & GPT-4 Results", "Detailed Results: Benchmark accuracy across rounds of intrinsic self-correction (Table 3)");

  const tRows = [
    [
      { text: "Model", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
      { text: "Correction Setting", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
      { text: "GSM8K (Math)", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT, align: "center" } },
      { text: "CommonSenseQA", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT, align: "center" } },
      { text: "HotpotQA (EM)", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT, align: "center" } },
    ],
    // GPT-3.5
    [
      { text: "GPT-3.5-Turbo", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Standard (CoT)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "77.0%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true, align: "center" } },
      { text: "72.5%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true, align: "center" } },
      { text: "29.0%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Self-Correction Round 1", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "75.2%  \u25BC (-1.8)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
      { text: "63.5%  \u25BC (-9.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
      { text: "26.0%  \u25BC (-3.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Self-Correction Round 2", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "72.6%  \u25BC (-4.4)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
      { text: "55.3%  \u25BC (-17.2)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
      { text: "25.0%  \u25BC (-4.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
    ],
    // GPT-4
    [
      { text: "GPT-4", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Standard (CoT)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "92.0%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true, align: "center" } },
      { text: "78.5%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true, align: "center" } },
      { text: "53.0%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Self-Correction Round 1", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "88.5%  \u25BC (-3.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
      { text: "72.5%  \u25BC (-6.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
      { text: "42.0%  \u25BC (-11.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Self-Correction Round 2", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "88.0%  \u25BC (-4.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
      { text: "72.0%  \u25BC (-6.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
      { text: "42.0%  \u25BC (-11.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
    ],
  ];

  s.addTable(tRows, {
    x: 0.6, y: 1.35, w: 8.8,
    colW: [1.6, 2.2, 1.6, 1.8, 1.6],
    rowH: [0.38, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42],
    border: { type: "solid", pt: 0.5, color: C.cardBorder },
    margin: [3, 6, 3, 6],
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.45, w: 8.8, h: 0.45,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.5 }, rectRadius: 0.05,
  });
  s.addText("Key Trend: GPT-3.5 on CSQA drops 17.2% by Round 2; GPT-4 drops 11.0% on HotpotQA.", {
    x: 0.8, y: 4.45, w: 8.4, h: 0.45,
    fontSize: 10.5, fontFace: BODY_FONT, color: C.crimson, bold: true, valign: "middle", margin: 0,
  });

  s.addNotes("Presenter 4: Mahid. Walk through Table 3. Point out that even GPT-4 (the strongest model available at publication) loses 3.5–11% accuracy when prompted to self-correct intrinsically.");
  addFooter(s, 13);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 14 — Results: GPT-4-Turbo & Llama-2
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "GPT-4-Turbo & Llama-2 Results", "Generalizability: Extending evaluation confirms failure across open and proprietary LLMs (Table 4)");

  const tRows2 = [
    [
      { text: "Model", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
      { text: "Correction Setting", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT } },
      { text: "GSM8K (Math)", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT, align: "center" } },
      { text: "CommonSenseQA", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 11, fontFace: TITLE_FONT, align: "center" } },
    ],
    // GPT-4-Turbo
    [
      { text: "GPT-4-Turbo\n(gpt-4-1106-preview)", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Standard (CoT)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "91.5%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true, align: "center" } },
      { text: "84.0%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Self-Correction Round 1", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "88.0%  \u25BC (-3.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
      { text: "81.5%  \u25BC (-2.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Self-Correction Round 2", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "90.0%  \u25BC (-1.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.amber, bold: true, align: "center" } },
      { text: "83.0%  \u25BC (-1.0)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.amber, bold: true, align: "center" } },
    ],
    // Llama-2-70B
    [
      { text: "Llama-2-70B-Chat\n(Open-Weight)", options: { bold: true, fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Standard (CoT)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "62.0%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true, align: "center" } },
      { text: "64.0%", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Self-Correction Round 1", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "43.5%  \u25BC (-18.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
      { text: "37.5%  \u25BC (-26.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true, align: "center" } },
    ],
    [
      { text: "", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Self-Correction Round 2", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "36.5%  \u25BC (-25.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
      { text: "36.5%  \u25BC (-27.5)", options: { fontSize: 10.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true, align: "center" } },
    ],
  ];

  s.addTable(tRows2, {
    x: 0.6, y: 1.35, w: 8.8,
    colW: [2.2, 2.4, 2.1, 2.1],
    rowH: [0.38, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42],
    border: { type: "solid", pt: 0.5, color: C.cardBorder },
    margin: [3, 6, 3, 6],
  });

  // Highlight Box for Llama-2
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.45, w: 8.8, h: 0.45,
    fill: { color: C.redLight }, line: { color: C.red, width: 1 }, rectRadius: 0.05,
  });
  s.addText("Critical Observation: Llama-2-70B accuracy collapses by nearly half (62.0% \u2192 36.5% on GSM8K).", {
    x: 0.8, y: 4.45, w: 8.4, h: 0.45,
    fontSize: 10.5, fontFace: BODY_FONT, color: C.red, bold: true, valign: "middle", margin: 0,
  });

  s.addNotes("Presenter 4: Mahid. Emphasize the dramatic degradation in Llama-2-70B. Explain that open-weight models suffer even more severe instability when subjected to intrinsic self-correction loops.");
  addFooter(s, 14);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 15 — Results: Answer Transition Dynamics
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "Answer Transition Dynamics", "Error Persistence: Why accuracy drops — net negative answer flipping (Figure 1)");

  // Embedded Figure 1 image
  s.addImage({
    path: path.join(assetsDir, "fig_transitions_breakdown.png"),
    x: 0.6, y: 1.35, w: 8.8, h: 2.6,
  });

  // Bottom analysis container
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.1, w: 8.8, h: 0.85,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });

  s.addText("THE ROOT CAUSE OF PERFORMANCE DEGRADATION", {
    x: 0.8, y: 4.18, w: 8.4, h: 0.2,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.0,
  });

  s.addText("Models flip correct answers into incorrect ones (8.9%) more frequently than they fix incorrect answers (7.6%). The self-correction prompt acts as a negative bias, inducing unwarranted self-doubt on sound reasoning.", {
    x: 0.8, y: 4.4, w: 8.4, h: 0.5,
    fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15,
  });

  s.addNotes("Presenter 4: Mahid. Analyze Figure 1 from the paper. Explain that 74.7% of answers stay unchanged, but among the answers that do change, more correct answers get corrupted (8.9%) than wrong answers get fixed (7.6%), resulting in a net negative score.");
  addFooter(s, 15);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 16 — Analysis: Multi-Agent Debate vs Self-Consistency
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "Multi-Agent Debate vs. Self-Consistency", "Why Does Self-Correction Fail?: Equal-compute comparison with simple majority voting (Table 7)");

  // Diagram image
  s.addImage({
    path: path.join(assetsDir, "fig_debate_vs_consistency.png"),
    x: 0.6, y: 1.35, w: 8.8, h: 2.65,
  });

  // Table summary at bottom
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.15, w: 8.8, h: 0.8,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });

  s.addText("EMPIRICAL FINDING AT EQUAL INFERENCE COST", {
    x: 0.8, y: 4.22, w: 8.4, h: 0.2,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.0,
  });

  s.addText("When controlling for inference cost (number of generated responses), Multi-Agent Debate achieves NO statistically significant advantage over Self-Consistency (majority voting across N parallel samples), while introducing significant latency and complexity.", {
    x: 0.8, y: 4.42, w: 8.4, h: 0.48,
    fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15,
  });

  s.addNotes("Presenter 5: Jebon. Compare Multi-Agent Debate against Self-Consistency. Explain that prior claims of debate superiority were flawed because they compared multi-agent debate against single-shot baselines rather than compute-equivalent sampling.");
  addFooter(s, 16);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 17 — Analysis: The Prompt Design Trap
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "The Prompt Design Trap", "Possible Causes: Misleading evaluation gains caused by asymmetric prompt information");

  // Embedded diagram
  s.addImage({
    path: path.join(assetsDir, "fig_prompt_trap.png"),
    x: 0.6, y: 1.35, w: 8.8, h: 2.65,
  });

  // Bottom takeaway card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.15, w: 8.8, h: 0.8,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });

  s.addText("CASE IN POINT: CONSTRAINED GENERATION (TABLE 8)", {
    x: 0.8, y: 4.22, w: 8.4, h: 0.2,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.0,
  });

  s.addText("Self-Refine evaluated on CommonGen using an initial prompt that omitted target word constraints, then re-added them in the feedback prompt. When all constraints are included in the initial prompt, 1-shot generation beats the self-correction loop.", {
    x: 0.8, y: 4.42, w: 8.4, h: 0.48,
    fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15,
  });

  s.addNotes("Presenter 5: Jebon. Explain the prompt engineering confounder in Self-Refine. Show how weak initial prompts artificially create headroom that gets credited to 'self-correction' when it was simply better prompting.");
  addFooter(s, 17);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 18 — Analysis: Case Study
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "Case Study: The Gaslighting Effect", "Error Persistence: Concrete breakdown of how self-critique corrupts sound reasoning (Figure 4)");

  // Embedded diagram of yogurt case study
  s.addImage({
    path: path.join(assetsDir, "fig_yogurt_case_study.png"),
    x: 0.6, y: 1.35, w: 8.8, h: 2.65,
  });

  // Analysis card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.15, w: 8.8, h: 0.8,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1 }, rectRadius: 0.08,
  });

  s.addText("PSYCHOLOGY OF LLM SELF-DOUBT", {
    x: 0.8, y: 4.22, w: 8.4, h: 0.2,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.0,
  });

  s.addText("When prompted 'Review your answer and find problems', the model assumes the user knows the prior response was wrong. It hallucinated an erroneous edge case (4 yogurts for 2 days) and replaced its correct $75 calculation with $150.", {
    x: 0.8, y: 4.42, w: 8.4, h: 0.48,
    fontSize: 10, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.15,
  });

  s.addNotes("Presenter 5: Jebon. Walk the audience through the real example from GSM8K. Explain step-by-step how the model solved the problem perfectly in Round 1, but overcomplicated and hallucinated a wrong answer in Round 2.");
  addFooter(s, 18);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 19 — Analysis: The Verification Barrier
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "The Verification Barrier", "Underlying Mechanism: Why intrinsic verification is as hard as initial generation");

  const cards = [
    {
      num: "1",
      title: "Shared Parameter Bounds",
      badge: "Knowledge Parity",
      text: "The critic and generator share the exact same weights and representations. If the model lacks the knowledge to generate the correct step initially, it lacks the knowledge to verify that step.",
    },
    {
      num: "2",
      title: "Negative Prompt Bias",
      badge: "Compliance Bias",
      text: "Instruction-tuned LLMs are optimized to follow user instructions. Prompts asking 'find errors' bias the model toward modifying answers even when the original derivation was completely correct.",
    },
    {
      num: "3",
      title: "Lack of Grounded Verifiers",
      badge: "No Grounding",
      text: "Without an external ground-truth oracle, deterministic code interpreter (e.g. Python), or reward model, the model cannot distinguish genuine logical errors from valid steps.",
    },
  ];

  cards.forEach((c, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.35, w: 2.8, h: 3.5,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
    });
    addBadgeCircle(s, cx + 0.2, 1.55, c.num, 0.35, C.crimson, C.white);
    s.addText(c.title, {
      x: cx + 0.2, y: 2.05, w: 2.4, h: 0.5,
      fontSize: 14, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.2, y: 2.6, w: 2.4, h: 0.25,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.05,
    });
    s.addText(c.badge, {
      x: cx + 0.2, y: 2.6, w: 2.4, h: 0.25,
      fontSize: 9, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(c.text, {
      x: cx + 0.2, y: 3.0, w: 2.4, h: 1.65,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Presenter 5: Jebon. Synthesize the theoretical barriers. Explain that generation and verification are fundamentally bounded by the same model capacity, making unguided self-verification inherently unstable.");
  addFooter(s, 19);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 20 — Conclusion: Key Takeaways
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Key Takeaways", "Summary: Core conclusions established by Huang et al. (ICLR 2024)");

  const takeaways = [
    {
      num: "1",
      title: "Intrinsic Self-Correction Does Not Work for Reasoning",
      text: "Without external feedback, LLMs cannot reliably identify and correct their reasoning errors. Performance consistently degrades across benchmarks and model families.",
    },
    {
      num: "2",
      title: "Prior Claims Were Methodological Artifacts",
      text: "Reported gains in earlier studies were driven by oracle label leakage (telling the model when to stop), unfair compute baselines, or incomplete initial prompts.",
    },
    {
      num: "3",
      title: "External Feedback is Essential for Reliable Correction",
      text: "Self-correction is highly effective when paired with external grounding signals, such as code execution environments, calculators, unit tests, or human verifiers.",
    },
  ];

  takeaways.forEach((t, i) => {
    const cy = 1.35 + i * 1.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: cy, w: 8.8, h: 0.98,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });
    addBadgeCircle(s, 0.85, cy + 0.25, t.num, 0.42, C.crimson, C.white);
    s.addText(t.title, {
      x: 1.45, y: cy + 0.15, w: 7.7, h: 0.28,
      fontSize: 13, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addText(t.text, {
      x: 1.45, y: cy + 0.45, w: 7.7, h: 0.45,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Presenter 6: Refayet. Summarize the paper's three main conclusions. Emphasize that while unguided intrinsic correction fails, external-feedback correction remains a vital tool for AI engineering.");
  addFooter(s, 20);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 21 — Conclusion: Study Limitations
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Study Limitations", "Scope & Boundaries: Contextualizing the empirical boundaries of this research");

  const leftW = 4.25;
  // Left card: Scope limitations
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.35, w: leftW, h: 3.5,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Scope Limitations", {
    x: 0.85, y: 1.5, w: leftW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const scopePoints = [
    { title: "Reasoning-Specific Scope", desc: "Focuses exclusively on reasoning benchmarks (math, logic, multi-hop QA). Does not evaluate stylistic writing, translation, or text summarization." },
    { title: "Prompt-Only Paradigm", desc: "Examines frozen, off-the-shelf LLMs via prompting. Does not evaluate fine-tuned verifier models or RL-trained self-correction agents." },
    { title: "Temporal Model Snapshot", desc: "Evaluated on models available in mid-to-late 2023 (GPT-3.5, GPT-4, Llama-2). Newer reasoning-focused models (e.g. OpenAI o1/o3, Gemini 2.0 Flash Thinking) warrant future study." },
  ];

  scopePoints.forEach((sp, i) => {
    const cy = 1.9 + i * 0.9;
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.crimson } });
    s.addText(sp.title, { x: 1.05, y: cy, w: leftW - 0.7, h: 0.22, fontSize: 11, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(sp.desc, { x: 1.05, y: cy + 0.22, w: leftW - 0.7, h: 0.65, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15 });
  });

  // Right card: Methodological considerations
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.35, w: leftW, h: 3.5,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Methodological Boundaries", {
    x: 5.4, y: 1.5, w: leftW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const methodPoints = [
    { title: "HotpotQA Sample Size", desc: "HotpotQA closed-book evaluation was restricted to 100 samples due to API cost constraints, limiting statistical power on multi-hop QA." },
    { title: "Prompt Variation Sensitivity", desc: "While multiple feedback prompt templates were tested, the space of all possible prompt variations cannot be exhaustively evaluated." },
    { title: "Closed-Book Assumptions", desc: "Models operated without retrieval augmentation (RAG), which could provide factual grounding for knowledge verification." },
  ];

  methodPoints.forEach((mp, i) => {
    const cy = 1.9 + i * 0.9;
    s.addShape(pres.shapes.OVAL, { x: 5.4, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.crimson } });
    s.addText(mp.title, { x: 5.6, y: cy, w: leftW - 0.7, h: 0.22, fontSize: 11, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(mp.desc, { x: 5.6, y: cy + 0.22, w: leftW - 0.7, h: 0.65, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15 });
  });

  s.addNotes("Presenter 6: Refayet. Review study limitations. Discuss reasoning domain scope, prompt-only constraints, and the distinction between frozen LLM prompting and newer RL-based test-time compute reasoning.");
  addFooter(s, 21);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 22 — Conclusion: Future Directions & Fair Standards
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Future Directions & Fair Standards", "Future Work: Constructive pathways forward and recommendations for fair evaluation");

  const directions = [
    {
      num: "1",
      title: "Tool-Augmented Verification",
      badge: "Deterministic Execution",
      desc: "Integrate deterministic Python interpreters, symbolic math solvers, and SQL execution engines to verify calculations externally.",
    },
    {
      num: "2",
      title: "Learned Verifiers & Reward Models",
      badge: "Specialized Discriminators",
      desc: "Train separate specialized discriminator models (e.g. Process Reward Models / PRMs) to evaluate step-by-step reasoning quality.",
    },
    {
      num: "3",
      title: "Training-Time Self-Correction",
      badge: "RL & Search",
      desc: "Train models via Reinforcement Learning with search (e.g. Monte Carlo Tree Search, test-time compute) rather than superficial prompt loops.",
    },
    {
      num: "4",
      title: "Fair Evaluation Standards",
      badge: "Research Best Practices",
      desc: "Mandate equal inference-cost baselines (Self-Consistency), prohibit oracle leakage, and ensure baseline prompts include all constraints.",
    },
  ];

  const cardW = 4.25;
  const cardH = 1.6;
  const startX = 0.6;
  const startY = 1.35;
  const gapX = 0.3;
  const gapY = 0.25;

  directions.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = startX + col * (cardW + gapX);
    const cy = startY + row * (cardH + gapY);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });

    s.addText(d.title, {
      x: cx + 0.2, y: cy + 0.15, w: 2.5, h: 0.3,
      fontSize: 13.5, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + cardW - 1.8, y: cy + 0.15, w: 1.6, h: 0.24,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04,
    });
    s.addText(d.badge, {
      x: cx + cardW - 1.8, y: cy + 0.15, w: 1.6, h: 0.24,
      fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addText(d.desc, {
      x: cx + 0.2, y: cy + 0.55, w: cardW - 0.4, h: 0.95,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Presenter 6: Refayet. Present constructive future directions. Emphasize tool augmentation (code sandboxes), trained PRM verifiers, and the authors' proposed standards for evaluating future self-correction claims.");
  addFooter(s, 22);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 23 — References
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "References", "References", "Academic literature and baseline studies cited in this presentation (IEEE Format)");

  const refs = [
    { num: "[1]", text: "J. Huang, X. Chen, S. Mishra, H. S. Zheng, A. W. Yu, X. Song, and D. Zhou, \"Large Language Models Cannot Self-Correct Reasoning Yet,\" in Proc. International Conference on Learning Representations (ICLR), 2024." },
    { num: "[2]", text: "G. Kim, P. Baldi, and S. McAleer, \"Language Models Can Solve Computer Tasks,\" in Advances in Neural Information Processing Systems (NeurIPS), vol. 36, 2023." },
    { num: "[3]", text: "N. Shinn, F. Cassano, A. Gopinath, K. Narasimhan, and S. Yao, \"Reflexion: Language Agents with Verbal Reinforcement Learning,\" in Advances in Neural Information Processing Systems (NeurIPS), vol. 36, 2023." },
    { num: "[4]", text: "A. Madaan, N. Tandon, P. Gupta, et al., \"Self-Refine: Iterative Refinement with Self-Feedback,\" in Advances in Neural Information Processing Systems (NeurIPS), vol. 36, 2023." },
    { num: "[5]", text: "Y. Du, S. Li, A. Torralba, J. B. Tenenbaum, and I. Mordatch, \"Improving Factuality and Reasoning in Language Models through Multiagent Debate,\" arXiv preprint arXiv:2305.14325, 2023." },
    { num: "[6]", text: "X. Wang, J. Wei, D. Schuurmans, et al., \"Self-Consistency Improves Chain of Thought Reasoning in Language Models,\" in Proc. International Conference on Learning Representations (ICLR), 2023." },
    { num: "[7]", text: "K. Cobbe, V. Kosaraju, M. Bavarian, et al., \"Training Verifiers to Solve Math Word Problems,\" arXiv preprint arXiv:2110.14168, 2021." },
  ];

  refs.forEach((r, i) => {
    const cy = 1.35 + i * 0.52;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: cy, w: 8.8, h: 0.44,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 0.75 }, rectRadius: 0.05,
    });
    s.addText(r.num, {
      x: 0.75, y: cy, w: 0.5, h: 0.44,
      fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true, valign: "middle", margin: 0,
    });
    s.addText(r.text, {
      x: 1.3, y: cy, w: 7.9, h: 0.44,
      fontSize: 9, fontFace: BODY_FONT, color: C.slate, valign: "middle", margin: 0,
    });
  });

  s.addNotes("References: Complete IEEE numbered bibliography of all cited foundational and comparative papers.");
  addFooter(s, 23);
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 24 — Thank You & Questions
// ══════════════════════════════════════════════════════════════════════════
{
  const s = createSlide();
  addSlideHeading(s, "Thank You & Questions", "Thank You & Questions", "Discussion, Q&A, and Group Acknowledgments");

  // Left card: Q&A Prompts
  const leftW = 4.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.35, w: leftW, h: 3.5,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.5 }, rectRadius: 0.1,
  });

  s.addText("Open Questions for Discussion", {
    x: 0.85, y: 1.55, w: leftW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const qList = [
    "1. Do newer reasoning models with test-time compute (e.g. OpenAI o1/o3, Gemini 2.0 Flash Thinking) overcome this verification barrier?",
    "2. How can we best integrate lightweight deterministic verifiers (e.g. Python REPL) into general AI agent architectures?",
    "3. Is true intrinsic self-correction theoretically possible without external ground truth?",
  ];

  qList.forEach((q, i) => {
    const cy = 2.0 + i * 0.85;
    s.addText(q, {
      x: 0.85, y: cy, w: leftW - 0.5, h: 0.75,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.15, bold: true,
    });
  });

  // Right card: Presenter Summary & Contact
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.35, w: leftW, h: 3.5,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Group Presenters & Sections", {
    x: 5.4, y: 1.55, w: leftW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
  });

  const presList = [
    { name: "Nafis Islam Kabbo (2303180)", sec: "1. Introduction" },
    { name: "Srijon (2303179)", sec: "2. Background & Related Work" },
    { name: "Anindo (2303181)", sec: "3. Methodology" },
    { name: "Mahid (2303127)", sec: "4. Results" },
    { name: "Jebon (2303160)", sec: "5. Analysis" },
    { name: "Refayet (2303148)", sec: "6. Conclusion & Future Work" },
  ];

  presList.forEach((p, i) => {
    const cy = 1.95 + i * 0.45;
    s.addText(p.name, {
      x: 5.4, y: cy, w: 2.2, h: 0.35,
      fontSize: 10, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0, valign: "middle",
    });
    s.addText(p.sec, {
      x: 7.4, y: cy, w: 1.8, h: 0.35,
      fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.4, y: 4.15, w: leftW - 0.5, h: 0.45,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.05,
  });
  s.addText("We invite questions and comments from the audience.", {
    x: 5.5, y: 4.15, w: leftW - 0.7, h: 0.45,
    fontSize: 10, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", italic: true, margin: 0,
  });

  s.addNotes("Conclude the presentation. Thank the professor and audience, invite questions, and initiate discussion on the open questions.");
  addFooter(s, 24);
}

// ── Export Output File ──
const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v4.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log(`Presentation v4 generated successfully at: ${outPath}`))
  .catch((err) => console.error("Error generating presentation:", err));
