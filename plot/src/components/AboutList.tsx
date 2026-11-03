import { Briefcase, Heart, House, type LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { lookingForLabel } from '@/data/catalog';
import { colors, radius, space } from '@/theme';
import type { AboutFields } from '@/types';

import { Txt } from './Txt';

type Props = { about: AboutFields; /** Textos en segunda persona (tu propio perfil). */ own?: boolean };

/** «De dónde es», «a qué se dedica» y «qué busca aquí», en una tarjeta crema. */
export function AboutList({ about, own }: Props) {
  const rows: { icon: LucideIcon; label: string; value: string; flirt?: boolean }[] = [
    { icon: House, label: own ? 'De dónde eres' : 'De dónde es', value: about.origin },
    { icon: Briefcase, label: own ? 'De qué trabajas' : 'De qué trabaja', value: about.job },
    { icon: Heart, label: own ? 'Qué te gustaría encontrar' : 'Qué le gustaría encontrar', value: lookingForLabel[about.lookingFor], flirt: true },
  ];
  return (
    <View style={styles.card}>
      {rows
        .filter((r) => r.value.trim().length > 0)
        .map((r, i) => (
          <View key={r.label} style={[styles.row, i > 0 && styles.border]} accessible accessibilityLabel={`${r.label}: ${r.value}`}>
            <View style={[styles.icon, r.flirt && styles.iconFlirt]}>
              <r.icon size={18} color={colors.ink} fill={r.flirt ? colors.ink : 'none'} />
            </View>
            <View style={styles.flex}>
              <Txt variant="caption" color={colors.text2}>
                {r.label.toUpperCase()}
              </Txt>
              <Txt variant="headline">{r.value}</Txt>
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.line, paddingHorizontal: space.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: space.md },
  border: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  icon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  iconFlirt: { backgroundColor: colors.flirt },
  flex: { flex: 1, gap: 1 },
});
