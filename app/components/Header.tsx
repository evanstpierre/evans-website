import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Header() {
    return (
        <div className="w-full py-4 px-[80px] flex justify-end items-center space-x-4 ">
          <div className={`text-[var(--font-anton)] text-[32px]`}>
           Contact Me
          </div>
          <ArrowOutwardIcon className="text-[var(--foreground)] text-[32px]" />
  
        </div>
    );
  }