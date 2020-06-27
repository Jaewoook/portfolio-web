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
} from "styled-system";
import { Typography } from "antd";
import Draggable from "react-draggable";

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
    background-color: #333;
    animation: ${zoomIn} 0.15s ease-in-out;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 20px 68px;
`;

const StatusBarWrapper = styled.div`
    width: 100%;
    height: 24px;
    position: relative;
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

const StatusBar: React.FC = ({ children }) => {
    return (
        <StatusBarWrapper>
            <div className="statusbar close"></div>
            <div className="statusbar min"></div>
            <div className="statusbar max"></div>
            <Typography.Text >{children}</Typography.Text>
        </StatusBarWrapper>
    );
};

type Props = ContainerProps & {
    title?: string;
    hideStatusBar?: boolean;
    children?: React.ReactNode;
};

export const WindowFrame: React.FC<Props> = (props) => {
    const { title, hideStatusBar, children, ...styles } = props;
    return (
        <Draggable>
            <Container {...styles}>
                {!hideStatusBar ? <StatusBar>
                    {title}
                </StatusBar> : null}
                {children}
            </Container>
        </Draggable>
    );
};

WindowFrame.defaultProps = {
    width: 300,
    height: 500,
    top: "2%0",
    left: "10%",
    position: ["static", "absolute", "absolute"],
}
