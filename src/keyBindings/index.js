// @flow
import {path} from 'ramda';

import {supressKeys} from './utils';
import {logkeys} from './tmp';
import store from '../store';
import stateMachine from './stateMachine';
import {changeModifiers, tick, keyStoreHistory, toggleCountdown} from '../actions';
import type {TState} from '../types';
import {Status} from '../constants';


const cntrlState: (TState => string[]) = ({keyStore}) => {
    const path = [];
    if (keyStore.isRight) path.push('isRight');
    if (keyStore.isLeft) path.push('isLeft');
    path.push(keyStore.chord ? keyStore.chord : 'none');
    return path;
};

document.addEventListener('keydown', supressKeys);
document.addEventListener('keyup', supressKeys);


document.addEventListener('keydown', (e: KeyboardEvent) => {
    const state = store.getState();
    store.dispatch(changeModifiers(e, state.keyStore));
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
    const state: TState = store.getState();
    store.dispatch(changeModifiers(e, state.keyStore));

    const chordsState = cntrlState(state);
    const statePath = [e.code, ...chordsState].filter(Boolean);
    const actionCreator = path(statePath, stateMachine);
    logkeys(e, store.getState().keyStore);
    if (actionCreator) {
        store.dispatch(actionCreator());
    }
    store.dispatch(keyStoreHistory(statePath));
});

const onTick = () => {
    const state: TState = store.getState();
    if(state.status !== Status.PAUSED) {
        store.dispatch(tick());
        if (store.getState().seconds === 0) {
            store.dispatch(toggleCountdown());
        }
    }
    // console.log(state.status);
};

setInterval(onTick, 1000);
