import { useState, useEffect, useCallback } from 'react';

interface DayLabel {
    date: string;
    name: string;
    day: number;
}

interface UseGridSelectionProps {
    dayLabels: DayLabel[];
    gridContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const useGridSelection = ({ dayLabels, gridContainerRef }: UseGridSelectionProps) => {
    const [selectedCells, setSelectedCells] = useState<{ date: string; hour: number }[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [dragStart, setDragStart] = useState<{ date: string; hour: number } | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    const calculateSelection = useCallback((start: { date: string; hour: number }, end: { date: string; hour: number }) => {
        const startDayIndex = dayLabels.findIndex(d => d.date === start.date);
        const endDayIndex = dayLabels.findIndex(d => d.date === end.date);
        if (startDayIndex === -1 || endDayIndex === -1) return [];

        const minDayIndex = Math.min(startDayIndex, endDayIndex);
        const maxDayIndex = Math.max(startDayIndex, endDayIndex);
        const minHour = Math.min(start.hour, end.hour);
        const maxHour = Math.max(start.hour, end.hour);

        const newSelection = [];
        for (let d = minDayIndex; d <= maxDayIndex; d++) {
            for (let h = minHour; h <= maxHour; h++) {
                newSelection.push({ date: dayLabels[d].date, hour: h });
            }
        }
        return newSelection;
    }, [dayLabels]);

    const calculateMenuPos = useCallback((clientX: number, clientY: number) => {
        if (!gridContainerRef.current) return { x: 0, y: 0 };
        const rect = gridContainerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const adjustedX = Math.min(x, gridContainerRef.current.clientWidth - 300);
        return { x: adjustedX, y };
    }, [gridContainerRef]);

    const handleMouseDown = useCallback((date: string, hour: number) => {
        setIsSelecting(true);
        setDragStart({ date, hour });
        setSelectedCells([{ date, hour }]);
        setMenuPosition(null);
    }, []);

    const handleMouseEnter = useCallback((date: string, hour: number) => {
        if (isSelecting && dragStart) {
            const newSelection = calculateSelection(dragStart, { date, hour });
            setSelectedCells(newSelection);
        }
    }, [isSelecting, dragStart, calculateSelection]);

    const handleMouseUp = useCallback((e: React.MouseEvent) => {
        if (isSelecting) {
            setIsSelecting(false);
            setDragStart(null);
            setMenuPosition(calculateMenuPos(e.clientX, e.clientY));
        }
    }, [isSelecting, calculateMenuPos]);

    const isCellSelected = useCallback((date: string, hour: number) => {
        return selectedCells.some(c => c.date === date && c.hour === hour);
    }, [selectedCells]);

    const clearSelection = useCallback(() => {
        setSelectedCells([]);
        setMenuPosition(null);
    }, []);

    // Global mouse up handler
    useEffect(() => {
        const handleGlobalMouseUp = (e: MouseEvent) => {
            if (isSelecting) {
                setIsSelecting(false);
                setDragStart(null);
                setMenuPosition(calculateMenuPos(e.clientX, e.clientY));
            }
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, [isSelecting, calculateMenuPos]);

    return {
        selectedCells,
        isSelecting,
        menuPosition,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        isCellSelected,
        clearSelection,
        setMenuPosition,
        calculateSelection,
        calculateMenuPos,
        dragStart,
        setIsSelecting,
        setDragStart,
        setSelectedCells
    };
};
