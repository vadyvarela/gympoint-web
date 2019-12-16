import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { responseSuccess, requestFailure } from './actions';

export function* answerQuestion({ payload }) {
  try {
    const { id, answer } = payload;

    yield call(api.post, `help-orders/${id}/answer`, answer);

    const response = yield call(api.get, 'help-orders');

    yield put(responseSuccess(response.data));

    toast.success('Resposta enviada com sucesso');
  } catch (error) {
    yield put(requestFailure());
    toast.error('Ouve uma falha ao enviar resposta');
  }
}

export default all([takeLatest('@help/ANSWER_REQUEST', answerQuestion)]);
