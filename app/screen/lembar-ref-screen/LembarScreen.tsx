import React, { useState } from 'react';
import {
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
  {
    id: 5,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Arrhenius.',
    jenis: 'Materi 1',
  },
  {
    id: 6,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Bronsted-Lowry.',
    jenis: 'Materi 1',
  },
  {
    id: 7,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Lewis.',
    jenis: 'Materi 1',
  },
  {
    id: 8,
    pernyataan:
      'Saya dapat membandingkan konsep asam dan basa menurut Arrhenius, Bronsted-Lowry dan Lewis.',
    jenis: 'Materi 1',
  },
  {
    id: 9,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Arrhenius.',
    jenis: 'Materi 1',
  },
  {
    id: 10,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Bronsted-Lowry.',
    jenis: 'Materi 1',
  },
  {
    id: 11,
    pernyataan:
      'Saya dapat menjelaskan konsep asam dan basa menurut teori Lewis.',
    jenis: 'Materi 1',
  },
  {
    id: 12,
    pernyataan:
      'Saya dapat membandingkan konsep asam dan basa menurut Arrhenius, Bronsted-Lowry dan Lewis.',
    jenis: 'Materi 1',
  },
];

export const LembarScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<LembarScreenRouteProp>();
  const { jenis } = route.params.state;

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: 'Ya' | 'Tidak' | null;
  }>({});

  const handleSelection = (id: number, answer: 'Ya' | 'Tidak') => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [id]: prevState[id] === answer ? null : answer, // Toggle jika sudah dipilih
    }));
  };

  const handleSubmit = () => {
    const hasilJawaban = dataPernyataan.map((item) => ({
      id: item.id,
      pernyataan: item.pernyataan,
      jawaban: selectedAnswers[item.id] || 'Belum Dijawab',
    }));
  
    // Menampilkan jawaban dalam console
    console.log(hasilJawaban);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <Header
        TxtMiddle={'Lembar Refleksi'}
        ImgBack={() => <IconBackLeft />}
        onBackPress={() => navigation.goBack()}
      />
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

          {dataPernyataan.map((item, index) => (
            <>
              <View
                key={item.id}
                style={[
                  styles.contentBox1,
                  index === dataPernyataan.length - 1
                    ? { marginBottom: 10 }
                    : {},
                ]}
              >
                <View style={[styles.cell, { width: '10%' }]}>
                  <Text style={styles.cellText}>{index + 1}</Text>
                </View>
                <View
                  style={[
                    styles.cell,
                    { width: '60%', alignItems: 'flex-start', paddingLeft: 4 },
                  ]}
                >
                  <Text style={styles.cellText}>{item.pernyataan}</Text>
                </View>
                <View style={styles.cell}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          selectedAnswers[item.id] === 'Ya' ? 'green' : 'white',
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
              </View>
            </>
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
          <TouchableOpacity
            style={{
              backgroundColor: '#3DB2FF',
              padding: 15,
              borderRadius: 8,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ fontWeight: 'bold' }}>Tampilkan Jawaban</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
