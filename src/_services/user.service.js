import axios from "axios";

import authHeader from "../_helpers/auth-header";
import {handleResponse} from '../_helpers/utils';

const login = (email, password) =>
    axios.post("/auth/login", {email, password}).then(handleResponse);

const register = data =>
    axios.post("/auth/register", data).then(handleResponse);

const logout = refreshToken =>
    axios.post("/auth/logout", {refresh_token: refreshToken}, {headers: {...authHeader()}}).then(handleResponse);

const getCurrent = () =>
    axios.get("/api/v1/user", {headers: {...authHeader()}}).then(handleResponse);


const userService = {
    register,
    login,
    logout,
    getCurrent
};

export default userService;
