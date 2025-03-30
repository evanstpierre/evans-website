import TerrainIcon from '@mui/icons-material/Terrain';
import TimerIcon from '@mui/icons-material/Timer';
import PedalBikeIcon from '@mui/icons-material/PedalBike';


const StatsLabel:string[] = [
    "Cycled",
    "Cycled",
    "Climbed",
] 


export default function ActivityStats() {
    const iconList = [
        { icon: <TerrainIcon />, label: 'Terrain' },
        { icon: <TimerIcon />, label: 'Timer' },
        { icon: <PedalBikeIcon />, label: 'Timer' },
      ];

    return(
        <div className="overflow-hidden max-w-[850px] h-[200px] bg-[#263A29] px-1 py-3 rounded shadow">
            <div className="flex flex-col items-center justify-center">
                <div className="text-[60px] text-[#F2E3DB]">
                    <TerrainIcon fontSize="inherit" />
                </div>
                <p>
                    100km Biked
                </p>
            </div>
        </div>
    )
}