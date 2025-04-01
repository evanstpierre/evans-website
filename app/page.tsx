import Gallery from '@/app/components/Gallery';
import ActivityStats from './components/ActivityStats';
import Intro from './components/Intro';

export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 pb-20 font-[family-name:var(--font-geist-sans)] grid place-items-center">
      <div className="max-w-[1440px] w-full px-[80px]">
        <Intro/>
        <div className='h-[100px]'>
          
        </div>
        <Gallery />

        {/* <ActivityStats /> */}
      </div>
    </main>
  );
}
