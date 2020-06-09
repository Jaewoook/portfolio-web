import React from "react";
import styled from "styled-components";
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

    > h1 {
        color: #fff;
    }
`;

export const Hero = () => {
    const [user, setUser] = React.useState("")
    const [typeIndex, setTypeIndex] = React.useState(0);

    React.useEffect(() => {
        setUser("J");
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            if (typeIndex + 1 <= "Jaewook Ahn".length) {
                setUser(user + "Jaewook Ahn".charAt(typeIndex + 1));
                setTypeIndex(typeIndex + 1);
            }
        }, 150);
    }, [user]);

    return (
        <Container>
            <Avatar size={64} src={images.profile} style={{ marginBottom: "16px" }} />
            <Typography.Title >{user}</Typography.Title>
        </Container>
    );
};
