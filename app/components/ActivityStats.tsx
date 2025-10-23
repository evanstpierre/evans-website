"use client"
import { useEffect, useState } from 'react';
import { Icon } from '@mui/material';


const StatsLabel:string[] = [
    "Cycled",
    "Cycled",
    "Climbed",
] 

type RideTotals = {
    distance: number;
    moving_time: number;
    elevation_gain: number;
    recent_totals: boolean;
  };
  

export default function ActivityStats() {
    const BASE_URL = process.env.BASE_URL;
    const [totals, setTotals] = useState<RideTotals | null>(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
        async function fetchRideTotals() {
          try {
            const res = await fetch(`/api/strava`);
            const data = await res.json();
           
            setTotals(data.ride_totals);
            console.log('Totals:', totals);
          } catch (error) {
            console.error('Failed to load ride totals:', error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchRideTotals();
      }, []);
    

    return(
        <div className="relative bg-[#263A29] h-[200px] w-full max-w-[850px] rounded shadow p-4">
            <div className="absolute top-2 right-2">

                <div
                onClick={() =>   (window.innerWidth < 640) ?  setExpanded(!expanded) : "" }
                className={`bg-[#D97C42] text-[#F3E2D3] rounded-full px-0.5 h-8 group flex flex-row justify-between items-center transition-all duration-700
                    ${expanded ? "w-[300px]" : "w-auto"}
                    ${(window.innerWidth < 640) ? "opacity-100" :  "opacity-75"}
                    sm:w-auto sm:hover:w-[300px] sm:hover:opacity-100
                `}
                >
                <span
                    className={`ml-2 whitespace-nowrap transition-opacity duration-500 ${
                    expanded ? "inline" : "hidden sm:group-hover:inline"
                    }`}
                >
                    All data is synced with my Strava account
                </span>

                <Icon
                    sx={{
                    fontFamily: "Material Symbols Outlined",
                    fontSize: 32,
                    fontVariationSettings:
                        "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                    lineHeight: 1,
                    }}
                >
                    info
                </Icon>
                </div>
            </div>
        <div className="text-[#F2E3DBBF] mt-10 flex flex-collumn justify-evenly">
            <div className='flex flex-col justify-center items-center'>
                <Icon
                    sx={{
                    fontFamily: 'Material Symbols Outlined',
                    fontSize: 90,
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                    lineHeight: 1,
                    }}
                >
                    pedal_bike
                </Icon>
                <p>
                    {totals?.distance}km Biked
                </p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <Icon
                    sx={{
                    fontFamily: 'Material Symbols Outlined',
                    fontSize: 90,
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                    lineHeight: 1,
                    }}
                >
                   timer
                </Icon>
                <p>
                    {totals?.moving_time}hr
                </p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <Icon
                    sx={{
                    fontFamily: 'Material Symbols Outlined',
                    fontSize: 90,
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                    lineHeight: 1,
                    }}
                >
                   landscape
                </Icon>
                <p className='w[80px]'>
                    {totals?.elevation_gain}m Climbed
                </p>
            </div>
            
        </div>
    </div>
    )
}