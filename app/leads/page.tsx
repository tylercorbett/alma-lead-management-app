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
`;

const Logo = styled.div`
  margin-bottom: 2rem;
  img {
    width: 120px;
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
  font-weight: 600;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 300px;
  &::placeholder {
    color: #9ca3af;
  }
`;

const StatusFilter = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: 600;
  border-bottom: 1px solid #e5e5e5;
  color: #4a4a4a;
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
  padding: 0.75rem 1rem;
  border-radius: 4px;
  color: #18181b;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.5rem;

  &:hover {
    background: #ecfccb;
  }

  &.active {
    background: #84cc16;
    color: white;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem;
  min-width: 2rem;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#18181b" : "white")};
  color: ${({ active }) => (active ? "white" : "#18181b")};
  cursor: pointer;

  &:hover {
    background: ${({ active }) => (active ? "#27272a" : "#f9fafb")};
  }
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
          <Image src="/logo.svg" alt="Alma Logo" width={120} height={40} />
        </Logo>
        <NavItem className="active">Leads</NavItem>
        <NavItem>Settings</NavItem>
      </Sidebar>
      <MainContent>
        <Header>
          <Title>Leads</Title>
        </Header>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <StatusFilter
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED_OUT">Reached Out</option>
          </StatusFilter>
        </SearchBar>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name ↓</TableHeader>
              <TableHeader>Submitted ↓</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Country</TableHeader>
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
          <PageButton>←</PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
          <PageButton>→</PageButton>
        </Pagination>
      </MainContent>
    </Container>
  );
}
