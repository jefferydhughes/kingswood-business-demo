"use client";

import { useId, useState } from "react";

type Answer = "undergraduate" | "graduate" | "sports" | "business" | "people";
type Result = { title: string; reason: string; href: string };

const results: Record<string, Result> = {
  sports: { title: "B.A. Sports & Recreation Management", reason: "You want practical business and leadership skills applied to sports, recreation, events, and community programming.", href: "#programs" },
  undergraduate: { title: "B.A. Business Management", reason: "You are building a broad practical foundation across the disciplines that make organizations work.", href: "#programs" },
  people: { title: "Master of Organizational Leadership", reason: "Your next step is primarily about leading people, culture, communication, and change.", href: "#graduate" },
  graduate: { title: "Master of Business Administration", reason: "You are preparing for broader responsibility across strategy, finance, operations, and organizational performance.", href: "#graduate" },
  business: { title: "Master of Business Administration", reason: "You want whole-organization fluency and stronger strategic decision-making.", href: "#graduate" }
};

export function ProgramFinder() {
  const headingId = useId();
  const [answer, setAnswer] = useState<Answer | null>(null);
  const result = answer ? results[answer] : null;

  return (
    <section id="program-finder" className="finder" aria-labelledby={headingId}>
      <div>
        <p className="eyebrow light">A CLEAR NEXT STEP</p>
        <h2 id={headingId}>Start with where you want to go.</h2>
        <p>Choose the statement closest to your goal. This is guidance—not an admissions decision—and an enrolment counsellor can help you compare options.</p>
      </div>
      {!result ? (
        <div className="finder-options" role="group" aria-label="Program goals">
          <button onClick={() => setAnswer("undergraduate")}>Build my first business foundation</button>
          <button onClick={() => setAnswer("sports")}>Work in sports or recreation</button>
          <button onClick={() => setAnswer("people")}>Lead people and organizational change</button>
          <button onClick={() => setAnswer("business")}>Build broader executive capability</button>
        </div>
      ) : (
        <div className="finder-result" aria-live="polite">
          <p className="eyebrow">A PROGRAM TO EXPLORE</p>
          <h3>{result.title}</h3>
          <p>{result.reason}</p>
          <div className="actions">
            <a className="button inverse" href={result.href}>Explore this path</a>
            <button className="text-button" onClick={() => setAnswer(null)}>Start over</button>
          </div>
        </div>
      )}
    </section>
  );
}
