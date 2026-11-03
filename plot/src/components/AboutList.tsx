import { StyleSheet, View } from 'react-native';

import { lookingForLabel } from '@/data/catalog';
import { colors, radius, space } from '@/theme';
import type { AboutFields } from '@/types';

import { Txt } from './Txt';

type Props = {
  about: AboutFields;
  /** Textos en segunda persona (tu propio perfil). */
  own?: boolean;
  dark?: boolean;
};

/** «De dónde», «de qué trabaja» y «qué busca»: etiqueta a la izquierda, respuesta a la derecha. */
export function AboutList({ about, own, dark }: Props) {
  const rows = [
    { label: own ? 'De dónde eres' : 'De dónde es', value: about.origin },
    { label: own ? 'De qué trabajas' : 'De qué trabaja', value: about.job },
    { label: own ? 'Qué buscas' : 'Qué busca', value: lookingForLabel[about.lookingFor] },
  ].filter((r) => r.value.trim().length > 0);
  const line = dark ? colors.dark.line : colors.line;
  return (
    <View style={[styles.card, { backgroundColor: dark ? colors.dark.card : colors.card }]}>
      {rows.map((r, i) => (
        <View
          key={r.label}
          style={[styles.row, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: line }]}
          accessible
          accessibilityLabel={`${r.label}: ${r.value}`}
        >
          <Txt variant="caption" color={dark ? colors.dark.text2 : colors.text2}>
            {r.label.toUpperCase()}
          </Txt>
          <Txt variant="subheadStrong" color={dark ? colors.dark.text : colors.ink} align="right" style={styles.value}>
            {r.value}
          </Txt>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.card - 4, paddingHorizontal: space.lg },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.md, minHeight: 46, paddingVertical: space.sm },
  value: { flexShrink: 1 },
});
