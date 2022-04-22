import { createContext, useState, useEffect, useContext } from 'react';
import cookies from 'js-cookie';
import { IAccount } from 'src/shared/interfaces/accounts.interface';
import { Nullable } from 'src/shared/types/common.type';
import { useValidateJwt } from './auth.query';
import { getAccountCookie } from 'src/lib/cookie.lib';

export interface IAuthContextValue {
  account: Nullable<IAccount>;
  isLoading: boolean;
  revalidateAccount: () => void;
}

export const AuthContext = createContext<IAuthContextValue>({
  account: null,
  isLoading: true,
  revalidateAccount: () => {},
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
  const [account, setAccount] = useState<Nullable<IAccount>>(() =>
    getAccountCookie()
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { mutate: validateJwt } = useValidateJwt({
    onError: () => setAccount(null),
    onSuccess: ({ data }) => setAccount(data),
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    const handleValidateJwt = async () => {
      setIsLoading(true);
      await validateJwt();
    };
    handleValidateJwt();
  }, []);

  const revalidateAccount = () => {
    setAccount(getAccountCookie());
  };

  return { account, isLoading, revalidateAccount };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
