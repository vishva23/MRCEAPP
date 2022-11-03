import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Guide} from '../../components';

export default function GuideScreen(props) {
  const navigation = useNavigation();
  const {route} = props;
  const {content} = route?.params;
  const source = {
    html: content?.description,
  };

  const goBack = () => {
    navigation.goBack();
    // navigation.navigate('HandbookScreen');
  };
  return (
    <Guide {...props} source={source} navigation={navigation} goBack={goBack} />
  );
}
