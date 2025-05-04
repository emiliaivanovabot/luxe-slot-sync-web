
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { currentModel, logout } = useAuth();
  
  return (
    <header className="py-4 px-4 md:px-6 bg-white border-b border-luxury-beige/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-xl md:text-2xl font-medium text-luxury-black">
            LUXE MODEL AGENTUR
          </h1>
        </div>
        
        {currentModel && (
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-4">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img 
                  src={currentModel.imageUrl} 
                  alt={currentModel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-sm">{currentModel.name}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="text-xs md:text-sm"
            >
              Abmelden
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
