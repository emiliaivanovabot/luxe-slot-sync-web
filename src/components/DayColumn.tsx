
import React from "react";
import { Day, Slot } from "@/types";
import { cn } from "@/lib/utils";

interface DayColumnProps {
  day: Day;
}

const DayColumn: React.FC<DayColumnProps> = ({ day }) => {
  // Get today's date for highlighting
  const today = new Date().toLocaleDateString('de-DE');
  const isToday = day.date === today;
  
  // Group slots by type for easier rendering
  const groupedSlots = day.slots.reduce((acc: Record<string, Slot[]>, slot) => {
    if (!acc[slot.status]) {
      acc[slot.status] = [];
    }
    acc[slot.status].push(slot);
    return acc;
  }, {});

  const renderSlot = (slot: Slot) => {
    const hourNumber = parseInt(slot.time.split(":")[0]);
    let slotClass = "";
    
    // Determine slot styling based on status
    switch (slot.status) {
      case "wild":
        slotClass = "slot-wild";
        break;
      case "blocker":
        slotClass = "slot-blocker";
        break;
      case "gebucht":
        slotClass = "slot-model";
        break;
      case "frei":
        slotClass = "slot-free";
        break;
    }
    
    return (
      <div 
        key={slot.id}
        className={cn(
          "px-2 py-3 text-sm flex flex-col",
          slotClass
        )}
      >
        <span className="font-medium">{slot.time}</span>
        {slot.model && (
          <span className="font-bold mt-1">{slot.model}</span>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "flex-1 min-w-[160px]",
      isToday && "bg-luxury-lightgray/30"
    )}>
      {/* Day header */}
      <div className={cn(
        "px-4 py-3 border-b text-center",
        isToday ? "bg-luxury-black text-white" : "bg-luxury-lightgray"
      )}>
        <div className="font-medium">{day.name}</div>
        <div className="text-sm opacity-80">{day.date}</div>
      </div>
      
      {/* Slots */}
      <div className="divide-y divide-gray-200">
        {day.slots.map(slot => renderSlot(slot))}
      </div>
    </div>
  );
};

export default DayColumn;
