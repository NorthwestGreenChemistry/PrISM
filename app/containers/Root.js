// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import type { Store } from '../reducers/types';
import Routes from '../Routes';
import Data from "../components/Data";

type Props = {
    store: Store,
    history: {}
};

export default class Root extends Component<Props> {
    constructor(props) {
        super(props);
        this.data = new Data();
    }

    async componentDidMount() {
        await this.data.initialize();
    }

    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        );
    }
}
