import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from '../components';
import {DashboardScreen} from '../screens/dashboard';
import {ChecklistLandingScreen, ChecklistScreen} from '../screens/checklist';
import {GuideScreen, HandbookScreen} from '../screens/handbook';
import {FeedbackScreen} from '../screens/feedback';
import {ThankyouScreen} from '../screens/thankyou';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
  drawerStyle: {
    width: '90%',
  },
};

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="DashboardScreen">
      <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />
      <Drawer.Screen name="ChecklistScreen" component={ChecklistScreen} />
      <Drawer.Screen name="HandbookScreen" component={HandbookScreen} />
      {/* <Drawer.Screen name="GuideScreen" component={GuideScreen} /> */}
      <Drawer.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Drawer.Screen
        name="ChecklistLandingScreen"
        component={ChecklistLandingScreen}
      />
      <Drawer.Screen name="ThankyouScreen" component={ThankyouScreen} />
    </Drawer.Navigator>
  );
}
