import {ON_LOGIN, SET_NETWORK_STATE} from '../actions/keys';

const initialState = {
  user: {},
  networkState: true,
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ON_LOGIN: {
      return {
        ...state,
        user: actions.payload,
      };
    }
    case SET_NETWORK_STATE: {
      return {
        ...state,
        networkState: actions.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
