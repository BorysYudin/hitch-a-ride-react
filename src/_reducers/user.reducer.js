import jwt_decode from "jwt-decode";

import userConstants from "../_constants/user.constants";

const initialState = {
    isLoading: false
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.GET_CURRENT_REQUEST:
            return {
                ...initialState,
                isLoading: true
            };
        case userConstants.GET_CURRENT_SUCCESS:
            return {
                ...initialState,
                ...action.data
            };
        case userConstants.GET_CURRENT_FAILURE:
            return {...initialState};

        case "persist/REHYDRATE": {
            const {authentication} = action.payload;

            if (authentication && authentication.access) {
                const decoded = jwt_decode(authentication.access);
                return {
                    ...initialState,
                    email: decoded.identity,
                    role: decoded.user_claims.role
                };
            }

            return state;
        }

        case userConstants.LOGIN_SUCCESS: {
            const decoded = jwt_decode(action.data.access_token);

            return {
                ...initialState,
                email: decoded.identity,
                role: decoded.user_claims.role
            };
        }

        default:
            return state;
    }
}
