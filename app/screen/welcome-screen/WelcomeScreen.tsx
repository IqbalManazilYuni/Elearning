import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CaretRight, LogoWelcome, Seperator } from '../../assets/images';

const { height } = Dimensions.get('window');

export const WelcomeScreen: React.FC = () => {
  // State animasi untuk fade dan slide
  const fadeAnim = useRef(new Animated.Value(0)).current; // Untuk animasi fade
  const slideAnim = useRef(new Animated.Value(height)).current; // Untuk animasi slide (untuk elemen yang masuk dari bawah)

  // Gunakan useEffect untuk memulai animasi ketika komponen pertama kali dimuat
  useEffect(() => {
    // Start animasi setelah komponen dimuat
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Durasi animasi fade
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000, // Durasi animasi slide
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
      <View style={styles.content1}>
        {/* Logo dan teks akan fade in */}
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <LogoWelcome />
          <Text
            style={{
              fontSize: height * 0.06,
              fontFamily: 'roboto',
              fontWeight: 'bold',
              color: '#363267',
            }}
          >
            ChemEdu
          </Text>
        </Animated.View>
      </View>
      <View style={styles.content2}>
        <View style={styles.childContent1}>
          <Seperator />
        </View>
        <View style={styles.childContent2}>
          {/* Text dengan animasi slide dan fade */}
          <Animated.View
            style={{
              width: '100%',
              height: '40%',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text
              style={{
                fontSize: height * 0.04,
                fontFamily: 'roboto',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textAlign: 'center',
                paddingHorizontal: 10,
              }}
            >
              Learn Chemistry easily and for free!
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              width: '100%',
              height: '60%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text
              style={{
                fontSize: height * 0.026,
                fontFamily: 'roboto',
                color: '#FFFFFF',
                textAlign: 'center',
                paddingHorizontal: 10,
                paddingTop: 16,
              }}
            >
              Master Chemistry interactively, right at your fingertips!
            </Text>
          </Animated.View>
        </View>
        <View style={styles.childContent3}>
          <View style={styles.row1}>
            <TouchableOpacity style={styles.button1}>
              <Text
                style={{
                  fontFamily: 'roboto',
                  fontSize: height * 0.028,
                  color: '#3DB2FF',
                  fontWeight: 'bold',
                }}
              >
                Guru
              </Text>
              <CaretRight />
            </TouchableOpacity>
          </View>
          <View style={styles.row2}>
            <TouchableOpacity style={styles.button2}>
              <Text
                style={{
                  fontFamily: 'roboto',
                  fontSize: height * 0.028,
                  color: '#3DB2FF',
                  fontWeight: 'bold',
                }}
              >
                Siswa
              </Text>
              <CaretRight />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content1: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content2: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3DB2FF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flex: 1,
    flexDirection: 'column',
  },
  childContent1: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childContent2: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  childContent3: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  row1: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row2: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#FFFFFF',
    height: '60%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    flexDirection: 'row',
  },
  button2: {
    backgroundColor: '#FFFFFF',
    height: '60%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    flexDirection: 'row',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
