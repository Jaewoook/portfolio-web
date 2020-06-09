import React from "react";
import styled, { keyframes } from "styled-components";
import { Avatar, Typography } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import * as images from "../assets/images";

const USERNAME = "Jaewook Ahn";

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
    width: 275px;
    height: 46px;
    margin-top: 24px;
    > h1 {
        color: #fff;
        animation: ${fadeIn} 1.5s;
    }
`;

const EnterButton = styled(RightCircleOutlined)`
    margin-top: 16px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
`;

export const Hero = () => {
    const [user, setUser] = React.useState("")
    const [typeIndex, setTypeIndex] = React.useState(0);

    React.useEffect(() => {
        console.log("Triggered!", user);
        if (typeIndex <= USERNAME.length) {
            setTimeout(() => {
                setTypeIndex(typeIndex + 1);
                setUser(user + USERNAME.charAt(typeIndex));
            }, 50);
        }

        if (user.includes(USERNAME)) {
            if (user.includes("_")) {
                setTimeout(() => setUser(USERNAME), 400);
            } else {
                setTimeout(() => setUser(`${USERNAME}_`), 400);
            }
        }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Container>
            <Avatar size={72} src={images.profile} />
            <TextBlock>
                <Typography.Title >{user}</Typography.Title>
            </TextBlock>
            <EnterButton />
        </Container>
    );
};
