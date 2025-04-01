import Gallery from '@/app/components/Gallery';
import ActivityStats from './components/ActivityStats';
import Intro from './components/Intro';

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 pb-20 grid place-items-center">
      
      <div className="max-w-[1440px] px-[80px]   gap-20 flex  flex-col ">
        <Intro/>
        <Gallery />

        {/* <ActivityStats /> */}
      </div>
    </main>
  );
}
