import { combineReducers } from 'redux';

import auth from './auth/reducer';
import students from './students/reducer';
import plans from './plans/reducer';
import registrations from './registrations/reducer';

export default combineReducers({
    auth,
    students,
    plans,
    registrations,
});
