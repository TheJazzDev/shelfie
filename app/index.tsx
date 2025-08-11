import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Spacer, ThemedLogo, ThemedText, ThemedView } from '../components';

const Home = () => {
  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedLogo />
      <Spacer />

      <ThemedText style={styles.title} title={true}>
        The Number 1
      </ThemedText>

      <ThemedText style={{ marginTop: 10, marginBottom: 30 }}>
        Reading List App
      </ThemedText>

      <Link href='/login' asChild>
        <Pressable style={styles.link}>
          <ThemedText>Login Page</ThemedText>
        </Pressable>
      </Link>

      <Link href='/register' asChild>
        <Pressable style={styles.link}>
          <ThemedText>Register Page</ThemedText>
        </Pressable>
      </Link>

      <Link href='/profile' asChild>
        <Pressable style={styles.link}>
          <ThemedText>Profile page</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
