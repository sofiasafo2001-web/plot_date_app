import { router } from 'expo-router';
import { BadgeCheck, Eye, ImagePlus, Pencil, Plus, Settings } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AboutList } from '@/components/AboutList';
import { Button } from '@/components/Button';
import { Chip, ChipRow } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { IconButton } from '@/components/IconButton';
import { PostTile } from '@/components/PostTile';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import { LargeHeader } from '@/components/ScreenHeader';
import { Txt } from '@/components/Txt';
import { TAB_BAR_SPACE } from '@/components/TabBar';
import { postsOf } from '@/store/selectors';
import { useApp } from '@/store/useApp';
import { colors, gutter, radius, space } from '@/theme';
import type { Post } from '@/types';

export default function MyProfile() {
  const me = useApp((s) => s.me);
  const posts = useApp((s) => s.posts);
  const mine = postsOf(posts, 'me');
  const rows: Post[][] = [];
  for (let i = 0; i < mine.length; i += 3) rows.push(mine.slice(i, i + 3));

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <LargeHeader
          title="Perfil"
          subtitle="Así te ven"
          right={
            <>
              <IconButton icon={Plus} label="Publicar" tone="dark" onPress={() => router.push('/compose')} />
              <IconButton icon={Settings} label="Ajustes" onPress={() => router.push('/settings')} />
            </>
          }
        />
        <View style={styles.section}>
          <View style={styles.head}>
            <ProfilePhoto id="me" name={me.name} color={me.color} style={styles.photo} />
            <View style={styles.flex}>
              <View style={styles.nameRow}>
                <Txt variant="title1" style={styles.shrink}>
                  {me.name}, {me.age}
                </Txt>
                <BadgeCheck size={22} color={colors.white} fill={colors.info} accessibilityLabel="Perfil verificado" />
              </View>
              <Txt variant="subhead" color={colors.text2}>
                {me.hood}, Barcelona
              </Txt>
            </View>
          </View>

          <View style={styles.block}>
            <Txt variant="caption" color={colors.text2}>
              TUS INTERESES
            </Txt>
            <ChipRow>
              {me.interests.map((i) => (
                <Chip key={i} label={i} solid size="sm" />
              ))}
            </ChipRow>
          </View>

          <View style={styles.bio}>
            <Txt variant="caption">TU BIO</Txt>
            <Txt variant="body">{me.bio}</Txt>
          </View>

          <AboutList about={me} own />

          <View style={styles.actions}>
            <Button label="Editar perfil" icon={Pencil} variant="outline" size="md" flex onPress={() => router.push('/edit-profile')} />
            <Button label="Cómo me ven" icon={Eye} variant="dark" size="md" flex onPress={() => router.push({ pathname: '/person/[id]', params: { id: 'me' } })} />
          </View>
          <Txt variant="footnote" color={colors.text3} align="center">
            Sin likes ni seguidores: aquí nadie publica para aparentar. Y guardar a alguien es privado. ;)
          </Txt>
        </View>

        <View style={styles.gridHead}>
          <Txt variant="title2">Mis publicaciones</Txt>
          <Txt variant="subhead" color={colors.text3}>
            {mine.length}
          </Txt>
        </View>
        {mine.length ? (
          <View style={styles.grid}>
            {rows.map((row, r) => (
              <View key={r} style={styles.gridRow}>
                {row.map((p) => (
                  <PostTile key={p.id} post={p} onPress={() => router.push({ pathname: '/post/[id]', params: { id: p.id } })} />
                ))}
                {row.length < 3 ? Array.from({ length: 3 - row.length }).map((_, i) => <View key={`f${i}`} style={styles.filler} />) : null}
              </View>
            ))}
          </View>
        ) : (
          <EmptyState icon={ImagePlus} title="Aún no has publicado nada" text="Sube lo que te dé la gana, como si subes a tu gato. :P" actionLabel="Crear publicación" onAction={() => router.push('/compose')} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: TAB_BAR_SPACE },
  section: { paddingHorizontal: gutter, gap: space.lg },
  head: { flexDirection: 'row', alignItems: 'flex-end', gap: space.lg },
  photo: { width: 126, height: 126, borderRadius: radius.tile },
  flex: { flex: 1, gap: 2, paddingBottom: space.xs },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shrink: { flexShrink: 1 },
  block: { gap: space.sm },
  bio: { backgroundColor: colors.pink, borderRadius: radius.card - 4, padding: space.lg, gap: 6 },
  actions: { flexDirection: 'row', gap: space.sm },
  gridHead: { flexDirection: 'row', alignItems: 'baseline', gap: space.sm, paddingHorizontal: gutter, paddingTop: space.xl, paddingBottom: space.md },
  grid: { paddingHorizontal: gutter, gap: 4 },
  gridRow: { flexDirection: 'row', gap: 4 },
  filler: { flex: 1 },
});
