import { SET_TOKEN, DELETE_TOKEN } from "../constants";

const initialState = {
  auth_token: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        auth_token: action.payload,
      };
    case DELETE_TOKEN:
      return {
        ...state,
        auth_token: ""
      };
    default:
      return state;
  }
};
