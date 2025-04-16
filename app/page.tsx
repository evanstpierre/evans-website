import Gallery from '@/app/components/Gallery';
import ActivityStats from './components/ActivityStats';
import Intro from './components/Intro';
import Timeline from './components/Timeline';
import Header from './components/Header';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 pb-20 grid place-items-center gap-y-20">
      
        <Header/>
        <div className='max-w-[1000px] w-full flex flex-col justify-start  gap-y-20 '>
          <Intro/>
          <div className='flex flex-col gap-y-10'>
            <div className='flex flex-col gap-y-1'>
              <h1 className='anton text-3xl'>Hobbies</h1>
              <p className='max-w-[600px] opacity-75 text-xl'>
              Whe I’m not learning about computers/math I am probably cycling. I love exploring new places and drinking a nice cup of coffee [preferably a pour over]. I am proud Toronto local who is a passionate Maple Leafs and Blue Jays fan.
              </p>
            </div>
          
            <div className='flex flex-col gap-y-2'>

              <span className='opacity-75 text-xl ml-1'>Photos from my recent travels.</span>
              <Gallery />
            </div>
            <div className='flex flex-col gap-y-2'>
              <span className='opacity-75 text-xl ml-1'>Here is how much I have cycled in the past year.</span>
              <ActivityStats />
            </div>
          
          </div>
          <div className='flex flex-col place-items-start gap-y-2'>
            <h1 className='anton text-3xl'>Work Experience</h1>
            <Timeline />
          </div>
          <div className='flex flex-col gap-y-2'>
            <h1 className='anton text-3xl'> Contact Me </h1>
            <Contact/>
          </div>
        </div>
        <span className='opacity-75 text-sm'>
        Created by Evan St Pierre | 2025
        </span>


        {/* <ActivityStats /> */}

    </main>
  );
}
