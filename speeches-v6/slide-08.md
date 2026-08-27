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
