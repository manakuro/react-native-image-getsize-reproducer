/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  Alert,
  Button,
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
  const handlePress = () => {
    Image.getSize(
      `data:image/png;base64,${BASE64_PNG}`,
      (width, height) => {
        Alert.alert('success', `${width}x${height}`);
      },
      error => {
        Alert.alert('getSize error', String(error));
      },
    );
  }

  return (
    <View style={styles.repro}>
      <Image
        source={{ uri: `data:image/png;base64,${BASE64_PNG}` }}
        style={styles.reproImage}
        resizeMode="contain"
      />
      <View>
        <Button title="getSize" onPress={handlePress} />
      </View>
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
    <View style={[styles.container, { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
      <DataUriGetSizeRepro />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  repro: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    flex: 1,
  },
  reproImage: {
    width: 51,
    height: 51,
    backgroundColor: '#eee',
  },
});

export default App;
