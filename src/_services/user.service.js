import axios from "axios";

import authHeader from "../_helpers/auth-header";
import { handleResponse } from '../_helpers/utils';

const login = (email, password) =>
    axios.post("/auth/login", { email, password }).then(handleResponse);

const register = data =>
    axios.post("/auth/register", data).then(handleResponse);

const logout = refreshToken =>
    axios.post("/auth/logout", {refresh_token: refreshToken}).then(handleResponse);

const userService = {
    register,
    login,
    logout
};

export default userService;
