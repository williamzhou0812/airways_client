import { GALLERY_LIST } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case GALLERY_LIST:
            return action.payload;
        default:
            return state;
    }
}
