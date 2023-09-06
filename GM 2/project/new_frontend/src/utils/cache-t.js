import createCache from '@emotion/cache';

export const cacheT = () => {
  return createCache({ key: 'css' });
};
