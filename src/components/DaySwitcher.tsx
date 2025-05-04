
import React from "react";
import { Day } from "@/types";
import { cn } from "@/lib/utils";

interface DaySwitcherProps {
  days: Day[];
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
}

const DaySwitcher: React.FC<DaySwitcherProps> = ({ days, selectedDayIndex, onSelectDay }) => {
  // Get today's date for highlighting
  const today = new Date().toLocaleDateString('de-DE');
  
  return (
    <div className="flex items-center justify-center mb-4 overflow-x-auto py-2 scrollbar-none">
      <div className="flex space-x-1">
        {days.map((day, index) => {
          const isSelected = index === selectedDayIndex;
          const isToday = day.date === today;
          
          return (
            <button
              key={day.name}
              onClick={() => onSelectDay(index)}
              className={cn(
                "min-w-[3rem] p-2 text-center rounded-md transition-colors duration-200",
                isSelected
                  ? "bg-luxury-black text-white"
                  : "bg-white border border-luxury-black/20",
                isToday && !isSelected && "border-luxury-black"
              )}
            >
              <div className="text-xs font-medium">{day.shortName}</div>
              <div className="text-xs mt-1">
                {day.date.split(".").slice(0, 2).join(".")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaySwitcher;
