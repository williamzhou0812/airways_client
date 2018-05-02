import axios from 'axios';
import { DIRECTORY_DISPLAY_LIST, DIRECTORY_DISPLAY_LIST_ERROR } from './types';
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
