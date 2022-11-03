import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {images} from '../../resources';
import styles from './style';

export default function CustomTab(props) {
  const {value, label, iconColor, onPress, borderWidth} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, {borderWidth: borderWidth}]}
      onPress={onPress}>
      <View style={styles.flexRowView}>
        <Text numberOfLines={1} style={styles.textStyle}>
          {value}
        </Text>

        <Image
          resizeMode="contain"
          source={images.radioButton}
          style={[styles.iconStyle, {tintColor: iconColor}]}
        />
      </View>

      <Text numberOfLines={1} style={styles.labelStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
