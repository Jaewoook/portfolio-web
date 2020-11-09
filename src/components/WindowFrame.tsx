import React from "react";
import styled, { css, keyframes } from "styled-components/macro";
import {
    width, WidthProps,
    height, HeightProps,
    maxHeight, MaxHeightProps,
    top, TopProps,
    right, RightProps,
    bottom, BottomProps,
    left, LeftProps,
    position, PositionProps,
    flexDirection, FlexDirectionProps,
    alignItems, AlignItemsProps,
    justifyContent, JustifyContentProps,
    padding, PaddingProps,
    margin, MarginProps,
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

type ContainerProps = WidthProps & HeightProps & MaxHeightProps
                    & MarginProps & PositionProps
                    & TopProps & RightProps & BottomProps & LeftProps;

const Container = styled.div<ContainerProps>`
    ${width}
    ${height}
    ${maxHeight}
    ${position}
    ${top}
    ${right}
    ${bottom}
    ${left}
    ${zIndex}
    ${margin}
    background-color: #333;
    animation: ${zoomIn} 0.15s ease-in-out;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 20px 68px;
    transition: max-height 0.15s ease-in-out;
`;

export const scrollbarStyle = css`
    ::-webkit-scrollbar {
        width: 8px;
        background: none;
    }
	::-webkit-scrollbar-thumb {
	    background-color: rgba(0, 0, 0, 0.2);
        background-clip: padding-box;
        border: 2px solid transparent;
        border-radius: 4px;
	}
	::-webkit-scrollbar-track {
	    background: none;
	}
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 8px;
        background: none;
    }
    padding-top: 24px;
    ${scrollbarStyle}
`;

interface ActiveProps {
    active: boolean;
}

const StatusBarWrapper = styled.div.attrs({ className: "window-frame-draggable-area" })`
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
    background-color: inherit;
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

const DraggableArea = styled.div.attrs({ className: "window-frame-draggable-area" })`
    width: 100%;
    height: 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

export const InfoWrapper = styled.div<FlexDirectionProps & AlignItemsProps & JustifyContentProps & PaddingProps>`
    width: 100%;
    height: 100%;
    display: flex;
    ${flexDirection}
    ${alignItems}
    ${justifyContent}
    ${padding}
    .ant-typography {
        color: white;
    }
    a.ant-typography {
        color: #1890ff;
    }
    h2 {
        margin: 0 !important;
    }
`;

InfoWrapper.defaultProps = {
    alignItems: "center",
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
        <Draggable handle=".window-frame-draggable-area" onMouseDown={handleActive}>
            <Container {...styles} zIndex={zIndex}>
                {!hideStatusBar ? <StatusBar onCloseClick={() => setShow(false)}>
                    {title}
                </StatusBar> : <DraggableArea />}
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
    my: ["18px", 0],
};
