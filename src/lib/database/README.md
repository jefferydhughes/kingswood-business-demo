The public Supabase Root 2021 CA in `supabase-ca.json` comes from the URL used
by Supabase's dashboard:
https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt

SHA-256 fingerprint:
80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA

Valid until April 26, 2031. This is a public trust certificate, not a secret.
Supabase connections use this CA alongside Node's standard roots and retain
certificate and hostname verification. Other database hosts retain their URL's
TLS configuration. Connection acquisition is bounded to 10 seconds.

Migrations are a separate operation: `npm run payload:migrate`. A successful
Vercel build does not verify database connectivity or apply migrations.
