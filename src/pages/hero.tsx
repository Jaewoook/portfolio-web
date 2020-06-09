import React from "react";
import styled, { keyframes } from "styled-components";
import { Avatar, Typography } from "antd";
import * as images from "../assets/images";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const TextBlock = styled.div`
    width: 260px;
    margin-top: 24px;
    > h1 {
        color: #fff;
        animation: ${fadeIn} 2s;
    }
`;

export const Hero = () => {
    const [user, setUser] = React.useState("")
    const [typeIndex, setTypeIndex] = React.useState(0);

    React.useEffect(() => {
        console.log("Triggered!", user);
        if (typeIndex <= "Jaewook Ahn".length) {
            setTimeout(() => {
                setTypeIndex(typeIndex + 1);
                setUser(user + "Jaewook Ahn".charAt(typeIndex));
            }, 70 + Math.random() * 250);
        }
    }, [user]);

    return (
        <Container>
            <Avatar size={72} src={images.profile} />
            <TextBlock>
                <Typography.Title >{user}</Typography.Title>
            </TextBlock>
        </Container>
    );
};
