import 'isomorphic-fetch';
import _ from 'lodash'
var Toastr = require('toastr/build/toastr.min.js');
require('toastr/build/toastr.css');

export function checkStatus(response) {
  return response;
}

export function parseJSON(response) {
  return response.json();
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function buildQueryString(params) {
  params = _.extend({}, params);
  return _.map(params, function(val, key) {
    if (typeof val === "object") {
      return _.map(val, function(v, k) {
        return key + "["+k+"]" + "=" + v;
      }).join('&');
    } else {
      return key + "=" + val;
    }
  }).join('&');
}

export function buildUrlWithQueryString (url, params) {
  var paramsQueryString = buildQueryString(params);
  if (_.isEmpty(paramsQueryString)) {
    return url;
  } else {
    if (url.indexOf('?') >= 0) {
      return url + '&' + paramsQueryString;
    } else {
      return url + '?' + paramsQueryString;
    }
  }
}

export function callApi(path, params, config, request, onRequestSuccess, onRequestFailure) {
  const API_ROOT = 'http://api.dev.leasing.clicksandbox.com:8080';
  const idToken = localStorage.getItem('id_token');
  config = {
            ...config,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Auth-Token': idToken
            }}

  let url = API_ROOT+path;
  url = buildUrlWithQueryString(url, params);

  return dispatch => {
    dispatch(request);

    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then((json) => {
        if (!json.success) {   // (response.status < 200 || response.status > 300)
          json.error &&
          Toastr.error(json.error);
          dispatch(onRequestFailure(json));
        } else {
          json.message &&
          Toastr.success(json.message);
          dispatch(onRequestSuccess(json));
        }
      }).catch((error) => {
          const exceptionMessage = {
            success: false,
            error: "Something went wrong!"
          }
          dispatch(onRequestFailure(exceptionMessage));
        });
  };
}




export const ID_TOKEN = 'id_token';

export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
  localStorage.removeItem(ID_TOKEN);
}

export function loadIdToken() {
  return localStorage.getItem(ID_TOKEN);
}
