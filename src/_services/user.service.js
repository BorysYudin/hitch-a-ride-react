import axios from "axios";

import authHeader from "../_helpers/auth-header";
import { handleResponse } from '../_helpers/utils';

const login = (email, password) =>
    axios.post("/auth/login", { email, password }).then(handleResponse);

const register = data =>
    axios.post("/auth/register", data).then(handleResponse);

const userService = {
    login,
    register
};

export default userService;
