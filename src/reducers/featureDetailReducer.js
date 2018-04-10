import { FEATURE_DETAIL } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case FEATURE_DETAIL:
            return action.payload;
        default:
            return state;
    }
}
