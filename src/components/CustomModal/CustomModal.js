import React from 'react';
import {useWindowDimensions} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';

export default function CustomModal(props) {
  const {isVisible, onDismiss, content} = props;
  const {height, width} = useWindowDimensions();

  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={width}
      deviceHeight={height + height}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={onDismiss}
      useNativeDriver={true}
      style={styles.root}>
      {content}
    </Modal>
  );
}
