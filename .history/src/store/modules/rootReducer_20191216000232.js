import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import student from './students/reducer';
import plan from './plans/reducer';
import registration from './registrations/reducer';
import help from './help/reducer';

export default combineReducers({
  auth,
  user,
  student,
  plan,
  registration,
  help,
});
