# Full Presentation Speech Script (Version 9)
**Paper:** Large Language Models Cannot Self-Correct Reasoning Yet (ICLR 2024)
**Group Presenters in speaking order:**
1. Srijon (2303179) - Section 1: Introduction (Slides 01-05, ~3.5 mins)
2. Nafis Islam Kabbo (2303180) - Section 2: Literature Review (Slides 06-08, ~3.0 mins)
3. Mahid (2303127) - Section 3: Methodology (Slides 09-11, ~3.0 mins)
4. Jebon (2303160) - Section 4: Results (Slides 12-15, ~3.5 mins)
5. Anindo (2303181) - Section 5: Analysis (Slides 16-19, ~3.5 mins)
6. Refayet (2303148) - Section 6: Conclusion and Future Work (Slides 20-23, ~3.5 mins)

---

# Slide 01: Title Slide
**Speaker:** Srijon (2303179)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~45 seconds

## Spoken Script

Good morning everyone. Respected professor and fellow classmates.

We are presenting *Large Language Models Cannot Self-Correct Reasoning Yet*, ICLR 2024, by Jie Huang at UIUC and Denny Zhou and colleagues at Google DeepMind.

If you have used ChatGPT for math homework, you know the pattern. The answer looks confident, step by step, and then the final number is wrong. You ask the model to check itself, and it apologizes and gives you a different wrong number. Today we explain why that happens, and why prior claims that models can fix themselves were mostly measurement mistakes.

I will open with the core reasoning problem and the paradox that drives the paper. Kabbo will then map the prior literature and the four evaluation traps. Mahid will cover the benchmarks and experimental controls. Jebon will show the numbers. Anindo will explain why verification is so hard. Refayet will close with limits and what actually works.

Let us start.

---

# Slide 02: Presentation Outline
**Speaker:** Srijon (2303179)
**Topic:** Overview
**Target Duration:** ~40 seconds

## Spoken Script

Here is the plan. Just the six sections, no clutter.

Section 1, Introduction. Why multi-step reasoning is fragile and why self-correction is tempting.

Section 2, Background. Four frameworks from 2023 and the evaluation flaws.

Section 3, Methodology. Benchmarks, models, and the clean intrinsic versus oracle protocol.

Section 4, Results. Accuracy goes down after self-correction.

Section 5, Analysis. Equal compute, the prompt trap, a concrete example, and the verification barrier.

Section 6, Conclusion. Limits and what actually works.

Each block builds on the last.

---

# Slide 03: Large Language Models and Reasoning
**Speaker:** Srijon (2303179)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~50 seconds

## Spoken Script

Look at the flowchart. This is why reasoning breaks.

Language models are autoregressive. They write left to right, one token at a time. For math we use Chain of Thought, so the model writes out intermediate steps.

The diagram shows it clearly. Box one, the question. Box two, the CoT steps. Step one stays correct. Step two slips. Step three inherits that slip. Box three, the final answer is corrupted.

This is the domino effect. The model conditions every new token on the tokens it already wrote, even if one of them is wrong. There is no built in pause button that says wait, step two looks off, let me backtrack. Without an outside check, the chain just keeps building on the error. That is the vulnerability self-correction was supposed to solve.

*[Gesture to the takeaway bar at the bottom, pause on "domino effect"]*

---

# Slide 04: The Concept of Self-Correction
**Speaker:** Srijon (2303179)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~45 seconds

## Spoken Script

So researchers proposed a loop. It is simple on paper.

Step one, draft answer. The model writes a CoT and an answer.

Step two, self-critique. We prompt it, review your reasoning and find flaws.

Step three, revised answer. The model writes a new CoT and new answer. Then repeat, at most twice in this paper.

The promise was huge. If this worked, we could have agents that debug code or solve contest math alone.

The flowchart at the bottom shows the intended cycle, draft to critique to fix, retry. The key point is that the loop uses the same frozen model. No calculator. No Python. No human label. Just the model talking to itself. That is what we mean by intrinsic. Keep this in mind, because the next slide asks the awkward question.

---

# Slide 05: The Central Research Question
**Speaker:** Srijon (2303179)
**Topic:** 1. Introduction and Research Problem
**Target Duration:** ~50 seconds

## Spoken Script

Here it is. The central paradox, in one line.

If a model can correct a mistake, why did it not get it right the first time.

Read it again. The weights are frozen. When you ask the model to critique itself, you are not giving it new knowledge. You are feeding its own output back into the same network that just made the error.

The slide keeps it minimal for a reason. The next slide will do the detailed taxonomy of intrinsic versus external feedback. Here we just set the test. The paper tests intrinsic only. External help, like running code, is useful but it is a different claim and out of scope for this result.

If intrinsic correction were real, it would be free performance. The paper shows it is not. Over to Kabbo for the literature.

*[Hand over to Kabbo, clear transition]*

---

# Slide 06: Prior Self-Correction Frameworks
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** 2. Literature Review and Background
**Target Duration:** ~50 seconds

## Spoken Script

Thanks Srijon. I am Kabbo, covering background.

In 2023 four frameworks claimed self-correction works.

RCI, Recursive Criticism and Improvement, by Kim et al. at NeurIPS 2023. The model critiques then revises, recursively.

Reflexion, by Shinn et al. It keeps verbal reflections in memory across tries.

Self-Refine, by Madaan et al. A feedback loop that writes its own feedback and then refines.

Multi-Agent Debate, by Du et al. Multiple copies of the model debate each other to reach consensus.

All reported gains, sometimes seven to fifteen percent. The question is, were those gains real or were they artifacts of how the experiments were set up.

---

# Slide 07: Intrinsic versus External Feedback
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** 2. Literature Review and Background
**Target Duration:** ~60 seconds

## Spoken Script

This is the distinction prior work blurred.

Left side, intrinsic. This is what the paper isolates. The model generates, checks itself with a generic prompt, and revises. Same weights. No labels. No tool output. The flowchart shows the loop, generate, diamond decision, self check, revise. Result, consistently fails. Accuracy drops.

Right side, external. Here a verifier gives new information. A Python interpreter says your code raised an error on line four. An oracle says your answer is wrong. Or unit tests fail. The model then revises with that signal. That often works, because the signal is new truth the model did not have.

Conflating these two made self-correction look stronger than it was. When you give a model the answer key and then say look, it corrected itself, that is not the model correcting itself.

*[Point left then right, pause on "new information"]*

---

# Slide 08: Flaws in Prior Evaluations
**Speaker:** Nafis Islam Kabbo (2303180)
**Topic:** 2. Literature Review and Background
**Target Duration:** ~55 seconds

## Spoken Script

Table 1 distills four confounders. Notice we removed the reference column to keep it readable, the details are in the paper.

One, oracle leakage in RCI and Reflexion. The system only triggered correction when the test harness said the answer was wrong. In real use you do not have that label. If you only touch wrong answers and protect right ones, your score can only go up.

Two, oracle leakage again in Reflexion for the same reason, reflections fired only on failure signals.

Three, unfair compute in Multi-Agent Debate. Debate used three agents times three rounds. Compare that to a single shot baseline and of course it looks better. Give that same budget to simple majority voting and the debate edge disappears.

Four, weak initial prompt in Self-Refine. The first prompt omitted required constraints, then the feedback prompt added them back and claimed improvement.

Fix these, and the reported gains vanish. Now Mahid will detail how the authors tested cleanly.

---

# Slide 09: Evaluation Benchmarks
**Speaker:** Mahid (2303127)
**Topic:** 3. Methodology and Experimental Setup
**Target Duration:** ~50 seconds

## Spoken Script

Thanks Kabbo. I am Mahid, methodology.

Three benchmarks, chosen to cover different reasoning.

GSM8K, 1,319 grade school math problems. Two to eight steps. Tests whether the model can track arithmetic state without drifting.

CommonSenseQA, 1,221 multiple choice. Tests subtle commonsense with distractors that punish keyword matching.

HotpotQA, 100 samples here due to API cost, closed book, multi-hop. Tests synthesis across facts without retrieval.

Note the prior claims on each card. Kim et al. reported plus seven percent on GSM8K with oracle help. Plus fifteen percent on CommonSenseQA. This paper asks, what happens without that help.

---

# Slide 10: Models and Experimental Controls
**Speaker:** Mahid (2303127)
**Topic:** 3. Methodology and Experimental Setup
**Target Duration:** ~45 seconds

## Spoken Script

Four models, all standard snapshots to keep it reproducible.

GPT-3.5 Turbo, gpt-3.5-turbo-0613.

GPT-4, August 2023 production snapshot.

GPT-4 Turbo, gpt-4-1106-preview.

Llama-2 70B Chat, the leading open weight baseline.

Controls are deliberately plain, bullet points only as required.

Chain of Thought, zero and few shot.

Temperature 1.0 for GPT models, 0.7 for Llama-2.

At most two correction rounds per problem.

Generic prompts like review your previous answer and find why it could be wrong, no hints.

And a direct comparison, intrinsic versus oracle guided, so the same prompts are tested both ways.

---

# Slide 11: Prompting Procedures
**Speaker:** Mahid (2303127)
**Topic:** 3. Methodology and Experimental Setup
**Target Duration:** ~60 seconds

## Spoken Script

Top row is the flow. Actual flowchart arrows, not just text.

Initial, generate draft. Critique, ask to review. Revise, write new reasoning. Iterate for round two.

Bottom left, with oracle, flawed. Verifier checks after step one. If correct, stop. If wrong, trigger fix. That shields correct answers, so scores inflate.

Bottom right, intrinsic, realistic. No verifier. The model must judge every problem blindly. It second guesses correct answers and flips them. That is why scores drop.

The down arrows make it concrete. Same top flow, different bottom regime, opposite outcome. Over to Jebon for what the numbers show.

---

# Slide 12: Intrinsic Self-Correction Fails
**Speaker:** Jebon (2303160)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~45 seconds

## Spoken Script

Thanks Mahid. I am Jebon, results.

Headline, in one sentence. Intrinsic self-correction does not help reasoning. It hurts.

The banner says it plainly. Scores decline after correction.

Three angles.

Universal, every model drops. GPT-3.5, GPT-4, Turbo, Llama-2, from initial to round one to round two.

Task agnostic, math, commonsense, multi-hop QA, all three fail.

Oracle illusion, the only way to make the number go up is to tell the model when it is wrong. That is not the model fixing itself, that is the test harness fixing it.

Let us see how much it drops.

---

# Slide 13: GPT-3.5 and GPT-4 Benchmark Results
**Speaker:** Jebon (2303160)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~55 seconds

## Spoken Script

Table 3, GPT-3.5 and GPT-4.

Bar chart, dark is standard CoT, amber is round one, crimson is round two.

Every group goes down.

On CommonSenseQA with GPT-3.5, 72.5 percent to 63.5 to 55.3. That is a 17.2 point collapse across two rounds.

On HotpotQA with GPT-4, 53.0 to 42.0, an 11 point drop.

Even on GSM8K with GPT-4 where it starts at 92.0, it falls to 88.0.

The model is not repairing chains. It is corrupting them. And the right panel summarizes the worst drops so you can quote them directly.

---

# Slide 14: GPT-4 Turbo and Llama-2 Results
**Speaker:** Jebon (2303160)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~50 seconds

## Spoken Script

Does a newer or open model behave differently. No.

GPT-4 Turbo dips a little, 91.5 to 90.0 on GSM8K, 84.0 to 83.0 on CommonSenseQA. Small but still down.

Llama-2 is the stark case. GSM8K 62.0 to 36.5, down 25.5 points. CommonSenseQA 64.0 to 36.5, down 27.5 points. Almost half the accuracy gone.

Why so severe. Llama-2 is highly compliant. When you say find flaws, it assumes it must have flaws. It obeys the instruction more than it trusts its own correct math, and it abandons the right answer.

The exclamation mark in the circle is not decoration, it is the warning. Compliance without grounding is dangerous.

---

# Slide 15: Answer Transition Dynamics
**Speaker:** Jebon (2303160)
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails
**Target Duration:** ~50 seconds

## Spoken Script

Figure 1 explains the arithmetic of the drop. GPT-3.5 on GSM8K.

Doughnut, four slices.

74.7 percent unchanged.

8.8 percent stayed wrong.

7.6 percent were fixed, wrong to correct. That is the intended benefit.

8.9 percent were flipped, correct to wrong. That is the harm.

Compare the last two. 8.9 harm versus 7.6 help. Net loss 1.3 points. Every unguided loop destroys more correct answers than it repairs. Run it twice and the loss compounds.

So the decline is not random noise. It is a systematic negative drift. Over to Anindo for why.

---

# Slide 16: Multi-Agent Debate versus Self-Consistency
**Speaker:** Anindo (2303181)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~55 seconds

## Spoken Script

Thanks Jebon. I am Anindo, analysis.

Multi-Agent Debate claimed emergent gains. Table 7 tests it at equal cost.

Chart, three bars per task. Dark single shot, amber debate, green self-consistency, which is just majority vote over independent samples.

On GSM8K, single shot 77.0, debate 81.0, looks like a win. But self-consistency with the same number of samples is 82.5.

Same on CommonSenseQA and Chess QA. Green matches or beats amber, with no agents talking to each other and no sequential waiting.

Debate was expensive sampling with extra latency. If you want better accuracy for the same budget, just sample and vote. The debate framing added cost, not reasoning.

*[Point to right panel cost boxes, debate N times M versus N]*

---

# Slide 17: The Prompt Design Trap
**Speaker:** Anindo (2303181)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~55 seconds

## Spoken Script

Second cause, the prompt trap. This one is subtle.

Left, flawed setup like Self-Refine on constrained generation. Step one, weak prompt that omits a required rule, for example use all target words. Step two, feedback adds the missing rule, you forgot word X, add it. Step three, it improves and the paper claims self-correction works.

Right, fair setup by Huang et al. Step one includes all rules up front. The model answers well immediately. Step two, intrinsic correction then makes it worse.

The takeaway at the bottom is blunt. Well prompted single shot beats loops. The earlier gains came from leaking information in the second prompt, not from the model reflecting.

If your baseline is artificially weak, any second try looks like progress.

---

# Slide 18: Case Study, The Gaslighting Effect
**Speaker:** Anindo (2303181)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~55 seconds

## Spoken Script

Concrete example, Figure 4, the yogurt problem. And yes, we generated the yogurt pack visual on the slide.

Top, the problem. Terry eats 2 yogurts a day, a 4-pack costs 5 dollars, how much for 30 days.

Left, Round 1. Big green $75. 30 times 2 is 60, 60 divided by 4 is 15 packs, 15 times 5 is 75. Clean, correct.

Center, the gaslighting step. The generated pack shows 4 cups for 5 dollars. The prompt says find flaws. The model sees a correct answer but the instruction tells it to find a flaw, so it invents one.

Right, Round 2. Big red $150. It doubts the valid math, reframes 4 yogurts as 2 days, and flips to 150.

We call this gaslighting because the prompt pressures the model to see an error where there is none. That single flip is the 8.9 percent harmful rate you saw in Figure 1.

---

# Slide 19: The Verification Barrier
**Speaker:** Anindo (2303181)
**Topic:** 5. Why Does Self-Correction Fail?
**Target Duration:** ~50 seconds

## Spoken Script

The theory behind the failure has three parts.

One, shared weights. Critic and generator are the same network. If 70 billion parameters could not get the arithmetic right the first time, the same 70 billion parameters cannot reliably check it the second time. Knowledge parity.

Two, compliance bias. Instruction tuning rewards following the user. When the user says find flaws, the model tries hard to find something, even on a correct solution.

Three, no grounding. Without a tool like Python or an oracle label, the model cannot tell a real fix from a new hallucination. Both feel equally plausible in text space.

Put together, verification is as hard as generation, and the prompt biases the model toward seeing errors.

Over to Refayet to close.

---

# Slide 20: Key Takeaways
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion, Limitations, and Future Directions
**Target Duration:** ~45 seconds

## Spoken Script

Thanks Anindo. I am Refayet, closing.

Three takeaways.

One, intrinsic self-correction fails for reasoning. Without external feedback, accuracy drops consistently across models and tasks.

Two, prior gains were artifacts. Oracle leakage, unfair compute, weak prompts created an illusion. Fix the evaluation, the gains disappear.

Three, external feedback is required for reliable refinement. Tools, code execution, verifiers, or human review provide the new information that pure self-talk cannot.

These are narrow claims about reasoning, not about all text generation, and the paper is clear about that.

---

# Slide 21: Study Limitations
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion, Limitations, and Future Directions
**Target Duration:** ~45 seconds

## Spoken Script

Limits, stated plainly.

Left, scope. Reasoning only. Math and logic benchmarks. Not style, translation, or open ended writing where self-critique can help. Frozen prompting, not models fine tuned to self-correct. And 2023 snapshots, so newer reasoners like o1 or o3 need their own tests.

Right, methods. HotpotQA uses 100 samples because of API cost, so resolution is limited there. Prompt space was sampled, not exhaustive. And everything is closed book, no retrieval.

Acknowledging this keeps the claim honest. It is about intrinsic prompting on reasoning tasks with the models tested.

---

# Slide 22: Future Directions and Fair Standards
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion, Limitations, and Future Directions
**Target Duration:** ~50 seconds

## Spoken Script

Four directions the paper points to.

One, tool augmented verification. Route steps to Python, symbolic solvers, SQL, let the tool be the critic.

Two, learned verifiers and Process Reward Models. Train separate discriminators that score step correctness, as Cobbe and others did for GSM8K.

Three, training time methods. Reinforcement learning and search, like MCTS and test time compute, rather than prompt loops on frozen models.

Four, fair standards. Always compare at equal inference cost against self-consistency, and forbid oracle leakage in benchmarks.

The point is not that correction is impossible. It is that correction needs a source of truth outside the same frozen pass.

---

# Slide 23: Thank You and Open Discussions
**Speaker:** Refayet (2303148)
**Topic:** 6. Conclusion & Future Work
**Target Duration:** ~40 seconds

## Spoken Script

That concludes our presentation. Thank you.

On behalf of Srijon, Kabbo, Mahid, Jebon, Anindo and myself, thank you for your attention.

We open for discussion.

Three questions if helpful.

One, why does asking a model to find flaws often make it hallucinate errors where none exist?

Two, when should we rely on external tools like Python or verifiers instead of prompting alone?

Three, how can we design a fair self-correction benchmark that avoids oracle leakage?

We welcome your questions and challenges. Thank you.

---
