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
  CustomButton,
  CustomHeader,
  CustomModal,
  CustomTextInput,
  LinkCard,
  PickerContent,
} from '../../../components';
import {colors, images} from '../../../resources';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Feedback(props) {
  const {
    navigation,
    feedback,
    setFeedback,
    setFeedStatus,
    feedStatusItems,
    pickerModal,
    setPickerModal,
    loader,
    onSubmit,
    selectImage,
    file,
    setFeedbackLabel,
    feedbackLabel,
    goBack,
  } = props;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}> */}
      <KeyboardAwareScrollView
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollView}>
        <CustomHeader
          goBack={goBack}
          backIcon={images.leftArrow}
          changeDirection
          icon={images.menu}
          onIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <Text style={[styles.headingText, {marginTop: 25}]}>FEEDBACK</Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{marginTop: 20}}
          onPress={() => setPickerModal(true)}>
          <CustomTextInput
            pointerEvents={'none'}
            editable={false}
            value={feedbackLabel}
            icon={images.downArrow}
            onIconPress={() => {}}
            containerStyle={{backgroundColor: colors.white}}
          />
        </TouchableOpacity>

        <View style={styles.lineSeparator} />

        <CustomTextInput
          value={feedback}
          placeholder=""
          multiline={true}
          onChangeText={text => setFeedback(text)}
          containerStyle={{backgroundColor: colors.white}}
        />

        <View>
          <LinkCard
            onPress={selectImage}
            icon={images.paperClip}
            label="Attachment"
          />
        </View>
        {file ? (
          <View>
            <Text>{file.name}</Text>
          </View>
        ) : null}

        <CustomButton
          disabled={loader}
          title="SEND"
          onPress={onSubmit}
          btnStyle={styles.btnStyle}
        />
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>

      <CustomModal
        isVisible={pickerModal}
        onDismiss={() => setPickerModal(false)}
        content={
          <PickerContent
            heading="Select Feedback"
            pickerItems={feedStatusItems}
            onSelectItem={item => {
              setFeedStatus(item.value);
              setFeedbackLabel(item.label);
            }}
            onCloseModal={() => setPickerModal(false)}
          />
        }
      />
    </SafeAreaView>
  );
}
