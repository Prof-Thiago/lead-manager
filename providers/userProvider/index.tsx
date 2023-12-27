import { createContext, useContext, useState, ReactNode } from "react";
import { getFromLocalStorage, saveInLocalStorage } from "../../utils/localStorage";
import { User } from "../../utils/interfaces";

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    createUser: (user: User) => string | undefined;
    login: ({}: any) => string | undefined;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [ users, setUsers ] = useState<User[]>(
    getFromLocalStorage("@LeadManager:Users") || []
  )

  const [user, setUser] = useState<User>(
    getFromLocalStorage("@LeadManager:User") || {
        id: "",
        name: "",
        email: "",
        password: ""
    }
  );

  const createUser = (newUser: User) => {
    const userAlreadyExists = users.some(user => {
      return user.email === newUser.email;
    });

    if (userAlreadyExists) {
      return 'Error';
    }
    
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    saveInLocalStorage("@LeadManager:Users", updatedUsers);

    setUser(newUser);
    saveInLocalStorage("@LeadManager:User", newUser);

    return 'Success';
  }

  const login = ({ email, password }: any) => {
    if (!users.length) {
      return 'Error';
    }

    const loggedUser = users.find(u => {
      return u.email === email && u.password === password;
    });

    if (loggedUser) {
      setUser(loggedUser);
      saveInLocalStorage("@LeadManager:User", loggedUser);   

      return 'Success';
    }
    
    return 'Error';
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, createUser, login }}
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
