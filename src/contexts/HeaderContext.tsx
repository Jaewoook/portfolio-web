import React from "react";

export interface HeaderContext {
    show: boolean;
    setShow: (show: boolean) => void;
}

const defaultValue: HeaderContext = {
    show: true,
    setShow: () => {},
};

export const HeaderContext = React.createContext(defaultValue);
