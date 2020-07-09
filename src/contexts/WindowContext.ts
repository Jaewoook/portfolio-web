import React from "react";

export interface WindowContext {
    windows: string[];
    currentTop: string;
    setTopWindow: (key: string) => void;
}

const defaultValue: WindowContext = {
    windows: [],
    currentTop: "",
    setTopWindow: () => {},
};

const Context = React.createContext(defaultValue)

export const WindowContext = {
    Context,
    defaultValue,
};
