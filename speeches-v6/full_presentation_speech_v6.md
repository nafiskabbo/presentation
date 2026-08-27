# Full Presentation Speech Script (Version 6)
**Paper:** Large Language Models Cannot Self-Correct Reasoning Yet (ICLR 2024)
**Group Presenters:**
1. Nafis Islam Kabbo (2303180) - Section 1: Introduction (Slides 01-05, ~3.5 mins)
2. Srijon (2303179) - Section 2: Literature Review (Slides 06-08, ~3.0 mins)
3. Anindo (2303181) - Section 3: Methodology (Slides 09-11, ~3.0 mins)
4. Mahid (2303127) - Section 4: Results (Slides 12-15, ~3.5 mins)
5. Jebon (2303160) - Section 5: Analysis (Slides 16-19, ~3.5 mins)
6. Refayet (2303148) - Section 6: Conclusion & Future Work (Slides 20-24, ~3.5 mins)

---

# Slide 01: Title Slide
**Speaker:** Nafis Islam Kabbo (2303180)  
**Topic:** 1. Introduction and Research Problem  
**Target Duration:** ~45 seconds  

## Spoken Script

Good morning, everyone. Honorable faculty, respected professor, and fellow classmates.

Today, our team is presenting a landmark paper from ICLR 2024 titled *Large Language Models Cannot Self-Correct Reasoning Yet*, authored by Jie Huang from UIUC and researchers from Google DeepMind, including Denny Zhou.

If you have spent any time over the past couple of years experimenting with modern language models, you have probably noticed how impressive their reasoning chains look. But you have probably also noticed how stubbornly they stick to mistakes, or worse, how easily they panic when challenged.

Our presentation is divided into six logical sections. I will introduce the core research problem and our central paradox. Srijon will walk through previous literature and why prior benchmarks were flawed. Anindo will detail the experimental setup across four leading models. Mahid will present the empirical results proving that intrinsic self-correction fails. Jebon will explain the theoretical root causes, including why multi-agent debate is mostly an expensive illusion. Finally, Refayet will cover future directions, test-time search, and our conclusions.

Let us get started.

---

# Slide 02: Presentation Outline
**Speaker:** Nafis Islam Kabbo (2303180)  
**Topic:** Overview  
**Target Duration:** ~45 seconds  

## Spoken Script

Here is our roadmap for today.

We structured this presentation so that every section builds directly on the last:

First, in Section 1, I will frame why reasoning accuracy matters in multi-step derivation and why the dream of autonomous self-correction is so enticing.

In Section 2, Srijon will examine the major frameworks from 2023, like RCI, Reflexion, and Self-Refine, and show how evaluation artifacts created a false sense of security.

In Section 3, Anindo will break down the benchmark tasks, including GSM8K math, CommonsenseQA, and HotpotQA, alongside the experimental controls.

In Section 4, Mahid will show the cold, hard numbers. When models self-correct without external hints, their accuracy drops across the board.

In Section 5, Jebon will explain why this happens, diving into the math of compute parity, prompt traps, and the verification barrier.

Finally, in Section 6, Refayet will outline what actually works, such as Python code execution sandboxes and process reward models, followed by our open Q&A.

---

# Slide 03: Introduction: LLMs & Reasoning
**Speaker:** Nafis Islam Kabbo (2303180)  
**Topic:** 1. Introduction and Research Problem  
**Target Duration:** ~50 seconds  

## Spoken Script

Let us look at why reasoning in Large Language Models is fundamentally fragile.

As shown in the diagram on this slide, modern autoregressive models generate text token by token. To solve complex problems in math, science, or programming, we rely on Chain-of-Thought prompting, where the model breaks the derivation down into intermediate steps.

This works brilliantly when every step is correct. But autoregressive generation has a major weakness: compounding error risk. 

Think of it like a row of falling dominoes. If the model makes a simple arithmetic mistake on step two, say adding five instead of subtracting it, every single subsequent token is conditioned on that false premise. The model builds an elaborate, highly confident, grammatically flawless tower of logic on top of a broken foundation.

And because the model only looks forward, it has no native mechanism to pause, realize it made a mistake three sentences ago, and rewrite the chain. That brings us to the promise of self-correction.

---

# Slide 04: Introduction: The Concept of Self-Correction
**Speaker:** Nafis Islam Kabbo (2303180)  
**Topic:** 1. Introduction and Research Problem  
**Target Duration:** ~45 seconds  

## Spoken Script

To fix this compounding error problem, researchers proposed post-hoc self-correction.

The idea sounds simple and intuitive. It follows a three-step cycle:
Step one, the model generates an initial draft answer.
Step two, we send a critique prompt back to the model: "Review your answer, find any mistakes, and explain why your logic might be flawed."
Step three, the model reads its own critique and generates a revised, corrected solution.

The theoretical promise here was massive. If language models could autonomously refine their outputs, we could build self-healing AI agents that solve math olympiad problems, debug complex codebases, and draft legal briefs completely hands-off.

Naturally, the research community was excited. Several high-profile papers in 2023 claimed that models could indeed self-correct their reasoning. But the authors of this ICLR paper asked a deeper, much more uncomfortable question.

---

# Slide 05: Introduction: The Central Research Paradox
**Speaker:** Nafis Islam Kabbo (2303180)  
**Topic:** 1. Introduction and Research Problem  
**Target Duration:** ~55 seconds  

## Spoken Script

Here is the central research paradox that forms the core of this paper:

"If an LLM has the intrinsic knowledge and reasoning capability to correct a mistake, why did it not produce the correct answer on its first attempt?"

Think about this for a second. The model weights are completely frozen. When you ask it to critique itself, you are not giving it a calculator, you are not giving it a Python compiler, and you are not giving it access to Wikipedia. You are just feeding its own words back into the exact same frozen neural network.

We must clearly separate two concepts:
On the left, we have intrinsic self-correction. That is where the model relies purely on its internal parameters without any outside guidance. This is what the paper investigates.
On the right, we have external feedback, where a Python interpreter or human supervisor verifies the answer. External feedback works, but intrinsic self-correction is where the illusion falls apart.

To explain how prior research missed this distinction, I will now hand over to Srijon for Section 2.

---

# Slide 06: Background & Literature: Prior Frameworks
**Speaker:** Srijon (2303179)  
**Topic:** 2. Literature Review and Background  
**Target Duration:** ~55 seconds  

## Spoken Script

Thank you, Nafis. Hello everyone, I am Srijon, and I will be walking you through the background literature and the flaws in previous evaluation setups.

Throughout 2023, several prominent frameworks emerged claiming that language models could self-correct:

First, RCI by Kim et al. at NeurIPS 2023, which introduced Recursive Criticism and Improvement for computer tasks and reasoning.
Second, Reflexion by Shinn et al., which maintained verbal memories in a scratchpad to help agents learn from past mistakes.
Third, Self-Refine by Madaan et al., which applied multi-turn feedback loops to iterative text and code improvement.
And fourth, Multi-Agent Debate by Du et al., where multiple instances of ChatGPT debated each other across several rounds to reach a consensus.

All of these papers reported impressive performance gains. Some claimed accuracy boosts of seven to fifteen percent. But Huang et al. took a closer look at the experimental code and discovered critical evaluation flaws.

---

# Slide 07: Background & Literature: Intrinsic vs External Feedback
**Speaker:** Srijon (2303179)  
**Topic:** 2. Literature Review and Background  
**Target Duration:** ~55 seconds  

## Spoken Script

The first major finding in our literature analysis is the sharp division shown on this diagram: Intrinsic versus External Feedback.

On the left side, look at Intrinsic Self-Correction. The model runs in a closed loop. It generates a response, critiques itself using generic prompts, and tries to fix errors. No ground truth labels, no compilers, no human hints. As the paper proves, this consistently fails on reasoning tasks.

On the right side, look at External Feedback. Here, an external verifier tells the model, "Your calculation on line four produced a syntax error," or "Unit test number two failed with output forty-two." 

External feedback works because it injects brand new, verified ground-truth information from the outside world. The mistake prior literature made was conflating external tool verification with intrinsic model reasoning, giving the impression that the model was thinking things through on its own.

---

# Slide 08: Background & Literature: Flaws in Prior Evaluations
**Speaker:** Srijon (2303179)  
**Topic:** 2. Literature Review and Background  
**Target Duration:** ~60 seconds  

## Spoken Script

Table 1 from the paper summarizes the four major methodological flaws that distorted earlier research findings:

First, Oracle Label Leakage in RCI and Reflexion. These systems only triggered self-correction when the test environment signaled that the answer was wrong. In the real world, you do not have an oracle telling you when your AI made a mistake. If you only correct wrong answers and never touch correct ones, your score can only go up. That is an oracle filter, not self-correction.

Second, Unfair Inference Cost in Multi-Agent Debate. The debate papers compared a three-agent, three-round debate against a single-shot prompt. That gives debate nine times more compute. When you give the single-shot model the same compute using simple majority voting, the debate advantage vanishes.

Third, Incomplete Initial Prompts in Self-Refine. The initial prompt omitted key constraints, which were then conveniently added in the critique prompt.

When Huang et al. fixed these confounders, the reported gains disappeared. Now, Anindo will explain our methodology.

---

# Slide 09: Methodology: Tasks & Benchmarks
**Speaker:** Anindo (2303181)  
**Topic:** 3. Methodology and Experimental Setup  
**Target Duration:** ~55 seconds  

## Spoken Script

Thank you, Srijon. Hello everyone, I am Anindo, and I will present the methodology, benchmark datasets, and experimental protocols.

To evaluate self-correction rigorously, the authors selected three established reasoning benchmarks:

First, GSM8K, containing 1,319 grade-school math word problems. These questions require two to eight steps of sequential arithmetic. Tracking numerical state makes this an ideal test for compounding errors.

Second, CommonSenseQA, consisting of 1,221 multiple-choice questions. This tests commonsense relations with subtle semantic distractors designed to fool surface-level keyword matching.

Third, HotpotQA, evaluating multi-hop question answering across Wikipedia passages in a closed-book setting. This tests whether a model can synthesize multiple disparate facts without hallucinating.

Together, these three datasets test arithmetic, commonsense deduction, and factual synthesis under strict evaluation metrics.

---

# Slide 10: Methodology: Models & Setup
**Speaker:** Anindo (2303181)  
**Topic:** 3. Methodology and Experimental Setup  
**Target Duration:** ~55 seconds  

## Spoken Script

On this slide, we summarize the evaluated models and experimental controls.

For the models, the authors tested four leading architectures:
1. GPT-3.5-Turbo, using the standard gpt-3.5-turbo-0613 snapshot.
2. GPT-4, using the production snapshot from August 2023.
3. GPT-4-Turbo, using the gpt-4-1106-preview release.
4. Llama-2-70B-Chat, representing the leading open-weight foundation model.

For experimental rigor, the controls were standardized:
- Zero-shot and few-shot Chain-of-Thought prompting across all tasks.
- Temperature set to 1.0 for GPT models and 0.7 for Llama-2-70B.
- A standardized limit of two correction rounds per problem.
- Generic feedback prompts that provide no hints or answer leakage.
- Direct side-by-side comparison between intrinsic correction and oracle guidance.

Now let us look at the prompting protocols.

---

# Slide 11: Methodology: Prompting Protocols
**Speaker:** Anindo (2303181)  
**Topic:** 3. Methodology and Experimental Setup  
**Target Duration:** ~60 seconds  

## Spoken Script

Let us examine the exact prompting protocols used in the experiments.

The top row shows the step-by-step workflow:
Step one: The model generates an initial CoT reasoning chain.
Step two: The feedback prompt asks the model: "Review your previous answer and find reasons why it could be wrong."
Step three: The model outputs a revised response.
Step four: This repeats for a second round.

Now compare the two boxes below:
In the Oracle setup on the left, an external verifier checks the answer after Step 1. If correct, it stops immediately. If wrong, it triggers Step 2. That protects correct answers from ever being altered.

In the Intrinsic setup on the right, the model has no verifier. It must critique every problem blindly. And as we will see, this causes the model to second-guess its own correct answers.

I will now pass the floor to Mahid to present the main results.

---

# Slide 12: Results: Core Finding
**Speaker:** Mahid (2303127)  
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails  
**Target Duration:** ~50 seconds  

## Spoken Script

Thank you, Anindo. Hello everyone, I am Mahid, and I will present the empirical results of the paper.

Let us start with the headline finding:

Across every benchmark and every model tested, intrinsic self-correction does not improve reasoning accuracy. In fact, performance consistently declines after each round of self-correction.

This failure is universal across three dimensions:
First, Universal Degradation: GPT-3.5, GPT-4, GPT-4-Turbo, and Llama-2 all show performance drops from initial generation to Round 1, and drop further in Round 2.
Second, Task-Agnostic Failure: It fails in multi-step math, it fails in multiple-choice commonsense logic, and it fails in multi-hop QA.
Third, The Oracle Illusion: Accuracy only rises when an external oracle tells the model when to stop, proving that prior claims were purely evaluation artifacts.

Let us look at the numbers.

---

# Slide 13: Results: GPT-3.5 & GPT-4 Benchmark Results
**Speaker:** Mahid (2303127)  
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails  
**Target Duration:** ~55 seconds  

## Spoken Script

Here are the detailed results for GPT-3.5 and GPT-4 from Table 3 of the paper.

Look at the bar chart on the left. The dark slate bar is standard Chain-of-Thought. The amber bar is Round 1 self-correction. The crimson bar is Round 2. 

Notice that for every single benchmark, the bars get shorter as correction rounds increase:
- On CommonSenseQA with GPT-3.5, accuracy plummets from 72.5% down to 63.5% in Round 1, and drops all the way to 55.3% in Round 2. That is a massive 17.2% overall drop.
- On HotpotQA with GPT-4, accuracy drops by 11.0%, falling from 53.0% down to 42.0%.
- Even on GSM8K with GPT-4, which starts at an impressive 92.0%, self-correction drags accuracy down to 88.0%.

Rather than fixing mistakes, self-correction systematically destroys valid reasoning chains.

---

# Slide 14: Results: GPT-4-Turbo & Llama-2 Results
**Speaker:** Mahid (2303127)  
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails  
**Target Duration:** ~55 seconds  

## Spoken Script

To test whether newer or open-weight models behave differently, the authors extended the evaluation to GPT-4-Turbo and Llama-2-70B.

As shown in the column chart:
GPT-4-Turbo shows modest resistance but still drops on GSM8K from 91.5% to 90.0%, and on CommonSenseQA from 84.0% to 83.0%.

However, look at Llama-2-70B on the right:
Its accuracy literally collapses. On GSM8K math, Llama-2 goes from 62.0% down to 36.5%, losing 25.5 percentage points. On CommonSenseQA, it plummets from 64.0% to 36.5%, losing 27.5 percentage points.

Why does Llama-2 collapse so severely? Because open-weight models have extreme compliance vulnerability. When prompted with "Review your answer and find flaws," the model assumes it must have made a mistake, panics, and abandons perfectly valid solutions.

---

# Slide 15: Results: Answer Transition Dynamics
**Speaker:** Mahid (2303127)  
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails  
**Target Duration:** ~55 seconds  

## Spoken Script

Figure 1 from the paper reveals the exact mathematical reason why accuracy declines, tracking answer transitions for GPT-3.5 on GSM8K.

Look at the doughnut chart:
74.7% of answers remained unchanged.
8.8% started wrong and stayed wrong.
7.6% of answers were successfully repaired from incorrect to correct.
But 8.9% of answers were flipped from correct to incorrect.

Compare those two numbers: 8.9% harmful flips versus 7.6% beneficial fixes. 
The harmful flips exceed the beneficial fixes by 1.3 percentage points. 

Every time you run an unguided self-correction loop, the probability that the model destroys a correct answer is higher than the probability that it fixes a broken one. That creates a guaranteed net-negative drift.

I will now hand over to Jebon to explain why this happens.

---

# Slide 16: Analysis: Multi-Agent Debate vs. Self-Consistency
**Speaker:** Jebon (2303160)  
**Topic:** 5. Why Does Self-Correction Fail?  
**Target Duration:** ~55 seconds  

## Spoken Script

Thank you, Mahid. Hello everyone, I am Jebon, and I will dive into the analysis: why self-correction fails, why debate is overrated, and the theoretical verification barrier.

Let us start with Multi-Agent Debate. Prior work claimed that having multiple LLM instances debate each other led to emergent reasoning gains.

Table 7 in the paper tests this claim under strict compute parity. Look at the column chart:
On GSM8K, single-shot CoT scores 77.0%. Multi-Agent Debate scores 81.0%. That looks like a 4% improvement.
However, Multi-Agent Debate used multiple sampled responses and multiple rounds. When you take the exact same compute budget and run Self-Consistency, which is simple majority voting over parallel independent samples, you get 82.5%.

Self-Consistency matches or beats Multi-Agent Debate on GSM8K, CommonSenseQA, and Chess QA, with zero inter-agent communication overhead and zero latency delays. The debate was just expensive majority voting in disguise.

---

# Slide 17: Analysis: The Prompt Design Trap
**Speaker:** Jebon (2303160)  
**Topic:** 5. Why Does Self-Correction Fail?  
**Target Duration:** ~55 seconds  

## Spoken Script

The second major cause of misleading progress is what the authors call The Prompt Design Trap.

Look at the comparison on this slide:
In flawed evaluation setups like Self-Refine on the left, the initial prompt was intentionally weak. For example, in constrained sentence generation, the initial prompt omitted instructions to use all target words. Then, the feedback prompt reminded the model: "You forgot word X, add it now." When output improved, the authors claimed self-correction worked.

In the fair evaluation on the right, Huang et al. put all constraints into the initial prompt from the start. The model generated great answers immediately. But when intrinsic self-correction was applied, accuracy dropped.

The apparent gains in prior papers did not come from model reflection. They came from leaking new instructions into the feedback prompt.

---

# Slide 18: Analysis: Case Study - The Gaslighting Effect
**Speaker:** Jebon (2303160)  
**Topic:** 5. Why Does Self-Correction Fail?  
**Target Duration:** ~55 seconds  

## Spoken Script

Let us look at a real example from GSM8K to see this in action: Figure 4 from the paper, which we call the Terry Yogurt Case Study.

The problem asks: "Terry eats 2 yogurts a day. A pack of 4 yogurts costs $5. How much does Terry spend on yogurt in 30 days?"

In Round 1, GPT-4 gets it completely right:
30 days times 2 yogurts is 60 yogurts. 60 divided by 4 is 15 packs. 15 packs times $5 is $75. Clean, elegant, correct.

Then comes Round 2. We ask the model: "Review your answer and find flaws."
The model panics. It assumes it must have messed up. It hallucinates: "Wait, 4 yogurts last 2 days, so $5 for 2 days means $2.50 a day... let me multiply by 30 and then double it..." and outputs $150.

Critique prompts act as psychological gaslighting on language models. They induce false doubt and corrupt sound logic.

---

# Slide 19: Analysis: The Verification Barrier
**Speaker:** Jebon (2303160)  
**Topic:** 5. Why Does Self-Correction Fail?  
**Target Duration:** ~55 seconds  

## Spoken Script

To synthesize the theoretical root cause, why is self-correction so difficult? It comes down to the Verification Barrier:

First, Shared Parameter Bounds: The critic and the generator share the exact same weights. If a 70-billion-parameter model lacks the knowledge to multiply two three-digit numbers correctly in step one, it lacks the exact same knowledge to verify that multiplication in step two.

Second, Compliance Prompt Bias: Instruction-tuned models are trained with RLHF to please the user. When a prompt says "Find reasons why your answer is wrong," the model treats that as an instruction to find errors, inventing imaginary flaws in correct math.

Third, Lack of Grounding: Without external execution signals, the model cannot distinguish between a genuine fix and a newly hallucinated mistake.

I will now hand over to Refayet for conclusions and future work.

---

# Slide 20: Conclusion: Key Takeaways
**Speaker:** Refayet (2303148)  
**Topic:** 6. Conclusion, Limitations, and Future Directions  
**Target Duration:** ~50 seconds  

## Spoken Script

Thank you, Jebon. Hello everyone, I am Refayet, and I will conclude our presentation with key takeaways, limitations, and future directions.

The paper establishes three core takeaways for the AI research community:

Takeaway 1: Intrinsic self-correction fails for reasoning tasks. Without external feedback signals, language models cannot reliably correct their own logical or mathematical errors.

Takeaway 2: Prior claims of self-correction were evaluation artifacts. They relied on oracle leakage, unfair compute comparisons, or incomplete prompt engineering.

Takeaway 3: External feedback is mandatory for reliable post-processing. Self-correction works only when grounded by external verification, such as code execution, symbolic solvers, or human review.

Let us now contextualize the boundaries of this study.

---

# Slide 21: Conclusion: Study Limitations
**Speaker:** Refayet (2303148)  
**Topic:** 6. Conclusion, Limitations, and Future Directions  
**Target Duration:** ~50 seconds  

## Spoken Script

To maintain scientific objectivity, we must highlight the study limitations acknowledged by the authors:

On the left, Scope Limitations:
- The study focuses specifically on reasoning tasks like math and logic. It does not evaluate style refinement, translation, or creative writing, where self-critique can be effective.
- It evaluates prompting on frozen, off-the-shelf models, rather than models explicitly fine-tuned for self-correction.
- It evaluated 2023 snapshots. Newer architectures like OpenAI o1 and o3 warrant further analysis.

On the right, Methodological Boundaries:
- HotpotQA was evaluated on a 100-sample subset due to API rate limits.
- While multiple feedback prompts were tested, prompt space is infinite.
- Evaluations were conducted in a closed-book setting without retrieval augmentation.

---

# Slide 22: Conclusion: Future Directions & Fair Standards
**Speaker:** Refayet (2303148)  
**Topic:** 6. Conclusion, Limitations, and Future Directions  
**Target Duration:** ~50 seconds  

## Spoken Script

Where does the field go from here? The paper points toward four constructive pathways:

1. Tool-Augmented Verification: Instead of asking the model to verify arithmetic in its head, route intermediate steps to Python interpreters, symbolic math solvers, or SQL databases.
2. Learned Verifiers & Process Reward Models: Train separate discriminator models specifically to score the validity of intermediate reasoning steps.
3. Training-Time Search & RL: Train models with Reinforcement Learning and test-time search, like Monte Carlo Tree Search, enabling genuine deliberation during generation.
4. Fair Evaluation Standards: The community must enforce equal-compute baselines against Self-Consistency and ban oracle label leakage in self-correction benchmarks.

---

# Slide 23: References
**Speaker:** Refayet (2303148)  
**Topic:** References  
**Target Duration:** ~30 seconds  

## Spoken Script

On this slide, we provide formal IEEE citations for the primary paper by Huang et al. and the comparative baseline studies discussed throughout our presentation, including RCI, Reflexion, Self-Refine, Multi-Agent Debate, Self-Consistency, and GSM8K.

All results and tables referenced today are drawn directly from these published works.

---

# Slide 24: Thank You & Discussion
**Speaker:** Refayet (2303148)  
**Topic:** Conclusion and Q&A  
**Target Duration:** ~35 seconds  

## Spoken Script

That concludes our presentation on *Large Language Models Cannot Self-Correct Reasoning Yet*.

On behalf of Nafis, Srijon, Anindo, Mahid, Jebon, and myself, thank you very much for your time, attention, and engagement.

We would now love to open the floor and welcome any questions, comments, or perspectives from our professor and classmates. Thank you!

---

