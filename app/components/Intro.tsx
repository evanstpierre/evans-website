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
            if (!res.ok) throw new Error('API error');
            const json = await res.json();
            if (json.lastGameRsp?.leafsWin) {
              setIntroWords(prev => [
                ...prev,
                "I'm happy the Leafs beat the " + json.lastGameRsp?.opponent + " " + json.lastGameRsp?.leafsScore + "-"+ json.lastGameRsp?.opponentScore,
              ]);
            } else {
              console.log('🏒 The Leafs lost.');
            }

        } catch (err) {
            console.error('Failed to fetch NHL data:', err);
        }

        try {
          const res = await fetch('/api/mlb/');
          if (!res.ok) throw new Error('API error');
          const json = await res.json();
          if (json.lastGameRsp?.jaysWin) {
            setIntroWords(prev => [
              ...prev,
              "Jays won there last game,"+ json.lastGameRsp?.jaysScore + "-"+ json.lastGameRsp?.opponentScore +"!",
            ]);
          } else {
            console.log('⚾ The Jays lost.');
          }
      } catch (err) {
          console.error('Failed to fetch NHL data:', err);
      }
      setIntroWords(prev => [
        ...prev,
        "Lets Connet on Linkdin",
      ]);
    }

    getData();
  }, []);

  return (
    <div className="w-full  max-h-[500px] text-[#F2E3DB] flex
      flex-row justify-between ">
      <div className="flex flex-col gap-y-3 max-w-[500px]">
        <div className="text-3xl ">
          Hi my name is, Evan St Pierre
        </div>
        <p className=" min-w[300px] animate-typing jetbrains text-xl opacity-75"> <Typewriter
          words={introWords}
          loop={0} // set to `Infinity` for infinite loop
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        /></p>
        <button 
          className="w-[75px] h-[40px] bg-[#E86A33] rounded-md cursor-pointer opacity-75 hover:opacity-100"
          onClick={() => window.open('https://www.linkedin.com/in/evan-st-pierre/', '_blank')}
        >
          Connect 
        </button>
        <p className="text-xl opacity-75">
        I am a new Grad with a degree in Computer Science Grad who is seeking job opportunities. 
        </p>
      </div>
      <div className=" hidden lg:block rounded-full overflow-hidden ">
        <Image 
        src={'/avatar/happy.png'}
        alt={"A smiling avatar of Evan St Pierre" }
        width={200}
        height={200}
        style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}