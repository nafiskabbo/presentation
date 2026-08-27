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
