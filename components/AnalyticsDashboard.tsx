"use client";

import React, { useMemo } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { WeeklyData, SlotType, TimeSlot } from '../types';

interface AnalyticsDashboardProps {
  data: WeeklyData;
  currentWeekDates: string[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data, currentWeekDates }) => {
  const chartData = useMemo(() => {
    return currentWeekDates.map(date => {
      const dayData = data[date] || {};
      const hours = Object.values(dayData) as TimeSlot[];
      const productive = hours.filter(h => h.type === SlotType.PRODUCTIVE).length;
      const unproductive = hours.filter(h => h.type === SlotType.UNPRODUCTIVE).length;

      const d = new Date(date);
      return {
        name: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        date: date,
        productive,
        unproductive
      };
    });
  }, [data, currentWeekDates]);

  const stats = useMemo(() => {
    const prod = chartData.reduce((acc, d) => acc + d.productive, 0);
    const waste = chartData.reduce((acc, d) => acc + d.unproductive, 0);
    const health = prod === 0 && waste === 0 ? 0 : (prod / (prod + waste)) * 100;
    return { prod, waste, health };
  }, [chartData]);

  return (
    <div id="telemetry" className="py-40 px-4 bg-zinc-1000">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.5em] mb-4 block">Focus Data</span>
          <h2 className="text-4xl font-bold text-white tracking-tighter">Weekly Stats</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 rounded-lg overflow-hidden">
          <div className="lg:col-span-3 bg-zinc-1000 p-12 h-[500px]">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-widest">Focus Chart</h3>
              <div className="flex gap-8">
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Focus
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Distractions
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="waveform" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
                <XAxis dataKey="name" stroke="#333" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                <YAxis stroke="#333" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '4px', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                  cursor={{ stroke: '#333' }}
                />
                <Area type="stepAfter" dataKey="productive" stroke="#10b981" fill="url(#waveform)" strokeWidth={2} />
                <Area type="stepAfter" dataKey="unproductive" stroke="#f43f5e" fill="transparent" strokeWidth={1} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-950 p-12 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest mb-4 block">Total</span>
              <div className="text-5xl font-black text-white tracking-tighter mb-2">
                {stats.prod}<span className="text-zinc-800 text-2xl">H</span>
              </div>
              <p className="text-zinc-600 text-xs font-mono uppercase">Productive Hours</p>
            </div>

            <div className="pt-12 border-t border-zinc-900">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest mb-4 block">Health Score</span>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-1000"
                  style={{ width: `${stats.health}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
