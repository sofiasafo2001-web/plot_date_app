import { Check } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { categoryOf } from '@/data/catalog';
import { categories, colors, type CategoryId } from '@/theme';
import { tapLight } from '@/utils/haptics';

import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

type Props = {
  label: string;
  /** Sólido = seleccionado o en común. Suave = no seleccionado. */
  solid?: boolean;
  category?: CategoryId;
  onPress?: () => void;
  size?: 'sm' | 'md';
  showCheck?: boolean;
};

/**
 * Etiqueta de interés. Esquinas suaves en lugar de cápsula para no recargar.
 * - Seleccionable: crema sin marcar, rosa de marca marcada (con check).
 * - Informativa: color de su categoría si es en común, solo borde si no.
 * Texto siempre en negro sobre color (contraste).
 */
export function Chip({ label, solid, category, onPress, size = 'md', showCheck }: Props) {
  const cat = categories[category ?? categoryOf(label)];
  const content = (
    <>
      {showCheck && solid ? <Check size={14} color={colors.ink} strokeWidth={2.4} /> : null}
      <Txt variant={size === 'sm' ? 'footnoteStrong' : 'subheadStrong'} color={colors.ink}>
        {label}
      </Txt>
    </>
  );
  const style = [
    styles.base,
    size === 'sm' ? styles.sm : styles.md,
    onPress
      ? { backgroundColor: solid ? colors.pink : colors.fill }
      : solid
        ? { backgroundColor: cat.solid }
        : styles.outline,
  ];
  if (!onPress) {
    return <View style={style}>{content}</View>;
  }
  return (
    <PressableScale
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!solid }}
      accessibilityLabel={label}
      onPress={() => {
        tapLight();
        onPress();
      }}
      scaleTo={0.94}
      style={[style, styles.touch]}
    >
      {content}
    </PressableScale>
  );
}

export function ChipRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 10, alignSelf: 'flex-start' },
  outline: { borderWidth: 1, borderColor: colors.line },
  md: { paddingHorizontal: 14, paddingVertical: 8 },
  sm: { paddingHorizontal: 9, paddingVertical: 4 },
  touch: { minHeight: 40 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
