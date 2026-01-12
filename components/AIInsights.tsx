"use client";

import React, { useState, useMemo } from 'react';
import { getAIInsights } from '../services/geminiService';
import { WeeklyData, AIInsight } from '../types';
import { Icons } from '../constants';

interface AIInsightsProps {
  data: WeeklyData;
  currentWeekDates: string[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ data, currentWeekDates }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter data to only send current week to AI
  const weekData = useMemo(() => {
    const filtered: WeeklyData = {};
    currentWeekDates.forEach(date => {
      if (data[date]) filtered[date] = data[date];
    });
    return filtered;
  }, [data, currentWeekDates]);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAIInsights(weekData);
      setInsight(result);
    } catch (err) {
      setError("Audit sequence failed. check connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="audit" className="py-32 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <Icons.Bot />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">AI Analysis</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">AI Assistant</p>
          </div>
        </div>

        <div className="rounded-2xl p-8 border border-zinc-900 bg-[#0c0c0e]">
          {!insight && !loading && (
            <div className="text-center py-16">
              <p className="text-zinc-500 text-sm mb-8 max-w-sm mx-auto">
                Get AI feedback on your productivity this week.
              </p>
              <button
                onClick={fetchInsights}
                className="px-8 py-3 bg-zinc-100 text-zinc-950 font-bold rounded-lg hover:bg-white transition-all text-xs uppercase tracking-widest"
              >
                Get AI Insights
              </button>
            </div>
          )}

          {loading && (
            <div className="py-20 flex flex-col items-center gap-6">
              <div className="w-12 h-0.5 bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-emerald-500 animate-[move_1s_infinite_linear]"></div>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Analyzing your week...</p>
              <style>{`
                @keyframes move {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(300%); }
                }
              `}</style>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg text-center">
              <p className="text-rose-400 text-xs font-mono">{error}</p>
              <button onClick={fetchInsights} className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-white transition-colors">Retry</button>
            </div>
          )}

          {insight && !loading && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-shrink-0">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">Focus Score</div>
                  <div className="text-6xl font-black text-zinc-100 font-mono tracking-tighter">
                    {insight.score}<span className="text-zinc-700">/100</span>
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">Feedback</div>
                  <p className="text-zinc-400 leading-relaxed font-medium">
                    {insight.critique}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insight.recommendations.map((rec, i) => (
                  <div key={i} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50">
                    <div className="text-[10px] font-mono text-zinc-600 mb-4">REF. CH-00{i + 1}</div>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      {rec}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">Report ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                <button
                  onClick={() => setInsight(null)}
                  className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
