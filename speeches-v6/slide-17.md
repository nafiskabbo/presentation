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
