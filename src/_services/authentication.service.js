import axios from "axios";

import authHeader from "../_helpers/auth-header";

const handleResponse = response =>
    response.status === 200
        ? response.data
        : Promise.reject(response.statusText);

const refreshJWT = refresh =>
    axios.post("/auth/refresh", { refresh }, {headers: {...authHeader()}}).then(handleResponse);

const authenticationService = {
    refreshJWT
};

export default authenticationService;
