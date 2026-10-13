import type { ProspectInput } from "@/lib/integrations/contracts";

/**
 * In-memory capture used only when no real delivery channel is configured.
 *
 * This exists so the enrollment flow can be demonstrated end to end without
 * Salesforce or an email provider. It is deliberately not a production store:
 * it holds the most recent captures for one serverless instance and is lost on
 * restart. Because it is only ever written when every real channel is absent,
 * it can never hold a production lead.
 */
export type DemoCapture = {
  submissionId: string;
  capturedAt: string;
  prospect: ProspectInput;
  extras: {
    role?: string;
    source?: string;
    grade?: string;
    church?: string;
    guardianEmail?: string;
  };
};

const LIMIT = 25;

/** Survives hot reload in development, where module state is otherwise discarded. */
const globalStore = globalThis as typeof globalThis & { __kwDemoInquiries?: DemoCapture[] };
globalStore.__kwDemoInquiries ??= [];

export function recordDemoInquiry(capture: DemoCapture): void {
  const store = globalStore.__kwDemoInquiries as DemoCapture[];
  store.unshift(capture);
  if (store.length > LIMIT) store.length = LIMIT;
}

export function listDemoInquiries(): readonly DemoCapture[] {
  return globalStore.__kwDemoInquiries as DemoCapture[];
}
