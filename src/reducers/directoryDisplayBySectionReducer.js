import {
    DIRECTORY_DISPLAY_LIST_BY_SECTION,
    DIRECTORY_DISPLAY_LIST_ERROR
} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case DIRECTORY_DISPLAY_LIST_BY_SECTION:
            return action.payload;
        case DIRECTORY_DISPLAY_LIST_ERROR:
            return action.payload;
        default:
            return state;
    }
}
