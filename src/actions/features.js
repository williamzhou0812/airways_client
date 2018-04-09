import axios from 'axios';
import { FEATURES_LIST, FEATURES_LIST_ERROR } from './types';
import { createURL } from '../components/utils/Constants';

export const getFeatureList = () => async dispatch => {
    await axios
        .get(createURL('api/feature/'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: FEATURES_LIST,
                    payload: {
                        features: response.data.data,
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: FEATURES_LIST_ERROR,
                error: error.response
            });
        });
};
