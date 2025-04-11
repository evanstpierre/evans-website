"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Intro() {
    
    const [today, setToday] = useState('');
    const [fiveDaysAgo, setFiveDaysAgo] = useState('');

    useEffect(() => {
        const now = new Date();
        // Format as YYYY-MM-DD
        const formatted = now.toISOString().split('T')[0];
        setToday(formatted);

        const fiveAgo = new Date(now)
        fiveAgo.setDate(fiveAgo.getDate() - 5);
        const fiveDaysAgoFormatted = fiveAgo.toISOString().split('T')[0];
        setFiveDaysAgo(fiveDaysAgoFormatted);
     


    }, []);
  
    useEffect(() => {
        if (!today) return; // wait until date is set

        async function getData() {
        try {
            const res = await fetch('/api/nhl/');
            if (!res.ok) throw new Error('API error');
            const json = await res.json();
            console.log('From BFF:', json);
        } catch (err) {
            console.error('Failed to fetch NHL data:', err);
        }
    }

    getData();
  }, [fiveDaysAgo]);

  return (
    <div className="min-w-[850px] max-w-[1000px] max-h-[500px] text-[#F2E3DB] flex justify-center 
      flex-row justify-evenly ">
        <div>
        <p className="font-[var(--font-jetbrainsmono)] text-2xl" >
          Hi My name is,
        </p>
        <div className="font-[var(--font-anton)] text-3xl">
          Evan St Pierre
        </div>
        <p className=" min-w[300px] animate-typing font-[var(--font-jetbrainsmono)] text-2xl">I am a newly graduated Computer Science Major.</p>
      </div>
      <div className="rounded-full overflow-hidden">
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