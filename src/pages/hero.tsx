/**
 * External modules
 */
import React from "react";
import styled, { keyframes } from "styled-components/macro";
import { space, SpaceProps, justifySelf, JustifySelfProps } from "styled-system";
import { Avatar, Button, Typography } from "antd";
import { AiOutlineRightCircle, AiOutlineFacebook, AiOutlineGithub, AiOutlineHighlight } from "react-icons/ai";

/**
 * Internal modules
 */
import { HeaderContext } from "../contexts";
import * as images from "../assets/images";
import * as urls from "../assets/urls";
// import { log } from "../utils";

const USERNAME = "Jaewook Ahn";

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 78px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Section = styled.div<JustifySelfProps>`
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
    > h1 {
        color: #fff;
        animation: ${fadeIn} 1.5s;
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

const BadgeWrapper = styled.div`
    margin-top: -4px;
    padding: 1px 3px;
    background-color: #ff4d4f;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    .ant-typography {
        color: white;
        font-size: 10px;
        line-height: 12px;
    }
`;

const Badge: React.FC = (props) => (
    <BadgeWrapper>
        <Typography.Text>{props.children}</Typography.Text>
    </BadgeWrapper>
);

interface Props {
    onEnter: () => void;
}

export const Hero: React.FC<Props> = (props) => {
    const { onEnter } = props;
    const headerContext = React.useContext(HeaderContext);
    const [user, setUser] = React.useState("")
    const [typeIndex, setTypeIndex] = React.useState(0);

    const handleEnter = React.useCallback(() => {
        onEnter();
    }, [onEnter]);

    React.useEffect(() => {
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
    }, [user]);

    React.useEffect(() => {
        headerContext.setShow(false);
        return () => {
            headerContext.setShow(true);
        };
    });

    return (
        <Container>
            <Section style={{ flex: 1, justifyContent: "center" }}>
                <User size={72} src={images.profile} />
                <Badge>Alpha</Badge>
                <TextBlock>
                    <Typography.Title >{user}</Typography.Title>
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
