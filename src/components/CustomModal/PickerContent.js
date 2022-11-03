import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CustomButton} from '..';
import styles from './style';

export default function PickerContent(props) {
  const {onCloseModal, heading, pickerItems, onSelectItem} = props;

  return (
    <>
      <View style={styles.pickerContainer}>
        <Text style={styles.modalTitle1}>{heading}</Text>

        {pickerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              onSelectItem(item);
              onCloseModal();
            }}>
            <View style={styles.lineSeparator} />
            <Text style={styles.pickerItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton
        title="Cancel"
        onPress={onCloseModal}
        titleStyle={styles.modalBtnTitle}
        btnStyle={styles.modalBtnStyle}
      />
    </>
  );
}
