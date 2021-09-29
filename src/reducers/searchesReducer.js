import { ADD_SEARCH } from "../constants";

const initialState = {
  searches: [],
};

export const searchesReducer = (state = initialState, action) => {
  console.log("REDUCER",action)
  switch (action.type) {
    case ADD_SEARCH:
      return {
        ...state,
        searches: [...action.payload],
      };

    default:
      return state;
  }
};
