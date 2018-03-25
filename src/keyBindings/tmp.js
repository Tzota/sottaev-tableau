import {merge} from 'ramda';


import store from '../store';
import {logString} from '../actions';

export const logkeys = (e, keystore) => store.dispatch(
    logString(
        JSON.stringify(
            merge(
                {code: e.code},
                keystore,
            ),
            null,
            4
        )
    )
);
