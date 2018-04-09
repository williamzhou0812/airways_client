import axios from 'axios';
import { GALLERY_LIST, GALLERY_LIST_ERROR } from './types';
import { createURL } from '../components/utils/Constants';

export const getGalleryList = () => async dispatch => {
    await axios
        .get(createURL('api/gallery/'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: GALLERY_LIST,
                    payload: {
                        gallery: response.data.data,
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: GALLERY_LIST_ERROR,
                error: error.response
            });
        });
};
