import { ScrollView, StyleSheet } from 'react-native';

import { colors, gutter } from '@/theme';
import { tapLight } from '@/utils/haptics';

import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

type Tab<T extends string> = { value: T; label: string; count?: number };

type Props<T extends string> = {
  tabs: Tab<T>[];
  value: T;
  onChange: (v: T) => void;
  /** Margen lateral del contenido (por defecto, el de pantalla). */
  inset?: number;
};

/**
 * Pestañas de texto: solo la activa lleva fondo (negro). Sustituye a la fila de pastillas
 * de colores para que la pantalla respire.
 */
export function TextTabs<T extends string>({ tabs, value, onChange, inset = gutter }: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, { paddingHorizontal: inset }]}
      accessibilityRole="tablist"
    >
      {tabs.map((t) => {
        const on = t.value === value;
        return (
          <PressableScale
            key={t.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t.count !== undefined ? `${t.label}, ${t.count}` : t.label}
            onPress={() => {
              if (on) return;
              tapLight();
              onChange(t.value);
            }}
            scaleTo={0.94}
            style={[styles.tab, on && styles.on]}
          >
            <Txt variant="subheadStrong" color={on ? colors.white : colors.text2}>
              {t.label}
              {t.count !== undefined ? (
                <Txt variant="subhead" color={on ? 'rgba(255,255,255,0.7)' : colors.text3}>
                  {` ${t.count}`}
                </Txt>
              ) : null}
            </Txt>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 2 },
  tab: { minHeight: 40, paddingHorizontal: 14, borderRadius: 20, justifyContent: 'center' },
  on: { backgroundColor: colors.ink },
});
