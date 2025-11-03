// 'use server'; // not required in a Route Handler, ok to remove

// export const dynamic = 'force-dynamic'; // or: export const revalidate = 0;
// export const runtime = 'edge';          // optional: good for Cloudflare/Workers

export async function GET() {

  const jaysId = 141

  // Get start and end date
  const date = new Date();
  const endDate = date.toISOString().split('T')[0];
  date.setDate(date.getDate() - 7);
  const startDate = date.toISOString().split('T')[0];


  if (!jaysId || !startDate || !endDate) {
    return new Response(JSON.stringify({ error: 'Missing query parameters: teamId, start, end' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${jaysId}&startDate=${startDate}&endDate=${endDate}`);
  
  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch MLB data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();

  if(data.totalGames == 0){
    console.log('ℹ️ No games found in the past week.');
    return new Response(null, { status: 204 }); // 204 No Content
  }

  const lastGame =  data.dates
  ?.flatMap((day: any) =>
    day.games.filter((game: any) => game.status?.detailedState === "Final")
  )
  .reduce((latest: any, current: any) => {
    return new Date(current.gameDate) > new Date(latest.gameDate) ? current : latest;
  });


  const lastGameRsp = {
    jaysWin: lastGame.teams.home.team.id === jaysId 
      ? lastGame.teams.home.isWinner 
      : lastGame.teams.away.isWinner,
  
    jaysScore: lastGame.teams.home.team.id === jaysId 
      ? lastGame.teams.home.score 
      : lastGame.teams.away.score,
  
    opponent: lastGame.teams.home.team.id === jaysId 
      ? lastGame.teams.away.team.name 
      : lastGame.teams.home.team.name,
  
    opponentScore: lastGame.teams.home.team.id === jaysId 
      ? lastGame.teams.away.score 
      : lastGame.teams.home.score,
  };
  
  return new Response(JSON.stringify({ lastGameRsp }), {
    headers: { 'Content-Type': 'application/json' },
  });
}