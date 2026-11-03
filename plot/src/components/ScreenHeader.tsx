import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, gutter, space } from '@/theme';

import { Txt } from './Txt';

type Props = {
  title: string;
  /** Antetítulo en mayúsculas pequeñas, encima del título (p. ej. «8 personas afines · Gràcia»). */
  subtitle?: string;
  right?: ReactNode;
  dark?: boolean;
};

/** Cabecera de pantalla: antetítulo en versalitas y título grande en Archivo ExtraBold. */
export function LargeHeader({ title, subtitle, right, dark }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.flex}>
        {subtitle ? (
          <Txt variant="caption" color={dark ? colors.dark.text2 : colors.text2}>
            {subtitle.toUpperCase()}
          </Txt>
        ) : null}
        <Txt variant="largeTitle" color={dark ? colors.dark.text : colors.ink} accessibilityRole="header">
          {title}
        </Txt>
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: gutter, paddingTop: space.lg, paddingBottom: space.lg, gap: space.md },
  flex: { flex: 1, gap: 4 },
  right: { flexDirection: 'row', gap: space.sm, paddingBottom: 2 },
});
