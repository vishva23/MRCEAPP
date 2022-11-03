/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {
  ChecklistLandingCard,
  CustomButton,
  CustomHeader,
} from '../../../components';
import {colors, images} from '../../../resources';
import styles from './style';

export default function ChecklistLanding(props) {
  const {
    navigation,
    landingList,
    setSelectedTabIndex,
    onSaveChecklistCategory,
    goBack,
  } = props;

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
          icon={images.menu}
          onIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <View style={[styles.flexRowView, {alignItems: 'flex-end'}]}>
          <Text style={styles.headingText1}>Checklists</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 25}}>
          {landingList &&
            landingList.map((item, index) => (
              <View key={index}>
                <ChecklistLandingCard
                  {...props}
                  item={item}
                  index={index}
                  onPressTab={() => setSelectedTabIndex(index)}
                />
              </View>
            ))}
        </View>
      </ScrollView>

      <CustomButton
        title="NEXT"
        onPress={onSaveChecklistCategory}
        btnStyle={[styles.btnStyle, {backgroundColor: colors.black}]}
      />
    </SafeAreaView>
  );
}
