# Slide 09: Methodology: Tasks & Benchmarks
**Speaker:** Anindo (2303181)  
**Topic:** 3. Methodology and Experimental Setup  
**Target Duration:** ~55 seconds  

## Spoken Script

Thank you, Srijon. Hello everyone, I am Anindo, and I will present the methodology, benchmark datasets, and experimental protocols.

To evaluate self-correction rigorously, the authors selected three established reasoning benchmarks:

First, GSM8K, containing 1,319 grade-school math word problems. These questions require two to eight steps of sequential arithmetic. Tracking numerical state makes this an ideal test for compounding errors.

Second, CommonSenseQA, consisting of 1,221 multiple-choice questions. This tests commonsense relations with subtle semantic distractors designed to fool surface-level keyword matching.

Third, HotpotQA, evaluating multi-hop question answering across Wikipedia passages in a closed-book setting. This tests whether a model can synthesize multiple disparate facts without hallucinating.

Together, these three datasets test arithmetic, commonsense deduction, and factual synthesis under strict evaluation metrics.
