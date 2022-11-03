import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomButton, CustomTextInput, ModalView} from '../../../components';
import {images} from '../../../resources';
import styles from './style';

export default function Login(props) {
  const {
    navigation,
    email,
    setEmail,
    password,
    setPassword,
    secureText,
    setSecureText,
    onSubmit,
    loader,
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

          <View style={styles.mainView}>
            <CustomTextInput
              value={email}
              placeholder=""
              label="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
            />

            {/* <CustomTextInput
              value={password}
              placeholder=""
              label="Password"
              autoCapitalize="none"
              secure={secureText}
              onChangeText={text => setPassword(text)}
              icon={secureText ? images.eyeClose : images.eyeOpen}
              onIconPress={() => setSecureText(!secureText)}
            /> */}

            <CustomButton
              disabled={loader}
              title="SIGN IN"
              onPress={onSubmit}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.forgotText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </ScrollView>
        {isAllow && (
          <ModalView visible={isAllow} onAccept={onAccept} tncData={tncData} />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
