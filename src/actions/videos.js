import axios from 'axios';
import { VIDEO_LIST, VIDEO_LIST_ERROR, VIDEO_CURRENT_TIME } from './types';
import { createURL } from '../components/utils/Constants';

export const getVideoList = () => async dispatch => {
    await axios
        .get(createURL('api/video/'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: VIDEO_LIST,
                    payload: {
                        videos: response.data.data,
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: VIDEO_LIST_ERROR,
                error: error.response
            });
        });
};

export const setCurrentTime = currentTime => async dispatch => {
    dispatch({
        type: VIDEO_CURRENT_TIME,
        payload: {
            currentTime: currentTime
        }
    });
};
