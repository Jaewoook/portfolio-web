/**
 * External modules
 */
import React from "react";
import "antd/dist/antd.min.css";

/**
 * Internal modules
 */
import "./App.css";
import { Layout } from "./components";
import { Hero, Main } from "./pages";
import { HeaderContext } from "./contexts";
import { log } from "./utils";

interface State {
    headerContext: HeaderContext;
    currentPage: string;
}

class App extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.state = {
            headerContext: {
                show: true,
                setShow: this.handleSetShow,
            },
            currentPage: "hero",
        };
    }

    handleSetShow = (show: boolean) => {
        log.v("set show called. show: ", show);
        this.setState((state) => ({
            ...state,
            headerContext: {
                ...state.headerContext,
                show,
            }
        }));
    }

    handleEnter = () => {
        this.setState({ currentPage: "main" });
    }

    render() {
        const { currentPage } = this.state;
        return (
            <HeaderContext.Provider value={this.state.headerContext}>
                <Layout>
                    {currentPage === "hero" ? <Hero onEnter={this.handleEnter} /> : null}
                    {currentPage === "main" ? <Main /> : null}
                </Layout>
            </HeaderContext.Provider>
        );
    }
}

export default App;
