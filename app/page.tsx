"use client";

import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import LeadForm from "./components/Form";

const Container = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: black;
  min-height: 100vh;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export default function Home() {
  return (
    <Container>
      <Header />
      <MainContent>
        <LeadForm />
      </MainContent>
    </Container>
  );
}
