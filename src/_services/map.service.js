import axios from "axios";

import authHeader from "../_helpers/auth-header";
import { handleResponse } from '../_helpers/utils';

const createTrip = data => {
    axios.post("/api/v1/trips", data, {headers: authHeader()}).then(handleResponse);
};

const mapService = {
    createTrip
};

export default mapService;
