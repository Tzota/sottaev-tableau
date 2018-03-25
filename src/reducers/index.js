// @flow

import {Actions as A, Status as StatusConst} from '../constants';
import type {TStatus, TAction, TKeyStore, TPoints} from '../types';
import {pathOr} from 'ramda';
import store from '../store';
import SizedStack from '../utils/SizedStack';

export const status = (status: TStatus, action: TAction<*>) => {
    switch(action.type) {
        case A.TOGGLE_COUNTDOWN:
            return status === StatusConst.PAUSED ? StatusConst.RUNNING : StatusConst.PAUSED;
        case A.RESET:
            return StatusConst.PAUSED;
        default:
            return status || StatusConst.PAUSED;
    }
};

export const seconds = (seconds: number, action: TAction<*>) => {
    switch(action.type) {
        case A.INIT_COUNTER:
            return action.payload.seconds;
        case A.RESET:
            return 120;
        case A.TICK:
            // hmmm...
            const gong: HTMLAudioElement = ((document.getElementById('gong'): any): HTMLAudioElement);
            const hammer: HTMLAudioElement = ((document.getElementById('hammer'): any): HTMLAudioElement);
            if (gong && seconds === 1) gong.play();
            if (hammer && seconds === 11) hammer.play();
            return seconds > 0 ? seconds - 1 : 0;
        default:
            return seconds || 120;
    }
};

export const logString = (line: string, action: TAction<*>) => {
    switch(action.type) {
        case A.LOG_STRING:
            return action.payload;
        default:
            return line || '';
    }
};

export const keyStore = (keyStore: TKeyStore, action: TAction<*>) => {
    switch(action.type) {
        case A.CHANGE_MODIFIER:
            return action.payload;
        default:
            return keyStore || {
                isRight: false,
                isLeft: false,
                chord: '',
            };
    }
};

export const round = (round: number, action: TAction<*>) => {
    switch(action.type) {
        case A.ROUND_NUMBER:
        return action.payload.round;
        case A.RESET:
        return 1;
        case A.HISTORY_BACK:
            return pathOr(round, ['round'], action.payload);
        default:
            return round || 1;
    }
};

const points = ([atPoints, atForbidden, atOut, atNonsport, atOtherForbidden, atOtherOut, atOtherNonsport], color, otherColor) => (dataset: TPoints, action: TAction<*>) => {
    switch(action.type) {
        case atPoints:
            return {
                ...dataset,
                points: action.payload.points,
            };
        case atForbidden:
            return {
                ...dataset,
                forbidden: action.payload.forbidden,
            };
        case atOut:
            return {
                ...dataset,
                out: action.payload.out,
            };
        case atNonsport:
            return {
                ...dataset,
                nonsport: action.payload.nonsport,
            };
        case atOtherForbidden:
            return (action.payload.forbidden > 1) ? { ...dataset, points: dataset.points + 1} : dataset;
        case atOtherOut:
            return (action.payload.out > 1) ? { ...dataset, points: dataset.points + 1} : dataset;
        case atOtherNonsport:
            return (action.payload.nonsport > 1) ? { ...dataset, points: dataset.points + 1} : dataset;
        case A.RESET:
            return {
                points: 0,
                forbidden: 0,
                out: 0,
                nonsport: 0,
            };
        case A.HISTORY_BACK:
            return pathOr(dataset, [color], action.payload);
        case A.SWAP_CORNERS:
            return store.getState()[otherColor]; // hmmm...
        default:
            return dataset || {
                points: 0,
                forbidden: 0,
                out: 0,
                nonsport: 0,
            };
    }
};

export const red = points([
    A.RED_POINTS,
    A.RED_FORBIDDEN, A.RED_OUT, A.RED_NONSPORT,
    A.BLUE_FORBIDDEN, A.BLUE_OUT, A.BLUE_NONSPORT,
], 'red', 'blue');
export const blue = points([
    A.BLUE_POINTS,
    A.BLUE_FORBIDDEN, A.BLUE_OUT, A.BLUE_NONSPORT,
    A.RED_FORBIDDEN, A.RED_OUT, A.RED_NONSPORT,
], 'blue', 'red');

export const redIsLeft = (redIsLeft: boolean, action: TAction<*>) => {
    switch(action.type) {
        case A.SWAP_CORNERS:
            return !redIsLeft;
        case A.HISTORY_BACK:
            return pathOr(redIsLeft, ['redIsLeft'], action.payload);
        default:
            return !!redIsLeft;
    }
};

export const history = (history: Array<*>, action: TAction<*>) => {
    switch(action.type) {
        case A.HISTORY_BACK:
            return history.slice(0, history.length - 1);
        case A.HISTORY_FORWARD:
            return history.concat([action.payload]);
        default:
            return history || [];
    }
};

export const keyStoreHistory = (keyStoreHistory: SizedStack, action: TAction<*>) => {
    switch(action.type) {
        case A.STORE_KEYS_HISTORY:
            keyStoreHistory.push(action.payload);
            return keyStoreHistory;
        default:
            return keyStoreHistory || new SizedStack(3);
    }
};
