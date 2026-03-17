import { useInternetIdentity } from "./useInternetIdentity";

export function useAuth() {
  const {
    login,
    clear,
    identity,
    isInitializing,
    isLoggingIn,
    isLoginSuccess,
  } = useInternetIdentity();

  const isAuthenticated = isLoginSuccess && !!identity;
  const isLoading = isInitializing || isLoggingIn;

  return {
    login,
    logout: clear,
    isAuthenticated,
    isLoading,
    identity,
  };
}
