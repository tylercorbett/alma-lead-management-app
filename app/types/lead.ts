export type LeadStatus = "PENDING" | "REACHED_OUT";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  linkedinUrl: string;
  visaCategory: string;
  message: string;
  status: LeadStatus;
  submittedAt: string;
}
