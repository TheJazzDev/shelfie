import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

function ThemedButton({
  onPress,
  style,
  ...props
}: {
  style?: any;
  children: any;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default ThemedButton;
