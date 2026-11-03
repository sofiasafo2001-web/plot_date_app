import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, gutter, space } from '@/theme';

import { Txt } from './Txt';

/** Cabecera de pantalla: título en mayúsculas y rojo de marca, como un cartel. */
export function LargeHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.flex}>
        <Txt variant="largeTitle" color={colors.brandRed} accessibilityRole="header" accessibilityLabel={title}>
          {title.toUpperCase()}
        </Txt>
        {subtitle ? (
          <Txt variant="caption" color={colors.text2}>
            {subtitle.toUpperCase()}
          </Txt>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: gutter, paddingTop: space.sm, paddingBottom: space.md, gap: space.md },
  flex: { flex: 1 },
  right: { flexDirection: 'row', gap: space.sm, paddingBottom: 2 },
});
