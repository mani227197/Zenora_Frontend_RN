import type {AppConfig} from '../config';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type Logger = {
  debug(message: string, metadata?: Record<string, unknown>): void;
  info(message: string, metadata?: Record<string, unknown>): void;
  warn(message: string, metadata?: Record<string, unknown>): void;
  error(message: string, metadata?: Record<string, unknown>): void;
};

export function createConsoleLogger(config: AppConfig): Logger {
  const shouldLogDebug =
    config.environment !== 'production' ||
    config.featureFlagOverrides.verboseNetworkLogging === true;

  function write(
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
  ) {
    if (level === 'debug' && !shouldLogDebug) {
      return;
    }

    const payload = metadata ? [message, metadata] : [message];

    if (level === 'error') {
      console.error(...payload);
      return;
    }

    if (level === 'warn') {
      console.warn(...payload);
      return;
    }

    console.log(...payload);
  }

  return {
    debug: (message, metadata) => write('debug', message, metadata),
    info: (message, metadata) => write('info', message, metadata),
    warn: (message, metadata) => write('warn', message, metadata),
    error: (message, metadata) => write('error', message, metadata),
  };
}
