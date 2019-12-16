export function answerRequest(id, answer) {
  return {
    type: '@help/ANSWER_REQUEST',
    payload: { id, answer },
  };
}

export function responseSuccess(help) {
  return {
    type: '@hepl/RESPONSE_SUCCESS',
    payload: { help },
  };
}

export function requestSuccess() {
  return {
    type: '@help/REQUEST_SUCCESS',
  };
}

export function requestFailure() {
  return {
    type: '@help/REQUEST_FAILURE',
  };
}
