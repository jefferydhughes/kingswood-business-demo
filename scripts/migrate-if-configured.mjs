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

const { tsImport } = await import("tsx/esm/api");
const configModule = await tsImport("../src/payload.config.ts", import.meta.url);
const config = await configModule.default;
const { getPayload } = await import("payload");
const payload = await getPayload({ config });

try {
  await payload.db.migrate();
  console.log("Payload migrations complete.");
} finally {
  await payload.db.pool.end();
}
