import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {saveChecklistCategory} from '../../../../redux/actions';
import {ChecklistLanding} from '../../components';

// const landingList = [
//   {
//     label: 'Evidence checklist required for most incidents',
//     options: [{label: 'General'}],
//   },
//   {
//     label: 'Evidence checklist for incidents involving cargo',
//     options: [
//       {label: 'Dry Cargo Incident'},
//       {label: 'Liquid Cargo Incident'},
//       {label: 'Container Cargo Incident'},
//     ],
//   },
//   {
//     label: 'Evidence checklist for incidents related to ship',
//     options: [
//       {label: 'Vessel – Collision Damage'},
//       {label: 'Vessel – Damage To FFO'},
//       {label: 'Vessel – Non-contact Damage'},
//       {label: 'Vessel – Grounding, Stranding and Sinking'},
//       {label: 'Vessel – Salvage and general average'},
//     ],
//   },
//   {
//     label: 'Evidence checklist for incidents involving commercial disputes',
//     options: [
//       {label: 'New Building Warranty Dispute'},
//       {label: 'Port Delay Dispute'},
//       {label: 'Performance Warranty Dispute'},
//       {label: 'Port And Berth Safety Dispute'},
//       {label: 'Bunker Quality Dispute'},
//       {label: 'Bunker Quantity Dispute'},
//     ],
//   },
//   {
//     label: 'Evidence checklist for incidents involving people',
//     options: [
//       {label: 'Personal Injury'},
//       {label: 'Personal Illness'},
//       {label: 'Disciplinary Incident'},
//       {label: 'Industrial Action'},
//       {label: 'Stowaway'},
//       {label: 'Person In Distress'},
//       {label: 'Diversion'},
//     ],
//   },
//   {
//     label: 'Evidence checklist for incidents involving pollution',
//     options: [
//       {label: 'Oil Pollution'},
//       {label: 'Noxious Liquid Substance Pollution'},
//       {label: 'Sewage Pollution'},
//       {label: 'Garbage Pollution'},
//       {label: 'Air Pollution'},
//       {label: 'Water Pollution'},
//     ],
//   },
//   {
//     label:
//       'Evidence checklist for incidents involving Hull and Machinery insurance',
//     options: [{label: 'Hull and Machinery'}],
//   },
// ];

export default function ChecklistLandingScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [selectedTabIndex, setSelectedTabIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [checklistCategory, setChecklistCategory] = useState(null);
  const checkList = useSelector(state => state.checkListsReducer.checkList);
  useFocusEffect(
    React.useCallback(() => {
      setSelectedTabIndex(null);
      setSelectedOption('');
    }, []),
  );

  const onClickChecklistCategory = item => {
    setChecklistCategory(item);
  };

  const onSaveChecklistCategory = async () => {
    if (checklistCategory) {
      await dispatch(saveChecklistCategory(checklistCategory));
      navigation.navigate('GeneralFormScreen', {draftdata: null});
    } else {
      Alert.alert('Error', 'Please select any checklist before proceeding.', [
        {text: 'Ok', onPress: () => {}},
      ]);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  const config = useSelector(state => state?.checkListsReducer?.userConfig);
  const openHandbook = item => {
    const selectedHandbook = config.handbook.filter(
      handbooItem => handbooItem.category_id === item.category_id,
    );
    navigation.navigate('GuideScreen', {content: selectedHandbook[0]});
  };
  return (
    <ChecklistLanding
      {...props}
      landingList={checkList}
      selectedTabIndex={selectedTabIndex}
      setSelectedTabIndex={setSelectedTabIndex}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      onClickChecklistCategory={onClickChecklistCategory}
      onSaveChecklistCategory={onSaveChecklistCategory}
      goBack={goBack}
      openHandbook={openHandbook}
    />
  );
}
