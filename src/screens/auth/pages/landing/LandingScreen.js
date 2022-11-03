import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Landing} from '../../components';
import {useDispatch} from 'react-redux';
import {onGetConfig} from '../../../../redux/actions';

export default function LandingScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetConfig());
  }, []);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const onSignInPress = () => {
    navigation.navigate('LoginScreen');
  };

  return <Landing {...props} onSignInPress={onSignInPress} />;
}
