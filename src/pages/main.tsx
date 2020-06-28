/*  eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import styled from "styled-components/macro";
import { alignItems, AlignItemsProps, flexDirection, FlexDirectionProps, space, SpaceProps } from "styled-system";
import { Spin, Typography } from "antd";
import { GithubFilled, LoadingOutlined } from "@ant-design/icons";

import { WindowFrame } from "../components";
import { HeaderContext } from "../contexts";
import { getPinnedRepositories } from "../apis/GetPinnedRepositories";
import { Repository } from "../models/Repository";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const InfoWrapper = styled.div<FlexDirectionProps>`
    width: 100%;
    height: 100%;
    display: flex;
    ${flexDirection}
    align-items: center;
    padding: 24px 18px;
    .ant-typography {
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

const GitHubRepoWrapper = styled.div`
    width: 100%;
    margin: 4px 0;
    padding: 12px 10px;
    display: flex;
    flex-direction: column;
    border: 1px rgba(255, 255, 255, 0.25) solid;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.15s ease-out;
    :hover {
        background-color: rgba(255, 255, 255, 0.02);
    }
    > .repo-title {
        display: flex;
        align-items: baseline;
        margin-bottom: 8px;
        > .ant-typography {
            margin-left: 6px;
            font-size: 16px;
            font-weight: 500;
        }
    }
    > .ant-typography {
        font-size: 12px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.8);
    }
    > .repo-language {
        margin-top: 12px;
        display: flex;
        align-items: baseline;

        > .lang-color {
            width: 8px;
            height: 8px;
            border-radius: 4px;
            margin-right: 4px;
        }
        > .ant-typography {
            color: rgba(255, 255, 255, 0.6);
            font-size: 10px;
        }
    }
`;

const GitHubRepo: React.FC<Repository> = (props) => {
    return (
        <GitHubRepoWrapper onClick={() => window.open(props.url)}>
            <div className="repo-title">
                <GithubFilled style={{ color: "#fff", fontSize: 16 }} />
                <Typography.Text>{props.name}</Typography.Text>
            </div>
            <Typography.Text>{props.description}</Typography.Text>
            {props.primaryLanguage.name ? (
                <div className="repo-language">
                    <div className="lang-color" style={{ backgroundColor: props.primaryLanguage.color }} />
                    <Typography.Text>{props.primaryLanguage.name}</Typography.Text>
                </div>
            ) : null}
        </GitHubRepoWrapper>
    );
}

const Repositories: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [repositories, setRepositories] = React.useState<Repository[]>([]);

    React.useEffect(() => {
        (async () => {
            try {
                const res = await getPinnedRepositories();
                setRepositories(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return <WindowFrame height="450px" left="30px" top="10%" title="Activities">
        <InfoWrapper flexDirection="column">
            <Typography.Title level={4}>Pinned Repositories</Typography.Title>
            {loading ? (
                <Spin indicator={<LoadingOutlined spin />} />
            ) : repositories.length ? repositories.map((repo, i) => (
                <GitHubRepo key={i} {...repo} />
            )) : <Typography.Text>No repository</Typography.Text>}
        </InfoWrapper>
    </WindowFrame>;
};

export const Main = () => {
    const headerContext = React.useContext(HeaderContext);

    React.useEffect(() => {
        if (!headerContext.show) {
            headerContext.setShow(true);
        }
    }, [headerContext]);

    return (
        <Container>
            <Repositories />
            <WindowFrame width="500px" height="auto" left="calc(50% - 250px)" top="calc(50% - 100px)" title="Basic Info" hideStatusBar>
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
            {/* <WindowFrame title="Careers">
                <InfoWrapper>

                </InfoWrapper>
            </WindowFrame> */}
        </Container>
    );
};
