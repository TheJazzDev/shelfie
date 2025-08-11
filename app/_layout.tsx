import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useTheme from '../hooks/useTheme';

export default function RootLayout() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style='auto' />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
          headerTitleAlign: 'center',
        }}>
        {/* Individual Screens */}
        <Stack.Screen name='index' options={{ title: 'Home' }} />

        {/* Groups */}
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(dashboard)' options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
