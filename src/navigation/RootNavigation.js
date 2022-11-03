import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setNetworkState} from '../redux/actions';
import {
  ForgotPasswordScreen,
  LandingScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  VerifyOtpScreen,
} from '../screens/auth';
import {ChecklistLandingScreen, VerifyScreen} from '../screens/checklist';
import {GeneralFormScreen} from '../screens/forms';
import {GuideScreen} from '../screens/handbook';
import {SplashScreen} from '../screens/splash';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export default function RootNavigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      await dispatch(setNetworkState(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen name="Home" component={DrawerNavigation} />
        <Stack.Screen name="GeneralFormScreen" component={GeneralFormScreen} />
        <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
        <Stack.Screen name="GuideScreen" component={GuideScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
