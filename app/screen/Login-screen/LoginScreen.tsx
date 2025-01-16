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

const { height, width } = Dimensions.get('window');

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Animated Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigationHome = () => {
    navigation.navigate('Home');
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
            <View style={styles.childContent1}>
              <Text style={styles.label}>Nama Pengguna</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan Nama Pengguna"
                placeholderTextColor={'black'}
                value={email}
                onChangeText={setEmail}
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleNavigationHome}
              >
                <Text style={styles.buttonText}>Masuk</Text>
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
    width: '60%',
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
    height: '40%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
});
