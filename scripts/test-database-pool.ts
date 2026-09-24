import assert from "node:assert/strict";
import { X509Certificate } from "node:crypto";
import { test } from "node:test";
import pg from "pg";

import { databasePoolOptions } from "../src/lib/database/pool";
import { certificate } from "../src/lib/database/supabase-ca.json";

test("Supabase TLS survives pg URL parsing and preserves credentials and non-TLS options", () => {
  const options = databasePoolOptions("postgresql://postgres.project:p%40ss@aws-0-ca-central-1.pooler.supabase.com:6543/postgres?sslmode=require&application_name=cms");
  const client = new pg.Client(options);
  assert.equal(client.ssl.rejectUnauthorized, true);
  assert.ok(client.ssl.ca.includes(certificate));
  const url = new URL(options.connectionString);
  assert.equal(url.password, "p%40ss");
  assert.equal(url.searchParams.get("application_name"), "cms");
  assert.equal(url.searchParams.has("sslmode"), false);
  assert.equal(options.connectionTimeoutMillis, 10_000);
});

test("Non-Supabase hosts keep their existing TLS configuration", () => {
  const url = "postgres://localhost:5432/cms?sslmode=disable";
  const options = databasePoolOptions(url);
  assert.equal(options.connectionString, url);
  assert.equal("ssl" in options, false);
});

test("Unconfigured builds load, and malformed URLs do not expose credentials", () => {
  assert.equal(databasePoolOptions("").connectionString, "");
  assert.throws(() => databasePoolOptions("secret-invalid-value"), {
    message: "DATABASE_URL must be a valid Postgres URL.",
  });
});

test("Bundled certificate is the valid official Supabase CA", () => {
  const ca = new X509Certificate(certificate);
  assert.equal(ca.ca, true);
  assert.equal(ca.fingerprint256, "80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA");
  assert.ok(Date.parse(ca.validTo) > Date.now());
});
