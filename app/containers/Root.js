// @flow
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Routes from '../Routes';
import Data from "../components/Data";

type Props = {
    history: {}
};

export default class Root extends Component<Props> {
    constructor(props) {
        super(props);
        this.data = new Data();
    }

    render() {
        const { history } = this.props;
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        );
    }
}
