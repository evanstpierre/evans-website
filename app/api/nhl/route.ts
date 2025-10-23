'use server';
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
  // add check if there is no game
  
  if (!data.games || data.games.length === 0) {
    console.log('ℹ️ No games found in the past week.');
    return new Response(null, { status: 204 }); // 204 No Content
  }


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
    const leafsId = 10;
    const isLeafsHome = lastGame.homeTeam.id === leafsId;

    const lastGameRsp = {
      leafsWin: isLeafsHome
        ? lastGame.homeTeam.score > lastGame.awayTeam.score
        : lastGame.awayTeam.score > lastGame.homeTeam.score,

      leafsScore: isLeafsHome
        ? lastGame.homeTeam.score
        : lastGame.awayTeam.score,

      opponent: isLeafsHome
        ? lastGame.awayTeam.placeName.default + ' ' + lastGame.awayTeam.commonName.default
        : lastGame.homeTeam.placeName.default + ' ' + lastGame.homeTeam.commonName.default,

      opponentScore: isLeafsHome
        ? lastGame.awayTeam.score
        : lastGame.homeTeam.score
    };
      
  return new Response(JSON.stringify({ lastGameRsp }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

