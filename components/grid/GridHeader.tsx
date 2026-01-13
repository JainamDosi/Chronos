import React from 'react';

interface DayLabel {
    date: string;
    name: string;
    day: number;
}

interface GridHeaderProps {
    dayLabels: DayLabel[];
    today: string;
}

const GridHeader: React.FC<GridHeaderProps> = ({ dayLabels, today }) => {
    return (
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-zinc-600 bg-zinc-900/50">
            <div className="p-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-center border-r border-zinc-600">
                UTC
            </div>
            {dayLabels.map(label => {
                const isToday = label.date === today;
                return (
                    <div key={label.date} className={`p-4 border-r border-zinc-600 last:border-0 flex flex-col items-center ${isToday ? 'bg-emerald-500/5' : ''}`}>
                        <span className={`text-[9px] font-mono tracking-[0.2em] mb-1 ${isToday ? 'text-emerald-500 font-bold' : 'text-zinc-400'}`}>
                            {label.name}
                            {isToday && <span className="block text-[7px] tracking-widest mt-0.5">TODAY</span>}
                        </span>
                        <span className={`text-lg font-black ${isToday ? 'text-emerald-400' : 'text-white'}`}>{label.day}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default GridHeader;
