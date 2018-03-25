// @flow
import {pick} from 'ramda';
import store from '../store';
import {historyForward} from '../actions/history';

export const forward = () => {
    store.dispatch(
        historyForward(
            storeToHistory()
        )
    );
};

const storeToHistory = () => {
    const state = store.getState();

    return pick([
        'seconds',
        'redIsLeft',
        'round',
        'red',
        'blue',
    ], state);
};
