import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Login} from '../../components';
import {
  onLogin,
  onGetChecklists,
  onGetIncidences,
  onGetDashboard,
  onAcceptTnc,
} from '../../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loader, setLoader] = useState(false);
  const [isAllow, setIsAllow] = useState(false);
  const config = useSelector(state => state?.checkListsReducer?.userConfig);

  const onAccept = async () => {
    const data1 = {
      tc_accepted: '1',
    };
    await dispatch(onAcceptTnc(data1));
    navigation.navigate('Home');
    await AsyncStorage.setItem('termsCondition', 'termsCondition');
    
  };

  const onSubmit = async () => {
    setLoader(true);
    const regx = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === '') {
      setLoader(false);
      Alert.alert('Error', 'Email is required', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    if (!regx.test(email.replace(/\s/g, ''))) {
      setLoader(false);
      Alert.alert('Error', 'Email address is badly formatted.', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    // if (password === '') {
    //   setLoader(false);
    //   Alert.alert('Error', 'Password is required', [
    //     {text: 'Ok', onPress: () => {}},
    //   ]);
    //   return;
    // }
    try {
      const data = {
        email,
      };
      const res = await dispatch(onLogin(data));
      await dispatch(onGetChecklists());
      await dispatch(onGetIncidences());
      await dispatch(onGetDashboard());
      setEmail('');
      setLoader(false);
      if (res?.data?.result?.tc_accepted == 1) {
        await AsyncStorage.setItem('termsCondition', 'termsCondition');
        navigation.navigate('Home');
      } else {
        setIsAllow(true);
      }
    } catch (err) {
      setLoader(false);
      setIsAllow(false);

      Alert.alert('Error', err.data.message, [{text: 'Ok', onPress: () => {}}]);
    }
    // let isAccept = await AsyncStorage.getItem('isAccept');

    // if (isAccept == 'true') {
    //   onAccept();
    // } else {
    //   setIsAllow(true);
    // }
  };

  return (
    <Login
      {...props}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      secureText={secureText}
      setSecureText={setSecureText}
      loader={loader}
      onSubmit={onSubmit}
      isAllow={isAllow}
      onAccept={onAccept}
      tncData={config.terms_conditions}
    />
  );
}
