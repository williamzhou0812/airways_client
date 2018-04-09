import { push } from 'react-router-redux';

export const navigateTo = location => dispatch => {
    dispatch(push(location));
};
