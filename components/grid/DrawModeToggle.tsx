import React from 'react';

interface DrawModeToggleProps {
    isDrawMode: boolean;
    onToggle: () => void;
}

const DrawModeToggle: React.FC<DrawModeToggleProps> = ({ isDrawMode, onToggle }) => {
    return (
        <div className="md:hidden flex justify-end mb-4">
            <button
                onClick={onToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border transition-all ${isDrawMode
                        ? 'bg-emerald-500 text-black border-emerald-500'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
            >
                {isDrawMode ? (
                    <>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                        <span>Scroll Locked</span>
                    </>
                ) : (
                    <>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                        </svg>
                        <span>Enable Draw</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default DrawModeToggle;
