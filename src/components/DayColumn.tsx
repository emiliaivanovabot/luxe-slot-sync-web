
import React from "react";
import { Day, Slot } from "@/types";
import { cn } from "@/lib/utils";

interface DayColumnProps {
  day: Day;
}

interface SlotGroup {
  status: string;
  slots: Slot[];
  startTime: string;
  endTime: string;
}

const DayColumn: React.FC<DayColumnProps> = ({ day }) => {
  // Get today's date for highlighting
  const today = new Date().toLocaleDateString('de-DE');
  const isToday = day.date === today;
  
  // Group consecutive slots of the same type into blocks
  const groupConsecutiveSlots = (slots: Slot[]): SlotGroup[] => {
    const sortedSlots = [...slots].sort((a, b) => {
      const timeA = parseInt(a.time.split(":")[0]);
      const timeB = parseInt(b.time.split(":")[0]);
      return timeA - timeB;
    });
    
    const groups: SlotGroup[] = [];
    let currentGroup: SlotGroup | null = null;
    
    sortedSlots.forEach(slot => {
      if (!currentGroup || currentGroup.status !== slot.status) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          status: slot.status,
          slots: [slot],
          startTime: slot.time,
          endTime: slot.time
        };
      } else {
        currentGroup.slots.push(slot);
        currentGroup.endTime = slot.time;
      }
    });
    
    if (currentGroup) {
      groups.push(currentGroup);
    }
    
    return groups;
  };

  const slotGroups = groupConsecutiveSlots(day.slots);
  
  const renderSlotGroup = (group: SlotGroup) => {
    // Format time range (e.g., "8:00 - 15:00")
    const timeDisplay = group.slots.length > 1 
      ? `${group.startTime} - ${group.endTime}`
      : group.startTime;
    
    let slotClass = "";
    
    // Determine slot styling based on status
    switch (group.status) {
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
        key={`${group.status}-${group.startTime}`}
        className={cn(
          "p-4 my-1 rounded-md border-l-4 shadow-sm transition-all",
          slotClass,
          group.status === "wild" && "border-l-slot-wild",
          group.status === "blocker" && "border-l-slot-blocker",
          group.status === "gebucht" && "border-l-slot-model",
          group.status === "frei" && "border-l-slot-free"
        )}
      >
        <div className="flex flex-col">
          <span className="font-medium text-sm text-gray-700">{timeDisplay}</span>
          
          {/* For model slots, list all models in this block */}
          {group.status === "gebucht" && group.slots.map(slot => 
            slot.model && (
              <span key={slot.id} className="font-semibold text-base mt-1 text-luxury-black">
                {slot.time} {slot.model}
              </span>
            )
          )}
          
          {/* Add descriptive text based on slot type */}
          {group.status === "wild" && (
            <span className="text-xs mt-1 italic text-gray-500">Wild Time</span>
          )}
          {group.status === "blocker" && (
            <span className="text-xs mt-1 italic text-gray-500">Keine Posts</span>
          )}
          {group.status === "frei" && (
            <span className="text-xs mt-1 italic text-gray-500">Frei</span>
          )}
        </div>
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
      
      {/* Slot groups */}
      <div className="p-2">
        {slotGroups.map(group => renderSlotGroup(group))}
      </div>
    </div>
  );
};

export default DayColumn;
