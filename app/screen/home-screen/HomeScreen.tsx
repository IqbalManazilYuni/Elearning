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
import {
  IconCapaian,
  IconPengembang,
  IconGlora,
  IconHome,
  IconPetunjuk,
  Seperator,
  Seperator2,
  IconKataPengantar,
  IconMateri,
  IconExam,
  IconDaftarPustaka,
  IconPetaKonsep,
} from '../../assets/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/AppNavigator';

const { height } = Dimensions.get('window');

const items = [
  {
    title: 'Kata Pengantar',
    icon: <IconKataPengantar />,
    pdf: 'KataPengantar.pdf',
  },
  {
    title: 'Capaian',
    icon: <IconCapaian />,
    pdf: 'Capaian.pdf',
  },
  {
    title: 'Petunjuk',
    icon: <IconPetunjuk />,
    pdf: 'Petunjukmodul.pdf',
  },
  {
    title: 'Materi 1',
    code: 'materi1',
    icon: <IconMateri />,
  },
  // {
  //   title: 'Materi 2',
  //   code: 'materi2',
  //   icon: <IconMateri />,
  // },
  // {
  //   title: 'Materi 3',
  //   code: 'materi3',
  //   icon: <IconMateri />,
  // },
  {
    title: 'Evaluasi',
    eval: 'Evaluasi',
    icon: <IconExam />,
  },
  {
    title: 'Glosarium',
    icon: <IconGlora />,
    pdf: 'Glosarium.pdf',
  },
  {
    title: 'Daftar Pustaka',
    icon: <IconDaftarPustaka />,
    pdf: 'DaftarPustaka.pdf',
  },
  {
    title: 'Peta Konsep',
    icon: <IconPetaKonsep />,
    pdf: 'PetaKonsep.pdf',
  },
  {
    title: 'Profile',
    icon: <IconPengembang />,
    pdf: 'ProfilPengembang.pdf',
  },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePreviewNavigasi = (
    item: string,
    pdf: string,
    code?: string,
    evaluation?: string
  ) => {
    if (code) {
      navigation.navigate('Materi', {
        state: {
          item: item,
          code: code,
        },
      });
    } else if (evaluation) {
      navigation.navigate('Evaluasi', {
        state: {
          item: item,
          evaluation: evaluation,
        },
      });
    } else {
      navigation.navigate('Preview', {
        state: {
          item: item,
          pdf: pdf,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <View
        style={{
          backgroundColor: '#3DB2FF',
          flexDirection: 'row',
          height: '25%',
          width: '100%',
        }}
      >
        <View
          style={{
            width: '50%',
            justifyContent: 'flex-end',
            bottom: height * 0.02,
            left: height * 0.02,
          }}
        >
          <Text
            style={{
              fontFamily: 'lexend',
              color: 'white',
              fontWeight: 'bold',
              fontSize: height * 0.028,
            }}
          >
            Hi, Welcome Back
          </Text>
          <Text
            style={{
              fontFamily: 'lexend',
              color: 'white',
              fontSize: height * 0.02,
              textAlign: 'left',
            }}
          >
            Unravel the mystery of elements and compounds, lets learn the
            language of chemistry!
          </Text>
        </View>
        <View
          style={{
            width: '50%',
          }}
        >
          <View style={{ position: 'absolute', right: 0, bottom: 10 }}>
            <IconHome />
          </View>
        </View>
      </View>
      <View style={styles.content2}>
        <View style={styles.childContent1}>
          <Seperator2 />
        </View>
        <View style={{ margin: 10 }}>
          <Text
            style={{
              fontFamily: 'lexend',
              fontWeight: 'black',
              fontSize: height * 0.024,
            }}
          >
            {' '}
            Menu Aplikasi{' '}
          </Text>
        </View>
        <ScrollView
          style={styles.childContent2}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerMenu}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.box}
                onPress={() =>
                  handlePreviewNavigasi(item.title, item.pdf, item.code, item.eval)
                }
              >
                {item.icon}
                <Text style={{ fontFamily: 'lexend', textAlign: 'center' }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DB2FF',
    flexDirection: 'column',
  },
  content2: {
    height: '75%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flexDirection: 'column',
  },
  childContent1: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childContent2: {
    flex: 1, // Agar ScrollView menggunakan ruang yang tersedia
    marginHorizontal: 10,
  },
  scrollContent: {
    flexGrow: 1, // Agar konten ScrollView dapat digulir
    paddingBottom: 20, // Memberikan ruang di bawah konten
  },
  containerMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: 110,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 20,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  boxChild1: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  boxChild2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDescriptionContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  boxTitle: {
    fontFamily: 'lexend',
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.03,
  },
  boxDescription: {
    fontFamily: 'lexend',
    color: 'white',
    fontSize: height * 0.016,
  },
});
