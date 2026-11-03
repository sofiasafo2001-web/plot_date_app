import { router } from 'expo-router';
import { BadgeCheck } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { shared } from '@/store/selectors';
import { colors, radius, space } from '@/theme';
import type { Person, Post } from '@/types';

import { Button } from './Button';
import { Chip, ChipRow } from './Chip';
import { PressableScale } from './PressableScale';
import { ProfilePhoto } from './ProfilePhoto';
import { SaveButton } from './SaveButton';
import { Txt } from './Txt';

const MAX_COMMON = 4;

type Props = { person: Person; myInterests: string[]; posts: Post[] };

/**
 * Tarjeta de Descubrir (modo oscuro): foto grande arriba con el marcador de guardar,
 * nombre, lo que tenéis en común y, en rosa, por qué os parecéis.
 */
export function PersonCard({ person, myInterests }: Props) {
  const common = shared(myInterests, person.interests);
  const shown = common.slice(0, MAX_COMMON);
  const openProfile = () => router.push({ pathname: '/person/[id]', params: { id: person.id } });
  const write = () => router.push({ pathname: '/chat/[id]', params: { id: person.id } });
  const why = person.reason ? { label: `Por qué ${person.name}`, text: person.reason } : { label: 'Bio', text: person.bio };

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${person.name}, ${person.age} años, ${person.hood}. Abrir perfil`}
      onPress={openProfile}
      scaleTo={0.985}
      style={styles.card}
    >
      <View>
        <ProfilePhoto id={person.id} name={person.name} color={person.color} style={styles.photo} />
        <View style={styles.save}>
          <SaveButton personId={person.id} name={person.name} onPhoto />
        </View>
      </View>

      <View style={styles.body}>
        <View>
          <View style={styles.nameRow}>
            <Txt variant="title1" color={colors.dark.text} style={styles.shrink}>
              {person.name}, {person.age}
            </Txt>
            {person.verified ? <BadgeCheck size={22} color={colors.white} fill={colors.info} accessibilityLabel="Verificado" /> : null}
          </View>
          <Txt variant="subhead" color={colors.dark.text2}>
            {person.hood} · a {person.km.toLocaleString('es-ES')} km
          </Txt>
        </View>

        {shown.length ? (
          <View style={styles.block}>
            <Txt variant="caption" color={colors.dark.text2}>
              EN COMÚN
            </Txt>
            <ChipRow>
              {shown.map((i) => (
                <Chip key={i} label={i} solid size="sm" dark />
              ))}
            </ChipRow>
          </View>
        ) : null}

        <View style={styles.why}>
          <Txt variant="caption" color={colors.ink}>
            {why.label.toUpperCase()}
          </Txt>
          <Txt variant="body" color={colors.ink}>
            {why.text}
          </Txt>
        </View>

        <View style={styles.actions}>
          <Button label="Ver perfil" variant="outlineLight" size="md" onPress={openProfile} flex />
          <Button label="Escribir" size="md" onPress={write} flex />
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.dark.card, borderRadius: radius.cardLg, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.dark.line, padding: space.md },
  photo: { width: '100%', aspectRatio: 1.65, borderRadius: radius.card - 4 },
  save: { position: 'absolute', top: space.sm, right: space.sm },
  body: { paddingHorizontal: space.xs, paddingTop: space.lg, paddingBottom: space.xs, gap: space.lg },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shrink: { flexShrink: 1 },
  block: { gap: space.sm },
  why: { backgroundColor: colors.pink, borderRadius: radius.card - 6, padding: space.lg, gap: 6 },
  actions: { flexDirection: 'row', gap: space.sm },
});
