import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from './utils/jwt';

const users = [
  {
    id: '4krzadzl6pqo8jan04xh',
    avatar: '/assets/gatito-blanco.png',
    email: 'gatito@blanco.lt',
    name: 'test',
    password: 'secure123.',
  }
];

const wait = (time) => new Promise((res) => setTimeout(res, time));

class AuthApi {
  async signIn(request) {
    const { email, password } = request;

    await wait(500);

    return new Promise((resolve, reject) => {
      try {
        const user = users.find((user) => user.email === email);

        if (!user || (user.password !== password)) {
          reject(new Error('Please check your email and password'));
          return;
        }

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(request) {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        const { userId } = decode(accessToken);
        const user = users.find((user) => user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          plan: user.plan
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
