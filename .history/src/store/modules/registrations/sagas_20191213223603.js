import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { responseSuccess, requestFailure } from './actions';

export function* request() {
  try {
    const response = yield call(api.get, `registrations`);

    yield put(responseSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao carregar Matriculas');
    yield put(requestFailure());
  }
}

export function* register({ payload }) {
  try {
    const { registration } = payload;

    yield call(api.post, 'registrations', registration);

    const response = yield call(api.get, 'registrations');

    yield put(responseSuccess(response.data));
    toast.success('Matricula Cadatrado com sucesso no sistema!');
    history.push('/registrations');
  } catch (err) {
    toast.error('Ocorreu uma falha ao cadastrar novo Matricula!');
    yield put(requestFailure());
  }
}

export function* update({ payload }) {
  try {
    const { id, registration } = payload;

    yield call(api.put, `registrations/${id}`, registration);

    const response = yield call(api.get, 'registrations');

    yield put(responseSuccess(response.data));
    toast.success('Dados de matricula atualizado com sucesso!');
    history.push('/registrations');
  } catch (err) {
    toast.error('Ocorreu uma falha ao atualizar dados de Matricula!');
    yield put(requestFailure());
  }
}

export function* deleteRegistration({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `registrations/${id}`);

    const response = yield call(api.get, 'registrations');

    yield put(responseSuccess(response.data));
    toast.success('Matricula removido com succeso do sistema!');
  } catch (err) {
    toast.error('Ocoreu uma falha ao remover o Matricula!');
    yield put(requestFailure());
  }
}

export default all([
  takeLatest('@registration/GET_REQUEST', request),
  takeLatest('@registration/REGISTER_REQUEST', register),
  takeLatest('@registration/UPDATE_REQUEST', update),
  takeLatest('@registration/DELETE_REQUEST', deleteRegistration),
]);
