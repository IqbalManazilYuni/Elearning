import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
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
import PDFReader from 'react-native-pdf';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';

type PembelajaranScreenRouteProp = RouteProp<
  RootStackParamList,
  'Pembelajaran'
>;

const { width, height } = Dimensions.get('window');

const dataPembelajaran = [
  {
    id: 1,
    kategori: 'pdf',
    url: 'MateriPertama.pdf',
    jenis: 'Materi 1',
  },
  {
    id: 2,
    kategori: 'Video',
    url: 'VideoAsamBasa.mp4',
    jenis: 'Materi 1',
  },
  {
    id: 3,
    kategori: 'Soal',
    soal: {
      deskripsi1:
        'Berdasarkan kegiatan motivasi diperoleh masalah sebagai berikut:',
      pertanyaan1: [
        {
          id: 1,
          pertanyaan: 'Apa yang dimaksud dengan asam dan basa?',
        },
        {
          id: 2,
          pertanyaan:
            'Bagaimana teori asam dan basa menurut Arrhenius, Bronsted-Lowry dan Lewis?',
        },
      ],
      deskripsi2:
        'Buatlah hipotesis awal untuk permasalahan pada penyampaian masalah!',
      pertanyaan2: [
        {
          id: 3,
          pertanyaan: 'Asam adalah ?',
        },
        {
          id: 4,
          pertanyaan: 'Basa adalah ?',
        },
        {
          id: 5,
          pertanyaan: 'Teori Asam Basa Arrhenius adalah ?',
        },
        {
          id: 6,
          pertanyaan: 'Teori Asam Basa Bronsted-Lowry adalah ?',
        },
        {
          id: 7,
          pertanyaan: 'Teori Asam Basa Lewis adalah ?',
        },
      ],
    },
    jenis: 'Materi 1',
  },
  {
    id: 4,
    kategori: 'pdf',
    url: 'MateriKedua.pdf',
    jenis: 'Materi 1',
  },
  {
    id: 5,
    kategori: 'Video',
    url: 'VideoAsamBasaArr.mp4',
    jenis: 'Materi 1',
  },
  {
    id: 6,
    kategori: 'pdf',
    url: 'soal.pdf',
    jenis: 'Materi 1',
  },
];

export const PembelajaranScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PembelajaranScreenRouteProp>();
  const { jenis } = route.params.state;
  const [pdfLoading, setPdfLoading] = useState<boolean>(true);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [filePath, setFilePath] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // State untuk menyimpan indeks data yang sedang ditampilkan

  const [soalDanJawaban, setSoalDanJawaban] = useState<
    { type: 'deskripsi' | 'pertanyaan'; content: string; jawaban?: string }[]
  >([]);

  useEffect(() => {
    if (dataPembelajaran[currentIndex].kategori === 'Soal') {
      const soalData = dataPembelajaran[currentIndex].soal;
      const initialSoalDanJawaban = [
        { type: 'deskripsi', content: soalData?.deskripsi1 },
        ...soalData.pertanyaan1.map((soal) => ({
          type: 'pertanyaan',
          content: soal.pertanyaan,
          jawaban: '',
        })),
        { type: 'deskripsi', content: soalData?.deskripsi2 },
        ...soalData.pertanyaan2.map((soal) => ({
          type: 'pertanyaan',
          content: soal.pertanyaan,
          jawaban: '',
        })),
      ];
      setSoalDanJawaban(initialSoalDanJawaban);
    }
  }, [currentIndex]);

  const handleJawabanChange = (text: string, index: number) => {
    const newSoalDanJawaban = [...soalDanJawaban];
    if (newSoalDanJawaban[index].type === 'pertanyaan') {
      newSoalDanJawaban[index].jawaban = text;
    }
    setSoalDanJawaban(newSoalDanJawaban);
  };

  const handleSimpanJawaban = () => {
    console.log(soalDanJawaban);
  };

  const downloadFromFirebase = async (
    storagePath: string | undefined,
    localFilePath: string
  ) => {
    try {
      const reference = storage().ref(storagePath);
      await reference.writeToFile(localFilePath);
      console.log('File downloaded successfully to:', localFilePath);
      return localFilePath;
    } catch (error) {
      console.error('Error downloading file:', error);
      return null;
    }
  };

  const downloadFile = async (pdf: any) => {
    setPdfLoading(true);
    try {
      const localFile = `${RNFS.DocumentDirectoryPath}/${pdf}`;
      const localFileExists = await RNFS.exists(localFile);
      if (!localFileExists) {
        const storagePath = `pdf/${pdf}`;
        const downloadedFilePath = await downloadFromFirebase(
          storagePath,
          localFile
        );
        if (downloadedFilePath) {
          setFilePath(downloadedFilePath);
          console.log(downloadedFilePath);
        } else {
          setPdfLoading(false);
          console.log('Downloaded file path is null or empty.');
        }
      } else {
        console.log('File already exists in local storage');
        setFilePath(localFile);
        console.log(localFile);
      }
    } catch (error) {
      console.error('Error downloading and saving file:', error);
    } finally {
      setPdfLoading(false);
    }
  };

  const downloadFileVideo = async (video: any) => {
    setVideoLoading(true);
    try {
      const localFile = `${RNFS.DocumentDirectoryPath}/${video}`;
      const localFileExists = await RNFS.exists(localFile);
      if (!localFileExists) {
        const storagePath = `video/${video}`; // Sesuaikan dengan path video di Firebase Storage
        const downloadedFilePath = await downloadFromFirebase(
          storagePath,
          localFile
        );
        if (downloadedFilePath) {
          setVideoUrl(`file://${downloadedFilePath}`);
          console.log(downloadedFilePath);
        } else {
          setVideoLoading(false);
          console.log('Downloaded file path is null or empty.');
        }
      } else {
        console.log('File already exists in local storage');
        setVideoUrl(`file://${localFile}`);
        console.log(localFile);
      }
    } catch (error) {
      console.error('Error downloading and saving file:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  // Fungsi untuk menangani tombol "Next"
  const handleNext = () => {
    if (currentIndex < dataPembelajaran.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Jika sudah di akhir, kembali ke data pertama (opsional)
      setCurrentIndex(0);
    }
  };

  // Fungsi untuk menangani tombol "Previous"
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Jika sudah di data pertama, kembali ke data terakhir (opsional)
      setCurrentIndex(dataPembelajaran.length - 1);
    }
  };

  // Gunakan useEffect untuk mengunduh file saat currentIndex berubah
  useEffect(() => {
    const currentItem = dataPembelajaran[currentIndex];
    if (currentItem.kategori === 'pdf') {
      downloadFile(currentItem.url);
    } else if (currentItem.kategori === 'Video') {
      downloadFileVideo(currentItem.url);
    }
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <Header
        TxtMiddle={'Teori Asam Basa'}
        ImgBack={() => <IconBackLeft />}
        onBackPress={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        {dataPembelajaran[currentIndex].kategori === 'pdf' && (
          <>
            {pdfLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <>
                  {filePath ? (
                    <PDFReader
                      source={{ uri: `file://${filePath}`, cache: true }}
                      onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                      }}
                      onError={(error) => {
                        console.log('Error while loading PDF:', error);
                      }}
                      onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                      }}
                      style={styles.pdf}
                    />
                  ) : (
                    <Text>No PDF file found</Text>
                  )}
                  {dataPembelajaran[currentIndex].id === 6 && (
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: height * 0.02,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: 60,
                          width: '60%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#3DB2FF',
                          borderRadius: 16,
                        }}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'lexend',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}
                        >
                          Upload Jawaban
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              </View>
            )}
          </>
        )}
        {dataPembelajaran[currentIndex].kategori === 'Video' && (
          <>
            {videoLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                {videoUrl ? (
                  <Video
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    controls={true}
                    resizeMode="contain"
                    onError={(error) => {
                      console.error('Video error:', error);
                    }}
                    onLoad={() => {
                      console.log('Video loaded successfully');
                    }}
                  />
                ) : (
                  <Text>No video found</Text>
                )}
              </View>
            )}
          </>
        )}
        {dataPembelajaran[currentIndex].id === 3 && (
          <ScrollView
            style={styles.boxSoal}
            showsVerticalScrollIndicator={false}
          >
            {soalDanJawaban.map((item, index) => (
              <View key={index}>
                {item.type === 'deskripsi' ? (
                  <Text style={styles.fontDeskripsi}>{item.content}</Text>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        paddingLeft: 10,
                      }}
                    >
                      <View style={{ width: '100%', paddingLeft: 10 }}>
                        <Text style={styles.fontDeskripsi}>{item.content}</Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <TextInput
                        style={styles.inputMultiline}
                        placeholder="Masukkan Jawaban"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        onChangeText={(text) =>
                          handleJawabanChange(text, index)
                        }
                      />
                    </View>
                  </>
                )}
              </View>
            ))}

            {/* Tombol Simpan */}
            <View
              style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}
            >
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#3DB2FF',
                  borderRadius: 16,
                }}
                onPress={() => handleSimpanJawaban()}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'lexend',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}
                >
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
      <View
        style={{
          height: 80,
          width: '100%',
          flexDirection: 'row', // Mengatur tata letak tombol secara horizontal
          justifyContent: 'space-between', // Memberi jarak antara tombol
          alignItems: 'center',
          paddingHorizontal: 20, // Memberi padding horizontal
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#3DB2FF',
            width: '45%', // Lebar tombol
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
          }}
          onPress={handlePrev} // Tambahkan fungsi handlePrev di sini
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'lexend',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#3DB2FF',
            width: '45%', // Lebar tombol
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
          }}
          onPress={handleNext} // Tambahkan fungsi handleNext di sini
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'lexend',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Next
          </Text>
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
  pdf: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  loader: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
    width: width,
    backgroundColor: 'white',
  },
  boxSoal: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  fontDeskripsi: {
    fontFamily: 'lexend',
    fontSize: height * 0.018,
    fontWeight: 'black',
    marginBottom: 10,
  },
  inputMultiline: {
    width: '90%',
    height: 80, // Default tinggi inputan multiline
    borderWidth: 1,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
});
