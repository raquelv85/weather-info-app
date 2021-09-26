import { SET_TOKEN} from '../constants';

const initialState = {
  auth_token: ""
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        auth_token: action.payload
      }
    default: 
      return state;
  }
} 