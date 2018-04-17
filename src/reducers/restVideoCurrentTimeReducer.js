import { VIDEO_CURRENT_TIME } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case VIDEO_CURRENT_TIME:
            return action.payload;
        default:
            return state;
    }
}
