
import React from "react";

const RulesFooter: React.FC = () => {
  return (
    <div className="bg-luxury-lightgray/50 py-6 px-4 mt-8 rounded-lg">
      <h3 className="font-serif text-lg font-medium mb-4 text-center md:text-left">
        WICHTIG FÜR NEUE MODELS:
      </h3>
      
      <div className="space-y-3 text-sm md:text-base">
        <p>
          <span className="font-medium">Wild Time:</span> Poste zwischen 8:00 - 15:00 Uhr (Mo-Fr) und 10:00 - 14:00 Uhr (Sa-So).
        </p>
        <p>
          <span className="font-medium">Blocker Time:</span> KEINE Posts um 16:00, 18:00 & 21:00 Uhr (Mo-Fr) und 15:00, 17:00 & 20:00 Uhr (Sa-So).
        </p>
        <p>
          <span className="font-medium">Posting Time:</span> Dein Termin ist um 17:00 & 20:00 Uhr (Mo-Fr) und 16:00, 19:00 & 22:00 Uhr (Sa-So).
        </p>
      </div>
    </div>
  );
};

export default RulesFooter;
