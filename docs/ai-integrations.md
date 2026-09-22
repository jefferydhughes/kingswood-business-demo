# Kingswood Compass AI strategy

## Vision

Kingswood Compass is a governed AI layer for decisions, learning, teaching, and trusted institutional knowledge. It borrows UF NaviGator's platform logic without pretending Kingswood has UF's infrastructure.

    trusted content → governed gateway → narrow assistants
                    → evaluation → integration → scale

## Suite

| Product | Audience | Purpose | Phase |
|---|---|---|---|
| Ask Kingswood | Prospects/parents | Grounded program/admissions/cost/visit answers | 3 |
| Compass Match | Prospects | Transparent program discovery | 4 |
| Compass Tutor | Students/faculty | Course-grounded explanation/practice/feedback | 5 |
| Compass Studio | Faculty/staff | Configure approved assistants/sources | 6 |
| Compass Chat | Authenticated community | Secure institutional AI workspace | 6 |
| Compass Access | Editors/faculty | Draft alt text, captions, transcripts | 6 |
| Compass Voice | Community | Analyze structured feedback | 6 |
| Compass Gateway | Developers | Models, budgets, logs, policies | Foundation |

## Ask Kingswood

Allowed: explain and compare published programs; surface verified cost, aid, dates, requirements, visits; recommend pages/next steps; request handoff; cite sources.

Forbidden: promise admission, scholarships, transfer credit, immigration, licensure, or employment; make counselling/crisis/medical/legal/spiritual-direction decisions; infer protected traits; accept sensitive documents; invent answers.

Every factual response includes source links, review date where material, uncertainty/conflict notice, next action, and human handoff.

## Compass Match

Start with transparent rules plus structured content, not opaque prediction. Inputs: level, interest/calling, delivery, schedule/location, goals, desired experience. Output 1–3 programs with reasons, differences, cost/requirement links, “none” and human help.

Never claim to identify God's calling or guarantee fit. Do not rank with gender, ethnicity, disability, finances, or other protected/sensitive traits.

## Compass Tutor

Skill Samurai supplies reusable patterns: student/faculty roles, content management, tutor configuration, QA review, Supabase/RLS, LLM gateway, progress. Reuse patterns rather than the SPA.

Modes:

- Check knowledge: questions and feedback.
- Grow knowledge: explanation/examples/guided practice.
- Discuss/apply: Socratic cases and reflection.
- Writing coach: outline/feedback within policy, no ghostwriting.
- Study plan: learner-selected goals.

Faculty controls sources, objectives, allowed help, citations, hint depth, dates, escalation, evaluation, and visibility policy.

Pilot boundaries: no grade writing, autonomous integrity decisions, hidden surveillance/emotion inference, cross-student reuse, or undisclosed AI. Faculty can disable immediately.

## Architecture

    Web/LMS
      → identity and entitlement
      → AI gateway
         → classification and policy
         → injection/abuse controls
         → approved-source retrieval
         → approved model
         → citation/output validation
         → redacted trace/evaluation
      → answer or human escalation

Components: provider-neutral gateway; PostgreSQL/pgvector; approval-aware ingestion; hybrid retrieval; versioned prompts/policies; structured validation; sensitive-data detection; budgets/rates; evaluation dashboard; feedback/incident flow.

Cloud models require institutional accounts and contractual privacy. Local/open models come later only when data, cost, or educational value justifies operations.

## Knowledge lifecycle

Owner submission → classification/approval by use case → metadata extraction/chunking → conflict/expiry checks → pre-release evaluation → cited production answers → prompt removal of expired/retracted knowledge.

Public content still requires an owner and verification date.

## Evaluation

Metrics: factual support, citations, refusal/escalation, retrieval recall, hallucinations, injection resistance, sensitive-data handling, helpfulness, reading level, latency/cost, accessibility.

Test common and ambiguous questions; expired/conflicting sources; international/transfer/cost/deadline edges; parents; tutoring; integrity requests; injection/exfiltration; crisis/legal/immigration/spiritual escalation; and disparate quality across names, gender cues, geography, and language proficiency.

Run evaluation on every model, system prompt, retrieval, knowledge, or safety-policy change.

## Ownership

Admissions owns public answers/handoff; Academic Affairs tutor policy; faculty course sources; IT/security platform/vendors/incidents; privacy classification/retention; accessibility interface/output review; AI group use cases/releases.

AI assists rather than replaces counsellors, faculty, pastoral care, counselling, or accessibility expertise.

## Cost controls

Small-model routing, safe public version-aware caching, minimal relevant context, per-product/user budgets, abuse limits, cost per resolved question/handoff, provider portability.

## Proof of concept

Use 30–50 verified pages covering programs, admissions, tuition/aid, dates, visits, student life, online, and international. Create at least 150 evaluation questions before public exposure. Release to staff, then a small prospect group, then selected pages behind a flag.

## Approval decisions

Approve vendors/models, classifications, retention, authenticated scope, LMS/identity path, handoff ownership, accessibility/language expectations, thresholds, and incident stop conditions.
