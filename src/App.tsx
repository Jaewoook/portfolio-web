import "antd/dist/antd.css";
import React from "react";
import { Layout } from "./components";
import { Hero } from "./pages";
import { HeaderContext } from "./contexts";
import { log } from "./utils";

interface State {
    headerContext: HeaderContext;
}

class App extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.state = {
            headerContext: {
                show: true,
                setShow: this.handleSetShow,
            }
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

    render() {
        return (
            <HeaderContext.Provider value={this.state.headerContext}>
                <Layout>
                    <Hero />
                </Layout>
            </HeaderContext.Provider>
        );
    }
}

export default App;
