import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getFromLocalStorage } from "../../utils/localStorage";
import { User, Lead } from "../../utils/interfaces";

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    userLeads: Lead[];
    setUserLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
    handleLogout: () => void;
    getUserLeads: () => Lead[] | null;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(
    getFromLocalStorage("@LeadManager:User") || {
        id: "",
        name: "",
        email: "",
        password: "",
        leads: []
    }
  );

  const [userLeads, setUserLeads] = useState<Lead[]>(
    getFromLocalStorage("@LeadManager:User:Leads") || []
  );

  const getUserLeads = () => {
    return getFromLocalStorage("@LeadManager:User:Leads");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser({
        id: "",
        name: "",
        email: "",
        password: "",
        leads: []
    });
    setUserLeads([]);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, userLeads, setUserLeads, handleLogout, getUserLeads }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
      throw new Error('useUser must be used in an UserProvider');
  }
  return context;
};
