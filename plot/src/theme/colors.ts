/**
 * Paleta PLOT (propuesta de rediseño).
 *
 * - Grafito #161514: texto, iconos y fondo de Descubrir y del perfil de otra persona.
 * - Rojo #E0070F: marca, acción principal (botones con texto blanco) y avisos.
 * - Hueso #F0EFED: fondo de las demás pestañas y pantallas. Tarjetas en blanco encima.
 * - Rosa claro #FFB7EF: contexto (el «por qué», la bio). Texto grafito encima.
 * - Azul #0043D8: verificado.
 * - Categorías, como punto de color en las etiquetas:
 *   Música rosa #FF4987 · Deporte celeste #9CDCF8 · Restaurantes amarillo #FFD900 ·
 *   Lugares (montaña) lima #D5E400 · Cultura rosa claro #FFB7EF.
 */
export const brand = {
  graphite: '#161514',
  red: '#E0070F',
  bone: '#F0EFED',
  pink: '#FFB7EF',
  hotPink: '#FF4987',
  blue: '#0043D8',
  lime: '#D5E400',
  yellow: '#FFD900',
  sky: '#9CDCF8',
} as const;

export const colors = {
  ink: brand.graphite,
  text2: '#55524C',
  text3: '#6B675F',
  line: '#E2E0DC',
  /** Fondo de pantalla (hueso). */
  bg: brand.bone,
  /** Tarjetas, campos y hojas: blanco sobre hueso. */
  card: '#FFFFFF',
  surface: '#FFFFFF',
  /** Controles pequeños y pistas que deben verse sobre blanco y sobre hueso. */
  fill: '#E6E4E0',
  white: '#FFFFFF',

  /** Acción principal: rojo de marca con texto blanco (5:1). */
  primary: brand.red,
  onPrimary: '#FFFFFF',
  /** Rojo oscuro para textos de acción («Guardar», enlaces de barra). */
  primaryInk: '#B0000A',
  brandRed: brand.red,
  onRed: '#FFFFFF',
  /** Rosa de contexto: el «por qué», la bio, seleccionados. */
  pink: brand.pink,
  primarySoft: '#FFE3F7',

  /** Ligoteo (burbuja de pregunta, primer mensaje): rosa claro de contexto. */
  flirt: brand.pink,
  flirtSoft: '#FFE3F7',
  flirtInk: '#B0003C',

  /** Verificado y confianza. */
  info: brand.blue,
  infoSoft: '#E6EDFC',

  danger: '#C4000B',
  dangerSoft: '#FFE5E6',
  dangerInk: '#A3000A',
  success: '#4F5500',
  successSoft: '#F4F7C2',

  /** Modo oscuro (Descubrir y perfil de otra persona). */
  dark: {
    bg: brand.graphite,
    card: '#1F1E1C',
    chip: '#2B2A27',
    line: '#34322F',
    text: '#FFFFFF',
    text2: '#A9A59D',
  },

  /** Velo oscuro para fondos de hojas y modales. */
  scrim: 'rgba(22, 21, 20, 0.5)',
  onPrimaryMuted: 'rgba(22, 21, 20, 0.62)',
  /** Botones circulares sobre fotos. */
  glass: 'rgba(255, 255, 255, 0.92)',
  glassDark: 'rgba(22, 21, 20, 0.55)',
  transparent: 'transparent',
} as const;

export type CategoryId = 'music' | 'sport' | 'food' | 'places' | 'culture';

export type CategoryPalette = { solid: string; soft: string; ink: string; label: string };

/** Colores de categoría. El sólido es el punto de color; el ink, para texto sobre blanco o hueso. */
export const categories: Record<CategoryId, CategoryPalette> = {
  music: { solid: brand.hotPink, soft: '#FFE1EB', ink: '#B0003C', label: 'Música' },
  sport: { solid: brand.sky, soft: '#E3F4FC', ink: '#00587F', label: 'Deporte' },
  food: { solid: brand.yellow, soft: '#FFF6C2', ink: '#6B5A00', label: 'Restaurantes' },
  places: { solid: brand.lime, soft: '#F4F7C2', ink: '#4F5500', label: 'Lugares' },
  culture: { solid: brand.pink, soft: '#FFEAF9', ink: '#8A1673', label: 'Cultura' },
};

export const categoryOrder: CategoryId[] = ['music', 'sport', 'food', 'places', 'culture'];
