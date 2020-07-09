import React from "react";
import styled, { keyframes } from "styled-components/macro";
import {
    width, WidthProps,
    height, HeightProps,
    top, TopProps,
    right, RightProps,
    bottom, BottomProps,
    left, LeftProps,
    position, PositionProps,
    flexDirection, FlexDirectionProps,
    padding, PaddingProps,
    zIndex,
} from "styled-system";
import { Typography } from "antd";
import Draggable from "react-draggable";
import { WindowContext } from "../contexts";

const zoomIn = keyframes`
    from {
        transform: scale(0.4);
        opacity: 0.6;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

type ContainerProps = WidthProps & HeightProps & PositionProps & TopProps & RightProps & BottomProps & LeftProps;

const Container = styled.div<ContainerProps>`
    ${width}
    ${height}
    ${position}
    ${top}
    ${right}
    ${bottom}
    ${left}
    ${zIndex}
    background-color: #333;
    animation: ${zoomIn} 0.15s ease-in-out;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 20px 68px;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-top: 24px;
`;

const StatusBarWrapper = styled.div`
    width: 100%;
    height: 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > span {
        color: white;
        font-size: 12px;
    }
    .statusbar {
        width: 12px;
        height: 12px;
        position: absolute;
        border-radius: 6px;
        top: 6px;
    }
    .statusbar.close {
        left: 12px;
        background-color: rgb(237, 101, 90);
    }
    .statusbar.min {
        left: 32px;
        background-color: rgb(225, 192, 76);
    }
    .statusbar.max {
        left: 52px;
        background-color: rgb(102, 108, 116);
    }
`;

interface StatusBarProps {
    onCloseClick: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ children, onCloseClick }) => {
    return (
        <StatusBarWrapper>
            <div className="statusbar close" onClick={onCloseClick}></div>
            <div className="statusbar min"></div>
            <div className="statusbar max"></div>
            <Typography.Text >{children}</Typography.Text>
        </StatusBarWrapper>
    );
};

export const InfoWrapper = styled.div<FlexDirectionProps & PaddingProps>`
    width: 100%;
    height: 100%;
    display: flex;
    ${flexDirection}
    align-items: center;
    ${padding}
    .ant-typography {
        color: white;
    }
    h2 {
        margin: 0 !important;
    }
`;

InfoWrapper.defaultProps = {
    paddingTop: "24px",
    paddingRight: "18px",
    paddingBottom: "24px",
    paddingLeft: "18px",
};

type Props = ContainerProps & {
    title?: string;
    hideStatusBar?: boolean;
    children?: React.ReactNode;
};

export const WindowFrame: React.FC<Props> = (props) => {
    const { title, hideStatusBar, children, ...styles } = props;
    const windowContext = React.useContext(WindowContext.Context);
    const [show, setShow] = React.useState(true);
    const [zIndex, setZIndex] = React.useState(0);

    const handleActive = React.useCallback(() => {
        windowContext.setTopWindow(title ?? "");
    }, [windowContext, title]);

    React.useEffect(() => {
        const newZIndex = windowContext.windows.indexOf(title ?? "");
        setZIndex(newZIndex);
    }, [windowContext.windows, title, setZIndex]);
    return show ? (
        <Draggable onMouseDown={handleActive}>
            <Container {...styles} zIndex={zIndex}>
                {!hideStatusBar ? <StatusBar onCloseClick={() => setShow(false)}>
                    {title}
                </StatusBar> : null}
                <Wrapper>
                    {children}
                </Wrapper>
            </Container>
        </Draggable>
    ) : null;
};

WindowFrame.defaultProps = {
    width: 300,
    height: 500,
    top: "20%",
    left: "10%",
    position: ["static", "absolute"],
}
