import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {serverUrl} from '../../resources';
import { resetStore } from './checklists';
import {ON_LOGIN, SET_NETWORK_STATE} from './keys';

export const setNetworkState = data => dispatch => {
  dispatch({
    type: SET_NETWORK_STATE,
    payload: data,
  });
};

export const onLogin = data => {
  return async (dispatch, state) => {
   
    return await axios({
      url: `${serverUrl}/login`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
      },
      data,
    })
      .then(async res => {
        console.log('login res===',res)
        await AsyncStorage.setItem('token', res.data.result.token);
       const email= await AsyncStorage.getItem('email');
       if(email!=res.data.result.email_address){
        await(dispatch( resetStore()))

       }


        dispatch({
          type: ON_LOGIN,
          payload: res.data.result,
        });
        return res;
      })
      .catch(err => {
        console.log('login err=======', err.response);
        throw err.response;
      });
  };
};

export const onAcceptTnc = data => {
  return async (dispatch, state) => {
    const token = await AsyncStorage.getItem('token');

    return await axios({
      url: `${serverUrl}/accept/tnc`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
        Authorization: `Bearer ${token}`,
      },
      data,
    })
      .then(async res => {
        await AsyncStorage.setItem('termsCondition', 'termsCondition');
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};
export const onForgetPassword = data => {
  return async (dispatch, state) => {
    return await axios({
      url: `${serverUrl}/forgot-password`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
      },
      data,
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};

export const onVerifyOtp = data => {
  return async (dispatch, state) => {
    return await axios({
      url: `${serverUrl}/verify-otp`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
      },
      data,
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};

export const onResetPassword = data => {
  return async (dispatch, state) => {
    return await axios({
      url: `${serverUrl}/reset-pass`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
      },
      data,
    })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};

export const onRegister = data => {
  return async (dispatch, state) => {
    return await axios({
      url: `${serverUrl}/register`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
      },
      data,
    })
      .then(async res => {
        await AsyncStorage.setItem('token', res?.data?.result?.token);
        // dispatch({
        //   type: ON_LOGIN,
        //   payload: res.data.result,
        // });
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};

export const onLogout = () => {
  return async (dispatch, state) => {
    // const token = await AsyncStorage.getItem('token');
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTc4NWQ5MzM3NDVjMWY0MTViYjczNjk0NmE2ZWQ2YmFiOWI5NGY4MTQyNTI3YzU2MzNiNjcwZjc1ZTk5YzBiNTJlZDUzZGU4YWIwZjEyNjMiLCJpYXQiOjE2NDY3MzAzNDcuODA1ODE4LCJuYmYiOjE2NDY3MzAzNDcuODA1ODIyLCJleHAiOjE4MDQ0OTY3NDcuODAwNDA5LCJzdWIiOiIyNSIsInNjb3BlcyI6W119.FyretYmjutx6O8tJGPbMH0oY53v9To2vCi87TrouB3o6acgRak4Y31-BRZE9uCzrkolKqoUaDoUQ2-4yFSCEVZIEKMfQCOYztOCCss73fls8-iRDUdFIGokKU9bH22ovNROMa4MUEawuOq9iQ1mNlDp9dsrQBDXtQ5FAZIm0pDjP2gQamrvC-LZ75eSOg1xYncwWrexvzeK9yNsyT1lEn1m1GYVq8-0D24hIU7MrcpWUp3izRQB2ZRN0BpqYOsG6QT1kfm1aSY3Tam-KQc9cqXB1-dObODoDm8AVKQxki8cvGtCRA0WCJSv4Cntt5Ap_nbu5vXKloJBnfWXVu_hxsrpYwRLMBYHPKOaug6YXzyP6qZyLMOcPw_3Owh7jUXmU-UIet3K6e2PapHXPUxeT_93ycknkz-VQzjdExWuThaN2uHRKySyddeqAsIJhn92UWRCVI4mFxYkglTfsSxcJOhI7TKz3c3mA5FP60WDB_5eHNdxDAx4wY2ueQjOcbEYy99emoP9_PsVyGJm4jR6_XnIIWcLBuCUSdsvOLIQR1a22_nRW2ocKL9rQ7KkzI4l8P96My_ZDfffC11lY4ZQZCZF6sDfIBIC_IZNZ_V24RJAOiwGtgg5ITZDqpd6Hnrp-DHX_qzAycgbxHR_lSReypmPRzuLArVMW0HUdnvgku60';

    return await axios({
      url: `${serverUrl}/logout`,
      method: 'POST',
      headers: {
        'x-api-key':
          'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
        AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('termsCondition');
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  };
};
