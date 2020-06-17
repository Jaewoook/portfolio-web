import React from "react";
import styled from "styled-components/macro";
import { Typography } from "antd";

import { HeaderContext } from "../contexts";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Main = () => {
    const headerContext = React.useContext(HeaderContext);

    React.useEffect(() => {
        headerContext.setShow(true);
    });

    return (
        <Container>
            Main
        </Container>
    );
};
