import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import student from './students/sagas';
import plan from './plans/sagas';
import registration from './registrations/sagas';

export default function* rootSaga() {
  return yield all([auth, student, plan, registration]);
}
