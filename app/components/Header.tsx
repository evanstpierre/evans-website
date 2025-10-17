import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Header() {
    return (
        <div className="hidden sm:flex h-[40px] w-full flex-row justify-end gap-x-3">
          <a href='#contact-me'>
          <span className='anton text-2xl border-b-2 border-transparent hover:border-[#E86A33] transition-all duration-500 cursor-pointer'>Contact Me</span>
          </a>
          
          <span className='anton text-2xl'>|</span>
          <span className='anton text-2xl border-b-2 border-transparent hover:border-[#E86A33] transition-all duration-500 cursor-pointer'>Resume</span>
        </div>
    );
  }