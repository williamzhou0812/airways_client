import axios from 'axios';
import {
    APARTMENTS_LIST,
    APARTMENTS_LIST_ERROR,
    APARTMENT_DETAIL
} from './types';
import { createURL } from '../components/utils/Constants';
import _ from 'lodash';

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

export const getSelectedApartmentDetail = (id, apartmentList) => dispatch => {
    const apartmentDetailID = parseInt(id, 10);
    const selectedApartmentDetail = _.find(apartmentList, o => {
        return o.id === apartmentDetailID;
    });
    let [data, responseStatus] = [null, 404];

    if (selectedApartmentDetail) {
        data = selectedApartmentDetail;
        responseStatus = 200;
        dispatch({
            type: APARTMENT_DETAIL,
            payload: {
                apartment: data,
                status: responseStatus
            }
        });
    }
};
