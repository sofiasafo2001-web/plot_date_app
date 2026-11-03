import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Aura, type AuraPalette } from '@/components/Aura';
import { Button } from '@/components/Button';
import { Txt } from '@/components/Txt';
import { brand, colors, gutter, space } from '@/theme';

/** Lo que la gente comparte en PLOT, en grande, como un cartel. */
const words = ['Vinilos', 'Montaña', 'Vermut', 'Cine', 'Ramen'];

/** Aura de bienvenida: rosa de marca con luz roja, rosa fuerte y amarillo. */
const welcomeAura: AuraPalette = { base: brand.pink, blobs: [brand.hotPink, brand.red, brand.yellow] };

export default function Welcome() {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <Aura palette={welcomeAura} />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Txt variant="brand" color={colors.primary} style={styles.logo} accessibilityRole="header" accessibilityLabel="PLOT">
          PLOT
        </Txt>
        <View style={styles.words} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {words.map((w, i) => (
            <Animated.View key={w} entering={FadeInUp.delay(80 + i * 60).duration(320)}>
              <Txt variant="largeTitle" color={colors.ink} style={[styles.word, { opacity: 1 - i * 0.17 }]} maxFontSizeMultiplier={1}>
                {w}
              </Txt>
            </Animated.View>
          ))}
        </View>
        <Animated.View entering={FadeInDown.delay(150).duration(300)} style={styles.copy}>
          <Txt variant="largeTitle" color={colors.primary} style={styles.hero} maxFontSizeMultiplier={1.3}>
            Anti-swipe.
          </Txt>
          <Txt variant="body" color={colors.ink}>
            Aquí no deslizas a nadie. Ves lo que le gusta a la gente y le escribes.
          </Txt>
        </Animated.View>
        <View style={styles.actions}>
          <Button label="Crear cuenta" onPress={() => router.push('/onboarding')} />
          <Button label="Ya tengo cuenta" variant="dark" onPress={() => router.push('/login')} />
          <View style={styles.legal}>
            <Txt variant="footnote" color={colors.ink} align="center">
              Al continuar aceptas las{' '}
              <Txt
                variant="footnoteStrong"
                color={colors.ink}
                style={styles.link}
                accessibilityRole="link"
                onPress={() => router.push({ pathname: '/legal', params: { tab: 'terms' } })}
              >
                Condiciones
              </Txt>{' '}
              y la{' '}
              <Txt
                variant="footnoteStrong"
                color={colors.ink}
                style={styles.link}
                accessibilityRole="link"
                onPress={() => router.push({ pathname: '/legal', params: { tab: 'privacy' } })}
              >
                Política de privacidad
              </Txt>
              .
            </Txt>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: brand.pink, overflow: 'hidden' },
  safe: { flex: 1, paddingHorizontal: gutter },
  logo: { marginTop: space.sm },
  words: { marginTop: space.xxl, gap: 0 },
  word: { fontSize: 56, lineHeight: 60, letterSpacing: -2.4 },
  copy: { flex: 1, justifyContent: 'flex-end', gap: space.sm, paddingBottom: space.xl },
  hero: { fontSize: 44, lineHeight: 48, letterSpacing: -1.8 },
  actions: { gap: space.md, paddingBottom: space.sm },
  legal: { paddingTop: space.xs, paddingHorizontal: space.lg },
  link: { textDecorationLine: 'underline' },
});
