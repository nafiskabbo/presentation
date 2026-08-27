# Slide 14: Results: GPT-4-Turbo & Llama-2 Results
**Speaker:** Mahid (2303127)  
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails  
**Target Duration:** ~55 seconds  

## Spoken Script

To test whether newer or open-weight models behave differently, the authors extended the evaluation to GPT-4-Turbo and Llama-2-70B.

As shown in the column chart:
GPT-4-Turbo shows modest resistance but still drops on GSM8K from 91.5% to 90.0%, and on CommonSenseQA from 84.0% to 83.0%.

However, look at Llama-2-70B on the right:
Its accuracy literally collapses. On GSM8K math, Llama-2 goes from 62.0% down to 36.5%, losing 25.5 percentage points. On CommonSenseQA, it plummets from 64.0% to 36.5%, losing 27.5 percentage points.

Why does Llama-2 collapse so severely? Because open-weight models have extreme compliance vulnerability. When prompted with "Review your answer and find flaws," the model assumes it must have made a mistake, panics, and abandons perfectly valid solutions.
