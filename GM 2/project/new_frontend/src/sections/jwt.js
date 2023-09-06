import { createContext } from 'react';
import PropTypes from 'prop-types';
import { Issuer } from '../utils/auth';


const initialState = {
  isAuthenticated: true,
  isInitialized: true,
  user: null
};

export const AuthContext = createContext({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;

  return (
    <AuthContext.Provider
      value={{
        ...initialState,
        issuer: Issuer.JWT,
        signIn: () => Promise.resolve(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
