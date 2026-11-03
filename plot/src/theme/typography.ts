import type { TextStyle } from 'react-native';

export const fonts = {
  /** Solo para el logotipo PLOT (si no se usa la imagen). */
  brand: 'Archivo_900Black',
  /** Titulares: Archivo ExtraBold, ancho normal. */
  display: 'Archivo_800ExtraBold',
  poster: 'Archivo_900Black',
  regular: 'Archivo_400Regular',
  medium: 'Archivo_500Medium',
  semibold: 'Archivo_600SemiBold',
  bold: 'Archivo_700Bold',
} as const;

export const type = {
  largeTitle: { fontFamily: fonts.display, fontSize: 36, lineHeight: 40, letterSpacing: -1.2 },
  title1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 30, letterSpacing: -0.8 },
  title2: { fontFamily: fonts.display, fontSize: 19, lineHeight: 24, letterSpacing: -0.4 },
  button: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 21 },
  headline: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 24 },
  subhead: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 20 },
  subheadStrong: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20 },
  footnote: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  footnoteStrong: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18 },
  /** Etiqueta: 11 px, mayúsculas, espaciado 0,12 em. */
  caption: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 14, letterSpacing: 1.3 },
  /** Logotipo. */
  brand: { fontFamily: fonts.brand, fontSize: 22, lineHeight: 26, letterSpacing: 1 },
} satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;
