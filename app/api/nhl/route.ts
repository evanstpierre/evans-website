
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || 'now'; // fallback to 'now' if not provided

  const apiUrl = `https://api-web.nhle.com/v1/club-schedule/TOR/week/${date}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch NHL data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();
  console.log(`NHL API Response for date ${date}:`, data);

  const games =
    data.games
      ?.filter((game: any) => game.gameState === 'OFF')
      .map((game: any) => ({
        gameDate: game.gameDate,
        awayTeam: {
          id: game.awayTeam.id,
          commonName: game.awayTeam.commonName?.default || '',
          score: game.awayTeam.score ?? null,
        },
        homeTeam: {
          id: game.homeTeam.id,
          commonName: game.homeTeam.commonName?.default || '',
          score: game.homeTeam.score ?? null,
        },
      })) || [];

  return new Response(JSON.stringify({ games }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

