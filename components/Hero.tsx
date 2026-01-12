"use client";

import React from 'react';
import ThreeScene from './ThreeScene';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black"></div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent"></div>

      {/* Floating orbs - Emerald */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] animate-float-slow"></div>
      <div className="absolute bottom-32 right-[15%] w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px] animate-float-slower"></div>
      <div className="absolute top-1/3 right-[20%] w-48 h-48 bg-white/5 rounded-full blur-[80px] animate-float"></div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hexagons */}
        <svg className="absolute top-[15%] left-[8%] w-16 h-16 text-emerald-500/20 animate-float-rotate" viewBox="0 0 100 100">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute top-[60%] right-[12%] w-12 h-12 text-white/10 animate-float-rotate-reverse" viewBox="0 0 100 100">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-[25%] left-[15%] w-20 h-20 text-emerald-400/15 animate-float-slow" viewBox="0 0 100 100">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Circles */}
        <svg className="absolute top-[25%] right-[25%] w-24 h-24 text-white/5 animate-pulse-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-[40%] left-[20%] w-16 h-16 text-emerald-500/15 animate-pulse-slower" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Triangles */}
        <svg className="absolute top-[40%] left-[5%] w-14 h-14 text-white/8 animate-float-rotate" viewBox="0 0 100 100">
          <polygon points="50 10, 90 90, 10 90" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute top-[70%] right-[8%] w-10 h-10 text-emerald-400/20 animate-float" viewBox="0 0 100 100">
          <polygon points="50 10, 90 90, 10 90" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Squares */}
        <svg className="absolute top-[50%] right-[5%] w-12 h-12 text-white/6 animate-float-rotate-reverse" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 50 50)" />
        </svg>

        {/* Floating particles */}
        <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-emerald-400 rounded-full animate-particle-1"></div>
        <div className="absolute top-[35%] right-[35%] w-1 h-1 bg-white rounded-full animate-particle-2"></div>
        <div className="absolute bottom-[30%] left-[40%] w-1 h-1 bg-emerald-300 rounded-full animate-particle-3"></div>
        <div className="absolute top-[55%] left-[25%] w-1 h-1 bg-white/80 rounded-full animate-particle-4"></div>
        <div className="absolute bottom-[45%] right-[30%] w-1 h-1 bg-emerald-500 rounded-full animate-particle-1"></div>
      </div>

      {/* Three.js Clock */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400/80 text-[10px] font-mono uppercase tracking-[0.3em] mb-12 animate-in fade-in slide-in-from-top-4 duration-1000 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          Track your focus. Improve your results.
        </div>

        <h1 className="text-5xl md:text-[11rem] font-black mb-10 tracking-tighter leading-none text-white select-none transition-all duration-1000 group flex items-center justify-center overflow-hidden drop-shadow-2xl">
          {["C", "H", "R", "O", "N", "O", "S"].map((letter, i) => (
            <span
              key={i}
              className="animate-reveal inline-block hover:text-emerald-400 transition-colors duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {letter}
            </span>
          ))}
          <span className="text-emerald-500 animate-pulse animate-reveal emerald-glow-strong rounded-full" style={{ animationDelay: "0.4s" }}>.</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-16 font-mono leading-relaxed animate-reveal delay-300" style={{ animationDelay: "0.6s" }}>
          Control your time. Maximize your output.
          <br />
          <span className="text-emerald-400/60">Powered by AI. Built for results.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in duration-1000 delay-500">
          <a href="#features" className="group relative px-10 py-4 overflow-hidden rounded-lg border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 bg-emerald-500/5 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 group-hover:text-black transition-colors">View Features</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40 hover:opacity-100 transition-opacity group">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-widest">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 animate-bounce">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
