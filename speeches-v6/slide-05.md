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
