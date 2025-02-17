import React, { useEffect, useMemo, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [nama, setNama] = useState('');
  const [role, setRole] = useState('');
  const [nomor, setNomor] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusJawaban, setStatusJawaban] = useState(false);
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

  useEffect(() => {
    const cekJawaban = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://backend-mauve-chi-35.vercel.app/api/response/getNomor`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nomor: nomor,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
          setStatusJawaban(data.status);
          Toast.show({
            type: 'info',
            text1: 'Informasi',
            text2: 'Anda Sudah Mengejerkan Latihan Materi 1',
          });
        } else {
          console.log('Data tidak ditemukan:', data.message);
        }
      } catch (error) {
        console.error('Error mengambil data response:', error);
      } finally {
        setLoading(false); // Set loading ke false setelah proses selesai
      }
    };
    if (nomor !== '') {
      cekJawaban();
    }
  }, [nomor]);

  const [soalDanJawaban, setSoalDanJawaban] = useState<{
    [key: number]: {
      type: 'deskripsi' | 'pertanyaan' | 'file';
      content: string;
      jawaban?: string;
      name?: string;
    }[];
  }>(() => {
    // Inisialisasi semua soal sekaligus
    const initialData: typeof soalDanJawaban = {};

    dataPembelajaran.forEach((item) => {
      if (item.kategori === 'Soal') {
        const soalData = item.soal;
        initialData[item.id] = [
          { type: 'deskripsi', content: soalData.deskripsi1 },
          ...soalData.pertanyaan1.map((soal) => ({
            type: 'pertanyaan' as const,
            content: soal.pertanyaan,
            jawaban: '', // Jawaban awal kosong
          })),
          ...(soalData.deskripsi2
            ? [{ type: 'deskripsi' as const, content: soalData.deskripsi2 }]
            : []),
          ...(soalData.pertanyaan2?.map((soal) => ({
            type: 'pertanyaan' as const,
            content: soal.pertanyaan,
            jawaban: '',
          })) || []),
        ].filter((item) => item.content);
      }
    });

    return initialData;
  });

  const handleJawabanChange = (text: string, index: number, id: number) => {
    setSoalDanJawaban((prev) => {
      const updatedSoal = [...prev[id]]; // Salin array jawaban untuk ID ini
      updatedSoal[index] = { ...updatedSoal[index], jawaban: text };
      return { ...prev, [id]: updatedSoal };
    });
  };

  const handleSimpanJawaban = (id: number) => {
    const jawaban = soalDanJawaban[id].map((item) => ({
      content: item.content,
      type: item.type,
      jawaban: item.jawaban || '', // Jika jawaban kosong, berikan string kosong
    }));
    Toast.show({
      type: 'success',
      text1: 'Berhasil',
      text2: 'Jawaban Anda Sudah Direkam',
    });
    console.log({
      id,
      Jawaban: jawaban,
    });
  };

  const handleFinish = async () => {
    const data = {
      nama: nama, // Ganti dengan nilai yang sesuai
      nomor: nomor, // Ganti dengan nilai yang sesuai
      soal: Object.keys(soalDanJawaban).map((id) => ({
        id: parseInt(id),
        Jawaban: soalDanJawaban[parseInt(id)].map((item) => ({
          content: item.content,
          type: item.type,
          jawaban: item.jawaban || '', // Jika jawaban kosong, berikan string kosong
          ...(item.type === 'file' && {
            name: item.name,
          }),
        })),
      })),
    };
    console.log(JSON.stringify(data));

    const formData = new FormData();
    formData.append('file', {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.type,
    });

    formData.append('nama', nama);
    formData.append('nomor', nomor);
    formData.append('soal', JSON.stringify(data));
    setLoading(true);
    try {
      const response = await fetch(
        'https://backend-mauve-chi-35.vercel.app/api/response/file',
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
          text2: 'Materi Sudah Selesai Dikerjakan',
        });
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Gagal',
          text2: responseData.message || 'Gagal mengunggah Jawaban',
        });
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Terjadi Kesalahan',
        text2: 'Gagal mengunggah Jawaban',
      });
    } finally {
      setLoading(false);
    }
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

      setSelectedFile({
        uri: res[0].uri,
        name: res[0].name || 'file.pdf',
        type: res[0].type || 'application/pdf',
      });

      setSoalDanJawaban((prev) => ({
        ...prev,
        6: [
          {
            type: 'file',
            content: 'Uploaded PDF',
            name: selectedFile.name,
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

  const isExcluded = (id: number) => [3, 6, 7, 8].includes(id);

  // Fungsi untuk menangani tombol "Next"
  const handleNext = () => {
    let newIndex = currentIndex;
    let nextIndex = newIndex + 1;
    while (
      nextIndex < dataPembelajaran.length &&
      statusJawaban &&
      isExcluded(dataPembelajaran[nextIndex].id)
    ) {
      nextIndex++;
    }
    if (nextIndex >= dataPembelajaran.length) {
      nextIndex = dataPembelajaran.length - 1;
    }
    setCurrentIndex(nextIndex);
  };

  // Fungsi untuk menangani tombol "Previous"
  const handlePrev = () => {
    let newIndex = currentIndex;
    let prevIndex = newIndex - 1;
    while (
      prevIndex >= 0 &&
      statusJawaban &&
      isExcluded(dataPembelajaran[prevIndex].id)
    ) {
      prevIndex--;
    }
    if (prevIndex < 0) {
      prevIndex = 0;
    }
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    if (statusJawaban) {
      let newIndex = currentIndex;
      if (isExcluded(dataPembelajaran[newIndex].id)) {
        let foundIndex = -1;
        // Search forward
        for (let i = newIndex; i < dataPembelajaran.length; i++) {
          if (!isExcluded(dataPembelajaran[i].id)) {
            foundIndex = i;
            break;
          }
        }
        // If not found, search backward
        if (foundIndex === -1) {
          for (let i = newIndex; i >= 0; i--) {
            if (!isExcluded(dataPembelajaran[i].id)) {
              foundIndex = i;
              break;
            }
          }
        }
        if (foundIndex !== -1) {
          setCurrentIndex(foundIndex);
        }
      }
    }
  }, [statusJawaban]);

  // Gunakan useEffect untuk mengunduh file saat currentIndex berubah
  useEffect(() => {
    const currentItem = dataPembelajaran[currentIndex];
    if (currentItem.kategori === 'pdf') {
      downloadFile(currentItem.url);
    } else if (currentItem.kategori === 'Video') {
      downloadFileVideo(currentItem.url);
    }
  }, [currentIndex]);

  const isAllAnswersFilled = (id: number) => {
    const soal = soalDanJawaban[id];
    return soal?.every((item) => {
      if (item.type === 'pertanyaan') {
        return item.jawaban?.trim() !== '';
      }
      return true;
    });
  };

  const isAllSoalFilled = () => {
    const requiredIds = [3, 6, 7, 8];
    return requiredIds.every((id) => isAllAnswersFilled(id));
  };

  const currentItem = dataPembelajaran[currentIndex];

  const isCurrentSoalFilled = isAllAnswersFilled(currentItem.id);

  const isAllRequiredSoalFilled = isAllSoalFilled();

  const lastAllowedIndex = useMemo(() => {
    if (!statusJawaban) return dataPembelajaran.length - 1;
    let lastIndex = dataPembelajaran.length - 1;
    while (lastIndex >= 0 && isExcluded(dataPembelajaran[lastIndex].id)) {
      lastIndex--;
    }
    return lastIndex;
  }, [statusJawaban]);

  // Modify the rendering condition for Soal items
  const shouldRenderSoal =
    currentItem.kategori === 'Soal' &&
    (!statusJawaban || (statusJawaban && !isExcluded(currentItem.id)));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <Header
        TxtMiddle={'Teori Asam Basa'}
        ImgBack={() => <IconBackLeft />}
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
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
            {shouldRenderSoal &&
              dataPembelajaran[currentIndex].kategori === 'Soal' && (
                <ScrollView
                  style={styles.boxSoal}
                  showsVerticalScrollIndicator={false}
                >
                  {soalDanJawaban[dataPembelajaran[currentIndex].id]?.map(
                    (item, index) => (
                      <SoalItem
                        key={`${dataPembelajaran[currentIndex].id}-${index}`} // Key unik
                        item={item}
                        index={index}
                        onChangeText={(text: any) =>
                          handleJawabanChange(
                            text,
                            index,
                            dataPembelajaran[currentIndex].id // Pastikan ID soal yang benar
                          )
                        }
                      />
                    )
                  )}

                  {/* Tombol Simpan */}
                  {isCurrentSoalFilled && (
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}
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
                        onPress={() => handleSimpanJawaban(currentItem.id)}
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
                  )}
                </ScrollView>
              )}
            {statusJawaban === false && dataPembelajaran[currentIndex].id === 6 && (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: height * 0.02,
                }}
              >
                {selectedFile !== null && <Text>{selectedFile.name}</Text>}
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

            {currentIndex < lastAllowedIndex ? (
              <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              isAllRequiredSoalFilled && (
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={handleFinish}
                >
                  <Text style={styles.navButtonText}>Selesai</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </>
      )}
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
