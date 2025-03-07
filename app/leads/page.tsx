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
  margin-bottom: 2rem;
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
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
  color: #9ca3af;
  cursor: pointer;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  color: #4a4a4a;
`;

const StatusBadge = styled.span<{ status: "PENDING" | "REACHED_OUT" }>`
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
  margin-top: 2rem;
  color: #9ca3af;
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
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    color: #18181b;
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

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filteredLeads = leads.filter((lead) => {
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
                Name <span style={{ color: "#9ca3af" }}>↓</span>
              </TableHeader>
              <TableHeader>
                Submitted <span style={{ color: "#9ca3af" }}>↓</span>
              </TableHeader>
              <TableHeader>
                Status <span style={{ color: "#9ca3af" }}>↓</span>
              </TableHeader>
              <TableHeader>
                Country <span style={{ color: "#9ca3af" }}>↓</span>
              </TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
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
        </Table>
        <Pagination>
          <PageButton>&lt;</PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>&gt;</PageButton>
        </Pagination>
      </MainContent>
    </Container>
  );
}
