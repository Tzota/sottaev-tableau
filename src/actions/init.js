// @flow
import {Actions} from '../constants';
import type {TAction} from '../types';
import {forward} from '../utils/history';
import SizedStack from '../utils/SizedStack';

export type TInit = {
    seconds: number,
};

const findLevel = (history: SizedStack, level = 0) => {
    if (level === 2) {
        return level;
    }

    const val = history.get(level);

    if (!val || val.length < 1) {
        return level;
    }

    const keyCode: string = val[0];
    if (keyCode.startsWith('Digit')) {
        return findLevel(history, level + 1);
    }

    return level;
};

const multipliers = [60, 10, 1];

// Установить начало отсчета
export const init = (num: number, history: SizedStack, current: number): TAction<TInit> => {

    const level = findLevel(history);
    console.log(`level: ${level}`);
    console.log(history);

    const parts = [
        Math.floor(current / 60),
        Math.floor((current % 60) / 10),
        current % 10,
    ];

    if (level === 1 && num > 5) {
        num = 5;
    }

    parts[level] = num;

    const secs = parts.reduce((acc, o, i) => acc + o * multipliers[i], 0);

    forward();

    return {
        type: Actions.INIT_COUNTER,
        payload: {
            seconds: secs,
        },
    };
};
