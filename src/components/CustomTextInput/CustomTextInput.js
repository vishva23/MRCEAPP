import React from 'react';
import {View, TextInput, Image, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../resources';
import styles from './style';

export default function CustomTextInput(props) {
  const {
    value,
    placeholder,
    onChangeText,
    autoCapitalize,
    keyboardType,
    secure,
    editable,
    icon,
    onIconPress,
    containerStyle,
    txtInputStyle,
    iconSize,
    multiline,
    label,
    labelStyle,
    maxLength,
    isRequired,
    pointerEvents,
    requireToggle,
    checkValue,
  } = props;

  return (
    <View
      style={{flex: 1}}
      pointerEvents={pointerEvents ? pointerEvents : 'auto'}>
      <View style={styles.flexRow}>
        {label ? (
          <Text style={[styles.labelStyle, labelStyle]}>{label + ' '}</Text>
        ) : null}
        {isRequired === 'true' && value !== 'Attachment' ? (
          <Text style={[styles.labelStyle, {color: colors.primaryPink}]}>
            *
          </Text>
        ) : null}
      </View>
      <View
        style={[
          styles.textInputView,
          containerStyle,
          {
            borderColor:
              isRequired === 'true' && checkValue == '' && requireToggle
                ? colors.primaryRed
                : colors.borderGrey,
          },
        ]}>
        <TextInput
          value={value}
          editable={editable}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          maxLength={maxLength || undefined}
          onChangeText={text => onChangeText(text)}
          autoCapitalize={autoCapitalize || 'sentences'}
          keyboardType={keyboardType || 'default'}
          secureTextEntry={secure || false}
          style={[
            multiline ? styles.textArea : styles.textInputStyle,
            txtInputStyle,
          ]}
          pointerEvents={editable == false ? 'none' : undefined}
        />

        {icon && (
          <TouchableOpacity activeOpacity={0.5} onPress={onIconPress}>
            <Image
              resizeMode="contain"
              source={icon}
              style={[styles.iconStyle, iconSize]}
            />
          </TouchableOpacity>
        )}

        {value && maxLength ? (
          <Text style={styles.maxLengthCounter}>
            {maxLength - value.length}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
