# Slide 03: Introduction: LLMs & Reasoning
**Speaker:** Nafis Islam Kabbo (2303180)  
**Topic:** 1. Introduction and Research Problem  
**Target Duration:** ~50 seconds  

## Spoken Script

Let us look at why reasoning in Large Language Models is fundamentally fragile.

As shown in the diagram on this slide, modern autoregressive models generate text token by token. To solve complex problems in math, science, or programming, we rely on Chain-of-Thought prompting, where the model breaks the derivation down into intermediate steps.

This works brilliantly when every step is correct. But autoregressive generation has a major weakness: compounding error risk. 

Think of it like a row of falling dominoes. If the model makes a simple arithmetic mistake on step two, say adding five instead of subtracting it, every single subsequent token is conditioned on that false premise. The model builds an elaborate, highly confident, grammatically flawless tower of logic on top of a broken foundation.

And because the model only looks forward, it has no native mechanism to pause, realize it made a mistake three sentences ago, and rewrite the chain. That brings us to the promise of self-correction.
