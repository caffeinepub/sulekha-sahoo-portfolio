# Specification

## Summary
**Goal:** Remove specific proficiency span elements from the first, second, and fourth skill cards in the Skills section.

**Planned changes:**
- Remove the first `<span>` element inside the inner-most div of the first skill card (Photoshop) in `Skills.tsx`
- Remove the first `<span>` element inside the inner-most div of the second skill card (Illustrator) in `Skills.tsx`
- Remove the first `<span>` element inside the inner-most div of the fourth skill card (InDesign) in `Skills.tsx`

**User-visible outcome:** The proficiency span labels no longer appear on the first, second, and fourth skill cards, while all other card content and the Skills section layout remain unchanged.
