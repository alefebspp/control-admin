'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import {
  AuthContextInitialValue,
  AuthContextProps,
  LoginRequest,
  LoginResponse,
  User
} from './interface';
import { api } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<AuthContextInitialValue>(
  {} as AuthContextInitialValue
);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | undefined>();
  const router = useRouter();
  const { toast } = useToast();

  const setUserAndApiToken = (
    user: User | undefined,
    token: string | undefined
  ) => {
    setUser(user);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  async function signIn({ email, password }: LoginRequest) {
    try {
      const response = await fetch(`http://localhost:3002/api/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.statusCode == 404) {
        toast({
          title: data.message,
          description: 'Por favor, tente novamente.',
          variant: 'destructive'
        });
      }

      if (data.access_token && data.user) {
        setUserAndApiToken(data.user, data.access_token);
        setCookie(undefined, '@control-token', data.access_token, {
          maxAge: 60 * 60 * 24 * 2
        });
        router.push('/dashboard');
      }
    } catch (error) {
      throw error;
    }
  }

  function signOut() {
    setUser(undefined);
    destroyCookie(undefined, '@control-token');
    router.push('/login');
  }

  useEffect(() => {
    const { '@control-token': token } = parseCookies();
    if (token) {
      const persistLogin = async () => {
        const { data } = await api.get<User>('auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (data) {
          setUserAndApiToken(data, token);
        }
      };
      persistLogin();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
