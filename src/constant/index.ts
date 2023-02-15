export const packageTypes = ['app', 'theme', 'extension', 'default'] as const;
export type packageTypesUnion = (typeof packageTypes)[number];
export const PACKAGE_EMOJI: Record<packageTypesUnion, string> = {
  app: '📦',
  theme: '👕',
  extension: '⚒️',
  default: '📦',
};

export type status = 'loading' | 'success' | 'error';
export const STATUS_COLOR: Record<status, string> = {
  loading: 'yellowBright',
  success: 'green',
  error: 'red',
};

export const IS_DEV = process.env['NODE_ENV'] === 'development';
