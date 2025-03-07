"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
`;

const Icon = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #000;
  margin-bottom: 2rem;
  line-height: 1.2;
  font-weight: 600;
  width: 30rem;
  text-align: center;
`;

const Button = styled.a`
  display: inline-block;
  background: #18181b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
  cursor: pointer;
  width: 20rem;
  text-align: center;

  &:hover {
    background: #27272a;
  }
`;

export default function ThankYou() {
  return (
    <Container>
      <Icon>
        <Image
          src="/information-paper.png"
          alt="Success icon"
          width={56}
          height={56}
        />
      </Icon>
      <Title>Thank You</Title>
      <Message>
        Your information was submitted to our team of immigration attorneys.
        Expect an email from hello@tryalma.ai.
      </Message>
      <Link href="/" passHref>
        <Button>Go Back to Homepage</Button>
      </Link>
    </Container>
  );
}
