"use client";

import React, { useState, useMemo, useRef } from 'react';
import { HOURS } from '../constants';
import { SlotType, Rating, WeeklyData, TimeSlot } from '../types';
import { useGridSelection } from '../hooks/useGridSelection';
import { useTouchSelection } from '../hooks/useTouchSelection';
import GridHeader from './grid/GridHeader';
import GridRow from './grid/GridRow';
import EditMenu from './grid/EditMenu';
import DrawModeToggle from './grid/DrawModeToggle';

interface ChronosGridProps {
  data: WeeklyData;
  currentWeekDates: string[];
  onChange: (date: string, hour: number, slot: TimeSlot) => void;
}

const ChronosGrid: React.FC<ChronosGridProps> = ({ data, currentWeekDates, onChange }) => {
  const [isDrawMode, setIsDrawMode] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Calculate day labels
  const dayLabels = useMemo(() => {
    return currentWeekDates.map(dateStr => {
      const d = new Date(dateStr + 'T00:00:00');
      return {
        date: dateStr,
        name: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        day: d.getDate()
      };
    });
  }, [currentWeekDates]);

  // Grid selection hook
  const {
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
  } = useGridSelection({ dayLabels, gridContainerRef });

  // Touch selection hook
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSelection({
    isDrawMode,
    isSelecting,
    dragStart,
    setIsSelecting,
    setDragStart,
    setSelectedCells,
    setMenuPosition,
    calculateSelection,
    calculateMenuPos
  });

  // Update cells with new type/rating
  const updateCell = (type: SlotType, rating?: Rating) => {
    if (selectedCells.length > 0) {
      selectedCells.forEach(cell => {
        onChange(cell.date, cell.hour, { type, rating });
      });
      clearSelection();
    }
  };

  return (
    <div id="grid" ref={gridContainerRef} className="max-w-7xl mx-auto px-6 mb-32 select-none relative">
      {/* Mobile Draw Mode Toggle */}
      <DrawModeToggle isDrawMode={isDrawMode} onToggle={() => setIsDrawMode(!isDrawMode)} />

      {/* Grid Container */}
      <div className="border border-zinc-800 bg-zinc-950/40 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className={`overflow-x-auto no-scrollbar ${isDrawMode ? 'touch-none' : 'touch-pan-x'}`}>
          <div className="min-w-[1100px]">
            {/* Header */}
            <GridHeader dayLabels={dayLabels} />

            {/* Rows */}
            {HOURS.map(hour => (
              <GridRow
                key={hour}
                hour={hour}
                dayLabels={dayLabels}
                data={data}
                isCellSelected={isCellSelected}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Edit Menu */}
      {selectedCells.length > 0 && !isSelecting && menuPosition && (
        <EditMenu
          selectedCells={selectedCells}
          menuPosition={menuPosition}
          data={data}
          onUpdateCell={updateCell}
          onClose={clearSelection}
        />
      )}
    </div>
  );
};

export default ChronosGrid;