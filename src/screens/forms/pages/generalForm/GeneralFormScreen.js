/* eslint-disable no-undef */
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {
  onPostIncident,
  onPostIncidentMedia,
  saveDraft,
  removeDraft,
} from '../../../../redux/actions';
import {GeneralForm} from '../../components';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import FilePickerManager from 'react-native-file-picker';
var RNFS = require('react-native-fs');

export default function GeneralFormScreen(props) {
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const flatListRef = useRef(null);
  let checklistCategory = useSelector(
    state => state.checkListsReducer.checklistCategory,
  );
  const copiedChecklistCategory = JSON.parse(JSON.stringify(checklistCategory)); //Making a deep copy of it so it will not update object in actual array of draft items in redux.
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [formStates, setFormStates] = useState(
    copiedChecklistCategory?.formStates || [],
  );
  const [media, setMedia] = useState(copiedChecklistCategory?.file || []);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [prevTabIndex, SetPrevTabIndex] = useState(-1);
  const [selectedTab, setSelectedTab] = useState(
    copiedChecklistCategory?.items[0],
  );
  const [checklistName, setChecklistName] = useState(
    copiedChecklistCategory?.incidence_title || '',
  );
  const [selectedField, setSelectedField] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [totalImageSize, setTotalImageSize] = useState(0);

  const [requireToggle, setRequireToggle] = useState(false);
  const [videoLimit, setVideoLimit] = useState(0);
  // console.log('checklistCategory?.fields: ', checklistCategory?.fields);

  useEffect(() => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: selectedTabIndex,
      viewOffset: 20,
      viewPosition: 0,
    });

    setSelectedTab(checklistCategory.items[selectedTabIndex]);
  }, [selectedTabIndex, checklistCategory]);

  useEffect(() => {
    const onPressClick = async () => {
      var unixTimestamp = moment(new Date(), 'YYYY.MM.DD hh:mm:ss').unix();

      const array = [];
      await formStates.map((item, index) => {
        if (item?.field_value) {
          array.push({
            field_id: item.field_id,
            field_title: item.field_title,
            field_value: item?.field_value,
          });
        }
      });
      const data = {
        active_step: 0,
        file: media,
        formStates: array,
        fields: array,
        category_id: checklistCategory.category_id,
        sub_category_id: checklistCategory.sub_category_id,
        unique_id: unixTimestamp,
        // unique_id: new Date().toString().toUpperCase(),
        sub_category_title: checklistCategory.sub_category_title,
        incidence_title: checklistName,
        incidence_desc: 'Test incidence description',
        incidence_status: 'draft',
        recipient_email: '',
        updated_at: new Date(),
        items: checklistCategory.items,
        id: checklistCategory?.incidence_id,
      };
      if (
        array.length == 0 &&
        media.length == 0 &&
        checklistName.trim() === ''
      ) {
        navigation.goBack();
      } else {
        if (checklistName.trim() === '') {
          Alert.alert('Error', 'Checklist name is required.', [
            {text: 'Ok', onPress: () => {}},
          ]);
        } else {
          Alert.alert('Would you like to save your progress?', '', [
            {
              text: 'OK',
              onPress: async () => {
                if (route.params.draftdata) {
                  await dispatch(removeDraft(route.params.draftdata));
                }
                await dispatch(saveDraft(data));
                navigation.goBack();
              },
            },
            {
              text: 'Cancel',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
          ]);
        }
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressClick,
    );

    return () => backHandler.remove();
  }, []);

  const onNextBtnPress = () => {
    if (selectedTabIndex < checklistCategory.items.length - 1) {
      let copyFileds = checklistCategory?.fields?.filter(
        i => i.checklist_item_id === selectedTab.checklist_item_id,
      );

      let requiredfields = copyFileds.filter(
        a => a?.validations[0]?.validation_value === 'true',
      );

      const index = requiredfields?.length - 1;

      if (requiredfields.length === 0) {
        SetPrevTabIndex(selectedTabIndex);
        setSelectedTabIndex(selectedTabIndex + 1);
        setRequireToggle(false);
      } else {
        for (var i = 0; i < requiredfields.length; i++) {
          let item = requiredfields[i];

          if (
            formStates.findIndex(a => a?.field_id === item?.field_id) === -1
          ) {
            Alert.alert('Error', 'Please fill all the required fields!', [
              {
                text: 'Ok',
                onPress: () => {
                  setRequireToggle(true);
                },
              },
            ]);
            return;
          } else {
            setRequireToggle(false);

            if (index === i) {
              SetPrevTabIndex(selectedTabIndex);
              setSelectedTabIndex(selectedTabIndex + 1);
            }
          }
        }

        // setSelectedTabIndex(selectedTabIndex + 1);
      }
    } else {
      if (checklistName.trim() === '') {
        Alert.alert('Error', 'Checklist name is required.', [
          {text: 'Ok', onPress: () => {}},
        ]);
      } else {
        navigation.navigate('VerifyScreen', {
          checklistName: checklistName,
          formData: formStates,
          mediaData: media,
          id: checklistCategory?.incidence_id,
          draftdata: route.params.draftdata,
        });
      }
    }
  };

  const onChangeText = (fieldId, title, value) => {
    var temp = [...formStates];
    const index = temp?.findIndex(i => i.field_id === fieldId);

    if (index > -1) {
      if (value) {
        temp[index].field_value = value;
      } else {
        temp = temp.filter(item => {
          return item.field_id != fieldId;
        });
      }
    } else {
      if (value) {
        temp.push({
          field_id: fieldId,
          field_title: title,
          field_value: value ? value : '',
        });
      }
    }

    setFormStates(temp);
  };

  const handleDateConfirm = date => {
    const temp = [...formStates];
    const index = temp?.findIndex(i => i.field_id === selectedField.field_id);

    if (index > -1) {
      temp[index].field_value = date;
    } else {
      temp.push({
        field_id: selectedField.field_id,
        field_title: selectedField.field_title,
        field_value: date,
      });
    }

    setFormStates(temp);
    setDatePickerVisibility(false);
  };
  const uploadMedia = async (mediaData, incidence_unique_id, incidence_id) => {
    let count = 1;
    let total_files = [];
    await mediaData.map(i => {
      total_files = [...total_files, ...i.file];
    });

    let lastIndex = 0;
    let fileldIdArray = [];
    // if (mediaData && mediaData.length > 0) {
    for (let i = 0; i < mediaData.length; i++) {
      const item = mediaData[i];
      if (i === mediaData.length - 1) {
        lastIndex = 1;
      }
      for (let j = 0; j < item.file.length; j++) {
        const imgFile = item.file[j];
        delete imgFile.__jsogObjectId;
        fileldIdArray.push({field_id: item.field_id, total_files: 1});

        var reqFormData = new FormData();
        reqFormData.append('field_id', item.field_id);
        if (incidence_id) {
          reqFormData.append('incidence_id', incidence_id);
        } else {
          reqFormData.append('incidence_unique_id', incidence_unique_id);
        }
        reqFormData.append('total_files', total_files.length);
        reqFormData.append('current_file_number', count);
        // reqFormData.append('last_media_file', lastIndex);
        reqFormData.append('file', imgFile);

        const res = await dispatch(onPostIncidentMedia(reqFormData, i));

        // if (res && lastIndex === 1) {
        //   var emailData = new FormData();
        //   emailData.append('fields', JSON.stringify(fileldIdArray));
        //   emailData.append('last_media_file', 1);
        //   emailData.append('incidence_unique_id', incidence_unique_id);
        //   console.log(reqFormData);
        //   console.log('====================================');
        //   console.log(fileldIdArray);
        //   console.log('====================================');
        //   await dispatch(onPostIncidentMedia(emailData, i));
        // }
        count++;
      }
    }
    // } else {
    //   console.log('formData.fields=>', JSON.stringify(formData.fields));
    //   for (const key in formData.fields) {
    //     if (formData.fields.hasOwnProperty(key)) {
    //       const element = formData.fields[key];
    //       fileldIdArray.push({field_id: element.field_id, total_files: 1});
    //     }
    //   }
    //   var emailData = new FormData();
    //   emailData.append('fields', JSON.stringify(fileldIdArray));
    //   emailData.append('last_media_file', 1);
    //   emailData.append('incidence_unique_id', incidence_unique_id);
    //   console.log('====================================');
    //   console.log(fileldIdArray);
    //   console.log('====================================');
    //   await dispatch(onPostIncidentMedia(emailData));
    // }
  };

  const onSaveDraft = async () => {
    const array = [];
    await formStates.map((item, index) => {
      if (item?.field_value) {
        array.push({
          field_id: item.field_id,
          field_title: item.field_title,
          field_value: item?.field_value,
        });
      }
    });

    const unique_id = new Date().getTime();

    const data = {
      active_step: 0,
      fields: array,
      file: media,
      unique_id: unique_id,
      updated_at: new Date(),
      recipient_email: '',
      incidence_status: 'draft',
      // incidence_status: 'submitted',
      category_id: checklistCategory.category_id,
      sub_category_id: checklistCategory.sub_category_id,
      incidence_title: checklistName,
      incidence_desc: checklistName,
      sub_category_title: checklistCategory.sub_category_title,
      synced: false,
    };

    if (checklistName.trim() === '') {
      Alert.alert('Error', 'Checklist name is required.', [
        {text: 'Ok', onPress: () => {}},
      ]);
    } else {
      // await dispatch(saveDraft(data));

      // await dispatch(onPostIncident({incidence: [data]}));
      // Alert.alert('Success', 'Incident data has been saved successfully.', [
      //   {
      //     text: 'Ok',
      //     onPress: () => {},
      //   },
      // ]);

      Alert.alert('Would you like to save your progress?', '', [
        {
          text: 'OK',
          onPress: async () => {
            // setLoaderStatus(true);
            // if (checklistCategory?.incidence_id) {
            //   await dispatch(onPostIncident({incidence: data}));
            // } else {
            //   await dispatch(onPostIncident({incidence: [data]}));
            // }
            // await uploadMedia(
            //   media,
            //   unixTimestamp,
            //   checklistCategory?.incidence_id,
            // );
            // setLoaderStatus(false);
            if (route.params.draftdata) {
              await dispatch(removeDraft(route.params.draftdata));
            }
            await dispatch(saveDraft(data));
            navigation.navigate('DashboardScreen');
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }
  };

  const checkPermission = item => {
    const index = media?.findIndex(i => i.field_id === item.field_id);
    const files = media[index]?.file || [];
    if (files?.length < 6) {
      if (Platform.OS == 'android') {
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log(
                  'This feature is not available (on this device / in this context)',
                );
                break;
              case RESULTS.DENIED:
                console.log(
                  'The permission has not been requested / is denied but requestable',
                );
                request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(
                  result => {
                    switch (result) {
                      case RESULTS.GRANTED:
                        // handleChoosePhoto(item);
                        openModal(item);
                        break;
                    }
                  },
                );
                break;
              case RESULTS.LIMITED:
                console.log(
                  'The permission is limited: some actions are possible',
                );
                break;
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                // handleChoosePhoto(item);
                openModal(item);

                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // handleChoosePhoto(item);
        openModal(item);
      }
    } else {
      alert('Maximum Images size is 6');
    }
  };
  const checkAllPermission = async () => {
    let permission = false;
    await checkMultiple(
      Platform.OS == 'ios'
        ? [PERMISSIONS.IOS.CAMERA]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          ],
    ).then(async result => {
      if (
        result[PERMISSIONS.ANDROID.CAMERA] == RESULTS.GRANTED &&
        result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == RESULTS.GRANTED &&
        result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == RESULTS.GRANTED
      ) {
        console.log(result[PERMISSIONS.ANDROID.CAMERA]);
        permission = true;
      } else {
        await requestMultiple(
          Platform.OS == 'ios'
            ? [PERMISSIONS.IOS.CAMERA]
            : [
                PERMISSIONS.ANDROID.CAMERA,
                PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              ],
        ).then(result => {
          console.log('result multiple permission====', result);
          if (
            result[PERMISSIONS.ANDROID.CAMERA] == RESULTS.GRANTED &&
            result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ==
              RESULTS.GRANTED &&
            result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == RESULTS.GRANTED
          ) {
            permission = true;
          }
        });
      }
    });
    return permission;
  };
  const handleChooseCameraPhoto = async item => {
    let permission = false;
    await check(
      Platform.OS == 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(async result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );

            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            await request(
              Platform.OS == 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
            ).then(result => {
              switch (result) {
                case RESULTS.GRANTED:
                  permission = true;
                  break;
                default:
                  break;
              }
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            permission = true;
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');

            break;
        }
      })
      .catch(error => {
        console.log(error);
        return;
      });

    if (permission == false) {
      setModalStatus(false);
      return;
    }

    const index = media?.findIndex(i => i.field_id === item.field_id);
    const files = media[index]?.file || [];
    if (files?.length < 6) {
      if (totalImageSize < 300000000) {
        const options = {
          title: 'Select Photo',
          mediaType: 'photo',
          quality: 1,
          selectionLimit: 6 - files?.length,
        };
        setModalStatus(false);
        setTimeout(() => {
          launchCamera(options, async response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const allImages = [];
              for (let i = 0; i < response.assets.length; i++) {
                const img = response.assets[i];
                console.log('ima=====', img);
                const path = localPath(img.uri);
                let image = {
                  uri: Platform.OS == 'ios' ? path : path,
                  name: img.fileName,
                  type: img.type,
                  size: img.fileSize,
                };
                console.log('image obj====', image);
                allImages.push(image);
              }
              console.log('all=====', allImages);
              const temp = [...media];
              const index = temp?.findIndex(i => i.field_id === item.field_id);
              if (index > -1) {
                temp[index].file = [...temp[index].file, ...allImages];
              } else {
                temp.push({
                  field_id: item.field_id,
                  field_title: item.field_title,
                  field_value: item.field_value,
                  file: allImages,
                });
              }
              setMedia(temp);
              //Update Forms

              const temp2 = [...formStates];
              const index2 = temp2?.findIndex(
                i => i.field_id === item.field_id,
              );

              if (index2 > -1) {
                //temp2[index2].field_value = item.field_value;
              } else {
                temp2.push({
                  field_id: item.field_id,
                  field_title: item.field_title,
                  field_value: item.field_value,
                });
              }
              setFormStates(temp2);
              if (temp.length > 0) {
                for (var i = 0; i < temp.length; i++) {
                  if (temp[i].file.length > 0) {
                    for (var j = 0; j < temp[i].file.length; j++) {
                      setTotalImageSize(totalImageSize + temp[i].file[j].size);
                    }
                  }
                }
              }
            }
          });
        }, 500);
      } else {
        Alert.alert(
          'Error',
          'you have exceeded the total file amount to be able to send in a checklist, consider reducing your attachment file size',
          [
            {
              text: 'Ok',
              onPress: () => {
                setModalStatus(false);
              },
            },
          ],
        );
      }
    }
  };

  const localPath = image => {
    const fileName = image.split('/').pop();
    var destPath = RNFS.DocumentDirectoryPath + '/' + fileName;
    var destPathandroid = RNFS.DownloadDirectoryPath + '/' + fileName;

    try {
      RNFS.moveFile(
        image,
        Platform.OS === 'ios' ? destPath : 'file://' + destPathandroid,
      )
        .then(success => {})
        .catch(err => {
          if(err.message.includes('already exists.'))
          console.log('ERROR======== ' + err.message);
        });
    } catch (e) {}
    console.log(
      'path============',
      Platform.OS === 'ios' ? destPath : destPathandroid,
    );

    return Platform.OS === 'ios' ? destPath : 'file://' + destPathandroid;
  };
  const handleChooseCameraVideo = async item => {
    let permission = false;
    await check(
      Platform.OS == 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(async result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );

            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            await request(
              Platform.OS == 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
            ).then(result => {
              switch (result) {
                case RESULTS.GRANTED:
                  permission = true;
                  break;
                default:
                  break;
              }
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            permission = true;
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');

            break;
        }
      })
      .catch(error => {
        console.log(error);
        return;
      });
    if (permission == false) {
      setModalStatus(false);
      return;
    }
    const index = media?.findIndex(i => i.field_id === item.field_id);
    const files = media[index]?.file || [];
    if (files?.length < 6) {
      if (totalImageSize < 300000000) {
        if (videoLimit < 30) {
          const options = {
            title: 'Select video',
            mediaType: 'video',
            quality: 1,
            videoQuality: 'high',
            allowsEditing: true,
            durationLimit: 30 - videoLimit,
            selectionLimit: 6 - files?.length,

            // storageOptions: {
            //   skipBackup: true,
            //   path: 'video',
            // },
          };

          setModalStatus(false);
          setTimeout(() => {
            launchCamera(options, async response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                console.log('ImagePicker Else: ', response.error);
                const allImages = [];
                for (let i = 0; i < response.assets.length; i++) {
                  const img = response.assets[i];
                  console.log('img============', img);
                  setVideoLimit(videoLimit + Math.round(img.duration));

                  const path = localPath(img.uri);

                  let image = {
                    uri: Platform.OS == 'ios' ? path : path,
                    name: img.fileName,
                    type: img.type,
                    duration: img.duration,
                    size: img.fileSize,
                  };

                  allImages.push(image);
                }
                const temp = [...media];
                const index = temp?.findIndex(
                  i => i.field_id === item.field_id,
                );
                if (index > -1) {
                  temp[index].file = [...temp[index].file, ...allImages];
                } else {
                  temp.push({
                    field_id: item.field_id,
                    field_title: item.field_title,
                    field_value: item.field_value,
                    file: allImages,
                  });
                }
                setMedia(temp);
                //Update Forms
                const temp2 = [...formStates];
                const index2 = temp2?.findIndex(
                  i => i.field_id === item.field_id,
                );

                if (index2 > -1) {
                  //temp2[index2].field_value = item.field_value;
                } else {
                  temp2.push({
                    field_id: item.field_id,
                    field_title: item.field_title,
                    field_value: item.field_value,
                  });
                }
                setFormStates(temp2);
                if (temp.length > 0) {
                  for (var i = 0; i < temp.length; i++) {
                    if (temp[i].file.length > 0) {
                      for (var j = 0; j < temp[i].file.length; j++) {
                        setTotalImageSize(
                          totalImageSize + temp[i].file[j].size,
                        );
                      }
                    }
                  }
                }
              }
            }).catch(err => {
              console.log('err==================', err);
            });
          }, 500);
        } else {
          Alert.alert(
            'Error',
            'you have exceeded the total video file amount to be able to send in a checklist,consider reducing your attachment file size',
            [
              {
                text: 'Ok',
                onPress: () => {
                  setModalStatus(false);
                },
              },
            ],
          );
        }
      } else {
        Alert.alert(
          'Error',
          'you have exceeded the total file amount to be able to send in a checklist, consider reducing your attachment file size',
          [
            {
              text: 'Ok',
              onPress: () => {
                setModalStatus(false);
              },
            },
          ],
        );
      }
    }
  };

  const handleChoosePDF = item => {
    const index = media?.findIndex(i => i.field_id === item.field_id);
    const files = media[index]?.file || [];
    if (files?.length < 6) {
      if (totalImageSize < 300000000) {
        setModalStatus(false);

        setTimeout(() => {
          if (Platform.OS == 'ios') {
            DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
              copyTo: 'cachesDirectory',
            })
              .then(async response => {
                const allImages = [];

                const originalPath = response[0].uri.replace('file://', '');

                const destinationPath =
                  RNFS.DocumentDirectoryPath + `/ttest.pdf`;
                RNFS.downloadFile({
                  fromUrl: response[0].uri,
                  toFile:
                    Platform.OS == 'ios'
                      ? RNFS.DocumentDirectoryPath + '/' + response[0].name
                      : RNFS.DownloadDirectoryPath + '/' + response[0].name,
                })
                  .promise.then(dwResult => {
                    const pdf = response[0];

                    const image = {
                      uri:
                        Platform.OS == 'ios'
                          ? RNFS.DocumentDirectoryPath + '/' + response[0].name
                          : RNFS.DocumentDirectoryPath + '/' + response[0].name,

                      name: pdf.name,
                      type: pdf.type,
                      size: pdf.size,
                    };
                    console.log('pdf select=======', image);
                    allImages.push(image);

                    const temp = [...media];
                    const index = temp?.findIndex(
                      i => i.field_id === item.field_id,
                    );

                    if (index > -1) {
                      temp[index].file = [...temp[index].file, ...allImages];
                    } else {
                      temp.push({
                        field_id: item.field_id,
                        field_title: item.field_title,
                        field_value: item.field_value,
                        file: allImages,
                      });
                    }

                    setMedia(temp);

                    //Update Forms
                    const temp2 = [...formStates];
                    const index2 = temp2?.findIndex(
                      i => i.field_id === item.field_id,
                    );

                    if (index2 > -1) {
                      //temp2[index2].field_value = item.field_value;
                    } else {
                      temp2.push({
                        field_id: item.field_id,
                        field_title: item.field_title,
                        field_value: item.field_value,
                      });
                    }

                    setFormStates(temp2);

                    if (temp.length > 0) {
                      for (var i = 0; i < temp.length; i++) {
                        if (temp[i].file.length > 0) {
                          for (var j = 0; j < temp[i].file.length; j++) {
                            setTotalImageSize(
                              totalImageSize + temp[i].file[j].size,
                            );
                          }
                        }
                      }
                    }
                  })
                  .catch(error => {
                    console.log('pdf error===============', error);
                  });

                return true;
              })
              .catch(err => {
                alert(err);
                return false;
              });
          } else {
            try {
              FilePickerManager.showFilePicker(null, response => {
                if (response.didCancel) {
                  console.log('User cancelled file picker');
                } else if (response.error) {
                  console.log('FilePickerManager Error: ', response.error);
                } else {
                  console.log('resaponse pdf======', response);
                  const allImages = [];

                  const pdf = response;

                  const image = {
                    uri: localPath(pdf.path),

                    name: pdf.fileName,
                    type: pdf.type,
                    size: pdf.size,
                  };
                  console.log('pdf obj', image);
                  allImages.push(image);

                  const temp = [...media];
                  const index = temp?.findIndex(
                    i => i.field_id === item.field_id,
                  );

                  if (index > -1) {
                    temp[index].file = [...temp[index].file, ...allImages];
                  } else {
                    temp.push({
                      field_id: item.field_id,
                      field_title: item.field_title,
                      field_value: item.field_value,
                      file: allImages,
                    });
                  }

                  setMedia(temp);

                  //Update Forms
                  const temp2 = [...formStates];
                  const index2 = temp2?.findIndex(
                    i => i.field_id === item.field_id,
                  );

                  if (index2 > -1) {
                    //temp2[index2].field_value = item.field_value;
                  } else {
                    temp2.push({
                      field_id: item.field_id,
                      field_title: item.field_title,
                      field_value: item.field_value,
                    });
                  }

                  setFormStates(temp2);

                  if (temp.length > 0) {
                    for (var i = 0; i < temp.length; i++) {
                      if (temp[i].file.length > 0) {
                        for (var j = 0; j < temp[i].file.length; j++) {
                          setTotalImageSize(
                            totalImageSize + temp[i].file[j].size,
                          );
                        }
                      }
                    }
                  }
                }
              });
            } catch (err) {
              console.log('Unknown Error: ' + JSON.stringify(err));
            }
          }
        }, 500);
      } else {
        Alert.alert(
          'Error',
          'you have exceeded the total file amount to be able to send in a checklist, consider reducing your attachment file size',
          [
            {
              text: 'Ok',
              onPress: () => {
                setModalStatus(false);
              },
            },
          ],
        );
      }
    }
  };

  const handleChooseGalleryPhoto = item => {
    const index = media?.findIndex(i => i.field_id === item.field_id);
    const files = media[index]?.file || [];
    if (files?.length < 6) {
      if (totalImageSize < 300000000) {
        const options = {
          title: 'Select Photo',
          mediaType: 'mixed',
          //includeBase64: true,
          quality: 1,
          selection: 6 - files?.length,
          // storageOptions: {
          //   skipBackup: true,
          //   path: 'images',
          // },
        };
        setModalStatus(false);
        setTimeout(() => {
          launchImageLibrary(options, async response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const allImages = [];

              for (let i = 0; i < response.assets.length; i++) {
                const img = response.assets[i];

                // fetch(img.uri)
                //   .then(res => {
                //     return res.blob();
                //   })
                //   .then(blob => {
                //     const file = new File([blob], img.fileName, {
                //       type: img.type,
                //       lastModified: new Date().getTime(),
                //     });
                //     console.log('file object:', file);
                //     // allImages.push(file);
                //   });
                console.log('imaggggggg=======',img)
                let videoURI = '';
                if (img.type.includes('video')) {
                  videoURI = await getPathForVideoStorage(img.uri);
                }

                console.log('videoURI===',img.uri)
                const image = {
                  uri: videoURI
                    ? Platform.OS == 'ios'
                      ?  
                      localPath(videoURI)
                      : videoURI
                    : Platform.OS == 'ios'
                    ? img.uri.replace('file://', '')
                    : img.uri,
                  // uri: `data:image/jpeg;base64,${img.base64}`,
                  name: videoURI ? videoURI.split('/').pop() : img.fileName,
                  type: img.type,
                  size: img.fileSize,
                };
                console.log('image====',image)

                allImages.push(image);
              }

              const temp = [...media];
              const index = temp?.findIndex(i => i.field_id === item.field_id);

              if (index > -1) {
                temp[index].file = [...temp[index].file, ...allImages];
              } else {
                temp.push({
                  field_id: item.field_id,
                  field_title: item.field_title,
                  field_value: item.field_value,
                  file: allImages,
                });
              }

              setMedia(temp);

              //Update Forms
              const temp2 = [...formStates];
              const index2 = temp2?.findIndex(
                i => i.field_id === item.field_id,
              );

              if (index2 > -1) {
                //temp2[index2].field_value = item.field_value;
              } else {
                temp2.push({
                  field_id: item.field_id,
                  field_title: item.field_title,
                  field_value: item.field_value,
                });
              }

              setFormStates(temp2);

              if (temp.length > 0) {
                for (var i = 0; i < temp.length; i++) {
                  if (temp[i].file.length > 0) {
                    for (var j = 0; j < temp[i].file.length; j++) {
                      setTotalImageSize(totalImageSize + temp[i].file[j].size);
                    }
                  }
                }
              }
            }
          });
        }, 500);
      } else {
        Alert.alert(
          'Error',
          'you have exceeded the total file amount to be able to send in a checklist, consider reducing your attachment file size',
          [
            {
              text: 'Ok',
              onPress: () => {
                setModalStatus(false);
              },
            },
          ],
        );
      }
    }
  };

  const getPathForVideoStorage = async uri => {
    
    if (Platform.OS == 'ios') {
      return uri;
    }
   

    const stat = await RNFetchBlob.fs.stat(uri);
    return 'file://' + stat.path;
  };

  const onRemoveImage = (item, imgIndex) => {
    const temp = [...media];
    const index = temp?.findIndex(i => i.field_id === item.field_id);
    //temp[index].file.splice(imgIndex, 1);
    setMedia(temp);

    var sum = 0;
    if (temp.length > 0) {
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].file.length > 0) {
          for (var j = 0; j < temp[i].file.length; j++) {
            sum = sum + temp[i].file[j].size;
            if (temp[i].file[j].duration) {
              {
                if (videoLimit > 0) {
                  setVideoLimit(
                    videoLimit - Math.round(temp[i].file[j].duration),
                  );
                }
              }
            }
          }
        }
      }
    }
    setTotalImageSize(sum);
    temp[index].file.splice(imgIndex, 1);
    setMedia(temp);
  };
  const goBack = async () => {
    const array = [];
    await formStates.map((item, index) => {
      if (item?.field_value) {
        array.push({
          field_id: item.field_id,
          field_title: item.field_title,
          field_value: item?.field_value,
        });
      }
    });

    const unique_id = new Date().getTime();

    const data = {
      active_step: 0,
      fields: array,
      file: media,
      unique_id: unique_id,
      updated_at: new Date(),
      recipient_email: '',
      incidence_status: 'draft',
      // incidence_status: 'submitted',
      category_id: checklistCategory.category_id,
      sub_category_id: checklistCategory.sub_category_id,
      incidence_title: checklistName,
      incidence_desc: checklistName,
      sub_category_title: checklistCategory.sub_category_title,
      synced: false,
    };

    if (array.length == 0 && media.length == 0 && checklistName.trim() === '') {
      navigation.goBack();
    } else {
      if (checklistName.trim() === '') {
        Alert.alert('Error', 'Checklist name is required.', [
          {text: 'Ok', onPress: () => {}},
        ]);
      } else {
        // await dispatch(saveDraft(data));

        // await dispatch(onPostIncident({incidence: [data]}));
        // Alert.alert('Success', 'Incident data has been saved successfully.', [
        //   {
        //     text: 'Ok',
        //     onPress: () => {},
        //   },
        // ]);

        Alert.alert('Would you like to save your progress?', '', [
          {
            text: 'OK',
            onPress: async () => {
              // setLoaderStatus(true);
              // if (checklistCategory?.incidence_id) {
              //   await dispatch(onPostIncident({incidence: data}));
              // } else {
              //   await dispatch(onPostIncident({incidence: [data]}));
              // }
              // await uploadMedia(
              //   media,
              //   unixTimestamp,
              //   checklistCategory?.incidence_id,
              // );
              // setLoaderStatus(false);
              if (route.params.draftdata) {
                await dispatch(removeDraft(route.params.draftdata));
              }
              await dispatch(saveDraft(data));
              navigation.goBack();
            },
          },
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ]);
      }
    }
  };

  const onClickTabs = clickindex => {
    let copyFileds = checklistCategory?.fields?.filter(
      i => i.checklist_item_id === selectedTab.checklist_item_id,
    );

    let requiredfields = copyFileds.filter(
      a => a?.validations[0]?.validation_value === 'true',
    );

    const index = requiredfields?.length - 1;
    if (requiredfields.length === 0) {
      SetPrevTabIndex(selectedTabIndex);
      setSelectedTabIndex(clickindex);
      setRequireToggle(false);
    } else {
      for (var i = 0; i < requiredfields.length; i++) {
        let item = requiredfields[i];
        if (formStates.findIndex(a => a?.field_id === item?.field_id) === -1) {
          if (clickindex > selectedTabIndex) {
            Alert.alert('Error', 'Please fill all the required fields!', [
              {
                text: 'Ok',
                onPress: () => {
                  setRequireToggle(true);
                },
              },
            ]);
            return;
          } else {
            setSelectedTabIndex(clickindex);
            setRequireToggle(false);
          }
        } else {
          setRequireToggle(false);
          if (index === i) {
            SetPrevTabIndex(selectedTabIndex);
            setSelectedTabIndex(clickindex);
          }
        }
      }
    }
  };
  const config = useSelector(state => state?.checkListsReducer?.userConfig);

  const openHandbook = () => {
    const selectedHandbook = config.handbook.filter(
      handbooItem => handbooItem.category_id === checklistCategory.category_id,
    );
    navigation.navigate('GuideScreen', {content: selectedHandbook[0]});
  };

  const closeModal = () => {
    setModalStatus(!modalStatus);
    setModalItem(null);
  };
  const openModal = item => {
    setModalStatus(true);
    setModalItem(item);
  };
  return (
    <GeneralForm
      {...props}
      media={media}
      formStates={formStates}
      tabs={checklistCategory.items}
      flatListRef={flatListRef}
      formTitle={checklistCategory.sub_category_title}
      formFields={checklistCategory?.fields}
      selectedTab={selectedTab}
      selectedTabIndex={selectedTabIndex}
      setSelectedTabIndex={setSelectedTabIndex}
      onNextBtnPress={onNextBtnPress}
      onChangeText={onChangeText}
      checklistName={checklistName}
      setChecklistName={setChecklistName}
      onSaveDraft={onSaveDraft}
      isDatePickerVisible={isDatePickerVisible}
      setDatePickerVisibility={setDatePickerVisibility}
      handleDateConfirm={handleDateConfirm}
      setSelectedField={setSelectedField}
      handleChoosePhoto={checkPermission}
      onRemoveImage={onRemoveImage}
      goBack={goBack}
      prevTabIndex={prevTabIndex}
      onClickTabs={onClickTabs}
      openHandbook={openHandbook}
      loader={loaderStatus}
      modal={modalStatus}
      modalItem={modalItem}
      onModalClose={closeModal}
      handleChooseGalleryPhoto={handleChooseGalleryPhoto}
      handleChoosePDF={handleChoosePDF}
      handleChooseCameraPhoto={handleChooseCameraPhoto}
      handleChooseCameraVideo={handleChooseCameraVideo}
      requireToggle={requireToggle}
    />
  );
}
