/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {colors, images} from '../../resources';
import {onLogout, resetStore} from '../../redux/actions';
import {CustomHeader} from '..';
import {NavigationActions, StackActions} from '@react-navigation/native';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const drawerTabs = [
  {
    icon: images.dashboard,
    label: 'Dashboard',
    screen: 'DashboardScreen',
  },
  {
    icon: images.checklist,
    label: 'Checklists',
    screen: 'ChecklistScreen',
  },
  {
    icon: images.book,
    label: 'Handbook',
    screen: 'HandbookScreen',
  },
  {
    icon: images.message,
    label: 'Feedback',
    screen: 'FeedbackScreen',
  },
];

export default function CustomDrawer(props) {
  const dispatch = useDispatch();
  const {navigation, state} = props;
  const {routes, index} = state;
  const focusedRoute = routes[index];
  const [selectedTab, setSelectedTab] = useState('DashboardScreen');
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    if (drawerTabs.findIndex(i => i.screen === focusedRoute.name) > -1) {
      setSelectedTab(focusedRoute.name);
    }
  }, [focusedRoute]);

  const onLogoutHandler = async () => {
    try {
      await dispatch(onLogout());
      navigation.reset({
        index: 0,
        routes: [{name: 'LandingScreen'}],
      });
      //navigation.navigate('LandingScreen');
      await AsyncStorage.setItem("email", user.email_address);

      await AsyncStorage.removeItem('termsCondition');
      navigation.dispatch(DrawerActions.closeDrawer());
    } catch (err) {
      AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{name: 'LandingScreen'}],
      });
      await AsyncStorage.setItem("email", user.email_address);

      await AsyncStorage.removeItem('termsCondition');
      navigation.dispatch(DrawerActions.closeDrawer());

      // Alert.alert('Error', 'Something went wrong', [
      //   {text: 'Ok', onPress: () => {}},
      // ]);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader
          backIcon={images.leftArrow}
          changeDirection
          goBack={() => navigation.dispatch(DrawerActions.closeDrawer())}
        />
      </View>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{marginTop: 80}}>
          {drawerTabs.map((item, ind) => (
            <DrawerItem
              pressColor=""
              key={ind}
              label={item.label}
              onPress={() => navigation.navigate(item.screen)}
              icon={() => (
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={[
                    styles.iconStyle,
                    {
                      tintColor:
                        selectedTab === item.screen ? null : colors.iconGrey,
                    },
                  ]}
                />
              )}
              labelStyle={[
                styles.labelStyle,
                {
                  color:
                    selectedTab === item.screen
                      ? colors.black
                      : colors.iconGrey,
                },
              ]}
              style={[
                styles.drawerItemStyle,
                {
                  borderLeftWidth: selectedTab === item.screen ? 1.5 : 0,
                  backgroundColor:
                    selectedTab === item.screen
                      ? colors.white
                      : colors.drawerColor,
                },
              ]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <DrawerItem
          pressColor=""
          label="Logout"
          onPress={onLogoutHandler}
          icon={() => (
            <Image
              resizeMode="contain"
              source={images.logout}
              style={[
                styles.iconStyle,
                {
                  tintColor: colors.primaryPink,
                },
              ]}
            />
          )}
          labelStyle={[
            styles.labelStyle,
            {
              color: colors.primaryPink,
            },
          ]}
          style={[
            styles.drawerItemStyle,
            {
              borderLeftWidth: 0,
              backgroundColor: colors.drawerColor,
            },
          ]}
        />
      </View>
    </DrawerContentScrollView>
  );
}
