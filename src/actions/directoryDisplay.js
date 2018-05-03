import axios from 'axios';
import {
    DIRECTORY_DISPLAY_LIST,
    DIRECTORY_DISPLAY_LIST_ERROR,
    DIRECTORY_DISPLAY_LIST_BY_SECTION
} from './types';
import { createURL } from '../components/utils/Constants';
import _ from 'lodash';

export const getDirectoryDisplayList = () => async dispatch => {
    await axios
        .get(createURL('api/directory_display'))
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: DIRECTORY_DISPLAY_LIST,
                    payload: {
                        directory_displays: _.groupBy(
                            response.data.data,
                            directoryDisplay => {
                                return directoryDisplay.section.data.id;
                            }
                        ),
                        status: response.status
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: DIRECTORY_DISPLAY_LIST_ERROR,
                error: error.response
            });
        });
};

export const getDirectoryDisplayListBySection = directoryDisplayListBySection => dispatch => {
    if (!_.isEmpty(directoryDisplayListBySection)) {
        dispatch({
            type: DIRECTORY_DISPLAY_LIST_BY_SECTION,
            payload: {
                directory_displays: directoryDisplayListBySection,
                status: 200
            }
        });
    } else {
        dispatch({
            type: DIRECTORY_DISPLAY_LIST_ERROR,
            payload: {
                directory_displays: DIRECTORY_DISPLAY_LIST_ERROR,
                status: 404
            }
        });
    }
};
