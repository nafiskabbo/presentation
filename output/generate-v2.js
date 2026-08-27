const pptxgen = require('pptxgenjs');

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

// Colors
const COLOR_PRIMARY = '2C5F2D';
const COLOR_SECONDARY = 'E8F0E4';
const COLOR_ACCENT = '97BC62';
const COLOR_DARK = '1B3A1C';
const COLOR_TEXT_ON_LIGHT = '2C3E28';
const COLOR_MUTED = '6B7F6C';
const COLOR_CARD_BG = 'F2F7F0';
const COLOR_WHITE = 'FFFFFF';

// Fonts
const FONT_TITLE = 'Bookman Old Style';
const FONT_BODY = 'Arial';

function addBaseTemplate(slide, slideNum, sectionName, isDark = false) {
    const textColor = isDark ? COLOR_SECONDARY : COLOR_MUTED;
    if (sectionName) {
        slide.addText(sectionName.toUpperCase(), {
            x: 0.5, y: 0.25, w: 9, h: 0.3,
            fontSize: 9, color: textColor, fontFace: FONT_BODY,
            bold: true, margin: 0, align: 'left', charSpacing: 1.5
        });
    }
    
    slide.addText("Large Language Models Cannot Self-Correct Reasoning Yet | ICLR 2024", {
        x: 0.5, y: 5.12, w: 7.5, h: 0.3,
        fontSize: 8, color: textColor, fontFace: FONT_BODY,
        margin: 0, align: 'left'
    });
    
    const paddedNum = slideNum.toString().padStart(2, '0');
    slide.addText(`${paddedNum}/20`, {
        x: 8.5, y: 5.12, w: 1.0, h: 0.3,
        fontSize: 8, color: textColor, fontFace: FONT_BODY,
        margin: 0, align: 'right'
    });
}

// Slide 1 — Title
let s1 = pres.addSlide();
s1.background = { fill: COLOR_DARK };
s1.addText("Large Language Models\nCannot Self-Correct Reasoning Yet", {
    x: 0.8, y: 0.8, w: 8.4, h: 1.6,
    fontSize: 38, color: COLOR_WHITE, fontFace: FONT_TITLE, bold: true, align: 'left', margin: 0,
    lineSpacingMultiple: 1.1
});
s1.addText("ICLR 2024 — Group Presentation", {
    x: 0.8, y: 2.5, w: 8.4, h: 0.4,
    fontSize: 16, color: COLOR_ACCENT, fontFace: FONT_BODY, align: 'left', margin: 0
});
s1.addText("Paper authors: Huang, Weng, Liang, Peng, Wu, Zhang", {
    x: 0.8, y: 2.95, w: 8.4, h: 0.3,
    fontSize: 11, color: COLOR_MUTED, fontFace: FONT_BODY, align: 'left', margin: 0
});

const namesV2 = [
    "Nafis Islam Kabbo — 2303180", "Srijon — 2303179", "Anindo — 2303181",
    "Mahid — 2303127", "Jebon — 2303160", "Refayet — 2303148"
];
namesV2.forEach((n, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    s1.addText(n, {
        x: 0.8 + col * 2.8, y: 3.6 + row * 0.4, w: 2.7, h: 0.35,
        fontSize: 11, color: COLOR_SECONDARY, fontFace: FONT_BODY, margin: 0
    });
});
addBaseTemplate(s1, 1, "", true);

// Slide 2 — Agenda
let s2 = pres.addSlide();
s2.background = { fill: COLOR_WHITE };
addBaseTemplate(s2, 2, "Overview");
s2.addText("Presentation outline", {
    x: 0.5, y: 1.0, w: 9, h: 0.8,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const agendaItems = [
    { num: "1", title: "Introduction", pres: "Nafis" },
    { num: "2", title: "Literature review", pres: "Srijon" },
    { num: "3", title: "Methodology", pres: "Anindo" },
    { num: "4", title: "Main results", pres: "Mahid" },
    { num: "5", title: "Why does self-correction fail?", pres: "Jebon" },
    { num: "6", title: "Conclusion", pres: "Refayet" }
];
let cardW = 4, cardH = 0.8;
let startX = 0.8, startY = 2.0;
agendaItems.forEach((item, i) => {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let cx = startX + col * (cardW + 0.4);
    let cy = startY + row * (cardH + 0.4);
    s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
        shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
    });
    s2.addShape(pres.shapes.OVAL, {
        x: cx + 0.2, y: cy + 0.2, w: 0.4, h: 0.4, fill: { color: COLOR_ACCENT }
    });
    s2.addText(item.num, {
        x: cx + 0.2, y: cy + 0.2, w: 0.4, h: 0.4,
        color: COLOR_WHITE, fontSize: 14, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
    });
    s2.addText(`${item.title}\nPresenter: ${item.pres}`, {
        x: cx + 0.7, y: cy + 0.1, w: cardW - 0.8, h: 0.6,
        color: COLOR_TEXT_ON_LIGHT, fontSize: 14, fontFace: FONT_BODY, align: 'left', margin: 0
    });
});

// Slide 3 — What are LLMs?
let s3 = pres.addSlide();
s3.background = { fill: COLOR_WHITE };
addBaseTemplate(s3, 3, "1. Introduction");
s3.addText("What are LLMs?", {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
// Left column
s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.8, w: 4.2, h: 2.8,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s3.addText("Large Language Models (LLMs) are deep learning models trained on massive amounts of text. They predict the next word in a sequence and demonstrate advanced capabilities.", {
    x: 0.8, y: 2.0, w: 3.6, h: 2.4,
    fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0
});
// Right column
s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.8, w: 4.4, h: 0.8,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s3.addShape(pres.shapes.OVAL, { x: 5.3, y: 2.0, w: 0.4, h: 0.4, fill: { color: COLOR_ACCENT } });
s3.addText("Text generation", { x: 5.8, y: 2.0, w: 3.5, h: 0.4, fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0 });

s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 2.8, w: 4.4, h: 0.8,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s3.addShape(pres.shapes.OVAL, { x: 5.3, y: 3.0, w: 0.4, h: 0.4, fill: { color: COLOR_ACCENT } });
s3.addText("Reasoning", { x: 5.8, y: 3.0, w: 3.5, h: 0.4, fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0 });

s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 3.8, w: 4.4, h: 0.8,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s3.addShape(pres.shapes.OVAL, { x: 5.3, y: 4.0, w: 0.4, h: 0.4, fill: { color: COLOR_ACCENT } });
s3.addText("Code writing", { x: 5.8, y: 4.0, w: 3.5, h: 0.4, fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0 });

// Slide 4 — The central question
let s4 = pres.addSlide();
s4.background = { fill: COLOR_WHITE };
addBaseTemplate(s4, 4, "1. Introduction");
s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.0, h: 5.625, fill: { color: COLOR_PRIMARY } });
s4.addText("The paradox", {
    x: 0.2, y: 2.0, w: 2.6, h: 1.0,
    fontSize: 40, color: COLOR_WHITE, fontFace: FONT_TITLE, bold: true, align: 'left', margin: 0
});
s4.addText("If an LLM can identify its own mistakes, why doesn't it answer correctly the first time?", {
    x: 3.5, y: 1.5, w: 5.8, h: 1.5,
    fontSize: 24, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0
});
s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 3.2, w: 5.8, h: 1.5,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s4.addText("Intrinsic self-correction", {
    x: 3.8, y: 3.4, w: 5.2, h: 0.4,
    fontSize: 18, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0
});
s4.addText("The model tries to fix its own responses without external help.", {
    x: 3.8, y: 3.9, w: 5.2, h: 0.6,
    fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0
});

// Slide 5 — Prior methods overview
let s5 = pres.addSlide();
s5.background = { fill: COLOR_WHITE };
addBaseTemplate(s5, 5, "2. Literature review");
s5.addText("Prior methods overview", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const methods = [
    { title: "RCI", year: "2023", desc: "Recursive criticism and improvement." },
    { title: "Reflexion", year: "2023", desc: "Verbal reinforcement learning." },
    { title: "Self-Refine", year: "2023", desc: "Iterative refinement using feedback." },
    { title: "Multi-Agent Debate", year: "2023", desc: "Multiple models critique each other." }
];
methods.forEach((m, i) => {
    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.5, y: 1.6 + i * 0.9, w: 9, h: 0.7,
        fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
        shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
    });
    s5.addText(`${m.title} (${m.year})`, {
        x: 0.7, y: 1.7 + i * 0.9, w: 3, h: 0.5,
        fontSize: 16, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0
    });
    s5.addText(m.desc, {
        x: 4.0, y: 1.7 + i * 0.9, w: 5.2, h: 0.5,
        fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0
    });
});

// Slide 6 — Intrinsic vs external feedback
let s6 = pres.addSlide();
s6.background = { fill: COLOR_WHITE };
addBaseTemplate(s6, 6, "2. Literature review");
s6.addText("Intrinsic vs external feedback", {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
// Intrinsic Card
s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 2.0, w: 3.8, h: 2.5,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s6.addText("Intrinsic", {
    x: 1.2, y: 2.2, w: 3.4, h: 0.5,
    fontSize: 24, color: COLOR_PRIMARY, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
s6.addText("Model uses only its own knowledge. No external input.", {
    x: 1.2, y: 2.8, w: 3.4, h: 1.0,
    fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
});

// External Card
s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 2.0, w: 3.8, h: 2.5,
    fill: { color: COLOR_WHITE }, rectRadius: 0.1,
    line: { color: COLOR_PRIMARY, width: 2 },
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s6.addText("External", {
    x: 5.4, y: 2.2, w: 3.4, h: 0.5,
    fontSize: 24, color: COLOR_PRIMARY, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
s6.addText("Oracle labels, human feedback, or tool outputs guide the model.", {
    x: 5.4, y: 2.8, w: 3.4, h: 1.0,
    fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
});

// Slide 7 — Evaluation issues table
let s7 = pres.addSlide();
s7.background = { fill: COLOR_WHITE };
addBaseTemplate(s7, 7, "2. Literature review");
s7.addText("Evaluation issues in prior work", {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});

const tableRows = [
    [
        { text: "Method", options: { bold: true, color: COLOR_WHITE, fill: COLOR_PRIMARY } },
        { text: "Issue", options: { bold: true, color: COLOR_WHITE, fill: COLOR_PRIMARY } },
        { text: "Section", options: { bold: true, color: COLOR_WHITE, fill: COLOR_PRIMARY } }
    ],
    [ "RCI, Reflexion", "Oracle label dependence", "Section 3" ],
    [ "Multi-Agent Debate", "Unfair comparison", "Section 4" ],
    [ "Self-Refine", "Sub-optimal prompts", "Section 5" ]
];
s7.addTable(tableRows, {
    x: 1.0, y: 2.0, w: 8.0,
    rowH: 0.6, fill: COLOR_CARD_BG, color: COLOR_TEXT_ON_LIGHT, fontSize: 16, fontFace: FONT_BODY,
    border: { type: 'solid', color: COLOR_WHITE, pt: 2 }, align: 'left', valign: 'middle'
});

// Slide 8 — Benchmarks
let s8 = pres.addSlide();
s8.background = { fill: COLOR_WHITE };
addBaseTemplate(s8, 8, "3. Methodology");
s8.addText("Benchmarks", {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const bmarks = [
    { title: "GSM8K", desc: "1,319 math word problems.\nGrade school level." },
    { title: "CommonSenseQA", desc: "1,221 multi-choice commonsense questions." },
    { title: "HotpotQA", desc: "100 multi-hop QA.\nExact match metric." }
];
bmarks.forEach((b, i) => {
    let bx = 0.5 + i * 3.1;
    s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: bx, y: 2.0, w: 2.8, h: 2.5,
        fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
        shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
    });
    s8.addText(b.title, {
        x: bx + 0.2, y: 2.2, w: 2.4, h: 0.5,
        fontSize: 20, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
    });
    s8.addText(b.desc, {
        x: bx + 0.2, y: 2.8, w: 2.4, h: 1.5,
        fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
    });
});

// Slide 9 — Models tested
let s9 = pres.addSlide();
s9.background = { fill: COLOR_WHITE };
addBaseTemplate(s9, 9, "3. Methodology");
s9.addText("Models tested", {
    x: 0.5, y: 1.0, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const mods = ["GPT-3.5-Turbo", "GPT-4", "GPT-4-Turbo", "Llama-2-70B"];
mods.forEach((m, i) => {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let cx = 1.0 + col * 4.2;
    let cy = 1.8 + row * 1.0;
    s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: 3.8, h: 0.8,
        fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
        shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
    });
    s9.addText(m, {
        x: cx + 0.2, y: cy + 0.2, w: 3.4, h: 0.4,
        fontSize: 20, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
    });
});
s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 4.0, w: 8.0, h: 0.8,
    fill: { color: COLOR_SECONDARY }, rectRadius: 0.1
});
s9.addText("Setup: Max 2 rounds. Temperature = 1 for GPT, 0.7 for Llama. Standard sample sizes.", {
    x: 1.2, y: 4.2, w: 7.6, h: 0.4,
    fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
});

// Slide 10 — Experimental procedure
let s10 = pres.addSlide();
s10.background = { fill: COLOR_WHITE };
addBaseTemplate(s10, 10, "3. Methodology");
s10.addText("Experimental procedure", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const steps = [
    "1. Generate initial response",
    "2. Ask model to review and find problems",
    "3. Ask model to improve based on review",
    "4. Repeat (max 2 rounds)"
];
steps.forEach((step, i) => {
    s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.5, y: 1.6 + i * 0.8, w: 5.5, h: 0.6,
        fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
        shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
    });
    s10.addText(step, {
        x: 0.7, y: 1.7 + i * 0.8, w: 5.1, h: 0.4,
        fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0
    });
});
s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.5, y: 2.4, w: 3.0, h: 1.4,
    fill: { color: COLOR_SECONDARY }, rectRadius: 0.1
});
s10.addText("At step 2, we compare intrinsic (model's own review) vs oracle (ground truth provided).", {
    x: 6.7, y: 2.6, w: 2.6, h: 1.0,
    fontSize: 14, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
});

// Slide 11 — Section opener: Results
let s11 = pres.addSlide();
s11.background = { fill: COLOR_WHITE };
addBaseTemplate(s11, 11, "4. Main results");
s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.0, h: 5.625, fill: { color: COLOR_PRIMARY } });
s11.addText("04", {
    x: 0.2, y: 1.5, w: 2.6, h: 1.0,
    fontSize: 60, color: COLOR_WHITE, fontFace: FONT_TITLE, bold: true, align: 'left', margin: 0
});
s11.addText("Main results", {
    x: 0.2, y: 2.5, w: 2.6, h: 1.0,
    fontSize: 40, color: COLOR_WHITE, fontFace: FONT_TITLE, bold: true, align: 'left', margin: 0
});
s11.addText("Intrinsic self-correction fails across all models and benchmarks.", {
    x: 3.5, y: 2.0, w: 5.8, h: 1.5,
    fontSize: 28, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0
});

// Slide 12 — Performance drops
let s12 = pres.addSlide();
s12.background = { fill: COLOR_WHITE };
addBaseTemplate(s12, 12, "4. Main results");
s12.addText("Performance drops after self-correction", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const rTable = [
    [
        { text: "Model & Task", options: { bold: true, color: COLOR_WHITE, fill: COLOR_PRIMARY } },
        { text: "Standard", options: { bold: true, color: COLOR_WHITE, fill: '2C5F2D' } },
        { text: "Round 1", options: { bold: true, color: COLOR_WHITE, fill: 'D97706' } },
        { text: "Round 2", options: { bold: true, color: COLOR_WHITE, fill: 'DC2626' } }
    ],
    [ "GPT-3.5: GSM8K", "77.0", "75.2", "72.6" ],
    [ "GPT-3.5: CSQA", "72.5", "63.5", "55.3" ],
    [ "GPT-3.5: HotpotQA", "29", "26", "25" ],
    [ "GPT-4: GSM8K", "92.0", "88.5", "88.0" ],
    [ "GPT-4: CSQA", "78.5", "72.5", "72.0" ],
    [ "GPT-4: HotpotQA", "53", "42", "42" ]
];
s12.addTable(rTable, {
    x: 1.0, y: 1.6, w: 8.0,
    rowH: 0.45, fill: COLOR_CARD_BG, color: COLOR_TEXT_ON_LIGHT, fontSize: 14, fontFace: FONT_BODY,
    border: { type: 'solid', color: COLOR_WHITE, pt: 1 }, align: 'center', valign: 'middle'
});

// Slide 13 — More model results
let s13 = pres.addSlide();
s13.background = { fill: COLOR_WHITE };
addBaseTemplate(s13, 13, "4. Main results");
s13.addText("Additional model results", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const rTable2 = [
    [
        { text: "Model & Task", options: { bold: true, color: COLOR_WHITE, fill: COLOR_PRIMARY } },
        { text: "Standard", options: { bold: true, color: COLOR_WHITE, fill: '2C5F2D' } },
        { text: "Round 1", options: { bold: true, color: COLOR_WHITE, fill: 'D97706' } },
        { text: "Round 2", options: { bold: true, color: COLOR_WHITE, fill: 'DC2626' } }
    ],
    [ "GPT-4-Turbo: GSM8K", "91.5", "88.0", "90.0" ],
    [ "GPT-4-Turbo: CSQA", "84.0", "81.5", "83.0" ],
    [ "Llama-2: GSM8K", "62.0", "43.5", "36.5" ],
    [ "Llama-2: CSQA", "64.0", "37.5", "36.5" ]
];
s13.addTable(rTable2, {
    x: 1.0, y: 1.6, w: 8.0,
    rowH: 0.5, fill: COLOR_CARD_BG, color: COLOR_TEXT_ON_LIGHT, fontSize: 14, fontFace: FONT_BODY,
    border: { type: 'solid', color: COLOR_WHITE, pt: 1 }, align: 'center', valign: 'middle'
});
s13.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 4.0, w: 8.0, h: 0.8,
    fill: { color: 'FEE2E2' }, rectRadius: 0.1
});
s13.addText("Notice Llama-2's catastrophic decline in accuracy.", {
    x: 1.2, y: 4.2, w: 7.6, h: 0.4,
    fontSize: 16, color: '991B1B', fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
});

// Slide 14 — What happens to answers?
let s14 = pres.addSlide();
s14.background = { fill: COLOR_WHITE };
addBaseTemplate(s14, 14, "4. Main results");
s14.addText("What happens to answers?", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
s14.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 1.6, w: 8.0, h: 2.2,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s14.addText("GPT-3.5 on GSM8K transition breakdown:", {
    x: 1.2, y: 1.8, w: 7.6, h: 0.4,
    fontSize: 18, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
});
const ansStats = [
    { text: "74.7%", desc: "Unchanged", color: '6B7280' },
    { text: "8.9%", desc: "Correct → Incorrect", color: 'DC2626' },
    { text: "7.6%", desc: "Incorrect → Correct", color: '059669' },
    { text: "8.8%", desc: "Incorrect → Incorrect", color: '6B7280' }
];
ansStats.forEach((stat, i) => {
    s14.addText(stat.text, {
        x: 1.2 + i * 1.9, y: 2.4, w: 1.8, h: 0.6,
        fontSize: 24, color: stat.color, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
    });
    s14.addText(stat.desc, {
        x: 1.2 + i * 1.9, y: 3.0, w: 1.8, h: 0.6,
        fontSize: 12, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
    });
});
s14.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 4.0, w: 8.0, h: 0.8,
    fill: { color: COLOR_SECONDARY }, rectRadius: 0.1
});
s14.addText("Key finding: The model changes correct answers to incorrect ones more often than it fixes incorrect ones.", {
    x: 1.2, y: 4.1, w: 7.6, h: 0.6,
    fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
});

// Slide 15 — Multi-Agent Debate vs Self-Consistency
let s15 = pres.addSlide();
s15.background = { fill: COLOR_WHITE };
addBaseTemplate(s15, 15, "5. Why does self-correction fail?");
s15.addText("Multi-Agent Debate vs Self-Consistency", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 34, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
// Left
s15.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.8, w: 4.2, h: 2.0,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s15.addText("Multi-Agent Debate", {
    x: 0.7, y: 2.0, w: 3.8, h: 0.4,
    fontSize: 18, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
});
s15.addText("Multiple LLM instances critique each other over several rounds to reach a consensus.", {
    x: 0.7, y: 2.5, w: 3.8, h: 1.0,
    fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
});
// Right
s15.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.3, y: 1.8, w: 4.2, h: 2.0,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s15.addText("Self-Consistency", {
    x: 5.5, y: 2.0, w: 3.8, h: 0.4,
    fontSize: 18, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
});
s15.addText("Sample multiple responses independently and take the majority vote.", {
    x: 5.5, y: 2.5, w: 3.8, h: 1.0,
    fontSize: 15, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'center', margin: 0
});
s15.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 4.0, w: 8.0, h: 0.8,
    fill: { color: COLOR_SECONDARY }, rectRadius: 0.1
});
s15.addText("Result: Self-consistency matches or beats debate at the same inference cost.", {
    x: 1.2, y: 4.2, w: 7.6, h: 0.4,
    fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
});

// Slide 16 — The prompt design trap
let s16 = pres.addSlide();
s16.background = { fill: COLOR_WHITE };
addBaseTemplate(s16, 16, "5. Why does self-correction fail?");
s16.addText("The prompt design trap", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
s16.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.6, w: 9.0, h: 1.2,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s16.addText("Step 1: Weak initial prompt → Poor response → Self-correction 'improves' it.", {
    x: 0.8, y: 2.0, w: 8.4, h: 0.4,
    fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0
});

s16.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.0, w: 9.0, h: 1.2,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s16.addText("Step 2: Strong initial prompt → Better response → Self-correction hurts performance.", {
    x: 0.8, y: 3.4, w: 8.4, h: 0.4,
    fontSize: 16, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0
});
s16.addText("Improvements in prior work came from better instructions in the correction prompt, not actual self-correction abilities.", {
    x: 0.5, y: 4.4, w: 9.0, h: 0.6,
    fontSize: 15, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'center', margin: 0
});

// Slide 17 — Root cause
let s17 = pres.addSlide();
s17.background = { fill: COLOR_WHITE };
addBaseTemplate(s17, 17, "5. Why does self-correction fail?");
s17.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.0, h: 5.625, fill: { color: COLOR_PRIMARY } });
s17.addText("The core issue", {
    x: 0.2, y: 2.0, w: 2.6, h: 1.0,
    fontSize: 40, color: COLOR_WHITE, fontFace: FONT_TITLE, bold: true, align: 'left', margin: 0
});
s17.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 1.5, w: 5.8, h: 2.6,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s17.addText("LLMs cannot judge whether their own reasoning is correct. The self-correction prompt biases models toward changing their answers, and correct answers are flipped to incorrect ones more often than the reverse.", {
    x: 3.8, y: 1.8, w: 5.2, h: 2.0,
    fontSize: 20, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0
});

// Slide 18 — Key takeaways
let s18 = pres.addSlide();
s18.background = { fill: COLOR_WHITE };
addBaseTemplate(s18, 18, "6. Conclusion");
s18.addText("Key takeaways", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
const takes = [
    "1. Intrinsic self-correction does not improve LLM reasoning.",
    "2. Prior claimed improvements relied on oracle feedback or unfair comparisons.",
    "3. External feedback and tools remain the path to real correction."
];
takes.forEach((take, i) => {
    s18.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 1.0, y: 1.6 + i * 1.1, w: 8.0, h: 0.9,
        fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
        shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
    });
    s18.addText(take, {
        x: 1.2, y: 1.8 + i * 1.1, w: 7.6, h: 0.5,
        fontSize: 18, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0
    });
});

// Slide 19 — Limitations and future work
let s19 = pres.addSlide();
s19.background = { fill: COLOR_WHITE };
addBaseTemplate(s19, 19, "6. Conclusion");
s19.addText("Limitations and future work", {
    x: 0.5, y: 0.8, w: 9, h: 0.6,
    fontSize: 36, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'center', margin: 0
});
// Left
s19.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.6, w: 4.2, h: 3.2,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s19.addText("Limitations", {
    x: 0.7, y: 1.8, w: 3.8, h: 0.4,
    fontSize: 20, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0
});
s19.addText([
    { text: "Specific reasoning tasks tested (math, commonsense, QA)", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Tested on 2023 model versions", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Prompting-only approaches examined", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "HotpotQA sample size is small (100 questions)", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Does not cover code, safety, or translation", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true } }
], {
    x: 0.7, y: 2.3, w: 3.8, h: 2.3, valign: 'top', margin: 0
});

// Right
s19.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.3, y: 1.6, w: 4.2, h: 3.2,
    fill: { color: COLOR_CARD_BG }, rectRadius: 0.1,
    shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 3, offset: 2, angle: 45 }
});
s19.addText("Future directions", {
    x: 5.5, y: 1.8, w: 3.8, h: 0.4,
    fontSize: 20, color: COLOR_PRIMARY, fontFace: FONT_BODY, bold: true, align: 'left', margin: 0
});
s19.addText([
    { text: "Training-based self-correction methods", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Better verification and correctness checkers", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Tool-augmented self-correction (code exec, search)", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Standardized evaluation protocols for LLM reflection", options: { fontSize: 13, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, bullet: true } }
], {
    x: 5.5, y: 2.3, w: 3.8, h: 2.3, valign: 'top', margin: 0
});

// Slide 20 — References
let s20 = pres.addSlide();
s20.background = { fill: COLOR_WHITE };
addBaseTemplate(s20, 20, "References");
s20.addText("References", {
    x: 0.5, y: 0.55, w: 9, h: 0.5,
    fontSize: 32, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_TITLE, bold: true, align: 'left', margin: 0
});
const refs = [
    "Huang, J., Weng, X., Liang, Z., Peng, H., Wu, Z., & Zhang, M. (2024). Large Language Models Cannot Self-Correct Reasoning Yet. ICLR 2024.",
    "Kim, G., Baldi, P., & McAleer, S. (2023). Language Models can Solve Computer Tasks. NeurIPS 2023.",
    "Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., & Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. NeurIPS 2023.",
    "Madaan, A., Tandon, N., Gupta, P., et al. (2023). Self-Refine: Iterative Refinement with Self-Feedback. NeurIPS 2023.",
    "Du, Y., Li, S., Torralba, A., Tenenbaum, J., & Mordatch, I. (2023). Improving Factuality and Reasoning in Language Models through Multiagent Debate.",
    "Wang, X., Wei, J., Schuurmans, D., et al. (2022). Self-Consistency Improves Chain of Thought Reasoning in Language Models. ICLR 2023.",
    "Cobbe, K., Kosaraju, V., Bavarian, M., et al. (2021). Training Verifiers to Solve Math Word Problems."
];
refs.forEach((r, i) => {
    s20.addText(r, {
        x: 0.5, y: 1.25 + i * 0.5, w: 9.0, h: 0.45,
        fontSize: 10, color: COLOR_TEXT_ON_LIGHT, fontFace: FONT_BODY, align: 'left', margin: 0, valign: 'top'
    });
});

pres.writeFile({ fileName: "/Users/nafiskabbo/development/presentation/output/LLM_Self_Correction_ICLR2024_Group_Presentation-v2.pptx" }).then(() => {
    console.log("Presentation generated successfully!");
}).catch(err => {
    console.error(err);
});
