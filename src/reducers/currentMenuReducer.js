import { CURRENT_MENU } from "../actions/types";

export default function(state = {}, action) {
    switch (action.type) {
        case CURRENT_MENU:
            return action.payload;
        default:
            return state;
    }
}
