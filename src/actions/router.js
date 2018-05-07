import { push } from 'react-router-redux';
import { DISPLAY_BACK_BUTTON } from './types';

export const navigateTo = location => dispatch => {
    dispatch(push(location));
};

export const setBackButton = (location, display) => dispatch => {
    dispatch({
        type: DISPLAY_BACK_BUTTON,
        payload: {
            location: location,
            display: display
        }
    });
};
