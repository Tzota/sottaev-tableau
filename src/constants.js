// @flow

import SizedStack from './utils/SizedStack';

export const Actions  = {
    RESET: 'RESET',
    INIT_COUNTER: 'INIT_COUNTER',
    TICK: 'TICK',
    TOGGLE_COUNTDOWN: 'TOGGLE_COUNTDOWN',
    LOG_STRING: 'LOG_STRING',
    CHANGE_MODIFIER: 'CHANGE_MODIFIER',
    ROUND_NUMBER: 'ROUND_NUMBER',
    RED_POINTS: 'RED_POINTS',
    BLUE_POINTS: 'BLUE_POINTS',
    RED_FORBIDDEN: 'RED_FORBIDDEN',
    BLUE_FORBIDDEN: 'BLUE_FORBIDDEN',
    RED_OUT: 'RED_OUT',
    BLUE_OUT: 'BLUE_OUT',
    RED_NONSPORT: 'RED_NONSPORT',
    BLUE_NONSPORT: 'BLUE_NONSPORT',
    SWAP_CORNERS: 'SWAP_CORNERS',
    HISTORY_FORWARD: 'HISTORY_FORWARD',
    HISTORY_BACK: 'HISTORY_BACK',
    STORE_KEYS_HISTORY: 'STORE_KEYS_HISTORY',
};

export const Status = {
    RUNNING: 'RUNNING',
    PAUSED: 'PAUSED',
};

export const KeyCode = {
    leftCode: 'ControlLeft',
    rightCode: 'ControlRight',
};

export const chords = [
    'KeyH', // Раунд
    'Comma', // Баллы
    'KeyP', // Запрещенная техника
    'KeyD', // Выход за пределы
    'KeyY', // Неспортивное поведение
];

export const initialState = {
    status: Status.PAUSED,
    seconds: 2 * 60,
    keyStore: {
        isRight: false,
        isLeft: false,
        chord: '',
    },
    redIsLeft: true,
    round: 1,
    red: {
        points: 0,
        forbidden: 0,
        out: 0,
        nonsport: 0,
    },
    blue: {
        points: 0,
        forbidden: 0,
        out: 0,
        nonsport: 0,
    },
    history: [],
    keyStoreHistory: new SizedStack(3),
};
