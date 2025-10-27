"use client";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import TimerIcon from "@mui/icons-material/Timer";
import LandscapeIcon from "@mui/icons-material/Landscape";

type RideTotals = {
  distance: number;
  moving_time: number;
  elevation_gain: number;
  recent_totals: boolean;
};

export default function ActivityStats() {
  const [totals, setTotals] = useState<RideTotals | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchRideTotals() {
      try {
        const res = await fetch("/api/strava");
        const data = await res.json();
        setTotals(data.ride_totals);
      } catch (error) {
        console.error("Failed to load ride totals:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRideTotals();
  }, []);

  return (
    <div className="relative bg-[#263A29] h-[200px] w-full max-w-[850px] rounded shadow p-4 text-[#F2E3DBBF]">
      {/* Info bubble */}
      <div className="absolute top-2 right-2">
        <div
          onClick={() => setExpanded(!expanded)}
          className={`bg-[#D97C42] rounded-full px-1 h-8 group flex flex-row justify-between items-center transition-all duration-700 sm:opacity-75
            ${expanded ? "w-[300px]" : "w-auto"}
            sm:w-auto sm:hover:w-[300px] sm:hover:opacity-100 cursor-pointer`}
        >
          <span
            className={`ml-2 text-sm whitespace-nowrap transition-opacity duration-500 ${
              expanded ? "inline" : "hidden sm:group-hover:inline"
            }`}
          >
            All data synced with my Strava account
          </span>
          <InfoIcon className="opacity-75" sx={{ fontSize: 26, color: "#F3E2D3" }} />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-10 flex justify-evenly items-center gap-2 text-center ">
        <StatCard
          icon={<PedalBikeIcon sx={{ fontSize: 60, color: "#F2E3DB" }} />}
          value={totals?.distance ?? 0}
          label="km Biked"
        />
        <StatCard
          icon={<TimerIcon sx={{ fontSize: 60, color: "#F2E3DB" }} />}
          value={totals?.moving_time ?? 0}
          label="hr Moving"
        />
        <StatCard
          icon={<LandscapeIcon sx={{ fontSize: 60, color: "#F2E3DB" }} />}
          value={totals?.elevation_gain ?? 0}
          label="m Climbed"
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center text-[#F2E3DB] opacity-75">
      {icon}
      <p className="text-md opacity-90"> {value} {label}</p>
    </div>
  );
}