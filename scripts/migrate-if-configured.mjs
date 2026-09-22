import { spawnSync } from "node:child_process";

const hasDatabaseConfiguration = Boolean(
  process.env.DATABASE_URL && process.env.PAYLOAD_SECRET,
);

if (!hasDatabaseConfiguration) {
  console.log(
    "Skipping Payload migrations: DATABASE_URL and PAYLOAD_SECRET are not both configured.",
  );
  process.exit(0);
}

console.log("Applying committed Payload migrations...");

const result = spawnSync(
  process.execPath,
  ["node_modules/payload/bin.js", "migrate"],
  {
    env: process.env,
    stdio: "inherit",
  },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
