# Self-hosted brand fonts

DM Sans (body) and Libre Franklin (display), the two families named in
`docs/brand-guide.md`.

These files are the latin subsets published by Fontsource
(`@fontsource/dm-sans` and `@fontsource/libre-franklin`, version 5.2.5), which
repackages the upstream Google Fonts releases. Both families are licensed under
the SIL Open Font License 1.1.

They are committed here rather than fetched from `fonts.googleapis.com` during
the build, so a deployment never fails because an external service is slow or
unreachable. To update, install the Fontsource package at the version you want
and copy the matching `latin-<weight>-normal.woff2` files over these.
