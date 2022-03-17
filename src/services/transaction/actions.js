import * as PT from "./actionTypes";
import remoting from "../remoting";

export const fetchTransaction = () => {
  return (dispatch) => {
    dispatch({
      type: PT.FETCH_TRANSACTION_REQUEST,
    });
    
    remoting
      .get("/transactions")
      .then((response) => {      
        dispatch(success(response.data));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };
};

const success = (payload) => {
  return {
    type: PT.TRANSACTION_SUCCESS,
    payload: payload,
  };
};

const failure = (error) => {
  return {
    type: PT.TRANSACTION_FAILURE,
    payload: error,
  };
};

