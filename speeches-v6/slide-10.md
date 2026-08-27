# Slide 10: Methodology: Models & Setup
**Speaker:** Anindo (2303181)  
**Topic:** 3. Methodology and Experimental Setup  
**Target Duration:** ~55 seconds  

## Spoken Script

On this slide, we summarize the evaluated models and experimental controls.

For the models, the authors tested four leading architectures:
1. GPT-3.5-Turbo, using the standard gpt-3.5-turbo-0613 snapshot.
2. GPT-4, using the production snapshot from August 2023.
3. GPT-4-Turbo, using the gpt-4-1106-preview release.
4. Llama-2-70B-Chat, representing the leading open-weight foundation model.

For experimental rigor, the controls were standardized:
- Zero-shot and few-shot Chain-of-Thought prompting across all tasks.
- Temperature set to 1.0 for GPT models and 0.7 for Llama-2-70B.
- A standardized limit of two correction rounds per problem.
- Generic feedback prompts that provide no hints or answer leakage.
- Direct side-by-side comparison between intrinsic correction and oracle guidance.

Now let us look at the prompting protocols.
