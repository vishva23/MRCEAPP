import React from 'react';
import {View, TouchableOpacity, Image, TextInput} from 'react-native';
import {colors, images} from '../../resources';
import styles from './style';

export default function SearchBar(props) {
  const {value, onChangeText, onClose} = props;

  return (
    <View style={styles.textInputView}>
      <TextInput
        value={value}
        autoFocus={true}
        placeholder="Search here.."
        placeholderTextColor={colors.textGray}
        onChangeText={text => onChangeText(text)}
        style={styles.textInputStyle}
      />

      <TouchableOpacity activeOpacity={0.5} onPress={onClose}>
        <Image
          resizeMode="contain"
          source={images.close}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
}
