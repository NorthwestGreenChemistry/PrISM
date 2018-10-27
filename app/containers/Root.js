// @flow
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Routes from '../Routes';

type Props = {
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
