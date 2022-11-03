import React from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {CustomButton} from '../../../components';
import {images} from '../../../resources';
import styles from './style';

export default function Landing(props) {
  const {navigation, onSignInPress} = props;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={images.apexBackground}
        style={styles.imageBackground}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <View style={styles.landingContainer}>
            <Image
              resizeMode="contain"
              source={images.apexLogo}
              style={styles.logoStyle}
            />

            <Text style={styles.headingStyle}>
              The Mariner’s Role in Collecting Evidence Handbook
            </Text>

            <Text style={styles.textStyle1}>
              Helping you collect and preserve the best evidence in the event of
              a maritime incident
            </Text>

            <CustomButton
              title="SIGN IN"
              onPress={onSignInPress}
              btnStyle={styles.btnStyle}
            />

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
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
