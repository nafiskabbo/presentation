# Presentation requirements

## Source material

- Paper: *Large Language Models Cannot Self-Correct Reasoning Yet* (ICLR 2024)
- Source PDF: `reference/paper.pdf`

## Output and versioning

- Keep original presentation and speech files unchanged.
- Save new presentations with a version suffix: `-v1`, `-v2`, `-v3`, and so on.
- Use this naming pattern for presentations: `output/LLM_Self_Correction_ICLR2024_Group_Presentation-vN.pptx`
- Save companion speech script in the `speeches/` folder in one unified master presentation script file: `speeches/full_presentation_speech.md`.
- Never overwrite an earlier version unless explicitly instructed.
- Use `reference/paper.pdf` as the source for the paper's content, claims, figures, and citations.

## Deliverable

Create one polished `.pptx` presentation for a six-person university group presentation, along with companion speech script in `speeches/full_presentation_speech.md`. The deck must explain the paper clearly, support a live presentation, and use concise slide copy.

Use the `pptx` skill for PowerPoint creation, editing, structure, rendering, validation, and visual QA. Use the `frontend-design` skill for the visual direction and the `unslop` skill for all written content and speeches.

## Deck and design requirements

- Use a light, primarily white background.
- Choose a deliberate academic palette with restrained accents (crimson/burgundy `#800020`, dark slate `#0F172A`, warm amber `#D97706`, forest green `#166534`, and neutral borders `#E2E8F0`). Avoid generic AI visuals, noisy gradients, excessive rounded cards, and decorative elements that do not support the argument.
- Use a clear typographic hierarchy and consistent spacing throughout the deck (Century Schoolbook headers, Calibri body).
- Keep text concise. Cut wordy paragraphs and eliminate redundancy across slides. Prioritize diagrams, native charts (grouped bars, columns, doughnuts), flowcharts, and informative visuals over heavy text blocks.
- For **Evaluated Models** and **Experimental Controls & Rigor**, write clean, concise bullet points only without long explanatory paragraphs.
- For the **Thank You & Discussion** slide, design a minimal, elegant, and traditional closing page without cluttered or repetitive text.
- Do not use em dashes or en dashes anywhere in slides or speech files. Use commas, colons, or periods instead.
- Cite the paper and any other sources on the relevant slides. Include a references slide in IEEE format.
- Do not display raw URLs anywhere in the deck.
- On the first slide, show the presentation topic and all student names listed in `specs/student-names.txt`.
- Show the current topic on every slide so the audience can follow the structure.
- Put the presentation title in the footer on every slide.
- Add a zero-padded slide counter in `current/total` format, such as `01/24`. The total must match the final slide count.

## Speech script requirements

- Maintain the unified presentation speech script in `speeches/full_presentation_speech.md`.
- Target length: 3 to 4 minutes per presenter (~3.5 minutes average, 45 to 60 seconds per slide).
- Tone: Professional, witty, and engaging for a university audience. Incorporate relatable humor and sharp audience hooks (for example, comparing recursive self-doubt to asking a lost friend for directions, or mentioning expensive slow frontier models) while explaining technical mechanisms clearly.
- Delivery markers: Include clear cues, slide transitions, key emphasis words, and timing guidance.
- Strict constraint: Do not use em dashes anywhere in speech files.

## Presentation topics

Divide the presentation into these six sections, with one group member responsible for each section.

| # | Topic | Presenter | Required coverage |
|---|---|---|---|
| 1 | Introduction and research problem | Nafis Islam Kabbo (2303180) | Define LLMs and self-correction. Explain why reasoning accuracy matters. Introduce the central question: can an LLM recognize and fix its own reasoning mistakes without external feedback? |
| 2 | Literature review and background | Srijon (2303179) | Cover RCI, Reflexion, Self-Refine, and Multi-Agent Debate. Distinguish intrinsic self-correction from self-correction that uses external or oracle feedback. Identify the four evaluation confounders. |
| 3 | Methodology and experimental setup | Anindo (2303181) | Explain the evaluation tasks: GSM8K, CommonSenseQA, and HotpotQA. Cover evaluated models and experimental controls (bullet points only). Contrast oracle feedback vs intrinsic self-correction protocols. |
| 4 | Main results: intrinsic self-correction fails | Mahid (2303127) | Present core findings. Show performance decreases across GPT-3.5, GPT-4, GPT-4-Turbo, and Llama-2. Present answer transition dynamics (correct flipping to incorrect). |
| 5 | Why does self-correction fail? | Jebon (2303160) | Explain Multi-Agent Debate compute parity against Self-Consistency, the prompt design trap, the yogurt case study, and the verification barrier (shared weights and prompt bias). |
| 6 | Conclusion, limitations, and future directions | Refayet (2303148) | State what the paper supports, where self-correction works with external tools, study limitations, future directions (PRMs, RL search), and fair evaluation standards. |

## Quality check

Before delivering the deck, verify that:

- Every slide has the title footer, topic label, and correctly formatted slide number.
- All claims, figures, and borrowed visuals have citations.
- The slide order follows the six topics.
- The deck remains readable when presented on a projector.
- Evaluated Models and Experimental Controls & Rigor contain bullet points only.
- The Thank You slide is minimal, elegant, and traditional.
- No em dashes appear in the presentation or speech scripts.
- The new presentation file is saved with the correct version suffix in `output/`.
- Companion speech files are created in `speeches-vN/`.
- The original presentations and files remain unchanged.
