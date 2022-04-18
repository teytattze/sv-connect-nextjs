import { createContext, useState, useEffect, useContext } from 'react';
import { IAccount } from '../../shared/interfaces/accounts.interface';
import { Nullable } from '../../shared/types/common.type';
import { useValidateJwt } from './auth.query';

export interface IAuthContextValue {
  account: Nullable<IAccount>;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContextValue>({
  account: null,
  isLoading: true,
});

AuthContext.displayName = 'AuthContext';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const auth = useAuthProvider();
  if (auth.isLoading) return null;
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthProvider = () => {
  const [account, setAccount] = useState<Nullable<IAccount>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { mutate: validateJwt } = useValidateJwt({
    onError: () => setAccount(null),
    onSuccess: ({ data }) => setAccount(data),
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    const handleValidateJwt = async () => {
      await validateJwt();
    };
    handleValidateJwt();
  }, []);

  return { account, isLoading };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
