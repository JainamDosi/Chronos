# ChronosGrid Component Architecture

## Overview
The ChronosGrid has been refactored into smaller, maintainable components following React best practices.

## Structure

```
components/
├── ChronosGrid.tsx          # Main orchestrator component
└── grid/
    ├── index.ts             # Barrel export
    ├── GridHeader.tsx       # Week day labels header
    ├── GridCell.tsx         # Individual time slot cell
    ├── GridRow.tsx          # Hour row with cells
    ├── EditMenu.tsx         # Floating edit menu
    └── DrawModeToggle.tsx   # Mobile draw mode button

hooks/
├── index.ts                 # Barrel export
├── useGridSelection.ts      # Mouse selection logic
└── useTouchSelection.ts     # Touch/mobile selection logic
```

## Components

### ChronosGrid.tsx (Main)
- **Purpose**: Orchestrates all grid functionality
- **Responsibilities**:
  - Manages draw mode state
  - Calculates day labels
  - Delegates to child components
  - Handles cell updates
- **Size**: ~130 lines (down from 295)

### GridHeader.tsx
- **Purpose**: Displays week day labels
- **Props**: `dayLabels`
- **Size**: ~30 lines

### GridCell.tsx
- **Purpose**: Renders individual time slot
- **Props**: `date`, `hour`, `slot`, `isSelected`, event handlers
- **Features**:
  - Color coding based on slot type
  - Rating display
  - Hover effects
- **Size**: ~70 lines

### GridRow.tsx
- **Purpose**: Renders hour label + 7 cells
- **Props**: `hour`, `dayLabels`, `data`, event handlers
- **Size**: ~65 lines

### EditMenu.tsx
- **Purpose**: Floating menu for editing slots
- **Props**: `selectedCells`, `menuPosition`, `data`, `onUpdateCell`, `onClose`
- **Features**:
  - Quick action buttons (Deep, Leak, Rest, Clear)
  - Rating selector (1-5)
  - Backdrop overlay
- **Size**: ~120 lines

### DrawModeToggle.tsx
- **Purpose**: Mobile-only draw mode toggle
- **Props**: `isDrawMode`, `onToggle`
- **Size**: ~60 lines

## Hooks

### useGridSelection
- **Purpose**: Manages mouse-based selection
- **Returns**:
  - `selectedCells`, `isSelecting`, `menuPosition`
  - `handleMouseDown`, `handleMouseEnter`, `handleMouseUp`
  - `isCellSelected`, `clearSelection`
- **Features**:
  - Multi-cell drag selection
  - Menu positioning
  - Global mouse up handler
- **Size**: ~110 lines

### useTouchSelection
- **Purpose**: Manages touch-based selection for mobile
- **Returns**: `handleTouchStart`, `handleTouchMove`, `handleTouchEnd`
- **Features**:
  - Touch drag selection
  - Draw mode integration
- **Size**: ~60 lines

## Benefits

### ✅ Maintainability
- Each component has a single responsibility
- Easy to locate and fix bugs
- Clear separation of concerns

### ✅ Reusability
- Components can be reused independently
- Hooks can be shared across components

### ✅ Testability
- Smaller components are easier to test
- Hooks can be tested in isolation

### ✅ Readability
- Main component is now ~130 lines vs 295
- Clear component hierarchy
- Self-documenting structure

### ✅ Performance
- No performance impact
- Same memoization strategies
- Efficient re-renders

## Usage Example

```tsx
import ChronosGrid from '@/components/ChronosGrid';

<ChronosGrid 
  data={weeklyData}
  currentWeekDates={dates}
  onChange={handleSlotChange}
/>
```

## Future Improvements

1. **Add unit tests** for each component and hook
2. **Extract constants** to separate config file
3. **Add keyboard navigation** for accessibility
4. **Implement undo/redo** functionality
5. **Add export/import** features
