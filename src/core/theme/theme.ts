import {
  animationTokens,
  colorTokens,
  elevationTokens,
  opacityTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
} from './tokens';

export const theme = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  elevation: elevationTokens,
  animation: animationTokens,
  opacity: opacityTokens,
} as const;

export type AppTheme = typeof theme;
