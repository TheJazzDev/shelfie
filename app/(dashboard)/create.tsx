import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Spacer,
  ThemedButton,
  ThemedTexted,
  ThemedTextInput,
  ThemedView,
} from '../../components';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useBooks } from '../../context/BooksContext';
import { Colors } from '../../constants';

const Create = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const router = useRouter();
  const { error, createBook } = useBooks();

  async function handleSubmit() {
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setLoading(true);

    const res = await createBook({ title, author, description });

    if (res) {
      setTitle('');
      setAuthor('');
      setDescription('');

      router.replace('/books');
    }

    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe={true} style={styles.container}>
        <ThemedTexted title={true} style={styles.heading}>
          Add a New Book
        </ThemedTexted>
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder='Book Title'
          value={title}
          onChangeText={setTitle}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder='Author'
          value={author}
          onChangeText={setAuthor}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder='Book Description'
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: '#fff' }}>
            {loading ? 'Saving...' : 'Create Book'}
          </Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}
        <Spacer height={100} />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: 'stretch',
    marginHorizontal: 40,
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
