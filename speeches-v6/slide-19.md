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
