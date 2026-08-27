const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Group Presentation";
pres.title = "Large Language Models Cannot Self-Correct Reasoning Yet";

// Design Tokens (Deliberate Academic Palette)
const C = {
  white: "FFFFFF",
  slateDark: "0F172A",     // Primary dark text #0F172A
  slate: "1E293B",         // Main body text #1E293B
  muted: "64748B",         // Muted subtitles and labels #64748B
  mutedLight: "CBD5E1",    // Light borders #CBD5E1
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
const FOOTER_TEXT = "Large Language Models Cannot Self-Correct Reasoning Yet | ICLR 2024";

function pad(n) {
  return String(n).padStart(2, "0");
}

// Common Slide Decorators
function addFooter(slide, num) {
  slide.addText(FOOTER_TEXT, {
    x: 0.6, y: 5.18, w: 7.2, h: 0.3,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "left", margin: 0,
  });
  slide.addText(`${pad(num)}/${TOTAL}`, {
    x: 8.0, y: 5.18, w: 1.4, h: 0.3,
    fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "right", margin: 0, bold: true,
  });
}

function addTopicHeader(slide, topic) {
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
    fontSize: 23, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
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

// ==========================================================================
// SLIDE 01: Title Slide
// ==========================================================================
{
  const s = createSlide();

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.45, w: 2.6, h: 0.35,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1 }, rectRadius: 0.08,
  });
  s.addText("ICLR 2024 CONFERENCE PAPER", {
    x: 0.6, y: 0.45, w: 2.6, h: 0.35,
    fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0, charSpacing: 1.0,
  });

  s.addText("Large Language Models\nCannot Self-Correct Reasoning Yet", {
    x: 0.6, y: 0.95, w: 8.8, h: 1.45,
    fontSize: 33, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "left", margin: 0,
    lineSpacingMultiple: 1.08,
  });

  s.addText("Jie Huang (UIUC), Xinyun Chen, Swaroop Mishra, Huaixiu Steven Zheng, Adams Wei Yu, Xinying Song, Denny Zhou (Google DeepMind)", {
    x: 0.6, y: 2.55, w: 8.8, h: 0.45,
    fontSize: 10.5, fontFace: BODY_FONT, color: C.muted, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 3.15, w: 8.8, h: 1.8,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Group Presentation | Student Presenters", {
    x: 0.85, y: 3.3, w: 8.3, h: 0.25,
    fontSize: 11, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const students = [
    "1. Nafis Islam Kabbo (2303180)",
    "2. Srijon (2303179)",
    "3. Anindo (2303181)",
    "4. Mahid (2303127)",
    "5. Jebon (2303160)",
    "6. Refayet (2303148)",
  ];

  students.forEach((st, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = 0.85 + col * 2.8;
    const cy = 3.7 + row * 0.52;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: 2.6, h: 0.42,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.75 }, rectRadius: 0.06,
    });
    s.addText(st, {
      x: cx + 0.12, y: cy, w: 2.4, h: 0.42,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, valign: "middle", margin: 0, bold: true,
    });
  });

  s.addNotes("Speaker 1 (Nafis Islam Kabbo): Welcome the professor and audience. Introduce the paper Large Language Models Cannot Self-Correct Reasoning Yet from ICLR 2024 by Google DeepMind and UIUC researchers, and introduce the six group members.");
  addFooter(s, 1);
}

// ==========================================================================
// SLIDE 02: Presentation Outline
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "Overview", "Presentation Outline", "Core narrative structure and argument flow across six sections");

  const outlineCards = [
    {
      num: "1",
      title: "Introduction",
      presenter: "Nafis Islam Kabbo",
      flow: "Motivation -> Research Problem -> Paradox",
      desc: "Autoregressive generation, multi-step reasoning vulnerability, and the central self-correction question.",
    },
    {
      num: "2",
      title: "Background & Literature",
      presenter: "Srijon",
      flow: "Prior Frameworks -> Intrinsic vs External -> Confounders",
      desc: "Reviewing RCI, Reflexion, Self-Refine, and Multi-Agent Debate while isolating external supervision.",
    },
    {
      num: "3",
      title: "Methodology",
      presenter: "Anindo",
      flow: "Benchmarks -> Evaluated Models -> Experimental Controls",
      desc: "GSM8K, CSQA, and HotpotQA tasks across GPT-3.5, GPT-4, GPT-4-Turbo, and Llama-2-70B.",
    },
    {
      num: "4",
      title: "Results",
      presenter: "Mahid",
      flow: "Core Finding -> Benchmark Drops -> Transition Dynamics",
      desc: "Empirical proof of accuracy degradation and net-negative answer flipping without external feedback.",
    },
    {
      num: "5",
      title: "Analysis",
      presenter: "Jebon",
      flow: "Debate Cost Parity -> Prompt Trap -> Verification Barrier",
      desc: "Why Self-Consistency matches Multi-Agent Debate, prompt artifacts, and shared model parameter limits.",
    },
    {
      num: "6",
      title: "Conclusion & Future Work",
      presenter: "Refayet",
      flow: "Key Takeaways -> Study Scope -> Fair Standards",
      desc: "Summary of claims, external tool integration, process verifiers, and guidelines for fair evaluation.",
    },
  ];

  const cardW = 4.25;
  const cardH = 1.08;
  const startX = 0.6;
  const startY = 1.32;
  const gapX = 0.3;
  const gapY = 0.18;

  outlineCards.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = startX + col * (cardW + gapX);
    const cy = startY + row * (cardH + gapY);

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });

    addBadgeCircle(s, cx + 0.15, cy + 0.15, c.num, 0.35, C.crimson, C.white);

    s.addText(c.title, {
      x: cx + 0.58, y: cy + 0.1, w: cardW - 1.8, h: 0.24,
      fontSize: 12.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });

    s.addText(c.presenter, {
      x: cx + cardW - 1.6, y: cy + 0.1, w: 1.45, h: 0.24,
      fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "right", margin: 0,
    });

    s.addText(c.flow, {
      x: cx + 0.58, y: cy + 0.35, w: cardW - 0.7, h: 0.2,
      fontSize: 9, fontFace: BODY_FONT, color: C.crimsonDark, bold: true, margin: 0,
    });

    s.addText(c.desc, {
      x: cx + 0.58, y: cy + 0.58, w: cardW - 0.7, h: 0.44,
      fontSize: 9, fontFace: BODY_FONT, color: C.muted, margin: 0, valign: "top",
    });
  });

  s.addNotes("Speaker 1 (Nafis Islam Kabbo): Walk the audience through the six presentation sections and introduce each presenters topic responsibility.");
  addFooter(s, 2);
}

// ==========================================================================
// SLIDE 03: Introduction: Motivation
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "Large Language Models & Reasoning", "Motivation: Sequential derivation in multi-step reasoning problems");

  // Visual diagram of Autoregressive CoT Reasoning
  try {
    s.addImage({
      path: path.join(assetsDir, "fig_autoregressive_cot.png"),
      x: 0.6, y: 1.3, w: 8.8, h: 2.6,
    });
  } catch (e) {}

  // Bottom Takeaway Card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.05, w: 8.8, h: 0.9,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1 }, rectRadius: 0.08,
  });
  s.addText("THE CORE VULNERABILITY: COMPOUNDING REASONING ERRORS", {
    x: 0.85, y: 4.15, w: 8.3, h: 0.22,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.0,
  });
  s.addText("Because autoregressive generation is strictly sequential, an early arithmetic or logical slip corrupts every following derivation step. Without external verification, the model cannot detect when its chain has broken.", {
    x: 0.85, y: 4.4, w: 8.3, h: 0.48,
    fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, margin: 0, lineSpacingMultiple: 1.15,
  });

  s.addNotes("Speaker 1 (Nafis Islam Kabbo): Explain how autoregressive generation creates a domino effect. When an LLM solves a multi-step math problem, an error in step two inevitably poisons steps three, four, and the final answer.");
  addFooter(s, 3);
}

// ==========================================================================
// SLIDE 04: Introduction: Concept of Self-Correction
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "The Concept of Self-Correction", "Research Problem: Can models autonomously detect and repair reasoning flaws in post-processing?");

  const steps = [
    { num: "1", title: "Initial Generation", badge: "Draft Answer", desc: "Model receives the prompt and generates an initial reasoning chain and solution." },
    { num: "2", title: "Self-Critique Prompt", badge: "Reflection Step", desc: "System prompts the model to review its reasoning and locate potential errors." },
    { num: "3", title: "Refined Revision", badge: "Updated Answer", desc: "Model modifies its reasoning path to output an updated final response." },
  ];

  steps.forEach((st, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.32, w: 2.8, h: 1.85,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });
    addBadgeCircle(s, cx + 0.15, 1.48, st.num, 0.32, C.crimson, C.white);
    s.addText(st.title, {
      x: cx + 0.55, y: 1.48, w: 2.1, h: 0.3,
      fontSize: 12.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.15, y: 1.85, w: 2.5, h: 0.22,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04,
    });
    s.addText(st.badge, {
      x: cx + 0.15, y: 1.85, w: 2.5, h: 0.22,
      fontSize: 8.5, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(st.desc, {
      x: cx + 0.15, y: 2.15, w: 2.5, h: 0.95,
      fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  // Animated Loop GIF on bottom left
  try {
    s.addImage({
      path: path.join(assetsDir, "loop_animation.gif"),
      x: 0.6, y: 3.32, w: 1.5, h: 1.5,
    });
  } catch (e) {}

  // Right Summary Card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.3, y: 3.32, w: 7.1, h: 1.5,
    fill: { color: C.amberLight }, line: { color: C.amber, width: 1 }, rectRadius: 0.08,
  });
  s.addText("The High Promise vs. Practical Reality", {
    x: 2.55, y: 3.45, w: 6.6, h: 0.25,
    fontSize: 13, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
  });
  s.addText([
    { text: "• Theoretical Promise: If models can self-correct, autonomous systems can fix errors without human supervision.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Practical Reality: Does an LLM have the intrinsic ability to recognize its own errors without an external verifier?", options: { fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true } },
  ], { x: 2.55, y: 3.75, w: 6.6, h: 0.98, margin: 0, valign: "top" });

  s.addNotes("Speaker 1 (Nafis Islam Kabbo): Walk through the 3-step self-correction process. Contrast the theoretical promise of autonomous refinement with the practical reality that models must judge themselves.");
  addFooter(s, 4);
}

// ==========================================================================
// SLIDE 05: Introduction: The Central Research Paradox
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "1. Introduction", "The Central Research Question", "The Self-Correction Paradox: Can an LLM fix its reasoning without external signals?");

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.32, w: 8.8, h: 1.3,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.5 }, rectRadius: 0.1,
  });

  s.addText("THE CENTRAL RESEARCH PARADOX", {
    x: 0.85, y: 1.45, w: 8.3, h: 0.22,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.5,
  });

  s.addText('"If an LLM has the intrinsic knowledge and reasoning capability to correct a mistake, why did it not produce the correct answer on its first attempt?"', {
    x: 0.85, y: 1.72, w: 8.3, h: 0.8,
    fontSize: 15, fontFace: TITLE_FONT, color: C.slateDark, bold: true, italic: true, margin: 0,
  });

  const subW = 4.25;
  // Card 1: Intrinsic Definition
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.8, w: subW, h: 2.05,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });
  s.addText("Intrinsic Self-Correction (Paper Focus)", {
    x: 0.8, y: 2.95, w: subW - 0.4, h: 0.28,
    fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });
  s.addText([
    { text: "• Model relies strictly on its internal frozen parameters", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Zero external feedback: No oracle labels, humans, or tool outputs", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Core Investigation: Can a frozen model reliably improve its reasoning?", options: { fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true } },
  ], { x: 0.8, y: 3.3, w: subW - 0.4, h: 1.45, margin: 0, valign: "top" });

  // Card 2: External Feedback Definition
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 2.8, w: subW, h: 2.05,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });
  s.addText("External Feedback (Tool / Oracle Assisted)", {
    x: 5.35, y: 2.95, w: subW - 0.4, h: 0.28,
    fontSize: 13, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
  });
  s.addText([
    { text: "• Model receives outside verification, such as Python REPL execution", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Ground truth labels or unit tests guide the correction attempt", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Highly effective in practice, but NOT intrinsic self-correction", options: { fontSize: 10, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 5.35, y: 3.3, w: subW - 0.4, h: 1.45, margin: 0, valign: "top" });

  s.addNotes("Speaker 1 (Nafis Islam Kabbo): Introduce the central paradox. Pose the rhetorical question to the audience: If the model knew enough to fix its error, why did it fail in the first place? Hand over to Srijon.");
  addFooter(s, 5);
}

// ==========================================================================
// SLIDE 06: Background & Literature: Prior Frameworks
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Prior Self-Correction Frameworks", "Previous Findings: Key paradigms in literature claiming self-correction success");

  const methods = [
    {
      name: "RCI",
      cite: "Kim et al. (NeurIPS 2023)",
      badge: "Recursive Critique",
      desc: "Recursive Criticism and Improvement. The model critiques its output, then revises based on its own critique.",
    },
    {
      name: "Reflexion",
      cite: "Shinn et al. (NeurIPS 2023)",
      badge: "Verbal Memory",
      desc: "Maintains verbal reflections in memory across attempts to guide subsequent trial iterations.",
    },
    {
      name: "Self-Refine",
      cite: "Madaan et al. (NeurIPS 2023)",
      badge: "Iterative Refine",
      desc: "Multi-turn framework where an LLM generates structured feedback on its output and refines iteratively.",
    },
    {
      name: "Multi-Agent Debate",
      cite: "Du et al. (2023)",
      badge: "Agent Consensus",
      desc: "Multiple LLM instances propose solutions, critique peers, and debate across rounds to reach consensus.",
    },
  ];

  const cardW = 4.25;
  const cardH = 1.58;
  const startX = 0.6;
  const startY = 1.32;
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
      fontSize: 15, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
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
      x: cx + 0.2, y: cy + 0.46, w: cardW - 0.4, h: 0.22,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, margin: 0, italic: true,
    });

    s.addText(m.desc, {
      x: cx + 0.2, y: cy + 0.72, w: cardW - 0.4, h: 0.78,
      fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Speaker 2 (Srijon): Review the four major self-correction frameworks from 2023 literature. Point out how each paper seemed to demonstrate that models could improve their own reasoning.");
  addFooter(s, 6);
}

// ==========================================================================
// SLIDE 07: Background & Literature: Intrinsic vs External Feedback
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Intrinsic vs. External Feedback", "Research Gap: Isolating internal model capabilities from external supervision");

  try {
    s.addImage({
      path: path.join(assetsDir, "fig_intrinsic_vs_external.png"),
      x: 0.6, y: 1.3, w: 8.8, h: 3.5,
    });
  } catch (e) {}

  s.addNotes("Speaker 2 (Srijon): Contrast intrinsic self-correction against external tool feedback using the taxonomy diagram. Explain that tools provide genuine ground truth signals, whereas closed-loop reflection cannot escape the models knowledge bounds.");
  addFooter(s, 7);
}

// ==========================================================================
// SLIDE 08: Background & Literature: Flaws in Prior Evaluations
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "2. Background & Related Work", "Flaws in Prior Evaluations", "Critical Analysis: Summary of evaluation confounders identified by Huang et al. (Table 1)");

  const tableRows = [
    [
      { text: "Method", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10.5, fontFace: TITLE_FONT } },
      { text: "Identified Flaw", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10.5, fontFace: TITLE_FONT } },
      { text: "Mechanism of Distortion", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10.5, fontFace: TITLE_FONT } },
      { text: "Paper Ref.", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10.5, fontFace: TITLE_FONT, align: "center" } },
    ],
    [
      { text: "RCI\n(Kim et al., 2023)", options: { bold: true, fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Oracle Label Leakage", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.red, bold: true } },
      { text: "Model only corrects when told its answer is wrong, acting as an oracle filter.", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Section 3", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
    ],
    [
      { text: "Reflexion\n(Shinn et al., 2023)", options: { bold: true, fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Oracle Label Leakage", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.red, bold: true } },
      { text: "Reflections trigger exclusively upon receiving environment failure signals.", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Section 3", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, align: "center" } },
    ],
    [
      { text: "Multi-Agent Debate\n(Du et al., 2023)", options: { bold: true, fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Unfair Inference Cost", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.amber, bold: true } },
      { text: "Compared multi-agent debate against single-shot baselines rather than equal compute sampling.", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Section 4", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
    ],
    [
      { text: "Self-Refine\n(Madaan et al., 2023)", options: { bold: true, fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Incomplete Initial Prompt", options: { fontSize: 10, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, color: C.amber, bold: true } },
      { text: "Initial prompt omitted task constraints that were only added in the feedback prompt.", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Section 5", options: { fontSize: 9.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, align: "center" } },
    ],
  ];

  s.addTable(tableRows, {
    x: 0.6, y: 1.32, w: 8.8,
    colW: [1.8, 2.0, 4.0, 1.0],
    rowH: [0.38, 0.62, 0.62, 0.62, 0.62],
    border: { type: "solid", pt: 0.5, color: C.cardBorder },
    margin: [4, 6, 4, 6],
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.45, w: 8.8, h: 0.48,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.5 }, rectRadius: 0.05,
  });
  s.addText("Takeaway: When these methodological confounders are eliminated, reported reasoning gains disappear.", {
    x: 0.8, y: 4.45, w: 8.4, h: 0.48,
    fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true, valign: "middle", margin: 0,
  });

  s.addNotes("Speaker 2 (Srijon): Walk through Table 1 from the paper. Detail the four evaluation confounders that created the illusion of progress. Hand over to Anindo.");
  addFooter(s, 8);
}

// ==========================================================================
// SLIDE 09: Methodology: Tasks & Benchmarks
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Evaluation Reasoning Benchmarks", "Tasks: Standard reasoning datasets spanning mathematics, commonsense logic, and multi-hop QA");

  const benchmarks = [
    {
      name: "GSM8K",
      size: "1,319",
      unit: "Math Problems",
      badge: "Grade School Math",
      desc: "Requires 2 to 8 steps of arithmetic reasoning. Tests tracking numerical state and logical constraints.",
      prior: "Kim et al. reported +7% with oracle labels.",
    },
    {
      name: "CommonSenseQA",
      size: "1,221",
      unit: "Multiple-Choice",
      badge: "Commonsense Logic",
      desc: "5-choice questions requiring real-world knowledge with subtle semantic distractors.",
      prior: "Kim et al. reported +15% with oracle guidance.",
    },
    {
      name: "HotpotQA",
      size: "100",
      unit: "Multi-Hop Samples",
      badge: "Fact Synthesis",
      desc: "Closed-book multi-hop questions requiring combining facts across Wikipedia sources (Exact Match).",
      prior: "Shinn et al. reported gains via reflection.",
    },
  ];

  benchmarks.forEach((b, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.32, w: 2.8, h: 3.55,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
    });

    s.addText(b.size, {
      x: cx, y: 1.48, w: 2.8, h: 0.45,
      fontSize: 28, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0,
    });
    s.addText(b.unit, {
      x: cx, y: 1.92, w: 2.8, h: 0.22,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0,
    });

    s.addText(b.name, {
      x: cx, y: 2.2, w: 2.8, h: 0.3,
      fontSize: 13.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.3, y: 2.52, w: 2.2, h: 0.22,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04,
    });
    s.addText(b.badge, {
      x: cx + 0.3, y: 2.52, w: 2.2, h: 0.22,
      fontSize: 8.5, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", bold: true, margin: 0,
    });

    s.addText(b.desc, {
      x: cx + 0.2, y: 2.82, w: 2.4, h: 1.1,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.15, y: 4.05, w: 2.5, h: 0.65,
      fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.5 }, rectRadius: 0.05,
    });
    s.addText(b.prior, {
      x: cx + 0.2, y: 4.08, w: 2.4, h: 0.58,
      fontSize: 9, fontFace: BODY_FONT, color: C.crimsonDark, italic: true, valign: "middle", margin: 0,
    });
  });

  s.addNotes("Speaker 3 (Anindo): Introduce the three benchmark datasets. Explain why testing math, commonsense logic, and multi-hop QA ensures broad coverage of reasoning domains.");
  addFooter(s, 9);
}

// ==========================================================================
// SLIDE 10: Methodology: Models & Setup (Points Only)
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Models & Experimental Controls", "Setup: Evaluation parameters across leading proprietary and open-weight LLMs");

  const colW = 4.25;

  // Left card: Evaluated Models (Points Only)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.32, w: colW, h: 3.55,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Evaluated Models", {
    x: 0.85, y: 1.5, w: colW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const modelsList = [
    { title: "GPT-3.5-Turbo", sub: "Snapshot: gpt-3.5-turbo-0613" },
    { title: "GPT-4", sub: "Snapshot: 2023/08/29 production build" },
    { title: "GPT-4-Turbo", sub: "Snapshot: gpt-4-1106-preview" },
    { title: "Llama-2-70B-Chat", sub: "Open-weight 70B parameter baseline" },
  ];

  modelsList.forEach((m, i) => {
    const cy = 1.92 + i * 0.72;
    addBadgeCircle(s, 0.85, cy + 0.05, String(i + 1), 0.28, C.slateDark, C.white);
    s.addText(m.title, {
      x: 1.25, y: cy, w: colW - 1.5, h: 0.26,
      fontSize: 12, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addText(m.sub, {
      x: 1.25, y: cy + 0.26, w: colW - 1.5, h: 0.22,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.muted, italic: true, margin: 0,
    });
  });

  // Right card: Experimental Controls & Rigor (Points Only)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.32, w: colW, h: 3.55,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Experimental Controls & Rigor", {
    x: 5.4, y: 1.5, w: colW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const controls = [
    "Zero-shot and few-shot Chain-of-Thought (CoT) prompting",
    "Temperature: 1.0 (GPT models), 0.7 (Llama-2-70B)",
    "Standardized 2-round correction limit per problem",
    "Generic feedback prompts without hint leakage",
    "Controlled comparison: Intrinsic vs Oracle-guided",
  ];

  controls.forEach((ct, i) => {
    const cy = 1.95 + i * 0.56;
    s.addShape(pres.shapes.OVAL, {
      x: 5.4, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.crimson },
    });
    s.addText(ct, {
      x: 5.62, y: cy, w: colW - 0.9, h: 0.45,
      fontSize: 10.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top",
    });
  });

  s.addNotes("Speaker 3 (Anindo): Present the models and experimental setup concisely. Highlight the use of four distinct LLMs and rigorous temperature and prompt controls.");
  addFooter(s, 10);
}

// ==========================================================================
// SLIDE 11: Methodology: Prompting Protocols
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "3. Methodology", "Prompting Procedures & Protocols", "Evaluation: Contrasting the step-by-step workflow of oracle vs intrinsic correction");

  const steps = [
    { num: "1", title: "Initial Generation", text: "Model generates draft reasoning chain and answer." },
    { num: "2", title: "Self-Critique", text: "Feedback prompt asks model to critique its logic." },
    { num: "3", title: "Revised Output", text: "Model generates a revised reasoning path." },
    { num: "4", title: "Iteration Round 2", text: "Process repeats for a second round." },
  ];

  steps.forEach((st, i) => {
    const cx = 0.6 + i * 2.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.32, w: 2.05, h: 1.3,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });
    addBadgeCircle(s, cx + 0.15, 1.48, st.num, 0.28, C.crimson, C.white);
    s.addText(st.title, {
      x: cx + 0.5, y: 1.48, w: 1.45, h: 0.28,
      fontSize: 10.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addText(st.text, {
      x: cx + 0.15, y: 1.82, w: 1.75, h: 0.75,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top",
    });
    if (i < 3) {
      s.addText("->", {
        x: cx + 2.05, y: 1.8, w: 0.2, h: 0.4,
        fontSize: 14, fontFace: BODY_FONT, color: C.muted, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  const botW = 4.25;
  // Oracle container
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.82, w: botW, h: 2.05,
    fill: { color: C.greenLight }, line: { color: C.green, width: 1 }, rectRadius: 0.08,
  });
  s.addText("With Oracle Feedback (Prior Flawed Setup)", {
    x: 0.85, y: 2.95, w: botW - 0.5, h: 0.25,
    fontSize: 12.5, fontFace: TITLE_FONT, color: C.green, bold: true, margin: 0,
  });
  s.addText([
    { text: "• External verifier checks answer correctness after Step 1.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Model is told WHEN its answer is wrong to trigger Step 2.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Correct answers are never touched, artificially inflating scores.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 0.85, y: 3.25, w: botW - 0.5, h: 1.5, margin: 0, valign: "top" });

  // Intrinsic container
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 2.82, w: botW, h: 2.05,
    fill: { color: C.redLight }, line: { color: C.red, width: 1 }, rectRadius: 0.08,
  });
  s.addText("Intrinsic Self-Correction (Realistic Setup)", {
    x: 5.4, y: 2.95, w: botW - 0.5, h: 0.25,
    fontSize: 12.5, fontFace: TITLE_FONT, color: C.red, bold: true, margin: 0,
  });
  s.addText([
    { text: "• Zero external signals provided. Model must judge its own answer.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Model blindly critiques itself across all problems.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• Model changes correct answers into errors, dropping performance.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.red, bold: true } },
  ], { x: 5.4, y: 3.25, w: botW - 0.5, h: 1.5, margin: 0, valign: "top" });

  s.addNotes("Speaker 3 (Anindo): Walk through the two execution regimes. Explain that oracle labels act as an external cheat code, whereas intrinsic correction forces blind self-judgment. Hand over to Mahid.");
  addFooter(s, 11);
}

// ==========================================================================
// SLIDE 12: Results: Core Finding
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "Intrinsic Self-Correction Fails", "Main Finding: Empirical proof that intrinsic self-correction degrades reasoning performance");

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.32, w: 8.8, h: 1.15,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 1.5 }, rectRadius: 0.08,
  });
  s.addText("CENTRAL EMPIRICAL FINDING", {
    x: 0.85, y: 1.45, w: 8.3, h: 0.22,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.5,
  });
  s.addText("Across all tested benchmarks and models, intrinsic self-correction does NOT improve reasoning accuracy. Performance consistently declines after self-correction.", {
    x: 0.85, y: 1.7, w: 8.3, h: 0.68,
    fontSize: 13.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
  });

  const cards = [
    {
      title: "Universal Degradation",
      badge: "All Models Affected",
      desc: "Whether testing GPT-3.5, GPT-4, GPT-4-Turbo, or Llama-2-70B, accuracy drops after Round 1 and drops further after Round 2.",
      bg: C.cardBg,
    },
    {
      title: "Task-Agnostic Failure",
      badge: "Math, Logic & QA",
      desc: "Failures occur across math word problems (GSM8K), commonsense multiple-choice (CSQA), and open-domain QA (HotpotQA).",
      bg: C.cardBg,
    },
    {
      title: "The Oracle Illusion",
      badge: "Prior Artifacts",
      desc: "Performance only improves when external oracle labels guide when to correct, proving prior gains were evaluation artifacts.",
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
      fontSize: 12.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.2, y: 3.18, w: 2.4, h: 0.22,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.04,
    });
    s.addText(c.badge, {
      x: cx + 0.2, y: 3.18, w: 2.4, h: 0.22,
      fontSize: 8.5, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(c.desc, {
      x: cx + 0.2, y: 3.48, w: 2.4, h: 1.25,
      fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Speaker 4 (Mahid): Present the papers core empirical finding. Emphasize that unguided self-correction degrades accuracy across all tasks and architectures.");
  addFooter(s, 12);
}

// ==========================================================================
// SLIDE 13: Results: GPT-3.5 & GPT-4 Benchmark Results
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "GPT-3.5 & GPT-4 Benchmark Results", "Detailed Results: Accuracy across rounds of intrinsic self-correction (Table 3)");

  // Left: Native PPTX Grouped Bar Chart
  const gptChartData = [
    { name: "Standard (CoT)", labels: ["GSM8K (3.5)", "CSQA (3.5)", "Hotpot (3.5)", "GSM8K (GPT-4)", "CSQA (GPT-4)", "Hotpot (GPT-4)"], values: [77.0, 72.5, 29.0, 92.0, 78.5, 53.0] },
    { name: "Self-Correct R1", labels: ["GSM8K (3.5)", "CSQA (3.5)", "Hotpot (3.5)", "GSM8K (GPT-4)", "CSQA (GPT-4)", "Hotpot (GPT-4)"], values: [75.2, 63.5, 26.0, 88.5, 72.5, 42.0] },
    { name: "Self-Correct R2", labels: ["GSM8K (3.5)", "CSQA (3.5)", "Hotpot (3.5)", "GSM8K (GPT-4)", "CSQA (GPT-4)", "Hotpot (GPT-4)"], values: [72.6, 55.3, 25.0, 88.0, 72.0, 42.0] },
  ];

  s.addChart(pres.charts.BAR, gptChartData, {
    x: 0.6, y: 1.32, w: 5.2, h: 3.55,
    showValue: true,
    dataLabelPosition: "outEnd",
    chartColors: [C.slateDark, C.amber, C.crimson],
    valAxisMaxVal: 100,
    valAxisMinVal: 0,
    catAxisLabelColor: C.slateDark,
    valAxisLabelColor: C.muted,
    valGridLine: { color: C.cardBorder, style: "dash" },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendColor: C.slateDark,
    legendFontSize: 9,
  });

  // Right: Summary stats panel
  const rightW = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.1, y: 1.32, w: rightW, h: 3.55,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Key Benchmark Drops", {
    x: 6.3, y: 1.5, w: rightW - 0.4, h: 0.3,
    fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const drops = [
    { model: "GPT-3.5 on CSQA", drop: "-17.2% Drop", detail: "Plummets from 72.5% to 55.3% by Round 2." },
    { model: "GPT-4 on HotpotQA", drop: "-11.0% Drop", detail: "Falls from 53.0% to 42.0% after correction." },
    { model: "GPT-4 on GSM8K", drop: "-4.0% Drop", detail: "Drops from 92.0% to 88.0% after two rounds." },
  ];

  drops.forEach((d, i) => {
    const cy = 1.92 + i * 0.92;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.3, y: cy, w: rightW - 0.4, h: 0.8,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.06,
    });
    s.addText(d.model, { x: 6.45, y: cy + 0.08, w: rightW - 0.7, h: 0.22, fontSize: 10, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(d.drop, { x: 6.45, y: cy + 0.08, w: rightW - 0.7, h: 0.22, fontSize: 10, fontFace: BODY_FONT, color: C.red, bold: true, align: "right", margin: 0 });
    s.addText(d.detail, { x: 6.45, y: cy + 0.32, w: rightW - 0.7, h: 0.42, fontSize: 9, fontFace: BODY_FONT, color: C.muted, margin: 0 });
  });

  s.addNotes("Speaker 4 (Mahid): Walk through the bar chart. Point out how accuracy monotonically drops across all three benchmarks for both GPT-3.5 and GPT-4.");
  addFooter(s, 13);
}

// ==========================================================================
// SLIDE 14: Results: GPT-4-Turbo & Llama-2 Results
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "GPT-4-Turbo & Llama-2 Results", "Generalizability: Extending evaluation confirms failure across open and proprietary LLMs (Table 4)");

  const colChartData = [
    { name: "Standard (CoT)", labels: ["GSM8K (Turbo)", "CSQA (Turbo)", "GSM8K (Llama-2)", "CSQA (Llama-2)"], values: [91.5, 84.0, 62.0, 64.0] },
    { name: "Self-Correct R1", labels: ["GSM8K (Turbo)", "CSQA (Turbo)", "GSM8K (Llama-2)", "CSQA (Llama-2)"], values: [88.0, 81.5, 43.5, 37.5] },
    { name: "Self-Correct R2", labels: ["GSM8K (Turbo)", "CSQA (Turbo)", "GSM8K (Llama-2)", "CSQA (Llama-2)"], values: [90.0, 83.0, 36.5, 36.5] },
  ];

  s.addChart(pres.charts.COL, colChartData, {
    x: 0.6, y: 1.32, w: 5.2, h: 3.55,
    showValue: true,
    dataLabelPosition: "outEnd",
    chartColors: [C.slateDark, C.amber, C.crimson],
    valAxisMaxVal: 100,
    valAxisMinVal: 0,
    catAxisLabelColor: C.slateDark,
    valAxisLabelColor: C.muted,
    valGridLine: { color: C.cardBorder, style: "dash" },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendColor: C.slateDark,
    legendFontSize: 9,
  });

  const rightW = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.1, y: 1.32, w: rightW, h: 3.55,
    fill: { color: C.redLight }, line: { color: C.red, width: 1.2 }, rectRadius: 0.1,
  });

  s.addText("Llama-2 Severe Degradation", {
    x: 6.3, y: 1.5, w: rightW - 0.4, h: 0.3,
    fontSize: 13, fontFace: TITLE_FONT, color: C.red, bold: true, margin: 0,
  });

  s.addText([
    { text: "Llama-2-70B Accuracy Collapses:", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• GSM8K: 62.0% -> 36.5% (-25.5%)", options: { fontSize: 10, fontFace: BODY_FONT, color: C.red, bold: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "• CSQA: 64.0% -> 36.5% (-27.5%)", options: { fontSize: 10, fontFace: BODY_FONT, color: C.red, bold: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Open-weight models exhibit extreme prompt compliance vulnerability, readily abandoning correct solutions when challenged.", options: { fontSize: 9, fontFace: BODY_FONT, color: C.slate } },
  ], { x: 6.3, y: 1.9, w: rightW - 0.4, h: 2.8, margin: 0, valign: "top" });

  s.addNotes("Speaker 4 (Mahid): Highlight the column chart. Show that while GPT-4-Turbo experiences modest drops, Llama-2-70B suffers a catastrophic collapse, losing nearly half its accuracy.");
  addFooter(s, 14);
}

// ==========================================================================
// SLIDE 15: Results: Answer Transition Dynamics
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "4. Results", "Answer Transition Dynamics", "Error Persistence: Why accuracy drops through net negative answer flipping (Figure 1)");

  const doughnutData = [
    {
      name: "Answer Transitions",
      labels: ["Unchanged (74.7%)", "Flipped to Wrong (8.9%)", "Fixed Error (7.6%)", "Remained Wrong (8.8%)"],
      values: [74.7, 8.9, 7.6, 8.8],
    },
  ];

  s.addChart(pres.charts.DOUGHNUT, doughnutData, {
    x: 0.6, y: 1.32, w: 4.8, h: 3.55,
    showValue: true,
    chartColors: [C.slateDark, C.red, C.green, C.amber],
    showLegend: true,
    legendPos: "b",
    legendColor: C.slateDark,
    legendFontSize: 9,
    holeSize: 50,
  });

  const rightW = 3.7;
  const cards = [
    { pct: "74.7%", label: "Unchanged", sub: "Model maintained initial output", color: C.slateDark, bg: C.cardBg },
    { pct: "8.9%", label: "Correct -> Incorrect", sub: "Flipped to wrong answer (Harmful)", color: C.red, bg: C.redLight },
    { pct: "7.6%", label: "Incorrect -> Correct", sub: "Successfully repaired (Beneficial)", color: C.green, bg: C.greenLight },
    { pct: "-1.3%", label: "Net Loss", sub: "Harmful flips exceed beneficial fixes", color: C.crimson, bg: C.crimsonLight },
  ];

  cards.forEach((c, i) => {
    const cy = 1.32 + i * 0.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.7, y: cy, w: rightW, h: 0.8,
      fill: { color: c.bg }, line: { color: C.cardBorder, width: 0.75 }, rectRadius: 0.08,
    });
    s.addText(c.pct, {
      x: 5.85, y: cy + 0.1, w: 1.0, h: 0.6,
      fontSize: 16, fontFace: TITLE_FONT, color: c.color, bold: true, valign: "middle", margin: 0,
    });
    s.addText(c.label, {
      x: 6.9, y: cy + 0.12, w: rightW - 1.3, h: 0.25,
      fontSize: 11, fontFace: BODY_FONT, color: c.color, bold: true, margin: 0,
    });
    s.addText(c.sub, {
      x: 6.9, y: cy + 0.38, w: rightW - 1.3, h: 0.32,
      fontSize: 9, fontFace: BODY_FONT, color: C.muted, margin: 0,
    });
  });

  s.addNotes("Speaker 4 (Mahid): Explain Figure 1 from the paper. Point out the doughnut chart: 8.9% of answers flip from correct to incorrect, while only 7.6% flip from incorrect to correct, creating a net negative drift. Hand over to Jebon.");
  addFooter(s, 15);
}

// ==========================================================================
// SLIDE 16: Analysis: Multi-Agent Debate vs. Self-Consistency
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "Multi-Agent Debate vs. Self-Consistency", "Why Does Self-Correction Fail?: Equal compute comparison with simple majority voting (Table 7)");

  const debateChartData = [
    { name: "Single-Shot CoT", labels: ["GSM8K", "CSQA", "Chess QA"], values: [77.0, 72.5, 54.0] },
    { name: "Multi-Agent Debate", labels: ["GSM8K", "CSQA", "Chess QA"], values: [81.0, 75.0, 58.0] },
    { name: "Self-Consistency (Equal Cost)", labels: ["GSM8K", "CSQA", "Chess QA"], values: [82.5, 77.0, 60.5] },
  ];

  s.addChart(pres.charts.COL, debateChartData, {
    x: 0.6, y: 1.32, w: 5.2, h: 3.55,
    showValue: true,
    dataLabelPosition: "outEnd",
    chartColors: [C.slateDark, C.amber, C.green],
    valAxisMaxVal: 100,
    valAxisMinVal: 0,
    catAxisLabelColor: C.slateDark,
    valAxisLabelColor: C.muted,
    valGridLine: { color: C.cardBorder, style: "dash" },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendColor: C.slateDark,
    legendFontSize: 9,
  });

  const rightW = 3.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.1, y: 1.32, w: rightW, h: 3.55,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Compute Parity Analysis", {
    x: 6.3, y: 1.5, w: rightW - 0.4, h: 0.3,
    fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  s.addText([
    { text: "The Flawed Debate Claim:", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "Prior work claimed Multi-Agent Debate improved reasoning by comparing it to single-shot baselines.", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 8 } },
    { text: "The Equal-Cost Reality:", options: { fontSize: 10.5, fontFace: BODY_FONT, color: C.green, bold: true, breakLine: true, paraSpaceAfter: 4 } },
    { text: "When allocating the same sampled responses to Self-Consistency (majority voting), simple sampling matches or beats multi-agent debate with zero communication latency.", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate } },
  ], { x: 6.3, y: 1.9, w: rightW - 0.4, h: 2.8, margin: 0, valign: "top" });

  s.addNotes("Speaker 5 (Jebon): Analyze Table 7. Explain that Multi-Agent Debate introduces heavy token overhead and sequential delay, but achieves no advantage over simple majority voting at matched compute.");
  addFooter(s, 16);
}

// ==========================================================================
// SLIDE 17: Analysis: The Prompt Design Trap
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "The Prompt Design Trap", "Possible Causes: Misleading evaluation gains from asymmetric prompt information (Table 8)");

  const colW = 4.25;
  // Left: Flawed Setup
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.32, w: colW, h: 2.65,
    fill: { color: C.amberLight }, line: { color: C.amber, width: 1.2 }, rectRadius: 0.1,
  });

  s.addText("Flawed Evaluation (Self-Refine Setup)", {
    x: 0.85, y: 1.48, w: colW - 0.5, h: 0.28,
    fontSize: 12.5, fontFace: TITLE_FONT, color: C.amber, bold: true, margin: 0,
  });

  s.addText([
    { text: "1. Weak Initial Prompt: Omits required constraints, such as 'Use all target concept words in sentence.'", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 6 } },
    { text: "2. Feedback Prompt: Re-injects missing rule ('You forgot word X. Add it now.').", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 6 } },
    { text: "3. Output Improves -> Authors claimed 'Self-Correction works.'", options: { fontSize: 10, fontFace: BODY_FONT, color: C.red, bold: true } },
  ], { x: 0.85, y: 1.82, w: colW - 0.5, h: 2.0, margin: 0, valign: "top" });

  // Right: Fair Setup
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.32, w: colW, h: 2.65,
    fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.1,
  });

  s.addText("Fair Evaluation (Complete Initial Prompt)", {
    x: 5.4, y: 1.48, w: colW - 0.5, h: 0.28,
    fontSize: 12.5, fontFace: TITLE_FONT, color: C.green, bold: true, margin: 0,
  });

  s.addText([
    { text: "1. Complete Initial Prompt: Includes all target word rules up-front in the initial prompt.", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 6 } },
    { text: "2. Model generates strong initial output immediately.", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 6 } },
    { text: "3. Intrinsic Self-Correction applied -> Performance DROPS.", options: { fontSize: 10, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 5.4, y: 1.82, w: colW - 0.5, h: 2.0, margin: 0, valign: "top" });

  // Bottom Takeaway
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.12, w: 8.8, h: 0.85,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });
  s.addText("CASE STUDY: CONSTRAINED GENERATION (TABLE 8)", {
    x: 0.8, y: 4.2, w: 8.4, h: 0.2,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.crimson, bold: true, margin: 0, charSpacing: 1.0,
  });
  s.addText("When the initial prompt is well-specified, standard single-shot prompting outperforms iterative self-refinement loops. Reported gains were prompt artifacts rather than genuine reflection.", {
    x: 0.8, y: 4.42, w: 8.4, h: 0.48,
    fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15,
  });

  s.addNotes("Speaker 5 (Jebon): Explain the prompt design trap. Show how weak initial prompts artificially deflated baseline scores, making subsequent prompt additions look like self-correction.");
  addFooter(s, 17);
}

// ==========================================================================
// SLIDE 18: Analysis: Case Study - The Gaslighting Effect
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "Case Study: The Gaslighting Effect", "Error Persistence: Concrete breakdown of how self-critique corrupts sound reasoning (Figure 4)");

  // Top: Problem Statement Box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.32, w: 8.8, h: 0.78,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
  });
  s.addText("GSM8K Math Problem: Terry eats 2 yogurts a day. A pack of 4 yogurts costs $5. How much does Terry spend on yogurt in 30 days?", {
    x: 0.85, y: 1.42, w: 8.3, h: 0.58,
    fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0,
  });

  const colW = 4.25;
  // Step 1: Initial (Correct)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.22, w: colW, h: 2.0,
    fill: { color: C.greenLight }, line: { color: C.green, width: 1.2 }, rectRadius: 0.08,
  });
  s.addText("Round 1: Initial Output (CORRECT)", {
    x: 0.85, y: 2.35, w: colW - 0.5, h: 0.25,
    fontSize: 12, fontFace: TITLE_FONT, color: C.green, bold: true, margin: 0,
  });
  s.addText([
    { text: "• 30 days × 2 yogurts/day = 60 yogurts needed", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 3 } },
    { text: "• 60 / 4 yogurts per pack = 15 packs of yogurt", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 3 } },
    { text: "• 15 packs × $5 = $75 total cost", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 3 } },
    { text: "-> Final Answer: $75 (CORRECT)", options: { fontSize: 10, fontFace: BODY_FONT, color: C.green, bold: true } },
  ], { x: 0.85, y: 2.65, w: colW - 0.5, h: 1.5, margin: 0, valign: "top" });

  // Step 2: Revision (Incorrect)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 2.22, w: colW, h: 2.0,
    fill: { color: C.redLight }, line: { color: C.red, width: 1.2 }, rectRadius: 0.08,
  });
  s.addText("Round 2: After Self-Correction (INCORRECT)", {
    x: 5.4, y: 2.35, w: colW - 0.5, h: 0.25,
    fontSize: 12, fontFace: TITLE_FONT, color: C.red, bold: true, margin: 0,
  });
  s.addText([
    { text: "• Model receives: 'Review your answer and find flaws'", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 3 } },
    { text: "• Model doubts valid logic and hallucinates: '4 yogurts last 2 days...'", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 3 } },
    { text: "• Overcomplicates and calculates: $150", options: { fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, breakLine: true, paraSpaceAfter: 3 } },
    { text: "-> Final Answer: $150 (INCORRECT)", options: { fontSize: 10, fontFace: BODY_FONT, color: C.red, bold: true } },
  ], { x: 5.4, y: 2.65, w: colW - 0.5, h: 1.5, margin: 0, valign: "top" });

  // Bottom Takeaway
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 4.35, w: 8.8, h: 0.58,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.75 }, rectRadius: 0.05,
  });
  s.addText("Takeaway: Critique prompts induce unwarranted self-doubt, gaslighting correct answers into errors.", {
    x: 0.8, y: 4.35, w: 8.4, h: 0.58,
    fontSize: 10, fontFace: BODY_FONT, color: C.crimson, bold: true, valign: "middle", margin: 0,
  });

  s.addNotes("Speaker 5 (Jebon): Walk through this real GSM8K math example. Point out how the model solved it correctly in Round 1 ($75), but gaslit itself into giving an erroneous answer ($150) in Round 2.");
  addFooter(s, 18);
}

// ==========================================================================
// SLIDE 19: Analysis: The Verification Barrier
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "5. Analysis", "The Verification Barrier", "Underlying Mechanism: Why intrinsic verification is as hard as initial generation");

  const cards = [
    {
      num: "1",
      title: "Shared Parameter Bounds",
      badge: "Knowledge Parity",
      text: "The critic and generator share the exact same weights. If a model cannot generate the correct step initially, it lacks the internal knowledge to verify that step.",
    },
    {
      num: "2",
      title: "Compliance Prompt Bias",
      badge: "Instruction Tuning",
      text: "Instruction-tuned models aim to obey the user prompt. Asking the model to 'find flaws' strongly biases it to invent errors even when reasoning is sound.",
    },
    {
      num: "3",
      title: "Lack of Grounding",
      badge: "No Ground Truth",
      text: "Without external execution (such as Python) or oracle signals, the model cannot distinguish between valid corrections and hallucinations.",
    },
  ];

  cards.forEach((c, i) => {
    const cx = 0.6 + i * 3.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 1.32, w: 2.8, h: 3.55,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
    });
    addBadgeCircle(s, cx + 0.2, 1.52, c.num, 0.35, C.crimson, C.white);
    s.addText(c.title, {
      x: cx + 0.2, y: 2.02, w: 2.4, h: 0.5,
      fontSize: 13.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.2, y: 2.58, w: 2.4, h: 0.25,
      fill: { color: C.white }, line: { color: C.cardBorder, width: 0.5 }, rectRadius: 0.05,
    });
    s.addText(c.badge, {
      x: cx + 0.2, y: 2.58, w: 2.4, h: 0.25,
      fontSize: 8.5, fontFace: BODY_FONT, color: C.crimson, align: "center", valign: "middle", bold: true, margin: 0,
    });
    s.addText(c.text, {
      x: cx + 0.2, y: 2.95, w: 2.4, h: 1.75,
      fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Speaker 5 (Jebon): Synthesize the theoretical barriers: shared weights, prompt compliance bias, and lack of external grounding. Hand over to Refayet.");
  addFooter(s, 19);
}

// ==========================================================================
// SLIDE 20: Conclusion: Key Takeaways
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Key Takeaways", "Summary: Core conclusions established by Huang et al. (ICLR 2024)");

  const takeaways = [
    {
      num: "1",
      title: "Intrinsic Self-Correction Fails for Reasoning",
      text: "Without external feedback, LLMs cannot reliably correct their reasoning mistakes. Performance consistently declines across models and benchmarks.",
    },
    {
      num: "2",
      title: "Prior Reported Gains Were Evaluation Artifacts",
      text: "Earlier claims relied on oracle label leakage (knowing when to stop), unfair compute baselines, or incomplete initial prompt templates.",
    },
    {
      num: "3",
      title: "External Feedback is Required for Reliable Refinement",
      text: "Self-correction succeeds when paired with external grounding signals, including code execution environments, calculators, unit tests, and human review.",
    },
  ];

  takeaways.forEach((t, i) => {
    const cy = 1.32 + i * 1.16;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: cy, w: 8.8, h: 1.0,
      fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.08,
    });
    addBadgeCircle(s, 0.85, cy + 0.25, t.num, 0.42, C.crimson, C.white);
    s.addText(t.title, {
      x: 1.45, y: cy + 0.15, w: 7.7, h: 0.28,
      fontSize: 12.5, fontFace: TITLE_FONT, color: C.slateDark, bold: true, margin: 0,
    });
    s.addText(t.text, {
      x: 1.45, y: cy + 0.45, w: 7.7, h: 0.48,
      fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Speaker 6 (Refayet): Summarize the papers three main takeaways clearly and decisively.");
  addFooter(s, 20);
}

// ==========================================================================
// SLIDE 21: Conclusion: Study Limitations
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Study Limitations", "Scope & Boundaries: Contextualizing the empirical boundaries of this research");

  const leftW = 4.25;
  // Left card: Scope limitations
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.32, w: leftW, h: 3.55,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Scope Limitations", {
    x: 0.85, y: 1.5, w: leftW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const scopePoints = [
    { title: "Reasoning-Specific Focus", desc: "Evaluated on math and logic benchmarks. Does not evaluate creative writing, translation, or style editing." },
    { title: "Prompting-Only Paradigm", desc: "Tests frozen, off-the-shelf models. Does not evaluate models specifically fine-tuned for self-correction." },
    { title: "2023 Snapshot Models", desc: "Evaluated on GPT-3.5, GPT-4, and Llama-2. Newer reasoning models (such as OpenAI o1 and o3) warrant further study." },
  ];

  scopePoints.forEach((sp, i) => {
    const cy = 1.9 + i * 0.9;
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.crimson } });
    s.addText(sp.title, { x: 1.05, y: cy, w: leftW - 0.7, h: 0.22, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(sp.desc, { x: 1.05, y: cy + 0.22, w: leftW - 0.7, h: 0.65, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15 });
  });

  // Right card: Methodological considerations
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.15, y: 1.32, w: leftW, h: 3.55,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.1,
  });

  s.addText("Methodological Boundaries", {
    x: 5.4, y: 1.5, w: leftW - 0.5, h: 0.3,
    fontSize: 14, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
  });

  const methodPoints = [
    { title: "HotpotQA Sample Size", desc: "HotpotQA evaluation used 100 samples due to API cost constraints, limiting statistical resolution on multi-hop QA." },
    { title: "Prompt Sensitivity", desc: "While multiple feedback prompt templates were tested, prompt variations cannot be completely exhausted." },
    { title: "Closed-Book Constraints", desc: "Evaluated in closed-book mode without retrieval-augmented generation (RAG) knowledge lookups." },
  ];

  methodPoints.forEach((mp, i) => {
    const cy = 1.9 + i * 0.9;
    s.addShape(pres.shapes.OVAL, { x: 5.4, y: cy + 0.05, w: 0.12, h: 0.12, fill: { color: C.crimson } });
    s.addText(mp.title, { x: 5.6, y: cy, w: leftW - 0.7, h: 0.22, fontSize: 10.5, fontFace: BODY_FONT, color: C.slateDark, bold: true, margin: 0 });
    s.addText(mp.desc, { x: 5.6, y: cy + 0.22, w: leftW - 0.7, h: 0.65, fontSize: 9.5, fontFace: BODY_FONT, color: C.slate, margin: 0, lineSpacingMultiple: 1.15 });
  });

  s.addNotes("Speaker 6 (Refayet): Detail the studys boundaries and limitations transparently.");
  addFooter(s, 21);
}

// ==========================================================================
// SLIDE 22: Conclusion: Future Directions & Fair Standards
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "6. Conclusion & Future Work", "Future Directions & Fair Standards", "Future Work: Constructive pathways forward and recommendations for fair evaluation");

  const directions = [
    {
      num: "1",
      title: "Tool-Augmented Verification",
      badge: "Deterministic Execution",
      desc: "Integrate Python interpreters, symbolic solvers, and SQL execution engines to verify calculations externally.",
    },
    {
      num: "2",
      title: "Learned Verifiers & PRMs",
      badge: "Specialized Discriminators",
      desc: "Train separate discriminator models (Process Reward Models) to verify step-by-step reasoning quality.",
    },
    {
      num: "3",
      title: "Training-Time Self-Correction",
      badge: "RL & Search",
      desc: "Train models with Reinforcement Learning and search (such as MCTS and test-time compute) rather than prompt loops.",
    },
    {
      num: "4",
      title: "Fair Evaluation Standards",
      badge: "Research Best Practices",
      desc: "Mandate equal inference-cost baselines (Self-Consistency) and eliminate oracle label leakage in benchmarks.",
    },
  ];

  const cardW = 4.25;
  const cardH = 1.58;
  const startX = 0.6;
  const startY = 1.32;
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
      fontSize: 13, fontFace: TITLE_FONT, color: C.crimson, bold: true, margin: 0,
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
      x: cx + 0.2, y: cy + 0.52, w: cardW - 0.4, h: 0.95,
      fontSize: 10, fontFace: BODY_FONT, color: C.slate, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });
  });

  s.addNotes("Speaker 6 (Refayet): Present constructive future directions: tool augmentation, trained verifiers, RL test-time search, and rigorous evaluation standards.");
  addFooter(s, 22);
}

// ==========================================================================
// SLIDE 23: References (Table Format)
// ==========================================================================
{
  const s = createSlide();
  addSlideHeading(s, "References", "References", "Academic literature and baseline studies cited in this presentation (IEEE Format)");

  const refRows = [
    [
      { text: "#", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10, fontFace: TITLE_FONT, align: "center" } },
      { text: "Paper Title", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10, fontFace: TITLE_FONT } },
      { text: "Authors & Venue", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10, fontFace: TITLE_FONT } },
      { text: "Relevance to this Study", options: { bold: true, color: C.white, fill: { color: C.tableHead }, fontSize: 10, fontFace: TITLE_FONT } },
    ],
    [
      { text: "[1]", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
      { text: "Large Language Models Cannot Self-Correct Reasoning Yet", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "J. Huang, X. Chen, S. Mishra, et al. (ICLR 2024)", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Primary source paper investigated in this presentation.", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, color: C.crimson, bold: true } },
    ],
    [
      { text: "[2]", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, align: "center" } },
      { text: "Language Models Can Solve Computer Tasks (RCI)", options: { fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "G. Kim, P. Baldi, S. McAleer (NeurIPS 2023)", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "RCI self-correction framework baseline with oracle labels.", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
    ],
    [
      { text: "[3]", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
      { text: "Reflexion: Language Agents with Verbal Reinforcement", options: { fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "N. Shinn, F. Cassano, A. Gopinath, et al. (NeurIPS 2023)", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Reflexion memory baseline relying on environment signals.", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
    ],
    [
      { text: "[4]", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, align: "center" } },
      { text: "Self-Refine: Iterative Refinement with Self-Feedback", options: { fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "A. Madaan, N. Tandon, P. Gupta, et al. (NeurIPS 2023)", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Iterative feedback loop investigated for prompt artifacts.", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
    ],
    [
      { text: "[5]", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
      { text: "Improving Factuality & Reasoning via Multiagent Debate", options: { fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Y. Du, S. Li, A. Torralba, et al. (arXiv 2023)", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "Multi-agent debate baseline evaluated at equal compute.", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
    ],
    [
      { text: "[6]", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow2 }, align: "center" } },
      { text: "Self-Consistency Improves Chain of Thought Reasoning", options: { fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "X. Wang, J. Wei, D. Schuurmans, et al. (ICLR 2023)", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
      { text: "Majority voting baseline used for equal compute parity.", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow2 } } },
    ],
    [
      { text: "[7]", options: { bold: true, fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 }, align: "center" } },
      { text: "Training Verifiers to Solve Math Word Problems", options: { fontSize: 9, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "K. Cobbe, V. Kosaraju, M. Bavarian, et al. (arXiv 2021)", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
      { text: "GSM8K dataset creation and learned verifier foundation.", options: { fontSize: 8.5, fontFace: BODY_FONT, fill: { color: C.tableRow1 } } },
    ],
  ];

  s.addTable(refRows, {
    x: 0.6, y: 1.32, w: 8.8,
    colW: [0.5, 3.2, 2.5, 2.6],
    rowH: [0.35, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44, 0.44],
    border: { type: "solid", pt: 0.5, color: C.cardBorder },
    margin: [3, 6, 3, 6],
  });

  s.addNotes("Speaker 6 (Refayet): Point the audience to the primary references cited in the presentation.");
  addFooter(s, 23);
}

// ==========================================================================
// SLIDE 24: Thank You & Discussion (Redesigned Minimal Traditional Page)
// ==========================================================================
{
  const s = createSlide();
  addTopicHeader(s, "Conclusion");

  // Elegant central card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 1.1, w: 7.0, h: 3.4,
    fill: { color: C.cardBg }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.12,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.7, y: 1.45, w: 2.6, h: 0.32,
    fill: { color: C.crimsonLight }, line: { color: C.crimson, width: 0.75 }, rectRadius: 0.06,
  });
  s.addText("Q&A SESSION", {
    x: 3.7, y: 1.45, w: 2.6, h: 0.32,
    fontSize: 9, fontFace: BODY_FONT, color: C.crimson, bold: true, align: "center", valign: "middle", margin: 0, charSpacing: 1.5,
  });

  s.addText("Thank You", {
    x: 1.8, y: 1.9, w: 6.4, h: 0.8,
    fontSize: 40, fontFace: TITLE_FONT, color: C.slateDark, bold: true, align: "center", margin: 0,
  });

  s.addText("Questions & Open Discussion", {
    x: 1.8, y: 2.75, w: 6.4, h: 0.35,
    fontSize: 16, fontFace: TITLE_FONT, color: C.crimson, bold: true, align: "center", margin: 0,
  });

  s.addText("We welcome questions, feedback, and discussion from the professor and audience.", {
    x: 2.0, y: 3.2, w: 6.0, h: 0.45,
    fontSize: 11, fontFace: BODY_FONT, color: C.muted, align: "center", margin: 0,
  });

  s.addNotes("Speaker 6 (Refayet): Conclude the presentation warmly. Thank the professor and audience for their attention, and open the floor for questions and discussion.");
  addFooter(s, 24);
}

// Export Output File
const outPath = "output/LLM_Self_Correction_ICLR2024_Group_Presentation-v6.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log(`Presentation v6 generated successfully at: ${outPath}`))
  .catch((err) => console.error("Error generating presentation:", err));
