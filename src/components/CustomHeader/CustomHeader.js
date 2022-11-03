import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {images} from '../../resources';
import styles from './style';

export default function CustomHeader(props) {
  const {icon, onIconPress, changeDirection, backIcon, goBack} = props;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.setFlex}>
          {changeDirection && (
            <TouchableOpacity onPress={goBack}>
              <Image source={backIcon} style={styles.iconStyle} />
            </TouchableOpacity>
          )}
        </View>

        <Image
          resizeMode="contain"
          source={images.apexLogo}
          style={styles.logoStyle}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.setFlex, {alignItems: 'flex-end'}]}
          onPress={onIconPress}>
          <Image source={icon} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </>
  );
}
