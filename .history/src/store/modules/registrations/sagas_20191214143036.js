import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import { responseSuccess, requestFailure } from './actions';

export function* request({ payload }) {
  try {
    const { page } = payload.data;

    const response = yield call(api.get, 'registrations', {
      params: {
        page,
      },
    });

    const mydata = response.data.mydata.map(item => ({
      ...item,
      startDateFormatted: format(
        parseISO(item.start_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      ),
      endDateFormatted: format(
        parseISO(item.end_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      ),
    }));
    yield put(responseSuccess({ ...response.data, mydata }));
  } catch (err) {
    toast.error('Falha ao carregar Matriculas');
    yield put(requestFailure());
  }
}

export function* register({ data }) {
  // try {
  //   const dataFormatted = data;

  //   const res = yield call(api.post, 'registrations', dataFormatted);

  //   toast.success('Matrícula cadastrada com sucesso');
  //   yield put(responseSuccess(res.data));

  //   history.push('/registrations');
  // } catch (error) {
  //   toast.error('Erro cadastrar matrícula!');
  //   yield put(requestFailure());
  // }

  try {
    const { registration } = payload.data;

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
