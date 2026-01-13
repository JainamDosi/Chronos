"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import ChronosGrid from '@/components/ChronosGrid';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import AIInsights from '@/components/AIInsights';
import { WeeklyData, TimeSlot } from '@/types';
import { getMonday, formatDate } from '@/utils/date';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  // Initialize with current date, this is fine on server too
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getMonday(new Date()));

  // Initialize with empty object to avoid hydration mismatch or ReferenceError
  const [data, setData] = useState<WeeklyData>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('chronos_v2_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Critical: Storage corruption. Resetting state.");
      }
    }
    setIsLoaded(true);
  }, []);

  // Persistent storage sync
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chronos_v2_data', JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const handleSlotChange = useCallback((date: string, hour: number, slot: TimeSlot) => {
    setData(prev => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [hour]: slot
      }
    }));
  }, []);

  const currentWeekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      return formatDate(d);
    });
  }, [currentWeekStart]);

  const navigateWeek = (direction: number) => {
    setCurrentWeekStart(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + (direction * 7));
      return next;
    });
  };

  const jumpToToday = () => {
    setCurrentWeekStart(getMonday(new Date()));
  };

  const toggleView = () => {
    setShowDashboard(!showDashboard);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black font-sans">
      {/* Universal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-4 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/[0.05] transition-all duration-300 shadow-2xl">
        <div
          onClick={() => setShowDashboard(false)}
          className="flex items-center gap-4 pointer-events-auto group cursor-pointer"
        >
          <div className="w-6 h-6 bg-white flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <div className="w-3 h-3 bg-black"></div>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.4em] text-white">Chronos</span>
        </div>

        <div className="hidden md:flex items-center gap-12 pointer-events-auto">
          {!showDashboard ? (
            <a href="#features" className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">Features</a>
          ) : (
            <>
              <a href="#grid" className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">Log</a>
              <a href="#telemetry" className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">Stats</a>
              <a href="#audit" className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">Analysis</a>
            </>
          )}
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={toggleView}
            className={`text-[10px] font-mono font-bold uppercase tracking-widest px-6 py-2 rounded-full transition-all border ${showDashboard
              ? 'bg-white text-black border-white'
              : 'text-zinc-400 border-zinc-800 hover:bg-white hover:text-black'
              }`}
          >
            {showDashboard ? 'Close Dashboard' : 'Open Dashboard'}
          </button>
        </div>
      </nav>

      <main className="animate-fade-in">
        {!showDashboard ? (
          <>
            <Hero />
            <BentoGrid />
            <section className="py-32 md:py-64 border-y border-zinc-900 bg-zinc-1000 text-center px-6">
              <h2 className="text-4xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-none max-w-5xl mx-auto animate-reveal">
                STOP <span className="text-zinc-800">WASTING TIME.</span>
              </h2>
              <button
                onClick={toggleView}
                className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </section>
          </>
        ) : (
          <div className="pt-24 md:pt-32 pb-24 min-h-screen">
            {/* Week Control Header */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-2">Weekly Journal</span>
                <h1 className="text-3xl font-bold tracking-tighter">Your Week</h1>
              </div>

              <div className="flex items-center gap-8 bg-zinc-950 p-1 border border-zinc-900 rounded-lg">
                <button
                  onClick={() => navigateWeek(-1)}
                  className="p-3 hover:bg-zinc-900 rounded transition-colors text-zinc-600 hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <div className="text-center min-w-[180px]">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">Week Of</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                    {currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <button
                  onClick={() => navigateWeek(1)}
                  className="p-3 hover:bg-zinc-900 rounded transition-colors text-zinc-600 hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>

              <button
                onClick={jumpToToday}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white border border-transparent hover:border-zinc-800 px-4 py-2 rounded-md transition-all"
              >
                Go to Today
              </button>
            </div>

            <ChronosGrid data={data} currentWeekDates={currentWeekDates} onChange={handleSlotChange} />
            <AnalyticsDashboard data={data} currentWeekDates={currentWeekDates} />
            <AIInsights data={data} currentWeekDates={currentWeekDates} />
          </div>
        )}
      </main>

      <footer className="py-20 md:py-32 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-12 text-center">
          <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 flex items-center justify-center rotate-45">
            <div className="w-4 h-4 bg-zinc-700 -rotate-45"></div>
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.6em]">Chronos App • Private focus tracker</p>
            <p className="text-zinc-800 text-[9px] font-mono tracking-widest">SECURELY SAVED • 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
