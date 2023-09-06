import { useContext } from 'react';
import { AuthContext } from './jwt';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeDetails } from './theme-details';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { paths } from '../paths';
import { Issuer } from '../utils/auth';

export const useSettings = () => useContext(ThemeDetails);

export const useMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
};


export const useMockedUser = () => {
  return {
    id: '4krzadzl6pqo8jan04xh',
    avatar: '/assets/gatito-blanco.png',
    name: 'Gatito Blanco',
    email: 'gatito.blanco@test.test'
  };
};
export const tempAuth = () => useContext(AuthContext);

const loginPaths = {
  [Issuer.JWT]: paths.auth.jwt.login
};

export const GuestGuard = (props) => {
  const { children } = props;
  const { isAuthenticated } = tempAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(paths.dashboard.index);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

   useEffect(() => {
      check();
    }, []);

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated, issuer } = tempAuth();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({ returnTo: globalThis.location.href }).toString();
      const href = loginPaths[issuer] + `?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, issuer, router]);

   useEffect(() => {
      check();
    },
     []);

  if (!checked) {
    return null;
  }
  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export const withAuthGuard = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);

export const withGuestGuard = (Component) => (props) => (
  <GuestGuard>
    <Component {...props} />
  </GuestGuard>
);