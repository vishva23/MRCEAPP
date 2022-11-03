import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors} from '../../resources';
import styles from './style';

export default function CustomButton(props) {
  const {title, onPress, disabled, btnStyle, titleStyle, btnDisabled} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled || btnDisabled}
      style={[styles.container, btnStyle]}>
      {disabled ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <Text style={[styles.textStyle, titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
