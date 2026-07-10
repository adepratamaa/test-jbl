// allowed environment variable names used by the test config
type EnvKey =
  | 'BASE_URL'
  | 'PASSWORD'
  | 'STANDARD_USERNAME'
  | 'STANDARD_PASSWORD'
  | 'INVALID_USERNAME'
  | 'INVALID_PASSWORD';

// read a required environment variable
export function getEnv(key: EnvKey) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}
