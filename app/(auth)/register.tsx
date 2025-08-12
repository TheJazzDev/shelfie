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
  ThemedTextInput,
  ThemedView,
} from '../../components';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Colors } from '../../constants';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const { error, register } = useUser();

  const handleSubmit = async () => {
    register({ userName, email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Register an Account
        </ThemedText>

        <Spacer />
        <ThemedTextInput
          value={userName}
          placeholder='User name'
          onChangeText={setUserName}
          style={{ marginBottom: 20, width: '80%' }}
        />

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
          <Text style={{ color: '#f2f2f2' }}>Register</Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}
        <Spacer height={100} />

        <Link href='/login' replace>
          <ThemedText style={{ textAlign: 'center' }}>Login instead</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
