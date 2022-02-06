import { combineReducers } from "redux";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
const rootReducer = combineReducers({
  posts: postReducer,
  user: userReducer,
});
export default rootReducer;
