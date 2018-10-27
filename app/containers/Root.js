// @flow
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
    // store: Store,
    history: {}
};

export default class Root extends Component<Props> {
    render() {
        const { history } = this.props;
        return (
            <BrowserRouter>
                    <Routes />
            </BrowserRouter>
        );
    }
}
