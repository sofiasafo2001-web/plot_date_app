import { useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useCallback } from 'react';

/** Cambia el color de la barra de estado mientras la pantalla está visible (claro en las pantallas grafito). */
export function StatusBarStyle({ style }: { style: 'light' | 'dark' }) {
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle(style);
      return () => setStatusBarStyle('dark');
    }, [style]),
  );
  return null;
}
