import {
    UPLOADED
} from "./types";

import userService from "../services/tutorial.service";

export const onDownload = (id, link) => (dispatch) => {
    userService.download(id, link).then(
        (data) => {
            dispatch({
                type: UPLOADED,

            });

            return Promise.resolve();
        }
    );


};