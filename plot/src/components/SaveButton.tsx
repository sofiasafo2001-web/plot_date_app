import { Bookmark } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

import { useApp } from '@/store/useApp';
import { toast } from '@/store/useToast';
import { colors, hit } from '@/theme';
import { tapMedium } from '@/utils/haptics';

import { PressableScale } from './PressableScale';

type Props = {
  personId: string;
  name: string;
  /** Sobre una foto: cristal claro. */
  onPhoto?: boolean;
  /** Sobre una foto, en la barra superior: cristal oscuro con icono blanco. */
  onDark?: boolean;
};

/** Marcador para guardar un perfil y verlo luego en la pestaña Guardados. */
export function SaveButton({ personId, name, onPhoto, onDark }: Props) {
  const saved = useApp((s) => s.saved.some((x) => x.id === personId));
  const toggleSaved = useApp((s) => s.toggleSaved);
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={saved ? `Quitar a ${name} de Guardados` : `Guardar a ${name}`}
      accessibilityState={{ selected: saved }}
      hitSlop={6}
      scaleTo={0.88}
      onPress={() => {
        tapMedium();
        const now = toggleSaved(personId);
        toast(now ? `${name} está en Guardados` : `${name} ya no está en Guardados`, {
          tone: now ? 'success' : 'default',
          undo: () => toggleSaved(personId),
        });
      }}
      style={[styles.base, saved ? (onDark ? styles.onLight : styles.on) : onDark ? styles.glassDark : onPhoto ? styles.glass : styles.off]}
    >
      <Bookmark
        size={21}
        color={onDark ? (saved ? colors.ink : colors.white) : saved ? colors.white : colors.ink}
        fill={saved ? (onDark ? colors.ink : colors.white) : 'none'}
        strokeWidth={2}
      />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: { width: hit, height: hit, borderRadius: hit / 2, alignItems: 'center', justifyContent: 'center' },
  on: { backgroundColor: colors.ink },
  off: { backgroundColor: colors.card },
  glass: { backgroundColor: colors.glass },
  glassDark: { backgroundColor: colors.glassDark },
  onLight: { backgroundColor: colors.white },
});
