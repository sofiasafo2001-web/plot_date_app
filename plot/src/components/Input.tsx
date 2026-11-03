import { CircleAlert } from 'lucide-react-native';
import { useState, type ComponentRef, type ReactNode, type Ref } from 'react';
import { Platform, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, fonts, radius, space } from '@/theme';

import { Txt } from './Txt';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
  right?: ReactNode;
  left?: ReactNode;
  ref?: Ref<ComponentRef<typeof TextInput>>;
  /** Campo en cápsula sin borde (buscadores). */
  pill?: boolean;
};

/** Campo de texto sobre crema, foco en negro y error con icono y texto (no solo color). */
export function Input({ label, error, hint, right, left, style, onFocus, onBlur, multiline, ref, pill, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? colors.danger : focused ? colors.ink : colors.line;
  return (
    <View style={styles.wrap}>
      {label ? (
        <Txt variant="footnoteStrong" color={colors.text2}>
          {label}
        </Txt>
      ) : null}
      <View
        style={[
          styles.field,
          { borderColor, backgroundColor: colors.card },
          multiline && styles.multiline,
          pill && styles.pill,
          pill && !focused && !error && { borderColor: colors.card },
        ]}
      >
        {left ? <View style={styles.adorn}>{left}</View> : null}
        <TextInput
          ref={ref}
          placeholderTextColor={colors.text3}
          selectionColor={colors.brandRed}
          cursorColor={colors.brandRed}
          multiline={multiline}
          maxFontSizeMultiplier={1.8}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, multiline && styles.inputMultiline, style]}
          {...rest}
        />
        {right ? <View style={styles.adorn}>{right}</View> : null}
      </View>
      {error ? (
        <View style={styles.error}>
          <CircleAlert size={16} color={colors.dangerInk} strokeWidth={2.2} />
          <Txt variant="footnoteStrong" color={colors.dangerInk} accessibilityLiveRegion="polite" accessibilityRole="alert">
            {error}
          </Txt>
        </View>
      ) : hint ? (
        <Txt variant="footnote" color={colors.text3}>
          {hint}
        </Txt>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  error: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  adorn: { flexShrink: 0 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    minHeight: 52,
    borderWidth: 1.5,
    borderRadius: radius.input,
    paddingHorizontal: space.md,
  },
  multiline: { alignItems: 'flex-start', paddingVertical: space.sm },
  pill: { borderRadius: 999, paddingHorizontal: space.lg },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 17,
    color: colors.ink,
    paddingVertical: 12,
    // En la versión web, sin el recuadro de foco del navegador: el foco ya lo marca el borde del campo.
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null),
  },
  inputMultiline: { minHeight: 96, textAlignVertical: 'top', paddingTop: 6 },
});
