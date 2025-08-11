import { Text } from 'react-native';
import useTheme from '../hooks/useTheme';

const ThemedText = ({
  style,
  title = false,
  children,
  ...props
}: {
  style?: any;
  children: string
  title?: boolean;
}) => {
  const theme = useTheme();

  const textColor = title ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...props}>{children}</Text>
};

export default ThemedText;
