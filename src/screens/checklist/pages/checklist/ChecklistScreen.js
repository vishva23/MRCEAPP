import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  onGetIncidences,
  saveChecklistCategory,
  onGetParticularIncidence,
  onGetDashboard,
} from '../../../../redux/actions';
import { Checklist } from '../../components';
import { clockRunning } from 'react-native-reanimated';

// const data = [
//   // {
//   //   incidence_status: 'Pending',
//   //   incidence_title: 'Evidence checklist for incidents',
//   //   incidence_desc: 'EVER GIVEN stuck in Suez Canal.',
//   //   updated_at: new Date(),
//   // },
//   {
//     incidence_status: 'Submitted',
//     incidence_title: 'Evidence checklist for incidents',
//     incidence_desc: 'Jhon injured during work time.',
//     updated_at: new Date(),
//   },
//   // {
//   //   incidence_status: 'Draft',
//   //   incidence_title: 'Evidence For Personal Illness',
//   //   incidence_desc: 'Leif Erikson netting incident.',
//   //   updated_at: new Date(),
//   // },
//   {
//     incidence_status: 'Submitted',
//     incidence_title: 'Evidence checklist for pollution',
//     incidence_desc: 'Wakashio major fuel leak.',
//     updated_at: new Date(),
//   },
// ];

export default function ChecklistScreen(props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const tabStatus = route?.params?.tabStatus;
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const draftlist = useSelector(state => state.checkListsReducer.draftItems);
  const pendingForms = useSelector(
    state => state.checkListsReducer.pendingItems,
  );
  const userIncidences = useSelector(
    state => state.checkListsReducer.userIncidences,
  );
  const checkList = useSelector(state => state.checkListsReducer.checkList);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      await dispatch(onGetIncidences());
    });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (tabStatus) {
        setStatus(tabStatus);
      } else {
        setStatus('');
      }
    }, [tabStatus]),
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userIncidences.length > 0) {
        for (let i of userIncidences) {
          if (!i.pdf_path) {
            console.log('update dashboard================',i.pdf_path)
            dispatch(onGetIncidences());
            dispatch(onGetDashboard());
            break
          }
        }

      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [userIncidences]);
  const onPressStatusTab = statusVal => {
    if (status === statusVal) {
      setStatus('');
    } else {
      setStatus(statusVal);
    }
  };

  const onClickChecklistItem = async item => {
    const res = await dispatch(onGetParticularIncidence(item.incidence_id));

    let formStates = [];
    let file = [];
    let findCategory = checkList.find(
      a => a.category_id === item.category.category_id,
    );
    let findSubCategory = findCategory.subcategories.find(
      b => b.sub_category_id === item.subcategory.sub_category_id,
    );
    await Object.entries(res.data.result.saved_items).map(res => {
      if (res[1]?.fields !== undefined) {
        Object.entries(res[1].fields[0]).map(element => {
          if (typeof element[1] === 'object') {
            if (element[1]?.field_value !== undefined) {
              formStates.push(element[1]);
            }
            if (element[1]?.media !== undefined) {
              file.push({
                field_id: element[1].field_id,
                field_title: element[1]?.field_title,
                file: element[1]?.media,
              });
            }
          }
        });
      }
    });

    // console.log('checked drafted:', JSON.stringify(item));
    // let findCategory = checkList.find(
    //   a => a.category_id === item.category.category_id,
    // );
    // let findSubCategory = findCategory.subcategories.find(
    //   b => b.sub_category_id === item.subcategory.sub_category_id,
    // );
    // // console.log('found:', findSubCategory);
    // await Object.entries(item.saved_items).map(res => {
    //   if (res[1]?.fields !== undefined) {
    //     // console.log('state:', res[1].fields[0]);
    //     Object.entries(res[1].fields[0]).map(element => {
    //       if (typeof element[1] === 'object') {
    //         // console.log('maintain:', element[1]);
    //         if (element[1]?.field_value !== undefined) {
    //           formStates.push(element[1]);
    //         }
    //         if (element[1]?.media !== undefined) {
    //           file.push({
    //             field_id: element[1].field_id,
    //             field_title: element[1]?.field_title,
    //             file: element[1]?.media,
    //           });
    //         }
    //       }
    //     });
    //   }
    // });
    // let copyCategory = {
    //   ...findSubCategory,
    //   incidence_id: item.incidence_id,
    //   incidence_title: item.incidence_title,
    //   incidence_desc: item.incidence_description,
    //   formStates,
    //   category_id: item.category.category_id,
    //   category_title: item.category.category_title,
    //   file,
    // };
    let copyCategory = {
      ...findSubCategory,
      incidence_id: res.data.result.incidence_id,
      incidence_title: res.data.result.incidence_title,
      incidence_desc: res.data.result.incidence_description,
      formStates,
      category_id: res.data.result.category.category_id,
      category_title: res.data.result.category.category_title,
      file,
    };

    await dispatch(saveChecklistCategory(copyCategory));
    navigation.navigate('GeneralFormScreen');
  };

  const onClickDraftlistItem = async item => {
    let formdata = [];
    let file = [];
    let findCategory = checkList.find(a => a.category_id === item.category_id);
    let findSubCategory = findCategory.subcategories.find(
      b => b.sub_category_id === item.sub_category_id,
    );
    for (i of item.fields) {
      formdata.push(i)
    }
    for (j of item.file) {
      formdata.push(j)
    }
    file = item.file;

    let copyCategory = {
      ...findSubCategory,
      incidence_id: '',
      incidence_title: item.incidence_title,
      incidence_desc: item.incidence_description,
      formStates: formdata,
      category_id: item.category_id,
      category_title: findCategory.category_title,
      file,
    };

    await dispatch(saveChecklistCategory(copyCategory));
    navigation.navigate('GeneralFormScreen', { draftdata: item });
  };
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(onGetIncidences());
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Checklist
      {...props}
      data={userIncidences}
      isSearch={isSearch}
      setIsSearch={setIsSearch}
      searchText={searchText}
      setSearchText={setSearchText}
      status={status}
      setStatus={setStatus}
      onPressStatusTab={onPressStatusTab}
      pendingForms={pendingForms}
      draftlist={draftlist}
      onClickChecklistItem={onClickChecklistItem}
      onClickDraftlistItem={onClickDraftlistItem}
      onRefresh={onRefresh}
      refreshing={refreshing}
      goBack={goBack}
    />
  );
}
