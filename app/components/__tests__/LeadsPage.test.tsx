import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import LeadsPage from "../../leads/page";
import { useLeads } from "../../context/LeadsContext";
import { useAuth } from "../../context/AuthContext";
import { mockLeads } from "../../data/mockLeads";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock the context hooks
jest.mock("../../context/LeadsContext", () => ({
  useLeads: jest.fn(),
}));

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("LeadsPage", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockUpdateLeadStatus = jest.fn();

  beforeEach(() => {
    // Mock router
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Mock authentication
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });

    // Mock leads context with initial data
    (useLeads as jest.Mock).mockReturnValue({
      leads: mockLeads,
      loading: false,
      error: null,
      fetchLeads: jest.fn(),
      updateLeadStatus: mockUpdateLeadStatus,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the leads table with pending leads", () => {
    render(<LeadsPage />);

    // Check for pending leads
    const pendingLeads = mockLeads.filter((lead) => lead.status === "PENDING");
    pendingLeads.forEach((lead) => {
      expect(
        screen.getByText(`${lead.firstName} ${lead.lastName}`)
      ).toBeInTheDocument();
    });
  });

  it('shows "Mark as Reached Out" button only for pending leads', () => {
    render(<LeadsPage />);

    const pendingLeads = mockLeads.filter((lead) => lead.status === "PENDING");
    const reachedOutLeads = mockLeads.filter(
      (lead) => lead.status === "REACHED_OUT"
    );

    // Count "Mark as Reached Out" buttons
    const buttons = screen.getAllByText("Mark as Reached Out");
    expect(buttons).toHaveLength(pendingLeads.length);

    // Verify reached out leads don't have the button
    reachedOutLeads.forEach((lead) => {
      const row = screen
        .getByText(`${lead.firstName} ${lead.lastName}`)
        .closest("tr");
      expect(row).not.toHaveTextContent("Mark as Reached Out");
    });
  });

  it('updates lead status when clicking "Mark as Reached Out"', async () => {
    render(<LeadsPage />);

    // Find first pending lead
    const pendingLead = mockLeads.find((lead) => lead.status === "PENDING");
    if (!pendingLead) throw new Error("No pending lead found in mock data");

    // Find and click the button for this lead
    const leadRow = screen
      .getByText(`${pendingLead.firstName} ${pendingLead.lastName}`)
      .closest("tr");
    const button = leadRow?.querySelector("button");
    if (!button) throw new Error("Button not found");

    await userEvent.click(button);

    // Verify updateLeadStatus was called with correct arguments
    expect(mockUpdateLeadStatus).toHaveBeenCalledWith(
      pendingLead.id,
      "REACHED_OUT"
    );
  });

  it("removes the button after updating status", async () => {
    // Mock leads context with a function that updates the leads data
    const mockLeads = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        status: "PENDING",
        country: "US",
        submittedAt: "2024-02-02T14:45:00Z",
        email: "john@example.com",
        linkedinUrl: "",
        visaCategory: "",
        message: "",
      },
    ];

    let leads = [...mockLeads];

    (useLeads as jest.Mock).mockReturnValue({
      leads,
      loading: false,
      error: null,
      fetchLeads: jest.fn(),
      updateLeadStatus: async (leadId: string, status: "REACHED_OUT") => {
        leads = leads.map((lead) =>
          lead.id === leadId ? { ...lead, status } : lead
        );
        // Force re-render by updating the mock
        (useLeads as jest.Mock).mockReturnValue({
          leads,
          loading: false,
          error: null,
          fetchLeads: jest.fn(),
          updateLeadStatus: mockUpdateLeadStatus,
        });
      },
    });

    render(<LeadsPage />);

    // Verify button is initially present
    expect(screen.getByText("Mark as Reached Out")).toBeInTheDocument();

    // Click the button
    await userEvent.click(screen.getByText("Mark as Reached Out"));

    // Verify button is removed
    await waitFor(() => {
      expect(screen.queryByText("Mark as Reached Out")).not.toBeInTheDocument();
    });
  });

  it("handles error when updating lead status", async () => {
    // Mock updateLeadStatus to reject
    mockUpdateLeadStatus.mockRejectedValueOnce(new Error("Failed to update"));

    render(<LeadsPage />);

    // Find and click first "Mark as Reached Out" button
    const button = screen.getAllByText("Mark as Reached Out")[0];
    await userEvent.click(button);

    // Verify error is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to update lead status")
      ).toBeInTheDocument();
    });
  });
});
