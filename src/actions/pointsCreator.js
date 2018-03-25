// @flow

import type {TAction, TActionType} from '../types';
import {forward} from '../utils/history';

type TPointEntity = {[string]: number};

type TPointFactory = string => TActionType => number => TAction<TPointEntity>;

const pointsCreator: TPointFactory = name => type => points => forward() || ({
    type,
    payload: {
        [name]: points,
    },
});

export default pointsCreator;
