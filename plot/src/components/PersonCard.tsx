import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { postsOf, shared } from '@/store/selectors';
import { categories, colors, space } from '@/theme';
import type { Person, Post } from '@/types';
import { relative } from '@/utils/time';

import { Button } from './Button';
import { IdCard } from './IdCard';
import { postSummary, postTypeLabel } from './PostCard';
import { PressableScale } from './PressableScale';
import { SaveButton } from './SaveButton';
import { Txt } from './Txt';

type Props = { person: Person; myInterests: string[]; posts: Post[] };

/** Tarjeta grande de recomendación en Descubrir. */
export function PersonCard({ person, myInterests, posts }: Props) {
  const common = shared(myInterests, person.interests);
  const last = postsOf(posts, person.id)[0];
  const openProfile = () => router.push({ pathname: '/person/[id]', params: { id: person.id } });
  const write = () => router.push({ pathname: '/chat/[id]', params: { id: person.id } });

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${person.name}, ${person.age} años, ${person.hood}. Abrir perfil`}
      onPress={openProfile}
      scaleTo={0.985}
    >
      <IdCard
        id={person.id}
        name={person.name}
        age={person.age}
        verified={person.verified}
        color={person.color}
        place={`${person.hood} · a ${person.km.toLocaleString('es-ES')} km`}
        common={common}
        commonLabel="En común"
        highlight={person.reason ? { label: `Por qué ${person.name}`, text: person.reason } : { label: 'Bio', text: person.bio }}
        photoAction={<SaveButton personId={person.id} name={person.name} onPhoto />}
      >
        {last ? (
          <View style={styles.last}>
            <View style={[styles.lastDot, { backgroundColor: categories[last.category].solid }]} />
            <View style={styles.flex}>
              <Txt variant="caption" color={colors.text2}>
                ÚLTIMA PUBLICACIÓN · {postTypeLabel[last.type].toUpperCase()} · {relative(last.createdAt).toUpperCase()}
              </Txt>
              <Txt variant="subhead" numberOfLines={2}>
                {postSummary(last)}
              </Txt>
            </View>
          </View>
        ) : null}

        <View style={styles.actions}>
          <Button label="Ver perfil" variant="light" size="md" onPress={openProfile} flex />
          <Button label="Escribir" size="md" onPress={write} flex />
        </View>
      </IdCard>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  last: { flexDirection: 'row', gap: space.md, paddingHorizontal: space.xs },
  lastDot: { width: 10, height: 10, borderRadius: 5, marginTop: 3 },
  flex: { flex: 1, gap: 2 },
  actions: { flexDirection: 'row', gap: space.sm },
});
