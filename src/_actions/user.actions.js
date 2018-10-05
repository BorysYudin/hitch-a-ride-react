import userConstants from "../_constants/user.constants";
import userService from "../_services/user.service";
import history from "../_helpers/history";


function register(data) {
    function request() {
        return { type: userConstants.REGISTER_REQUEST };
    }

    function success(response) {
        return { type: userConstants.REGISTER_SUCCESS, ...response };
    }

    function failure(response) {
        return { type: userConstants.REGISTER_FAILURE, response };
    }

    return dispatch => {
        dispatch(request());

        return userService.register(data).then(
            response => {
                dispatch(success(response));
                history.push("/");
            },
            response => {
                dispatch(failure(response));
                return Promise.reject(response);
            }
        );
    };
}

function login(username, password) {
    function request() {
        return { type: userConstants.LOGIN_REQUEST };
    }

    function success(response) {
        return { type: userConstants.LOGIN_SUCCESS, ...response };
    }

    function failure(response) {
        return { type: userConstants.LOGIN_FAILURE, response };
    }

    return dispatch => {
        dispatch(request({ username }));

        return userService.login(username, password).then(
            response => {
                dispatch(success(response));
                history.push("/");
            },
            response => dispatch(failure(response))
        );
    };
}

function logout() {
    return { type: userConstants.LOGOUT };
}

const userActions = {
    login,
    logout,
    register
};

export default userActions;
