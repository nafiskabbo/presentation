# Slide 07: Background & Literature: Intrinsic vs External Feedback
**Speaker:** Srijon (2303179)  
**Topic:** 2. Literature Review and Background  
**Target Duration:** ~55 seconds  

## Spoken Script

The first major finding in our literature analysis is the sharp division shown on this diagram: Intrinsic versus External Feedback.

On the left side, look at Intrinsic Self-Correction. The model runs in a closed loop. It generates a response, critiques itself using generic prompts, and tries to fix errors. No ground truth labels, no compilers, no human hints. As the paper proves, this consistently fails on reasoning tasks.

On the right side, look at External Feedback. Here, an external verifier tells the model, "Your calculation on line four produced a syntax error," or "Unit test number two failed with output forty-two." 

External feedback works because it injects brand new, verified ground-truth information from the outside world. The mistake prior literature made was conflating external tool verification with intrinsic model reasoning, giving the impression that the model was thinking things through on its own.
