'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TimeZoneClock {
  name: string;
  timezone: string;
  label: string;
}

const timeZones: TimeZoneClock[] = [
  { name: 'New York', timezone: 'America/New_York', label: 'EST/EDT' },
  { name: 'London', timezone: 'Europe/London', label: 'GMT/BST' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', label: 'JST' },
  { name: 'Sydney', timezone: 'Australia/Sydney', label: 'AEDT/AEST' },
  { name: 'Dubai', timezone: 'Asia/Dubai', label: 'GST' },
  { name: 'Singapore', timezone: 'Asia/Singapore', label: 'SGT' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', label: 'IST' },
  { name: 'São Paulo', timezone: 'America/Sao_Paulo', label: 'BRT/BRST' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', label: 'PST/PDT' },
  { name: 'Bangkok', timezone: 'Asia/Bangkok', label: 'ICT' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', label: 'HKT' },
  { name: 'Berlin', timezone: 'Europe/Berlin', label: 'CET/CEST' },
];

export default function DigitalClock() {
  const [time, setTime] = useState<{ [key: string]: string }>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const newTime: { [key: string]: string } = {};

      timeZones.forEach((tz) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        newTime[tz.timezone] = formatter.format(new Date());
      });

      setTime(newTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">World Clock</h1>
          <p className="text-slate-300 text-lg">Real-time across multiple time zones</p>
        </div>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeZones.map((tz) => (
            <Card key={tz.timezone} className="bg-slate-800 border-slate-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* City Name */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-white">{tz.name}</h2>
                  <p className="text-sm text-slate-400">{tz.label}</p>
                </div>

                {/* Digital Clock Display */}
                <div className="bg-black rounded-lg p-6 mb-4 font-mono">
                  <div className="text-5xl font-bold text-green-400 tracking-wider text-center">
                    {time[tz.timezone] || '--:--:--'}
                  </div>
                </div>

                {/* Timezone Info */}
                <div className="text-xs text-slate-400 text-center">
                  {tz.timezone}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400">
          <p className="text-sm">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}