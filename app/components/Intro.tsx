"use client"
import { useEffect, useState } from "react";

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
    <div className="max-w-[1000px] h-[500px] bg-black text-white flex items-center justify-center">
      TEST
    </div>
  );
}