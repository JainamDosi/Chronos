"use client";

import React, { useMemo } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { WeeklyData, SlotType, TimeSlot } from '../types';
import { HOURS } from '../constants';

interface AnalyticsDashboardProps {
  data: WeeklyData;
  currentWeekDates: string[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data, currentWeekDates }) => {
  // 1. Daily Volume Data (Productive vs Unproductive)
  const volumeData = useMemo(() => {
    return currentWeekDates.map(date => {
      const dayData = data[date] || {};
      const hours = Object.values(dayData) as TimeSlot[];
      return {
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        productive: hours.filter(h => h.type === SlotType.PRODUCTIVE).length,
        unproductive: hours.filter(h => h.type === SlotType.UNPRODUCTIVE).length,
      };
    });
  }, [data, currentWeekDates]);

  // 2. Hourly Distribution (Peak Focus Hours) - Aggregated across all days in view
  const hourlyData = useMemo(() => {
    return HOURS.map(hour => {
      let prodCount = 0;
      currentWeekDates.forEach(date => {
        if (data[date]?.[hour]?.type === SlotType.PRODUCTIVE) prodCount++;
      });
      return {
        hour: `${hour}:00`,
        value: prodCount
      };
    });
  }, [data, currentWeekDates]);

  // 3. Focus Quality Trend (Average Rating per day)
  const qualityData = useMemo(() => {
    return currentWeekDates.map(date => {
      const dayData = data[date] || {};
      const productiveLogs = Object.values(dayData).filter(h => h.type === SlotType.PRODUCTIVE && h.rating);
      const avgRating = productiveLogs.length > 0
        ? productiveLogs.reduce((acc, h) => acc + (h.rating || 0), 0) / productiveLogs.length
        : 0;

      return {
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        quality: Number(avgRating.toFixed(1))
      };
    });
  }, [data, currentWeekDates]);

  // 4. Overall Composition (Sleep vs Focused vs Idle)
  const compositionData = useMemo(() => {
    let focus = 0, waste = 0, sleep = 0;
    currentWeekDates.forEach(date => {
      Object.values(data[date] || {}).forEach(h => {
        if (h.type === SlotType.PRODUCTIVE) focus++;
        else if (h.type === SlotType.UNPRODUCTIVE) waste++;
        else if (h.type === SlotType.SLEEP) sleep++;
      });
    });
    return [
      { name: 'Focused', value: focus, color: '#10b981' },
      { name: 'Sleep', value: sleep, color: '#6366f1' },
      { name: 'Idle', value: waste, color: '#f43f5e' }
    ].filter(d => d.value > 0);
  }, [data, currentWeekDates]);

  const stats = useMemo(() => {
    const totalFocus = volumeData.reduce((acc, d) => acc + d.productive, 0);
    const totalWaste = volumeData.reduce((acc, d) => acc + d.unproductive, 0);
    const health = (totalFocus + totalWaste) === 0 ? 0 : (totalFocus / (totalFocus + totalWaste)) * 100;
    const avgQuality = qualityData.length > 0 ? qualityData.reduce((acc, d) => acc + d.quality, 0) / qualityData.length : 0;
    return { totalFocus, totalWaste, health, avgQuality };
  }, [volumeData, qualityData]);

  return (
    <div id="telemetry" className="py-24 md:py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.5em] mb-4 block">Activity Stats</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Weekly<br /><span className="text-zinc-800 not-italic">Review</span></h2>
        </div>

        {/* Global Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 block">Focus Score</span>
            <div className="text-5xl font-black text-emerald-400 tracking-tighter">{Math.round(stats.health)}%</div>
            <p className="text-[10px] font-mono text-zinc-600 mt-4 uppercase italic">Efficiency Ratio</p>
          </div>
          <div className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 block">Peak Focus</span>
            <div className="text-5xl font-black text-white tracking-tighter">
              {Math.max(...volumeData.map(d => d.productive))}<span className="text-emerald-900 text-xl ml-2 font-mono">HRS</span>
            </div>
            <p className="text-[10px] font-mono text-zinc-600 mt-4 uppercase italic">Best Day</p>
          </div>
          <div className="bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 block">Average Rating</span>
            <div className="text-5xl font-black text-emerald-500 tracking-tighter">
              {stats.avgQuality.toFixed(1)}
            </div>
            <p className="text-[10px] font-mono text-zinc-600 mt-4 uppercase italic">Focus Quality</p>
          </div>
        </div>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* 1. Daily Work Volume */}
          <div className="lg:col-span-8 bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl h-[450px]">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-10 border-l-2 border-emerald-500 pl-4">Focus Hours</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#888" fontSize={10} fontFamily="JetBrains Mono" axisLine={false} tickLine={false} />
                <YAxis stroke="#888" fontSize={10} fontFamily="JetBrains Mono" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="productive" stroke="#10b981" fill="url(#pGrad)" strokeWidth={3} />
                <Area type="monotone" dataKey="unproductive" stroke="#f43f5e" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 2. Composition */}
          <div className="lg:col-span-4 bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl h-[450px]">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-10 border-l-2 border-indigo-500 pl-4">Activity Mix</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={compositionData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {compositionData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {compositionData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter">{d.name}: {d.value}H</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Circadian Rhythm (Peak Hours) */}
          <div className="lg:col-span-12 bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl h-[400px]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-l-2 border-white pl-4">Most Active Hours</h3>
            </div>
            <ResponsiveContainer width="100%" height="75%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="hour" stroke="#888" fontSize={8} fontFamily="JetBrains Mono" axisLine={false} tickLine={false} />
                <YAxis stroke="#888" fontSize={10} fontFamily="JetBrains Mono" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-6">Productive intervals throughout the day</p>
          </div>

          {/* 4. Focus Quality Index */}
          <div className="lg:col-span-12 bg-zinc-950/50 border border-zinc-900 p-8 rounded-2xl h-[400px]">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-10 border-l-2 border-emerald-300 pl-4">Daily Focus Quality</h3>
            <ResponsiveContainer width="100%" height="75%">
              <BarChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#888" fontSize={10} fontFamily="JetBrains Mono" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} stroke="#888" fontSize={10} fontFamily="JetBrains Mono" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px' }} />
                <Bar dataKey="quality" fill="#34d399" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-6">Average rating per day</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
