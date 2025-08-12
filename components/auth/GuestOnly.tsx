import { useRouter } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import ThemedLoader from '../ThemedLoader';

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, authChecked } = useUser();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace('/profile');
    }
  }, [user, authChecked]);

  if (!authChecked || user) {
    return <ThemedLoader />;
  }

  return children;
};

export default GuestOnly;
