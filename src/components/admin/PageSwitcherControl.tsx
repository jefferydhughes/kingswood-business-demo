"use client";

import { useRouter } from "next/navigation";
import { useId } from "react";

export type SwitcherEntry = {
  label: string;
  route: string;
  /** Null when this page has no document yet, so there is nothing to open. */
  href: string | null;
  current: boolean;
  status: "Published" | "Draft" | "Not created yet";
};

/**
 * The equivalent of the page dropdown in the reference editor: an editor who is
 * on the wrong page switches to the right one without going back to a list.
 *
 * A select rather than a custom popover, because it is keyboard and screen
 * reader accessible with no work and behaves correctly on a phone.
 */
export function PageSwitcherControl({
  entries,
  liveRoute,
}: {
  entries: SwitcherEntry[];
  liveRoute: string | null;
}) {
  const router = useRouter();
  const selectId = useId();
  const current = entries.find((entry) => entry.current);

  return (
    <div className="kw-switcher">
      <label className="kw-switcher__label" htmlFor={selectId}>
        Page
      </label>
      <select
        className="kw-switcher__select"
        id={selectId}
        value={current?.href ?? ""}
        onChange={(event) => {
          const href = event.target.value;
          if (href) router.push(href);
        }}
      >
        {!current ? <option value="">Select a page</option> : null}
        {entries.map((entry) => (
          <option disabled={entry.href === null} key={entry.route} value={entry.href ?? ""}>
            {entry.label} ({entry.route}) — {entry.status}
          </option>
        ))}
      </select>
      {liveRoute ? (
        <a
          className="kw-switcher__live"
          href={liveRoute}
          rel="noreferrer"
          target="_blank"
        >
          Open published page
        </a>
      ) : null}
    </div>
  );
}
