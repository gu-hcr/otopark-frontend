import * as at from './actionTypes';
import { initializeAuthFromLocalStorage } from './actions';
  
//TODO
const initialState = initializeAuthFromLocalStorage();

// const initialState = auth ? auth : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case at.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, user: payload };
    case at.LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, user: null };
    case at.LOGOUT:
      return { ...state, isLoggedIn: false, user: null };     
    case at.LOGIN_REQUEST:
    case at.LOGOUT_REQUEST:
      return {...state }; 
    case at.AUTHORITIES_REQUEST:
      return {...state }; 
    case at.AUTHORITIES_SUCCESS:
      return { ...state, isLoggedIn: true, user: { ...state.user, authorities: payload } };
    case at.AUTHORITIES_FAIL:
      return {...state }; 
    // case SET_ROLES:
    //   return { ...state, isLoggedIn: true, user: { ...state.user, permissions: payload } };
    // case SET_USER_INFO:
    //   return { ...state, isLoggedIn: true, user: { ...state.user, displayName: payload } };

    default:
      return state;
  }
};

export default authReducer;