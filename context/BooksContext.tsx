import { createContext, useState, useContext, useEffect } from 'react';
import { client, databases } from '../lib/appwrite';
import { ID, Permission, Role, Models, Query } from 'react-native-appwrite';
import { useUser } from './UserContext';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_BOOKS_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_BOOKS_COLLECTION_ID!;

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

export function BooksProvider({ children }: BooksProviderProps) {
  const [error, setError] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const { user } = useUser();

  async function fetchBooks(): Promise<void> {
    if (!user) return;

    try {
      const response = await databases.listDocuments<Book>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('userId', user.$id)]
      );

      setBooks(response.documents);
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function fetchBookById(id: string): Promise<Book> {
    try {
      const response = await databases.getDocument<Book>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );

      return response;
    } catch (error: any) {
      setError(error.message);
      throw new Error(error.message);
    }
  }

  async function createBook(
    data: Omit<Book, keyof Models.Document>
  ): Promise<boolean> {
    if (!user) return false;

    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  }

  async function deleteBook(id: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (error: any) {
      setError(error.message);
    }
  }

  useEffect(() => {
    let unsubscribe: () => void;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe<Book>(channel, (response) => {
        const { payload, events } = response;

        if (events[0].includes('create')) {
          setBooks((prevBooks) => [...prevBooks, payload]);
        }

        if (events[0].includes('delete')) {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.$id !== payload.$id)
          );
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        deleteBook,
        error,
      }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks(): BooksContextType {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }

  return context;
}
