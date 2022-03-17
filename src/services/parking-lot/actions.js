import * as PT from "./actionTypes";
import remoting from "../remoting";


export const fetchParkingLot = () => {
  return (dispatch) => {
    dispatch({
      type: PT.FETCH_PARKING_LOT_REQUEST,
    });
    
    remoting
      .get("/parking-lot")
      .then((response) => {      
        dispatch(success(response.data));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };
};


export const vehicleCheckIn = (vehicle) => {
  return (dispatch) => {
    dispatch({
      type: PT.VEHICLE_CHECKIN_REQUEST,
    });
    
    remoting
      .post("/parking-lot/vehicles/check-in", vehicle, true)
      .then((response) => {
        dispatch({
          type: PT.VEHICLE_CHECKIN_SUCCESS,
        });

        //fetchParkingLot(); TODO: refactor
        dispatch({
          type: PT.FETCH_PARKING_LOT_REQUEST,
        });
        
        remoting
          .get("/parking-lot")
          .then((response) => {
            dispatch(success(response.data));
          })
          .catch((error) => {
            dispatch(failure(error));
          });
      })
      .catch((error) => {
        dispatch({
          type: PT.VEHICLE_CHECKIN_FAILURE,
          payload: error
        });
      });
  };
};

export const vehicleCheckOut = (id, price) => {
  return (dispatch) => {
    dispatch({
      type: PT.VEHICLE_CHECKOUT_REQUEST,
    });
    
    remoting
      .post("/parking-lot/vehicles/"+id+"/check-out", {price:price}, true)
      .then((response) => {      
        //dispatch(successexit());
        dispatch({
          type: PT.VEHICLE_CHECKOUT_SUCCESS,
        });

        //fetchParkingLot(); TODO: refactor
        dispatch({
          type: PT.FETCH_PARKING_LOT_REQUEST,
        });
        
        remoting
          .get("/parking-lot")
          .then((response) => {
            dispatch(success(response.data));
          })
          .catch((error) => {
            dispatch(failure(error));
          });
      })
      .catch((error) => {
        //dispatch(failure(error));
        dispatch({
          type: PT.VEHICLE_CHECKOUT_FAILURE,
          payload: error
        });
      });
  };
};


const success = (payload) => {
  return {
    type: PT.PARKING_LOT_SUCCESS,
    payload: payload,
  };
};

const failure = (error) => {
  return {
    type: PT.PARKING_LOT_FAILURE,
    payload: error,
  };
};

