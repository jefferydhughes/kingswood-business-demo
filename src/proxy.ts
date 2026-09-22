import { NextResponse } from "next/server";

/**
 * Keep Payload routes unavailable when this deployment has not been given a
 * database and signing secret. This lets the public site remain healthy while
 * Preview and Production CMS infrastructure are activated independently.
 */
export function proxy() {
  const cmsConfigured = Boolean(
    process.env.DATABASE_URL && process.env.PAYLOAD_SECRET,
  );

  if (!cmsConfigured) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/access/:path*",
    "/api/globals/:path*",
    "/api/media/:path*",
    "/api/og/:path*",
    "/api/pages/:path*",
    "/api/payload-preferences/:path*",
    "/api/programs/:path*",
    "/api/redirects/:path*",
    "/api/users/:path*",
  ],
};
