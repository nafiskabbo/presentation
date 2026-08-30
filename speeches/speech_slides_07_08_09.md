# Presentation Speech: Slides 07, 08, and 09
**Paper:** Large Language Models Cannot Self-Correct Reasoning Yet (ICLR 2024)  
**Presenter:** Srijon (2303179)  
**Section:** Section 2: Background and Related Work (Slides 07, 08, 09)  
**Estimated Total Section Time:** ~3.0 to 3.5 minutes (~60 to 70 seconds per slide)  

---

## Slide 07: Timeline of Claims (Slide 07/24)

### Quick Glance Notes for the Presenter
*Look at the slide and follow this order:*
1. **Top Subtitle:** "2023 surge, same hidden helpers" (Explain how 2023 was packed with self-correction hype).
2. **Four Timeline Cards (Left to Right):**
   - **Q1 2023 (Crimson):** RCI (Kim et al.) claimed +7% gain.
   - **Q2 2023 (Green):** Reflexion (Shinn et al.) claimed +11% gain.
   - **Q3 2023 (Amber):** Self-Refine (Madaan et al.) claimed +10% gain.
   - **Q4 2023 (Slate):** Multi-Agent Debate (Du et al.) claimed +4% gain.
3. **Bottom Banner:** "WHAT THE TIMELINE HIDES"
   - Point to the three root issues: Oracle leakage, Prompt trick, Compute gap.

### Full Spoken Script
**[Slide Transition: Switch to Slide 07]**

Thank you, Kabbo. I am Srijon, and I will walk you through the prior literature and why earlier claims looked so promising on paper.

If you followed AI research throughout 2023, it felt like every quarter brought a shiny new framework promising that language models could fix their own mistakes. It was the same energy we see today whenever rumors drop about unreleased models like Fable 5.1 or secret codenames. Everyone wanted to believe that self-correction was a solved problem.

Look at the four timeline cards across 2023. 

In Q1, Kim and colleagues introduced RCI, claiming a 7% boost on math and reasoning by asking the model to critique its code. 

In Q2, Shinn and colleagues introduced Reflexion, claiming an 11% improvement by storing verbal self-reflections across multiple attempts. 

In Q3, Madaan and colleagues published Self-Refine, reporting 10% gains through iterative feedback rubrics. 

And in Q4, Du and colleagues claimed Multi-Agent Debate gave another 4% boost by having multiple instances argue with each other.

On the surface, these numbers looked great. But look at the callout at the bottom of the slide: what the timeline hides. 

When you look under the hood, none of these gains came from genuine internal reflection. RCI and Reflexion relied on oracle leakage, meaning the test harness secretly told the model when it got an answer wrong. Self-Refine relied on a prompt trick, where rules were withheld in the first turn and only revealed later. And Multi-Agent Debate simply burned three to six times more tokens.

Let us look at slide 8 to see why internal reflection fails where external tools succeed.

---

## Slide 08: Closed Loop vs Grounded Loop (Slide 08/24)

### Quick Glance Notes for the Presenter
*Look at the slide and follow this order:*
1. **Left Box (Crimson / Intrinsic):**
   - Closed loop: 1. Generate -> LLM (Frozen weights) -> 2. Self-critique -> 3. Revise blind.
   - Stat: -1.3% to -27.5% drop.
   - Key point: Zero new facts. The model second-guesses itself and hallucinates errors.
2. **Right Box (Green / External):**
   - Grounded loop: LLM drafts code -> Executes in Tool (Python / Oracle) -> Traceback -> LLM fixes code.
   - Stat: +7.0% to +15.0% gain.
   - Key point: Python compiler is deterministic reality.
3. **Bottom Banner:**
   - "A frozen model cannot act as an independent verifier of its own output without external grounding."

### Full Spoken Script
**[Slide Transition: Switch to Slide 08]**

This slide shows the core distinction that earlier papers often blurred: a closed loop versus a grounded loop.

Look at the red box on the left. This is the closed loop, which is the focus of our paper. The model generates an initial answer. We ask it to critique its own work, and it tries to revise blindly. 

Notice what is missing here: zero new information enters the system. The weights are completely frozen. You are asking the exact same probability distribution that made the error to spot its own error. 

Anyone who has tried prompt engineering knows what happens next. If you ask an LLM, "Are you sure about that?", it instantly panics. It apologizes for a mistake it did not make and changes a correct answer into a wrong one. Because of this prompt bias and lack of external truth, intrinsic self-correction drops accuracy by anywhere from 1.3% to 27.5%.

Now look at the green box on the right. This is the grounded loop, and this is where self-correction actually works. 

Here, the model writes code and executes it in an external tool like a Python interpreter. If the code throws an IndexError or division by zero, the interpreter returns an objective traceback. The model reads that concrete error signal and fixes the bug. That gives real improvements between 7% and 15%.

The takeaway at the bottom sums it up: a frozen model cannot act as an independent judge of its own thinking without external grounding.

Now let us look at the forensic evidence in slide 9.

---

## Slide 09: Forensic: Reported vs Controlled (Slide 09/24)

### Quick Glance Notes for the Presenter
*Look at the slide and follow this order:*
1. **Left Chart (Paired Bars):**
   - Red bar = Reported (inflated).
   - Green bar = Controlled (reality).
   - Trace each pair: Oracle (+10.5% drops to -2.5%), Compute (+4% drops to -1.5%), Prompt (+10% drops to 0%).
2. **Right Cards (The Three Confounders):**
   - **Card 1 (Oracle Leakage):** Shield correct answers, only fix wrong ones.
   - **Card 2 (Compute Gap):** Debate loses to Self-Consistency at equal token cost.
   - **Card 3 (Prompt Trick):** Weak start vs rule-rich feedback.
3. **Bottom Banner:**
   - "Red collapses to green at or below zero. No confounder survives a fair test."
4. **Transition to Next Presenter:** Hand over to Anindo for Section 3 (Methodology).

### Full Spoken Script
**[Slide Transition: Switch to Slide 09]**

On this slide, we run a forensic breakdown of the prior claims. 

Look at the bar chart on the left. The red bars show the claimed gains from earlier literature. The green bars show what actually happens when you run a fair, controlled test. 

Notice the visual pattern: every single red bar collapses straight down to green, ending up at or below zero.

Let us go through the three cards on the right.

First, Oracle Leakage. Papers like RCI and Reflexion reported gains of around 10.5%. But their test setups used the answer key to shield correct answers. The model was only prompted to self-correct when its answer was already wrong. That is like taking an exam where the proctor only taps your desk when you choose the wrong bubble and lets you guess again. In real production, you do not have an oracle. When you prompt the model on all questions, accuracy drops by 2.5%.

Second, Compute Gap. Multi-Agent Debate claimed a 4% gain. But having three LLM agents debate each other is basically spending 6x the API budget to watch models talk in circles. When the authors matched compute by giving single-agent Self-Consistency the same number of sample calls, simple majority voting beat debate by 1.5%.

Third, the Prompt Trick. Self-Refine reported a 10% gain. But the initial prompt withheld formatting rules, which were only introduced during the feedback step. When you give the model the complete prompt from the start, the gain drops to exactly zero.

The bottom line is undeniable: no confounder survives a fair evaluation.

I will now hand over to Anindo, who will walk us through the experimental setup and benchmark methodology.

---
