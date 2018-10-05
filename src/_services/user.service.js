import axios from "axios";

import authHeader from "../_helpers/auth-header";

const handleResponse = response =>
    response.status === 200
        ? response.data
        : Promise.reject(response.statusText);

const login = (email, password) =>
    axios.post("/auth/login", { email, password }).then(handleResponse);

const register = data =>
    axios.post("/auth/register", data).then(handleResponse);

const userService = {
    login,
    register
};

export default userService;
