"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useLeads } from "../context/LeadsContext";
import { Lead } from "../types/lead";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 240px;
  background: #f7fee7;
  padding: 2rem;
  border-right: 1px solid #edeeed;
`;

const Logo = styled.div`
  position: relative;
  top: -4px;
  margin-bottom: 5rem;
  img {
    width: 100px;
    height: auto;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 300px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: calc(50% + 2px);
  transform: translateY(-50%);
  color: #9ca3af;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.2rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 100%;
  color: #9ca3af;
  &::placeholder {
    color: #9ca3af;
  }
`;

const StatusFilter = styled.select`
  padding: 0 1rem;
  padding-right: 2rem;
  padding-left: 0.6rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: white;
  color: #9ca3af;
  width: 6rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.2em 1.2em;

  option {
    color: #9ca3af;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #e5e5e5;
  border-radius: 1.4rem;
  overflow: hidden;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
  color: #9ca3af;
  cursor: pointer;
  background: white;
`;

const TableRow = styled.tr`
  height: 4rem;
  &:hover {
    background: #f9fafb;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  color: #4a4a4a;
  background: white;
  vertical-align: middle;
  display: table-cell;
  height: inherit;
`;

const StatusBadge = styled.span<{ status: "PENDING" | "REACHED_OUT" }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  ${({ status }) =>
    status === "PENDING"
      ? `
    background: #FEF3C7;
    color: #92400E;
  `
      : `
    background: #DCFCE7;
    color: #166534;
  `}
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #18181b;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #27272a;
  }

  &:disabled {
    background: #71717a;
    cursor: not-allowed;
  }
`;

const NavItem = styled.div`
  font-size: 1.1rem;
  cursor: pointer;
  margin-bottom: 1.4rem;

  &.active {
    font-weight: 700;
  }

  &:not(.active) {
    color: #666;
    font-weight: 400;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  padding-right: 2rem;
  color: #9ca3af;
  background: white;
  border-top: 1px solid #e5e5e5;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.1rem;
  min-width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ active }) => (active ? "1px solid #18181b" : "none")};
  border-radius: 2px;
  background: transparent;
  color: ${({ active }) => (active ? "#18181b" : "#9ca3af")};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    color: #18181b;
  }

  &:disabled {
    color: #9ca3af;
    opacity: 0.5;
  }
`;

const AdminSection = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AdminCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
`;

const AdminLabel = styled.span`
  font-size: 1.1rem;
  color: #18181b;
  font-weight: 700;
`;

export default function LeadsPage() {
  const { leads, loading, error, fetchLeads, updateLeadStatus } = useLeads();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    column: "name" | "submitted" | "status" | "country" | null;
    direction: "asc" | "desc" | null;
  }>({
    column: null,
    direction: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Mock data - adding more leads for testing
  const mockLeads: Lead[] = [
    {
      id: "1",
      firstName: "Jorge",
      lastName: "Ruiz",
      status: "PENDING" as const,
      country: "Mexico",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "jorge@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "2",
      firstName: "Bahar",
      lastName: "Zamir",
      status: "PENDING" as const,
      country: "Mexico",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "bahar@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "3",
      firstName: "Mary",
      lastName: "Lopez",
      status: "PENDING" as const,
      country: "Brazil",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "mary@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "4",
      firstName: "Li",
      lastName: "Zijin",
      status: "PENDING" as const,
      country: "South Korea",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "li@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "5",
      firstName: "Mark",
      lastName: "Antonov",
      status: "PENDING" as const,
      country: "Russia",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "mark@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "6",
      firstName: "Jane",
      lastName: "Ma",
      status: "PENDING" as const,
      country: "Mexico",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "jane@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "7",
      firstName: "Anand",
      lastName: "Jain",
      status: "REACHED_OUT" as const,
      country: "Mexico",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "anand@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "8",
      firstName: "Anna",
      lastName: "Voronova",
      status: "PENDING" as const,
      country: "France",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "anna@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "9",
      firstName: "David",
      lastName: "Chen",
      status: "PENDING" as const,
      country: "China",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "david@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "10",
      firstName: "Sarah",
      lastName: "Johnson",
      status: "REACHED_OUT" as const,
      country: "USA",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "sarah@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "11",
      firstName: "Carlos",
      lastName: "Garcia",
      status: "PENDING" as const,
      country: "Spain",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "carlos@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "12",
      firstName: "Emma",
      lastName: "Wilson",
      status: "PENDING" as const,
      country: "UK",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "emma@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "13",
      firstName: "Yuki",
      lastName: "Tanaka",
      status: "REACHED_OUT" as const,
      country: "Japan",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "yuki@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "14",
      firstName: "Alex",
      lastName: "Kim",
      status: "PENDING" as const,
      country: "South Korea",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "alex@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "15",
      firstName: "Maria",
      lastName: "Silva",
      status: "PENDING" as const,
      country: "Brazil",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "maria@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "16",
      firstName: "Hassan",
      lastName: "Ahmed",
      status: "REACHED_OUT" as const,
      country: "Egypt",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "hassan@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "17",
      firstName: "Sophie",
      lastName: "Martin",
      status: "PENDING" as const,
      country: "France",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "sophie@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
    {
      id: "18",
      firstName: "Luis",
      lastName: "Rodriguez",
      status: "PENDING" as const,
      country: "Argentina",
      submittedAt: "2024-02-02T14:45:00Z",
      email: "luis@example.com",
      linkedinUrl: "",
      visaCategory: "",
      message: "",
    },
  ];

  useEffect(() => {
    // Using mock data instead of fetchLeads
    // fetchLeads();
  }, []);

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      searchQuery === "" ||
      `${lead.firstName} ${lead.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Sort only the current page
  const displayedLeads = [...paginatedLeads].sort((a, b) => {
    if (!sortConfig.column || !sortConfig.direction) return 0;

    const direction = sortConfig.direction === "asc" ? 1 : -1;

    switch (sortConfig.column) {
      case "name":
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return direction * nameA.localeCompare(nameB);
      case "submitted":
        return (
          direction *
          (new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime())
        );
      case "status":
        return direction * a.status.localeCompare(b.status);
      case "country":
        return direction * a.country.localeCompare(b.country);
      default:
        return 0;
    }
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Reset sorting when changing pages
    setSortConfig({ column: null, direction: null });
  };

  const toggleSort = (column: "name" | "submitted" | "status" | "country") => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column !== column
          ? "asc"
          : prev.direction === null
          ? "asc"
          : prev.direction === "asc"
          ? "desc"
          : null,
    }));
  };

  const handleUpdateStatus = async (leadId: string) => {
    await updateLeadStatus(leadId, "REACHED_OUT");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Sidebar>
        <Logo>
          <Image
            src="/alma-logo.png"
            alt="Alma Logo"
            width={120}
            height={40}
            priority
          />
        </Logo>
        <NavItem className="active">Leads</NavItem>
        <NavItem>Settings</NavItem>
        <AdminSection>
          <AdminCircle>A</AdminCircle>
          <AdminLabel>Admin</AdminLabel>
        </AdminSection>
      </Sidebar>
      <MainContent>
        <Header>
          <Title>Leads</Title>
        </Header>
        <SearchBar>
          <SearchInputWrapper>
            <SearchIcon>
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputWrapper>
          <StatusFilter
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Status</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED_OUT">Reached Out</option>
          </StatusFilter>
        </SearchBar>
        <Table>
          <thead>
            <tr>
              <TableHeader>
                Name{" "}
                <span
                  onClick={() => toggleSort("name")}
                  style={{ color: "#9ca3af", cursor: "pointer" }}
                >
                  {sortConfig.column !== "name"
                    ? "↓"
                    : sortConfig.direction === "asc"
                    ? "↓"
                    : "↑"}
                </span>
              </TableHeader>
              <TableHeader>
                Submitted{" "}
                <span
                  onClick={() => toggleSort("submitted")}
                  style={{ color: "#9ca3af", cursor: "pointer" }}
                >
                  {sortConfig.column !== "submitted"
                    ? "↓"
                    : sortConfig.direction === "asc"
                    ? "↓"
                    : "↑"}
                </span>
              </TableHeader>
              <TableHeader>
                Status{" "}
                <span
                  onClick={() => toggleSort("status")}
                  style={{ color: "#9ca3af", cursor: "pointer" }}
                >
                  {sortConfig.column !== "status"
                    ? "↓"
                    : sortConfig.direction === "asc"
                    ? "↓"
                    : "↑"}
                </span>
              </TableHeader>
              <TableHeader>
                Country{" "}
                <span
                  onClick={() => toggleSort("country")}
                  style={{ color: "#9ca3af", cursor: "pointer" }}
                >
                  {sortConfig.column !== "country"
                    ? "↓"
                    : sortConfig.direction === "asc"
                    ? "↓"
                    : "↑"}
                </span>
              </TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {displayedLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  {lead.firstName} {lead.lastName}
                </TableCell>
                <TableCell>
                  {new Date(lead.submittedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={lead.status}>
                    {lead.status === "PENDING" ? "Pending" : "Reached Out"}
                  </StatusBadge>
                </TableCell>
                <TableCell>{lead.country}</TableCell>
                <TableCell>
                  {lead.status === "PENDING" && (
                    <ActionButton onClick={() => handleUpdateStatus(lead.id)}>
                      Mark as Reached Out
                    </ActionButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <Pagination>
                  <PageButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </PageButton>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PageButton
                        key={page}
                        active={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PageButton>
                    )
                  )}
                  <PageButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </PageButton>
                </Pagination>
              </td>
            </tr>
          </tfoot>
        </Table>
      </MainContent>
    </Container>
  );
}
