import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {CustomButton, CustomHeader} from '../../../components';
import {images} from '../../../resources';
import styles from './style';

export default function Thankyou(props) {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <CustomHeader
          icon={images.menu}
          onIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <View style={styles.mainView}>
          <Image
            resizeMode="contain"
            source={images.check}
            style={styles.imageStyle}
          />

          <Text style={styles.headingText}>Thank you!</Text>

          <Text style={styles.textStyle}>Your checklist has been sent</Text>

          <CustomButton
            title="BACK TO HOME"
            btnStyle={styles.btnStyle}
            onPress={() => navigation.navigate('DashboardScreen')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
