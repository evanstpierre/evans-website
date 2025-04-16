import { FaGithub, FaLinkedin } from 'react-icons/fa';

const CONTACT_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec justo vel massa tristique dapibus. Curabitur vulputate, elit ut dictum varius, eros velit tempor quam, non hendrerit leo nulla non elit.";
export default function Contact(){


    return(<div className="flex flex-col ">
        <p className="max-w-lg ">
            {CONTACT_TEXT}
        </p>
        <div className='flex items-center gap-3'>
            <FaLinkedin className="w-8 h-8 p-1 text-[#F2E3DB] opacity-75 hover:opacity-100 wiggle-on-hover" />
            <FaGithub className="w-6 h-6 text-[#F2E3DB] opacity-75 hover:opacity-100 wiggle-on-hover" />
        </div>


    </div>)
}