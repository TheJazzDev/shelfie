import { ActivityIndicator } from 'react-native';

import ThemedView from './ThemedView';
import useTheme from '../hooks/useTheme';

const ThemedLoader = () => {
  const theme = useTheme();

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size='large' color={theme.text} />
    </ThemedView>
  );
};

export default ThemedLoader;
