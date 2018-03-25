import store from '../store';
import {Actions} from '../constants';
import {last} from 'ramda';

export const historyBack = () => {
    const {history}: TState = store.getState();

    return {
        type: Actions.HISTORY_BACK,
        payload: last(history),
    }
};

export const historyForward = (payload) => ({
    type: Actions.HISTORY_FORWARD,
    payload,
});
