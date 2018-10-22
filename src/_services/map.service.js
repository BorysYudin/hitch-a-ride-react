import axios from "axios";

import authHeader from "../_helpers/auth-header";
import {handleResponse} from '../_helpers/utils';

const createTrip = data =>
    axios.post("/api/v1/trips", data, {headers: authHeader()}).then(handleResponse);

const getAllTrips = () =>
    axios.get("/api/v1/trips", {headers: authHeader()}).then(handleResponse);

const createRide = data =>
    axios.post("/api/v1/rides", data, {headers: authHeader()}).then(handleResponse);

const getAllRides = data =>
    axios.get("/api/v1/rides", {headers: authHeader()}).then(handleResponse);

const mapService = {
    createTrip,
    getAllTrips,
    createRide,
    getAllRides
};

export default mapService;
