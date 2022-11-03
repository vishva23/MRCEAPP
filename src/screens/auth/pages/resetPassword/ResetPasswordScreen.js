import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {onResetPassword} from '../../../../redux/actions';
import {ResetPassword} from '../../components';

export default function ResetPasswordScreen(props) {
  const {route} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [loader, setLoader] = useState(false);

  const onSubmit = async () => {
    setLoader(true);
    if (newPass === '') {
      setLoader(false);
      Alert.alert('Error', 'Password is required', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }

    if (confirmNewPass === '') {
      setLoader(false);
      Alert.alert('Error', 'Confirm password is required', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }

    if (newPass !== confirmNewPass) {
      setLoader(false);
      Alert.alert('Error', 'Password miss-match', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }

    try {
      const data = {
        password: newPass,
        user_id: route.params.userId,
      };

      await dispatch(onResetPassword(data));
      setLoader(false);
      Alert.alert('Success', 'Password has been changed successfully!', [
        {text: 'Ok', onPress: () => navigation.navigate('LoginScreen')},
      ]);
    } catch (err) {
      setLoader(false);
      Alert.alert('Error', err.data.message, [{text: 'Ok', onPress: () => {}}]);
    }
  };

  return (
    <ResetPassword
      {...props}
      loader={loader}
      onSubmit={onSubmit}
      newPass={newPass}
      setNewPass={setNewPass}
      confirmNewPass={confirmNewPass}
      setConfirmNewPass={setConfirmNewPass}
    />
  );
}
