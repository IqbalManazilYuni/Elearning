import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoWelcome } from '../../assets/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/AppNavigator';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export const LoginScreen: React.FC = () => {
  const [nomor, setNomor] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Animated Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigationHome = async () => {
    setLoading(true); // Set loading ke true saat proses dimulai

    try {
      const response = await fetch(
        'https://backend-mauve-chi-35.vercel.app/api/akuns/login',
        {
          method: 'POST',
          body: JSON.stringify({
            nomor: nomor,
            password: password,
          }), // Kirim data sebagai JSON
          headers: {
            'Content-Type': 'application/json', // Ubah ke application/json
          },
        }
      );

      const payload = await response.json();

      if (response.ok) {
        // Jika berhasil, navigasi ke halaman Home
        await AsyncStorage.setItem('nama', payload.data.nama); // Simpan nama
        await AsyncStorage.setItem('nomor', payload.data.nomor); // Simpan nomor
        await AsyncStorage.setItem('role', payload.data.role); // Simpan nomor
        Toast.show({
          type: 'success',
          text1: 'Login Berhasil',
          text2: 'Selamat datang',
        });
        console.log(payload.data.nama);

        navigation.navigate('Home');
      } else {
        // Jika gagal, tampilkan pesan error
        Toast.show({
          type: 'error',
          text1: 'Gagal Login',
          text2: payload.message || 'Coba lagi nanti',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Terjadi Kesalahan',
        text2: 'Silakan coba lagi',
      });
    } finally {
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  useEffect(() => {
    // Parallel animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(bgColorAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim, scaleAnim, bgColorAnim]);

  // Interpolate background color
  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FFFFFF'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
      {/* Animated Background */}
      <Animated.View style={[styles.fadeContainer, { backgroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content1}>
            {/* Animated Logo */}
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                marginBottom: height * 0.02,
              }}
            >
              <LogoWelcome />
            </Animated.View>
            <Animated.Text
              style={[
                styles.logoText,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: translateYAnim }],
                },
              ]}
            >
              ChemEdu
            </Animated.Text>
          </View>
          <View style={styles.content2}>
            <View>
              <Text style={styles.label}>Nomor Identitas Pengguna</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan Nomor Identitas Pengguna"
                placeholderTextColor={'black'}
                value={nomor}
                onChangeText={setNomor}
              />
              <Text style={[styles.label, { marginTop: height * 0.016 }]}>
                Password Pengguna
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan Password Pengguna"
                placeholderTextColor={'black'}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.childContent3}>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                {loading ? (
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size="large" color="white" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleNavigationHome}
                  >
                    <Text style={styles.buttonText}>Masuk</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadeContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content1: {
    alignItems: 'center',
  },
  content2: {
    width: '100%',
    padding: 20,
  },
  logoText: {
    fontSize: height * 0.06,
    fontFamily: 'lexend',
    fontWeight: 'bold',
    color: '#363267',
  },
  label: {
    marginBottom: 10,
    fontFamily: 'lexend',
    fontSize: height * 0.022,
    color: '#0074CE',
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: 'lexend',
    borderColor: '#0074CE',
    borderRadius: 48,
  },
  button: {
    backgroundColor: '#0074CE',
    height: 50,
    width: '90%',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'lexend',
    fontSize: height * 0.024,
    fontWeight: 'bold',
  },
  childContent3: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
