import { SvgIcon } from '@mui/material';
import CryptoIcon from '../../nav-icons/crypto';
import AccountIcon from '../../nav-icons/account';
import AuthIcon from '../../nav-icons/auth';
import ChatIcon from '../../nav-icons/chat';
import { paths } from '../../paths';

export const getSections = (t) => [
  {
    items: [
      {
        title: 'Dashboard',
        path: paths.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <CryptoIcon />
           </SvgIcon>
         )
      },
      {
        title: 'Account',
        path: paths.dashboard.account,
        icon: (
          <SvgIcon fontSize="small">
            <AccountIcon />
          </SvgIcon>
        )
      }

    ]
  },
  {
    items: [
      {
        title: 'Chat',
        path: paths.dashboard.chat,
        icon: (
          <SvgIcon fontSize="small">
            <ChatIcon />
          </SvgIcon>
        )
      },
    ]
  },
  {

    items: [
      {
        title: 'Auth',
        icon: (
          <SvgIcon fontSize="small">
            <AuthIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: 'Login',
            path: paths.authDemo.login.modern
          },
          {
            title: 'Register',
            path: paths.authDemo.register.modern
              },
          {
            title: 'Forgot Password',
            path: paths.authDemo.forgotPassword.modern
              },
          {
            title: 'Reset Password',
            path: paths.authDemo.resetPassword.modern
          },
        ]
      },
    ]
  },
];
