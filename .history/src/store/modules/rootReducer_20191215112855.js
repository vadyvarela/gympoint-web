import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './students/reducer';
import plan from './plans/reducer';
import registration from './registrations/reducer';
import help from './registrations/help';

export default combineReducers({
  auth,
  student,
  plan,
  registration,
  help,
});
