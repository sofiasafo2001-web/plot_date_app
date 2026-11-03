import { router } from 'expo-router';
import { BadgeCheck, MapPin, Sparkles } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { postsOf, shared } from '@/store/selectors';
import { categories, colors, radius, space } from '@/theme';
import type { Person, Post } from '@/types';
import { relative } from '@/utils/time';

import { Aura, auraFor } from './Aura';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Chip, ChipRow } from './Chip';
import { postSummary, postTypeLabel } from './PostCard';
import { PressableScale } from './PressableScale';
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
      style={styles.card}
    >
      <View style={styles.cover}>
        <Aura palette={auraFor(person.id, person.color)} />
      </View>
      <View style={styles.avatar}>
        <Avatar photoId={person.id} name={person.name} color={person.color} size={88} verified={person.verified} badge bordered />
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Txt variant="title2">
            {person.name}, {person.age}
          </Txt>
          {person.verified ? <BadgeCheck size={20} color={colors.white} fill={colors.info} accessibilityLabel="Verificado" /> : null}
        </View>
        <View style={styles.meta}>
          <MapPin size={14} color={colors.text2} />
          <Txt variant="subhead" color={colors.text2}>
            {person.hood} · a {person.km.toLocaleString('es-ES')} km
          </Txt>
        </View>

        <View style={styles.why}>
          <View style={styles.whyHead}>
            <Sparkles size={15} color={colors.ink} />
            <Txt variant="caption" color={colors.text2}>
              POR QUÉ {person.name.toUpperCase()}
            </Txt>
          </View>
          <Txt variant="subhead" color={colors.ink}>
            {person.reason}
          </Txt>
        </View>

        {common.length ? (
          <View style={styles.block}>
            <Txt variant="caption" color={colors.text2}>
              EN COMÚN
            </Txt>
            <ChipRow>
              {common.map((i) => (
                <Chip key={i} label={i} solid size="sm" />
              ))}
            </ChipRow>
          </View>
        ) : null}

        {last ? (
          <View style={styles.last}>
            <View style={[styles.lastDot, { backgroundColor: categories[last.category].solid }]} />
            <View style={styles.flex}>
              <Txt variant="caption" color={categories[last.category].ink}>
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
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.cardLg, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  cover: { height: 120, overflow: 'hidden' },
  avatar: { position: 'absolute', top: 72, left: space.lg },
  body: { paddingHorizontal: space.lg, paddingBottom: space.lg, paddingTop: 44, gap: space.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: -space.sm },
  why: { backgroundColor: colors.bg, borderRadius: radius.tile, padding: space.md, gap: 6 },
  whyHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  block: { gap: space.sm },
  last: { flexDirection: 'row', gap: space.md, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line, paddingTop: space.md },
  lastDot: { width: 10, height: 10, borderRadius: 5, marginTop: 3 },
  flex: { flex: 1, gap: 2 },
  actions: { flexDirection: 'row', gap: space.sm },
});
