import type { LucideIcon } from 'lucide-react-native';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { colors, hit } from '@/theme';
import { tapLight } from '@/utils/haptics';

import { PressableScale } from './PressableScale';

type Props = {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  tone?: 'plain' | 'surface' | 'glass' | 'primary' | 'onPrimary' | 'dark' | 'outlineLight' | 'glassDark';
  size?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const tones = {
  plain: { bg: colors.transparent, fg: colors.ink },
  surface: { bg: colors.transparent, fg: colors.ink, border: colors.ink },
  outlineLight: { bg: colors.transparent, fg: colors.white, border: colors.white },
  glassDark: { bg: colors.glassDark, fg: colors.white },
  glass: { bg: colors.glass, fg: colors.ink },
  primary: { bg: colors.primary, fg: colors.onPrimary },
  onPrimary: { bg: colors.primaryInk, fg: colors.white },
  dark: { bg: colors.ink, fg: colors.white },
};

/** Botón solo con icono: siempre lleva accessibilityLabel y 44×44 mínimo. */
export function IconButton({ icon: Icon, label, onPress, tone = 'surface', size = 22, disabled, style }: Props) {
  const t = tones[tone];
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      hitSlop={6}
      onPress={() => {
        tapLight();
        onPress();
      }}
      style={[styles.base, { backgroundColor: disabled ? colors.line : t.bg }, 'border' in t && { borderWidth: 1.5, borderColor: t.border }, style]}
    >
      <Icon size={size} color={disabled ? colors.text3 : t.fg} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: { width: hit, height: hit, borderRadius: hit / 2, alignItems: 'center', justifyContent: 'center' },
});
