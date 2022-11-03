import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {onVerifyOtp} from '../../../../redux/actions';
import {VerifyOtp} from '../../components';

export default function VerifyOtpScreen(props) {
  const {route} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(false);

  const onSubmit = async () => {
    setLoader(true);
    if (code === '') {
      setLoader(false);
      Alert.alert('Error', 'Otp is required', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }

    try {
      const data = {
        otp: code,
        email: route.params.email,
      };

      const response = await dispatch(onVerifyOtp(data));
      setLoader(false);
      if (response.data.status === 200) {
        navigation.navigate('ResetPasswordScreen', {userId: 123});
      } else {
        Alert.alert('Error', response.data.message, [
          {text: 'Ok', onPress: () => {}},
        ]);
      }
    } catch (err) {
      setLoader(false);
      Alert.alert('Error', err.data.message, [{text: 'Ok', onPress: () => {}}]);
    }
  };

  return (
    <VerifyOtp
      onSubmit={onSubmit}
      loader={loader}
      {...props}
      code={code}
      setCode={setCode}
    />
  );
}
