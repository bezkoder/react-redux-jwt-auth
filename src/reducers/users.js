import { LIST_USERS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LIST_USERS:
            {
                console.log('users dipatch' + payload)
                return { users: payload };

            }

        default:
            return state;
    }
}
