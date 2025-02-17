import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigator/AppNavigator';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Header } from '../../components/header/Hearder';
import { IconBackLeft } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get('window');

type LembarScreenRouteProp = RouteProp<RootStackParamList, 'Lembar'>;

const dataPernyataan = [
  {
    id: 1,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Arrhenius.',
    jenis: 'Materi 1',
  },
  {
    id: 2,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Bronsted-Lowry.',
    jenis: 'Materi 1',
  },
  {
    id: 3,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Lewis.',
    jenis: 'Materi 1',
  },
  {
    id: 4,
    pernyataan:
      'Saya dapat membandingkan konsep asam dan basa menurut Arrhenius, Bronsted-Lowry dan Lewis.',
    jenis: 'Materi 1',
  },
];

export const LembarScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<LembarScreenRouteProp>();
  const { jenis } = route.params.state;
  const [nama, setNama] = useState('');
  const [role, setRole] = useState('');
  const [nomor, setNomor] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    const getDataFromAsyncStorage = async () => {
      try {
        const nama = await AsyncStorage.getItem('nama');
        const nomor = await AsyncStorage.getItem('nomor');
        const role = await AsyncStorage.getItem('role');
        if (nama !== null && nomor !== null && role !== null) {
          setNomor(nomor);
          setNama(nama);
          setRole(role);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: 'Sesi Login Habis',
          });
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    getDataFromAsyncStorage();
  }, []);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: 'Ya' | 'Tidak' | null;
  }>({});

  const handleSelection = (id: number, answer: 'Ya' | 'Tidak') => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [id]: prevState[id] === answer ? null : answer, // Toggle jika sudah dipilih
    }));
  };

  const [refleksiData, setRefleksiData] = useState<
    { id: string; jawaban: string; pernyataan: string }[]
  >([]);

  useEffect(() => {
    console.log(refleksiData);
  }, [refleksiData]);
  useEffect(() => {
    const cekData = async () => {
      setLoading1(true);
      try {
        const response = await fetch(
          `https://backend-mauve-chi-35.vercel.app/api/refleksi/${nomor}`
        );
        const data = await response.json();

        if (response.ok) {
          setRefleksiData(data.lembar); // Sesuaikan dengan properti dari backend
        } else {
          console.log('Data tidak ditemukan:', data.message);
        }
      } catch (error) {
        console.error('Error mengambil data refleksi:', error);
      } finally {
        setLoading1(false); // Set loading ke false setelah proses selesai
      }
    };

    if (nomor !== '') {
      cekData();
    }
  }, [nomor]);

  const dataUntukDitampilkan =
    refleksiData.length > 0 ? refleksiData : dataPernyataan;

  const handleSubmit = async () => {
    setLoading(true);
    const hasilJawaban = [
      {
        nama: nama,
        nomor: nomor,
        materi: jenis, // Menggunakan `jenis` dari route.params.state
        lembar: dataPernyataan.map((item) => ({
          id: item.id,
          pernyataan: item.pernyataan,
          jawaban: selectedAnswers[item.id] || 'Belum Dijawab',
        })),
      },
    ];
    try {
      const response = await fetch(
        'https://backend-mauve-chi-35.vercel.app/api/refleksi',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hasilJawaban),
        }
      );
      const payload = await response.json();

      if (response.ok) {
        // Jika berhasil, navigasi ke halaman Home
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: payload.message,
        });
        navigation.navigate('Home');
      } else {
        // Jika gagal, tampilkan pesan error
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: 'Coba lagi nanti',
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <Header
        TxtMiddle={'Lembar Refleksi'}
        ImgBack={() => <IconBackLeft />}
        onBackPress={() => navigation.goBack()}
      />
      {loading1 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.content}>
          <ScrollView
            style={styles.contentForm}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentBox}>
              <View style={[styles.headerCell, { width: '10%' }]}>
                <Text style={styles.headerText}>No</Text>
              </View>
              <View style={[styles.headerCell, { width: '60%' }]}>
                <Text style={styles.headerText}>Pernyataan</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Ya</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>Tidak</Text>
              </View>
            </View>

            {dataUntukDitampilkan.map((item) => (
              <View key={item.id} style={styles.contentBox1}>
                <View style={[styles.cell, { width: '10%' }]}>
                  <Text style={styles.cellText}>{item.id}</Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    { width: '60%', alignItems: 'flex-start', paddingLeft: 4 },
                  ]}
                >
                  <Text style={styles.cellText}>{item.pernyataan}</Text>
                </View>
                {refleksiData.length > 0 ? (
                  <>
                    <View style={styles.cell}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              item.jawaban === 'Ya' ? 'green' : 'white',
                          },
                        ]}
                        disabled
                      />
                    </View>
                    <View style={styles.cell}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              item.jawaban === 'Tidak' ? 'green' : 'white',
                          },
                        ]}
                        disabled
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.cell}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              selectedAnswers[item.id] === 'Ya'
                                ? 'green'
                                : 'white',
                          },
                        ]}
                        onPress={() => handleSelection(item.id, 'Ya')}
                      />
                    </View>
                    <View style={styles.cell}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              selectedAnswers[item.id] === 'Tidak'
                                ? 'green'
                                : 'white',
                          },
                        ]}
                        onPress={() => handleSelection(item.id, 'Tidak')}
                      />
                    </View>
                  </>
                )}
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {loading ? (
              <TouchableOpacity
                style={{
                  backgroundColor: '#3DB2FF',
                  height: 50,
                  width: 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}
                disabled
              >
                <ActivityIndicator size="large" color="white" />
              </TouchableOpacity>
            ) : (
              <>
                {refleksiData.length === 0 && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#3DB2FF',
                      height: 50,
                      width: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                    }}
                    onPress={handleSubmit}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                      Kirim Jawaban
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentForm: {
    flex: 1,
    padding: 10,
  },
  contentBox: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 0.5,
    backgroundColor: 'orange',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentBox1: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    borderWidth: 0.5,
  },
  boxBtn: {
    height: height * 0.12,
  },
  content: {
    borderWidth: 0.5,
    flex: 1,
    margin: 16,
    borderRadius: 16,
  },
  headerCell: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
  },
  headerText: {
    fontFamily: 'lexend',
    fontSize: height * 0.018,
    fontWeight: 'bold',
  },
  cell: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    padding: 5,
  },
  cellText: {
    fontFamily: 'lexend',
    fontSize: height * 0.018,
  },
  button: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
});
