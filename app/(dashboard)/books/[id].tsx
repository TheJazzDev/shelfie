import { StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ThemedView,
  ThemedText,
  ThemedLoader,
  ThemedCard,
  Spacer,
  ThemedButton,
} from '../../../components';
import { useEffect, useState } from 'react';
import { useBooks } from '../../../context/BooksContext';
import { Colors } from '../../../constants';

const BookDetails = () => {
  const [book, setBook] = useState<Book | null>(null);

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { deleteBook, fetchBookById } = useBooks();

  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBookById(String(id));
      setBook(bookData);
    }

    loadBook();
  }, [id]);

  const handleDelete = async () => {
    await deleteBook(String(id));
    setBook(null);
    router.replace('/books');
  };

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText>Written by {book.author}</ThemedText>
        <Spacer />

        <ThemedText title={true}>Book description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>

      <ThemedButton onPress={handleDelete} style={styles.delete}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Book</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: 'center',
  },
});
