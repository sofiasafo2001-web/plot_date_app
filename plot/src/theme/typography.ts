import { Platform, type TextStyle } from 'react-native';

/**
 * Helvetica, la tipografía de la interfaz según el manual de marca (Bold y Regular).
 * Es una fuente de sistema: en iPhone se usa Helvetica Neue, en la web Helvetica Neue /
 * Helvetica / Arial y en Android la sans-serif del sistema (Android no trae Helvetica).
 * Cubao Wide queda solo para el logotipo, que se usa como imagen.
 */
const family = Platform.select({
  ios: 'Helvetica Neue',
  android: 'sans-serif',
  default: '"Helvetica Neue", Helvetica, Arial, sans-serif',
}) as string;

/** Familia y peso juntos: Helvetica funciona con fontWeight, no con un archivo por peso. */
export const font = {
  regular: { fontFamily: family, fontWeight: '400' },
  medium: { fontFamily: family, fontWeight: '500' },
  bold: { fontFamily: family, fontWeight: '700' },
} as const satisfies Record<string, TextStyle>;

/** Compatibilidad: nombre de familia (el peso va en `font` o en la escala). */
export const fonts = {
  brand: family,
  display: family,
  poster: family,
  regular: family,
  medium: family,
  semibold: family,
  bold: family,
} as const;

/**
 * Escala tipográfica. Titulares en Bold con el interletraje apretado del manual,
 * texto en Regular y etiquetas en Bold, mayúsculas y espaciado 0,12 em.
 */
export const type = {
  largeTitle: { ...font.bold, fontSize: 36, lineHeight: 40, letterSpacing: -1.4 },
  title1: { ...font.bold, fontSize: 26, lineHeight: 30, letterSpacing: -0.9 },
  title2: { ...font.bold, fontSize: 19, lineHeight: 24, letterSpacing: -0.5 },
  button: { ...font.bold, fontSize: 16, lineHeight: 21, letterSpacing: -0.2 },
  headline: { ...font.bold, fontSize: 17, lineHeight: 22, letterSpacing: -0.3 },
  body: { ...font.regular, fontSize: 17, lineHeight: 24, letterSpacing: -0.2 },
  subhead: { ...font.regular, fontSize: 15, lineHeight: 20, letterSpacing: -0.1 },
  subheadStrong: { ...font.bold, fontSize: 15, lineHeight: 20, letterSpacing: -0.1 },
  footnote: { ...font.regular, fontSize: 13, lineHeight: 18 },
  footnoteStrong: { ...font.bold, fontSize: 13, lineHeight: 18 },
  /** Etiqueta: 11 px, Bold, mayúsculas, espaciado 0,12 em. */
  caption: { ...font.bold, fontSize: 11, lineHeight: 14, letterSpacing: 1.3 },
  /** Logotipo en texto (si no se usa la imagen). */
  brand: { ...font.bold, fontSize: 22, lineHeight: 26, letterSpacing: 1 },
} satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;
