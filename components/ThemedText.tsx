import { Text } from 'react-native';
import useTheme from '../hooks/useTheme';
import { ReactNode } from 'react';

const ThemedText = ({
  style,
  title = false,
  children,
  ...props
}: {
  style?: any;
  title?: boolean;
  children: ReactNode;
}) => {
  const theme = useTheme();

  const textColor = title ? theme.title : theme.text;

  return (
    <Text style={[{ color: textColor }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
