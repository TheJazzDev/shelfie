import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Link } from 'expo-router';

import {
  Spacer,
  ThemedButton,
  ThemedText,
  ThemedView,
  ThemedTextInput,
} from '../../components';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Colors } from '../../constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useUser();

  const handleSubmit = async () => {
    login({ email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Login to Your Account
        </ThemedText>

        <ThemedTextInput
          value={email}
          placeholder='Email'
          onChangeText={setEmail}
          keyboardType='email-address'
          style={{ marginBottom: 20, width: '80%' }}
        />

        <ThemedTextInput
          secureTextEntry
          value={password}
          placeholder='Password'
          onChangeText={setPassword}
          style={{ marginBottom: 20, width: '80%' }}
        />

        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: '#f2f2f2' }}>Login</Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}
        <Spacer height={100} />

        <Link href='/register' replace>
          <ThemedText style={{ textAlign: 'center' }}>
            Register instead
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    margin: 10,
  },
});
