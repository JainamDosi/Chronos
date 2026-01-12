import { useCallback } from 'react';

interface UseTouchSelectionProps {
    isDrawMode: boolean;
    isSelecting: boolean;
    dragStart: { date: string; hour: number } | null;
    setIsSelecting: (value: boolean) => void;
    setDragStart: (value: { date: string; hour: number } | null) => void;
    setSelectedCells: (value: { date: string; hour: number }[]) => void;
    setMenuPosition: (value: { x: number; y: number } | null) => void;
    calculateSelection: (start: { date: string; hour: number }, end: { date: string; hour: number }) => { date: string; hour: number }[];
    calculateMenuPos: (clientX: number, clientY: number) => { x: number; y: number };
}

export const useTouchSelection = ({
    isDrawMode,
    isSelecting,
    dragStart,
    setIsSelecting,
    setDragStart,
    setSelectedCells,
    setMenuPosition,
    calculateSelection,
    calculateMenuPos
}: UseTouchSelectionProps) => {
    const handleTouchStart = useCallback((date: string, hour: number) => {
        if (!isDrawMode) return;
        setIsSelecting(true);
        setDragStart({ date, hour });
        setSelectedCells([{ date, hour }]);
        setMenuPosition(null);
    }, [isDrawMode, setIsSelecting, setDragStart, setSelectedCells, setMenuPosition]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isSelecting || !dragStart || !isDrawMode) return;
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target) {
            const date = target.getAttribute('data-date') || target.closest('[data-date]')?.getAttribute('data-date');
            const hourStr = target.getAttribute('data-hour') || target.closest('[data-hour]')?.getAttribute('data-hour');
            if (date && hourStr) {
                const hour = parseInt(hourStr, 10);
                const newSelection = calculateSelection(dragStart, { date, hour });
                setSelectedCells(newSelection);
            }
        }
    }, [isSelecting, dragStart, isDrawMode, calculateSelection, setSelectedCells]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (isSelecting) {
            setIsSelecting(false);
            setDragStart(null);
            const touch = e.changedTouches[0];
            setMenuPosition(calculateMenuPos(touch.clientX, touch.clientY));
        }
    }, [isSelecting, setIsSelecting, setDragStart, setMenuPosition, calculateMenuPos]);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
};
