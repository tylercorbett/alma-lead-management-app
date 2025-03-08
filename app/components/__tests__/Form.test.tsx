import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import LeadForm from "../Form";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("LeadForm", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    global.fetch = jest.fn();
    mockRouter.push.mockClear();
  });

  it("renders all form fields", () => {
    render(<LeadForm />);

    // Check for input fields
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("LinkedIn URL")).toBeInTheDocument();

    // Check for select field
    expect(screen.getByText("Country of Citizenship")).toBeInTheDocument();

    // Check for radio buttons
    expect(screen.getByLabelText("O-1")).toBeInTheDocument();
    expect(screen.getByLabelText("EB-1A")).toBeInTheDocument();
    expect(screen.getByLabelText("EB-2 NIW")).toBeInTheDocument();
    expect(screen.getByLabelText("I don't know")).toBeInTheDocument();

    // Check for file upload
    expect(screen.getByText("Resume")).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    render(<LeadForm />);

    // Click submit without filling any fields
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getAllByText("Required")).toHaveLength(6); // All required fields
    });
  });

  it("validates email format", async () => {
    render(<LeadForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "invalid-email");

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("validates LinkedIn URL format", async () => {
    render(<LeadForm />);

    const linkedinInput = screen.getByPlaceholderText("LinkedIn URL");
    await userEvent.type(linkedinInput, "invalid-url");

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid URL")).toBeInTheDocument();
    });
  });

  it("handles file upload UI", async () => {
    render(<LeadForm />);

    const file = new File(["dummy content"], "resume.pdf", {
      type: "application/pdf",
    });
    const fileInput = screen.getByLabelText("Resume");

    await userEvent.upload(fileInput, file);

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it("submits form successfully with valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<LeadForm />);

    // Fill out the form
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn URL"),
      "https://linkedin.com/in/johndoe"
    );

    // Select country
    const countrySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(countrySelect, "US");

    // Select visa category
    await userEvent.click(screen.getByLabelText("O-1"));

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          country: "US",
          linkedinUrl: "https://linkedin.com/in/johndoe",
          visaCategory: "O-1",
          message: "",
        }),
      });

      expect(mockRouter.push).toHaveBeenCalledWith("/thankyou");
    });
  });

  it("handles form submission error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<LeadForm />);

    // Fill out the form with valid data
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn URL"),
      "https://linkedin.com/in/johndoe"
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "US");
    await userEvent.click(screen.getByLabelText("O-1"));

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("shows loading state during submission", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<LeadForm />);

    // Fill out form with valid data
    await userEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await userEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("LinkedIn URL"),
      "https://linkedin.com/in/johndoe"
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "US");
    await userEvent.click(screen.getByLabelText("O-1"));

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    // Check for loading state
    expect(screen.getByText("Submitting...")).toBeInTheDocument();

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.queryByText("Submitting...")).not.toBeInTheDocument();
    });
  });
});
