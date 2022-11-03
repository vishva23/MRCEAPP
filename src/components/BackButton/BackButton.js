import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {images} from '../../resources';
import styles from './style';

export default function BackButton(props) {
  const {onPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}>
      <Image
        resizeMode="contain"
        source={images.backArrow}
        style={styles.iconStyle}
      />

      <Text style={styles.textStyle}>Back</Text>
    </TouchableOpacity>
  );
}
