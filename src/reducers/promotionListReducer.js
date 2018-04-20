import { PROMOTION_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case PROMOTION_LIST:
            return action.payload;
        default:
            return state;
    }
}
