import { CURRENT_MENU } from "./types";

export const setCurrentMenu = current_menu => dispatch => {
    dispatch({
        type: CURRENT_MENU,
        payload: {
            current_menu: current_menu
        }
    });
};
