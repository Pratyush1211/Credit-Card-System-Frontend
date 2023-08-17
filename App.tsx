import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useCachedResources from './src/hooks/useCachedResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) return null;
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Navigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
