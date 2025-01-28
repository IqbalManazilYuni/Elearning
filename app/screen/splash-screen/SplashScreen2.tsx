import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export const SplashScreen2: React.FC = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
        navigation.navigate('Welcome'); // Navigasi berdasarkan status login
    };

    const timer = setTimeout(checkLoginStatus, 3000); // Tunggu 3 detik sebelum memeriksa status

    return () => clearTimeout(timer);
  }, [navigation]);


  const pdfSource = {
    uri: 'file:///android_asset/pdf/Cover.pdf', // Lokasi file di folder assets
    cache: true,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/splash/cover.png')}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    width: "100%",
    height: "100%", // Sesuaikan dengan ukuran gambar
    resizeMode: 'stretch', // Atur tampilan gambar
  },
});
