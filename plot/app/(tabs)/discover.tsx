import { router } from 'expo-router';
import { Search, SearchX, SlidersHorizontal } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { StatusBarStyle } from '@/components/StatusBarStyle';
import { IconButton } from '@/components/IconButton';
import { Input } from '@/components/Input';
import { PersonCard } from '@/components/PersonCard';
import { PressableScale } from '@/components/PressableScale';
import { TextTabs } from '@/components/TextTabs';
import { LargeHeader } from '@/components/ScreenHeader';
import { Txt } from '@/components/Txt';
import { TAB_BAR_SPACE } from '@/components/TabBar';
import { people } from '@/data/seed';
import { defaultFilters, useApp } from '@/store/useApp';
import { toast } from '@/store/useToast';
import { categories, categoryOrder, colors, gutter, space } from '@/theme';
import { tapLight } from '@/utils/haptics';
import { filtersActive, rankPeople, type DiscoverTab } from '@/utils/rank';
import { matchPerson, type SearchMatch } from '@/utils/search';

const tabs: { value: DiscoverTab; label: string }[] = [
  { value: 'forYou', label: 'Para ti' },
  ...categoryOrder.map((c) => ({ value: c as DiscoverTab, label: categories[c].label })),
];

export default function Discover() {
  const me = useApp((s) => s.me);
  const posts = useApp((s) => s.posts);
  const blocked = useApp((s) => s.blocked);
  const filters = useApp((s) => s.filters);
  const setFilters = useApp((s) => s.setFilters);
  const seed = useApp((s) => s.discoverSeed);
  const shuffle = useApp((s) => s.shuffleDiscover);
  const [tab, setTab] = useState<DiscoverTab>('forYou');
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const searching = query.trim().length > 0;

  const ranked = useMemo(
    () =>
      rankPeople(
        people.filter((p) => !p.hiddenFromDiscover && !blocked.includes(p.id)),
        me.interests,
        // Al buscar se mira en todas las categorías.
        searching ? 'forYou' : tab,
        filters,
        seed,
      ),
    [blocked, me.interests, tab, filters, seed, searching],
  );
  const matches = useMemo(() => {
    const m: Record<string, SearchMatch> = {};
    if (!searching) return m;
    ranked.forEach((p) => {
      const hit = matchPerson(p, posts, query);
      if (hit) m[p.id] = hit;
    });
    return m;
  }, [ranked, posts, query, searching]);
  const list = searching ? ranked.filter((p) => matches[p.id]) : ranked;
  const active = filtersActive(filters, defaultFilters);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      shuffle();
      setRefreshing(false);
      toast('Gente nueva a la vista :)');
    }, 900);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBarStyle style="light" />
      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brandRed} colors={[colors.brandRed]} />}
        ListHeaderComponent={
          <View>
            <LargeHeader
              title="Descubrir"
              dark
              subtitle={
                searching
                  ? `${list.length} ${list.length === 1 ? 'resultado' : 'resultados'} para «${query.trim()}»`
                  : `${list.length} ${list.length === 1 ? 'persona afín' : 'personas afines'} · ${me.hood}`
              }
              right={
                <View>
                  <IconButton icon={SlidersHorizontal} label="Filtros" onPress={() => router.push('/filters')} tone={active ? 'glass' : 'outlineLight'} />
                </View>
              }
            />
            <View style={styles.search}>
              <Input
                value={query}
                onChangeText={setQuery}
                placeholder="Busca un interés, un libro, un plan…"
                left={<Search size={18} color={colors.text3} />}
                returnKeyType="search"
                clearButtonMode="while-editing"
                accessibilityLabel="Buscar personas por intereses o por lo que publican"
                autoCorrect={false}
                autoCapitalize="none"
                pill
              />
            </View>
            {!searching ? (
              <View style={styles.tabs}>
                <TextTabs tabs={tabs} value={tab} onChange={setTab} dark />
              </View>
            ) : null}
            {active ? (
              <View style={styles.activeRow}>
                <Txt variant="footnote" color={colors.dark.text2} style={styles.flex}>
                  Hasta {filters.maxKm} km · {filters.minAge}–{filters.maxAge} años{filters.verifiedOnly ? ' · solo verificados' : ''}
                </Txt>
                <PressableScale
                  accessibilityRole="button"
                  accessibilityLabel="Quitar filtros"
                  onPress={() => {
                    tapLight();
                    setFilters({ ...defaultFilters });
                    toast('Filtros restablecidos');
                  }}
                  style={styles.clear}
                >
                  <Txt variant="footnoteStrong" color={colors.dark.text} style={styles.underline}>
                    Quitar filtros
                  </Txt>
                </PressableScale>
              </View>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <PersonCard person={item} myInterests={me.interests} posts={posts} match={matches[item.id]} />
          </View>
        )}
        ListEmptyComponent={
          searching ? (
            <EmptyState
              dark
              icon={SearchX}
              title={`Nadie habla de «${query.trim()}» todavía`}
              text="Sé tú quien saque el tema: publícalo y a ver quién se anima. ;)"
              actionLabel="Borrar búsqueda"
              onAction={() => setQuery('')}
            />
          ) : (
            <EmptyState
              dark
              icon={SearchX}
              title="Nadie cumple tantos requisitos :("
              text="Ni en las pelis. Amplía la distancia o la edad, o mira otra categoría."
              actionLabel="Restablecer filtros"
              onAction={() => {
                setFilters({ ...defaultFilters });
                setTab('forYou');
              }}
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark.bg },
  underline: { textDecorationLine: 'underline' },
  list: { paddingBottom: TAB_BAR_SPACE },
  tabs: { paddingBottom: space.lg },
  search: { paddingHorizontal: gutter, paddingBottom: space.md },
  gap: { height: space.xl },
  activeRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: gutter, paddingBottom: space.md, gap: space.sm },
  flex: { flex: 1 },
  clear: { minHeight: 44, justifyContent: 'center', paddingHorizontal: space.sm },
  cardWrap: { paddingHorizontal: gutter },
});
