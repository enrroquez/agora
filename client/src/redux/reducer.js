// our root reducer

import { combineReducers } from "redux";

//import your frienReducer here!

const rootReducer = combineReducers({
    friends: friendsReducer,
});

export default rootReducer;
