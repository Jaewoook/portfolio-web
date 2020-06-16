import React from "react";
import styled from "styled-components/macro";
import { display, DisplayProps } from "styled-system";
import { Button, Layout } from "antd";

const HeaderWrapper = styled(Layout.Header)<DisplayProps>`
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    background: #000;
    z-index: 1;
    position: fixed;
    ${display}
`;

HeaderWrapper.defaultProps = {
    display: "flex",
};

export const Header: React.FC<DisplayProps> = (props) => {
    return <HeaderWrapper {...props}>
        <Button type="link">GitHub</Button>
        <Button type="link">Blog</Button>
    </HeaderWrapper>;
};
