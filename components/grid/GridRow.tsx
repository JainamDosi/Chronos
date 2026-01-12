import React from 'react';
import GridCell from './GridCell';
import { SlotType, TimeSlot, WeeklyData } from '../../types';

interface DayLabel {
    date: string;
    name: string;
    day: number;
}

interface GridRowProps {
    hour: number;
    dayLabels: DayLabel[];
    data: WeeklyData;
    isCellSelected: (date: string, hour: number) => boolean;
    onMouseDown: (date: string, hour: number) => void;
    onMouseEnter: (date: string, hour: number) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onTouchStart: (date: string, hour: number) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
}

const GridRow: React.FC<GridRowProps> = ({
    hour,
    dayLabels,
    data,
    isCellSelected,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd
}) => {
    return (
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-white/10 last:border-0">
            <div className="p-4 text-[10px] font-mono text-zinc-500 flex items-center justify-center border-r border-white/10 bg-black/20">
                {hour.toString().padStart(2, '0')}:00
            </div>
            {dayLabels.map(label => {
                const slot = data[label.date]?.[hour] || { type: SlotType.UNTRACKED };
                const isSelected = isCellSelected(label.date, hour);

                return (
                    <GridCell
                        key={`${label.date}-${hour}`}
                        date={label.date}
                        hour={hour}
                        slot={slot}
                        isSelected={isSelected}
                        onMouseDown={onMouseDown}
                        onMouseEnter={onMouseEnter}
                        onMouseUp={onMouseUp}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    />
                );
            })}
        </div>
    );
};

export default GridRow;
