import produce from 'immer';

const INITIAL_STATE = {
  plans: [],
  loading: false,
  show: true,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/GET_REQUEST':
      case '@plan/REGISTER_REQUEST':
      case '@plan/UPDATE_REQUEST':
      case '@plan/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/RESPONSE_SUCCESS': {
        draft.plans = action.payload.plans;
        draft.loading = false;
        break;
      }
      case '@plan/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@plan/SHOW_PLANS': {
        draft.show = action.payload.show;
        break;
      }
      default:
    }
  });
}
