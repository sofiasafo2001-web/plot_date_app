import { Archivo_400Regular } from '@expo-google-fonts/archivo/400Regular';
import { Archivo_500Medium } from '@expo-google-fonts/archivo/500Medium';
import { Archivo_600SemiBold } from '@expo-google-fonts/archivo/600SemiBold';
import { Archivo_700Bold } from '@expo-google-fonts/archivo/700Bold';
import { Archivo_800ExtraBold } from '@expo-google-fonts/archivo/800ExtraBold';
import { Archivo_900Black } from '@expo-google-fonts/archivo/900Black';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LucideProvider } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastHost } from '@/components/Toast';
import { useApp } from '@/store/useApp';
import { colors, fonts, iconStroke } from '@/theme';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const sheet = {
  presentation: 'formSheet' as const,
  sheetGrabberVisible: true,
  sheetCornerRadius: 28,
  headerShown: false,
  contentStyle: { backgroundColor: colors.bg },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Archivo_800ExtraBold,
    Archivo_900Black,
  });
  const hydrated = useApp((s) => s.hydrated);
  const loggedIn = useApp((s) => s.loggedIn);
  const ready = (fontsLoaded || !!fontError) && hydrated;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={[styles.root, Platform.OS === 'web' && styles.webFrame]}>
      <SafeAreaProvider>
        <LucideProvider strokeWidth={iconStroke} color={colors.ink}>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.bg },
              headerTintColor: colors.ink,
              headerTitleStyle: { fontFamily: fonts.semibold, color: colors.ink },
              headerLargeTitleStyle: { fontFamily: fonts.display, color: colors.ink },
              headerBackButtonDisplayMode: 'minimal',
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Protected guard={!loggedIn}>
              <Stack.Screen name="welcome" options={{ animation: 'fade' }} />
              <Stack.Screen name="login" />
            </Stack.Protected>
            <Stack.Screen name="legal" options={{ ...sheet, sheetAllowedDetents: [0.75, 1] }} />
            <Stack.Screen name="onboarding" />
            <Stack.Protected guard={loggedIn}>
              <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
              <Stack.Screen name="person/[id]" />
              <Stack.Screen name="chat/[id]" />
              <Stack.Screen name="compose" options={{ presentation: 'modal', contentStyle: { backgroundColor: colors.bg } }} />
              <Stack.Screen name="filters" options={{ ...sheet, sheetAllowedDetents: [0.8, 1] }} />
              <Stack.Screen name="post/[id]" options={{ ...sheet, sheetAllowedDetents: [0.85, 1] }} />
              <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
              <Stack.Screen name="report/[id]" options={{ ...sheet, sheetAllowedDetents: [0.85, 1] }} />
              <Stack.Screen
                name="settings/index"
                options={{ headerShown: true, title: 'Ajustes', headerLargeTitle: true, contentStyle: { backgroundColor: colors.bg }, headerStyle: { backgroundColor: colors.bg }, headerLargeStyle: { backgroundColor: colors.bg } }}
              />
              <Stack.Screen
                name="settings/blocked"
                options={{ headerShown: true, title: 'Usuarios bloqueados', contentStyle: { backgroundColor: colors.bg }, headerStyle: { backgroundColor: colors.bg } }}
              />
              <Stack.Screen
                name="settings/safety"
                options={{ headerShown: true, title: 'Centro de seguridad', headerLargeTitle: true, contentStyle: { backgroundColor: colors.bg }, headerStyle: { backgroundColor: colors.bg }, headerLargeStyle: { backgroundColor: colors.bg } }}
              />
            </Stack.Protected>
          </Stack>
          <ToastHost />
        </LucideProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  // Solo en la versión web de prueba: en un ordenador se ve con ancho de móvil.
  webFrame: { width: '100%', maxWidth: 440, alignSelf: 'center', overflow: 'hidden', borderLeftWidth: StyleSheet.hairlineWidth, borderRightWidth: StyleSheet.hairlineWidth, borderColor: colors.line },
});
