import produce from 'immer';

const INITIAL_STATE = {
  students: {
    page: 1,
    perPage: 5,
    total: 0,
    totalPage: 0,
    mydata: [],
  },
  student: {},
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/GET_REQUEST': {
      }
      case '@student/REGISTER_REQUEST':
      case '@student/UPDATE_REQUEST':
      case '@student/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/RESPONSE_SUCCESS': {
        draft.students = action.payload.students;
        draft.loading = false;
        break;
      }
      case '@student/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@student/SHOW_STUDENTS': {
        draft.show = action.payload.show;
        break;
      }
      default:
    }
  });
}
