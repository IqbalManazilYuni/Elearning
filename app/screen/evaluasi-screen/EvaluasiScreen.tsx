import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';

const { width, height } = Dimensions.get('window');

type EvaluasiScreenRouteProp = RouteProp<RootStackParamList, 'Evaluasi'>;

const dataSoal = [
  {
    id: 1,
    soal: 'Dalam suatu reaksi yang terjadi antara kation hidrogen dan anion hidroksida akan menjadi senyawa air didalam campuran ion yang terjadi, sedangkan pada reaksi asam karbonat yaitu antara karbondioksida dengan senyawa air, berbeda dengan larutan yang terjadi antara senyawa sulfur trioksida dengan oksigen menghasilkan senyawa sulfat. Tentukan asam lewis dan basa lewis pada reaksi di atas?',
  },
  {
    id: 2,
    soal: 'Tentukan pasangan asam basa konjugasi menurut Bronsted-Lowry dari reaksi antara larutan asam sulfat dengan asam format. Tentukan reaksi penyetaraan dan pasangan asam basa berdasarkan reaksi larutan diatas!',
  },
  {
    id: 3,
    soal: 'Kekuatan asam basa dapat dilihat dari derajat ionisasinya (𝛼). Jika dalam suatu percobaan tersedia larutan CH3COOH 0,1 M yang mengandung 0,01 ion H+, bagaimana cara untuk menentukan harga Ka dan derajat ionisasi tersebut? Dan apakah yang dimaksud derajat ionisasi? Tentukan apakah larutan tersebut termasuk asam kuat atau asam lemah? ',
  },
  {
    id: 4,
    soal: 'Dalam suatu percobaan terdapat larutan HCOOH 0,2 M yang mengandung ion H+ sebesar 0,04 M. Hitung nilai Ka derajat disosiasi larutan tersebut? Dan tentukan apakah larutan tersebut termasuk asam kuat atau asam lemah?',
  },
  {
    id: 5,
    soal: 'Ririn melarutkan 17,1 gram Ba(OH)2 dalam air sehingga volume larutan menjadi 250 mL (Ar Ba=137, O=16, H=1), kemudian Ririn melakukan pengukuran pH terhadap larutan tersebut. Berapakah nilai pH yang diperoleh Ririn? Tentukan pH dari sampel tersebut dan jelaskan apakah pH sampel tersebut bersifat asam atau basa.',
  },
  {
    id: 6,
    soal: 'Seorang praktikan melakukan parktikum disebuah laboratorium dengan menggunakan asam oksalat. Asam oksalat adalah asam berbasa dua. Sebanyak 10 mL larutan asam oksalat diencerkan dengan air sampai volumenya 100 mL. Larutan ini digunakan untuk mentitrasi 20 ml larutan NaOH 0,2 M dengan indikator bromtimol biru. Bila titik akhir diperoleh saat volume asam oksalat mencapai 25 mL, maka konsentrasi larutan asam oksalat awal adalah?',
  },
  {
    id: 7,
    soal: 'Garam banyak digunakan dalam kehidupan sehari-hari, diantaranya sebagai pupuk untuk tanah basa, pengembang kue, pengawet makanan, dan dalam industri. Berikut adalah beberapa larutan garam [NH4]2SO4, Na2CO3, KCN, CH3COONa, dan K2SO4. Pasangan larutan garam yang paling tepat berdasarkan asam basa penyusunnya, pH dan sifat hidrolisisnya adalah ?',
  },
  {
    id: 8,
    soal: 'Limbah pabrik yang dibuang ke sungai dapat membuat perubahan pH pada air sungai. Dalam sebuah sungai yang tercemar diambil sampel air dan ditemukan bahwa konsentarsi ion hidrogen terkandung sebesar 3,2×10-5. Tentukanlah pH dari sampel air tersebut dan bagaimana kesimpulan berdasarkan hasil perhitungan penentuan pH tersebut?',
  },
];

export const EvaluasiScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<EvaluasiScreenRouteProp>();
  const { item, evaluation } = route.params.state;
  const [nama, setNama] = useState('');
  const [role, setRole] = useState('');
  const [nomor, setNomor] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [jawaban, setJawaban] = useState<
    {
      id: number;
      soal: string;
      jawaban: {
        diketahui: string;
        ditanya: string;
        dijawab: string;
      }[];
    }[]
  >(
    dataSoal.map((soal) => ({
      id: soal.id,
      soal: soal.soal,
      jawaban: [
        {
          diketahui: '',
          ditanya: '',
          dijawab: '',
        },
      ],
    }))
  );
  const [statusUjian, setStatusUjian] = useState(false);
  const handleSelection = (option: string) => {
    setSelectedOption(option);
  };
  const handleUjian = () => {
    setStatusUjian(true);
  };

  const handleJawabanChange = (
    id: number,
    type: 'diketahui' | 'ditanya' | 'dijawab',
    text: string
  ) => {
    setJawaban((prevJawaban) =>
      prevJawaban.map((item) =>
        item.id === id
          ? {
              ...item,
              jawaban: [
                {
                  ...item.jawaban[0],
                  [type]: text,
                },
              ],
            }
          : item
      )
    );
  };

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

  const handleKirimJawaban = async () => {
    // Validasi apakah semua jawaban sudah terisi
    const isAllFilled = jawaban.every((item) => {
      return (
        item.jawaban[0].diketahui.trim() !== '' &&
        item.jawaban[0].ditanya.trim() !== '' &&
        item.jawaban[0].dijawab.trim() !== ''
      );
    });

    if (!isAllFilled) {
      // Jika ada jawaban yang belum terisi, tampilkan alert
      Alert.alert(
        'Harap pastikan semua jawaban sudah terisi sebelum mengirim!'
      );
      return; // Hentikan proses pengiriman
    }

    // Tampilkan konfirmasi sebelum mengirim
    Alert.alert(
      'Simpan Jawaban',
      'Apakah anda ingin menyimpan jawaban evaluasi ?',
      [
        {
          text: 'Batal',
          onPress: () => null, // Tidak melakukan apa-apa
          style: 'cancel',
        },
        {
          text: 'Simpan',
          onPress: () => handleSubmitJawabLangsung(), // Keluar dari aplikasi
        },
      ],
      { cancelable: false }
    );
    // Format jawaban sesuai dengan struktur yang diinginkan
  };

  const handleSubmitJawabLangsung = async () => {
    const formattedJawaban = [
      {
        nama: nama,
        nomor: nomor,
        tipe: selectedOption,
        evaluasi: jawaban.map((item) => ({
          id: item.id,
          soal: item.soal,
          jawaban: item.jawaban,
        })),
      },
    ];
    setLoading(true);
    try {
      const response = await fetch(
        'https://vwq2vz1x-5000.asse.devtunnels.ms/api/evaluasi',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedJawaban),
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

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Hanya izinkan file PDF
      });

      setSelectedFile({
        uri: res[0].uri,
        name: res[0].name || 'file.pdf',
        type: res[0].type || 'application/pdf',
      });

      Toast.show({
        type: 'success',
        text1: 'File Dipilih',
        text2: 'File berhasil dipilih, siap untuk diupload.',
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
        Toast.show({
          type: 'info',
          text1: 'Dibatalkan',
          text2: 'Pemilihan file dibatalkan',
        });
      } else {
        console.error('Error:', err);
        Toast.show({
          type: 'error',
          text1: 'Terjadi Kesalahan',
          text2: 'Gagal memilih file',
        });
      }
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      Alert.alert('Pilih file terlebih dahulu sebelum mengupload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.type,
    });

    formData.append('nama', nama);
    formData.append('nomor', nomor);
    formData.append('tipe', selectedOption);

    setLoading(true);
    try {
      const response = await fetch(
        'https://vwq2vz1x-5000.asse.devtunnels.ms/api/evaluasi/file',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: 'File PDF berhasil diunggah',
        });
        setSelectedFile(null); // Reset setelah berhasil upload
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal',
          text2: responseData.message || 'Gagal mengunggah file PDF',
        });
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Terjadi Kesalahan',
        text2: 'Gagal mengunggah file',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />

      <>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            {statusUjian === false ? (
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
                    Periksa dan bacalah soal-soal dengan teliti sebelum
                    menjawab.
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
                    Bekerjalah secara jujur dan tidak bekerja sama dengan
                    siapapun.
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.number}>5.</Text>
                  <Text style={styles.text}>
                    Kerjakan soal-soal berikut ini dengan baik dan benar!
                  </Text>
                </View>
                <View style={styles.buttonTipe}>
                  <View style={styles.boxButton}>
                    <TouchableOpacity
                      style={[
                        styles.btnYes,
                        selectedOption === 'jawabLangsung' &&
                          styles.selectedBtn,
                      ]}
                      onPress={() => handleSelection('jawabLangsung')}
                    >
                      <Text
                        style={[
                          styles.fontBtn,
                          selectedOption === 'jawabLangsung' &&
                            styles.selectedFont,
                        ]}
                      >
                        Jawab Langsung
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.btnNo,
                        selectedOption === 'uploadLembar' && styles.selectedBtn,
                      ]}
                      onPress={() => handleSelection('uploadLembar')}
                    >
                      <Text
                        style={[
                          styles.fontBtn,
                          selectedOption === 'uploadLembar' &&
                            styles.selectedFont,
                        ]}
                      >
                        Upload Lembar Jawaban
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {selectedOption && (
                  <View style={styles.buttonMulai}>
                    <TouchableOpacity
                      style={styles.button1}
                      onPress={handleUjian}
                    >
                      <Text style={styles.buttonText}>Mulai</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <>
                <View
                  style={[
                    styles.styleTitle,
                    { marginBottom: 10, marginTop: 10 },
                  ]}
                >
                  <Text style={styles.fontTitle}>Ujian Evaluasi</Text>
                </View>
                <ScrollView
                  style={styles.contentUjian}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  showsVerticalScrollIndicator={false}
                >
                  {dataSoal.map((item, index) => (
                    <View key={index} style={styles.boxSoal}>
                      {/* Soal */}
                      <View style={styles.contentSoal}>
                        <Text style={styles.fontSoal}>{item.soal}</Text>
                      </View>
                      {selectedOption === 'jawabLangsung' && (
                        <>
                          {/* Inputan Diketahui */}
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>Diketahui:</Text>
                            <TextInput
                              style={styles.inputMultiline}
                              placeholder="Masukkan data yang diketahui"
                              multiline
                              numberOfLines={4}
                              textAlignVertical="top"
                              onChangeText={(text) =>
                                handleJawabanChange(item.id, 'diketahui', text)
                              }
                              value={
                                jawaban.find((jawab) => jawab.id === item.id)
                                  ?.jawaban[0].diketahui || ''
                              }
                            />
                          </View>

                          {/* Inputan Ditanya */}
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>Ditanya:</Text>
                            <TextInput
                              style={styles.inputMultiline}
                              placeholder="Masukkan pertanyaan"
                              multiline
                              numberOfLines={4}
                              textAlignVertical="top"
                              onChangeText={(text) =>
                                handleJawabanChange(item.id, 'ditanya', text)
                              }
                              value={
                                jawaban.find((jawab) => jawab.id === item.id)
                                  ?.jawaban[0].ditanya || ''
                              }
                            />
                          </View>

                          {/* Inputan Dijawab */}
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>Dijawab:</Text>
                            <TextInput
                              style={styles.inputMultiline}
                              placeholder="Masukkan jawaban"
                              multiline
                              numberOfLines={6}
                              textAlignVertical="top"
                              onChangeText={(text) =>
                                handleJawabanChange(item.id, 'dijawab', text)
                              }
                              value={
                                jawaban.find((jawab) => jawab.id === item.id)
                                  ?.jawaban[0].dijawab || ''
                              }
                            />
                          </View>
                        </>
                      )}
                    </View>
                  ))}
                  <View
                    style={{
                      width: '95%',
                      height: 50,
                      marginBottom: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {selectedOption === 'jawabLangsung' ? (
                      <TouchableOpacity
                        style={styles.btnKirim}
                        onPress={handleKirimJawaban}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'lexend',
                            fontSize: height * 0.02,
                          }}
                        >
                          {' '}
                          Kirim Jawban
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        {!selectedFile ? (
                          <TouchableOpacity
                            style={styles.btnKirim}
                            onPress={pickFile}
                          >
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: 'lexend',
                                fontSize: height * 0.02,
                              }}
                            >
                              {' '}
                              Ambil Dokumen
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <>
                            <Text>{selectedFile.name}</Text>
                            <TouchableOpacity
                              style={styles.btnKirim}
                              onPress={uploadFile}
                            >
                              <Text
                                style={{
                                  color: 'white',
                                  fontFamily: 'lexend',
                                  fontSize: height * 0.02,
                                }}
                              >
                                {' '}
                                Upload File
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </>
                    )}
                  </View>
                </ScrollView>
              </>
            )}
          </>
        )}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  loader: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height * 0.1,
  },
  button1: {
    backgroundColor: '#0074CE',
    height: 50,
    width: '60%',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTipe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxButton: {
    width: '95%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  btnYes: {
    height: '100%',
    width: '50%',
    borderTopLeftRadius: 24,
    borderWidth: 0.5,
    borderBottomLeftRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNo: {
    height: '100%',
    width: '50%',
    borderTopRightRadius: 24,
    borderWidth: 0.5,
    borderBottomRightRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBtn: {
    fontFamily: 'lexend',
    fontSize: 14,
    fontWeight: 'black',
  },
  selectedBtn: {
    backgroundColor: '#0074CE',
    borderColor: '#0074CE',
  },
  selectedFont: {
    color: 'white',
  },
  contentUjian: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  contentSoal: {
    width: '95%',
    padding: 16, // Tambahkan padding agar teks tidak menempel ke border
    borderWidth: 0.5,
    borderColor: '#ccc', // Warna border agar lebih lembut
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 5,
    marginVertical: 10,
  },
  fontSoal: {
    fontFamily: 'lexend',
    fontSize: height * 0.02,
    textAlign: 'justify',
    fontWeight: 'heavy',
  },
  boxSoal: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: '95%',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputMultiline: {
    width: '100%',
    height: 80, // Default tinggi inputan multiline
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    textAlignVertical: 'top', // Agar teks mulai dari atas
  },
  btnKirim: {
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0074CE',
    borderRadius: 16,
  },
});
