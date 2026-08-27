# Slide 18: Analysis: Case Study - The Gaslighting Effect
**Speaker:** Jebon (2303160)  
**Topic:** 5. Why Does Self-Correction Fail?  
**Target Duration:** ~55 seconds  

## Spoken Script

Let us look at a real example from GSM8K to see this in action: Figure 4 from the paper, which we call the Terry Yogurt Case Study.

The problem asks: "Terry eats 2 yogurts a day. A pack of 4 yogurts costs $5. How much does Terry spend on yogurt in 30 days?"

In Round 1, GPT-4 gets it completely right:
30 days times 2 yogurts is 60 yogurts. 60 divided by 4 is 15 packs. 15 packs times $5 is $75. Clean, elegant, correct.

Then comes Round 2. We ask the model: "Review your answer and find flaws."
The model panics. It assumes it must have messed up. It hallucinates: "Wait, 4 yogurts last 2 days, so $5 for 2 days means $2.50 a day... let me multiply by 30 and then double it..." and outputs $150.

Critique prompts act as psychological gaslighting on language models. They induce false doubt and corrupt sound logic.
