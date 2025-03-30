
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
    location: 'Marrakesh',
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
    id: 5,
    imageSrc: '/images/DSCF0086.jpeg',
    name: 'Blue House',
    location: 'Marrakesh',
    date: '06.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 6,
    imageSrc: '/images/DSCF0099.jpeg',
    name: 'Motor Fruit Stand',
    location: 'Marrakesh',
    date: '06.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 7,
    imageSrc: '/images/DSCF0120.jpeg',
    name: 'Cafe Locals',
    location: 'Marrakesh',
    date: '06.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 16,
    imageSrc: '/images/DSCF0144.jpeg',
    name: 'Mandresa',
    location: 'Marrakesh',
    date: '07.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 15,
    imageSrc: '/images/DSCF0225.jpeg',
    name: 'Market Street',
    location: 'Marrakesh',
    date: '07.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 8,
    imageSrc: '/images/DSCF0339.jpeg',
    name: 'Push Carts',
    location: 'Marrakesh',
    date: '08.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 9,
    imageSrc: '/images/DSCF0341.jpeg',
    name: 'Relaxing in Chaos',
    location: 'Marrakesh',
    date: '08.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 10,
    imageSrc: '/images/DSCF0365.jpeg',
    name: 'Fruit Merchant',
    location: 'Marrakesh',
    date: '08.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 11,
    imageSrc: '/images/DSCF0274.jpeg',
    name: 'Mopeds',
    location: 'Marrakesh',
    date: '08.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 18,
    imageSrc: '/images/DSCF0440.jpeg',
    name: 'Village',
    location: 'Aït Benhaddou',
    date: '09.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 19,
    imageSrc: '/images/DSCF0447.jpeg',
    name: 'Village Shops',
    location: 'Aït Benhaddou',
    date: '09.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {

    id: 17,
    imageSrc: '/images/DSCF0500.jpeg',
    name: 'Desert Bulgarians',
    location: 'Merzouga',
    date: '10.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 12,
    imageSrc: '/images/DSCF0517.jpeg',
    name: 'Camel POV',
    location: 'Merzouga',
    date: '10.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 20,
    imageSrc: '/images/DSCF0536.jpeg',
    name: 'Dunes',
    location: 'Merzouga',
    date: '10.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  
  {
    id: 13,
    imageSrc: '/images/DSCF0571.jpeg',
    name: 'Beach POV',
    location: 'Tamranght',
    date: '13.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 21,
    imageSrc: '/images/DSCF0580.jpeg',
    name: 'Surf Boards',
    location: 'Tamranght',
    date: '13.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 14,
    imageSrc: '/images/DSCF0581.jpeg',
    name: 'Range Rover + Dog',
    location: 'Tamranght',
    date: '13.02.2025',
    vertical: true,
    album: 'Morocco'
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
  },
  {
    id: 22,
    imageSrc: '/images/DSCF0606.jpeg',
    name: 'Mandresa Wall',
    location: 'Fes',
    date: '16.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 23,
    imageSrc: '/images/DSCF0683.jpeg',
    name: 'Tannery Workers',
    location: 'Fes',
    date: '17.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 27,
    imageSrc: '/images/DSCF0710.jpeg',
    name: 'Dye Alley',
    location: 'Fes',
    date: '17.02.2025',
    vertical: true,
    album: 'Morocco'
  },
  {
    id: 24,
    imageSrc: '/images/DSCF0724.jpeg',
    name: 'Butchers at Work',
    location: 'Morocco',
    date: '17.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 26,
    imageSrc: '/images/DSCF0739.jpeg',
    name: 'Man in Truck with Oranges',
    location: 'Morocco',
    date: '17.02.2025',
    vertical: false,
    album: 'Morocco'
  },
  {
    id: 25,
    imageSrc: '/images/DSCF0751.jpeg',
    name: 'Group of Men Playing Cards',
    location: 'Morocco',
    date: '17.02.2025',
    vertical: false,
    album: 'Morocco'
  },
];







const Albums:string[] = [
  "Morocco",
  "Spain",
]


  export default function Gallery() {


    const sortedImages = Albums.flatMap((album) =>
      images.filter((img) => img.album === album)
    );

    return (
      <div className="overflow-hidden max-w-[850px] h-[340px] bg-[#F2E3DB] px-1 py-3 rounded shadow">
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