import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './students/reducer';
import plan from './plans/reducer';
import registration from './registrations/reducer';

export default combineReducers({
  auth,
  student,
  plan,
  registration,
});
