# Full Presentation Speech Script
**Paper:** Large Language Models Cannot Self-Correct Reasoning Yet (ICLR 2024)
**Authors:** Jie Huang (UIUC), Xinyun Chen, Swaroop Mishra, Huaixiu Steven Zheng, Adams Wei Yu, Xinying Song, Denny Zhou (Google DeepMind)
**Conference:** International Conference on Learning Representations (ICLR) 2024
**Group Presenters in speaking order:**
1. Nafis Islam Kabbo (2303180) - Section 1: Introduction and Research Problem (Slides 01-05, ~3.5 mins)
2. Srijon (2303179) - Section 2: Literature Review and Background (Slides 06-08, ~3.0 mins)
3. Anindo (2303181) - Section 3: Methodology and Experimental Setup (Slides 09-11, ~3.0 mins)
4. Mahid (2303127) - Section 4: Main Results (Slides 12-15, ~3.5 mins)
5. Jebon (2303160) - Section 5: Why Does Self-Correction Fail? (Slides 16-19, ~3.5 mins)
6. Refayet (2303148) - Section 6: Conclusion, Limitations, and Future Directions (Slides 20-23, ~3.5 mins)

---

# Slide 01: Title Slide
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~45 seconds

## Spoken Script

Good morning everyone. Respected professor and fellow classmates.

We are presenting *Large Language Models Cannot Self-Correct Reasoning Yet*, published at ICLR 2024 by Jie Huang at UIUC along with Denny Zhou and colleagues at Google DeepMind.

If you have ever used ChatGPT for math or multi-step logic, you know the familiar scenario. The model outputs a confident, step-by-step chain of thought, but arrives at the wrong final answer. When you prompt it to check its work, it politely apologizes and produces a completely different wrong answer. Today, our team will explore why this happens and why previous claims that language models can self-correct reasoning were largely experimental artifacts.

I will introduce the reasoning vulnerability and our central research question. Srijon will cover prior frameworks and literature flaws. Anindo will detail the experimental methodology. Mahid will present the empirical benchmark results. Jebon will analyze why verification fails, and Refayet will conclude with limitations and constructive future directions.

Let us begin.

---

# Slide 02: Presentation Outline
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** Overview
**Target Duration:** ~40 seconds

## Spoken Script

Here is the roadmap for our presentation across six focused sections:

Section 1, Introduction. Why sequential multi-step reasoning is fragile and what self-correction promised.

Section 2, Background and Literature. Prior frameworks including RCI, Reflexion, Self-Refine, and Debate, alongside their evaluation confounders.

Section 3, Methodology. Evaluation benchmarks across GSM8K, CommonSenseQA, and HotpotQA across four frontier language models.

Section 4, Results. Empirical proof showing that intrinsic self-correction consistently decreases accuracy.

Section 5, Analysis. Why compute parity, prompt design artifacts, compliance bias, and shared parameters prevent successful verification.

Section 6, Conclusion and Future Work. Where tool-augmented refinement works and fair standards for future research.

---

# Slide 03: Large Language Models and Reasoning
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~50 seconds

## Spoken Script

Let us look at the flowchart on this slide to understand why multi-step reasoning breaks down.

Large language models generate text autoregressively, predicting one token at a time from left to right. When solving reasoning tasks using Chain of Thought, the model generates intermediate deductions sequentially.

As illustrated in our diagram, the input question enters the system. In step one of the reasoning chain, the deduction is sound. However, in step two, a slight arithmetic or logical slip occurs. Because every subsequent token is conditioned on previous tokens, step three inherits the corrupted premise. By the time the model outputs its final answer, the result is completely wrong.

This is the domino effect of sequential reasoning. The model has no internal mechanism to pause, backtrack, or recognize that step two was flawed. Self-correction was proposed as the solution to this exact problem.

---

# Slide 04: The Concept of Self-Correction
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~45 seconds

## Spoken Script

Researchers proposed an intuitive three-step loop to address reasoning failures.

Step one, Draft Answer. The model generates an initial Chain of Thought and tentative answer.

Step two, Self-Critique. The model receives a prompt such as "Review your reasoning and find any flaws."

Step three, Revised Answer. The model updates its reasoning and outputs a refined answer. This loop is repeated for up to two rounds.

The promise was autonomous reasoning refinement without human intervention. However, the critical caveat is that this entire process is intrinsic. It relies on the exact same model with frozen parameters talking to itself, without calculators, external verifiers, or ground truth labels. That brings us to the central paradox of the paper.

---

# Slide 05: The Central Research Question
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~50 seconds

## Spoken Script

Here is the central question that drives this entire study:

"If a model can correct a mistake, why did it not get it right the first time?"

Consider the mechanics. The weights of the model are frozen. When the model critiques its own answer, no new information or external signal has been added. You are feeding the model's own flawed generation back into the very network that generated it.

The authors isolate intrinsic self-correction specifically. While external tool assistance like code execution is valuable, the paper asks whether a model alone possesses the self-awareness to fix its own reasoning. If intrinsic correction worked, it would represent free accuracy gains. The paper proves it does not.

I will now hand over to Srijon to examine the prior literature.

---

# Slide 06: Prior Self-Correction Frameworks
**Speaker:** Srijon (2303179)
**Topic:** 2. Literature Review and Background
**Target Duration:** ~50 seconds

## Spoken Script

Thank you, Kabbo. I am Srijon, and I will examine the four prominent frameworks in literature.

As shown in our four visual architecture cards:

First, RCI, or Recursive Critique and Improvement, from NeurIPS 2023. It prompts the model to recursively detect and patch code errors zero-shot.

Second, Reflexion, also from NeurIPS 2023. It converts binary test execution failures into verbal memory stored across multiple trial attempts.

Third, Self-Refine, from NeurIPS 2023. It runs an iterative feedback loop using multi-aspect task rubrics across style and logic.

Fourth, Multi-Agent Debate. It deploys multiple model instances that debate divergent solutions to reach consensus.

All four papers claimed substantial gains of seven to fifteen percent. However, as our bottom callout highlights, these reported improvements stemmed from hidden evaluation confounders.

---

# Slide 07: Intrinsic vs. External Feedback
**Speaker:** Srijon (2303179)
**Topic:** 2. Literature Review and Background
**Target Duration:** ~60 seconds

## Spoken Script

This slide contrasts the two fundamentally different regimes that prior literature often conflated.

On the left, we trace Intrinsic Self-Correction. The model generates a draft, receives an unguided prompt to find flaws, and attempts a blind revision. Because the weights are frozen and no external ground truth exists, the model has no reliable verification signal. It second-guesses sound steps, causing accuracy to drop across rounds by up to 27.5 percent.

On the right, we trace External and Tool-Assisted Feedback. Here, the model generates executable code or formulas evaluated by a deterministic engine like a Python interpreter or oracle. The environment returns exact error traces. The model then conditions its update on this objective ground truth, achieving genuine gains of seven to fifteen percent.

The core takeaway is clear: without external grounding, a frozen model cannot produce a new verification signal.

---

# Slide 08: Flaws in Prior Evaluations
**Speaker:** Srijon (2303179)
**Topic:** 2. Literature Review and Background
**Target Duration:** ~55 seconds

## Spoken Script

As shown in our comparison chart and diagnostic breakdown from Table 1, prior claims relied on three root confounders.

Notice the bars on our chart: reported gains of four to ten percent completely collapse to zero or negative values when properly controlled.

First, Oracle Leakage, affecting RCI and Reflexion. The evaluation harness secretly used test labels to alert the model only when its answer was wrong. By shielding correct answers from revision, apparent scores could only go up. In real applications, no oracle exists.

Second, Unfair Compute Parity, affecting Multi-Agent Debate. Debate consumed three to six times more compute than single-shot baselines. When compared against Self-Consistency at equal sample budgets, the debate advantage completely vanished.

Third, Prompt Design Distortion, affecting Self-Refine. Initial prompts omitted critical rules, which were only supplied during the feedback prompt. The model was merely following delayed instructions rather than self-correcting logic.

When these confounders are eliminated, intrinsic reasoning gains drop to zero. Anindo will now explain the methodology.

---

# Slide 09: Evaluation Benchmarks
**Speaker:** Anindo (2303181)
**Topic:** 3. Methodology and Experimental Setup
**Target Duration:** ~50 seconds

## Spoken Script

Thank you, Srijon. I am Anindo, and I will present the methodology.

The authors evaluated intrinsic self-correction across three rigorous reasoning benchmarks:

First, GSM8K, containing 1,319 grade school math word problems requiring two to eight arithmetic steps. This tests numerical tracking and multi-step state maintenance.

Second, CommonSenseQA, with 1,221 multiple-choice questions requiring commonsense knowledge with strong distractors.

Third, HotpotQA, evaluated on a 100-sample multi-hop subset in a closed-book setting to test factual synthesis without retrieval.

Notice the prior claims highlighted on each card. Prior studies claimed up to seven percent gains on GSM8K and fifteen percent on CommonSenseQA using oracle assistance. This study evaluates what happens when those artificial crutches are removed.

---

# Slide 10: Models and Experimental Controls
**Speaker:** Anindo (2303181)
**Topic:** 3. Methodology and Experimental Setup
**Target Duration:** ~45 seconds

## Spoken Script

The evaluation spanned four prominent language models under standardized conditions:

1. GPT-3.5-Turbo, snapshot 0613.
2. GPT-4, the August 2023 production snapshot.
3. GPT-4-Turbo, snapshot 1106-preview.
4. Llama-2-70B-Chat, the leading open-weight baseline.

The experimental controls were maintained with strict scientific rigor:
- Chain of Thought prompting in few-shot and zero-shot settings.
- Temperature set to 1.0 for GPT models and 0.7 for Llama-2.
- A maximum of two self-correction rounds per problem.
- Generic feedback prompts without leading hints.
- Direct side-by-side comparisons between intrinsic and oracle-guided regimes.

---

# Slide 11: Prompting Procedures
**Speaker:** Anindo (2303181)
**Topic:** 3. Methodology and Experimental Setup
**Target Duration:** ~55 seconds

## Spoken Script

This slide illustrates the exact prompting procedure.

Across the top, the generation cycle progresses from initial draft generation to critique, revision, and second-round iteration.

The critical comparison is shown at the bottom:
Under the Oracle regime on the bottom left, an external verifier checks the initial answer. If correct, the process stops. If wrong, revision is triggered. This artificial setup prevents correct answers from being modified, creating inflated accuracy numbers.

Under the realistic Intrinsic regime on the bottom right, no oracle exists. The model must blindly evaluate every problem. Because it cannot verify its own logic, it doubts correct deductions and changes them to wrong ones.

Mahid will now walk us through the empirical results.

---

# Slide 12: Intrinsic Self-Correction Fails
**Speaker:** Mahid (2303127)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~45 seconds

## Spoken Script

Thank you, Anindo. I am Mahid, and I will present the main empirical results.

Here is the central finding of the entire paper:
Intrinsic self-correction does not improve reasoning accuracy. Across all evaluated models and benchmarks, accuracy consistently declines after self-correction.

This failure exhibits three defining properties:
First, it is Universal. Every tested model, including GPT-3.5, GPT-4, GPT-4-Turbo, and Llama-2, experiences performance drops across rounds.
Second, it is Task-Agnostic. Whether testing arithmetic on GSM8K, logic on CommonSenseQA, or multi-hop QA on HotpotQA, self-correction consistently harms performance.
Third, it exposes the Oracle Illusion. The only way prior methods appeared to work was by relying on external ground truth signals.

---

# Slide 13: GPT-3.5 and GPT-4 Benchmark Results
**Speaker:** Mahid (2303127)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~55 seconds

## Spoken Script

Let us examine the exact numbers in Table 2 for GPT-3.5 and GPT-4.

In the bar chart, dark slate represents standard Chain of Thought, amber represents Round 1 self-correction, and crimson represents Round 2.

In every benchmark category, the bars decline with each round:
On CommonSenseQA with GPT-3.5, accuracy drops from 72.5 percent down to 55.3 percent in Round 2, representing a massive 17.2 percentage point collapse.
On HotpotQA with GPT-4, accuracy falls from 53.0 percent down to 42.0 percent, an 11 percentage point drop.
Even on GSM8K with GPT-4, where initial accuracy is a strong 92.0 percent, self-correction degrades performance to 88.0 percent.

Rather than fixing reasoning errors, intrinsic critique systematically degrades valid reasoning chains.

---

# Slide 14: GPT-4-Turbo and Llama-2 Results
**Speaker:** Mahid (2303127)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~50 seconds

## Spoken Script

Does this degradation persist in newer frontier and open-weight models? Yes.

For GPT-4-Turbo, accuracy drops on GSM8K from 91.5 percent to 90.0 percent, and on CommonSenseQA from 84.0 percent to 83.0 percent.

The collapse is especially severe for Llama-2-70B-Chat. On GSM8K, accuracy plunges from 62.0 percent to 36.5 percent, a 25.5 point decrease. On CommonSenseQA, it drops from 64.0 percent to 36.5 percent, losing nearly half its performance.

Why does Llama-2 suffer such a massive collapse? Open-weight chat models exhibit extreme instruction compliance. When prompted to "find flaws", the model assumes an error must exist, abandons its sound reasoning, and fabricates a new, incorrect answer.

---

# Slide 15: Answer Transition Dynamics
**Speaker:** Mahid (2303127)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~50 seconds

## Spoken Script

Figure 1 from the paper explains the underlying transition dynamics behind this accuracy decline on GSM8K with GPT-3.5.

Looking at the doughnut chart:
74.7 percent of answers remained unchanged.
8.8 percent stayed incorrect.
7.6 percent of answers were successfully repaired from wrong to correct.
However, 8.9 percent of answers were flipped from correct to wrong.

Comparing the beneficial fixes of 7.6 percent against the harmful flips of 8.9 percent reveals a net negative shift of minus 1.3 percent. Because unguided self-critique damages more correct answers than it fixes, each round compounds overall error.

Jebon will now analyze the root causes of this failure.

---

# Slide 16: Multi-Agent Debate vs. Self-Consistency
**Speaker:** Jebon (2303160)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~55 seconds

## Spoken Script

Thank you, Mahid. I am Jebon, and I will analyze the structural causes of self-correction failure.

First, let us examine Multi-Agent Debate under equal compute budgets, shown in Table 4.

Proponents of debate claimed emergent reasoning through multi-agent critique. In our chart, single-shot is shown in slate, debate in crimson, and Self-Consistency in green. Self-Consistency simply samples multiple reasoning paths and takes a majority vote.

On GSM8K, single-shot achieves 77.0 percent while debate achieves 81.0 percent. However, Self-Consistency with the exact same number of samples achieves 82.5 percent.

The same pattern holds across CommonSenseQA and Chess QA. When compute is matched, independent sampling and majority voting consistently beats multi-agent debate with lower latency and zero agent-to-agent coordination overhead.

---

# Slide 17: The Prompt Design Trap
**Speaker:** Jebon (2303160)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~55 seconds

## Spoken Script

The second major cause is the Prompt Design Trap, illustrated in Table 5.

On the left, we see how flawed setups like Self-Refine operated. The initial prompt omitted critical constraints, such as required keywords. In the feedback step, the prompt explicitly reminded the model of the missing rule. The model updated its answer, and the authors claimed a breakthrough in self-correction.

On the right, Huang et al. tested a fair setup by including all task constraints in the initial prompt. The model produced a high-quality answer immediately, and subsequent self-correction only degraded performance.

The takeaway is clear: the apparent gains in prior studies were prompt engineering artifacts, not genuine reasoning self-correction.

---

# Slide 18: Case Study: The Gaslighting Effect
**Speaker:** Jebon (2303160)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~60 seconds

## Spoken Script

To understand this breakdown concretely, let us trace Figure 2: the famous Yogurt Problem from GSM8K.

The problem states: "Terry eats 2 yogurts a day. They are sold in 4-packs at $5.00 per pack. How much does he spend on yogurts in 30 days?"

In Phase 1 on the left, the model solves the problem flawlessly in Round 1:
30 days times 2 yogurts equals 60 yogurts. 60 divided by 4 equals 15 packs. 15 packs times $5.00 equals $75.00. The answer is completely correct.

In Phase 2 in the center, the model is prompted: "Review your previous answer and find any flaws." Because of instruction compliance bias, the model presumes the user is alerting it to an error and invents a flaw.

In Phase 3 on the right, the model hallucinates an imaginary mistake in Round 2, falsely concluding that Terry buys one pack per day, calculating 30 times $5 to arrive at $150.00.

The critique prompt effectively gaslights the model into abandoning valid logic. Refayet will now present our conclusion.

---

# Slide 19: The Verification Barrier
**Speaker:** Jebon (2303160)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~50 seconds

## Spoken Script

The core theoretical obstacle is the Verification Barrier, which consists of three pillars:

First, Shared Parameters and Knowledge Parity. The critic and the generator share the exact same weights. If a 70-billion-parameter model lacked the reasoning capacity to solve the problem initially, the same parameters cannot reliably verify the output.

Second, Compliance Bias. Instruction-tuned models are trained to follow user suggestions. When prompted to find errors, they actively search for flaws, often inventing mistakes in sound steps.

Third, Lack of Grounding. Without an external execution environment like Python, the model cannot distinguish between a genuine correction and a plausible-sounding hallucination.

Refayet will now present our conclusions and future directions.

---

# Slide 20: Key Takeaways
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion, Limitations, and Future Directions
**Target Duration:** ~45 seconds

## Spoken Script

Thank you, Jebon. I am Refayet, and I will conclude our presentation.

Here are the three core takeaways from Huang et al.:

First, Intrinsic Self-Correction Fails for Multi-Step Reasoning. When isolated from external feedback, self-correction consistently decreases reasoning accuracy across benchmarks and architectures.

Second, Prior Literature Gains Were Evaluation Artifacts. Reported improvements stemmed from oracle feedback leakage, compute budget disparities, and incomplete initial prompts.

Third, External Feedback is Indispensable. Reliable refinement requires external sources of truth, such as code execution environments, learned verifiers, or human feedback.

---

# Slide 21: Study Limitations
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion, Limitations, and Future Directions
**Target Duration:** ~45 seconds

## Spoken Script

To maintain scientific objectivity, we must highlight the study's scope limitations:

Regarding Scope:
- The findings apply specifically to multi-step reasoning, not creative writing, translation, or style editing where self-critique can be beneficial.
- The experiments tested frozen prompting, not models explicitly fine-tuned with reinforcement learning for self-correction.
- The models evaluated reflect the 2023 landscape; newer reasoning models require continuous evaluation.

Regarding Methodology:
- HotpotQA evaluation was limited to 100 samples due to API costs.
- The evaluation focused on closed-book settings without retrieval augmentation.

Acknowledging these boundaries keeps our conclusions clear and well-defined.

---

# Slide 22: Future Directions and Fair Standards
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion, Limitations, and Future Directions
**Target Duration:** ~50 seconds

## Spoken Script

The paper outlines four constructive paths forward for the research community:

First, Tool-Augmented Verification. Integrating deterministic tools like Python interpreters, SQL engines, and theorem provers to serve as objective ground-truth verifiers.

Second, Learned Verifiers and Process Reward Models. Training dedicated discriminator models to score individual reasoning steps, as demonstrated in modern math verification.

Third, Training-Time Search and Reinforcement Learning. Developing tree search, Monte Carlo Tree Search, and test-time compute scaling rather than post-hoc prompting loops.

Fourth, Establishing Fair Evaluation Standards. Requiring equal-compute baselines against Self-Consistency and strictly prohibiting oracle feedback leakage in benchmark reporting.

---

# Slide 23: Thank You and Open Discussions
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion, Limitations, and Future Directions
**Target Duration:** ~40 seconds

## Spoken Script

That concludes our presentation.

On behalf of Kabbo, Srijon, Anindo, Mahid, Jebon, and myself, thank you for your attention.

We now open the floor for questions and discussion, and we invite your thoughts on three key questions:

1. Why does asking a model to find flaws often make it hallucinate errors where none exist?
2. When should we rely on external tools like Python or verifiers instead of prompting alone?
3. How can we design a fair self-correction benchmark that avoids oracle leakage?

Thank you. We welcome your questions.

---
