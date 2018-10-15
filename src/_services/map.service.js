import axios from "axios";

import authHeader from "../_helpers/auth-header";
import { handleResponse } from '../_helpers/utils';

const selectRoute = data => {
    // axios.post("/auth/login", { email, password }).then(handleResponse);

    console.log(data);
    return Promise.resolve();
}

const userService = {
    selectRoute
};

export default userService;
