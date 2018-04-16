import { VIDEO_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case VIDEO_LIST:
            return action.payload;
        default:
            return state;
    }
}
