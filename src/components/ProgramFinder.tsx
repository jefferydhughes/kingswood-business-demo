"use client";

import { useEffect, useId, useRef, useState } from "react";
import { InquiryForm } from "./InquiryForm";
import { track } from "@/lib/analytics";

type Role = "student" | "parent";
type Goal = "venture" | "sports" | "lead" | "ministry" | "unsure";
type Priority = "cost" | "jobs" | "hands-on" | "faith" | "home";
type Stage = "g11" | "g12" | "grad" | "college";

type Step = { key: "role" | "goal" | "priority" | "stage"; title: (r: Role) => string; options: (r: Role) => [string, string][] };

const steps: Step[] = [
  { key: "role", title: () => "Who is exploring?", options: () => [["student", "I am the student"], ["parent", "I am a parent or guardian"]] },
  {
    key: "goal",
    title: (r) => (r === "parent" ? "What does your student want to do?" : "What do you most want to do?"),
    options: () => [
      ["venture", "Start or run a business"],
      ["sports", "Work in sports, recreation, or outdoor programs"],
      ["lead", "Lead teams and organizations"],
      ["ministry", "Serve through ministry and business together"],
      ["unsure", "Not sure yet"],
    ],
  },
  {
    key: "priority",
    title: (r) => (r === "parent" ? "What matters most to your family?" : "What matters most to you?"),
    options: () => [
      ["cost", "Affordability"],
      ["jobs", "A job or business when I finish"],
      ["hands-on", "Hands-on experience, not only lectures"],
      ["faith", "Faith and community"],
      ["home", "Staying close to home"],
    ],
  },
  {
    key: "stage",
    title: () => "Where are they in school?",
    options: () => [["g11", "Grade 11 or earlier"], ["g12", "Grade 12"], ["grad", "Graduated, taking a break"], ["college", "Have some college or university"]],
  },
];

type Answers = { role?: Role; goal?: Goal; priority?: Priority; stage?: Stage };

const programs: Record<Goal, { name: string; interest: string; href: string; why: Record<Role, string> }> = {
  venture: {
    name: "BA in Entrepreneurship",
    interest: "BA in Entrepreneurship",
    href: "#degrees",
    why: {
      student: "You want to build something. This degree has you launch a real venture, pitch it to a panel, and graduate with a track record.",
      parent: "Your student learns by starting real ventures with real customers, and graduates with evidence of what they can do.",
    },
  },
  sports: {
    name: "BA in Sports and Recreation Management",
    interest: "BA in Sports and Recreation Management",
    href: "#degrees",
    why: {
      student: "You can turn sport and the outdoors into a career: events, facilities, marketing, and finance, with real experience running them.",
      parent: "A business degree applied to the industry your student loves, with hands-on experience built into every year.",
    },
  },
  lead: {
    name: "BA in Management",
    interest: "BA in Management",
    href: "#degrees",
    why: {
      student: "You will learn strategy, projects, and technology, then lead a team and a budget inside a real unit.",
      parent: "Your student practises leadership on real teams and budgets, with outside business owners reviewing the result.",
    },
  },
  ministry: {
    name: "BA in Management, with the ministry track in Year 1",
    interest: "BA in Management",
    href: "#pathway",
    why: {
      student: "Faith and work are not separate here. Start with the shared first year, then choose business or the ministry track.",
      parent: "Christian formation is written into the first year and into how every student is assessed.",
    },
  },
  unsure: {
    name: "Start with the shared first year",
    interest: "Elements first year",
    href: "#pathway",
    why: {
      student: "You do not have to decide today. Every student begins in the same first year, and you choose your degree in Year 2.",
      parent: "Your student does not have to choose a degree yet. Year 1 is shared by all students and stands on its own as a certificate.",
    },
  },
};

const priorityLine: Record<Priority, Record<Role, string>> = {
  cost: { student: "Kingswood publishes its costs and aid. See the cost section below, then ask us about your situation.", parent: "Kingswood publishes its costs and aid. See the cost section below, then ask us about your family's situation." },
  jobs: { student: "Every year ends with proof of what you can do: a portfolio, client results, and financials.", parent: "Every year ends with evidence of what your student can do, not only a grade." },
  "hands-on": { student: "Real work starts in your first semester.", parent: "Real work starts in the first semester." },
  faith: { student: "Faith is part of how you are taught and assessed.", parent: "Faith is part of how students are taught and assessed." },
  home: { student: "Ask us about visits and what living near campus looks like.", parent: "Ask us about visits and what student life looks like." },
};

export function ProgramFinder({ reviewMode = true }: { reviewMode?: boolean }) {
  const headingId = useId();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const questionRef = useRef<HTMLParagraphElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  /** Nothing is focused on first paint; only move focus once the visitor has started. */
  const started = useRef(false);
  const done = index >= steps.length;
  const role: Role = answers.role ?? "student";
  const step = steps[index];
  const result = done && answers.goal ? programs[answers.goal] : null;

  // Each answer unmounts the button that was clicked, so focus would otherwise
  // fall to the document body and a keyboard user would tab from the top again.
  useEffect(() => {
    if (!started.current) return;
    (questionRef.current ?? resultRef.current)?.focus();
  }, [index]);

  function choose(value: string) {
    started.current = true;
    if (!step) return;
    const next = { ...answers, [step.key]: value } as Answers;
    setAnswers(next);
    setIndex(index + 1);
    if (index + 1 >= steps.length) track("finder_complete", { role: next.role, goal: next.goal, priority: next.priority, stage: next.stage });
  }

  return (
    <section id="finder" className="finder" aria-labelledby={headingId}>
      <div>
        <p className="eyebrow light">FIND YOUR PATH</p>
        <h2 id={headingId}>Four taps. One clear next step.</h2>
        <p>Guidance, not an admissions decision. An enrolment counsellor can talk through any option with you.</p>
        {!done && <p className="finder-progress" aria-live="polite">Question {index + 1} of {steps.length}</p>}
      </div>
      {!done && step ? (
        <div className="finder-options" role="group">
          <p className="finder-question" ref={questionRef} tabIndex={-1}>{step.title(role)}</p>
          {step.options(role).map(([value, label]) => (
            <button key={value} type="button" onClick={() => choose(value)} data-cta={`finder-${step.key}`}>{label}</button>
          ))}
          {index > 0 && <button type="button" className="text-button" onClick={() => { started.current = true; setIndex(index - 1); }}>Back</button>}
        </div>
      ) : result && answers.priority ? (
        <div className="finder-result">
          <p className="eyebrow" role="status">A GOOD FIT TO EXPLORE</p>
          <h3 ref={resultRef} tabIndex={-1}>{result.name}</h3>
          <p>{result.why[role]}</p>
          <p>{priorityLine[answers.priority][role]}</p>
          <a className="text-link-dark" href={result.href}>See how it works</a>
          <div className="finder-capture">
            <p className="mini-label">Get answers from a real person</p>
            <InquiryForm compact role={role} programInterest={result.interest} reviewMode={reviewMode} source="finder" />
          </div>
          <button type="button" className="text-button" onClick={() => { setAnswers({}); setIndex(0); }}>Start over</button>
        </div>
      ) : null}
    </section>
  );
}
