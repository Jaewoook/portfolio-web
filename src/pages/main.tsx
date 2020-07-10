/*  eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import styled from "styled-components/macro";
import {
    alignItems, AlignItemsProps,
    display, DisplayProps,
    space, SpaceProps,
} from "styled-system";
import { Spin, Tabs, Typography } from "antd";
import { GithubFilled, LoadingOutlined } from "@ant-design/icons";

import { WindowFrame, InfoWrapper } from "../components";
import { HeaderContext, WindowContext } from "../contexts";
import { getPinnedRepositories } from "../apis/GetPinnedRepositories";
import { Repository } from "../models/Repository";
import { log } from "../utils";

const Container = styled.div<DisplayProps>`
    width: 100%;
    height: 100%;
    ${display}
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
`;

Container.defaultProps = {
    display: ["flex", "block"],
};

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

const TabContentWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-direction: column;
    align-items: center;
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

const Activities: React.FC = () => {
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

    return <WindowFrame width={["350px", "300px"]} height="385px" left="11.5%" top={null} bottom="15.3%" title="Activities">
        <InfoWrapper paddingTop={0} flexDirection="column">
            <Tabs size="small" defaultActiveKey="repositories">
                <Tabs.TabPane tab="Repositories" key="repositories">
                    <TabContentWrapper>
                        {loading ? (
                            <Spin indicator={<LoadingOutlined spin />} />
                        ) : repositories.length ? repositories.map((repo, i) => (
                            <GitHubRepo key={i} {...repo} />
                        )) : <Typography.Text>No repository</Typography.Text>}
                    </TabContentWrapper>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Projects & Activities">

                </Tabs.TabPane>
            </Tabs>
            {/* <Typography.Title level={4}>Pinned Repositories</Typography.Title> */}
        </InfoWrapper>
    </WindowFrame>;
};

const Careers: React.FC = () => {
    return <WindowFrame width={["350px", "600px"]} height={["auto", "430px"]} left="43%" top="43%" title="Careers">
        <InfoWrapper flexDirection="column" alignItems="flex-start">
            <Typography.Title level={2}>Careers</Typography.Title>
            <Typography.Title level={4}>Salesboost</Typography.Title>
            <Typography.Text>2019.01 ~ 2020.02</Typography.Text>
            <Typography.Text>on Frontend</Typography.Text>
            <Typography.Text>
                <ul>
                    <li>Developed Salesboost service web using React
                        <ul>
                            <li>auth service</li>
                            <li>catalog service</li>
                            <li>video creation service</li>
                            <li>ad service</li>
                        </ul>
                    </li>
                    <li>Developed Open Source UI Library "malta" based on React</li>
                    <li>Developed completed component pack "palmbeach" based on React</li>
                    <li>Developed user feedback component SDK based on React</li>
                </ul>
            </Typography.Text>
            <Typography.Text>on Backend</Typography.Text>
            <Typography.Text>
                <ul>
                    <li>Developed user feedback collect system using GraphQL</li>
                </ul>
            </Typography.Text>
            <br />
            <Typography.Title level={4}>PlusTV</Typography.Title>
            <Typography.Text>2018.02 ~ 2018.10</Typography.Text>
            <Typography.Text>on Frontend</Typography.Text>
            <Typography.Text>
                <ul>
                    <li>Developed WebOS signage player app (Installed at 투썸플레이스)
                        <ul>
                            <li>image / video / web template content player</li>
                            <li>scheduled content playback using cron expression</li>
                            <li>multi display synchronized content playback using control server and WebSocket</li>
                            <li>support WebOS 2.x / 3.x platforms</li>
                            <li>remote device control & monitoring</li>
                        </ul>
                    </li>
                    <li>Developed 뚜레쥬르 빵알림 backoffice using Vue.js</li>
                    <li>Developed 뚜레쥬르 Menuboard Coffee & Beverage menu template using Vue.js</li>
                    <li>Developed 뚜레쥬르 빵알림 template using Vue.js</li>
                    <li>Developed VSS AUTO reservation web using Backbone.js</li>
                </ul>
            </Typography.Text>
            <Typography.Text>on Backend</Typography.Text>
            <Typography.Text>
                <ul>
                    <li>Developed VSS AUTO reservation backend using Flask</li>
                </ul>
            </Typography.Text>
            <Typography.Title level={4}>AtlasGuide</Typography.Title>
            <Typography.Text>2017.06 ~ 2017.09 Kookmin Univ. Summer Internship</Typography.Text>
            <Typography.Text>
                <ul>
                    <li>Developed pcm voice recorder app</li>
                    <li>Developed voice recorder app API backend</li>
                </ul>
            </Typography.Text>
        </InfoWrapper>
    </WindowFrame>;
};

const Profile: React.FC = () => {
    const [showContact, setSHowContact] = React.useState(false);
    return <WindowFrame width={["350px", "550px"]} height="auto" maxHeight={showContact ? "274px" : "214px"} left="15.7%" top="8.5%" title="Basic Info" hideStatusBar>
        <InfoWrapper flexDirection={["column", "row"]}>
            <Summary alignItems="center">
                <Typography.Title><span>👨‍💻</span></Typography.Title>
                <Typography.Title level={2}>Jaewook Ahn</Typography.Title>
                <Typography.Text>Web Frontend developer</Typography.Text>
            </Summary>
            <Summary marginLeft="32px">
                <Typography.Text aria-label="main skillset">❤️ TypeScript, React, Serverless</Typography.Text>
                <Typography.Text aria-label="location">📍 Seoul, South Korea</Typography.Text>
                <Typography.Text aria-label="university">🎓 Kookmin University</Typography.Text>
                <Typography.Text aria-label="test">🤩 Running, Photograph, Beer</Typography.Text>
                <Typography.Link onClick={() => setSHowContact(!showContact)} aria-label="contact">🤝 Contact</Typography.Link>
                {showContact ? <>
                    <Typography.Text>📞 +82-10-5438-7623</Typography.Text>
                    <Typography.Text>✈️ ajw4586@gmail.com</Typography.Text>
                </> : null}
            </Summary>
        </InfoWrapper>
    </WindowFrame>;
};

const WINDOW_KEYS = [
    "Activities",
    "Careers",
    "Basic Info",
];

export const Main = () => {
    const headerContext = React.useContext(HeaderContext);
    const [windowState, setWindowState] = React.useState<WindowContext>(WindowContext.defaultValue);

    React.useEffect(() => {
        const setTopWindow = (key: string) => {
            log.v("WindowFrame", "setTopWIndow called");
            if (!windowState?.windows.includes(key)) {
                log.e("setTopWindow broken");
                return;
            }

            const newWindows = [...windowState.windows.filter((w) => w !== key), key];
            setWindowState({
                ...windowState,
                windows: newWindows,
                currentTop: key,
            });
        };

        if (!windowState.currentTop) {
            setWindowState({
                windows: WINDOW_KEYS,
                currentTop: WINDOW_KEYS[0],
                setTopWindow,
            });
        } else {
            setWindowState({
                ...windowState,
                setTopWindow,
            });
        }
    }, [windowState.windows]);

    React.useEffect(() => {
        if (!headerContext.show) {
            headerContext.setShow(true);
        }
    }, [headerContext]);

    return (
        <WindowContext.Context.Provider value={windowState}>
            <Container>
                <Activities />
                <Careers />
                <Profile />
            </Container>
        </WindowContext.Context.Provider>
    );
};
