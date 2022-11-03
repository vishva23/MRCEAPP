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

export default function ForgotPassword(props) {
  const {navigation, email, setEmail, onSubmit, loader} = props;

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
            <Text style={styles.headingStyle1}>Forgot Password</Text>

            <CustomTextInput
              value={email}
              placeholder=""
              label="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
            />

            <CustomButton onPress={onSubmit} title="SUBMIT" disabled={loader} />
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
