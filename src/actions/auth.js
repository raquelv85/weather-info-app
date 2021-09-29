import { SET_TOKEN, DELETE_TOKEN } from "../constants";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "../firebase/firebase-config";



export const loginSuccess = (payload) => {
  return {
    type: SET_TOKEN,
    payload,
  };
};

export const logoutSuccess = (payload) => {
  return {
    type: DELETE_TOKEN,
    payload,
  };
};

export const register = (email, password) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user.uid));
      })
      .catch((e) => {});
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(({ user }) => {
  
        dispatch(loginSuccess(user.uid));
      })
      .catch((e) => {});
  };
};

export const logout = () => {
  return (dispatch) => {
    signOut(getAuth()).then(() => {
      dispatch(logoutSuccess());
    });
  };
};
