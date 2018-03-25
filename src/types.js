// @flow

import {Status, Actions} from './constants';

export type TStatus = $Keys<typeof Status>;

export type TKeyStore = {
    isRight: boolean,
    isLeft: boolean,
    chord: string,
};

export type TActionType = $Keys<typeof Actions>;

export type TAction<T = *> = {
    type: TActionType,
    payload: T,
};

export type TPoints = {
    points: number,
    forbidden: number,
    out: number,
    nonsport: number,
};

export type TState = {
    seconds: number,
    status: TStatus,
    keyStore: TKeyStore,
    round: number,
    red: TPoints,
    blue: TPoints,
};
