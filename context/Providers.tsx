import { ReactNode } from 'react';
import { BooksProvider } from './BooksContext';
import { UserProvider } from './UserContext';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <BooksProvider>{children}</BooksProvider>
    </UserProvider>
  );
};

export default Provider;
