import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { ReactNode } from 'react';

function ThemedButton({
  style,
  onPress,
  children,
  disabled,
  ...props
}: {
  style?: any;
  disabled?: boolean;
  children: ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}>
      {children}
    </Pressable>
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
