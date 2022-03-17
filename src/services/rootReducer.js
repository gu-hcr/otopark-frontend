import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import parkingLotReducer from "./parking-lot/reducer";
import employeeReducer from "./employee/reducer";
import transactionReducer from "./transaction/reducer";

const rootReducer = combineReducers({
  parkingLot: parkingLotReducer,
  auth: authReducer,
  employee: employeeReducer,
  transaction: transactionReducer
});

export default rootReducer;