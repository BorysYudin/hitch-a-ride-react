import authenticationConstants from "../_constants/authentication.constants";
import authenticationService from "../_services/authentication.service";

function refreshToken(dispatch) {
    function request(freshTokenPromise) {
        return {
            type: authenticationConstants.JWT_REFRESH_REQUEST,
            freshTokenPromise
        };
    }

    function success(payload) {
        return {
            type: authenticationConstants.JWT_REFRESH_SUCCESS,
            ...payload
        };
    }

    function failure(error) {
        return { type: authenticationConstants.JWT_REFRESH_FAILURE, error };
    }

    const auth = JSON.parse(
        JSON.parse(localStorage.getItem("persist:ai")).authentication
    );

    const freshTokenPromise = authenticationService
        .refreshJWT(auth.refresh)
        .then(payload => {
            dispatch(success(payload));
            return payload;
        })
        .catch(error => dispatch(failure(error)));

    dispatch(request(freshTokenPromise));

    return freshTokenPromise;
}

const authenticationActions = {
    refreshToken
};

export default authenticationActions;
