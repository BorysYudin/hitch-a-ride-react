import axios from "axios";

const handleResponse = response =>
    response.status === 200
        ? response.data
        : Promise.reject(response.statusText);

const refreshJWT = refresh =>
    axios.post("/api/token/refresh/", { refresh }).then(handleResponse);

const authenticationService = {
    refreshJWT
};

export default authenticationService;
