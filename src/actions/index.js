// @flow

import {Actions, KeyCode, chords} from '../constants';
import type {TAction, TKeyStore} from '../types';
import {forward} from '../utils/history';

export const reset = () => forward() || ({
    type: Actions.RESET,
});


export const tick = () => ({
    type: Actions.TICK,
})

export const toggleCountdown = () => ({
    type: Actions.TOGGLE_COUNTDOWN,
});

export const logString = (line: string): TAction<string> => ({
    type: Actions.LOG_STRING,
    payload: line,
});

/** Левый или правый cntrl */
const isModifier = (code: string) => Object.values(KeyCode).includes(code);
/** Первая клавиша аккорда */
const isChord = (code: string) => chords.includes(code);

// Отреагировать на измнение управляющих кнопок
export const changeModifiers = ({type, code}: KeyboardEvent, current: TKeyStore) => {
    if (!isModifier(code) && !isChord(code)) {
        return {type: Actions.CHANGE_MODIFIER, payload: current};
    }
    if (type === 'keydown') {
        return {
            type: Actions.CHANGE_MODIFIER,
            payload: {
                isRight: current.isRight || (code === KeyCode.rightCode),
                isLeft: current.isLeft || (code === KeyCode.leftCode),
                chord: isChord(code) ? code : '',
            },
        };
    }
    if (type === 'keyup') {
        return {
            type: Actions.CHANGE_MODIFIER,
            payload: {
                isRight: (code === KeyCode.rightCode) ? false : current.isRight,
                isLeft: (code === KeyCode.leftCode) ? false : current.isLeft,
                chord: isModifier(code) ? '' : current.chord,
            },
        };
    }

    return {type: Actions.CHANGE_MODIFIER, payload: current};
};


export type TRoundNumber = {
    round: number,
};

export const round = (round: number): TAction<TRoundNumber> => forward() || ({
    type: Actions.ROUND_NUMBER,
    payload: {
        round,
    },
});

export * from './points';
export {swapCorners} from './swapCorners';
export {historyBack, historyForward} from './history';
export {init} from './init';
export {keyStoreHistory} from './keyStoreHistory';
