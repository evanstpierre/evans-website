

// app/api/strava/route.t
import { NextRequest, NextResponse } from "next/server";
import { updateEnvVars } from "@/app/utils/updateEnv";


export const runtime = "edge";
export const dynamic = "force-dynamic"; // or: export const revalidate = 0;



const BASE_URL = "https://www.strava.com/api/v3/";
const RECENT_CUTOFF = 10;

// Optional: tag to revalidate programmatically
const STRAVA_TAG = "strava:athlete-stats";

function isExpired(expiresAt: number, buffer = 300) {
  return Math.floor(Date.now() / 1000) >= expiresAt - buffer;
}

async function getValidAccessToken() {
  const expiresAt = parseInt(process.env.STRAVA_EXPIRES_AT || "0", 10);
  if (!isExpired(expiresAt)) {
    return process.env.STRAVA_ACCESS_TOKEN!;
  }

  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.STRAVA_CLIENT_ID!,
      client_secret: process.env.STRAVA_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: process.env.STRAVA_REFRESH_TOKEN!,
    }),
    // Don't cache the token refresh call
    cache: "no-store",
  });

  const data = await res.json();

  // NOTE: writing to .env only works in dev / single server.
  // Prefer a DB/KV store in production (see notes below).
  await updateEnvVars({
    STRAVA_ACCESS_TOKEN: data.access_token,
    STRAVA_REFRESH_TOKEN: data.refresh_token,
    STRAVA_EXPIRES_AT: String(data.expires_at),
  });
  return data.access_token as string;
}

export async function GET(_req: NextRequest) {
  const accessToken = await getValidAccessToken();

  const statsResponse = await fetch(
    `${BASE_URL}athletes/${process.env.STRAVA_ATHLETE_ID}/stats`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      // Cache this response for 5 minutes and tag it
      next: { revalidate: 300, tags: [STRAVA_TAG] },
    }
  );

  const statsData = await statsResponse.json();
  const recent = statsData.recent_ride_totals || {};
  const all = statsData.all_ride_totals || {};
  const recentCount = recent.count || 0;

  const km = (m: number) => parseFloat((m / 1000).toFixed(0));
  const hrs = (s: number) => parseFloat((s / 3600).toFixed(0));
  const num = (n: number) => parseFloat((n ?? 0).toFixed(0));

  const transformed =
    recentCount >= RECENT_CUTOFF
      ? {
          ride_totals: {
            distance: km(recent.distance ?? 0),
            moving_time: hrs(recent.moving_time ?? 0),
            elevation_gain: num(recent.elevation_gain ?? 0),
            recent_totals: true,
          },
        }
      : {
          ride_totals: {
            distance: km(all.distance ?? 0),
            moving_time: hrs(all.moving_time ?? 0),
            elevation_gain: num(all.elevation_gain ?? 0),
            recent_totals: false,
          },
        };

  // Helpful HTTP cache headers (good for edge/CDN)
  return NextResponse.json(transformed, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}