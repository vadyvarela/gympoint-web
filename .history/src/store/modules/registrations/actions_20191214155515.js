export function getRequest(data) {
  return {
    type: '@registration/GET_REQUEST',
    payload: { data },
  };
}
export function responseSuccess(registrations) {
  return {
    type: '@registration/RESPONSE_SUCCESS',
    payload: { registrations },
  };
}

export function registerRequest(data) {
  return {
    type: '@registration/REGISTER_REQUEST',
    payload: { data },
  };
}

export function updateRequest(id, registration) {
  return {
    type: '@registration/UPDATE_REQUEST',
    payload: { id, registration },
  };
}

export function deleteRequest(id) {
  return {
    type: '@registration/DELETE_REQUEST',
    payload: { id },
  };
}

export function requestFailure() {
  return {
    type: '@registration/REQUEST_FAILURE',
  };
}

export function showRegistrations(show) {
  return {
    type: '@registration/SHOW_REGISTRATIONS',
    payload: { show },
  };
}
