import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT,
} from "../constants/user";

const initState = {
  user: {},
  load: false,
};

const postReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case USER_LOG_IN:
      return {
        ...state,
        load: true,
      };
    case USER_LOG_IN_SUCCESS:
      return {
        ...state,
        users: action?.payload,
        load: false,
      };
    case USER_LOG_OUT:
      return {
        ...state,
        users: {},
      };

    default:
      return state;
  }
};

export default postReducer;
