import axios from 'axios';
import {
    SECTION_LIST,
    SECTION_LIST_ERROR,
    SELECTED_SECTION_LIST
} from './types';
import { createURL } from '../components/utils/Constants';

export const getSectionList = () => async dispatch => {
    await axios
        .get(createURL('api/section'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: SECTION_LIST,
                    payload: {
                        sections: response.data.data,
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: SECTION_LIST_ERROR,
                error: error.response
            });
        });
};

export const setSelectedSection = sectionList => dispatch => {
    dispatch({
        type: SELECTED_SECTION_LIST,
        payload: {
            sections: sectionList,
            status: 200
        }
    });
};
