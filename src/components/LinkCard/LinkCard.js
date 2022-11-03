import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';

export default function LinkCard(props) {
  const {icon, label, onPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.iconView}>
        <Image resizeMode="contain" source={icon} style={styles.iconStyle} />
      </View>

      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
