
import { NextRequest } from 'next/server';

export async function GET() {

  const teamId = 141

  // Get start and end date
  const date = new Date();
  const endDate = date.toISOString().split('T')[0];
  date.setDate(date.getDate() - 7);
  const startDate = date.toISOString().split('T')[0];






  if (!teamId || !startDate || !endDate) {
    return new Response(JSON.stringify({ error: 'Missing query parameters: teamId, start, end' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${teamId}&startDate=${startDate}&endDate=${endDate}`);
  
  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch MLB data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();
  const lastGame = data.dates
  ?.filter((day: any) => day.totalItems >= 1)
  .reduce((latest: any, current: any) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }).games?.[0];

  const lastGameRsp = {
      homeTeam: lastGame.teams.home.team.name,
      homeId: lastGame.teams.home.team.id,
      homeScore: lastGame.teams.home.score,
      awayTeam: lastGame.teams.away.team.name,
      awayId: lastGame.teams.away.team.id,
      awayScore:lastGame.teams.away.score,
  };


  return new Response(JSON.stringify({ lastGameRsp }), {
    headers: { 'Content-Type': 'application/json' },
  });
}