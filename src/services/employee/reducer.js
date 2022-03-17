import * as AT from "./actionTypes";

const initialState = {
  data: "",
  error: "",
  status: "",
};

const employeeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
  
    case AT.FETCH_EMPLOYEE_REQUEST:
      return { ...state, status: "FETCHING" };
    case AT.EMPLOYEE_SUCCESS:
      return {
        data: action.payload,
        error: "",
        status: "FETCHED",
      };
    case AT.EMPLOYEE_FAILURE:
      return {
        data: "",
        error: action.payload,
        status: "FETCH_FAIL",
      };  

    default:
      return state;
  }
};

export default employeeReducer;
