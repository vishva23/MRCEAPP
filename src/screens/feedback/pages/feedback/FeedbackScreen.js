import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert, Platform} from 'react-native';
import {Feedback} from '../../components';
import {
  onPostFeedback,
  removeFeedback,
  saveFeedback,
} from '../../../../redux/actions';
import {useNavigation} from '@react-navigation/native';

const feedStatusItems = [
  {label: 'General Feedback', value: '192411805683057'},
  {label: 'Suggestions', value: '192411808352641'},
];

export default function FeedbackScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState('');
  const [feedStatus, setFeedStatus] = useState('192411805683057');
  const [feedbackLabel, setFeedbackLabel] = useState('General Feedback');
  const [pickerModal, setPickerModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [feedBackData, setFeedBackData] = useState(feedStatusItems);
  const feedbackCategory = useSelector(
    state => state?.checkListsReducer?.feedbackCategory,
  );

  useEffect(() => {
    const copyData = [];
    feedbackCategory?.forEach(item => {
      let data = {
        label: item.feed_category_title,
        value: item.feed_category_id,
      };
      copyData.push(data);
      setFeedBackData(copyData);
    });
  }, [feedbackCategory]);

  const selectImage = () => {
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        response.assets.forEach(res => {
          const data = {
            name: res.fileName,
            type: res.type,
            uri:
              Platform.OS == 'ios' ? res.uri.replace('file://', '') : res.uri,
          };
          setFile(data);
        });
      }
    });
  };

  const goBack = () => {
    navigation.goBack();
  };
  const onSubmit = async () => {
    const id = new Date().getTime();
    setLoader(true);
    if (feedback === '') {
      setLoader(false);
      Alert.alert('Error', 'Description is required!', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    if (feedStatus === '') {
      setLoader(false);
      Alert.alert('Error', 'Feedback category is required!', [
        {text: 'Ok', onPress: () => {}},
      ]);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('feed_category_id', feedStatus);
      formData.append('feedback_description', feedback);
      if (file) {
        formData.append('attachment[]', file);
      }
      await dispatch(saveFeedback({...formData, id: id}));
      const resData = await dispatch(onPostFeedback(formData));
      await dispatch(removeFeedback({...formData, id: id}));
      setLoader(false);
      setFeedback('');
      setFile(null);
      if (resData.status == 200) {
        Alert.alert('Success', resData.message, [
          {text: 'Ok', onPress: () => {}},
        ]);
      } else {
        Alert.alert('Error', resData.message, [
          {text: 'Ok', onPress: () => {}},
        ]);
      }
    } catch (err) {
      setLoader(false);
      setFeedback('');
      setFile(null);

      Alert.alert(
        '',
        err?.data?.message ||
          'You are currently offline. Your feedback will be submitted when you are back online.',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
      );
    }
  };

  return (
    <Feedback
      {...props}
      feedback={feedback}
      setFeedback={setFeedback}
      feedStatus={feedStatus}
      setFeedStatus={setFeedStatus}
      feedStatusItems={feedBackData}
      pickerModal={pickerModal}
      setPickerModal={setPickerModal}
      onSubmit={onSubmit}
      loader={loader}
      selectImage={selectImage}
      file={file}
      feedbackLabel={feedbackLabel}
      setFeedbackLabel={setFeedbackLabel}
      goBack={goBack}
    />
  );
}
