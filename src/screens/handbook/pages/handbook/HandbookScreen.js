import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Handbook} from '../../components';

const data = [
  {
    label: '1. Collecting and preserving factual evidence',
  },
  {
    label: '2. Evidence required for most incidents',
  },
  {
    label: '3. Evidence required for most incidents',
  },
  {
    label: '4. Evidence for incidents involving cargo',
  },
  {
    label: '5. Evidence for pollution incidents caused by the vessel',
  },
  {
    label: '6. Evidence for incidents caused by the vessel',
  },
  {
    label: '7. Evidence for H&M incidents',
  },
  {
    label: '8. Evidence for commercial disputes',
  },
];

export default function HandbookScreen(props) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const config = useSelector(state => state?.checkListsReducer?.userConfig);
  // console.log("config?.handbook",config?.handbook);

  return (
    <Handbook {...props} data={config?.handbook || data} goBack={goBack} />
  );
}
