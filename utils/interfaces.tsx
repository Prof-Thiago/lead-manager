export interface Opportunity {
    name: string;
    status: boolean;
}

export type LeadStatus = "potential-client" | "confirmed-data" | "lead-review";
  
export interface Lead {
    id: string;
    userId: string;
    status: LeadStatus;
    name: string;
    email: string;
    phone: string;
    opportunities?: Opportunity[];
}
  
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}