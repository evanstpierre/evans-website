
import { NextRequest } from 'next/server';

export async function GET() {

  const date = new Date();
  date.setDate(date.getDate() - 7);
  const formattedDate = date.toISOString().split('T')[0];
  const apiUrl = `https://api-web.nhle.com/v1/club-schedule/TOR/week/${formattedDate}`;
  const response = await fetch(apiUrl);


  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch NHL data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();
  console.log(`NHL API Response for date ${date}:`, data);

  const lastGame =
  data.games
    ?.filter((game: any) => game.gameState === 'OFF')
    .reduce((latest: any, current: any) =>
      new Date(current.gameDate) > new Date(latest.gameDate) ? current : latest
    );

    if (!lastGame) {
      console.log('❌ No completed games found.');
      // TODO: return something notifying webpage that there is no game.
      return new Response(JSON.stringify({ }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const { gameDate, homeTeam, awayTeam } = lastGame;
  
    const lastGameRsp = {
      date: gameDate,
      homeTeam: homeTeam.commonName?.default || 'Home Team',
      awayTeam: awayTeam.commonName?.default || 'Away Team',
      score: `${awayTeam.score ?? 0}–${homeTeam.score ?? 0}`,
    };
    
    

  return new Response(JSON.stringify({ lastGameRsp }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

