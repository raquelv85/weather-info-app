import { SET_TOKEN } from '../constants';

export function fetchSectionSuccess(payload){
  return {
    type: SET_TOKEN,
    payload
  }
}