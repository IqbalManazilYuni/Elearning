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
  IconExam,
  IconGlora,
  IconGoals,
  IconHome,
  Seperator,
  Seperator2,
} from '../../assets/images';

const { height } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
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
        <View style={styles.childContent2}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={{ margin: 10 }}
          >
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.box}>
                <View style={styles.boxChild1}>
                  <Text
                    style={{
                      fontFamily: 'lexend',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: height * 0.03,
                    }}
                  >
                    Glosarium
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'lexend',
                      color: 'white',
                      fontSize: height * 0.016,
                    }}
                  >
                    Istilah Asam Basa
                  </Text>
                </View>
                <View style={styles.boxChild2}>
                  <IconGlora />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <View style={styles.boxChild1}>
                  <Text
                    style={{
                      fontFamily: 'lexend',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: height * 0.03,
                    }}
                  >
                    Capaian
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'lexend',
                      color: 'white',
                      fontSize: height * 0.016,
                    }}
                  >
                    Pencapaian Pembelajaran
                  </Text>
                </View>
                <View style={styles.boxChild2}>
                  <IconGoals />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box}>
                <View style={styles.boxChild1}>
                  <Text
                    style={{
                      fontFamily: 'lexend',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: height * 0.03,
                    }}
                  >
                    Evaluasi
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'lexend',
                      color: 'white',
                      fontSize: height * 0.016,
                    }}
                  >
                    Evaluasi Pembelajaran
                  </Text>
                </View>
                <View style={styles.boxChild2}>
                  <IconExam />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
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
    height: '25%',
    width: '100%',
  },
  box: {
    width: height * 0.25,
    height: height * 0.12,
    backgroundColor: '#27AE60',
    borderRadius: 16,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  boxChild1: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxChild2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
