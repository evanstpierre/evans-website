"use client"
import Image from 'next/image'
import { use, useEffect, useState } from 'react';


type Photo = {
  id: number;
  imageSrc: string;
  name: string;
  location: string;
  date: string;
  vertical: boolean;
  album: string;
};









const Albums:string[] = [
  "Morocco",
  "Spain",
]


  export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAlbum, setIsAlbum] = useState(0)


    useEffect(() => {
      async function fetchGallery() {
        try {
          const res = await fetch('/data/gallery.json'); // path to public file
          const data = await res.json();
          console.log('📸 Photos loaded:', data); // 👈 your console.log here
          setPhotos(data);
        } catch (err) {
          console.error('Failed to load gallery:', err);
        } finally {
          setLoading(false);
        }
      }
    
      fetchGallery();
    }, []);

    
  
    // const sortedPhotos = Albums.flatMap((album) =>
    //   photos.filter((img) => img.album === album)
    // );
    const sortedPhotos = photos.filter((img) => img.album === 'Morocco');
    const sortedPhotos2 = photos.filter((img) => img.album === 'Spain');
    
    if (loading) {
      return (
        <div className="w-full h-[340px] flex items-center justify-center bg-[#F2E3DB] rounded shadow">
          <p className="text-[#263A29] text-sm">Loading photos...</p>
        </div>
      );
    }

    return (
      <div className="overflow-hidden max-w-[850px] h-[340px] bg-[#F2E3DB] px-0 py-3 rounded shadow">
        <div className="flex flex-nowrap  h-[250px]  gap-1 overflow-x-auto !scroll-smooth no-scrollbar px-2">
          {isAlbum == 0 && sortedPhotos.map((img) => (
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
           {isAlbum == 1 && sortedPhotos2.map((img) => (
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
        <div className='flex justify-center items-center p-2 gap-x-2'>
          <div 
            className={`w-[175px] h-[55px] rounded flex justify-center items-center cursor-pointer ${isAlbum==0? " bg-[#263A29]": "border-2 border-[#263A29]  text-[#263A29]"}` }
            onClick={() => setIsAlbum(0)}
          >
            Morocco
          </div>
          <div 
            className={`w-[175px] h-[55px] rounded flex justify-center items-center cursor-pointer ${isAlbum==1? " bg-[#263A29]": "border-2 border-[#263A29]  text-[#263A29]"}` }
            onClick={() => setIsAlbum(1)}
          >
            Spain
          </div>
        </div>
      </div>
    )
  }