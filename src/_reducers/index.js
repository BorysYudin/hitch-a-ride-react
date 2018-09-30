import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import user from "./user.reducer";

const rootReducer = combineReducers({
    authentication,
    user
});

export default rootReducer;
