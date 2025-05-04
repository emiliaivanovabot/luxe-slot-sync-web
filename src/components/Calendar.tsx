
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WeekData, Day } from "@/types";
import { fetchWeekData } from "@/data/mockData";
import DayColumn from "./DayColumn";
import DaySwitcher from "./DaySwitcher";

const Calendar: React.FC = () => {
  const [weekData, setWeekData] = useState<WeekData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const isMobile = useIsMobile();

  // Function to load calendar data
  const loadCalendarData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchWeekData();
      setWeekData(data);
      
      // Set the selected day to today
      const today = new Date().toLocaleDateString('de-DE');
      const todayIndex = data.findIndex(day => day.date === today);
      setSelectedDayIndex(todayIndex !== -1 ? todayIndex : 0);
    } catch (error) {
      console.error("Failed to load calendar data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    loadCalendarData();
    
    // Setup interval to refresh data every 30 seconds
    const intervalId = setInterval(loadCalendarData, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handle day selection
  const handleSelectDay = (index: number) => {
    setSelectedDayIndex(index);
  };

  if (isLoading || weekData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-luxury-gray">Lade Kalender...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="luxury-title text-xl md:text-2xl mb-4 text-center md:text-left">Kalender</h2>
      
      {isMobile && (
        <DaySwitcher
          days={weekData}
          selectedDayIndex={selectedDayIndex}
          onSelectDay={handleSelectDay}
        />
      )}
      
      <div className="bg-white border border-luxury-beige/30 rounded-lg shadow-sm overflow-hidden">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
          {isMobile ? (
            // Mobile view - show only selected day
            <DayColumn key={weekData[selectedDayIndex].name} day={weekData[selectedDayIndex]} />
          ) : (
            // Desktop view - show all days
            weekData.map((day) => (
              <DayColumn key={day.name} day={day} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
