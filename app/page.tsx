"use client";
/**
 * External modules
 */
import React from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { space, SpaceProps, justifySelf, JustifySelfProps } from "styled-system";
import { Avatar, Button, Typography } from "antd";
import { AiOutlineRightCircle, AiOutlineFacebook, AiOutlineGithub, AiOutlineHighlight } from "react-icons/ai";

/**
 * Internal modules
 */
import * as images from "../assets/images";
import * as urls from "../assets/urls";

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 78px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Section = styled.section<JustifySelfProps>`
    display: flex;
    flex-direction: inherit;
    align-items: inherit;
    ${justifySelf}
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const User = styled(Avatar)`
    animation: ${fadeIn} 1s;
`;

const TextBlock = styled.div`
    width: 275px;
    height: 46px;
    margin-top: 24px;
    text-align: center;
    > h1 {
        color: #fff;
        animation: ${fadeIn} 0.5s;
    }
`;

const EnterButton = styled(AiOutlineRightCircle)`
    margin-top: 32px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    animation: ${fadeIn} 1s;
`;

const OptionContainer = styled.div<SpaceProps>`
    display: flex;
    padding-bottom: 96px;
    ${space}
`;

const OptionButton = styled.div`
    min-width: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-left: 18px;
    margin-right: 18px;
    > span {
        margin-top: 4px;
        color: white;
    }
    > button, > span {
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
        :hover, :active, :focus {
            color: rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.6);
        }
    }
    :hover, :active, :focus {
        > button, > span {
            color: rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.6);
        }
    }
`;

const Login = () => {
    const router = useRouter();
    const [user, setUser] = React.useState("Jaewook Ahn")

    const handleEnter = React.useCallback(() => {
        router.push("/home")
    }, [router]);

    return (
        <Container>
            <Section style={{ flex: 1, justifyContent: "center" }}>
                <User size={72} src={images.profile} />
                <TextBlock>
                    <Typography.Title>{user}</Typography.Title>
                </TextBlock>
                <EnterButton onClick={handleEnter} />
            </Section>
            <Section>
                <OptionContainer>
                    <OptionButton onClick={() => window.open(urls.github)}>
                        <Button ghost shape="circle" icon={<AiOutlineGithub />} />
                        <Typography.Text>GITHUB</Typography.Text>
                    </OptionButton>
                    <OptionButton onClick={() => window.open(urls.facebook)}>
                        <Button ghost shape="circle" icon={<AiOutlineFacebook />} />
                        <Typography.Text>FACEBOOK</Typography.Text>
                    </OptionButton>
                    <OptionButton onClick={() => window.open(urls.blog)}>
                        <Button ghost shape="circle" icon={<AiOutlineHighlight />} />
                        <Typography.Text>BLOG</Typography.Text>
                    </OptionButton>
                </OptionContainer>
            </Section>
        </Container>
    );
};

export default Login;
