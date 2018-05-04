import { SELECTED_SECTION_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case SELECTED_SECTION_LIST:
            return action.payload;
        default:
            return state;
    }
}
