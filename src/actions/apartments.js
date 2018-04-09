import axios from 'axios';
import { APARTMENTS_LIST, APARTMENTS_LIST_ERROR } from './types';
import { createURL } from '../components/utils/Constants';

export const getApartmentList = () => async dispatch => {
    await axios
        .get(createURL('api/apartment/'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: APARTMENTS_LIST,
                    payload: {
                        apartments: response.data.data,
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: APARTMENTS_LIST_ERROR,
                error: error.response
            });
        });
};
