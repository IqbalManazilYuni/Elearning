import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../screen/splash-screen/SplashScreen';
import { WelcomeScreen } from '../screen/welcome-screen/WelcomeScreen';
import { LoginScreen } from '../screen/Login-screen/LoginScreen';
import { HomeScreen } from '../screen/home-screen/HomeScreen';
import { PreviewScreen } from '../screen/preview-pdf-1-screen/PreviewScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Preview: {
    state: {
      item: string;
      pdf: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
