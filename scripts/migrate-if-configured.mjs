import { setTimeout as delay } from "node:timers/promises";

const hasDatabaseConfiguration = Boolean(
  process.env.DATABASE_URL && process.env.PAYLOAD_SECRET,
);

if (!hasDatabaseConfiguration) {
  console.log(
    "Skipping Payload migrations: DATABASE_URL and PAYLOAD_SECRET are not both configured.",
  );
  process.exit(0);
}

async function migrate() {
  console.log("Applying committed Payload migrations...");

  const { tsImport } = await import("tsx/esm/api");
  const configModule = await tsImport("../src/payload.config.ts", import.meta.url);
  const config = await configModule.default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });

  try {
    await payload.db.migrate();
    console.log("Payload migrations complete.");
  } finally {
    // Payload 3.88 retains its reconnect connection. Only bound shutdown
    // after the migration has completed or failed, never the migration itself.
    await Promise.race([payload.db.pool.end(), delay(5_000)]);
  }
}

migrate().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
