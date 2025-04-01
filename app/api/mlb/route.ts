
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const teamId = searchParams.get('teamId');
  const startDate = searchParams.get('start');
  const endDate = searchParams.get('end');

  if (!teamId || !startDate || !endDate) {
    return new Response(JSON.stringify({ error: 'Missing query parameters: teamId, start, end' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiUrl = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${teamId}&startDate=${startDate}&endDate=${endDate}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch MLB data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();

  const schedule =
  data.dates
    ?.filter((day: any) => day.totalItems >= 1)
    .map((day: any) => ({
      date: day.date,
      games: day.games.map((game: any) => ({
        away: {
          score: game.teams.away?.score ?? null,
          isWinner: game.teams.away?.isWinner ?? null,
          team: {
            id: game.teams.away?.team?.id ?? null,
            name: game.teams.away?.team?.name ?? 'Unknown',
          },
        },
        home: {
          score: game.teams.home?.score ?? null,
          isWinner: game.teams.home?.isWinner ?? null,
          team: {
            id: game.teams.home?.team?.id ?? null,
            name: game.teams.home?.team?.name ?? 'Unknown',
          },
        },
      })),
    })) ?? [];

  return new Response(JSON.stringify({ schedule }), {
    headers: { 'Content-Type': 'application/json' },
  });
}