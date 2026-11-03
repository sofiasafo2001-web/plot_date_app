import { Check } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { categoryOf } from '@/data/catalog';
import { categories, colors, type CategoryId } from '@/theme';
import { tapLight } from '@/utils/haptics';

import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

type Props = {
  label: string;
  /** Informativa: en común (relleno) o no (solo borde). Seleccionable: marcada. */
  solid?: boolean;
  category?: CategoryId;
  onPress?: () => void;
  size?: 'sm' | 'md';
  showCheck?: boolean;
  /** Sobre fondo grafito. */
  dark?: boolean;
};

/**
 * Etiqueta de interés: cápsula con un punto del color de su categoría.
 * - Informativa: blanca (o grafito claro en modo oscuro); solo borde si no es en común.
 * - Seleccionable: blanca sin marcar, grafito con texto blanco marcada.
 */
export function Chip({ label, solid, category, onPress, size = 'md', showCheck, dark }: Props) {
  const cat = categories[category ?? categoryOf(label)];
  const selected = !!onPress && !!solid;
  const fg = selected || dark ? colors.white : colors.ink;
  const content = (
    <>
      {showCheck && selected ? (
        <Check size={14} color={colors.white} strokeWidth={2.6} />
      ) : (
        <View style={[styles.dot, { backgroundColor: cat.solid }]} />
      )}
      <Txt variant={size === 'sm' ? 'footnoteStrong' : 'subheadStrong'} color={fg}>
        {label}
      </Txt>
    </>
  );
  const fill = onPress
    ? { backgroundColor: selected ? colors.ink : colors.card }
    : dark
      ? solid
        ? { backgroundColor: colors.dark.chip }
        : styles.outlineDark
      : solid
        ? { backgroundColor: colors.card }
        : styles.outline;
  const style = [styles.base, size === 'sm' ? styles.sm : styles.md, fill];
  if (!onPress) {
    return <View style={style}>{content}</View>;
  }
  return (
    <PressableScale
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
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
  base: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 999, alignSelf: 'flex-start' },
  md: { paddingHorizontal: 14, paddingVertical: 8 },
  sm: { paddingHorizontal: 11, paddingVertical: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  outline: { borderWidth: 1, borderColor: colors.line },
  outlineDark: { borderWidth: 1, borderColor: colors.dark.line },
  touch: { minHeight: 40 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
