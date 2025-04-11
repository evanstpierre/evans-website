import { NextRequest, NextResponse } from 'next/server';
import { updateEnvVars } from '@/app/utils/updateEnv';

async function getValidAccessToken(){
    const expiresAt = parseInt(process.env.STRAVA_EXPIRES_AT || '0', 10);
    const isTokenExpired = (expiresAt: number, buffer = 300): boolean => {
        return Math.floor(Date.now() / 1000) >= expiresAt - buffer;
      };

    if (!isTokenExpired(expiresAt)) {
        console.log("RETURNING ORIGINAL TOKEN")
        return process.env.STRAVA_ACCESS_TOKEN!;
    }
    
    const response = await fetch('https://www.strava.com/oauth/token',{
        method: 'POST',
        body: new URLSearchParams({
            client_id: process.env.STRAVA_CLIENT_ID!,
            client_secret: process.env.STRAVA_CLIENT_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: process.env.STRAVA_REFRESH_TOKEN!,
          }),
    })
    const data = await response.json();
    console.log('Strava token response:', data);
    
    // update .env.local
    await updateEnvVars({
        STRAVA_ACCESS_TOKEN: data.access_token,
        STRAVA_REFRESH_TOKEN: data.refresh_token,
        STRAVA_EXPIRES_AT: data.expires_at.toString(),
      });

    return data.access_token
}



export async function GET(request: NextRequest) {
    const BASE_URL =  'https://www.strava.com/api/v3/';
    const RECENT_CUTOFF = 10 
    
    const access_token = await getValidAccessToken()

    const statsResponse = await fetch(`${BASE_URL}athletes/${process.env.STRAVA_ATHLETE_ID}/stats`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
   
    // Transform or forward the response
    const statsData = await statsResponse.json();
    const recent = statsData.recent_ride_totals || {};
    const all = statsData.all_ride_totals || {};
    const recentCount = recent.count || 0;
    
    let transformed;
    if (recentCount >= RECENT_CUTOFF) {
      transformed = {
        ride_totals: {
          distance: parseFloat((recent.distance / 1000).toFixed(0)),
          moving_time: parseFloat((recent.moving_time / 3600).toFixed(0)),
          elevation_gain: parseFloat(recent.elevation_gain.toFixed(0)),
          recent_totals: true,
        },
      };
    } else {
      transformed = {
        ride_totals: {
          distance: parseFloat((all.distance / 1000).toFixed(0)),
          moving_time: parseFloat((all.moving_time / 3600).toFixed(0)),
          elevation_gain: parseFloat(all.elevation_gain.toFixed(0)),
          recent_totals: false,
        },
      };
    }
   
    return new Response(JSON.stringify(transformed), {
      headers: { 'Content-Type': 'application/json' },
    });
  }