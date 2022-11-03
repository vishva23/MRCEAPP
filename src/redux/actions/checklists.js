import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serverUrl} from '../../resources';
import {
  GET_CHECKLISTS,
  REMOVE_PENDING,
  REMOVE_DRAFT,
  SAVE_CHECKLIST_CATEGORY,
  SAVE_PENDING,
  SAVE_DRAFT,
  GET_INCIDENCES,
  SAVE_FEEDBACK,
  REMOVE_FEEDBACK,
  SET_FEEDBACK_CATEGORY,
  GET_DASHBOARD,
  RESET_STORE,
} from './keys';

export const saveChecklistCategory = data => dispatch => {
  dispatch({
    type: SAVE_CHECKLIST_CATEGORY,
    payload: data,
  });
};

export const savePending = data => dispatch => {
  dispatch({
    type: SAVE_PENDING,
    payload: data,
  });
};

export const removePending = data => dispatch => {
  console.log('removw======',data)
  dispatch({
    type: REMOVE_PENDING,
    payload: data,
  });
};

export const saveDraft = data => dispatch => {
  console.log('saveDraft======',data)

  dispatch({
    type: SAVE_DRAFT,
    payload: data,
  });
};

export const resetStore = () =>dispatch => {
  dispatch( {
    type: RESET_STORE
  })
}

export const removeDraft = data => dispatch => {
  dispatch({
    type: REMOVE_DRAFT,
    payload: data,
  });
};

export const onGetChecklists = () => {
  return async (dispatch, state) => {
    return await axios({
      url: `${serverUrl}/checklists`,
      method: 'GET',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
      },
    })
      .then(res => {
        dispatch({
          type: GET_CHECKLISTS,
          payload: res?.data?.result,
        });
        return res;
      })
      .catch(err => {
        throw err;
      });
  };
};

export const onGetIncidences = () => {
  return async (dispatch, state) => {
    const token = await AsyncStorage.getItem('token');

    return await axios({
      url: `${serverUrl}/incidences`,
      method: 'GET',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
        Authorization: `Bearer ${token}`,
      },
      params: {q: 'withfields,allpages'},
    })
      .then(res => {
        dispatch({
          type: GET_INCIDENCES,
          payload: res?.data?.result?.incidences
            ? res?.data?.result?.incidences
            : [],
        });
        return res;
      })
      .catch(err => {
        throw err;
      });
  };
};

export const onGetParticularIncidence = item => {
  return async (dispatch, state) => {
    const token = await AsyncStorage.getItem('token');

    return await axios({
      url: `${serverUrl}/incidence/` + item,
      method: 'GET',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
        Authorization: `Bearer ${token}`,
      },
      params: {q: 'withfields,allpages'},
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err;
      });
  };
};

export const onPostIncident = data => {
  return async (dispatch, state) => {
    const token = await AsyncStorage.getItem('token');
    return await axios({
      url: data?.incidence?.id
        ? `${serverUrl}/incidence/` + data?.incidence?.id
        : `${serverUrl}/incidence`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
        Authorization: `Bearer ${token}`,
      },
      data,
    })
      .then(res => {
        dispatch(onGetIncidences());
        dispatch(onGetDashboard());
        return res;
      })
      .catch(err => {
        throw err?.response || err;
      });
  };
};

export const onPostIncidentMedia = (formData, index) => {
  return async (dispatch, state) => {
    const token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append(
      'x-api-key',
      'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
    );
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    return fetch(`${serverUrl}/media-chunk`, requestOptions)
      .then(response => response.text())
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error?.message || err;
      });
  };
};

export const onPostFeedback = data => {
  return async (dispatch, state) => {
    const token = await AsyncStorage.getItem('token');
    return await fetch(`${serverUrl}/feedback`, {
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json, text/plain, */*',
      },
      body: data,
    })
      .then(response => response.json())
      .then(res => {
        // dispatch(onGetIncidences());
        return res;
      })
      .catch(err => {
        throw err?.response || err;
      });
  };
};

export const saveFeedback = data => dispatch => {
  dispatch({
    type: SAVE_FEEDBACK,
    payload: data,
  });
};

export const removeFeedback = data => dispatch => {
  dispatch({
    type: REMOVE_FEEDBACK,
    payload: data,
  });
};

export const onGetConfig = () => {
  return async (dispatch, state) => {
    return await axios({
      url: `${serverUrl}/config`,
      method: 'GET',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
      },
    })
      .then(res => {
        dispatch({
          type: SET_FEEDBACK_CATEGORY,
          payload: res.data.feedback_categories,
          data: res.data,
        });
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};

export const onGetDashboard = () => {
  return async (dispatch, state) => {
    const token = await AsyncStorage.getItem('token');

    return await axios({
      url: `${serverUrl}/dashboard`,
      method: 'GET',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        dispatch({
          type: GET_DASHBOARD,
          payload: res.data.result,
        });
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};
