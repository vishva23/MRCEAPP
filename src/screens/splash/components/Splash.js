import React from 'react';
import {SafeAreaView, Image, ImageBackground} from 'react-native';
import {images} from '../../../resources';
import styles from './style';

export default function Splash(props) {
  const {} = props;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={images.apexBackground}
        style={styles.imageBackground}>
        <Image
          resizeMode="contain"
          source={images.apexLogo}
          style={styles.logoStyle}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
