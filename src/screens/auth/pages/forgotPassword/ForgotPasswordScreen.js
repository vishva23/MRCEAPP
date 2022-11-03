import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {onForgetPassword} from '../../../../redux/actions';
import {ForgotPassword} from '../../components';

export default function ForgotPasswordScreen(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const onSubmit = async () => {
    setLoader(true);
    if (email === '') {
      setLoader(false);
      Alert.alert('Error', 'Email is required', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }

    try {
      const data = {
        email,
      };

      await dispatch(onForgetPassword(data));
      setLoader(false);
      navigation.navigate('VerifyOtpScreen', {email});
    } catch (err) {
      setLoader(false);
      Alert.alert('Error', err.data.message, [{text: 'Ok', onPress: () => {}}]);
    }
  };

  return (
    <ForgotPassword
      onSubmit={onSubmit}
      loader={loader}
      {...props}
      email={email}
      setEmail={setEmail}
    />
  );
}
