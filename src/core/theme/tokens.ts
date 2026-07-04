export const colorTokens = {
  background: '#F7F7F2',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF3F0',
  textPrimary: '#17211B',
  textSecondary: '#607064',
  border: '#D9E2DC',
  primary: '#2F6F5E',
  primaryPressed: '#24584B',
  accent: '#E5B454',
  danger: '#B84A4A',
  success: '#2E7D5B',
} as const;

export const typographyTokens = {
  display: {fontSize: 34, lineHeight: 40, fontWeight: '700' as const},
  title: {fontSize: 22, lineHeight: 28, fontWeight: '700' as const},
  subtitle: {fontSize: 17, lineHeight: 24, fontWeight: '600' as const},
  body: {fontSize: 15, lineHeight: 22, fontWeight: '400' as const},
  caption: {fontSize: 12, lineHeight: 16, fontWeight: '500' as const},
} as const;

export const spacingTokens = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const radiusTokens = {
  sm: 6,
  md: 8,
  lg: 14,
  pill: 999,
} as const;

export const elevationTokens = {
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
  card: {
    shadowColor: '#17211B',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
} as const;

export const animationTokens = {
  fastMs: 160,
  normalMs: 240,
  slowMs: 360,
} as const;

export const opacityTokens = {
  disabled: 0.48,
  pressed: 0.72,
  overlay: 0.64,
} as const;
