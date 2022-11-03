/* eslint-disable react-native/no-inline-styles */
import {DrawerActions} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {useDispatch, useSelector} from 'react-redux';
import {
  ChecklistCard,
  CustomButton,
  CustomHeader,
  CustomModal,
  CustomTab,
  LinkCard,
} from '../../../components';
import {
  onGetParticularIncidence,
  saveChecklistCategory,
} from '../../../redux/actions';
import {colors, images, pdfBaseUrl} from '../../../resources';
import styles from './style';

export default function Dashboard(props) {
  const {
    navigation,
    data,
    pendingForms,
    draftlist,
    refreshing,
    onRefresh,
    dashboard,
    count,
    modalVisible,
    pdfLoader,
  } = props;
  const webviewRef = useRef();

  const dispatch = useDispatch();
  const checkList = useSelector(state => state.checkListsReducer.checkList);
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
    for( i of item.fields)
    {
      formdata.push(i)
    }
    for(j of item.file){
      formdata.push(j)
    }
        file = item.file;
    let copyCategory = {
      ...findSubCategory,
      incidence_id: '',
      incidence_title: item.incidence_title,
      incidence_desc: item.incidence_description,
      formStates:formdata,
      category_id: item.category_id,
      category_title: findCategory.category_title,
      file,
    };

    await dispatch(saveChecklistCategory(copyCategory));
    navigation.navigate('GeneralFormScreen', {draftdata: item});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <CustomHeader
          icon={images.menu}
          onIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <View style={styles.flexRowView}>
          <Text style={styles.headingText}>Your Dashboard</Text>

          {/* <TouchableOpacity activeOpacity={0.5}>
            <Image
              resizeMode="contain"
              source={images.search}
              style={styles.iconStyle}
            />
          </TouchableOpacity> */}
        </View>

        <View style={[styles.flexRowView, {marginTop: 10}]}>
          <CustomTab
            value={dashboard?.incidences?.submitted}
            label="Total Submitted"
            iconColor={colors.green}
            onPress={() =>
              navigation.navigate('ChecklistScreen', {tabStatus: 'submitted'})
            }
          />
          <CustomTab
            value={pendingForms?.length}
            label="Total Pending"
            iconColor={colors.lightYellow}
            onPress={() =>
              navigation.navigate('ChecklistScreen', {tabStatus: 'pending'})
            }
          />
          <CustomTab
            value={draftlist?.length}
            label="Total Drafted"
            iconColor={colors.darkGray}
            onPress={() =>
              navigation.navigate('ChecklistScreen', {tabStatus: 'draft'})
            }
          />
        </View>

        {/* <CustomButton
          title="LOG NEW INCIDENT"
          btnStyle={styles.btnStyle}
          onPress={() => navigation.navigate('ChecklistLandingScreen')}
        /> */}
        <View style={[styles.flexRowView, {alignItems: 'flex-end'}]}>
          <Text style={styles.headingText}>Recent Checklist</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('ChecklistScreen', {tabStatus: ''})
            }>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          {data &&
            data.slice(0, 2).map((item, index) => (
              <>
                {item.incidence_status?.toLowerCase() === 'submitted' &&
                 (
                  <View key={index}>
                    <ChecklistCard
                      item={item}
                      onPress={() => {
                        if (
                          item.incidence_status?.toLowerCase() === 'submitted'
                        ) {
                          if (item.pdf_path) {
                            Linking.openURL(pdfBaseUrl + item.pdf_path);
                          } else {
                            Alert.alert(
                              '',
                              'Your pdf checklist is being generated',
                              [{text: 'Ok', onPress: () => {}}],
                            );
                          }
                        } else if (
                          item.incidence_status?.toLowerCase() === 'draft'
                        ) {
                          onClickDraftlistItem(item);
                          //onClickChecklistItem(item);
                        }
                      }}
                    />
                  </View>
                ) }
              </>
            ))}
        </View>

        <View style={[styles.flexRowView, {marginTop: 10}]}>
          <Text style={styles.headingText}>Quick Links</Text>
        </View>

        <View style={styles.flexRowView}>
          <LinkCard
            icon={images.book}
            label="Handbook"
            onPress={() => navigation.navigate('HandbookScreen')}
          />
          <LinkCard
            icon={images.message}
            label="Feedback"
            onPress={() => navigation.navigate('FeedbackScreen')}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="LOG NEW INCIDENT"
        btnStyle={styles.btnStyle}
        onPress={() => navigation.navigate('ChecklistLandingScreen')}
      />
      {count > 0 && (
        <CustomModal
          isVisible={modalVisible}
          content={
            <View
              style={{
                height: 200,
              }}>
              {/* <WebView
                ref={webviewRef}
                scalesPageToFit={false}
                mixedContentMode="compatibility"
                source={{
                  html: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
 .flex {
     -webkit-box-flex: 1;
     -ms-flex: 1 1 auto;
     flex: 1 1 auto
 }
 @media (max-width:991.98px) {
     .padding {
         padding: 1.5rem
     }
 }
 @media (max-width:767.98px) {
     .padding {
         padding: 1rem
     }
 }
 .padding {
     padding: 5rem
 }
 .container {
     margin-top: 100px
 }
 .progress.progress-md {
     height: 20px
 }
 .template-demo .progress {
     margin-top: 1.5rem
 }
 .progress {
     border-radius: 5px;
     height: 8px
 }</style>
  <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
<body style="background-color:transparent">
        <div class="container d-flex justify-content-center">
            <div class="col-md-6 grid-margin stretch-card">
                  <div class="template-demo">
                    <div class="progress progress-md">
                      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${
                        count > 1 ? 100 : count * 100
                      }%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                      <h7> ${parseInt(count > 1 ? 100 : count * 100) + '%'}</h7>
                      </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</body>
</html>`,
                }}
                onError={error => console.log(error)}
                style={{height: 100, backgroundColor: 'transparent'}}
              /> */}

              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <ProgressBarAnimated
                  width={Dimensions.get('window').width - 100}
                  value={parseInt(count > 1 ? 100 : count * 100)}
                  backgroundColorOnComplete={'#148cF0'}
                  backgroundColor={'#148cF0'}
                />
                <Text style={{fontSize: 18, color: '#fff', marginTop: 10}}>
                  {parseInt(count > 1 ? 100 : count * 100) + '%'}
                </Text>
              </View>

              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  marginHorizontal: 30,
                  marginTop: 10,
                }}>
                {
                  'Please wait for your checklist to upload before closing the app'
                }
              </Text>
            </View>
          }
        />
      )}
      {/* {!modalVisible && pdfLoader && ( */}
      <CustomModal
        // isVisible={!modalVisible && pdfLoader}
        isVisible={false}
        content={
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                marginHorizontal: 30,
                marginTop: 15,
              }}>
              {'Please wait for your pdf to create before closing the app'}
            </Text>
          </View>
        }
      />
      {/* )} */}
    </SafeAreaView>
  );
}
