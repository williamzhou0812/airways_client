import axios from 'axios';
import { FEATURES_LIST, FEATURES_LIST_ERROR, FEATURE_DETAIL } from './types';
import { createURL } from '../components/utils/Constants';
import _ from 'lodash';

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

export const getSelectedFeatureDetail = (id, featureList) => dispatch => {
    const featureDetailID = parseInt(id, 10);

    const selectedFeatureDetail = _.find(featureList, o => {
        return o.id === featureDetailID;
    });

    let [data, responseStatus] = [null, 404];

    if (selectedFeatureDetail) {
        data = selectedFeatureDetail;
        responseStatus = 200;
        dispatch({
            type: FEATURE_DETAIL,
            payload: {
                feature: data,
                status: responseStatus
            }
        });
    }
};
