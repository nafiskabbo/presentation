import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('output/assets', exist_ok=True)

# Color constants
C_WHITE = (255, 255, 255)
C_CRIMSON = (128, 0, 32)      # #800020
C_AMBER = (217, 119, 6)       # #D97706
C_SLATE = (30, 41, 59)        # #1E293B
C_MUTED = (100, 116, 139)     # #64748B
C_LIGHT_BG = (248, 249, 250)  # #F8F9FA
C_BORDER = (226, 232, 240)    # #E2E8F0
C_GREEN = (22, 101, 52)       # #166534
C_RED = (220, 38, 38)         # #DC2626
C_GREEN_BG = (240, 253, 244)  # #F0FDF4
C_RED_BG = (254, 242, 242)    # #FEF2F2
C_AMBER_BG = (255, 251, 235)  # #FFFBEB
C_BLUE_BG = (241, 245, 249)

# Fonts
try:
    f_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 22)
    f_header = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 17)
    f_bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 14)
    f_text = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 13)
    f_small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 11)
    f_num = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 32)
except Exception:
    f_title = ImageFont.load_default()
    f_header = ImageFont.load_default()
    f_bold = ImageFont.load_default()
    f_text = ImageFont.load_default()
    f_small = ImageFont.load_default()
    f_num = ImageFont.load_default()

# ----------------------------------------------------
# 1. Autoregressive CoT Reasoning Diagram
# ----------------------------------------------------
w, h = 900, 320
img = Image.new('RGB', (w, h), C_WHITE)
d = ImageDraw.Draw(img)

# Box 1: Input Question
d.rounded_rectangle([30, 50, 230, 250], radius=10, fill=C_LIGHT_BG, outline=C_BORDER, width=2)
d.rectangle([30, 50, 230, 90], fill=C_CRIMSON)
d.text((50, 62), "1. Input Prompt", fill=C_WHITE, font=f_header)
d.text((45, 110), "Math / Logic / QA\nPrompt given to LLM:\n\ne.g., GSM8K multi-step\nword problem", fill=C_SLATE, font=f_text)

# Arrow 1
d.line([(240, 150), (280, 150)], fill=C_CRIMSON, width=3)
d.polygon([(290, 150), (280, 143), (280, 157)], fill=C_CRIMSON)

# Box 2: Step-by-Step CoT
d.rounded_rectangle([300, 50, 580, 250], radius=10, fill=C_LIGHT_BG, outline=C_BORDER, width=2)
d.rectangle([300, 50, 580, 90], fill=C_SLATE)
d.text((320, 62), "2. Chain-of-Thought (CoT) Steps", fill=C_WHITE, font=f_header)
d.text((320, 105), "Step 1: Calculate sub-total (Correct)", fill=C_GREEN, font=f_bold)
d.text((320, 135), "Step 2: Apply constraint (Logic error occurs)", fill=C_RED, font=f_bold)
d.text((320, 165), "Step 3: Intermediate state (Faulty premise)", fill=C_RED, font=f_text)
d.text((320, 200), "Autoregressive generation inherits earlier errors", fill=C_MUTED, font=f_small)

# Arrow 2
d.line([(590, 150), (630, 150)], fill=C_CRIMSON, width=3)
d.polygon([(640, 150), (630, 143), (630, 157)], fill=C_CRIMSON)

# Box 3: Final Output
d.rounded_rectangle([650, 50, 870, 250], radius=10, fill=C_RED_BG, outline=C_RED, width=2)
d.rectangle([650, 50, 870, 90], fill=C_RED)
d.text((670, 62), "3. Output Answer", fill=C_WHITE, font=f_header)
d.text((665, 115), "Final Answer: INCORRECT\n\nError in intermediate\nreasoning corrupts the\nfinal conclusion", fill=C_SLATE, font=f_text)

img.save('output/assets/fig_autoregressive_cot.png')
print("Generated fig_autoregressive_cot.png")

# ----------------------------------------------------
# 2. Intrinsic vs External Feedback Taxonomy
# ----------------------------------------------------
w, h = 900, 360
img = Image.new('RGB', (w, h), C_WHITE)
d = ImageDraw.Draw(img)

# Left Side: Intrinsic (The Paper's Scope)
d.rounded_rectangle([30, 30, 430, 330], radius=12, fill=C_RED_BG, outline=C_RED, width=2)
d.rectangle([30, 30, 430, 75], fill=C_CRIMSON)
d.text((50, 42), "Intrinsic Self-Correction (Paper Focus)", fill=C_WHITE, font=f_header)

d.rounded_rectangle([50, 95, 410, 145], radius=8, fill=C_WHITE, outline=C_BORDER)
d.text((65, 105), "Closed-Loop Self-Critique", fill=C_CRIMSON, font=f_bold)
d.text((65, 125), "Model prompts itself: 'Review your answer and correct errors'", fill=C_SLATE, font=f_small)

d.rounded_rectangle([50, 155, 410, 205], radius=8, fill=C_WHITE, outline=C_BORDER)
d.text((65, 165), "No External Knowledge Signal", fill=C_CRIMSON, font=f_bold)
d.text((65, 185), "Relies 100% on the model's own frozen parameters", fill=C_SLATE, font=f_small)

d.rounded_rectangle([50, 215, 410, 310], radius=8, fill=C_WHITE, outline=C_RED)
d.text((65, 225), "Core Paper Conclusion:", fill=C_RED, font=f_bold)
d.text((65, 248), "FAILS consistently on reasoning tasks.\nAccuracy drops across GPT-3.5, GPT-4, Llama-2.", fill=C_SLATE, font=f_text)

# Right Side: External Feedback
d.rounded_rectangle([470, 30, 870, 330], radius=12, fill=C_GREEN_BG, outline=C_GREEN, width=2)
d.rectangle([470, 30, 870, 75], fill=C_GREEN)
d.text((490, 42), "External / Tool-Assisted Feedback", fill=C_WHITE, font=f_header)

d.rounded_rectangle([490, 95, 850, 145], radius=8, fill=C_WHITE, outline=C_BORDER)
d.text((505, 105), "Ground-Truth Oracle Labels", fill=C_GREEN, font=f_bold)
d.text((505, 125), "External verifier tells LLM exactly whether answer is True/False", fill=C_SLATE, font=f_small)

d.rounded_rectangle([490, 155, 850, 205], radius=8, fill=C_WHITE, outline=C_BORDER)
d.text((505, 165), "Code Execution & Tools (e.g. Python REPL)", fill=C_GREEN, font=f_bold)
d.text((505, 185), "Deterministic compiler / unit test outputs verify computations", fill=C_SLATE, font=f_small)

d.rounded_rectangle([490, 215, 850, 310], radius=8, fill=C_WHITE, outline=C_GREEN)
d.text((505, 225), "Viable Path Forward:", fill=C_GREEN, font=f_bold)
d.text((505, 248), "CAN succeed because independent verifier\nprovides real feedback signal not generated by LLM.", fill=C_SLATE, font=f_text)

img.save('output/assets/fig_intrinsic_vs_external.png')
print("Generated fig_intrinsic_vs_external.png")

# ----------------------------------------------------
# 3. Answer Transition Breakdown (Figure 1 in Paper)
# ----------------------------------------------------
w, h = 900, 300
img = Image.new('RGB', (w, h), C_WHITE)
d = ImageDraw.Draw(img)

# Title banner
d.text((30, 15), "Answer Transition Dynamics (GPT-3.5 on GSM8K after 2 Rounds)", fill=C_SLATE, font=f_title)
d.text((30, 45), "Why accuracy drops: Models flip correct answers to incorrect more often than fixing errors", fill=C_MUTED, font=f_text)

# 4 Stat Cards
cards = [
    {"pct": "74.7%", "label": "No Change", "sub": "Answer remained unchanged", "bg": C_LIGHT_BG, "fg": C_SLATE, "border": C_BORDER},
    {"pct": "8.9%", "label": "Correct -> INCORRECT", "sub": "Flipped to wrong answer (Harmful)", "bg": C_RED_BG, "fg": C_RED, "border": C_RED},
    {"pct": "7.6%", "label": "Incorrect -> CORRECT", "sub": "Successfully fixed (Beneficial)", "bg": C_GREEN_BG, "fg": C_GREEN, "border": C_GREEN},
    {"pct": "8.8%", "label": "Incorrect -> Incorrect", "sub": "Remained wrong after critique", "bg": C_AMBER_BG, "fg": C_AMBER, "border": C_AMBER}
]

card_w = 195
for i, c in enumerate(cards):
    cx = 30 + i * (card_w + 20)
    d.rounded_rectangle([cx, 80, cx + card_w, 270], radius=10, fill=c["bg"], outline=c["border"], width=2)
    d.text((cx + 15, 100), c["pct"], fill=c["fg"], font=f_num)
    d.text((cx + 15, 150), c["label"], fill=c["fg"], font=f_bold)
    d.text((cx + 15, 195), c["sub"], fill=C_MUTED, font=f_small)

# Net summary pill
d.rounded_rectangle([30, 255, 870, 285], radius=6, fill=C_SLATE)
d.text((180, 262), "NET EFFECT: -1.3% Net Loss (8.9% Harmful Flips > 7.6% Beneficial Fixes)", fill=C_WHITE, font=f_bold)

img.save('output/assets/fig_transitions_breakdown.png')
print("Generated fig_transitions_breakdown.png")

# ----------------------------------------------------
# 4. Multi-Agent Debate vs Self-Consistency Diagram
# ----------------------------------------------------
w, h = 900, 330
img = Image.new('RGB', (w, h), C_WHITE)
d = ImageDraw.Draw(img)

# Left: Multi-Agent Debate
d.rounded_rectangle([30, 25, 430, 305], radius=10, fill=C_LIGHT_BG, outline=C_BORDER, width=2)
d.rectangle([30, 25, 430, 65], fill=C_CRIMSON)
d.text((50, 36), "Multi-Agent Debate (Du et al., 2023)", fill=C_WHITE, font=f_header)

d.text((50, 80), "• Structure: N agents engage in M debate rounds\n• Feedback: Agents read and critique each other\n• Cost: N × M sequential API calls\n• Flaw: Errors propagate; models conform to majority errors\n• Result: At matched compute, performs NO BETTER\n  than simple majority voting", fill=C_SLATE, font=f_text)

d.rounded_rectangle([50, 220, 410, 285], radius=6, fill=C_RED_BG, outline=C_RED)
d.text((65, 235), "Cost-to-Benefit: Poor efficiency", fill=C_RED, font=f_bold)
d.text((65, 255), "No intrinsic reasoning gain over sampling", fill=C_SLATE, font=f_small)

# Right: Self-Consistency
d.rounded_rectangle([470, 25, 870, 305], radius=10, fill=C_LIGHT_BG, outline=C_BORDER, width=2)
d.rectangle([470, 25, 870, 65], fill=C_SLATE)
d.text((490, 36), "Self-Consistency (Wang et al., 2022)", fill=C_WHITE, font=f_header)

d.text((490, 80), "• Structure: Sample N independent reasoning paths\n• Feedback: None — independent parallel sampling\n• Cost: N parallel calls (no inter-agent communication)\n• Aggregation: Simple majority vote over final answers\n• Result: Matches or exceeds Multi-Agent Debate accuracy\n  with significantly lower latency & overhead", fill=C_SLATE, font=f_text)

d.rounded_rectangle([490, 220, 850, 285], radius=6, fill=C_GREEN_BG, outline=C_GREEN)
d.text((505, 235), "Optimal Baseline: High efficiency", fill=C_GREEN, font=f_bold)
d.text((505, 255), "Equal or superior accuracy at equal cost", fill=C_SLATE, font=f_small)

img.save('output/assets/fig_debate_vs_consistency.png')
print("Generated fig_debate_vs_consistency.png")

# ----------------------------------------------------
# 5. Prompt Design Trap Diagram
# ----------------------------------------------------
w, h = 900, 320
img = Image.new('RGB', (w, h), C_WHITE)
d = ImageDraw.Draw(img)

# Scenario A: Misleading Evaluation
d.rounded_rectangle([30, 25, 430, 295], radius=10, fill=C_AMBER_BG, outline=C_AMBER, width=2)
d.rectangle([30, 25, 430, 65], fill=C_AMBER)
d.text((50, 36), "Flawed Evaluation Setup (Self-Refine)", fill=C_WHITE, font=f_header)

d.text((50, 80), "1. Initial Prompt: Weak / Under-specified\n   (e.g., omits instruction to include all target words)", fill=C_SLATE, font=f_text)
d.text((50, 130), "2. Feedback Prompt: Reintroduces missing rules\n   ('You forgot word X! Please add it now.')", fill=C_SLATE, font=f_text)
d.text((50, 180), "3. Output Improves -> Authors claim 'Self-Correction works!'", fill=C_RED, font=f_bold)
d.text((50, 225), "Illusion of Self-Correction:\nImprovement came from prompt information, not reflection", fill=C_MUTED, font=f_small)

# Scenario B: Fair Evaluation
d.rounded_rectangle([470, 25, 870, 295], radius=10, fill=C_GREEN_BG, outline=C_GREEN, width=2)
d.rectangle([470, 25, 870, 65], fill=C_GREEN)
d.text((490, 36), "Fair Evaluation Setup (Huang et al., 2024)", fill=C_WHITE, font=f_header)

d.text((490, 80), "1. Initial Prompt: Complete & Well-Specified\n   (includes all task rules & constraints up-front)", fill=C_SLATE, font=f_text)
d.text((490, 130), "2. Model generates strong answer immediately", fill=C_GREEN, font=f_bold)
d.text((490, 175), "3. Intrinsic Self-Correction applied -> Performance DROPS", fill=C_RED, font=f_bold)
d.text((490, 225), "True Finding:\nWell-prompted 1-shot generation beats self-correction loops", fill=C_MUTED, font=f_small)

img.save('output/assets/fig_prompt_trap.png')
print("Generated fig_prompt_trap.png")

# ----------------------------------------------------
# 6. Terry's Yogurt Reasoning Case Study (Figure 4 in Paper)
# ----------------------------------------------------
w, h = 900, 320
img = Image.new('RGB', (w, h), C_WHITE)
d = ImageDraw.Draw(img)

d.rounded_rectangle([30, 20, 870, 300], radius=10, fill=C_LIGHT_BG, outline=C_BORDER, width=2)
d.rectangle([30, 20, 870, 60], fill=C_SLATE)
d.text((50, 30), "Case Study: Flipping a Correct Answer to Incorrect (GSM8K Math)", fill=C_WHITE, font=f_header)

# Problem text
d.text((50, 75), "Problem: Terry eats 2 yogurts a day. A pack of 4 costs $5. How much does Terry spend on yogurt in 30 days?", fill=C_SLATE, font=f_bold)

# Step 1: Initial Response (Correct)
d.rounded_rectangle([50, 110, 430, 230], radius=8, fill=C_GREEN_BG, outline=C_GREEN)
d.text((65, 120), "Round 1: Initial Response (CORRECT)", fill=C_GREEN, font=f_bold)
d.text((65, 145), "• 30 days × 2 yogurts/day = 60 yogurts needed\n• 60 / 4 = 15 packs of yogurt\n• 15 packs × $5 = $75 total spending\n-> Correct Answer: $75", fill=C_SLATE, font=f_text)

# Step 2: Self-Correction Revision (Incorrect)
d.rounded_rectangle([460, 110, 850, 230], radius=8, fill=C_RED_BG, outline=C_RED)
d.text((475, 120), "Round 2: After Self-Correction (INCORRECT)", fill=C_RED, font=f_bold)
d.text((475, 145), "• Model doubts itself: 'Let me recheck the days'\n• Hallucinates false logic: '4 yogurts last 2 days...'\n• Calculates: $5 / 2 = $2.5/day -> 30 × $2.5 = $75... then\n  overcomplicates and outputs: $150 (WRONG)", fill=C_SLATE, font=f_text)

# Bottom Takeaway Pill
d.rounded_rectangle([50, 245, 850, 285], radius=6, fill=C_CRIMSON)
d.text((130, 255), "Key Phenomenon: Self-criticism prompt acts as a negative bias, gaslighting correct logic.", fill=C_WHITE, font=f_bold)

img.save('output/assets/fig_yogurt_case_study.png')
print("Generated fig_yogurt_case_study.png")

print("All asset figures generated successfully!")
