import { GET_SEARCHS, UPDATE_SEARCHS } from "../constants";

const initialState = {
  searches: [],
};

export const searchesReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_SEARCHS:
      return {
        ...state,
        searches: [...action.payload],
      };

    case UPDATE_SEARCHS:
      const newArr = [...state.searches]
      newArr.unshift(action.payload)
      newArr.pop()
      return {
        ...state,
        searches: newArr,
      };

    default:
      return state;
  }
};
