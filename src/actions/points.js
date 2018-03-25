// @flow

import {Actions} from '../constants';
import pointsCreator from './pointsCreator';

const {
    RED_POINTS,
    BLUE_POINTS,
    RED_FORBIDDEN,
    BLUE_FORBIDDEN,
    RED_OUT,
    BLUE_OUT,
    RED_NONSPORT,
    BLUE_NONSPORT,
} = Actions;

const points = pointsCreator('points');
const forbidden = pointsCreator('forbidden');
const out = pointsCreator('out');
const nonsport = pointsCreator('nonsport');

export const redPoints = points(RED_POINTS);
export const bluePoints = points(BLUE_POINTS);
export const redForbidden = forbidden(RED_FORBIDDEN);
export const blueForbidden = forbidden(BLUE_FORBIDDEN);
export const redOut = out(RED_OUT);
export const blueOut = out(BLUE_OUT);
export const redNonSport = nonsport(RED_NONSPORT);
export const blueNonSport = nonsport(BLUE_NONSPORT);

