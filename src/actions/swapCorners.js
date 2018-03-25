import {Actions} from '../constants';
import {forward} from '../utils/history';

export const swapCorners = () => forward() || ({
    type: Actions.SWAP_CORNERS,
})
