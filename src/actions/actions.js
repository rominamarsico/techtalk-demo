import { realtimeDB } from "../firebase";
const FETCH_TODOS = "FETCH_TODOS";
export const addItem = newItem => async dispatch => {
  realtimeDB
    .ref()
    .push()
    .set(newItem);
};
export const removeItem = removeItem => async dispatch => {
  realtimeDB
    .ref()
    .child(removeItem)
    .remove();
};
export const getItem = () => async dispatch => {
  realtimeDB.ref().on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};
