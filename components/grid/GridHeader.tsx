import React from 'react';

interface DayLabel {
    date: string;
    name: string;
    day: number;
}

interface GridHeaderProps {
    dayLabels: DayLabel[];
}

const GridHeader: React.FC<GridHeaderProps> = ({ dayLabels }) => {
    return (
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-zinc-600 bg-zinc-900/50">
            <div className="p-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-center border-r border-zinc-600">
                UTC
            </div>
            {dayLabels.map(label => (
                <div key={label.date} className="p-4 border-r border-zinc-600 last:border-0 flex flex-col items-center">
                    <span className="text-[9px] font-mono text-zinc-400 tracking-[0.2em] mb-1">{label.name}</span>
                    <span className="text-lg font-black text-white">{label.day}</span>
                </div>
            ))}
        </div>
    );
};

export default GridHeader;
