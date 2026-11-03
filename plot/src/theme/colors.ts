/**
 * Paleta de marca PLOT.
 *
 * - Rojo #E0070F: la acción principal (botones, pestaña activa, cursor). Texto blanco encima.
 * - Rosa claro #FFB7EF: segundo color de marca en superficie (burbujas propias, seleccionados,
 *   bienvenida). Texto negro o rojo oscuro encima.
 * - Rosa fuerte #FF4987: todo lo que tiene carga de ligoteo (flirt, corazón, avisos de mensajes).
 * - Azul #0043D8: confianza e información (enlaces, verificado, seguridad). Se usa poco.
 * - Crema #F9F3DB: el «gris» de la app. Fondos de tarjetas, campos, hojas. Nunca como borde fino.
 * - Acentos lima, amarillo y celeste: solo como color de categoría, siempre con texto negro.
 */
export const brand = {
  red: '#E0070F',
  pink: '#FFB7EF',
  hotPink: '#FF4987',
  blue: '#0043D8',
  lime: '#D5E400',
  cream: '#F9F3DB',
  yellow: '#FFD900',
  sky: '#9CDCF8',
} as const;

export const colors = {
  ink: '#121110',
  text2: '#4B4740',
  text3: '#6E6A60',
  line: '#E4DDC8',
  surface: brand.cream,
  bg: '#FFFFFF',
  white: '#FFFFFF',

  /** Acción principal. */
  primary: brand.red,
  /** Rojo oscuro para texto sobre blanco o rosa (4,6:1 sobre rosa). */
  primaryInk: '#B0000A',
  /** Rosa de marca: seleccionados, burbujas propias, bienvenida. */
  pink: brand.pink,
  /** Rosa muy suave para bloques informativos grandes. */
  primarySoft: '#FFE8F8',

  /** Ligoteo: flirt, corazón, avisos de mensajes nuevos. */
  flirt: brand.hotPink,
  flirtSoft: '#FFE1EB',
  flirtInk: '#B0003C',

  /** Confianza e información: enlaces, verificado, seguridad. */
  info: brand.blue,
  infoSoft: '#E6EDFC',

  danger: '#C4000B',
  dangerSoft: '#FFE5E6',
  dangerInk: '#A3000A',
  success: '#5C6200',
  successSoft: '#F4F7C2',

  /** Velo oscuro para fondos de hojas y modales. */
  scrim: 'rgba(18, 17, 16, 0.45)',
  /** Texto secundario sobre fondos oscuros o de color. */
  onPrimaryMuted: 'rgba(18, 17, 16, 0.62)',
  /** Fondo de botones circulares sobre portadas de color. */
  glass: 'rgba(255, 255, 255, 0.78)',
  transparent: 'transparent',
} as const;

export type CategoryId = 'music' | 'sport' | 'food' | 'places' | 'culture';

export type CategoryPalette = { solid: string; soft: string; ink: string; label: string };

/** Colores de categoría: el sólido siempre lleva texto negro; el ink es para texto sobre el suave o el blanco. */
export const categories: Record<CategoryId, CategoryPalette> = {
  music: { solid: brand.hotPink, soft: '#FFE1EB', ink: '#B0003C', label: 'Música' },
  sport: { solid: brand.lime, soft: '#F4F7C2', ink: '#5C6200', label: 'Deporte' },
  food: { solid: brand.yellow, soft: '#FFF6C2', ink: '#6B5A00', label: 'Restaurantes' },
  places: { solid: brand.sky, soft: '#E3F4FC', ink: '#00587F', label: 'Lugares' },
  culture: { solid: brand.pink, soft: '#FFEAF9', ink: '#8A1673', label: 'Cultura' },
};

export const categoryOrder: CategoryId[] = ['music', 'sport', 'food', 'places', 'culture'];
