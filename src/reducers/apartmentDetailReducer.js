import { APARTMENT_DETAIL } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case APARTMENT_DETAIL:
            return action.payload;
        default:
            return state;
    }
}
