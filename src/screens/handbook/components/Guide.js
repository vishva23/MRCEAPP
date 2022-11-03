/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {DrawerActions, useTheme} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import {BackButton, CustomHeader} from '../../../components';
import {images} from '../../../resources';
import styles from './style';
import {fonts} from '../../../resources/fonts';

export default function Guide(props) {
  const {source, navigation, goBack} = props;
  const {width} = useWindowDimensions();
  console.log('html');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <CustomHeader
          goBack={goBack}
          backIcon={images.leftArrow}
          changeDirection
          // icon={images.menu}
          // onIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        {/* <BackButton onPress={() => navigation.navigate('HandbookScreen')} /> */}

        {/* <Text style={[styles.headingText, {marginTop: 25}]}>
          PERSONAL ILLNESS
        </Text>

        <Text style={[styles.textStyle, {marginTop: 5}]}>
          A Guide To Good Practice
        </Text> */}

        <View style={styles.lineSeparator} />
        <RenderHtml contentWidth={width} source={source} />
      </ScrollView>
    </SafeAreaView>
  );
}
