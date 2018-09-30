import axios from "axios";

import authHeader from "../_helpers/auth-header";

const handleResponse = response =>
    response.status === 200
        ? response.data
        : Promise.reject(response.statusText);

const login = (username, password) =>
    axios.post("/api/token/", { username, password }).then(handleResponse);

const getCurrentUser = () =>
    axios.get("/api/users/me/", { headers: authHeader() }).then(handleResponse);

const userService = {
    login,
    getCurrentUser
};

export default userService;
