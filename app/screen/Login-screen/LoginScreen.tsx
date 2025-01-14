import React, { useState, useEffect, useRef } from 'react';
import {
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

const { height } = Dimensions.get('window');

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Animated Values for FadeIn and Slide-In
  const fadeAnim = useRef(new Animated.Value(0)).current; // Untuk opacity
  const translateYAnim = useRef(new Animated.Value(50)).current; // Untuk translasi Y
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigationHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    // Trigger the fade-in and slide-in animation when the component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500, // Durasi animasi dalam milidetik
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1500, // Durasi animasi dalam milidetik
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
      {/* Animated Container */}
      <Animated.View
        style={[
          styles.fadeContainer,
          {
            opacity: fadeAnim, // Efek memudar (fade-in)
            transform: [{ translateY: translateYAnim }], // Efek translasi ke atas
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content1}>
            <LogoWelcome />
            <Text
              style={{
                fontSize: height * 0.06,
                fontFamily: 'lexend',
                fontWeight: 'bold',
                color: '#363267',
              }}
            >
              ChemEdu
            </Text>
          </View>
          <View style={styles.content2}>
            <View style={styles.childContent1}>
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: 'lexend',
                  fontSize: height * 0.022,
                  color: '#0074CE',
                  fontWeight: 700,
                }}
              >
                Nama Pengguna
              </Text>
              <TextInput
                style={styles.inputanEmail}
                placeholder="Masukkan Nama Pengguna"
                placeholderTextColor={'black'}
                value={email}
                onChangeText={setEmail}
              />
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: 'lexend',
                  fontSize: height * 0.022,
                  color: '#0074CE',
                  fontWeight: 700,
                  marginTop: height * 0.016,
                }}
              >
                Password Pengguna
              </Text>
              <TextInput
                style={styles.inputanPassword}
                placeholder="Masukkan Password Pengguna"
                placeholderTextColor={'black'}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.childContent3}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0074CE',
                  height: 50,
                  width: '60%',
                  borderRadius: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  handleNavigationHome();
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'lexend',
                    fontSize: height * 0.024,
                    fontWeight: 'bold',
                  }}
                >
                  Masuk
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fadeContainer: {
    flex: 1,
    width: '100%',
  },
  content1: {
    alignItems: 'center',
  },
  content2: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  childContent1: {
    height: '60%',
    width: '100%',
    flexDirection: 'column',
  },
  childContent3: {
    height: '40%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  inputanEmail: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: 'lexend',
    color: 'black',
    fontWeight: '300',
    borderColor: '#0074CE',
    borderRadius: 48,
  },
  inputanPassword: {
    fontFamily: 'lexend',
    color: 'black',
    fontWeight: '300',
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 16,
    borderColor: '#0074CE',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 25,
    top: 15,
  },
});
