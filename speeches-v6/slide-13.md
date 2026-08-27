# Slide 13: Results: GPT-3.5 & GPT-4 Benchmark Results
**Speaker:** Mahid (2303127)  
**Topic:** 4. Main Results: Intrinsic Self-Correction Fails  
**Target Duration:** ~55 seconds  

## Spoken Script

Here are the detailed results for GPT-3.5 and GPT-4 from Table 3 of the paper.

Look at the bar chart on the left. The dark slate bar is standard Chain-of-Thought. The amber bar is Round 1 self-correction. The crimson bar is Round 2. 

Notice that for every single benchmark, the bars get shorter as correction rounds increase:
- On CommonSenseQA with GPT-3.5, accuracy plummets from 72.5% down to 63.5% in Round 1, and drops all the way to 55.3% in Round 2. That is a massive 17.2% overall drop.
- On HotpotQA with GPT-4, accuracy drops by 11.0%, falling from 53.0% down to 42.0%.
- Even on GSM8K with GPT-4, which starts at an impressive 92.0%, self-correction drags accuracy down to 88.0%.

Rather than fixing mistakes, self-correction systematically destroys valid reasoning chains.
