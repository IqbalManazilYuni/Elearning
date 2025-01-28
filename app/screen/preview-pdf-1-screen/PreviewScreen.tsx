import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

export const PreviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PreviewScreenRouteProp>();
  const { item, pdf } = route.params.state;

  const [loading, setLoading] = useState<boolean>(true);
  const [filePath, setFilePath] = useState('');

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
    setLoading(true);
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
          setLoading(false);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    downloadFile(pdf);
    console.log(filePath);
  }, [pdf]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3DB2FF'} barStyle="light-content" />
      <Header
        TxtMiddle={item}
        ImgBack={() => <IconBackLeft />}
        onBackPress={() => navigation.goBack()}
      />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
        </View>
      )}
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
    backgroundColor: 'white',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
