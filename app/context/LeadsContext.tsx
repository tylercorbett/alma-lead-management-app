"use client";

import React, { createContext, useContext, useState } from "react";
import { Lead } from "../types/lead";
import { mockLeads } from "../data/mockLeads";

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  addLead: (lead: Omit<Lead, "id" | "status" | "submittedAt">) => void;
  updateLeadStatus: (leadId: string, status: "PENDING" | "REACHED_OUT") => void;
}

const LeadsContext = createContext<LeadsContextType | null>(null);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLead = (leadData: Omit<Lead, "id" | "status" | "submittedAt">) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      status: "PENDING",
      submittedAt: new Date().toISOString(),
    };
    setLeads((prevLeads) => [newLead, ...prevLeads]);
  };

  const updateLeadStatus = (
    leadId: string,
    status: "PENDING" | "REACHED_OUT"
  ) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
    );
  };

  return (
    <LeadsContext.Provider
      value={{ leads, loading, error, addLead, updateLeadStatus }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
}
