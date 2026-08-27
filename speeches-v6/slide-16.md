# Slide 16: Analysis: Multi-Agent Debate vs. Self-Consistency
**Speaker:** Jebon (2303160)  
**Topic:** 5. Why Does Self-Correction Fail?  
**Target Duration:** ~55 seconds  

## Spoken Script

Thank you, Mahid. Hello everyone, I am Jebon, and I will dive into the analysis: why self-correction fails, why debate is overrated, and the theoretical verification barrier.

Let us start with Multi-Agent Debate. Prior work claimed that having multiple LLM instances debate each other led to emergent reasoning gains.

Table 7 in the paper tests this claim under strict compute parity. Look at the column chart:
On GSM8K, single-shot CoT scores 77.0%. Multi-Agent Debate scores 81.0%. That looks like a 4% improvement.
However, Multi-Agent Debate used multiple sampled responses and multiple rounds. When you take the exact same compute budget and run Self-Consistency, which is simple majority voting over parallel independent samples, you get 82.5%.

Self-Consistency matches or beats Multi-Agent Debate on GSM8K, CommonSenseQA, and Chess QA, with zero inter-agent communication overhead and zero latency delays. The debate was just expensive majority voting in disguise.
