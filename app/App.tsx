import { View, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';

const { width } = Dimensions.get('window');

const App = () => {
  const handleStateChange = (state: any) => {
    const route = state.routes[state.index];
    const currentScreen = route.name;
    console.log('Current Screen:', currentScreen);
  };

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 816,
    alignSelf: 'center', // Memastikan tampilan berada di tengah
    // paddingHorizontal: 16, // Tambahkan padding untuk memberikan jarak dari sisi layar
  },
});

export default App;
