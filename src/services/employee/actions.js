import * as PT from "./actionTypes";
import remoting from "../remoting";

export const fetchEmployee = () => {
  return (dispatch) => {
    dispatch({
      type: PT.FETCH_EMPLOYEE_REQUEST,
    });
    
    remoting
      .get("/employees/lookup")
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
    type: PT.EMPLOYEE_SUCCESS,
    payload: payload,
  };
};

const failure = (error) => {
  return {
    type: PT.EMPLOYEE_FAILURE,
    payload: error,
  };
};

