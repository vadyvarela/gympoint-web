import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatPrice } from '~/utils/format';
import history from '~/services/history';
import api from '~/services/api';

import { responseSuccess, requestFailure } from './actions';

function* request({ payload }) {
  try {
    const { page } = payload.data;

    const response = yield call(api.get, 'plans', {
      params: {
        page,
      },
    });

    yield put(responseSuccess(response.data));
  } catch (err) {
    toast.error('Falha ao carregar planos');
    yield put(requestFailure());
  }
}

export function* register({ payload }) {
  try {
    const { plan } = payload;

    yield call(api.post, 'plans', plan);

    const response = yield call(api.get, 'plans');

    const data = response.mydata.data.map(item => ({
      ...item,
      priceFormatted: formatPrice(item.price),
    }));
    yield put(responseSuccess({ ...response.data, data }));
    toast.success('Plano Cadatrado com sucesso no sistema!');
    history.push('/plans');
  } catch (err) {
    toast.error('Ocorreu uma falha ao cadastrar novo Plano!');
    yield put(requestFailure());
  }
}

export function* update({ payload }) {
  try {
    const { id, plan } = payload;

    yield call(api.put, `plans/${id}`, plan);

    const response = yield call(api.get, 'plans');

    yield put(responseSuccess(response.data));
    toast.success('Dados do Plano atualizado com sucesso!');
    history.push('/plans');
  } catch (err) {
    toast.error('Ocorreu uma falha ao atualizar Plano!');
    yield put(requestFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `plans/${id}`);

    const response = yield call(api.get, 'plans');

    yield put(responseSuccess(response.data));
    toast.success('Plano removido com succeso do sistema!');
  } catch (err) {
    toast.error('Ocoreu uma falha ao remover o Plano!');
    yield put(requestFailure());
  }
}

export default all([
  takeLatest('@plan/GET_REQUEST', request),
  takeLatest('@plan/REGISTER_REQUEST', register),
  takeLatest('@plan/UPDATE_REQUEST', update),
  takeLatest('@plan/DELETE_REQUEST', deletePlan),
]);
