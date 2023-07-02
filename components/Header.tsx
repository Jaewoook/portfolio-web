import React from "react";
import styled from "styled-components/macro";
import { display, DisplayProps, zIndex, ZIndexProps } from "styled-system";
import { Button, Layout } from "antd";
import * as urls from "../assets/urls";

const HeaderWrapper = styled(Layout.Header)<DisplayProps & ZIndexProps>`
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    background: #000;
    z-index: 1;
    position: fixed;
    ${display}
    ${zIndex}
`;

HeaderWrapper.defaultProps = {
    display: "flex",
    zIndex: [100, "unset"],
};

export const Header: React.FC<DisplayProps> = (props) => {
    return <HeaderWrapper {...props}>
        <Button type="link" href={urls.github}>GitHub</Button>
        <Button type="link" href={urls.blog}>Blog</Button>
    </HeaderWrapper>;
};