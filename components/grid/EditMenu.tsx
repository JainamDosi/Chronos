import React from 'react';
import { Icons } from '../../constants';
import { SlotType, Rating, WeeklyData } from '../../types';

interface EditMenuProps {
    selectedCells: { date: string; hour: number }[];
    menuPosition: { x: number; y: number };
    data: WeeklyData;
    onUpdateCell: (type: SlotType, rating?: Rating) => void;
    onClose: () => void;
}

const EditMenu: React.FC<EditMenuProps> = ({
    selectedCells,
    menuPosition,
    data,
    onUpdateCell,
    onClose
}) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[199]"
                onClick={onClose}
            />

            {/* Menu */}
            <div
                className="absolute z-[200] p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl animate-fade-in w-full max-w-[280px] backdrop-blur-xl"
                style={{
                    top: menuPosition.y,
                    left: menuPosition.x,
                    marginTop: '10px'
                }}
            >
                {/* Header */}
                <div className="mb-6">
                    <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-[0.4em] mb-1 block">
                        {selectedCells.length > 1 ? 'EDIT MULTIPLE' : 'EDIT SLOT'}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tighter">
                        {selectedCells.length > 1
                            ? `${selectedCells.length} Cells`
                            : `${selectedCells[0].hour.toString().padStart(2, '0')}:00 HRS`}
                    </h3>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    {[
                        { type: SlotType.PRODUCTIVE, label: 'Deep', icon: <Icons.Productive /> },
                        { type: SlotType.UNPRODUCTIVE, label: 'Leak', icon: <Icons.Unproductive /> },
                        { type: SlotType.SLEEP, label: 'Rest', icon: <Icons.Sleep /> }
                    ].map(item => (
                        <button
                            key={item.type}
                            onClick={() => onUpdateCell(item.type, 3)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-white transition-all text-zinc-500 hover:text-white group"
                        >
                            <div className="transform scale-75 group-hover:scale-90 transition-transform">
                                {item.icon}
                            </div>
                            <span className="text-[7px] font-mono uppercase tracking-widest font-bold">
                                {item.label}
                            </span>
                        </button>
                    ))}
                    <button
                        onClick={() => onUpdateCell(SlotType.UNTRACKED)}
                        className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-900 hover:border-zinc-700 transition-all text-zinc-700 hover:text-zinc-400"
                    >
                        <span className="text-[7px] font-mono uppercase tracking-widest font-bold">
                            Clear
                        </span>
                    </button>
                </div>

                {/* Rating Selector */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
                        <span>Focus Level</span>
                        <span className="text-zinc-400">1 — 5</span>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(r => (
                            <button
                                key={r}
                                onClick={() => {
                                    const firstCell = selectedCells[0];
                                    const current = data[firstCell.date]?.[firstCell.hour] || { type: SlotType.PRODUCTIVE };
                                    const targetType =
                                        current.type === SlotType.UNTRACKED || current.type === SlotType.SLEEP
                                            ? SlotType.PRODUCTIVE
                                            : current.type;
                                    onUpdateCell(targetType, r as Rating);
                                }}
                                className="flex-1 h-8 bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-[10px] font-bold hover:bg-white hover:text-black transition-all rounded-md"
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditMenu;
