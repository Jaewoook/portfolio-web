import React from "react";
import styled from "styled-components/macro";
import { Layout as LayoutWrapper } from "antd";
import { Header } from "./Header";
import { HeaderContext } from "../contexts";

interface Props {
    children: React.ReactNode;
}

const Container = styled(LayoutWrapper)`
    width: 100vw;
    height: 100vh;
`;

export const Layout: React.FC<Props> = ({ children }) => {
    const { show } = React.useContext(HeaderContext);
    return (
        <Container>
            <Header display={show ? "flex": "none"} />
            {children}
        </Container>
    )
};
