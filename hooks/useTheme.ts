import { useColorScheme } from 'react-native';
import { Colors } from '../constants';

const useTheme = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return theme;
};

export default useTheme;
