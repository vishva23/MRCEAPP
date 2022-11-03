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
import {CustomButton, CustomTextInput} from '../../../components';
import {images} from '../../../resources';
import styles from './style';

export default function VerifyOtp(props) {
  const {navigation, code, setCode, onSubmit, loader} = props;

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
            <Text style={styles.headingStyle1}>Verify OTP</Text>

            <Text style={styles.textStyle3}>
              Enter one time password sent to info.northpi@gmail.com
            </Text>

            <CustomTextInput
              value={code}
              placeholder=""
              label="Enter OTP"
              onChangeText={text => setCode(text)}
            />

            <CustomButton onPress={onSubmit} disabled={loader} title="SUBMIT" />
          </View>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.forgotText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.forgotText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
