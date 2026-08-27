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
