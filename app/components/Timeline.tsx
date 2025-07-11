import Image from 'next/image'
 
 
// TODO:


const experiences = [
  {
    title: "Software Developer Intern | Searchspring",
    year: "2022",
    description: "Worked on the client portal.",
    icon: "/icons/searchspring.png",
  },
  {
    title: "Software Developer Intern | MarshMclennan",
    year: "2021",
    description:
      "Led morning scrum. Developed test for COVID-19 check-in application and built frontend component for the finance portal.",
    icon: "/icons/MMC.png",
  },
  // Add more objects here...
];

export default function Timeline(){
    return (
        <div className="max-w-[850px] flex  items-start justify-start">

            <div className='w-1 h-70 bg-[#F2E3DB] relative mx-10 '>
                <div className="w-13 h-13 rounded-full bg-[#F2E3DB] overflow-hidden flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2">
                <div className="rounded-full overflow-hidden ">
                    <Image
                        src="/icons/searchspring.png"
                        alt="Searchspring Icon"
                        width={43}
                        height={43}
                        className="object-cover"
                        />
                    </div>
                </div>

                <div className="w-13 h-13 rounded-full bg-[#F2E3DB] overflow-hidden flex items-center justify-center absolute top-35 left-1/2 -translate-x-1/2 ">
                        <Image
                        src="/icons/MMC.png"
                        alt="MarshMcClennan Icon"
                        width={40}
                        height={40}
                        />
                </div>
            </div>

            <div className='max-w-100 opacity-75'>
                <div className='h-30'>
                    <div>
                        Software Developer Intern | Searchspring
                    </div>
                    <div>
                        2022
                    </div>
                    <p className='mx-3'>
                    Worked on the client portal.  
                    </p>

                </div>
                <div className='h-30  mt-5  '>
                    <div>
                        Software Developer Intern | MarshMclennan
                    </div>
                    <div>
                        2021
                    </div>
                    <p className='mx-3'>
                    Led morning scrum. Developed test for COVID-19 check-in application and built frontend component for the finance portal.
                    </p>
                    
                </div>
            </div>
            
            
        </div>
    );
}