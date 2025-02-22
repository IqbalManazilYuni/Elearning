import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen2 } from '../screen/splash-screen/SplashScreen2';
import { WelcomeScreen } from '../screen/welcome-screen/WelcomeScreen';
import { LoginScreen } from '../screen/Login-screen/LoginScreen';
import { HomeScreen } from '../screen/home-screen/HomeScreen';
import { PreviewScreen } from '../screen/preview-pdf-1-screen/PreviewScreen';
import { MateriScreen } from '../screen/materi-screen/MateriScreen';
import { SplashScreen } from '../screen/splash-screen/SplashScreen';
import { EvaluasiScreen } from '../screen/evaluasi-screen/EvaluasiScreen';
import { LembarScreen } from '../screen/lembar-ref-screen/LembarScreen';
import { PembelajaranScreen } from '../screen/pembelajaraan-screen/PembelajaranScreen';
import { DaftarScreen } from '../screen/daftar-screen/DaftarScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Daftar: undefined;
  Home: undefined;
  Preview: {
    state: {
      item: string;
      pdf: string;
    };
  };
  Materi: {
    state: {
      item: string;
      code: string;
    };
  };
  Evaluasi: {
    state: {
      item: string;
      evaluation: string;
    };
  };
  Splash2: undefined;
  Lembar: {
    state: {
      jenis: string;
    };
  };
  Pembelajaran: {
    state: {
      jenis: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Splash2" component={SplashScreen2} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Daftar" component={DaftarScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="Materi" component={MateriScreen} />
      <Stack.Screen name="Evaluasi" component={EvaluasiScreen} />
      <Stack.Screen name="Lembar" component={LembarScreen} />
      <Stack.Screen name="Pembelajaran" component={PembelajaranScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
