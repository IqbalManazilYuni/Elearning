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
import SoalItem from '../../components/Soal/SoalItem';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';

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
  {
    id: 7,
    kategori: 'Soal',
    soal: {
      deskripsi1:
        'Berdasarkan hasil diskusi, buatlah pemahaman Ananda mengenai:',
      pertanyaan1: [
        {
          id: 1,
          pertanyaan: 'Teori asam basa Arrhenius',
        },
        {
          id: 2,
          pertanyaan: 'Teori asam basa Bronsted-Lowry',
        },
        {
          id: 3,
          pertanyaan: 'Pasangan asam basa konjugasi',
        },
        {
          id: 4,
          pertanyaan: 'Teori asam basa Lewis',
        },
      ],
    },
    jenis: 'Materi 1',
  },
  {
    id: 8,
    kategori: 'Soal',
    soal: {
      deskripsi1: 'Buatlah Kesimpulan dari materi yang sudah dipelajari!',
      pertanyaan1: [
        {
          id: 1,
          pertanyaan: 'Kesimpulan',
        },
      ],
    },
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
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [soalDanJawaban, setSoalDanJawaban] = useState<{
    [key: number]: {
      type: 'deskripsi' | 'pertanyaan' | 'file';
      content: string;
      jawaban?: string;
      uri?: string;
      name?: string;
      fileType?: string;
    }[];
  }>({
    3: [], // Soal untuk id 3
    6: [], // File untuk id 6
    7: [], // Soal untuk id 7
    8: [], // Soal untuk id 8
  });

  useEffect(() => {
    const currentItem = dataPembelajaran[currentIndex];
    if (currentItem.kategori === 'Soal') {
      const soalData = currentItem.soal;
      const initialSoalDanJawaban = [
        { type: 'deskripsi', content: soalData?.deskripsi1 },
        ...(soalData?.pertanyaan1?.map((soal) => ({
          type: 'pertanyaan',
          content: soal.pertanyaan,
          jawaban: '',
        })) || []),
        { type: 'deskripsi', content: soalData?.deskripsi2 },
        ...(soalData?.pertanyaan2?.map((soal) => ({
          type: 'pertanyaan',
          content: soal.pertanyaan,
          jawaban: '',
        })) || []),
      ].filter((item) => item.content); // Hapus item dengan konten undefined

      setSoalDanJawaban((prev) => ({
        ...prev,
        [currentItem.id]: initialSoalDanJawaban,
      }));
    }
  }, [currentIndex]);

  const handleJawabanChange = (text: string, index: number, id: number) => {
    setSoalDanJawaban((prev) => {
      const newSoalDanJawaban = [...prev[id]];
      if (newSoalDanJawaban[index].type === 'pertanyaan') {
        newSoalDanJawaban[index].jawaban = text;
      }
      return { ...prev, [id]: newSoalDanJawaban };
    });
  };

  const handleSimpanJawaban = (id: number) => {
    const jawaban = soalDanJawaban[id].map((item) => ({
      content: item.content,
      type: item.type,
      jawaban: item.jawaban || '', // Jika jawaban kosong, berikan string kosong
    }));

    console.log({
      id,
      Jawaban: jawaban,
    });
  };

  // const mergeSoalDanJawaban = (
  //   nama: string,
  //   nomor: string,
  //   soal1: any,
  //   soal2: any,
  //   soal3: any
  // ) => {
  //   return {
  //     nama,
  //     nomor,
  //     Latihan1: soal1,
  //     Latihan2: soal3,
  //     Latihan3: soal2,
  //   };
  // };
  // const combinedData = mergeSoalDanJawaban(
  //   'Nama Siswa',
  //   '12345',
  //   soalDanJawaban,
  //   soalDanJawaban7,
  //   soalDanJawaban8
  // );

  const handleFinish = () => {
    const data = {
      nama: 'Nama Siswa', // Ganti dengan nilai yang sesuai
      nomor: '12345', // Ganti dengan nilai yang sesuai
      soal: Object.keys(soalDanJawaban).map((id) => ({
        id: parseInt(id),
        Jawaban: soalDanJawaban[parseInt(id)].map((item) => ({
          content: item.content,
          type: item.type,
          jawaban: item.jawaban || '', // Jika jawaban kosong, berikan string kosong
          ...(item.type === 'file' && {
            uri: item.uri,
            name: item.name,
            type: item.fileType,
          }),
        })),
      })),
    };

    console.log(JSON.stringify(data));
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Hanya izinkan file PDF
      });

      const selectedFile = {
        uri: res[0].uri,
        name: res[0].name || 'file.pdf',
        type: res[0].type || 'application/pdf',
      };

      setSoalDanJawaban((prev) => ({
        ...prev,
        6: [
          {
            type: 'file',
            content: 'Uploaded PDF',
            uri: selectedFile.uri,
            name: selectedFile.name,
            fileType: selectedFile.type,
          },
        ],
      }));
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
        {dataPembelajaran[currentIndex].kategori === 'Soal' && (
          <ScrollView
            style={styles.boxSoal}
            showsVerticalScrollIndicator={false}
          >
            {soalDanJawaban[dataPembelajaran[currentIndex].id]?.map(
              (item, index) => (
                <SoalItem
                  key={index}
                  item={item}
                  index={index}
                  onChangeText={(text: any) =>
                    handleJawabanChange(
                      text,
                      index,
                      dataPembelajaran[currentIndex].id
                    )
                  }
                />
              )
            )}

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
                onPress={() =>
                  handleSimpanJawaban(dataPembelajaran[currentIndex].id)
                }
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
                marginBottom: 10,
              }}
              onPress={pickDocument}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'lexend',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Pilih Dokumen
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          height: 80,
          width: '100%',
          flexDirection: 'row',
          justifyContent: currentIndex === 0 ? 'flex-end' : 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        {currentIndex > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {currentIndex < dataPembelajaran.length - 1 ? (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={handleFinish}>
            <Text style={styles.navButtonText}>Selesai</Text>
          </TouchableOpacity>
        )}
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
  navButton: {
    backgroundColor: '#3DB2FF',
    width: '45%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  navButtonText: {
    color: 'white',
    fontFamily: 'lexend',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
