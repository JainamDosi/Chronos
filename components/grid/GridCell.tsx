import React from 'react';
import { SLOT_COLORS } from '../../constants';
import { SlotType, TimeSlot } from '../../types';

interface GridCellProps {
    date: string;
    hour: number;
    slot: TimeSlot;
    isSelected: boolean;
    onMouseDown: (date: string, hour: number) => void;
    onMouseEnter: (date: string, hour: number) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onTouchStart: (date: string, hour: number) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
}

const GridCell: React.FC<GridCellProps> = ({
    date,
    hour,
    slot,
    isSelected,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd
}) => {
    const bgColor = slot.type === SlotType.PRODUCTIVE || slot.type === SlotType.UNPRODUCTIVE
        ? SLOT_COLORS[slot.type][slot.rating || 1]
        : SLOT_COLORS[slot.type][0];

    return (
        <div
            data-date={date}
            data-hour={hour}
            onMouseDown={() => onMouseDown(date, hour)}
            onMouseEnter={() => onMouseEnter(date, hour)}
            onMouseUp={onMouseUp}
            onTouchStart={() => onTouchStart(date, hour)}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={`p-1 border-r border-white/10 last:border-0 cursor-crosshair group relative transition-all duration-75 ${isSelected ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
        >
            <div
                className={`pointer-events-none h-11 w-full flex items-center justify-center rounded-sm transition-all duration-500 ${bgColor} ${slot.type === SlotType.UNTRACKED
                        ? 'opacity-[0.03]'
                        : 'opacity-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                    }`}
            >
                {slot.rating && slot.type !== SlotType.SLEEP && (
                    <span className="text-[9px] font-mono font-black text-white/40 group-hover:text-white transition-colors">
                        {slot.rating}
                    </span>
                )}
            </div>
        </div>
    );
};

export default GridCell;
