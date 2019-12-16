import produce from 'immer';

const INITIAL_STATE = {
  helps: {
    page: 1,
    perPage: 5,
    total: 0,
    totalPage: 0,
    mydata: [],
  },
  help: {},
  loading: false,
};

export default function help(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/ANSWER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help/RESPONSE_SUCCESS': {
        draft.help = action.payload.help;
        draft.loading = false;
        break;
      }
      case '@help/REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@help/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
