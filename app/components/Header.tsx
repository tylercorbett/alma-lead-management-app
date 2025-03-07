"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import almaLogo from "../../public/alma-logo.png";
import appleSlices from "../../public/apple-slices.png";

const HeaderContainer = styled.header`
  background-color: #d9dea5;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  flex: 0 0 auto;
  margin-right: -2rem;
  transform: translateX(-10%);

  @media (max-width: 1000px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  z-index: 1;
  padding: 0 2rem;

  @media (max-width: 1000px) {
    padding: 2rem 3rem;
  }
`;

const Logo = styled.div`
  margin-bottom: 2.5rem;
  width: 100px;
`;

const Title = styled.div`
  font-size: 4.5rem;
  line-height: 1.1;
  font-weight: 700;
  color: #000;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem 0;

  div {
    width: 100%;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <BackgroundImage>
        <Image
          src={appleSlices}
          alt="Decorative apple slices"
          width={270}
          height={400}
          style={{ objectFit: "contain" }}
          priority
        />
      </BackgroundImage>
      <ContentContainer>
        <Logo>
          <Image
            src={almaLogo}
            alt="almā Logo"
            width={100}
            height={30}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </Logo>
        <Title>
          <div>Get An Assessment</div>
          <div>Of Your Immigration Case</div>
        </Title>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;
