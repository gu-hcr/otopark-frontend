import * as PT from "./actionTypes";

const initialState = {
  lines: "",
  error: "",
  status: "",
};

const parkingLotReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
  
    case PT.FETCH_PARKING_LOT_REQUEST:
      return { ...state, status: "FETCHING" };
    case PT.PARKING_LOT_SUCCESS:
      return {
        lines: action.payload,
        error: "",
        status: "FETCHED",
      };
    case PT.PARKING_LOT_FAILURE:
      return {
        lines: "",
        error: action.payload,
        status: "FETCH_FAIL",
      };  


    // case PT.SAVE_VEHICLE_REQUEST:
    case PT.VEHICLE_CHECKOUT_REQUEST:
      return {
        ...state,
      };
    case PT.VEHICLE_CHECKOUT_SUCCESS:
      return {
        ...state,
      };
    case PT.VEHICLE_CHECKOUT_FAILURE:
      return {
        ...state, error: action.payload,
      };        


      case PT.VEHICLE_CHECKIN_REQUEST:
        return {
          ...state,
        };
      case PT.VEHICLE_CHECKIN_SUCCESS:
        return {
          ...state,
        };
      case PT.VEHICLE_CHECKIN_FAILURE:
        return {
          ...state, error: action.payload,
        };  

    default:
      return state;
  }
};

export default parkingLotReducer;
