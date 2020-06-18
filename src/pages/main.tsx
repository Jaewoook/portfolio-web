/*  eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import styled from "styled-components/macro";
import { alignItems, AlignItemsProps, space, SpaceProps } from "styled-system";
import { Typography } from "antd";

import { WindowFrame } from "../components";
import { HeaderContext } from "../contexts";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const InfoWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 24px 18px;
    h1, h2, span {
        color: white;
    }
    h2 {
        margin: 0 !important;
    }
`;

const Summary = styled.div<AlignItemsProps & SpaceProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    ${alignItems}
    ${space}
    > span {
        margin: 4px 0;
    }
`;

export const Main = () => {
    const headerContext = React.useContext(HeaderContext);

    React.useEffect(() => {
        headerContext.setShow(true);
    }, []);

    return (
        <Container>
            <WindowFrame width="500px" height="auto" left="calc(50% - 250px)" title="Basic Info">
                <InfoWrapper>
                    <Summary alignItems="center">
                        <Typography.Title><span>👨‍💻</span></Typography.Title>
                        <Typography.Title level={2}>Jaewook Ahn</Typography.Title>
                        <Typography.Text>Web Front-end developer</Typography.Text>
                    </Summary>
                    <Summary marginLeft="32px">
                        <Typography.Text aria-label="main skillset">❤️ TypeScript, React, Serverless</Typography.Text>
                        <Typography.Text aria-label="location">📍 Seoul, South Korea</Typography.Text>
                        <Typography.Text aria-label="university">🎓 Kookmin University</Typography.Text>
                        <Typography.Text aria-label="test">🤩 Running, Photograph, Beer</Typography.Text>
                    </Summary>
                </InfoWrapper>
            </WindowFrame>
        </Container>
    );
};
