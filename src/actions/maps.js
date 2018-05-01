import axios from 'axios';
import { MAPS_LIST, MAPS_LIST_ERROR } from './types';
import { createURL } from '../components/utils/Constants';

export const getMapList = () => async dispatch => {
    await axios
        .get(createURL('api/map'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: MAPS_LIST,
                    payload: {
                        maps: response.data.data,
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: MAPS_LIST_ERROR,
                error: error.response
            });
        });
};
