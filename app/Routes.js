/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PrismPage from './containers/PrismPage';


export default () => (
    <App>
        <Switch>
            <Route path={routes.PRISM} component={PrismPage} />
            <Route path={routes.HOME} component={HomePage} />
        </Switch>
    </App>
);
