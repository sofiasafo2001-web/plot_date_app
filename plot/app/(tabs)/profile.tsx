import { router } from 'expo-router';
import { Eye, ImagePlus, Pencil, Plus, Settings } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AboutList } from '@/components/AboutList';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { IconButton } from '@/components/IconButton';
import { IdCard } from '@/components/IdCard';
import { PostTile } from '@/components/PostTile';
import { LargeHeader } from '@/components/ScreenHeader';
import { Txt } from '@/components/Txt';
import { TAB_BAR_SPACE } from '@/components/TabBar';
import { postsOf } from '@/store/selectors';
import { useApp } from '@/store/useApp';
import { colors, gutter, space } from '@/theme';
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
          right={
            <>
              <IconButton icon={Plus} label="Publicar" tone="primary" onPress={() => router.push('/compose')} />
              <IconButton icon={Settings} label="Ajustes" onPress={() => router.push('/settings')} />
            </>
          }
        />
        <View style={styles.section}>
          <IdCard
            id="me"
            name={me.name}
            age={me.age}
            verified
            color={me.color}
            place={`${me.hood}, Barcelona`}
            common={me.interests}
            commonLabel="Tus intereses"
            maxCommon={8}
            highlight={{ label: 'Tu bio', text: me.bio }}
          />
          <AboutList about={me} own />
          <Button label="Publicar algo" icon={Plus} onPress={() => router.push('/compose')} accessibilityHint="Comparte una foto, un estado, una canción, una ruta o un sitio" />
          <View style={styles.actions}>
            <Button label="Editar perfil" icon={Pencil} variant="secondary" size="md" flex onPress={() => router.push('/edit-profile')} />
            <Button label="Cómo me ven" icon={Eye} variant="dark" size="md" flex onPress={() => router.push({ pathname: '/person/[id]', params: { id: 'me' } })} />
          </View>
          <Txt variant="footnote" color={colors.text3} align="center">
            Sin likes ni seguidores. Guardar a alguien es privado: nadie sabe que le has guardado.
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
          <EmptyState icon={ImagePlus} title="Aún no has publicado nada" text="Comparte una canción, una ruta o un sitio que te guste." actionLabel="Crear publicación" onAction={() => router.push('/compose')} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: TAB_BAR_SPACE },
  section: { paddingHorizontal: gutter, paddingTop: space.lg, gap: space.md },
  actions: { flexDirection: 'row', gap: space.sm },
  gridHead: { flexDirection: 'row', alignItems: 'baseline', gap: space.sm, paddingHorizontal: gutter, paddingTop: space.xl, paddingBottom: space.md },
  grid: { paddingHorizontal: gutter, gap: 4 },
  gridRow: { flexDirection: 'row', gap: 4 },
  filler: { flex: 1 },
});
