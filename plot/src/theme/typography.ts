import type { TextStyle } from 'react-native';

export const fonts = {
  /** Solo para el logotipo PLOT. */
  brand: 'BricolageGrotesque_800ExtraBold',
  /** Titulares: Unbounded, ancha y contundente como el logotipo. */
  display: 'Unbounded_800ExtraBold',
  /** Carteles enormes (bienvenida). */
  poster: 'Unbounded_900Black',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const type = {
  largeTitle: { fontFamily: fonts.display, fontSize: 30, lineHeight: 34, letterSpacing: -0.8 },
  title1: { fontFamily: fonts.display, fontSize: 23, lineHeight: 27, letterSpacing: -0.6 },
  title2: { fontFamily: fonts.display, fontSize: 17, lineHeight: 22, letterSpacing: -0.3 },
  headline: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 24 },
  subhead: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 20 },
  subheadStrong: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20 },
  footnote: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  footnoteStrong: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 14, letterSpacing: 1.2 },
  /** Logotipo. */
  brand: { fontFamily: fonts.brand, fontSize: 22, lineHeight: 26, letterSpacing: 1 },
} satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;
