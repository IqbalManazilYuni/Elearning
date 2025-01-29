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
  const [nisn, setNisn] = useState('');
  const [statusData, setStatusData] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [statusUjian, setStatusUjian] = useState(false);
  const handleSelection = (option: string) => {
    setSelectedOption(option);
  };
  const handleNavigationUjian = () => {
    setStatusData(true);
  };
  const handleUjian = () => {
    setStatusUjian(true);
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
                      selectedOption === 'jawabLangsung' && styles.selectedBtn,
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
                style={[styles.styleTitle, { marginBottom: 10, marginTop: 10 }]}
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
                          />
                        </View>

                        {/* Inputan Dijawab */}
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Dijawab:</Text>
                          <TextInput
                            style={styles.inputMultiline}
                            placeholder="Masukkan jawaban"
                            multiline
                            numberOfLines={6} // Lebih panjang karena biasanya jawaban lebih detail
                            textAlignVertical="top"
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
                    <TouchableOpacity style={styles.btnKirim}>
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
                    <TouchableOpacity style={styles.btnKirim}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'lexend',
                          fontSize: height * 0.02,
                        }}
                      >
                        {' '}
                        Upload Lembar Jawban
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </>
          )}
        </>
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
