import * as at from './actionTypes';
import remoting from '../remoting';
import jwtDecode from 'jwt-decode';
import { authTokenStorageKey } from '../app-consts';

const AUTHENTICATION_URL = "/auth/login";
const AUTHORITIES_URL = "/auth/authorities";

//------------- Actions ----------------------
const loginRequest = () => {
  return {
    type: at.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: at.LOGOUT_REQUEST,
  };
};

const loginSuccess = (auth) => {
  return {
    type: at.LOGIN_SUCCESS,
    payload: auth,
  };
};

const loginFailure = () => {
  return {
    type: at.LOGIN_FAILURE,
    payload: false,
  };
};

const logout = () => {
  return {
    type: at.LOGOUT,
  };
};

//------------- Action Creators ---------------
export const initializeAuthFromLocalStorage = () =>{
  const localStorageAuth = localStorage.getItem(authTokenStorageKey);
  let token = null;
  let initialAuth = { isLoggedIn: false, user: null };

  if (localStorageAuth) {
    try {
      token = localStorageAuth;
      remoting.setBearerToken(token);
      //remoting.setBearerToken(token);
      initialAuth = { isLoggedIn: true, user: token2User(token)};
    } catch(e) {
      console.log(e);
    }
  }

  return initialAuth;
}

const token2User = (token) => {    
  const decodedToken = jwtDecode(token);
  let userObj = JSON.parse(decodedToken.sub);
  return {username: userObj.username, email: userObj.email} 
}

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await remoting.post(AUTHENTICATION_URL, {
      username: username,
      password: password,
    });
    
    const token = response.data.accessToken;

    localStorage.setItem(authTokenStorageKey, token);
    remoting.setBearerToken(token);

    dispatch(loginSuccess(token2User(token)));

    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(loginFailure());
    return Promise.reject(error);
  }
};


const fetchAuthorities= () =>{
  return remoting.get(AUTHORITIES_URL, false).then((permissions_response) => {
    if (permissions_response) {
      return permissions_response;
    }
  });
}
export const getAuthorities = () => (dispatch ) => {
  return fetchAuthorities().then(
    (res ) => {
      dispatch({
        type: at.AUTHORITIES_SUCCESS,
        payload: res.data,
      });
      return Promise.resolve();
    },
    (error) => {
      return Promise.reject();
    },
  );
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem(authTokenStorageKey);
    dispatch(logout());
  };
};

