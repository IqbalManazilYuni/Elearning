import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LOGO } from '../../assets/images';
const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      navigation.navigate('Splash2'); // Navigasi berdasarkan status login
    };

    const timer = setTimeout(checkLoginStatus, 3000); // Tunggu 3 detik sebelum memeriksa status

    return () => clearTimeout(timer);
  }, [navigation]);

  const pdfSource = {
    uri: 'file:///android_asset/pdf/Cover.pdf', // Lokasi file di folder assets
    cache: true,
  };

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
            fontFamily: 'roboto',
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
            fontFamily: 'roboto',
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
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%', // Sesuaikan dengan ukuran gambar
    resizeMode: 'stretch', // Atur tampilan gambar
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
