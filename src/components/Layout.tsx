import React from "react";
import styled from "styled-components/macro";
import { height, HeightProps, margin, MarginProps } from "styled-system";
import { Layout as LayoutWrapper } from "antd";
import { Header } from "./Header";
import { HeaderContext } from "../contexts";

interface Props {
    children: React.ReactNode;
}

interface ColorModeProps {
    colorMode: "light" | "dark";
}

const ThemeWrapper = styled.div<ColorModeProps>`
    width: 100vw;
    min-height: 100vh;
    background-color: ${({ colorMode }) => colorMode === "dark" ? "#000" : "#fff"};
`;

const Theme: React.FC<ColorModeProps> = (props) => {
    const { colorMode, children } = props;
return <ThemeWrapper colorMode={colorMode}>{children}</ThemeWrapper>
}

const Container = styled(LayoutWrapper)<ColorModeProps>`
    width: 100vw;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.04);
`;

const Wrapper = styled.div<HeightProps & MarginProps>`
    width: 100%;
    ${height}
    ${margin}
`;

Wrapper.defaultProps = {
    height: ["auto", "100vh"],
    mt: [64 + 14, 0],
};

export const Layout: React.FC<Props> = ({ children }) => {
    const { show } = React.useContext(HeaderContext);
    return (
        <Theme colorMode="dark">
        <Container colorMode="dark">
            <Header display={show ? "flex": "none"} />
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
        </Theme>
    )
};
