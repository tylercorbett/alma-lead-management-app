"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Lead, LeadStatus } from "../types/lead";

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  updateLeadStatus: (leadId: string, status: LeadStatus) => Promise<void>;
  fetchLeads: () => Promise<void>;
}

const defaultLeads: Lead[] = [
  {
    id: "1",
    firstName: "Jorge",
    lastName: "Ruiz",
    email: "jorge@example.com",
    country: "Mexico",
    linkedinUrl: "https://linkedin.com/in/jorge",
    visaCategory: "O-1",
    message: "Interested in O-1 visa",
    status: "PENDING",
    submittedAt: "2024-02-02T14:45:00Z",
  },
  {
    id: "2",
    firstName: "Bahar",
    lastName: "Zamir",
    email: "bahar@example.com",
    country: "Mexico",
    linkedinUrl: "https://linkedin.com/in/bahar",
    visaCategory: "EB-1A",
    message: "Looking for permanent residency options",
    status: "PENDING",
    submittedAt: "2024-02-02T14:45:00Z",
  },
  {
    id: "3",
    firstName: "Mary",
    lastName: "Lopez",
    email: "mary@example.com",
    country: "Brazil",
    linkedinUrl: "https://linkedin.com/in/mary",
    visaCategory: "O-1",
    message: "Current F-1 student seeking options",
    status: "PENDING",
    submittedAt: "2024-02-02T14:45:00Z",
  },
  {
    id: "4",
    firstName: "Li",
    lastName: "Zijin",
    email: "li@example.com",
    country: "South Korea",
    linkedinUrl: "https://linkedin.com/in/li",
    visaCategory: "EB-2 NIW",
    message: "Researcher looking for NIW options",
    status: "PENDING",
    submittedAt: "2024-02-02T14:45:00Z",
  },
  {
    id: "5",
    firstName: "Mark",
    lastName: "Antonov",
    email: "mark@example.com",
    country: "Russia",
    linkedinUrl: "https://linkedin.com/in/mark",
    visaCategory: "O-1",
    message: "Tech professional seeking O-1",
    status: "PENDING",
    submittedAt: "2024-02-02T14:45:00Z",
  },
  {
    id: "6",
    firstName: "Jane",
    lastName: "Ma",
    email: "jane@example.com",
    country: "Mexico",
    linkedinUrl: "https://linkedin.com/in/jane",
    visaCategory: "EB-1A",
    message: "Professor seeking EB-1A",
    status: "PENDING",
    submittedAt: "2024-02-02T14:45:00Z",
  },
  {
    id: "7",
    firstName: "Anand",
    lastName: "Jain",
    email: "anand@example.com",
    country: "Mexico",
    linkedinUrl: "https://linkedin.com/in/anand",
    visaCategory: "O-1",
    message: "Startup founder seeking O-1",
    status: "REACHED_OUT",
    submittedAt: "2024-02-02T14:45:00Z",
  },
  {
    id: "8",
    firstName: "Anna",
    lastName: "Voronova",
    email: "anna@example.com",
    country: "France",
    linkedinUrl: "https://linkedin.com/in/anna",
    visaCategory: "EB-2 NIW",
    message: "Scientist seeking NIW",
    status: "PENDING",
    submittedAt: "2024-02-02T14:45:00Z",
  },
];

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(defaultLeads);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Using default leads instead of API call for now
      setLeads(defaultLeads);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch leads");
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLeadStatus = useCallback(
    async (leadId: string, status: LeadStatus) => {
      try {
        setLoading(true);
        setError(null);
        // Update local state directly since we're not using an API yet
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === leadId ? { ...lead, status } : lead
          )
        );
      } catch (err) {
        setError("Failed to update lead status");
        console.error("Error updating lead status:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = {
    leads,
    loading,
    error,
    updateLeadStatus,
    fetchLeads,
  };

  return (
    <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
}
