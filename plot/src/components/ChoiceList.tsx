import { Check } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors, hit, radius, space } from '@/theme';
import { tapLight } from '@/utils/haptics';

import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  accessibilityLabel: string;
};

/** Lista de opciones de respuesta única: crema sin marcar, rosa de marca marcada. */
export function ChoiceList<T extends string>({ options, value, onChange, accessibilityLabel }: Props<T>) {
  return (
    <View style={styles.list} accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <PressableScale
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: on }}
            accessibilityLabel={o.label}
            onPress={() => {
              tapLight();
              onChange(o.value);
            }}
            scaleTo={0.98}
            style={[styles.row, on && styles.on]}
          >
            <Txt variant="subheadStrong" style={styles.flex}>
              {o.label}
            </Txt>
            <View style={[styles.mark, on && styles.markOn]}>{on ? <Check size={14} color={colors.white} strokeWidth={3} /> : null}</View>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: hit + 6, paddingHorizontal: space.lg, borderRadius: radius.button, backgroundColor: colors.fill, gap: space.md },
  on: { backgroundColor: colors.pink },
  flex: { flex: 1 },
  mark: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: colors.text3, alignItems: 'center', justifyContent: 'center' },
  markOn: { backgroundColor: colors.ink, borderColor: colors.ink },
});
