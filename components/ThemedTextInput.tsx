import { KeyboardTypeOptions, TextInput } from 'react-native';
import useTheme from '../hooks/useTheme';
import { Dispatch, SetStateAction } from 'react';

export default function ThemedTextInput({
  style,
  value,
  multiline,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  ...props
}: {
  style: any;
  value: string;
  multiline?: boolean;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: Dispatch<SetStateAction<string>>;
}) {
  const theme = useTheme();

  return (
    <TextInput
      value={value}
      multiline={multiline}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    />
  );
}
