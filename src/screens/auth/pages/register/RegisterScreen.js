import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {onRegister, onAcceptTnc} from '../../../../redux/actions';
import {Register} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const companiesData = [
  {label: 'ABC Company', value: 'ABC Company', id: 1},
  {label: 'XYZ Company', value: 'XYZ Company', id: 2},
];

export default function RegisterScreen(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [company, setCompany] = useState('');
  const [imoNumber, setImoNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pickerModal, setPickerModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [isAllow, setIsAllow] = useState(false);
  const config = useSelector(state => state?.checkListsReducer?.userConfig);

  const onSubmit = async () => {
    setLoader(true);
    const regx = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

    if (company === '') {
      setLoader(false);
      Alert.alert('Error', 'Company is required.', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    if (imoNumber === '') {
      setLoader(false);
      Alert.alert('Error', "Company's IMO number is required.", [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    if (firstName === '') {
      setLoader(false);
      Alert.alert('Error', 'First name is required.', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    if (lastName === '') {
      setLoader(false);
      Alert.alert('Error', 'Last name is required.', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    if (phoneNumber === '') {
      setLoader(false);
      Alert.alert('Error', 'Phone number is required.', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    if (email === '') {
      setLoader(false);
      Alert.alert('Error', 'Email is required.', [
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
    if (password === '') {
      setLoader(false);
      Alert.alert('Error', 'Password is required.', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    try {
      const data = {
        email_address: email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        company_imo_number: imoNumber,
        company_id: companyId,
      };

      const res = await dispatch(onRegister(data));
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setImoNumber('');
      setCompany('');
      setCompanyId('');
      setLoader(false);
      if (res?.data?.result?.tc_accepted == 1) {
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
  const onAccept = async () => {
    const data1 = {
      tc_accepted: '1',
    };
    await dispatch(onAcceptTnc(data1));
    navigation.navigate('Home');
    await AsyncStorage.setItem('termsCondition', 'termsCondition');

    // try {
    //   const data = {
    //     email_address: email,
    //     password,
    //     first_name: firstName,
    //     last_name: lastName,
    //     phone: phoneNumber,
    //     company_imo_number: imoNumber,
    //     company_id: companyId,
    //   };

    //   await dispatch(onRegister(data));

    //   let isAccept = await AsyncStorage.getItem('isAccept');
    //   if (isAccept != 'true') {
    //     const data1 = {
    //       tc_accepted: '1',
    //     };
    //     await dispatch(onAcceptTnc(data1));
    //   } else {
    //     await AsyncStorage.setItem('isAccept', 'true');
    //   }

    //   setEmail('');
    //   setPassword('');
    //   setFirstName('');
    //   setLastName('');
    //   setPhoneNumber('');
    //   setImoNumber('');
    //   setCompany('');
    //   setCompanyId('');
    //   setLoader(false);
    //   navigation.navigate('Home');
    // } catch (err) {
    //   setLoader(false);
    //   setIsAllow(false);
    //   Alert.alert('Error', err.data.message, [{text: 'Ok', onPress: () => {}}]);
    // }
  };

  return (
    <Register
      {...props}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      secureText={secureText}
      setSecureText={setSecureText}
      company={company}
      setCompany={setCompany}
      imoNumber={imoNumber}
      setImoNumber={setImoNumber}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      pickerModal={pickerModal}
      setPickerModal={setPickerModal}
      companiesData={companiesData}
      setCompanyId={setCompanyId}
      onSubmit={onSubmit}
      loader={loader}
      isAllow={isAllow}
      onAccept={onAccept}
      tncData={config.terms_conditions}
    />
  );
}
