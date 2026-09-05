"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Typewriter } from 'react-simple-typewriter';


export default function Intro() {
  const [introWords, setIntroWords] = useState([
    'I love building cool things!',
    'I am a huge leafs and jays fan',
  ]);
  
    useEffect(() => {
        async function getData() {
        try {
            const res = await fetch('/api/nhl/');
            if (res.status === 204) {
              console.log('ℹ️ No NHL games data found.');
            } else if (!res.ok) {
              throw new Error('NHL API error');
            }
            else{
              const json = await res.json();
              if (json.lastGameRsp?.leafsWin) {
                setIntroWords(prev => [
                  ...prev,
                  "I'm happy the Leafs beat the " + json.lastGameRsp?.opponent + " " + json.lastGameRsp?.leafsScore + "-"+ json.lastGameRsp?.opponentScore,
                ]);
              } else {
                console.log('🏒 The Leafs lost.');
              }
            }
           

        } catch (err) {
            console.error('Failed to fetch NHL data:', err);
        }

        try {
          const res = await fetch('/api/mlb/');
           if (res.status === 204) {
              console.log('ℹ️ No MLB games data found.');
            } else if (!res.ok) {
              throw new Error('MLB API error');
            }
          else{
            const json = await res.json();
            if (json.lastGameRsp?.jaysWin) {
              setIntroWords(prev => [
                ...prev,
                "Jays won their last game,"+ json.lastGameRsp?.jaysScore + "-"+ json.lastGameRsp?.opponentScore +"!",
              ]);
            } else {
              console.log('⚾ The Jays lost.');
            }
        }
      } catch (err) {
          console.error('Failed to fetch NHL data:', err);
      }
      setIntroWords(prev => [
        ...prev,
        "Lets Connect and grab a coffee!",
      ]);
    }

    getData();
  }, []);

  return (
    <div className="flex w-full max-w-[850px] items-center justify-between gap-x-8 text-[#F2E3DB]">
      <div className="flex min-w-0 max-w-[500px] flex-col gap-y-3">
        <div className="text-3xl ">
          Hi my name is, Evan St Pierre
        </div>
        <p className=" min-w[300px] animate-typing jetbrains text-xl opacity-75"> <Typewriter
          words={introWords}
          loop={0} // set to `Infinity` for infinite loop
          cursor
          cursorStyle="_"
          typeSpeed={120}     // ⬅ slower typing (default ~70)
          deleteSpeed={60}    // ⬅ slower deleting
          delaySpeed={2000}   // ⬅ longer pause before next word
        /></p>

        <a href="#contact-me" className="flex items-center justify-center w-[75px] h-[40px] bg-[#E86A33] rounded-md cursor-pointer opacity-75 hover:opacity-100">Connect</a>
        <p className="text-md sm:text-l md:text-xl opacity-75">
        I am a University of Waterloo Computer Science alumni who is seeking job opportunities. 
        </p>
      </div>
      <div className="hidden h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full lg:block">
        <Image 
        src={'/avatar/happy.png'}
        alt={"A smiling avatar of Evan St Pierre" }
        width={200}
        height={200}
        className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
