
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockModels } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Model } from "@/types";

const LoginModal: React.FC = () => {
  const { login } = useAuth();
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [pin, setPin] = useState<string>("");
  const [manualLogin, setManualLogin] = useState<boolean>(false);
  const [manualName, setManualName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSelectModel = (model: Model) => {
    setSelectedModel(model);
    setError(null);
    setPin("");
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedModel) {
      setError("Bitte wähle ein Model aus.");
      return;
    }
    
    const success = login(selectedModel.id, pin);
    if (!success) {
      setError("Falsche PIN. Bitte versuche es erneut.");
    }
  };
  
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const model = mockModels.find(m => m.name.toLowerCase() === manualName.toLowerCase());
    if (!model) {
      setError("Model nicht gefunden.");
      return;
    }
    
    const success = login(model.id, pin);
    if (!success) {
      setError("Falsche PIN. Bitte versuche es erneut.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 md:p-8 animate-fade-in">
        <h2 className="luxury-title text-2xl md:text-3xl mb-6 text-center">MODEL LOGIN</h2>
        
        {!manualLogin ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-h-96 overflow-y-auto">
              {mockModels.map((model) => (
                <div 
                  key={model.id}
                  onClick={() => handleSelectModel(model)}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 p-2 rounded-lg ${
                    selectedModel?.id === model.id ? 'bg-luxury-lightgray' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-luxury-beige mb-2">
                    <img 
                      src={model.imageUrl} 
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{model.name}</span>
                </div>
              ))}
            </div>
            
            {selectedModel && (
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-luxury-black mb-1">
                    PIN für {selectedModel.name}
                  </label>
                  <Input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setError(null);
                    }}
                    placeholder="PIN eingeben"
                    className="w-full"
                    maxLength={4}
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <Button type="submit" className="w-full luxury-button">
                  Bestätigen
                </Button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setManualLogin(true)}
                className="text-luxury-black underline text-sm"
              >
                Manuell anmelden
              </button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label htmlFor="modelName" className="block text-sm font-medium text-luxury-black mb-1">
                  Modelname
                </label>
                <Input
                  id="modelName"
                  type="text"
                  value={manualName}
                  onChange={(e) => {
                    setManualName(e.target.value);
                    setError(null);
                  }}
                  placeholder="Name eingeben"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="manualPin" className="block text-sm font-medium text-luxury-black mb-1">
                  PIN
                </label>
                <Input
                  id="manualPin"
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(null);
                  }}
                  placeholder="PIN eingeben"
                  className="w-full"
                  maxLength={4}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <Button type="submit" className="w-full luxury-button">
                Anmelden
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setManualLogin(false)}
                className="text-luxury-black underline text-sm"
              >
                Zurück zur Modelauswahl
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
