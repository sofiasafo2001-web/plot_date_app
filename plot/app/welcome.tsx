import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Txt } from '@/components/Txt';
import { brand, colors, fonts, gutter, space } from '@/theme';

/** Lo que la gente comparte en PLOT, en grande, como un cartel. */
const words = ['VINILOS', 'MONTAÑA', 'VERMUT', 'CINE'];

/** Bienvenida en rojo de marca con el logotipo en rosa, como un cartel. */
export default function Welcome() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Animated.View entering={FadeInDown.duration(320)}>
          <Image
            source={require('@/assets/images/logo-tagline-pink.png')}
            style={styles.logo}
            contentFit="contain"
            accessibilityRole="header"
            accessibilityLabel="PLOT. Give it a twist"
          />
        </Animated.View>

        <View style={styles.words} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {words.map((w, i) => (
            <Animated.View key={w} entering={FadeInUp.delay(120 + i * 70).duration(320)} style={i % 2 ? styles.right : undefined}>
              <Txt variant="largeTitle" color={i % 2 ? colors.white : brand.pink} style={styles.word} maxFontSizeMultiplier={1}>
                {w}
              </Txt>
            </Animated.View>
          ))}
        </View>

        <Animated.View entering={FadeInDown.delay(200).duration(300)} style={styles.copy}>
          <Txt variant="largeTitle" color={colors.white} style={styles.hero} maxFontSizeMultiplier={1.3}>
            Anti-swipe.
          </Txt>
          <Txt variant="body" color={colors.white}>
            Aquí no deslizas a nadie. Ves lo que le gusta a la gente y le escribes.
          </Txt>
        </Animated.View>

        <View style={styles.actions}>
          <Button label="Crear cuenta" variant="light" onPress={() => router.push('/onboarding')} />
          <Button label="Ya tengo cuenta" variant="dark" onPress={() => router.push('/login')} />
          <View style={styles.legal}>
            <Txt variant="footnote" color={colors.white} align="center">
              Al continuar aceptas las{' '}
              <Txt
                variant="footnoteStrong"
                color={colors.white}
                style={styles.link}
                accessibilityRole="link"
                onPress={() => router.push({ pathname: '/legal', params: { tab: 'terms' } })}
              >
                Condiciones
              </Txt>{' '}
              y la{' '}
              <Txt
                variant="footnoteStrong"
                color={colors.white}
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
  root: { flex: 1, backgroundColor: brand.red, overflow: 'hidden' },
  safe: { flex: 1, paddingHorizontal: gutter },
  logo: { width: '100%', aspectRatio: 1000 / 256, marginTop: space.lg },
  words: { marginTop: space.xl },
  right: { alignItems: 'flex-end' },
  word: { fontFamily: fonts.poster, fontSize: 40, lineHeight: 46, letterSpacing: -1 },
  copy: { flex: 1, justifyContent: 'flex-end', gap: space.sm, paddingBottom: space.xl },
  hero: { fontFamily: fonts.poster, fontSize: 34, lineHeight: 40, letterSpacing: -1 },
  actions: { gap: space.md, paddingBottom: space.sm },
  legal: { paddingTop: space.xs, paddingHorizontal: space.lg },
  link: { textDecorationLine: 'underline' },
});
