/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  CustomButton,
  CustomModal,
  CustomTextInput,
  PickerContent,
  ModalView,
} from '../../../components';
import {colors, images} from '../../../resources';
import styles from './style';

export default function Register(props) {
  const {
    navigation,
    email,
    setEmail,
    password,
    setPassword,
    secureText,
    setSecureText,
    company,
    setCompany,
    imoNumber,
    setImoNumber,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    pickerModal,
    setPickerModal,
    companiesData,
    setCompanyId,
    loader,
    onSubmit,
    isAllow,
    onAccept,
    tncData,
  } = props;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={images.apexBackground}
        style={styles.imageBackground}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <Image
            resizeMode="contain"
            source={images.apexLogo}
            style={styles.logoStyle}
          />

          <Text style={styles.textStyle2}>
            The Mariner’s Role in Collecting Evidence Handbook
          </Text>

          <View style={{marginTop: 20}}>
            <Text style={styles.headingStyle1}>Register</Text>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setPickerModal(true)}>
              <CustomTextInput
                editable={false}
                value={company}
                label="Company"
                placeholder="Select a company"
                icon={images.downArrow}
                onIconPress={() => {}}
                containerStyle={{backgroundColor: colors.white}}
              />
            </TouchableOpacity>

            <CustomTextInput
              value={imoNumber}
              placeholder=""
              label="Company IMO number"
              keyboardType="number-pad"
              onChangeText={text => setImoNumber(text)}
            />

            <CustomTextInput
              value={firstName}
              placeholder=""
              label="First Name"
              onChangeText={text => setFirstName(text)}
            />

            <CustomTextInput
              value={lastName}
              placeholder=""
              label="Last Name"
              onChangeText={text => setLastName(text)}
            />

            <CustomTextInput
              value={phoneNumber}
              placeholder=""
              label="Phone Number"
              keyboardType="number-pad"
              onChangeText={text => setPhoneNumber(text)}
            />

            <CustomTextInput
              value={email}
              placeholder=""
              label="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
            />

            <CustomTextInput
              value={password}
              placeholder=""
              label="Password"
              autoCapitalize="none"
              secure={secureText}
              onChangeText={text => setPassword(text)}
              icon={secureText ? images.eyeClose : images.eyeOpen}
              onIconPress={() => setSecureText(!secureText)}
            />

            <CustomButton
              disabled={loader}
              title="REGISTER"
              onPress={onSubmit}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.forgotText}>SIGN IN</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>

      <CustomModal
        isVisible={pickerModal}
        onDismiss={() => setPickerModal(false)}
        content={
          <PickerContent
            heading="Select Company"
            pickerItems={companiesData}
            onSelectItem={item => {
              setCompany(item.value);
              setCompanyId(item.id);
            }}
            onCloseModal={() => setPickerModal(false)}
          />
        }
      />
      {isAllow && (
        <ModalView visible={isAllow} onAccept={onAccept} tncData={tncData} />
      )}
    </SafeAreaView>
  );
}
