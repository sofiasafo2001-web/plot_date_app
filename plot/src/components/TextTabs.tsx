import { ScrollView, StyleSheet, View } from 'react-native';

import { colors, gutter } from '@/theme';
import { tapLight } from '@/utils/haptics';

import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

type Tab<T extends string> = { value: T; label: string; count?: number; badge?: number };

type Props<T extends string> = {
  tabs: Tab<T>[];
  value: T;
  onChange: (v: T) => void;
  /** Margen lateral del contenido (por defecto, el de pantalla). */
  inset?: number;
  dark?: boolean;
  /** Ocupa todo el ancho sin desplazamiento (pocas pestañas). */
  fixed?: boolean;
};

/** Pestañas de texto con subrayado en la activa y una línea fina debajo de todas. */
export function TextTabs<T extends string>({ tabs, value, onChange, inset = gutter, dark, fixed }: Props<T>) {
  const on = dark ? colors.dark.text : colors.ink;
  const off = dark ? colors.dark.text2 : colors.text2;
  const items = tabs.map((t) => {
    const active = t.value === value;
    return (
      <PressableScale
        key={t.value}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        accessibilityLabel={t.badge ? `${t.label}, ${t.badge} pendientes` : t.count !== undefined ? `${t.label}, ${t.count}` : t.label}
        onPress={() => {
          if (active) return;
          tapLight();
          onChange(t.value);
        }}
        scaleTo={0.96}
        style={[styles.tab, { borderBottomColor: active ? on : colors.transparent }]}
      >
        <Txt variant={active ? 'subheadStrong' : 'subhead'} color={active ? on : off}>
          {t.label}
          {t.count !== undefined ? (
            <Txt variant="subhead" color={off}>
              {` ${t.count}`}
            </Txt>
          ) : null}
        </Txt>
        {t.badge ? (
          <View style={styles.badge}>
            <Txt variant="caption" color={colors.white} maxFontSizeMultiplier={1.2}>
              {t.badge}
            </Txt>
          </View>
        ) : null}
      </PressableScale>
    );
  });
  const lineColor = dark ? colors.dark.line : colors.line;
  if (fixed) {
    return (
      <View accessibilityRole="tablist" style={[styles.row, styles.fixed, { marginHorizontal: inset, borderBottomColor: lineColor }]}>
        {items}
      </View>
    );
  }
  return (
    <View style={[styles.wrap, { marginHorizontal: inset, borderBottomColor: lineColor }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row} accessibilityRole="tablist">
        {items}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderBottomWidth: StyleSheet.hairlineWidth },
  fixed: { borderBottomWidth: StyleSheet.hairlineWidth },
  row: { flexDirection: 'row', gap: 24 },
  tab: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 6, borderBottomWidth: 2, marginBottom: -StyleSheet.hairlineWidth },
  badge: { minWidth: 20, height: 20, borderRadius: 10, paddingHorizontal: 5, backgroundColor: colors.brandRed, alignItems: 'center', justifyContent: 'center' },
});
