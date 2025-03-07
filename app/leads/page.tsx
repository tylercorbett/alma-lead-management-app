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
