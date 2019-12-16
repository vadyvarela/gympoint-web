import produce from 'immer';

const INITIAL_STATE = {
  registrations: {
    page: 1,
    perPage: 5,
    total: 0,
    totalPage: 0,
    mydata: [],
  },
  registration: {},
  loading: false,
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/GET_REQUEST':
      case '@registration/REGISTER_REQUEST':
      case '@registration/UPDATE_REQUEST':
      case '@registration/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/RESPONSE_SUCCESS': {
        draft.registrations = action.payload.registrations;
        draft.loading = false;
        break;
      }
      case '@registration/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@registration/SHOW_REGISTRATIONS': {
        draft.show = action.payload.show;
        break;
      }
      default:
    }
  });
}
