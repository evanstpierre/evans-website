
import Image from 'next/image'

// type def for image
type ImageType = {
    id: number
    imageSrc: string
    name: string
    location: string
    date: string // changed from 'data' to 'date'
    vertical: boolean
  }

  const images: ImageType[] = [
    {
      id: 1,
      imageSrc: '/images/DSCF0095.jpeg',
      name: 'YSL Garden',
      location: 'Hawaii',
      date: '06.02.2025',
      vertical: false

    },
    {
      id: 2,
      imageSrc: '/images/DSCF1365.jpeg',
      name: 'Garden',
      location: 'Barcelona,Spain',
      date: '09.03.2025',
      vertical: true
    },
  ]

  const albums: string[] = ["Morocco", "Spain"]

  export default function Gallery() {
    return (
      <div className="overflow-hidden max-w-[850px] h-[340px] bg-[#f2f2f2] p-3 rounded-lg shadow">
        <div className="flex flex-nowrap  h-[250px]  gap-2 bg-black overflow-x-auto">
            {/* <div className="h-[275px] w-[6px] bg-[#E86A33] flex-shrink-0" /> */}
          {images.map((img) => (
            <div key={img.id} className="flex items-center justify-center flex-none">
              <Image
                src={img.imageSrc}
                alt={img.name}
                height={250}
                width={img.vertical ? 167 :  375 } // keeps layout stable
                style={{ objectFit: 'cover' }}
              />
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