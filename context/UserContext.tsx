import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'react-native-appwrite';

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: UserProviderProps) {
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }, [error]);

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      await account.createEmailPasswordSession(email, password);

      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error: any) {
      setError(error?.message);
    }
  }

  async function register({
    userName,
    email,
    password,
  }: {
    userName: string;
    email: string;
    password: string;
  }): Promise<void> {
    try {
      await account.create(ID.unique(), email, password, userName);
      await login({ email, password });
    } catch (error: any) {
      setError(error?.message);
    }
  }

  async function logout(): Promise<void> {
    await account.deleteSession('current');
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const res = await account.get();
      setUser(res);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        error,
        logout,
        register,
        authChecked,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
