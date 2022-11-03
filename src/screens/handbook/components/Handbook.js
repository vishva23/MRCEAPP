import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {CustomHeader, HandbookCard} from '../../../components';
import {images} from '../../../resources';
import styles from './style';

export default function Handbook(props) {
  const {navigation, data, goBack} = props;

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

        <Text style={styles.headingText}>
          The Mariner’s Role in Collecting Evidence Handbook
        </Text>

        <Text style={styles.textStyle}>A Guide To Good Practice</Text>

        <View style={styles.lineSeparator} />

        {data.map((item, index) => (
          <View key={index}>
            <HandbookCard
              item={item}
              onPress={() => {
                navigation.navigate('GuideScreen', {content: item});
              }}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
