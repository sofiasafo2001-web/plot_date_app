import { router } from 'expo-router';
import { ArrowRight, Bookmark } from 'lucide-react-native';
import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { EmptyState } from '@/components/EmptyState';
import { postSummary, postTypeLabel } from '@/components/PostCard';
import { PressableScale } from '@/components/PressableScale';
import { LargeHeader } from '@/components/ScreenHeader';
import { Txt } from '@/components/Txt';
import { TAB_BAR_SPACE } from '@/components/TabBar';
import { lookingForLabel } from '@/data/catalog';
import { personById, postsOf } from '@/store/selectors';
import { useApp } from '@/store/useApp';
import { toast } from '@/store/useToast';
import { colors, gutter, radius, space } from '@/theme';
import type { Person, Post } from '@/types';
import { tapLight } from '@/utils/haptics';
import { relative } from '@/utils/time';

type Row = { person: Person; savedAt: string; last?: Post; fresh: number };

/** Guardados: los perfiles que te interesan, con lo último que han subido. Como un «siguiendo». */
export default function Saved() {
  const saved = useApp((s) => s.saved);
  const posts = useApp((s) => s.posts);
  const blocked = useApp((s) => s.blocked);
  const toggleSaved = useApp((s) => s.toggleSaved);

  const rows = useMemo<Row[]>(
    () =>
      saved
        .filter((x) => !blocked.includes(x.id))
        .map((x): Row | undefined => {
          const person = personById(x.id);
          if (!person) return undefined;
          const theirs = postsOf(posts, x.id);
          return { person, savedAt: x.at, last: theirs[0], fresh: theirs.filter((p) => p.createdAt > x.at).length };
        })
        .filter((r): r is Row => !!r)
        // Primero quien ha subido algo más reciente.
        .sort((a, b) => (b.last?.createdAt ?? '').localeCompare(a.last?.createdAt ?? '')),
    [saved, posts, blocked],
  );

  const unsave = (p: Person) => {
    tapLight();
    toggleSaved(p.id);
    toast(`${p.name} ya no está en Guardados`, { undo: () => toggleSaved(p.id) });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <FlatList
        data={rows}
        keyExtractor={(r) => r.person.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListHeaderComponent={
          <LargeHeader
            title="Guardados"
            subtitle={rows.length ? `${rows.length} ${rows.length === 1 ? 'perfil' : 'perfiles'} que no quieres perder de vista` : undefined}
          />
        }
        renderItem={({ item }) => <SavedCard row={item} onUnsave={() => unsave(item.person)} />}
        ListEmptyComponent={
          <EmptyState
            icon={Bookmark}
            title="Aún no has guardado a nadie"
            text="Toca el marcador junto al nombre de un perfil para guardarlo. Aquí verás lo que sube sin tener que escribirle todavía."
            actionLabel="Ir a Descubrir"
            onAction={() => router.navigate('/discover')}
          />
        }
      />
    </SafeAreaView>
  );
}

function SavedCard({ row, onUnsave }: { row: Row; onUnsave: () => void }) {
  const { person, last, fresh } = row;
  const open = () => router.push({ pathname: '/person/[id]', params: { id: person.id } });
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${person.name}, ${person.age}. ${fresh ? `${fresh} publicaciones nuevas. ` : ''}Abrir perfil`}
      onPress={open}
      scaleTo={0.985}
      style={styles.card}
    >
      <View style={styles.head}>
        <Avatar photoId={person.id} name={person.name} color={person.color} size={56} verified={person.verified} />
        <View style={styles.flex}>
          <Txt variant="title2" numberOfLines={1}>
            {person.name}, {person.age}
          </Txt>
          <Txt variant="subhead" color={colors.text2} numberOfLines={1}>
            {person.job} · {lookingForLabel[person.lookingFor]}
          </Txt>
        </View>
        <PressableScale accessibilityRole="button" accessibilityLabel={`Quitar a ${person.name} de Guardados`} onPress={onUnsave} hitSlop={8} style={styles.save}>
          <Bookmark size={19} color={colors.white} fill={colors.white} />
        </PressableScale>
      </View>

      <View style={styles.body}>
        {last ? (
          <>
            <View style={styles.lastHead}>
              <Txt variant="caption" color={colors.text2} style={styles.flex}>
                {postTypeLabel[last.type].toUpperCase()} · {relative(last.createdAt).toUpperCase()}
              </Txt>
              {fresh ? (
                <View style={styles.fresh}>
                  <Txt variant="caption" color={colors.white}>
                    {fresh === 1 ? '1 NUEVA' : `${fresh} NUEVAS`}
                  </Txt>
                </View>
              ) : null}
            </View>
            <Txt variant="body" numberOfLines={2}>
              {postSummary(last)}
            </Txt>
          </>
        ) : (
          <Txt variant="subhead" color={colors.text2}>
            Todavía no ha publicado nada.
          </Txt>
        )}
        <View style={styles.more}>
          <Txt variant="caption">VER PERFIL</Txt>
          <ArrowRight size={14} color={colors.ink} strokeWidth={2.2} />
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  list: { paddingBottom: TAB_BAR_SPACE },
  sep: { height: space.md },
  card: { marginHorizontal: gutter, borderRadius: radius.card, backgroundColor: colors.card, paddingHorizontal: space.lg, paddingVertical: space.lg },
  head: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingBottom: space.lg, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  flex: { flex: 1 },
  save: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  body: { paddingTop: space.lg, gap: space.sm },
  lastHead: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  fresh: { backgroundColor: colors.brandRed, borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4 },
  more: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: space.sm },
});
