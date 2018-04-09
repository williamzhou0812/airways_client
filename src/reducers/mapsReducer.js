import { MAPS_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case MAPS_LIST:
            return action.payload;
        default:
            return state;
    }
}
