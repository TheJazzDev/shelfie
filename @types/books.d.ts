import { Models } from 'react-native-appwrite';

declare global {
  interface BooksProviderProps {
    children: ReactNode;
  }

  interface Book extends Models.Document {
    title: string;
    author: string;
    description: string;
  }

  interface BooksContextType {
    error: string;
    books: Book[];
    fetchBooks: () => Promise<void>;
    fetchBookById: (id: string) => Promise<Book>;
    createBook: (data: Omit<Book, keyof Models.Document>) => Promise<void>;
    deleteBook: (id: string) => Promise<void>;
  }
}

export {};
