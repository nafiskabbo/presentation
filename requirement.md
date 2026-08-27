# Presentation requirements

## Source material

- Paper: *Large Language Models Cannot Self-Correct Reasoning Yet* (ICLR 2024)
- Source PDF: `reference/paper.pdf`

## Output and versioning

- Keep the original presentation file unchanged.
- Save new presentations with a version suffix: `-v1`, `-v2`, `-v3`, and so on.
- Use this naming pattern: `output/LLM_Self_Correction_ICLR2024_Group_Presentation-v1.pptx`
- Never overwrite an earlier version. Increase the version number for every new export.
- Use `reference/paper.pdf` as the source for the paper's content, claims, figures, and citations.

## Deliverable

Create one polished `.pptx` presentation for a six-person university group presentation. The deck should explain the paper clearly, support a live presentation, and use concise slide copy.

Use the `pptx` skill for PowerPoint creation, editing, structure, rendering, validation, and visual QA. Use the `frontend-design` skill for the visual direction and the `unslop` skill for all written content.

## Deck requirements

- Use a light, primarily white background.
- Choose a deliberate academic palette with restrained accents. Avoid generic AI visuals, noisy gradients, excessive rounded cards, and decorative elements that do not support the argument.
- Use a clear typographic hierarchy and consistent spacing throughout the deck.
- Keep text short. Prefer diagrams, figures, tables, and carefully selected images when they communicate the point faster than paragraphs.
- Include purposeful, restrained animations that support the speaking flow. Do not animate every element.
- Cite the paper and any other sources on the relevant slides. Include a references slide if needed.
- Do not display raw URLs anywhere in the deck.
- On the first slide, show the presentation topic and all student names listed in `specs/student-names.txt`.
- Show the current topic on every slide so the audience can follow the structure.
- Put the presentation title in the footer on every slide.
- Add a zero-padded slide counter in `current/total` format, such as `01/20`. The total must match the final slide count.

## Presentation topics

Divide the presentation into these six sections, with one group member responsible for each section.

| # | Topic | Required coverage |
|---|---|---|
| 1 | Introduction and research problem | Define LLMs and self-correction. Explain why reasoning accuracy matters. Introduce the central question: can an LLM recognize and fix its own reasoning mistakes without external feedback? |
| 2 | Literature review and background | Cover RCI, Reflexion, Self-Refine, and Multi-Agent Debate. Distinguish intrinsic self-correction from self-correction that uses external or oracle feedback. |
| 3 | Methodology and experimental setup | Explain the evaluation tasks: GSM8K, CommonSenseQA, and HotpotQA. Cover the models, including GPT-3.5, GPT-4, GPT-4-Turbo, and Llama-2; the prompting procedure; and the comparison between oracle-feedback and intrinsic self-correction. |
| 4 | Main results: intrinsic self-correction fails | Present the core findings. Show that performance generally decreases after self-correction without external feedback. Include the finding that a model can change a correct answer into an incorrect one. |
| 5 | Why does self-correction fail? | Explain the paper's two main points: Multi-Agent Debate does not outperform self-consistency when inference cost is controlled, and prompt design can create misleading improvements. Treat this as the main discussion section. |
| 6 | Conclusion, limitations, and future directions | State what the paper supports, where self-correction can work with external feedback or tools, the study's limitations, implications for future LLM research, and the authors' recommendations for fair evaluation. |

## Quality check

Before delivering the deck, verify that:

- Every slide has the title footer, topic label, and correctly formatted slide number.
- All claims, figures, and borrowed visuals have citations.
- The slide order follows the six topics.
- The deck remains readable when presented on a projector.
- Animations, fonts, images, and figures render correctly in PowerPoint.
- The new file is saved with the correct version suffix in `output/`.
- The original presentation remains unchanged.
