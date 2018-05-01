import axios from 'axios';
import { PROMOTION_LIST, PROMOTION_LIST_ERROR } from './types';
import { createURL } from '../components/utils/Constants';

export const getPromotionList = () => async dispatch => {
    await axios
        .get(createURL('api/promotion'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: PROMOTION_LIST,
                    payload: {
                        promotion: response.data.data,
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: PROMOTION_LIST_ERROR,
                error: error.response
            });
        });
};
