import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { responseSuccess, requestFailure } from './actions';

export function* request({ payload }) {
    try {
        const { page } = payload;

        const response = yield call(api.get, `students`);

        yield put(responseSuccess(response.data));
    } catch (err) {
        toast.error('Falha ao carregar alunos');
        yield put(requestFailure());
    }
}

export function* register({ payload }) {
    try {
        const { student } = payload;

        yield call(api.post, 'students', student);

        const response = yield call(api.get, 'students');

        yield put(responseSuccess(response.data));
        toast.success('Aluno Cadatrado com sucesso no sistema!');
    } catch (err) {
        toast.error('Ocorreu uma falha ao cadastrar dados do aluno!');
        yield put(requestFailure());
    }
}

export function* update({ payload }) {
    try {
        const { id, student } = payload;

        yield call(api.put, `students/${id}`, student);

        const response = yield call(api.get, 'students');

        yield put(responseSuccess(response.data));
        toast.success('Dados do estudante atualizado com sucesso!');
    } catch (err) {
        toast.error('Ocorreu uma falha ao atualizar dados do aluno!');
        yield put(requestFailure());
    }
}

export function* deleteStudent({ payload }) {
    try {
        const { id } = payload;

        yield call(api.delete, `students/${id}`);

        const response = yield call(api.get, 'students');

        yield put(responseSuccess(response.data));
        toast.success('Estudante removido com succeso!');
    } catch (err) {
        toast.error('Ocoreu uma falha ao remover o aluno!');
        yield put(requestFailure());
    }
}

export default all([
    takeLatest('@student/GET_REQUEST', request),
    takeLatest('@student/REGISTER_REQUEST', register),
    takeLatest('@student/UPDATE_REQUEST', update),
    takeLatest('@student/DELETE_REQUEST', deleteStudent),
]);
