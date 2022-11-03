/* eslint-disable react-native/no-inline-styles */
import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  Linking,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  ChecklistCard,
  CustomButton,
  CustomHeader,
  CustomTab,
  SearchBar,
} from '../../../components';
import {colors, images, pdfBaseUrl} from '../../../resources';
import styles from './style';

export default function Checklist(props) {
  const {
    navigation,
    data,
    isSearch,
    setIsSearch,
    searchText,
    setSearchText,
    status,
    setStatus,
    onPressStatusTab,
    pendingForms,
    draftlist,
    onClickChecklistItem,
    onClickDraftlistItem,
    onRefresh,
    refreshing,
    goBack,
  } = props;
  const searchedData = data.filter(
    item =>
      item.incidence_title.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.subcategory?.sub_category_title
        .toLowerCase()
        .includes(searchText.toLowerCase()),
  );
  const filteredData = data.filter(
    item => item.incidence_status.toLowerCase() === status.toLowerCase(),
  );

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
          goBack={goBack}
          backIcon={images.leftArrow}
          changeDirection
          icon={images.menu}
          onIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />

        <View style={styles.flexRowView}>
          <Text style={styles.headingText}>Your Checklists</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setStatus('');
              setIsSearch(true);
            }}>
            <Image
              resizeMode="contain"
              source={images.search}
              style={styles.iconStyle}
            />
          </TouchableOpacity>

          {isSearch && (
            <Animatable.View
              useNativeDriver
              animation="slideInRight"
              style={styles.searchContainer}>
              <SearchBar
                value={searchText}
                onChangeText={text => setSearchText(text)}
                onClose={() => {
                  setIsSearch(false);
                  setSearchText('');
                }}
              />
            </Animatable.View>
          )}
        </View>

        <View style={[styles.flexRowView, {marginTop: isSearch ? 20 : 10}]}>
          <CustomTab
            value={
              data.filter(
                item => item.incidence_status.toLowerCase() === 'submitted',
              ).length
            }
            label="Total Submitted"
            iconColor={colors.green}
            onPress={() => onPressStatusTab('submitted')}
            borderWidth={status === 'submitted' ? 1 : 0}
          />
          <CustomTab
            value={pendingForms?.length}
            label="Total Pending"
            iconColor={colors.lightYellow}
            onPress={() => onPressStatusTab('pending')}
            borderWidth={status === 'pending' ? 1 : 0}
          />
          <CustomTab
            value={draftlist?.length}
            label="Total Drafted"
            iconColor={colors.darkGray}
            onPress={() => onPressStatusTab('draft')}
            borderWidth={status === 'draft' ? 1 : 0}
          />
        </View>

        <View style={{marginTop: 20}}>
          {status === 'pending'
            ? pendingForms?.map((item, index) => (
                <View key={index}>
                  <ChecklistCard item={item} />
                </View>
              ))
            : status === 'draft'
            ? draftlist?.map((item, index) => (
                <View key={index}>
                  <ChecklistCard
                    item={item}
                    onPress={() => 
                      {
                        onClickDraftlistItem(item)}}
                  />
                </View>
              ))
            : (status !== '' ? filteredData : searchedData).map(
                (item, index) => {
                  return (
                    <View key={index}>
                      <ChecklistCard
                        item={item}
                        onPress={() => {
                          if (
                            item.incidence_status?.toLowerCase() === 'submitted'
                          )
                            if (item.pdf_path) {
                              Linking.openURL(pdfBaseUrl + item.pdf_path);
                            } else {
                              Alert.alert(
                                '',
                                'Your pdf checklist is being generated',
                                [{text: 'Ok', onPress: () => {}}],
                              );
                            }
                        }}
                      />
                    </View>
                  );
                },
              )}
        </View>

        {isSearch && (
          <>
            <View style={styles.lineSeparator} />

            <Text style={styles.textStyle}>
              {searchedData.length}{' '}
              {searchedData.length > 1 ? 'results' : 'result'} found
            </Text>
          </>
        )}
      </ScrollView>

      {!isSearch && (
        <CustomButton
          title="LOG NEW INCIDENT"
          btnStyle={styles.btnStyle}
          onPress={() => navigation.navigate('ChecklistLandingScreen')}
        />
      )}
    </SafeAreaView>
  );
}
