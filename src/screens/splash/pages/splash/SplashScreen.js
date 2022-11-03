import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Splash} from '../../components';

export default function SplashScreen(props) {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 1000);
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const termsCondition = await AsyncStorage.getItem('termsCondition');

    console.log(
      '🚀 ~ file: SplashScreen.js ~ line 17 ~ checkToken ~ termsCondition',
      termsCondition,
    );

    if (token && termsCondition == 'termsCondition') {
      navigation.replace('Home');
    } else {
      navigation.replace('LandingScreen');
    }
  };

  return <Splash />;
}
