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

const TabContentWrapper = styled.div<AlignItemsProps>`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-direction: column;
    ${alignItems}
`;

TabContentWrapper.defaultProps = {
    alignItems: "center",
};

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

    return <WindowFrame width={["350px", "460px"]} height="385px" left="11.5%" top={null} bottom="15.3%" title="Activities">
        <InfoWrapper paddingTop={0} flexDirection="column">
            <Tabs size="small" defaultActiveKey="hackathons">
                <Tabs.TabPane tab="Repositories" key="repositories">
                    <TabContentWrapper>
                        {loading ? (
                            <Spin indicator={<LoadingOutlined spin />} />
                        ) : repositories.length ? repositories.map((repo, i) => (
                            <GitHubRepo key={i} {...repo} />
                        )) : <Typography.Text>No repository</Typography.Text>}
                    </TabContentWrapper>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Hackathons" key="hackathons">
                    <TabContentWrapper alignItems="flex-start">
                        <Typography.Text>💛 English version comming soon!</Typography.Text>
                        <Typography.Title level={4}>국민대 해커톤 두리톤</Typography.Title>
                        <Typography.Text>
                            <ul>
                                <li>2017.05</li>
                                <li>프로젝트 이름: 겟잇뷰티</li>
                                <li>역할: 안드로이드 앱 개발자</li>
                                <li>
                                    결과
                                    <ul>
                                        <li>해커톤 개발을 리드하여 팀원들과 갈등 관리 및 개발 주도</li>
                                        <li>남성인 내가 아닌, 여성의 입장에서 생각을 하며, UI/UX를 제안하고, 개발</li>
                                        <li>최우수상 수상</li>
                                    </ul>
                                </li>
                                <li>
                                    추가설명: 광고성 화장품 순위가 아닌 실제 유저들의 데이터에 기반한 화장품 순위 추천 서비스를 만들었습니다.
                                    아무 화장품이나 바코드를 인식하면 어떤 제품인지 인식할 수 있는 기능을 만들어서 수많은 화장품 정보를 직접 입력해야 하는 수고로움을 덜었씁니다.
                                    사용자의 재구매율 지표를 활용해 사실에 기반한 순위를 추천하도록 하였습니다.
                                </li>
                            </ul>
                        </Typography.Text>
                        <Typography.Title level={4}>국민대 신입생 해커톤</Typography.Title>
                        <Typography.Text>
                            <ul>
                                <li>2017.02</li>
                                <li>프로젝트 이름: 국민택시</li>
                                <li>역할: 안드로이드 앱 개발자</li>
                                <li>
                                    결과
                                    <ul>
                                        <li>국민대 학생 입장에서의 문제상황 파악과 해결방법을 생각해보는 기회</li>
                                        <li>국민대 로그인 시스템 취약점을 이용하여 (학교 허가 하에) 리포트를 제출하여 개선</li>
                                        <li>각자 맡은 부분에 대해 발표를 하며, 청중의 좋은 반응</li>
                                        <li>최우수상을 수상</li>
                                    </ul>
                                </li>
                                <li>
                                    추가설명: 국민대학교까지 택시 카풀 파티를 만들 수 있는 서비스를 개발하였습니다.
                                    실제 국민대학교 재학생 선배님들의 의견과 카풀 앱의 단점을 보완하여 정확한 신원과 서비스의 신뢰도를 높여 학우들에게 좋은 반응을 이끌어낼 수 있었습니다.
                                    해커톤 종료 후 실제 서비스로 발전시키려 했으나, 서비스화까지 진행하지 못해 아쉬움이 남는 프로젝트 입니다.
                                </li>
                            </ul>
                        </Typography.Text>
                        <Typography.Title level={4}>단국대 한글날 해커톤 집현톤</Typography.Title>
                        <Typography.Text>
                            <ul>
                                <li>2015.10</li>
                                <li>프로젝트 이름: Hey Bill</li>
                                <li>역할: 안드로이드 앱 개발자</li>
                                <li>
                                    결과
                                    <ul>
                                        <li>현업 개발자, 디자이너, 기획자 분들과의 첫 협업의 기회.</li>
                                        <li>해커톤에서 거의 모든 기능을 구현한 가장 노력했던 해커톤 중 하나</li>
                                        <li>결과가 아닌 과정에 행복함을 느끼고 만족스러웠던 해커톤</li>
                                    </ul>
                                </li>
                                <li>
                                    추가설명: 기획자 2명, 개발자 2명, 디자이너 2명으로 구성되었던 해커톤이었습니다.
                                    카카오에서 서버 개발자로 일하시던 분이 프로젝트를 리드하셨는데 현업에 종사하시는 분들과 팀을 이뤄 진행한 첫 해커톤이어서 프로젝트 완성도가 상당히 높았습니다.
                                    아쉽게도 다른 팀들에 밀려 수상은 하지 못하였지만 무박 3일간 노력하며 과정에 대한 만족도가 제일 높은 해커톤중에 하나였습니다.
                                    OCR을 이용해 영수증을 촬영하면 자동으로 사용 내역을 입력해주는 앱을 만들었습니다.
                                </li>
                            </ul>
                        </Typography.Text>
                    </TabContentWrapper>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Extracurricular Activities" key="activities">
                    <TabContentWrapper alignItems="flex-start">
                        <Typography.Text>💛 English version comming soon!</Typography.Text>
                        <Typography.Title level={4}>베트남 봉사활동</Typography.Title>
                        <Typography.Text>
                            <ul>
                                <li>2017.07.03 ~ 2017.07.14</li>
                                <li>활동: 노력봉사 및 현지 중등 교사 대상 코딩교육</li>
                                <li>
                                    결과
                                    <ul>
                                        <li>현지 중등 교사 대상으로 엔트리와 코드이노를 활용한 커리큘럼 교육</li>
                                        <li>10일간의 수업 커리큘럼을 직접 만들어 교육하며, 실제 선생님들의 긍정적인 피드백</li>
                                        <li>교육 시설, 환경 등을 정비하고, 청소, 페인트칠, 문화교류 등 활동</li>
                                    </ul>
                                </li>
                                <li>
                                    추가설명: 국민대학교에서 진행한 해외 봉사활동에 참여할 수 있는 소중한 기회를 얻게 되어, 소프트웨어 교육과 노력봉사를 진행하였습니다.
                                    의사소통이 원활하지 않아, 현지 선생님들과 어떻게 하면 효과적으로 수업 내용을 전달할 수 있을지에 대해 깊은 고민을 하며 수업 커리큘럼을 구성할 수 있었던 소중한 시간이었습니다.
                                </li>
                            </ul>
                        </Typography.Text>
                        <Typography.Title level={4}>Software Maestro 7기</Typography.Title>
                        <Typography.Text>
                            <ul>
                                <li>2016.07 ~ 2017.06</li>
                                <li>1단계 및 2단계 연수생으로 활동</li>
                                <li>
                                    1단계 프로젝트 - Golfit
                                    <ul>
                                        <li>발 압력 측정 및 교정 프로젝트</li>
                                        <li>안드로이드 앱 개발</li>
                                        <li>
                                            결과
                                            <ul>
                                                <li>임베디드 개발에 대해 간단하게나마 공부할 수 있었던 프로젝트입니다.</li>
                                                <li>임베디드 기기와 블루투스 LE를 이용하여 통신을 구현할 수 있었습니다.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    2단계 프로젝트 - Squirrel
                                    <ul>
                                        <li>손을 덜 쓰고 브라우징을 할 수 있게 도와주는 크롬 익스텐션</li>
                                        <li>익스텐션 및 백엔드 서버 개발</li>
                                        <li>
                                            결과
                                            <ul>
                                                <li>익스텐션에서 수집한 데이터를 분석하기 위해 기계학습을 스터디하였습니다.</li>
                                                <li>Circle CI, Jenkins 와 같은 CI/CD 도구를 적용해봤습니다.</li>
                                                <li>실제 크롬 익스텐션을 배포하여 유저들의 브라우징 데이터를 수집하고, 실제 데이터 분석을 시도했습니다.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </Typography.Text>
                    </TabContentWrapper>
                </Tabs.TabPane>
            </Tabs>
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
