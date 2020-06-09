import React from "react";
import styled from "styled-components";
import { Typography } from "antd";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const WindowFrame = () => {
    return (
        <Container>
            <Typography.Title ></Typography.Title>
        </Container>
    );
};
