import { FaGithub, FaLinkedin } from 'react-icons/fa';

const CONTACT_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec justo vel massa tristique dapibus. Curabitur vulputate, elit ut dictum varius, eros velit tempor quam, non hendrerit leo nulla non elit.";
const EMAIL = "evanlstpierre@gmail.com";
const SUBJECT = "Let's%20Connect!";

export default function Contact(){


    return(<div className="flex flex-col opacity-75 ">
        <p className="max-w-lg ">
            {CONTACT_TEXT}
        </p>
        <p className="max-w-lg py-5">
        The best way to get in touch is via email at <a href={`mailto:${EMAIL}?subject=${SUBJECT}`} className='underline'>{EMAIL}</a>
        </p>
        <div className='flex items-center gap-3'>
            <a className='wiggle-on-hover' href='https://www.linkedin.com/in/evan-st-pierre/' target='_blank'> 
                <FaLinkedin className="w-8 h-8 p-1 text-[#F2E3DB] opacity-75 hover:opacity-100"  />
            </a>
            <a className='wiggle-on-hover' href='https://github.com/evanstpierre' target='_blank'> 
                <FaGithub className="w-6 h-6 text-[#F2E3DB] opacity-75 hover:opacity-100 wiggle-on-hover" />
            </a>            
        </div>


    </div>)
}