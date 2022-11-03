/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {
  CustomButton,
  CustomHeader,
  CustomModal,
  CustomTextInput,
} from '../../../components';
import {colors, images} from '../../../resources';
import styles from './style';
import {WebView} from 'react-native-webview';

export default function Verify(props) {
  const {
    navigation,
    loader,
    email,
    setEmail,
    onSubmit,
    checklist,
    checklistName,
    confirmedEmail,
    setConfirmedEmail,
    count,
    modalVisible,
    pdfLoader,
    totalcount,
    totalfile,
  } = props;

  const webviewRef = useRef();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scrollView}>
        {/* <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}> */}
        <CustomHeader
          icon={images.leftArrow}
          onIconPress={() => navigation.goBack()}
        />

        <View style={styles.mainView}>
          <Text style={styles.headingText1}>Check before you send</Text>

          <Text style={styles.textStyle1}>
            Your checklist may contain sensitive information - double-check that
            you are sending the right checklist to the right person
          </Text>

          <View style={styles.contentView}>
            <View style={styles.flexRowView1}>
              <View
                style={[styles.contentTextView1, {borderTopLeftRadius: 10}]}>
                <Text numberOfLines={1} style={styles.contentText1}>
                  Checklist
                </Text>
              </View>
              <View
                style={[styles.contentTextView2, {borderTopRightRadius: 10}]}>
                <Text numberOfLines={1} style={styles.contentText2}>
                  {checklist?.sub_category_title}
                </Text>
              </View>
            </View>

            <View style={styles.flexRowView1}>
              <View style={[styles.contentTextView1]}>
                <Text numberOfLines={1} style={styles.contentText1}>
                  Name
                </Text>
              </View>
              <View style={[styles.contentTextView2]}>
                <Text numberOfLines={1} style={styles.contentText2}>
                  {checklistName}
                </Text>
              </View>
            </View>

            <View style={styles.flexRowView1}>
              <View
                style={[styles.contentTextView1, {borderBottomLeftRadius: 10}]}>
                <Text numberOfLines={1} style={styles.contentText1}>
                  Date
                </Text>
              </View>
              <View
                style={[
                  styles.contentTextView2,
                  {borderBottomRightRadius: 10},
                ]}>
                <Text numberOfLines={1} style={styles.contentText2}>
                  {moment().format('HH:mm')} (GMT){' '}
                  {moment().format('DD-MM-YYYY')}
                </Text>
              </View>
            </View>
          </View>

          <CustomTextInput
            value={email}
            placeholder=""
            label="Enter the email address of the person to receive your completed checklist"
            labelStyle={styles.labelStyle}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
            containerStyle={{backgroundColor: colors.white}}
          />

          <CustomTextInput
            value={confirmedEmail}
            placeholder=""
            label="Confirm email address"
            labelStyle={styles.labelStyle}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setConfirmedEmail(text)}
            containerStyle={{backgroundColor: colors.white}}
          />

          <CustomButton
            title="SUBMIT"
            disabled={loader}
            onPress={onSubmit}
            btnStyle={[styles.btnStyle, {marginHorizontal: 0}]}
          />

          <CustomModal
            isVisible={modalVisible}
            content={
              <View
                style={{
                  height: 200,
                }}>
                {totalfile > 0 && (
                  //                   <WebView
                  //                     ref={webviewRef}
                  //                     scalesPageToFit={false}
                  //                     mixedContentMode="compatibility"
                  //                     source={{
                  //                       html: `<!DOCTYPE html>
                  // <html lang="en">
                  // <head>
                  // <style>
                  //  .flex {
                  //      -webkit-box-flex: 1;
                  //      -ms-flex: 1 1 auto;
                  //      flex: 1 1 auto
                  //  }
                  //  @media (max-width:991.98px) {
                  //      .padding {
                  //          padding: 1.5rem
                  //      }
                  //  }
                  //  @media (max-width:767.98px) {
                  //      .padding {
                  //          padding: 1rem
                  //      }
                  //  }
                  //  .padding {
                  //      padding: 5rem
                  //  }
                  //  .container {
                  //      margin-top: 100px
                  //  }
                  //  .progress.progress-md {
                  //      height: 20px
                  //  }
                  //  .template-demo .progress {
                  //      margin-top: 1.5rem
                  //  }
                  //  .progress {
                  //      border-radius: 5px;
                  //      height: 8px
                  //  }</style>
                  //   <meta charset="utf-8">
                  //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                  //     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                  //   </head>
                  // <body style="background-color:transparent">
                  //         <div class="container d-flex justify-content-center">
                  //             <div class="col-md-6 grid-margin stretch-card">
                  //                   <div class="template-demo">
                  //                     <div class="progress progress-md">
                  //                       <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${
                  //                         count > 1 ? 100 : count * 100
                  //                       }%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                  //                       <h7> ${parseInt(count > 1 ? 100 : count * 100) + '%'}</h7>
                  //                       </div>
                  //                 </div>
                  //               </div>
                  //             </div>
                  //         </div>
                  //     </div>
                  // </body>
                  // </html>`,
                  //                     }}
                  //                     onError={error => console.log(error)}
                  //                     style={{
                  //                       height: 100,
                  //                       backgroundColor: 'transparent',
                  //                     }}
                  //                   />
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
                )}

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

          <CustomModal
            // isVisible={!modalVisible && pdfLoader}
            isVisible={false}
            content={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
