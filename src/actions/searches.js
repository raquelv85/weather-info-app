import { ADD_SEARCH } from "../constants";

import { db } from "../firebase/firebase-config";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

export const addSearchSuccess = (payload) => {
  console.log("logInSuccess");
  return {
    type: ADD_SEARCH,
    payload,
  };
};

export const addSearch = (codProv, idTown, name) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.auth_token;

    const newSearch = {
      codProv,
      idTown,
      name,
      date: new Date().getTime(),
    };

    const docRef = await addDoc(collection(db, `${uid}/provinces/towns`), newSearch);
  };
};

export const loadSearch = (uid) => {
  return async (dispatch, getState) => {
    const searches = [];
    const q = query(collection(db, `${uid}/provinces/towns`), orderBy("date", "desc"), limit(3));

    console.log(q,"consulta")
    const querySnapshot = await getDocs(
      q
    );
    querySnapshot.forEach((doc) => {
     
      searches.push({ id: doc.id, ...doc.data() });
    });
   
    dispatch(addSearchSuccess(searches));
  };
};
