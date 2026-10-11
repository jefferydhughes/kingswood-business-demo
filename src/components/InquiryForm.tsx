"use client";

import { useId, useState } from "react";
import { track } from "@/lib/analytics";

type Props = {
  /** Pre-selected program interest, for example from the finder result. */
  programInterest?: string;
  /** Who is asking, from the finder or the form itself. */
  role?: "student" | "parent";
  /** Heading level context: compact hides the intro copy. */
  compact?: boolean;
  /** Show the demo-mode disclosure. */
  reviewMode?: boolean;
  source: string;
};

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const POLICY_VERSION = "demo-2026-10";

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return { givenName: parts[0] || undefined, familyName: parts.slice(1).join(" ") || undefined };
}

export function InquiryForm({ programInterest, role = "student", compact = false, reviewMode = true, source }: Props) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFieldError("Enter an email address we can reply to.");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const interest = [String(form.get("programInterest") ?? ""), `asked by: ${String(form.get("role") ?? role)}`, `from: ${source}`]
      .filter(Boolean)
      .join(" | ");
    const payload = {
      email,
      ...splitName(String(form.get("name") ?? "")),
      province: String(form.get("province") ?? "") || undefined,
      programInterest: interest.slice(0, 120),
      intendedStart: String(form.get("intendedStart") ?? "") || undefined,
      landingPath: window.location.pathname || "/",
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      consentEmail: form.get("consentEmail") === "on",
      consentSms: false,
      consentPolicyVersion: POLICY_VERSION,
      companyWebsite: String(form.get("companyWebsite") ?? ""),
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/forms/inquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) { setStatus("sent"); track("inquiry_submit", { source, role: String(form.get("role") ?? role) }); }
      else if (res.status === 503) setStatus("unavailable");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <h3>Thank you. We will be in touch.</h3>
        <p>An enrolment counsellor will reply to the email you gave us.</p>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit} noValidate>
      {!compact && <p className="form-intro">Two minutes, no obligation. A real person replies, and you choose what we send.</p>}
      <div className="field-row">
        <label htmlFor={`${uid}-role`}>I am a
          <select id={`${uid}-role`} name="role" defaultValue={role}>
            <option value="student">student</option>
            <option value="parent">parent or guardian</option>
          </select>
        </label>
        <label htmlFor={`${uid}-name`}>First and last name
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" />
        </label>
      </div>
      <label htmlFor={`${uid}-email`}>Email
        <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required aria-invalid={fieldError ? true : undefined} aria-describedby={fieldError ? `${uid}-err` : undefined} />
      </label>
      {fieldError && <p id={`${uid}-err`} className="form-error" role="alert">{fieldError}</p>}
      <div className="field-row">
        <label htmlFor={`${uid}-province`}>Province
          <select id={`${uid}-province`} name="province" defaultValue="New Brunswick">
            <option>New Brunswick</option><option>Nova Scotia</option><option>Prince Edward Island</option><option>Newfoundland and Labrador</option><option>Elsewhere in Canada</option><option>Outside Canada</option>
          </select>
        </label>
        <label htmlFor={`${uid}-start`}>Planning to start
          <select id={`${uid}-start`} name="intendedStart" defaultValue="Fall 2027">
            <option>Fall 2027</option><option>Fall 2028</option><option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label htmlFor={`${uid}-program`}>Most interested in
        <select id={`${uid}-program`} name="programInterest" defaultValue={programInterest ?? "Not sure yet"}>
          <option>Not sure yet</option>
          <option>BA in Entrepreneurship</option>
          <option>BA in Sports and Recreation Management</option>
          <option>BA in Management</option>
          <option>MBA</option>
          <option>Elements first year</option>
        </select>
      </label>
      <div className="hp" aria-hidden="true"><label>Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="check" htmlFor={`${uid}-consent`}>
        <input id={`${uid}-consent`} name="consentEmail" type="checkbox" />
        <span>Also send me occasional updates about Kingswood. Optional, and you can unsubscribe at any time.</span>
      </label>
      <button className="button" type="submit" disabled={status === "sending"} data-cta="inquiry-submit" data-source={source}>
        {status === "sending" ? "Sending" : "Send my questions"}
      </button>
      {status === "unavailable" && (
        <p className="form-error" role="alert">
          {reviewMode
            ? "Demo mode: the inquiry service is not connected yet, so nothing was saved."
            : "We could not take your message just now. Please use Request information on kingswood.edu/admissions."}
        </p>
      )}
      {status === "error" && <p className="form-error" role="alert">Something went wrong. Check your details and try again.</p>}
      {reviewMode && status !== "unavailable" && <p className="form-note">Demo: submissions are not stored until the inquiry service is connected.</p>}
    </form>
  );
}
