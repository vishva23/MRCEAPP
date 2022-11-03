/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetConfig,
  onGetDashboard,
  onGetIncidences,
  onPostFeedback,
  onPostIncident,
  onPostIncidentMedia,
  removeDraft,
  saveDraft,
  removeFeedback,
  removePending,
  savePending,
} from '../../../../redux/actions';
import { serverUrl } from '../../../../resources';
import { Dashboard } from '../../components';
var RNFS = require('react-native-fs');

export default  function DashboardScreen(props) {
  const [totalcount, settotalCount] = useState(0);
  const [totalfile, settotalfile] = useState(0);
  const [modalVisible, setmodalVisible] = useState(true);
  const [pdfLoader, setPdfLoader] = useState(false);
  

  

  const dispatch = useDispatch();
  const pendingForms = useSelector(
    state => state.checkListsReducer.pendingItems,
  );
  const draftlist = useSelector(state => state.checkListsReducer.draftItems);
  const networkState = useSelector(state => state.authReducer.networkState);
  const userIncidences = useSelector(
    state => state.checkListsReducer.userIncidences,
  );
  const savedFeedback = useSelector(
    state => state.checkListsReducer.savedFeedback,
  );
  const feedbackCategory = useSelector(
    state => state.checkListsReducer?.feedbackCategory,
  );
  let checklistCategory = useSelector(
    state => state.checkListsReducer.checklistCategory,
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const dashboard = useSelector(state => state.checkListsReducer?.dashboard);

  useEffect(() => {
    if (feedbackCategory && feedbackCategory?.length === 0) {
      dispatch(onGetConfig());
    }
  }, []);

  useEffect(() => {
    if (pendingForms?.length > 0) {
      uploadForm();
    }
    if (savedFeedback?.length > 0) {
      uploadFeedback();
    }
  }, [networkState, uploadForm, uploadFeedback]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userIncidences.length > 0) {
        for (let i of userIncidences) {
          if (!i.pdf_path) {
            console.log('update dashboard================', i.pdf_path)
            dispatch(onGetIncidences());
            dispatch(onGetDashboard());
            break
          }
        }

      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [userIncidences]);

  const uploadFeedback = () => {
    const copyFeedback = Array.from(savedFeedback);
    copyFeedback.forEach(async item => {
      try {
        const copyItem = { ...item };
        delete copyItem.id;
        await dispatch(onPostFeedback(copyItem));
        await dispatch(removeFeedback(item));
        Alert.alert('Success', 'Feedback has been sent successfully!', [
          { text: 'Ok', onPress: () => { } },
        ]);
      } catch (err) {
        Alert.alert('Error', err?.data?.message || '', [
          {
            text: 'Ok',
            onPress: () => { },
          },
        ]);
      }
    });
  };

  const uploadForm = async () => {
    for (let i of pendingForms) {
      const data = i;
      setmodalVisible(true);
      const mediaData = data.file;
      let total_files = [];
      await mediaData.map(i => {
        total_files = [...total_files, ...i.file];
      });

      if (total_files?.length > 0) {
        settotalfile(prevState => prevState + total_files?.length + 1);
      } else {
        settotalfile(prevState => prevState + 1);
      }
      // await uploadMedia(data, data.unique_id, new Date().getTime());
      // setmodalVisible(false);
      try {
        const response = await dispatch(
          onPostIncident({
            incidence: [{ ...data, incidence_status: 'draft' }],
          }),
        );

        if (response?.data?.status === 200) {
          settotalCount(prevState => prevState + 1);

          await uploadMedia(
            data,
            data.unique_id,
            response.data.result[data.unique_id],
          );
          setmodalVisible(false);
        } else {
          setmodalVisible(false);
        }
      } catch (err) {
        setmodalVisible(false);
      }
    }
  };

  const uploadMedia = async (
    incidenceData,
    incidence_unique_id,
    incidence_id,
  ) => {
    const mediaData = incidenceData.file;
    let count = 1;
    let tempCount = 1;
    let total_files = [];
    let TFiles = 0;
    await mediaData.map(i => {
      total_files = [...total_files, ...i.file];
      TFiles++;
    });

    let lastIndex = 0;
    let fileldIdArray = [];
    if (mediaData && mediaData.length > 0) {
      for (let i = 0; i < mediaData.length; i++) {
        const item = mediaData[i];
        if (i === mediaData.length - 1) {
          lastIndex = 1;
        }
        for (let j = 0; j < item.file.length; j++) {
          let imgFile = {};
          delete imgFile.__jsogObjectId;
          if(Platform.OS=='ios'){
          RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then(result => {
              const r = result.find((element) => {
                return element.name == item.file[j].name;
              })
              if(r){item.file[j].uri = r.path}

              // stat the first file
            });
          }

          fileldIdArray.push({ field_id: item.field_id, total_files: 1 });

          var reqFormData = new FormData();
          reqFormData.append('field_id', item.field_id);
          reqFormData.append('incidence_id', incidence_id);
          reqFormData.append('total_files', total_files.length);
          reqFormData.append('current_file_number', count);
          reqFormData.append('last_media_file', lastIndex);
          reqFormData.append('file', item.file[j]);

          console.log('reqFormData===',JSON.stringify(reqFormData))

          // const res = await dispatch(onPostIncidentMedia(reqFormData, i));
          const res = await imageUpload(
            reqFormData,
            incidenceData,
            incidence_unique_id,
            incidence_id,
          );

          TFiles--;
          settotalCount(prevState => prevState + 1);
          tempCount = tempCount + 1;

          if (res && TFiles <= 0 && lastIndex === 1) {
            var emailData = new FormData();
            emailData.append('fields', JSON.stringify(fileldIdArray));
            emailData.append('last_media_file', 1);
            if (incidence_id) {
              emailData.append('incidence_id', incidence_id);
            } else {
              emailData.append('incidence_unique_id', incidence_unique_id);
            }

            if (TFiles <= 0) {
              const res2 = await imageUpload(
                emailData,
                incidenceData,
                incidence_unique_id,
                incidence_id,
              );
              console.log('res2============',res2)
            
              if(res2.pdf_generate==1){
                const updateData = {
                  active_step: 0,
                  fields: [],
                  file: [],
                  incidence_status: 'submitted',
                  synced: false,
                  id: incidence_id,
                  unique_id: incidence_unique_id,
                  updated_at: new Date(),
                  recipient_email: incidenceData.recipient_email,
                  category_id: incidenceData.category_id,
                  sub_category_id: incidenceData.sub_category_id,
                  incidence_title: incidenceData.incidence_title,
                  incidence_desc: incidenceData.incidence_desc,
                  sub_category_title: incidenceData.sub_category_title,
                };
                await dispatch(
                  onPostIncident({
                    incidence: updateData,
                  }),
                );
                settotalCount(prevState => prevState + 1);
                tempCount = tempCount + 1;
                await dispatch(removePending(incidenceData));
                setTimeout(() => {
                  setmodalVisible(false);
                  setPdfLoader(false);
                  dispatch(onGetIncidences());
                  dispatch(onGetDashboard());
                }, 1500);
              }else{
                console.log('pdf failed log=========')
                await dispatch(removePending(incidenceData));
                await dispatch(
                  saveDraft({ ...incidenceData, incidence_status: 'draft' }),
                );
                Alert.alert(
                  'Error',
                  'Your connection is poor or the process has been interrupted, your checklist has been returned to draft. Please try to resubmit again when you have a better connection',
                  [{ text: 'Ok', onPress: () => { } }],
                  { cancelable: false },
                );
              }
            }
          }

          count++;
        }
      }
    } else {
      for (const key in incidenceData.fields) {
        if (incidenceData.fields.hasOwnProperty(key)) {
          const element = incidenceData.fields[key];
          fileldIdArray.push({ field_id: element.field_id, total_files: 1 });
        }
      }

      var emailData = new FormData();
      emailData.append('fields', JSON.stringify(fileldIdArray));
      emailData.append('last_media_file', 1);
      if (incidence_id) {
        emailData.append('incidence_id', incidence_id);
      } else {
        emailData.append('incidence_unique_id', incidence_unique_id);
      }

      const res2 = await imageUpload(
        emailData,
        incidenceData,
        incidence_unique_id,
        incidence_id,
      );
     
      if(res2.pdf_generate==1){
        const updateData = {
          active_step: 0,
          fields: [],
          file: [],
          incidence_status: 'submitted',
          synced: false,
          id: incidence_id,
          unique_id: incidence_unique_id,
          updated_at: new Date(),
          recipient_email: incidenceData.recipient_email,
          category_id: incidenceData.category_id,
          sub_category_id: incidenceData.sub_category_id,
          incidence_title: incidenceData.incidence_title,
          incidence_desc: incidenceData.incidence_desc,
          sub_category_title: incidenceData.sub_category_title,
        };
        await dispatch(
          onPostIncident({
            incidence: updateData,
          }),
        );
        await dispatch(removePending(incidenceData));

        setTimeout(() => {
          setmodalVisible(false);
          setPdfLoader(false);
          dispatch(onGetIncidences());
          dispatch(onGetDashboard());
        }, 1500);
      }else{
        console.log('upload failed log=========')

        await dispatch(removePending(incidenceData));
        await dispatch(
          saveDraft({ ...incidenceData, incidence_status: 'draft' }),
        );
        Alert.alert(
          'Error',
          'Your connection is poor or the process has been interrupted, your checklist has been returned to draft. Please try to resubmit again when you have a better connection',
          [{ text: 'Ok', onPress: () => { } }],
          { cancelable: false },
        );
      }
    }
  };
  function processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
  const imageUpload = async (
    formData,
    incidenceData,
    incidence_unique_id,
    incidence_id,
  ) => {
    const token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append(
      'x-api-key',
      'b1e93b06dec05da515706995c9b26ae2d6f17186c71917a1df86f2fe0abbc549',
    );
    myHeaders.append('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    const res = fetch(`${serverUrl}/media-chunk`, requestOptions)
      .then(processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.log("statusCode", statusCode);
        console.log("data", data);
        return data;

      })


      .catch(async error => {
        // await saveToDraft(incidenceData);
        await dispatch(removePending(incidenceData));
        await dispatch(
          saveDraft({ ...incidenceData, incidence_status: 'draft' }),
        );
        Alert.alert(
          'Error',
          'Your connection is poor or the process has been interrupted, your checklist has been returned to draft. Please try to resubmit again when you have a better connection',
          [{ text: 'Ok', onPress: () => { } }],
          { cancelable: false },
        );
        throw error?.message || err;
      });
    return res;
  };


  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      await dispatch(onGetDashboard());
      await dispatch(onGetIncidences());
    });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (networkState == false) {
        if (pendingForms?.length > 0) {
          uploadForm();
        }
      }
      await dispatch(onGetDashboard());
      await dispatch(onGetIncidences());
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
    }
  };
  return (
    <Dashboard
      {...props}
      data={userIncidences}
      pendingForms={pendingForms}
      draftlist={draftlist}
      onRefresh={onRefresh}
      refreshing={refreshing}
      dashboard={dashboard}
      count={totalcount / totalfile}
      modalVisible={modalVisible}
      pdfLoader={pdfLoader}
    />
  );
}
