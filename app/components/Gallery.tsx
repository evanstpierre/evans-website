
import Image from 'next/image'

// type def for image
type ImageType = {
  id: number;
  imageSrc: string;
  name: string;
  location: string;
  date: string;
  vertical: boolean;
  album: string;
};

const images: ImageType[] = [
  {
    id: 1,
    imageSrc: '/images/DSCF0095.jpeg',
    name: 'YSL Garden',
    location: 'Merrekesh',
    date: '06.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 2,
    imageSrc: '/images/DSCF1365.jpeg',
    name: 'Garden',
    location: 'Barcelona',
    date: '09.03.2025',
    vertical: true,
    album: 'Spain'
  },
  {
    id: 3,
    imageSrc: '/images/DSCF0595.jpeg',
    name: 'Alley',
    location: 'Fes',
    date: '16.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 4,
    imageSrc: '/images/DSCF0602.jpeg',
    name: 'Hospital',
    location: 'Fes',
    date: '16.02.2025',
    vertical: false,
    album: 'Morocco'
  }
];





  export default function Gallery() {
    const sortedImages = [
      ...images.filter((img) => img.album === 'Morocco'),
      ...images.filter((img) => img.album === 'Spain'),
    ];
    
    return (
      <div className="overflow-hidden max-w-[850px] h-[340px] bg-[#f2f2f2] px-1 py-3 rounded-lg shadow">
        <div className="flex flex-nowrap  h-[250px]  gap-1 overflow-x-auto !scroll-smooth no-scrollbar">
          {sortedImages.map((img) => (
            <div key={img.id} className="relative group flex items-center justify-center flex-none">
              <Image
                src={img.imageSrc}
                alt={img.name}
                height={250}
                width={img.vertical ? 167 :  375 } // keeps layout stable
                style={{ objectFit: 'cover' }}
              />
              {/* Hover Overlay */}
              <div   
              className={`absolute top-0 left-0 h-[250px] border-2 border-[#263A29] ${
              img.vertical ? 'w-[167px]' : 'w-[375px]'} flex items-end justify-end p-1 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              
              style={{ backgroundColor: 'rgba(242, 227, 219, 0.50)'}}
                >
                <p className="text-[#F2E3DB] text-sm ">{img.location}</p>
                <p className="text-[#F2E3DB] text-sm ">{img.date}</p>
                
              </div>
              
            </div>
          ))}
        </div >
        <div className='flex justify-center items-center p-2'>
          <div className='w-[230px] h-[55px] bg-[#263A29]  rounded flex justify-center items-center'>
            Morocco
          </div>
        </div>
      </div>
    )
  }