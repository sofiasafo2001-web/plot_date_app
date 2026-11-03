/**
 * Paleta de marca PLOT.
 *
 * - Frambuesa #E01F66 (añadido): la acción principal. Botones, pestaña activa, cursor, interruptores.
 *   Es el rosa fuerte oscurecido lo justo para llevar texto blanco (4,6:1) y suena a app de citas.
 * - Rosa claro #FFB7EF: superficie de marca. Burbujas propias, opciones marcadas, bienvenida.
 * - Rosa fuerte #FF4987: ligoteo. Burbuja de flirt, primer mensaje, corazón de «qué busca».
 * - Rojo #E0070F: el del logotipo y lo que reclama atención (avisos de no leídos, errores).
 * - Azul #0043D8: confianza e información (verificado, enlaces, seguridad). Se usa poco.
 * - Crema #F9F7F0: el «gris» cálido. Tarjetas, campos y hojas, siempre con borde suave.
 * - Lima, amarillo y celeste: solo como color de categoría y en las auras, con texto negro.
 */
export const brand = {
  red: '#E0070F',
  raspberry: '#E01F66',
  pink: '#FFB7EF',
  hotPink: '#FF4987',
  blue: '#0043D8',
  lime: '#D5E400',
  cream: '#F9F7F0',
  yellow: '#FFD900',
  sky: '#9CDCF8',
} as const;

export const colors = {
  ink: '#121110',
  text2: '#4B4740',
  text3: '#6E6A60',
  line: '#E8E3D6',
  surface: brand.cream,
  /** Crema un punto más intenso para controles pequeños que deben leerse sobre blanco. */
  fill: '#F1EEE4',
  bg: '#FFFFFF',
  white: '#FFFFFF',

  /** Acción principal (frambuesa). Texto blanco encima. */
  primary: brand.raspberry,
  /** Frambuesa oscuro para texto sobre blanco o rosa claro. */
  primaryInk: '#A8104B',
  /** Rojo del logotipo y de los avisos (no leídos). */
  brandRed: brand.red,
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
