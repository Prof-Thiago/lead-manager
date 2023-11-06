import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getFromLocalStorage } from "../../utils/localStorage";
import { Lead } from "../../utils/interfaces";
import { opportunitiesBase } from "../../utils/constants";

interface LeadContextType {
    lead: Lead;
    setLead: React.Dispatch<React.SetStateAction<Lead>>;
}

interface LeadProviderProps {
    children: ReactNode;
}

export const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider = ({ children }: LeadProviderProps) => {
  const [lead, setLead] = useState<Lead>(
    getFromLocalStorage("@LeadManager:Lead") || {
        id: "",
        status: "potential-client",
        name: "",
        email: "",
        phone: "",
        opportunities: opportunitiesBase
    }
  );

  return (
    <LeadContext.Provider
      value={{ lead, setLead }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = (): LeadContextType => {
  const context = useContext(LeadContext);
  if (!context) {
      throw new Error('useUser must be used in an UserProvider');
  }
  return context;
};
