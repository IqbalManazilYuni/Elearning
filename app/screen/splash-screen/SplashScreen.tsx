import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigator/AppNavigator';
import { LOGO } from '../../assets/images';

const { height } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
        navigation.navigate('Welcome'); // Navigasi berdasarkan status login
    };

    const timer = setTimeout(checkLoginStatus, 3000); // Tunggu 3 detik sebelum memeriksa status

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.backgroundScreen}>
      <StatusBar backgroundColor={'#3DB2FF'} />
      <View style={styles.contentUp}>
        <LOGO />
      </View>
      <View style={styles.contentUp2}>
        <Text
          style={{
            fontSize: height * 0.06,
            fontFamily: 'lexend',
            fontWeight: 'bold',
            color: '#FFFFFF',
          }}
        >
          ChemEdu
        </Text>
      </View>
      <View style={styles.contentUp3}>
        <Text
          style={{
            fontSize: height * 0.023,
            fontFamily: 'lexend',
            fontWeight: 'bold',
            color: '#FFFFFF',
          }}
        >
          Versi 1.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundScreen: {
    backgroundColor: '#3DB2FF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  fontTitle: {
    fontSize: height * 0.032,
    color: 'black',
  },
  contentUp: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentUp2: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentUp3: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
