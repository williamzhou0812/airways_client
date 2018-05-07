import { DISPLAY_BACK_BUTTON } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case DISPLAY_BACK_BUTTON:
            return action.payload;
        default:
            return state;
    }
}
