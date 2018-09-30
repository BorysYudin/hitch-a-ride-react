import userConstants from "../_constants/user.constants";
import authenticationConstants from "../_constants/authentication.constants";

const initialState = {
    isLoading: false,
    freshTokenPromise: null,
    access: null,
    refresh: null
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...initialState,
                isLoading: true
            };

        case userConstants.LOGIN_SUCCESS:
            return {
                ...initialState,
                access: action.access,
                refresh: action.refresh
            };

        case (userConstants.LOGIN_FAILURE,
        authenticationConstants.JWT_REFRESH_FAILURE):
            return { ...initialState };

        case userConstants.LOGOUT:
            return { ...initialState };

        case authenticationConstants.JWT_REFRESH_REQUEST:
            return { ...state, freshTokenPromise: action.freshTokenPromise };

        case authenticationConstants.JWT_REFRESH_SUCCESS:
            return { ...state, access: action.access, freshTokenPromise: null };

        default:
            return state;
    }
}
