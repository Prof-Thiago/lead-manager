import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getFromLocalStorage, saveInLocalStorage } from "../../utils/localStorage";
import { Lead } from "../../utils/interfaces";
import { opportunitiesBase } from "../../utils/constants";

interface LeadContextType {
    lead: Lead;
    setLead: React.Dispatch<React.SetStateAction<Lead>>;
    leads: Lead[];
    saveNewLead: (lead: Lead) => void;
    updateLead: (lead: Lead) => void;
}

interface LeadProviderProps {
    children: ReactNode;
}

export const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider = ({ children }: LeadProviderProps) => {
  const [lead, setLead] = useState<Lead>(
    getFromLocalStorage("@LeadManager:Lead") || {
        id: "",
        userId: "",
        status: "potential-client",
        name: "",
        email: "",
        phone: "",
        opportunities: opportunitiesBase
    }
  );

  const [leads, setLeads] = useState<Lead[]>(
    getFromLocalStorage("@LeadManager:Leads") || []
  )

  const saveNewLead = (lead: Lead) => {
    const updatedLeads = [...leads, lead];

    setLeads(updatedLeads)
    saveInLocalStorage("@LeadManager:Leads", updatedLeads)
  }

  const updateLead = (lead: Lead) => {
    const updatedLeads = leads.map(l => {
      if (l.id === lead.id) {
        return lead;
      }

      return l;
    })

    setLeads(updatedLeads)
    saveInLocalStorage("@LeadManager:Leads", updatedLeads)
  }

  return (
    <LeadContext.Provider
      value={{ lead, setLead, leads, saveNewLead, updateLead }}
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
