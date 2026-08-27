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
