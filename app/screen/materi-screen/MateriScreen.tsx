import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/header/Hearder';
import { IconBackLeft, IconLatihan, IconMateri2, IconRefleksi, IconRight } from '../../assets/images';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/AppNavigator';

const { width, height } = Dimensions.get('window');

type MateriScreenRouteProp = RouteProp<RootStackParamList, 'Materi'>;

export const MateriScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<MateriScreenRouteProp>();
  const { item, code } = route.params.state;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <Header
        TxtMiddle={item}
        ImgBack={() => <IconBackLeft />}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.containerContent}>
        <TouchableOpacity style={styles.buttonStyle}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '85%',
            }}
          >
            <Text style={styles.fontTitle}> Materi Pelajaran </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <IconMateri2 />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '85%',
            }}
          >
            <Text style={styles.fontTitle}> Latihan </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <IconLatihan />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '85%',
            }}
          >
            <Text style={styles.fontTitle}> Lembar Refleksi </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <IconRefleksi />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerContent: {
    flexDirection: 'column',
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    width: '100%',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 16,
    flexDirection: 'row',
  },
  fontTitle: {
    fontSize: height * 0.02,
    fontFamily: 'lexend',
    fontWeight: 'bold',
  },
});
