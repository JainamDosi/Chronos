import React from 'react';
import { Icons } from '../constants';

const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-48 px-6 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.6em] mb-4 block animate-reveal">System Features</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-[1.1] animate-reveal" style={{ animationDelay: '0.1s' }}>
              Built for
              <span className="text-zinc-700 underline decoration-zinc-800 underline-offset-8">  Focus.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[700px]">
          {/* Calendar Box */}
          <div className="md:col-span-4 group relative bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden p-12 hover:border-zinc-500 transition-all duration-700 shadow-2xl">
            <div className="relative z-10 h-full flex flex-col">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-6">Archive</span>
              <h3 className="text-3xl font-bold text-white tracking-tighter mb-4">Activity Log</h3>
              <p className="text-zinc-500 text-base font-light mb-16 max-w-sm leading-relaxed">
                Track your time every week. See exactly where your focus goes.
              </p>

              <div className="flex-1 relative mt-auto">
                <div className="absolute inset-0 grid grid-cols-10 gap-2 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-1000">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-white rounded-sm"></div>
                  ))}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-2xl animate-float">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-black">
                      <Icons.Productive />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Status</div>
                      <div className="text-sm font-black text-white uppercase tracking-[0.2em]">Productive</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Box */}
          <div className="md:col-span-2 group relative bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden p-10 hover:border-emerald-500 transition-all duration-700">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-8 block">AI Assistant</span>
            <h3 className="text-2xl font-bold text-white tracking-tighter mb-6">AI Feedback</h3>
            <div className="space-y-8">
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden group-hover:border-zinc-600 transition-colors">
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                  <div className="w-3/4 h-full bg-emerald-500 animate-[pulse_2s_infinite]"></div>
                </div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Processing Data...</div>
              </div>
              <p className="text-zinc-400 text-sm italic leading-relaxed font-mono">
                "Evening focus dropped by 12%. Try to avoid distractions at 7 PM."
              </p>
            </div>
          </div>

          {/* Telemetry Box */}
          <div className="md:col-span-3 group relative bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden p-10 hover:border-zinc-500 transition-all duration-700">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-4 block">Stats</span>
                <h3 className="text-2xl font-bold text-white tracking-tighter">Focus Level</h3>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-emerald-500 tracking-tighter">98.2</div>
                <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Score</div>
              </div>
            </div>
            <div className="flex-1 flex items-end gap-1.5 h-32">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-emerald-500/20 border-t border-emerald-500/40 rounded-t-sm transition-all duration-1000 group-hover:bg-emerald-500/60"
                  style={{ height: `${15 + Math.random() * 85}%`, transitionDelay: `${i * 20}ms` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Mini CTA */}
          <div
            className="md:col-span-3 bg-zinc-100 rounded-3xl p-10 flex flex-col justify-between group cursor-pointer hover:bg-white transition-all duration-500"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <h3 className="text-2xl font-black text-black tracking-tighter uppercase max-w-[200px] leading-none">
              Start Tracking Now.
            </h3>
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-mono font-black text-black/40 uppercase tracking-widest">GO TO DASHBOARD</span>
              <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full text-white group-hover:scale-125 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;