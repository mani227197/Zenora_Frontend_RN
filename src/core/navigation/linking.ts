import type {AppConfig} from '../config';

export function createLinkingConfig(config: AppConfig) {
  return {
    prefixes: config.deepLinkPrefixes,
    config: {
      screens: {
        Auth: 'auth',
        Dashboard: 'dashboard',
        Habits: {
          path: 'habits/:habitId?',
          parse: {habitId: String},
        },
        Obligations: {
          path: 'obligations/:obligationId?',
          parse: {obligationId: String},
        },
        Profile: 'profile',
      },
    },
  };
}
