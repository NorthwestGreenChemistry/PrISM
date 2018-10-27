import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type currentStepStateType = {
    +currentStep: number
};

export type Action = {
    +type: string
};

export type GetState = () => currentStepStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
