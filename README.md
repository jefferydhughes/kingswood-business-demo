# Kingswood School of Business — Recruitment Demo

Static concept site ready to deploy to Vercel.

## Files
- `index.html` — homepage / School of Business recruitment experience
- `styles.css` — responsive design system
- `app.js` — program-finder quiz + navigation/reveal behaviour
- `assets/` — current Kingswood program imagery used in the demo
  - `kingswood-mark.png` — header/footer flame logo
  - `sports-field.jpg` — clean night-field background for the Sports & Recreation card and band
  - `sports.jpg` — original pre-composed banner (text baked in); kept for reference, not used by the site
- `vercel.json` — minimal Vercel config

## Deploy
Drag the folder into a Vercel project, or push it to a Git repository and import the repository in Vercel. No build command is required.

## Content status
This prototype intentionally markets the **currently listed B.A. in Business Management**, not the proposed 3-year replacement degree. It is structured so the undergraduate card/page can be swapped later without redesigning the rest of the School of Business experience.

The Master of Organizational Leadership copy is based on the supplied MOL proposal. Before public launch, confirm final institutional approval, delivery format, tuition, admissions requirements, and the live application/advisor URLs.

## Recommended next iteration
1. Swap `assets/kingswood-mark.png` (400×400 raster flame mark) for the official Kingswood vector/SVG logo.
2. Add real student/alumni outcome stories and employer logos.
3. Connect quiz completion to CRM / enrolment counsellor follow-up.
4. Split each program into its own conversion-focused landing page.
5. Add tuition/financial aid blocks after current figures are approved.
6. Instrument analytics: quiz-start, quiz-complete, program-card click, advisor click, application click.
