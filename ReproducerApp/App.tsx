/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect } from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Verified valid base64 PNG:
const BASE64_PNG =
  'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

function DataUriGetSizeRepro() {
  useEffect(() => {
    Image.getSize(
      `data:image/png;base64,${BASE64_PNG}`,
      (width, height) => {
        Alert.alert('success', `${width}x${height}`);
      },
      error => {
        Alert.alert('getSize error', String(error));
      },
    );
  }, []);

  return (
    <View style={styles.repro}>
      {/* Confirms the same data: URI renders fine with <Image>, isolating the
          bug to Image.getSize() / getSizeWithHeaders() specifically. */}
      <Image
        source={{ uri: `data:image/png;base64,${BASE64_PNG}` }}
        style={styles.reproImage}
        resizeMode="contain"
      />
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <DataUriGetSizeRepro />
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  repro: {
    padding: 16,
    backgroundColor: '#fff3cd',
    alignItems: 'center',
  },
  reproImage: {
    width: 51,
    height: 51,
    backgroundColor: '#eee',
  },
});

export default App;
