/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CustomButton, CustomHeader, CustomTextInput} from '../../../components';
import {colors, images} from '../../../resources';
import styles from './style';

export default function GeneralForm(props) {
  const {
    navigation,
    flatListRef,
    tabs,
    media,
    formTitle,
    formFields,
    selectedTab,
    onNextBtnPress,
    selectedTabIndex,
    setSelectedTabIndex,
    onChangeText,
    checklistName,
    setChecklistName,
    onSaveDraft,
    formStates,
    isDatePickerVisible,
    setDatePickerVisibility,
    handleDateConfirm,
    setSelectedField,
    handleChoosePhoto,
    onRemoveImage,
    goBack,
    prevTabIndex,
    onClickTabs,
    openHandbook,
    loader,
    modal,
    onModalClose,
    modalItem,
    handleChooseGalleryPhoto,
    handleChoosePDF,
    handleChooseCameraPhoto,
    handleChooseCameraVideo,
    requireToggle,
  } = props;

  const [isOnlyDate, setDateOnly] = useState(false);
  const getValue = item => {
    const index = formStates.findIndex(i => i.field_id === item.field_id);

    if (index > -1) {
      return formStates[index].field_value;
    } else {
      return '';
    }
  };

  const getDateValue = item => {
    const index = formStates.findIndex(i => i.field_id === item.field_id);

    if (index > -1) {
      const date = formStates[index].field_value;
      const dateFormat =
        item.input_type == 12
          ? date
          : `${moment(date).format('DD-MM-YYYY')}, ${moment(date).format(
              'hh:mm A',
            )}`;
      return dateFormat;
    } else {
      return '';
    }
  };

  const getMedia = item => {
    const index = media?.findIndex(i => i.field_id === item.field_id);
    const files = media[index]?.file || media[index];
    if (files?.length > 0) {
      return files.map((i, ind) => {
        return (
          <View key={ind} style={styles.imageContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.crossIconContainer}
              onPress={() => onRemoveImage(item, ind)}>
              <Image source={images.remove} style={styles.crossIconStyle} />
            </TouchableOpacity>
            <Image
              source={
                i.type && i.type.includes('pdf')
                  ? images.pdf
                  : {uri: i?.uri ? i.uri : i.media_path}
              }
              style={styles.imageStyle}
              defaultSource={images.video}
            />
          </View>
        );
      });
    } else {
      return null;
    }
  };
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
        <View style={{paddingHorizontal: 20}}>
          <CustomHeader
            goBack={goBack}
            backIcon={images.leftArrow}
            changeDirection
          />
        </View>

        <View style={styles.flexRowView}>
          <Text style={styles.headingText}>{formTitle}</Text>

          <TouchableOpacity onPress={openHandbook}>
            <Image
              resizeMode="contain"
              source={images.book}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.topView}>
          <Image
            resizeMode="contain"
            source={images.edit}
            style={styles.editIconStyle}
          />

          <CustomTextInput
            value={checklistName}
            placeholder="Enter checklist name"
            onChangeText={text => setChecklistName(text)}
            containerStyle={styles.titleInputContainer}
            txtInputStyle={styles.titleInputStyle}
          />

          <View style={styles.verticalLineSeparator} />

          <Text numberOfLines={1} style={styles.textStyle}>
            {moment().format('HH:mm')} (GMT) {moment().format('DD-MM-YYYY')}
          </Text>
        </View>

        <View style={styles.lineSeparator} />

        <View>
          <FlatList
            horizontal
            data={tabs}
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View key={index}>
                <CustomButton
                  title={item.item_title}
                  onPress={() => onClickTabs(index)}
                  titleStyle={[
                    styles.btnTitle,
                    {
                      color:
                        selectedTabIndex === index
                          ? colors.textGray
                          : colors.black,
                    },
                  ]}
                  btnStyle={[
                    styles.tabBtnStyle,
                    {
                      backgroundColor:
                        selectedTabIndex === index
                          ? colors.lightGrey
                          : index < selectedTabIndex
                          ? colors.green
                          : colors.white,
                    },
                  ]}
                />
              </View>
            )}
            keyExtractor={(item, index) => index}
            contentContainerStyle={styles.horizontalScrollView}
          />
        </View>

        <View style={styles.mainView}>
          {formFields
            ?.filter(i => i.checklist_item_id === selectedTab.checklist_item_id)
            .map((item, index) =>
              item.input_datatype === 'blank' ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setSelectedField(item);
                    setDateOnly(item.input_type == 12);
                    setDatePickerVisibility(true);
                  }}>
                  <CustomTextInput
                    checkValue={getValue(item)}
                    value={getDateValue(item)}
                    placeholder=""
                    editable={false}
                    label={item.field_title}
                    labelStyle={styles.labelStyle}
                    isRequired={item.validations[0]?.validation_value}
                    requireToggle={requireToggle}
                    containerStyle={{backgroundColor: colors.white}}
                    icon={images.calendar}
                    onIconPress={() => {
                      setSelectedField(item);
                      setDatePickerVisibility(true);
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <View key={index}>
                  <CustomTextInput
                    checkValue={getValue(item)}
                    value={getValue(item)}
                    placeholder=""
                    label={item.field_title}
                    labelStyle={styles.labelStyle}
                    isRequired={item.validations[0]?.validation_value}
                    requireToggle={requireToggle}
                    maxLength={parseInt(
                      item.validations[1]?.validation_value,
                      10,
                    )}
                    keyboardType={
                      item.input_datatype === 'integer' ? 'number-pad' : ''
                    }
                    onChangeText={text =>
                      onChangeText(item.field_id, item.field_title, text)
                    }
                    containerStyle={{backgroundColor: colors.white}}
                  />

                  {item?.input_datatype === 'text_multi_upload' ? (
                    <>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handleChoosePhoto(item)}>
                        <CustomTextInput
                          checkValue={getValue(item)}
                          value="Attachment"
                          placeholder=""
                          editable={false}
                          icon={images.paperClip}
                          containerStyle={{
                            marginTop: -15,
                            backgroundColor: colors.white,
                          }}
                          isRequired={item.validations[0]?.validation_value}
                          requireToggle={requireToggle}
                          onIconPress={() => {
                            handleChoosePhoto(item);
                          }}
                        />
                      </TouchableOpacity>
                      <View style={styles.mediaViewer}>{getMedia(item)}</View>
                    </>
                  ) : null}
                </View>
              ),
            )}
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>

      <View style={styles.btnContainer}>
        <CustomButton
          title="SAVE DRAFT"
          onPress={onSaveDraft}
          titleStyle={{color: colors.textGray}}
          btnStyle={[styles.btnStyle, {backgroundColor: colors.darkGray}]}
        />
        <CustomButton
          title="NEXT"
          onPress={onNextBtnPress}
          btnStyle={[styles.btnStyle, {backgroundColor: colors.black}]}
        />
      </View>

      <DateTimePicker
        mode={isOnlyDate ? 'date' : 'datetime'}
        display={isOnlyDate ? 'spinner' : 'spinner'}
        maximumDate={new Date()}
        isVisible={isDatePickerVisible}
        onConfirm={date => {
          const dateFormat = moment(date).format('DD-MM-YYYY');
          handleDateConfirm(isOnlyDate ? dateFormat : date);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      {loader && (
        <ActivityIndicator isVisible={loader} style={{marginBottom: 5}} />
      )}
      {modal && (
        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => onModalClose()}>
                <Image
                  resizeMode="contain"
                  source={images.close}
                  style={styles.closeButton}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => {
                  handleChooseCameraPhoto(modalItem);
                }}>
                <Text>Capture Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraVideoButton}
                onPress={() => {
                  handleChooseCameraVideo(modalItem);
                }}>
                <Text>Capture Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.gallaryButton}
                onPress={() => {
                  handleChooseGalleryPhoto(modalItem);
                }}>
                <Text>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.pdfButton}
                onPress={() => {
                  handleChoosePDF(modalItem);
                }}>
                <Text>PDF Documents</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
