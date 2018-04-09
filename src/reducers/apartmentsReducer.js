import { APARTMENTS_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case APARTMENTS_LIST:
            return action.payload;
        default:
            return state;
    }
}
