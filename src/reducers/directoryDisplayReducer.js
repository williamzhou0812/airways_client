import { DIRECTORY_DISPLAY_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case DIRECTORY_DISPLAY_LIST:
            return action.payload;
        default:
            return state;
    }
}
