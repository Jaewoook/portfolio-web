"use client";

/**
 * External modules
 */
import styled from "styled-components";
import { Layout as LayoutWrapper } from "antd";

/**
 * Internal modules
 */
import { Header } from "../components/Header";
import { StyledComponentsRegistry } from "../libs/styled";
import "../styles/App.css";

/**
 * Type modules
 */
import type { ReactNode } from "react";

const Container = styled(LayoutWrapper)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background-color: #000;
`;

const Wrapper = styled.main`
  flex: 1;
`;

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko">
      <head>
        <title>Jaewook&apos;s Portfolio</title>
      </head>
      <body>
        <StyledComponentsRegistry>
          <Container>
            <Wrapper>{children}</Wrapper>
          </Container>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
