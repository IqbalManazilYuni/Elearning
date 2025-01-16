import React, { useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/header/Hearder';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/AppNavigator';
import { IconBackLeft } from '../../assets/images';
import PDFReader from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';

const { width, height } = Dimensions.get('window');

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

export const PreviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PreviewScreenRouteProp>();
  const { item, pdf } = route.params.state;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <Header
        TxtMiddle={item}
        ImgBack={() => <IconBackLeft />}
        onBackPress={() => navigation.goBack()}
      />
      <PDFReader source={{ uri: `bundle-assets://pdf/${pdf}` }} style={styles.pdf} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor:"white"
  },
});
