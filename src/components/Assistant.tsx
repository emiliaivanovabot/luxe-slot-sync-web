
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Assistant: React.FC = () => {
  const { currentModel } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  
  if (!isOpen || !currentModel) return null;
  
  // Get next appointment (this would normally come from real data)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDate = tomorrow.toLocaleDateString('de-DE');
  
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md px-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg border border-luxury-beige p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-luxury-black">Assistent</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-luxury-gray">
          Hallo <span className="font-medium">{currentModel.name}</span>,
          dein nächstes Shooting ist am {nextDate} um 17:00 Uhr.
        </p>
      </div>
    </div>
  );
};

export default Assistant;
