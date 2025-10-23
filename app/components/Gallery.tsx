"use client"
import { Album } from '@mui/icons-material';
import Image from 'next/image'
import { use, useEffect, useState } from 'react';
import { Icon } from '@mui/material';


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
    const [isExpanded, setIsExpanded] = useState(false);


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
    const sortedPhotos3 = photos.filter((img) => img.album === 'Denmark');
    const sortedPhotos4 = photos.filter((img) => img.album === 'Italy');


    if (loading) {
      return (
        <div className="w-full h-[340px] flex items-center justify-center bg-[#F2E3DB] rounded shadow">
          <p className="text-[#263A29] text-sm">Loading photos...</p>
        </div>
      );
    }


    return (
        <div className="overflow-hidden  sm:h-[350px] max-w-[400px] sm:max-w-[850px] bg-[#F2E3DB] px-3 py-5 rounded shadow">
        <div className='flex justify-centeritems-center gap-2'>
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
          <div 
            className={`w-[175px] h-[55px] rounded flex justify-center items-center cursor-pointer ${isAlbum==2? " bg-[#263A29]": "border-2 border-[#263A29]  text-[#263A29]"}` }
            onClick={() => 
              setIsAlbum(2)
            }
          >
           Denmark
          </div>
                    <div 
            className={`w-[175px] h-[55px] rounded flex justify-center items-center cursor-pointer ${isAlbum==3? " bg-[#263A29]": "border-2 border-[#263A29]  text-[#263A29]"}` }
            onClick={() => 
              setIsAlbum(3)
            }
          >
           Italy
          </div>
        </div>
            <div
              className={[
                "flex flex-col sm:flex-row w-full gap-1  mt-2 no-scrollbar smooth-scroll",
                "sm:h-[250px] osm:overflow-y-auto",                 // desktop behavior
                "overflow-y-hidden transition-[max-height] duration-700 ease-in-out",
                isExpanded ? "max-h-[15000px]" : "max-h-[700px]"    // 👈 animates
              ].join(" ")}
            >
              {isAlbum == 0 && sortedPhotos.map((img) => (
                <div
                  key={img.id} // ✅ unique key for each image
                  className={`relative group flex items-center justify-center flex-none  ${
                    img.vertical ? "  max-w-[375px] sm:w-[167px] aspect-[2/3]" : " max-w-[375px] aspect-[3/2]" 
                  }`}
                >
                      <Image
                src={img.imageSrc}
                alt={img.name}
                fill
                className="object-contain" // preserves aspect ratio, shows entire image
              />
                  {/* Hover Overlay */}
                  <div   
                  className={`absolute top-0 left-0 h-full border-2 border-[#263A29] w-full flex items-end justify-end p-1 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  
                  style={{ backgroundColor: 'rgba(242, 227, 219, 0.50)'}}
                    >
                    <p className="text-[#F2E3DB] text-sm ">{img.location}</p>
                    <p className="text-[#F2E3DB] text-sm ">{img.date}</p>
                    
                  </div>
                  
                </div>
              ))}
              {isAlbum == 1 && sortedPhotos2.map((img) => (
                <div
                  key={img.id} // ✅ unique key for each image
                  className={`relative group flex items-center justify-center flex-none  ${
                    img.vertical ? " max-w-[375px] sm:w-[167px] aspect-[2/3]" : " max-w-[375px] aspect-[3/2]" 
                  }`}
                >
                      <Image
                src={img.imageSrc}
                alt={img.name}
                fill
                className="object-contain" // preserves aspect ratio, shows entire image
              />
                  {/* Hover Overlay */}
                  <div   
                  className={`absolute top-0 left-0 h-full border-2 border-[#263A29] w-full flex items-end justify-end p-1 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  
                  style={{ backgroundColor: 'rgba(242, 227, 219, 0.50)'}}
                    >
                    <p className="text-[#F2E3DB] text-sm ">{img.location}</p>
                    <p className="text-[#F2E3DB] text-sm ">{img.date}</p>
                    
                  </div>
                  
                </div>
              ))}
              {isAlbum == 2 && sortedPhotos3.map((img) => (
                <div
                  key={img.id} // ✅ unique key for each image
                  className={`relative group flex items-center justify-center flex-none  ${
                    img.vertical ? " max-w-[375px] sm:w-[167px] aspect-[2/3]" : " max-w-[375px] aspect-[3/2]" 
                  }`}
                >
                      <Image
                src={img.imageSrc}
                alt={img.name}
                fill
                className="object-contain" // preserves aspect ratio, shows entire image
              />
                  {/* Hover Overlay */}
                  <div   
                  className={`absolute top-0 left-0 h-full border-2 border-[#263A29] w-full flex items-end justify-end p-1 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  
                  style={{ backgroundColor: 'rgba(242, 227, 219, 0.50)'}}
                    >
                    <p className="text-[#F2E3DB] text-sm ">{img.location}</p>
                    <p className="text-[#F2E3DB] text-sm ">{img.date}</p>
                    
                  </div>
                  
                </div>
              ))}
              {isAlbum == 3 && sortedPhotos4.map((img) => (
                <div
                  key={img.id} // ✅ unique key for each image
                  className={`relative group flex items-center justify-center flex-none  ${
                    img.vertical ? " max-w-[375px] sm:w-[167px] aspect-[2/3]" : " max-w-[375px] aspect-[3/2]" 
                  }`}
                >
                      <Image
                src={img.imageSrc}
                alt={img.name}
                fill
                className="object-contain" // preserves aspect ratio, shows entire image
              />
                  {/* Hover Overlay */}
                  <div   
                  className={`absolute top-0 left-0 h-full border-2 border-[#263A29] w-full flex items-end justify-end p-1 flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  
                  style={{ backgroundColor: 'rgba(242, 227, 219, 0.50)'}}
                    >
                    <p className="text-[#F2E3DB] text-sm ">{img.location}</p>
                    <p className="text-[#F2E3DB] text-sm ">{img.date}</p>
                    
                  </div>
                  
                </div>
              ))}
        </div >
        <div className='flex  sm:hidden justify-center items-center w-full h-[20px] bg-[#E86A33] rounded-t-none rounded-b-xl'
           onClick={() => setIsExpanded(!isExpanded)}
        >
       { <Icon
                  sx={{
                  fontFamily: "Material Symbols Outlined",
                  fontSize: 32,
                  fontVariationSettings:
                      "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
                  lineHeight: 1,
                  }}
              >
                {isExpanded? "arrow_drop_up":"arrow_drop_down"}
              </Icon>}
        </div>


      </div>
    )
  }