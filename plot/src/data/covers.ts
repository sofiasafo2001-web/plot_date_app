import type { CategoryId } from '@/theme';

export type CoverSticker = { emoji: string; label: string; cat: CategoryId };
export type Cover = {
  /** Frase corta que define a la persona. */
  tagline: string;
  /** Tres cosas muy suyas que flotan en la cabecera. */
  stickers: [CoverSticker, CoverSticker, CoverSticker];
};

/** Cabecera personalizada de cada perfil: lo más característico de cada persona. */
export const covers: Record<string, Cover> = {
  me: {
    tagline: 'Disco nuevo cada semana',
    stickers: [
      { emoji: '💿', label: 'Vinilos', cat: 'culture' },
      { emoji: '🏃', label: 'Antes del curro', cat: 'sport' },
      { emoji: '🍄', label: 'Risotto dominical', cat: 'food' },
    ],
  },
  laia: {
    tagline: 'Cima primero, vermut después',
    stickers: [
      { emoji: '⛰️', label: 'Trail runner', cat: 'places' },
      { emoji: '🍸', label: 'Vermut', cat: 'food' },
      { emoji: '🩺', label: 'Fisio', cat: 'culture' },
    ],
  },
  nerea: {
    tagline: 'Discos que nadie conoce',
    stickers: [
      { emoji: '✏️', label: 'Ilustradora', cat: 'music' },
      { emoji: '🎷', label: 'Jazz japonés', cat: 'sport' },
      { emoji: '📚', label: 'Segunda mano', cat: 'food' },
    ],
  },
  alex: {
    tagline: 'DJ los jueves en Sants',
    stickers: [
      { emoji: '🎧', label: 'Pincha vinilos', cat: 'culture' },
      { emoji: '🍜', label: 'Top 3 ramen', cat: 'food' },
      { emoji: '🏃', label: 'Corre las cenas', cat: 'sport' },
    ],
  },
  clara: {
    tagline: 'Museo y ramen casero',
    stickers: [
      { emoji: '📐', label: 'Arquitecta', cat: 'culture' },
      { emoji: '🍜', label: '12 h de caldo', cat: 'music' },
      { emoji: '🖼️', label: 'Expos', cat: 'places' },
    ],
  },
  jordi: {
    tagline: 'Paella para doce',
    stickers: [
      { emoji: '🚴', label: 'Bici al cole', cat: 'sport' },
      { emoji: '🥘', label: 'Paella', cat: 'food' },
      { emoji: '➗', label: 'Profe de mates', cat: 'culture' },
    ],
  },
  paula: {
    tagline: 'Café y carrete analógico',
    stickers: [
      { emoji: '☕', label: 'Barista', cat: 'food' },
      { emoji: '📷', label: 'Analógica', cat: 'culture' },
      { emoji: '🎸', label: 'Bandas pequeñas', cat: 'places' },
    ],
  },
  sergi: {
    tagline: 'De la cocina a la ola',
    stickers: [
      { emoji: '🏄', label: 'Barceloneta', cat: 'culture' },
      { emoji: '🍤', label: 'Tapas', cat: 'music' },
      { emoji: '🎤', label: 'Rap', cat: 'sport' },
    ],
  },
  irene: {
    tagline: 'Siempre con una peli que recomendar',
    stickers: [
      { emoji: '🎬', label: 'Estudia cine', cat: 'music' },
      { emoji: '🧗', label: 'Escala los martes', cat: 'places' },
      { emoji: '🎭', label: 'Teatro', cat: 'food' },
    ],
  },
  dani: {
    tagline: 'Pádel y poco más',
    stickers: [
      { emoji: '🎾', label: 'Pádel', cat: 'places' },
      { emoji: '🤷', label: 'Sin bio', cat: 'culture' },
      { emoji: '🕶️', label: 'Misterioso', cat: 'music' },
    ],
  },
};

export const coverOf = (id: string): Cover | undefined => covers[id];
