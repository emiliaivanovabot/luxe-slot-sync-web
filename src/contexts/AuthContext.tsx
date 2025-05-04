
import React, { createContext, useState, useContext, useEffect } from "react";
import { Model } from "../types";
import { mockModels } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  currentModel: Model | null;
  login: (modelId: string, pin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentModel, setCurrentModel] = useState<Model | null>(null);
  const { toast } = useToast();

  // Check for existing session on component mount
  useEffect(() => {
    const savedModel = localStorage.getItem("currentModel");
    if (savedModel) {
      try {
        const model = JSON.parse(savedModel);
        setCurrentModel(model);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse saved model:", error);
        localStorage.removeItem("currentModel");
      }
    }
  }, []);

  const login = (modelId: string, pin: string): boolean => {
    const model = mockModels.find(m => m.id === modelId);
    
    if (model && model.pin === pin) {
      setCurrentModel(model);
      setIsAuthenticated(true);
      localStorage.setItem("currentModel", JSON.stringify(model));
      toast({
        title: "Anmeldung erfolgreich",
        description: `Willkommen zurück, ${model.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: "Falsche PIN. Bitte versuche es erneut.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setCurrentModel(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentModel");
    toast({
      title: "Abmeldung erfolgreich",
      description: "Du wurdest erfolgreich abgemeldet.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentModel, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
