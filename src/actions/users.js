import {
    LIST_USERS
} from "./types";

import userService from "../services/user.service";

export const getListUsers = () => (dispatch) => {
    userService.getUsers().then(
        (data) => {
            dispatch({
                type: LIST_USERS,
                payload: { users: data },
            });

            return Promise.resolve();
        }
    );


};
