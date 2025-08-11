import { View } from 'react-native';
import useTheme from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ThemedView = ({
  style,
  children,
  safe = false,
  ...props
}: {
  style: any;
  children: any;
  safe?: boolean;
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  if (!safe)
    return (
      <View style={[{ backgroundColor: theme.background }, style]} {...props}>
        {children}
      </View>
    );

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
};

export default ThemedView;
