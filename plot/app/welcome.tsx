import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Txt } from '@/components/Txt';
import { brand, colors, fonts, gutter, space } from '@/theme';

/** Frases de bienvenida: planteamiento y remate, con guiño. Van rotando. */
const lines: [string, string][] = [
  ['Otra app para conocer gente.', 'Pero esta vez, conoce a la gente.'],
  ['Dating sin postureo.', 'Ni poses, ni filtros, ni swipe infinito.'],
  ['Aquí una foto no decide', 'quién merece una conversación.'],
  ['¿Te gusta el vermut? A Laia también.', 'Ya tenéis tema.'],
];
const ROTATE_MS = 3800;

/** Bienvenida en rojo de marca con el logotipo en rosa, como un cartel. */
export default function Welcome() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % lines.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);
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

        <View style={styles.hero}>
          <Animated.View key={index} entering={FadeIn.duration(450)} exiting={FadeOut.duration(250)} style={styles.lines}>
            <Txt variant="largeTitle" color={brand.pink} style={styles.setup} maxFontSizeMultiplier={1.2}>
              {lines[index][0]}
            </Txt>
            <Txt variant="title1" color={colors.white} style={styles.punch} maxFontSizeMultiplier={1.3}>
              {lines[index][1]}
            </Txt>
          </Animated.View>
          <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {lines.map((_, i) => (
              <View key={i} style={[styles.dot, i === index && styles.dotOn]} />
            ))}
          </View>
        </View>

        <Animated.View entering={FadeInDown.delay(200).duration(300)} style={styles.copy}>
          <Txt variant="body" color={colors.white}>
            Anti-swipe: ves lo que le gusta a la gente y le escribes. Sin match, sin esperar a que te elijan.
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
  hero: { flex: 1, justifyContent: 'center', gap: space.xl },
  lines: { gap: space.md, minHeight: 220, justifyContent: 'center' },
  setup: { fontFamily: fonts.poster, fontSize: 40, lineHeight: 44, letterSpacing: -1.2 },
  punch: { fontSize: 24, lineHeight: 30, letterSpacing: -0.5 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.45)' },
  dotOn: { width: 22, backgroundColor: colors.white },
  copy: { paddingBottom: space.xl },
  actions: { gap: space.md, paddingBottom: space.sm },
  legal: { paddingTop: space.xs, paddingHorizontal: space.lg },
  link: { textDecorationLine: 'underline' },
});
