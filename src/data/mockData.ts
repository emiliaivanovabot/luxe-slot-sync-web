
import { Model, WeekData } from "../types";

// Mock models data
export const mockModels: Model[] = [
  { id: "1", name: "Anna", imageUrl: "https://randomuser.me/api/portraits/women/1.jpg", pin: "0000" },
  { id: "2", name: "Bella", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg", pin: "0000" },
  { id: "3", name: "Clara", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg", pin: "0000" },
  { id: "4", name: "Diana", imageUrl: "https://randomuser.me/api/portraits/women/4.jpg", pin: "0000" },
  { id: "5", name: "Emma", imageUrl: "https://randomuser.me/api/portraits/women/5.jpg", pin: "0000" },
  { id: "6", name: "Fiona", imageUrl: "https://randomuser.me/api/portraits/women/6.jpg", pin: "0000" },
  { id: "7", name: "Gina", imageUrl: "https://randomuser.me/api/portraits/women/7.jpg", pin: "0000" },
  { id: "8", name: "Hannah", imageUrl: "https://randomuser.me/api/portraits/women/8.jpg", pin: "0000" },
  { id: "9", name: "Iris", imageUrl: "https://randomuser.me/api/portraits/women/9.jpg", pin: "0000" },
  { id: "10", name: "Julia", imageUrl: "https://randomuser.me/api/portraits/women/10.jpg", pin: "0000" },
];

// Generate the current week dates
const generateWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const diff = currentDay === 0 ? 6 : currentDay - 1; // Adjust for starting on Monday
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  
  const weekDays = [];
  const dayNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  const shortDayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDays.push({
      name: dayNames[i],
      shortName: shortDayNames[i],
      date: date.toLocaleDateString('de-DE'),
    });
  }
  
  return weekDays;
};

// Generate mock slots for each day
const generateMockWeekData = (): WeekData => {
  const weekDays = generateWeekDates();
  
  return weekDays.map(day => {
    const isWeekend = day.name === "Samstag" || day.name === "Sonntag";
    const slots = [];
    
    // Generate slots for each hour
    for (let hour = 8; hour <= 24; hour++) {
      const time = `${hour}:00`;
      
      // Logic for slot status based on requirements
      let status: 'gebucht' | 'frei' | 'blocker' | 'wild' = 'wild';
      let model: string | null = null;
      
      // Weekend rules
      if (isWeekend) {
        if (hour < 10 || hour > 14) {
          status = hour === 16 || hour === 19 || hour === 22 ? 'gebucht' : 
                  hour === 15 || hour === 17 || hour === 20 ? 'blocker' : 'wild';
          
          if (status === 'gebucht') {
            // Randomly assign a model or leave some slots free
            const randomIndex = Math.floor(Math.random() * mockModels.length);
            model = Math.random() > 0.3 ? mockModels[randomIndex].name : null;
            status = model ? 'gebucht' : 'frei';
          }
        }
      }
      // Weekday rules
      else {
        if (hour >= 8 && hour <= 15) {
          status = 'wild';
        } else if (hour === 16 || hour === 18 || hour === 21) {
          status = 'blocker';
        } else if (hour === 17 || hour === 20) {
          // Randomly assign a model or leave some slots free
          const randomIndex = Math.floor(Math.random() * mockModels.length);
          model = Math.random() > 0.3 ? mockModels[randomIndex].name : null;
          status = model ? 'gebucht' : 'frei';
        }
      }
      
      slots.push({
        id: `${day.name}-${time}`,
        day: day.name,
        time,
        status,
        model
      });
    }
    
    return {
      ...day,
      slots
    };
  });
};

// Generate initial mock data
export const getMockWeekData = (): WeekData => {
  return generateMockWeekData();
};

// Mock API call to fetch data
export const fetchWeekData = (): Promise<WeekData> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(generateMockWeekData());
    }, 500);
  });
};
