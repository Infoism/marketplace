export type packageTypes = 'app' | 'theme' | 'extension' | 'default';
export const PACKAGE_EMOJI: Record<packageTypes, string> = {
  app: '📦',
  theme: '👕',
  extension: '⚒️',
  default: '📦'
};

export type status = 'loading' | 'success' | 'error'
export const STATUS_COLOR: Record<status, string> = {
  loading: 'yellowBright',
  success: 'green',
  error: 'red'
}

export const IS_DEV = process.env['NODE_ENV'] === 'development'
