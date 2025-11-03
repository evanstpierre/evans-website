// app/api/strava/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";   // or "@/lib/mongoose" if that's your file
import { StravaConfig } from "@/models/StravaConfig";

// IMPORTANT: Mongoose requires Node runtime, not Edge
// export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // or: export const revalidate = 0;

// Non-secret constants can stay here
const BASE_URL = "https://www.strava.com/api/v3/";
const RECENT_CUTOFF = 10;
const STRAVA_TAG = "strava:athlete-stats";

function isExpired(expiresAt: number) {
  const now = Math.floor(Date.now() / 1000);
  return now >= expiresAt;
}

// Load the single Strava config doc from Mongo
async function getStravaConfig() {
  await connectDB();
  const cfg = await StravaConfig.findOne();

  if (!cfg) {
    throw new Error("❌ No Strava config document found in MongoDB.");
  }

  return cfg;
}

// Take the config doc and ensure we have a valid access token
async function getValidAccessToken(cfg: any): Promise<string> {
  const expiresAt = parseInt(cfg.STRAVA_EXPIRES_AT || "0", 10);

  // 1️⃣ If still valid, just return it
  if (!isExpired(expiresAt)) {
    return cfg.STRAVA_ACCESS_TOKEN;
  }

  // 2️⃣ Otherwise, refresh via Strava OAuth
  console.log("🔄 Refreshing Strava access token...");

  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: cfg.STRAVA_CLIENT_ID,
      client_secret: cfg.STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: cfg.STRAVA_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`❌ Failed to refresh Strava token: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // 3️⃣ Update the document in MongoDB
  cfg.STRAVA_ACCESS_TOKEN = data.access_token;
  cfg.STRAVA_REFRESH_TOKEN = data.refresh_token;
  cfg.STRAVA_EXPIRES_AT = String(data.expires_at);
  await cfg.save();

  console.log("✅ Strava token refreshed and saved to DB.");

  return data.access_token as string;
}

export async function GET(_req: NextRequest) {
  try {
    // Load config & get a valid token
    const cfg = await getStravaConfig();
    const accessToken = await getValidAccessToken(cfg);

    // Call Strava stats using ATHLETE_ID from config
    const statsResponse = await fetch(
      `${BASE_URL}athletes/${cfg.STRAVA_ATHLETE_ID}/stats`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 300, tags: [STRAVA_TAG] },
      }
    );

    if (!statsResponse.ok) {
      throw new Error(
        `❌ Strava stats request failed: ${statsResponse.status} ${statsResponse.statusText}`
      );
    }

    const statsData = await statsResponse.json();
    const recent = statsData.recent_ride_totals || {};
    const all = statsData.all_ride_totals || {};
    const recentCount = recent.count || 0;

    const km = (m: number) => parseFloat(((m ?? 0) / 1000).toFixed(0));
    const hrs = (s: number) => parseFloat(((s ?? 0) / 3600).toFixed(0));
    const num = (n: number) => parseFloat((n ?? 0).toFixed(0));

    const transformed =
      recentCount >= RECENT_CUTOFF
        ? {
            ride_totals: {
              distance: km(recent.distance),
              moving_time: hrs(recent.moving_time),
              elevation_gain: num(recent.elevation_gain),
              recent_totals: true,
            },
          }
        : {
            ride_totals: {
              distance: km(all.distance),
              moving_time: hrs(all.moving_time),
              elevation_gain: num(all.elevation_gain),
              recent_totals: false,
            },
          };

    return NextResponse.json(transformed, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    console.error("❌ /api/strava error:", err);
    return NextResponse.json(
      { ok: false, message: err.message ?? "Failed to load Strava stats" },
      { status: 500 }
    );
  }
}


