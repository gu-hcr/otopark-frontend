import axios from "axios";
import { message, Modal } from "antd";

//const BASE_URL = process.env.REACT_APP_SERVER_URL, _401 = 401, _403 = 403, _422 = 422;
const BASE_URL = "http://localhost:8080/api/v1",
  _401 = 401,
  _403 = 403,
  _422 = 422;

function setBearerToken(authenticationToken) {
  const bearerToken = "Bearer " + authenticationToken;
  axios.defaults.headers.common["Authorization"] = bearerToken;
}

function get(url, showSucessMessage = false) {
  return axios
    .get(BASE_URL + url)
    .then((res) => {
      handleSucess(showSucessMessage, res.message);
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      throw error;
    });
}

function post(url, data, showSucessMessage = false) {
  return axios
    .post(BASE_URL + url, data)
    .then((res) => {
      handleSucess(showSucessMessage, res.data.message);
      return res.data;
    })
    .catch((error) => {
      handleError(error);
      throw error;
    });
}

//handle success & error messages
//host response.data : {message,data}
function handleSucess(showSucessMessage, msg = "Success!") {
  if (showSucessMessage) {
    message.success(msg);
  }
}
function handleError(error, msg = "error") {
  if (isAuthenticationError(error.response)) {
    displayAuthenticationErrors();
    //TODO:  store.dispatch(logoutUser());
  } else if (isAuthorizationError(error.response)) {
    displayAuthorizationErrors();
  } else if (isBusinessError(error.response)) {
    displayBusinessErrors(error.response.data.message);
  } else {
    modalError(msg);
  }
}

function isAuthenticationError(response) {
  return response && response.status && response.status === 401;
}
function isAuthorizationError(response) {
  return response && response.status && response.status === 403;
}
function isBusinessError(response) {
  return response && response.status && response.status === 422;
}
function displayAuthenticationErrors() {
  modalError("Your session is expired. Please login again");
}
function displayAuthorizationErrors() {
  modalError("Sorry..You don't have permission!");
}
function displayBusinessErrors(msg) {
  Modal.error({
    title: "Error",
    content: msg,
  });
}

const modalError = (content) => {
  return Modal.error({
    title: "Error",
    content: content,
    okText: "Close",
  });
};

export default {
  setBearerToken: setBearerToken,
  get: get,
  post: post,
  //TODO:
  //delete: remove,
  //put: put
};
