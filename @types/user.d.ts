declare global {
  interface UserProviderProps {
    children: ReactNode;
  }

  interface User {
    $createdAt: string;
    $id: string;
    $updatedAt: string;
    accessedAt: string;
    email: string;
    emailVerification: boolean;
    labels: string[];
    mfa: boolean;
    name: string;
    passwordUpdate: string;
    phone: string;
    phoneVerification: boolean;
    prefs: Record<string, unknown>;
    registration: string;
    status: boolean;
    targets: any[];
  }

  interface UserContextType {
    error: string;
    user: User | null;
    authChecked: boolean;

    login: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => Promise<void>;

    register: ({
      userName,
      email,
      password,
    }: {
      userName: string;
      email: string;
      password: string;
    }) => Promise<void>;

    logout: () => Promise<void>;
  }
}

export {};
