import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './style';

export default function ModalView(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const {visible, onAccept, tncData} = props;
  const tncContent = `<!DOCTYPE html><html> <head>
    <title>Downloads</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.8" >
    
  </head><body>${tncData}</body></html>`;

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);
  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>{'Terms & Conditions'}</Text> */}
            <ScrollView style={styles.webView}>
              <RenderHtml
                contentWidth={useWindowDimensions().width}
                source={{html: tncContent}}
              />
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                onAccept();
              }}>
              <Text style={styles.textStyle}>{'Accept'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
