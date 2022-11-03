import {
  GET_CHECKLISTS,
  SAVE_CHECKLIST_CATEGORY,
  SAVE_PENDING,
  REMOVE_PENDING,
  SAVE_DRAFT,
  REMOVE_DRAFT,
  GET_INCIDENCES,
  SAVE_FEEDBACK,
  REMOVE_FEEDBACK,
  SET_FEEDBACK_CATEGORY,
  GET_DASHBOARD,
  RESET_STORE,
} from '../actions/keys';

const initialState = {
  checkList: [],
  checklistCategory: {},
  pendingItems: [],
  draftItems: [],
  userIncidences: [],
  savedFeedback: [],
  feedbackCategory: [],
  userConfig: {},
  dashboard: {},
};

const checkListsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case RESET_STORE:{
       return {
        ...state,
        draftItems: [],
        pendingItems:[]
        // draftItems: copySaved,
        // pendingItems: copyPending,
      };
    }
    case GET_INCIDENCES: {
      let copySaved = actions?.payload.filter(
        a => a.incidence_status === 'draft',
      );
      let copyPending = actions?.payload.filter(
        a => a.incidence_status === 'pending',
      );

      return {
        ...state,
        userIncidences: actions?.payload,
        // draftItems: copySaved,
        // pendingItems: copyPending,
      };
    }
    case GET_CHECKLISTS: {
      return {
        ...state,
        checkList: actions.payload,
      };
    }
    case SAVE_CHECKLIST_CATEGORY: {
      return {
        ...state,
        checklistCategory: actions.payload,
      };
    }
    case SAVE_PENDING: {
      return {
        ...state,
        pendingItems: [actions.payload, ...state.pendingItems],
      };
    }
    case REMOVE_PENDING: {
      return {
        ...state,
        pendingItems: state.pendingItems.filter(
          item => item.unique_id !== actions.payload.unique_id,
        ),
      };
    }
    case SAVE_DRAFT: {
      // const temp = Array.from(state.draftItems);
      // const index = temp.findIndex(
      //   i => i.unique_id === actions.payload.unique_id,
      // );

      // if (index > -1) {
      //   temp[index] = actions.payload;
      // } else {
      //   temp.push(actions.payload);
      // }

      return {
        ...state,
        draftItems: [actions.payload, ...state.draftItems],
      };
    }
    case REMOVE_DRAFT: {
      return {
        ...state,
        draftItems: state.draftItems.filter(
          item => item.unique_id !== actions.payload.unique_id,
        ),
      };
    }

    case SAVE_FEEDBACK: {
      const copyData = Array.from(state.savedFeedback);
      copyData.push(actions.payload);
      return {
        ...state,
        savedFeedback: copyData,
      };
    }
    case REMOVE_FEEDBACK: {
      const copyData = Array.from(state.savedFeedback);
      const findIndex = copyData.findIndex(a => a.id === actions.payload.id);
      if (findIndex !== -1) {
        copyData.splice(findIndex, 1);
      }
      return {
        ...state,
        savedFeedback: copyData,
      };
    }
    case SET_FEEDBACK_CATEGORY: {
      return {
        ...state,
        feedbackCategory: actions.payload,
        userConfig: actions.data,
      };
    }
    case GET_DASHBOARD: {
      return {
        ...state,
        dashboard: actions.payload,
      };
    }
    default:
      return state;
  }
};

export default checkListsReducer;
