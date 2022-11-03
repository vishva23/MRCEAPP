import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { clockRunning } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetDashboard,
  onGetIncidences,
  onPostIncident,
  onPostIncidentMedia,
  removeDraft,
  removePending,
  saveDraft,
  savePending,
} from '../../../../redux/actions';
import { serverUrl } from '../../../../resources';
import { Verify } from '../../components';
var RNFS = require('react-native-fs');

export default function VerifyScreen(props) {
  const [totalcount, settotalCount] = useState(0);
  const [totalfile, settotalfile] = useState(0);
  const [modalVisible, setmodalVisible] = useState(false);
  const [pdfLoader, setPdfLoader] = useState(false);
  const networkState = useSelector(state => state.authReducer.networkState);

  const dispatch = useDispatch();
  const { navigation, route } = props;
  const { checklistName, formData, mediaData, id, draftdata } = route?.params;
  const [email, setEmail] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [draft, setDraft] = useState({})
  const [finalres, finalsetRes] = useState({})
  const checklistCategory = useSelector(
    state => state.checkListsReducer.checklistCategory,
  );
  let isNetworkError = true;

  useEffect(() => { }, [networkState]);
  const uploadMedia = async (formData, incidence_unique_id, incidence_id) => {
    let count = 1;
    let total_files = [];
    await mediaData.map(i => {
      total_files = [...total_files, ...i.file];
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
          const imgFile = item.file[j];
          delete imgFile.__jsogObjectId;
          if(Platform.OS=='ios'){
            RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then(result => {
              if(result){

              }
              const r = result.find((element) => {
                return element.name === item.file[j].name;
              })
              if(r) {item.file[j].uri = r.path}
             // console.log('GOT RESULT', r);

              // stat the first file
            });
          }
       
          fileldIdArray.push({ field_id: item.field_id, total_files: 1 });
          var reqFormData = new FormData();
          // reqFormData.append('field_id', '276440383297283');
          reqFormData.append('field_id', item.field_id);
          reqFormData.append('incidence_id', incidence_id);
          reqFormData.append('total_files', total_files.length);
          reqFormData.append('current_file_number', count);
          // reqFormData.append('is_react', 'true');
          reqFormData.append('last_media_file', lastIndex);
          reqFormData.append('file', item.file[j]);

          // console.log(reqFormData);

          // await dispatch`(onPostIncidentMedia(reqFormData));

          // const res = await dispatch(onPostIncidentMedia(reqFormData, i));
          const res = await imageUpload(reqFormData, i);
          console.log('ressss=======',res)
          settotalCount(prevState => prevState + 1);
          // console.log(JSON.stringify(res));
          // console.log({lastIndex});

          if (res && totalcount == totalfile && lastIndex === 1) {
            var emailData = new FormData();
            emailData.append('fields', JSON.stringify(fileldIdArray));
            emailData.append('last_media_file', 1);

            if (incidence_id) {
              emailData.append('incidence_id', incidence_id);
            } else {
              emailData.append('incidence_unique_id', incidence_unique_id);
            }

            // console.log(reqFormData);

            // console.log('====================================');
            // console.log(fileldIdArray);
            // console.log('====================================');
            if (total_files?.length == count) {
              const res2 = await imageUpload(emailData, i);
              console.log('ressss=======',res2)
              if(res2.pdf_generate==1){
                console.log('res2.pdf_generate',res2.pdf_generate)
                const updateData = {
                  active_step: 0,
                  fields: [],
                  file: [],
                  incidence_status: 'submitted',
                  synced: false,
                  id: incidence_id,
                  unique_id: incidence_unique_id,
                  updated_at: new Date(),
                  recipient_email: formData.recipient_email,
                  category_id: formData.category_id,
                  sub_category_id: formData.sub_category_id,
                  incidence_title: formData.incidence_title,
                  incidence_desc: formData.incidence_desc,
                  sub_category_title: formData.sub_category_title,
                };

                await dispatch(
                  onPostIncident({
                    incidence: updateData,
                  }),
                );
                if (draftdata) {
                  await dispatch(removeDraft(draftdata));
                }
                settotalCount(prevState => prevState + 1);

                setTimeout(() => {
                  setmodalVisible(false);
                  setPdfLoader(false);
                  dispatch(onGetIncidences());
                  dispatch(onGetDashboard());

                    navigation.navigate('ThankyouScreen');
                }, 1500);
              }else{
                if (draftdata) {
                  await dispatch(removeDraft(draftdata));
                }
        
        
                await AsyncAlert(
                  'Your connection is poor or the process has been interrupted, your checklist has been returned to draft. Please try to resubmit again when you have a better connection',
                );
              }


               
              
            }
          }
          count++;
        }
      }
    } else {
      // console.log('formData.fields=>', JSON.stringify(formData.fields));
      for (const key in formData.fields) {
        if (formData.fields.hasOwnProperty(key)) {
          const element = formData.fields[key];
          fileldIdArray.push({ field_id: element.field_id, total_files: 1 });
        }
      }

      var emailData = new FormData();
      emailData.append('fields', JSON.stringify(fileldIdArray));
      emailData.append('last_media_file', 1);
      // emailData.append('incidence_id', incidence_id);
      if (incidence_id) {
        emailData.append('incidence_id', incidence_id);
      } else {
        emailData.append('incidence_unique_id', incidence_unique_id);
      }
      // console.log('====================================');
      // console.log(fileldIdArray);
      // console.log('====================================');
      const res2 = await imageUpload(emailData);
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
          recipient_email: formData.recipient_email,
          category_id: formData.category_id,
          sub_category_id: formData.sub_category_id,
          incidence_title: formData.incidence_title,
          incidence_desc: formData.incidence_desc,
          sub_category_title: formData.sub_category_title,
        };
        await dispatch(
          onPostIncident({
            incidence: updateData,
          }),
        );
        if (draftdata) {
          await dispatch(removeDraft(draftdata));
        }
        setTimeout(() => {
          setmodalVisible(false);
          setPdfLoader(false);
          navigation.navigate('ThankyouScreen');
          dispatch(onGetIncidences());
          dispatch(onGetDashboard());
        }, 500);
      }else{
        if (draftdata) {
          await dispatch(removeDraft(draftdata));
        }


        await AsyncAlert(
          'Your connection is poor or the process has been interrupted, your checklist has been returned to draft. Please try to resubmit again when you have a better connection',
        );
      }
    }
  };

  const onSubmit = async () => {
    setLoader(true);
    const regx = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '' || regx.test(email.replace(/\s/g, '')) == false) {
      setLoader(false);
      Alert.alert(
        'Error',
        'The email addresses you entered do not match, please try again.',
        [{ text: 'Ok', onPress: () => { } }],
      );
    } else if (
      confirmedEmail == '' ||
      regx.test(confirmedEmail.replace(/\s/g, '')) == false
    ) {
      setLoader(false);
      Alert.alert(
        'Error',
        'The email email addresses you entered do not match, please try again.',
        [{ text: 'Ok', onPress: () => { } }],
      );
    } else if (
      email !== '' &&
      confirmedEmail !== '' &&
      email !== confirmedEmail
    ) {
      setLoader(false);
      Alert.alert(
        'Error',
        'The email addresses you entered do not match, please try again.',
        [{ text: 'Ok', onPress: () => { } }],
      );
    } else {
      setmodalVisible(true);
      let total_files = [];
      await mediaData.map(i => {
        total_files = [...total_files, ...i.file];
      });
      // console.log('total file length', total_files?.length);
      if (total_files?.length > 0) {
        settotalfile(prevState => prevState + total_files?.length + 1);
      } else {
        settotalfile(prevState => prevState + 1);
      }
      try {
        const unique_id = new Date().getTime();
        const data = {
          active_step: 0,
          fields: formData,
          file: mediaData,
          unique_id: unique_id,
          updated_at: new Date(),
          recipient_email: email,
          incidence_status: 'pending',
          // incidence_status: 'submitted',
          category_id: checklistCategory.category_id,
          sub_category_id: checklistCategory.sub_category_id,
          incidence_title: checklistName,
          incidence_desc: checklistName,
          sub_category_title: checklistCategory.sub_category_title,
          synced: false,
        };

        const array = [];
        await formData.map((item, index) => {
          if (item?.field_value) {
            array.push({
              field_id: item.field_id,
              field_title: item.field_title,
              field_value: item?.field_value,
            });
          }
        });
        const UpdateData = {
          active_step: 0,
          fields: array,
          file: mediaData,
          unique_id: unique_id,
          updated_at: new Date(),
          recipient_email: email,
          incidence_status: 'submitted',
          category_id: checklistCategory.category_id,
          sub_category_id: checklistCategory.sub_category_id,
          incidence_title: checklistName,
          incidence_desc: checklistName,
          sub_category_title: checklistCategory.sub_category_title,
          synced: false,
          id: id,
        };
        //  await dispatch(removeDraft(data));
        const response = await dispatch(
          onPostIncident({
            incidence: [{ ...data, incidence_status: 'draft' }],
          }),
        );
        if (response?.data?.status === 200) {
          isNetworkError = false;
          settotalCount(prevState => prevState + 1);
          // await dispatch(removePending(data));
          // setTimeout(() => {
          await uploadMedia(data, unique_id, response?.data?.result[unique_id]);
          setLoader(false);
          setmodalVisible(false);
        } else {
          setLoader(false);
          Alert.alert('Error', response?.data?.message, [
            { text: 'Ok', onPress: () => { } },
          ]);
        }
      } catch (err) {
        setLoader(false);
        setmodalVisible(false);
        if (isNetworkError) {
          const unique_id = new Date().getTime();
          const data = {
            active_step: 0,
            fields: formData,
            file: mediaData,
            unique_id: unique_id,
            updated_at: new Date(),
            recipient_email: email,
            incidence_status: 'pending',
            // incidence_status: 'submitted',
            category_id: checklistCategory.category_id,
            sub_category_id: checklistCategory.sub_category_id,
            incidence_title: checklistName,
            incidence_desc: checklistName,
            sub_category_title: checklistCategory.sub_category_title,
            synced: false,
          };
          if (draftdata) {
            await dispatch(removeDraft(draftdata))
          }
          await dispatch(savePending(data));

          Alert.alert(
            '',
            err?.data?.message ||
            'You are currently offline. Your checklist will be submitted when you are back online.',
            [
              {
                text: 'Ok',
                onPress: () =>
                  err?.data?.message
                    ? {}
                    : navigation.navigate('DashboardScreen'),
              },
            ],
            { cancelable: false },
          );
        }
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
  const imageUpload = async (form_Data, index) => {
    console.log('form-data==========',JSON.stringify(form_Data))
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
      body: form_Data,
      redirect: 'follow',
    };
    // console.log('serverUrl', `${serverUrl}/media-chunk`);
    const res = fetch(`${serverUrl}/media-chunk`, requestOptions)
    .then(processResponse)
    .then(res => {
      console.log('res image===================',res)
      const { statusCode, data } = res;
      console.log("statusCode", statusCode);
      console.log("data", data);
      return data;

    })
      .catch(async error => {
        console.log('media error================',error.message)

        if (draftdata) {
          await dispatch(removeDraft(draftdata));
        }


        await AsyncAlert(
          'Your connection is poor or the process has been interrupted, your checklist has been returned to draft. Please try to resubmit again when you have a better connection',
        );
       
      });

    return res;
  };
  let isShow = true;

  const AsyncAlert = async message => {
    const unique_id = new Date().getTime();
    const data = {
      active_step: 0,
      fields: formData,
      file: mediaData,
      unique_id: unique_id,
      updated_at: new Date(),
      recipient_email: email,
      incidence_status: 'draft',
      // incidence_status: 'submitted',
      category_id: checklistCategory.category_id,
      sub_category_id: checklistCategory.sub_category_id,
      incidence_title: checklistName,
      incidence_desc: checklistName,
      sub_category_title: checklistCategory.sub_category_title,
      synced: false,
    };
    new Promise(_resolve => {
      if (!isNetworkError && isShow) {
        isShow = false;
        Alert.alert(
          'Error',
          message,
          [
            {
              text: 'Ok',
              onPress: async () => {
                await dispatch(saveDraft({ ...data, incidence_status: 'draft' }));

                navigation.navigate('DashboardScreen')
              },
            },
          ],
         // { cancelable: false },
        );
      }
    });
  };

  return (
    <Verify
      {...props}
      loader={loader}
      email={email}
      setEmail={setEmail}
      onSubmit={onSubmit}
      checklist={checklistCategory}
      checklistName={checklistName}
      confirmedEmail={confirmedEmail}
      setConfirmedEmail={setConfirmedEmail}
      count={totalcount / totalfile}
      totalcount={totalcount}
      totalfile={totalfile}
      modalVisible={modalVisible}
      pdfLoader={pdfLoader}
    />
  );
}
