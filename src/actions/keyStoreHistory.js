import {Actions} from '../constants';

export const keyStoreHistory = (payload) => ({
    type: Actions.STORE_KEYS_HISTORY,
    payload,
});
