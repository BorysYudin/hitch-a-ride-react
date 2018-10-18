import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import user from "./user.reducer";
import trips from "./trips.reducer";

const rootReducer = combineReducers({
    authentication,
    user,
    trips
});

export default rootReducer;
