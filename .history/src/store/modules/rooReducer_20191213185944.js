import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './students/reducer';
import plan from './plans/reducer';
import enrollment from './registrations/reducer';

export default combineReducers({ auth, student, plan, enrollment });
