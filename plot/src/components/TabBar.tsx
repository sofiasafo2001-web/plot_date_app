import type { BottomTabBarProps } from 'expo-router/tabs';
import { Bookmark, Compass, MessageCircle, User, type LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useChatBadge } from '@/store/selectors';
import { colors, gutter, hit, space } from '@/theme';
import { tapLight } from '@/utils/haptics';

import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

const meta: Record<string, { label: string; icon: LucideIcon }> = {
  discover: { label: 'Descubrir', icon: Compass },
  saved: { label: 'Guardados', icon: Bookmark },
  chats: { label: 'Chats', icon: MessageCircle },
  profile: { label: 'Perfil', icon: User },
};

/** Barra de pestañas flotante en negro. La pestaña activa va en frambuesa (la acción de marca). */
export function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const badge = useChatBadge();
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, space.md) }]}>
      <View style={styles.bar} accessibilityRole="tablist">
        {state.routes.map((route, index) => {
          const m = meta[route.name];
          if (!m) return null;
          const focused = state.index === index;
          const Icon = m.icon;
          const showBadge = route.name === 'chats' && badge > 0;
          return (
            <PressableScale
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={showBadge ? `${m.label}, ${badge} pendientes` : m.label}
              onPress={() => {
                if (!focused) {
                  tapLight();
                  navigateToTab(route.key);
                }
              }}
              style={styles.item}
              scaleTo={0.92}
            >
              <View style={[styles.icon, focused && styles.iconOn]}>
                <Icon size={21} color={focused ? colors.white : tabMuted} strokeWidth={focused ? 2.2 : 1.8} fill={focused && route.name === 'saved' ? colors.white : 'none'} />
                {showBadge ? (
                  <View style={styles.badge}>
                    <Txt variant="caption" color={colors.white} maxFontSizeMultiplier={1.1}>
                      {badge > 99 ? '99+' : badge}
                    </Txt>
                  </View>
                ) : null}
              </View>
              <Txt variant="caption" color={focused ? colors.white : tabMuted} maxFontSizeMultiplier={1.2}>
                {m.label}
              </Txt>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

/** Gris cálido sobre negro (7:1). */
const tabMuted = '#A8A397';

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.bg, paddingHorizontal: gutter, paddingTop: space.xs },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.ink,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, minHeight: hit + 6 },
  icon: { width: 52, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  iconOn: { backgroundColor: colors.primary },
  badge: {
    position: 'absolute',
    top: -4,
    right: 2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.brandRed,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
