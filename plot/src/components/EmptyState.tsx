import type { LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors, space } from '@/theme';

import { Button } from './Button';
import { Txt } from './Txt';

type Props = { icon: LucideIcon; title: string; text: string; actionLabel?: string; onAction?: () => void; dark?: boolean };

export function EmptyState({ icon: Icon, title, text, actionLabel, onAction, dark }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Icon size={28} color={colors.white} />
      </View>
      <Txt variant="title2" align="center" color={dark ? colors.dark.text : colors.ink}>
        {title}
      </Txt>
      <Txt variant="subhead" color={dark ? colors.dark.text2 : colors.text2} align="center">
        {text}
      </Txt>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} variant={dark ? 'outlineLight' : 'outline'} size="md" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: space.md, paddingVertical: space.xxxl, paddingHorizontal: space.xl },
  icon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brandRed, alignItems: 'center', justifyContent: 'center' },
});
