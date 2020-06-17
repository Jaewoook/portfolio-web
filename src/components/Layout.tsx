import React from "react";
import styled from "styled-components/macro";
import { Layout as LayoutWrapper } from "antd";
import { Header } from "./Header";
import { HeaderContext } from "../contexts";

interface Props {
    children: React.ReactNode;
}

interface ColorModeProps {
    colorMode: "light" | "dark";
}

const Container = styled(LayoutWrapper)<ColorModeProps>`
    width: 100vw;
    height: 100vh;
    background-color: #000;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const Layout: React.FC<Props> = ({ children }) => {
    const { show } = React.useContext(HeaderContext);
    return (
        <Container colorMode="dark">
            <Header display={show ? "flex": "none"} />
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    )
};
