import { UserProvider } from "./userProvider";
import { LeadProvider } from "./leadProvider";
import { ReactNode } from "react"

interface ProvidersProps {
    children: ReactNode;
}

const providers = ({ children }: ProvidersProps) => {
  return (
        <UserProvider>
          <LeadProvider >
            { children }            
          </LeadProvider>
        </UserProvider>
  );
};

export default providers;
