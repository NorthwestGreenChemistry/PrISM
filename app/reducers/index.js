// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import currentStep from './currentStep';

export default function createRootReducer(history: {}) {
    const routerReducer = connectRouter(history)(() => {});

    return connectRouter(history)(
        combineReducers({ router: routerReducer, currentStep })
    );
}
