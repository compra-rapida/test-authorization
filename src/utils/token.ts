import { REFRESH_TOKEN_EXP_TIME_IN_DAYS, TOKEN_EXPIRATION_TIME_IN_SECONDS } from '../config/constants';

export const expireInToken = `${TOKEN_EXPIRATION_TIME_IN_SECONDS}s`;

export const refreshTokenExpireAt = () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXP_TIME_IN_DAYS);
  return expiresAt;
};

export const refreshTokenIsExpired = (expiresAt: Date) => {
  return Date.now() > expiresAt.getTime();
};