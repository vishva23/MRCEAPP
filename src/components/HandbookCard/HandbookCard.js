import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';

export default function HandbookCard(props) {
  const {item, onPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.lineSeparator} />

      <Text style={styles.textStyle}>{item?.handbook_title || item.label}</Text>
    </TouchableOpacity>
  );
}
