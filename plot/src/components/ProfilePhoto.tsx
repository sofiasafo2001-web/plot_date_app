import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { avatarPhotos } from '@/data/photos';
import { colors, type CategoryId } from '@/theme';

import { Aura, auraFor } from './Aura';
import { Txt } from './Txt';

type Props = { id: string; name: string; color: CategoryId; style?: StyleProp<ViewStyle> };

/** Foto de perfil en formato retrato. Si no carga, muestra el aura de la persona con sus iniciales. */
export function ProfilePhoto({ id, name, color, style }: Props) {
  const [failed, setFailed] = useState(false);
  const photo = !failed ? avatarPhotos[id] : undefined;
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <View style={[styles.wrap, style]} accessible accessibilityRole="image" accessibilityLabel={`Foto de ${name}`}>
      <Aura palette={auraFor(id, color)} />
      {photo ? (
        <Image source={photo as never} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} onError={() => setFailed(true)} />
      ) : (
        <Txt variant="largeTitle" color={colors.ink} style={styles.initials} maxFontSizeMultiplier={1}>
          {initials}
        </Txt>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.fill },
  initials: { fontSize: 44, lineHeight: 48 },
});
