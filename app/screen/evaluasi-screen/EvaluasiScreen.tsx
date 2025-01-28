import React, { useState } from 'react';
import {
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
import { Header } from '../../components/header/Hearder';
import { IconBackLeft, IconEvaluasi } from '../../assets/images';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/AppNavigator';

const { width, height } = Dimensions.get('window');

type EvaluasiScreenRouteProp = RouteProp<RootStackParamList, 'Evaluasi'>;

export const EvaluasiScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<EvaluasiScreenRouteProp>();
  const { item, evaluation } = route.params.state;
  const [nama, setNama] = useState('');
  const [nisn, setNisn] = useState('');
  const [statusData, setStatusData] = useState(false);
  const handleNavigationUjian = () => {
    setStatusData(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />

      {statusData === false ? (
        <>
          <Header
            TxtMiddle={item}
            ImgBack={() => <IconBackLeft />}
            onBackPress={() => navigation.goBack()}
          />
          <ScrollView style={styles.welcomeExam}>
            <View style={styles.styleIcon}>
              <IconEvaluasi />
            </View>
            <View style={styles.formInput}>
              <View style={styles.styleTitle}>
                <Text style={styles.fontTitle}>Ujian Evaluasi</Text>
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.labelNama}>Inputkan NISN</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan NISN"
                  placeholderTextColor={'black'}
                  value={nisn}
                  onChangeText={setNisn}
                />
                <Text style={[styles.labelNama, { marginTop: height * 0.016 }]}>
                  Inputkan Nama Siswa
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan Nama Siswa"
                  placeholderTextColor={'black'}
                  value={nama}
                  onChangeText={setNama}
                />
              </View>
              <View style={styles.childContent3}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleNavigationUjian}
                >
                  <Text style={styles.buttonText}>Selanjutnya</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.petunjukUjian}>
          <View style={styles.styleTitle}>
            <Text style={styles.fontTitle}>Petunjuk Ujian Evaluasi</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>1.</Text>
            <Text style={styles.text}>
              Berdoalah terlebih dahulu sebelum mengerjakan soal.
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>2.</Text>
            <Text style={styles.text}>
              Periksa dan bacalah soal-soal dengan teliti sebelum menjawab.
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>3.</Text>
            <Text style={styles.text}>
              Dahulukan soal-soal yang kamu anggap mudah.
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>4.</Text>
            <Text style={styles.text}>
              Bekerjalah secara jujur dan tidak bekerja sama dengan siapapun.
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>5.</Text>
            <Text style={styles.text}>
              Kerjakan soal-soal berikut ini dengan baik dan benar!
            </Text>
          </View>
          <View style={styles.buttonMulai}>
            <TouchableOpacity
              style={styles.button1}
              onPress={handleNavigationUjian}
            >
              <Text style={styles.buttonText}>Mulai</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  welcomeExam: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  formInput: {
    width: '100%',
    height: '50%',
    padding: 16,
    flexDirection: 'column',
  },
  styleTitle: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  fontTitle: {
    fontFamily: 'lexend',
    fontSize: height * 0.028,
  },
  boxForm: {
    width: '100%',
    height: '90%',
    flexDirection: 'column',
    padding: 10,
  },
  labelNama: {
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
  childContent3: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
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
  styleIcon: {
    width: '100%',
    alignItems: 'center',
  },
  petunjukUjian: {
    flex: 1,
    margin: 20,
    padding: 10,
    borderWidth: 0.6,
    borderRadius: 16,
  },
  text: {
    fontSize: height * 0.02,
    fontFamily: 'lexend',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  number: {
    fontSize: height * 0.02,
    fontFamily: 'lexend',
    marginRight: 5,
  },
  buttonMulai: {
    flex: 1,
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:height*0.1,
  },
  button1: {
    backgroundColor: '#0074CE',
    height: 50,
    width: '60%',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
