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

export default function ResetPassword(props) {
  const {
    navigation,
    newPass,
    setNewPass,
    confirmNewPass,
    setConfirmNewPass,
    onSubmit,
    loader,
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
            <Text style={styles.headingStyle1}>Reset Password</Text>

            <CustomTextInput
              value={newPass}
              placeholder=""
              label="New password"
              autoCapitalize="none"
              onChangeText={text => setNewPass(text)}
            />

            <CustomTextInput
              value={confirmNewPass}
              placeholder=""
              label="Confirm new password"
              autoCapitalize="none"
              onChangeText={text => setConfirmNewPass(text)}
            />

            <CustomButton disabled={loader} title="SUBMIT" onPress={onSubmit} />
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
