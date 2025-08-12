import { StyleSheet, View } from 'react-native';
import useTheme from '../hooks/useTheme';
import { ReactNode } from 'react';

const ThemedCard = ({
  style,
  children,
  ...props
}: {
  style: any;
  children: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme.uiBackground }, styles.card, style]}
      {...props}>
      {children}
    </View>
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
