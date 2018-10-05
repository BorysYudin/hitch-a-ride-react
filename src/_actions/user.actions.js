import userConstants from "../_constants/user.constants";
import userService from "../_services/user.service";
import history from "../_helpers/history";

function login(username, password) {
    function request() {
        return { type: userConstants.LOGIN_REQUEST };
    }

    function success(payload) {
        return { type: userConstants.LOGIN_SUCCESS, ...payload };
    }

    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error };
    }

    return dispatch => {
        dispatch(request({ username }));

        return userService.login(username, password).then(
            payload => {
                dispatch(success(payload));
                history.push("/");
            },
            error => dispatch(failure(error))
        );
    };
}

function logout() {
    return { type: userConstants.LOGOUT };
}

function register(data) {
    function request() {
        // return { type: userConstants.LOGIN_REQUEST };
    }

    function success(payload) {
        // return { type: userConstants.LOGIN_SUCCESS, ...payload };
    }

    function failure(error) {
        // return { type: userConstants.LOGIN_FAILURE, error };
    }

    return dispatch => {
        // dispatch(request());

        return userService.register(data).then(
            payload => {
                // dispatch(success(payload));
                // history.push("/");
            },
            error => dispatch(failure(error))
        );
    };
}


const userActions = {
    login,
    logout,
    register
};

export default userActions;
