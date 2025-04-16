import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Header() {
    return (
        <div className="w-full h-[40px] flex flex-row justify-end gap-x-3">
          <span className='anton text-2xl'>Contact Me</span>
          <span className='anton text-2xl'>|</span>
          <span className='anton text-2xl'>Resume</span>
        </div>
    );
  }