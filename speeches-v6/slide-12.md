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
