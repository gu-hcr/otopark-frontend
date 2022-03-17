import * as AT from "./actionTypes";

const initialState = {
  data: "",
  error: "",
  status: "",
};

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
  
    case AT.FETCH_TRANSACTION_REQUEST:
      return { ...state, status: "FETCHING" };
    case AT.TRANSACTION_SUCCESS:
      return {
        data: action.payload,
        error: "",
        status: "FETCHED",
      };
    case AT.TRANSACTION_FAILURE:
      return {
        data: "",
        error: action.payload,
        status: "FETCH_FAIL",
      };  

    default:
      return state;
  }
};

export default transactionReducer;
