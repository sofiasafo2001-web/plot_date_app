import { useId } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Rect, Stop } from 'react-native-svg';

import { brand, type CategoryId } from '@/theme';

/** Fondo base + tres manchas de luz. */
export type AuraPalette = { base: string; blobs: [string, string, string] };

/**
 * Combinaciones de colores de marca para las auras. Cada categoría tiene dos variantes
 * para que dos personas de la misma categoría no tengan la misma cabecera.
 */
const palettes: Record<CategoryId, [AuraPalette, AuraPalette]> = {
  music: [
    { base: brand.pink, blobs: [brand.hotPink, brand.yellow, brand.sky] },
    { base: brand.bone, blobs: [brand.hotPink, brand.blue, brand.pink] },
  ],
  sport: [
    { base: brand.bone, blobs: [brand.lime, brand.sky, brand.hotPink] },
    { base: brand.lime, blobs: [brand.yellow, brand.sky, brand.bone] },
  ],
  food: [
    { base: brand.bone, blobs: [brand.yellow, brand.hotPink, brand.pink] },
    { base: brand.yellow, blobs: [brand.hotPink, brand.lime, brand.bone] },
  ],
  places: [
    { base: brand.sky, blobs: [brand.blue, brand.lime, brand.bone] },
    { base: brand.bone, blobs: [brand.sky, brand.pink, brand.blue] },
  ],
  culture: [
    { base: brand.pink, blobs: [brand.blue, brand.sky, brand.bone] },
    { base: brand.bone, blobs: [brand.pink, brand.hotPink, brand.sky] },
  ],
};

/** Aura fija para cada persona de la demo, para que no se repitan dos cabeceras iguales. */
const assigned: Record<string, [CategoryId, 0 | 1]> = {
  me: ['music', 0],
  laia: ['sport', 0],
  nerea: ['culture', 0],
  alex: ['music', 1],
  clara: ['food', 0],
  jordi: ['places', 0],
  paula: ['culture', 1],
  sergi: ['food', 1],
  irene: ['places', 1],
  dani: ['sport', 1],
};

/** Paleta estable para una persona: la suya si está asignada, si no según su categoría y su id. */
export function auraFor(id: string, category: CategoryId): AuraPalette {
  const fixed = assigned[id];
  if (fixed) return palettes[fixed[0]][fixed[1]];
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return palettes[category][Math.abs(h) % 2];
}

/** Posición de cada mancha (en % del ancho y alto) y su tamaño. */
const spots = [
  { cx: 18, cy: 30, rx: 62, ry: 80, opacity: 0.95 },
  { cx: 88, cy: 18, rx: 55, ry: 75, opacity: 0.85 },
  { cx: 62, cy: 105, rx: 70, ry: 60, opacity: 0.8 },
];

type Props = { palette: AuraPalette; style?: StyleProp<ViewStyle> };

/** Degradado tipo aura con los colores de la marca. Solo decoración. */
export function Aura({ palette, style }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          {palette.blobs.map((c, i) => (
            <RadialGradient key={i} id={`${uid}g${i}`} cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={c} stopOpacity={spots[i].opacity} />
              <Stop offset="0.55" stopColor={c} stopOpacity={spots[i].opacity * 0.45} />
              <Stop offset="1" stopColor={c} stopOpacity={0} />
            </RadialGradient>
          ))}
        </Defs>
        <Rect x="0" y="0" width="100" height="100" fill={palette.base} />
        {palette.blobs.map((_, i) => (
          <Ellipse key={i} cx={spots[i].cx} cy={spots[i].cy} rx={spots[i].rx} ry={spots[i].ry} fill={`url(#${uid}g${i})`} />
        ))}
      </Svg>
    </View>
  );
}
