import { SELECTED_DIRECTORY_DISPLAY } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SELECTED_DIRECTORY_DISPLAY:
            return action.payload;

        default:
            return state;
    }
}
