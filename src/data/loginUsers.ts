import { getEnv } from '../config/env';

export type LoginUser = {
  label: string;
  username: string;
  password: string;
};

export const loginUsers: LoginUser[] = [
  {
    label: 'standard_user',
    username: getEnv('STANDARD_USERNAME'),
    password: getEnv('STANDARD_PASSWORD'),
  },
  {
    label: 'invalid_user',
    username: getEnv('INVALID_USERNAME'),
    password: getEnv('INVALID_PASSWORD'),
  },
];
