import { router, useLocalSearchParams } from 'expo-router';
import { BadgeCheck, ChevronLeft, Ellipsis, Eye, MessageCircle, UserX } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AboutList } from '@/components/AboutList';
import { AppGlyph } from '@/components/AppGlyph';
import { Button } from '@/components/Button';
import { Chip, ChipRow } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { IconButton } from '@/components/IconButton';
import { PostCard } from '@/components/PostCard';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import { StatusBarStyle } from '@/components/StatusBarStyle';
import { SafetySheet } from '@/components/SafetySheet';
import { FlirtBubble } from '@/components/FlirtBubble';
import { SaveButton } from '@/components/SaveButton';
import { TextTabs } from '@/components/TextTabs';
import { Txt } from '@/components/Txt';
import { appInfo, appOrder } from '@/data/catalog';
import { others, personById, postsOf, shared } from '@/store/selectors';
import { useApp } from '@/store/useApp';
import { categories, categoryOrder, colors, gutter, radius, space, type CategoryId } from '@/theme';
import type { AppId, Post } from '@/types';

type Filter = 'all' | CategoryId;

const filterTabs: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todo' },
  ...categoryOrder.map((c) => ({ value: c as Filter, label: categories[c].label })),
];

const matches = (p: Post, f: Filter) => f === 'all' || p.category === f;

export default function PersonProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const me = useApp((s) => s.me);
  const myApps = useApp((s) => s.apps);
  const posts = useApp((s) => s.posts);
  const blocked = useApp((s) => s.blocked);
  const showDistance = useApp((s) => s.settings.showDistance);
  const [filter, setFilter] = useState<Filter>('all');
  const [safety, setSafety] = useState(false);
  const [bubble, setBubble] = useState(false);
  const sendMessage = useApp((s) => s.sendMessage);

  const isMe = id === 'me';
  const person = isMe ? undefined : personById(id);

  const profile = useMemo(() => {
    if (isMe) {
      return {
        name: me.name,
        age: me.age,
        hood: me.hood,
        km: showDistance ? 0 : undefined,
        verified: true,
        bio: me.bio,
        interests: me.interests,
        apps: appOrder.filter((a) => myApps[a]) as AppId[],
        color: me.color,
        origin: me.origin,
        job: me.job,
        lookingFor: me.lookingFor,
      };
    }
    if (!person) return undefined;
    return { ...person, km: person.km as number | undefined };
  }, [isMe, me, myApps, person, showDistance]);

  const theirPosts = useMemo(() => postsOf(posts, isMe ? 'me' : id), [posts, isMe, id]);
  const visible = theirPosts.filter((p) => matches(p, filter));

  if (!profile || (!isMe && blocked.includes(id))) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + space.xl }]}>
        <EmptyState icon={UserX} title="Perfil no disponible" text="Has bloqueado a esta persona o ya no está en PLOT." actionLabel="Volver" onAction={() => router.back()} />
      </View>
    );
  }

  const common = isMe ? profile.interests : shared(me.interests, profile.interests);
  const rest = isMe ? [] : others(me.interests, profile.interests);
  const write = (quote?: string) =>
    router.push({ pathname: '/chat/[id]', params: quote ? { id, quote } : { id } });

  const heroH = Math.round(Math.min(height * 0.52, 460));

  return (
    <View style={styles.root}>
      <StatusBarStyle style="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}>
        <ProfilePhoto id={isMe ? 'me' : id} name={profile.name} color={profile.color} style={{ height: heroH + 28 }} />

        <View style={styles.sheet}>
          {isMe ? (
            <View style={styles.preview}>
              <Eye size={16} color={colors.ink} />
              <Txt variant="footnoteStrong" color={colors.ink} style={styles.flex}>
                Así ven tu perfil los demás
              </Txt>
            </View>
          ) : null}

          <View>
            <View style={styles.nameRow}>
              <Txt variant="title1" color={colors.dark.text} accessibilityRole="header" style={styles.shrink}>
                {profile.name}, {profile.age}
              </Txt>
              {profile.verified ? <BadgeCheck size={22} color={colors.white} fill={colors.info} accessibilityLabel="Perfil verificado" /> : null}
            </View>
            <Txt variant="subhead" color={colors.dark.text2}>
              {profile.hood}
              {profile.km !== undefined && !isMe ? ` · a ${profile.km.toLocaleString('es-ES')} km` : ''}
              {isMe ? (showDistance ? ' · distancia visible' : ' · distancia oculta') : ''}
            </Txt>
          </View>

          <View style={styles.why}>
            <Txt variant="caption" color={colors.ink}>
              {isMe ? 'TU BIO' : 'BIO'}
            </Txt>
            <Txt variant="body" color={colors.ink}>
              {profile.bio}
            </Txt>
          </View>

          <View style={styles.panel}>
            <Txt variant="caption" color={colors.dark.text2}>
              {isMe ? 'TUS INTERESES' : 'EN COMÚN CONTIGO'}
            </Txt>
            {common.length ? (
              <ChipRow>
                {common.map((i) => (
                  <Chip key={i} label={i} solid size="sm" dark />
                ))}
              </ChipRow>
            ) : (
              <Txt variant="subhead" color={colors.dark.text2}>
                Nada en común… de momento. Dale un giro. ;)
              </Txt>
            )}
          </View>

          <View style={styles.block}>
            <Txt variant="caption" color={colors.dark.text2}>
              {isMe ? 'SOBRE TI' : `SOBRE ${profile.name.toUpperCase()}`}
            </Txt>
            <AboutList about={profile} own={isMe} dark />
          </View>

          {rest.length ? (
            <View style={styles.panel}>
              <Txt variant="caption" color={colors.dark.text2}>
                TAMBIÉN LE GUSTA
              </Txt>
              <ChipRow>
                {rest.map((i) => (
                  <Chip key={i} label={i} size="sm" dark />
                ))}
              </ChipRow>
            </View>
          ) : null}

          {profile.apps.length ? (
            <View style={styles.panel}>
              <Txt variant="caption" color={colors.dark.text2}>
                APPS CONECTADAS
              </Txt>
              <View style={styles.apps}>
                {profile.apps.map((a) => (
                  <View key={a} style={styles.appItem}>
                    <AppGlyph app={a} size={32} />
                    <Txt variant="subheadStrong" color={colors.dark.text}>
                      {appInfo[a].name}
                    </Txt>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View style={styles.block}>
            <Txt variant="caption" color={colors.dark.text2}>
              PUBLICACIONES
            </Txt>
            <View style={styles.tabsScroll}>
              <TextTabs
                dark
                tabs={filterTabs.map((t) => ({
                  ...t,
                  count: t.value === 'all' ? theirPosts.length : theirPosts.filter((p) => p.category === t.value).length,
                }))}
                value={filter}
                onChange={setFilter}
              />
            </View>
            {visible.length ? (
              visible.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  sharedTag={!!p.tag && me.interests.includes(p.tag)}
                  onReply={isMe ? undefined : () => write(p.id)}
                />
              ))
            ) : (
              <Txt variant="subhead" color={colors.dark.text2} style={styles.emptyPosts}>
                {filter === 'all' ? 'Aún no ha publicado nada. Misterio total.' : `Aún no ha publicado nada de ${categories[filter].label.toLowerCase()}. Pregúntale tú.`}
              </Txt>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.topBar, { top: insets.top + space.xs }]}>
        <IconButton icon={ChevronLeft} label="Volver" tone="glassDark" onPress={() => router.back()} />
        {!isMe ? (
          <View style={styles.topRight}>
            <SaveButton personId={id} name={profile.name} onDark />
            <IconButton icon={Ellipsis} label="Más opciones: silenciar, bloquear o reportar" tone="glassDark" onPress={() => setSafety(true)} />
          </View>
        ) : null}
      </View>

      <View style={[styles.sticky, { paddingBottom: Math.max(insets.bottom, space.md) }]}>
        {isMe ? (
          <Button label="Volver a mi perfil" variant="light" onPress={() => router.back()} />
        ) : (
          <Button
            label={filter === 'all' ? `Iniciar chat con ${profile.name}` : `Iniciar chat · ${categories[filter].label}`}
            icon={MessageCircle}
            onPress={() => setBubble(true)}
          />
        )}
      </View>

      {person ? (
        <FlirtBubble
          visible={bubble}
          person={person}
          topic={filter === 'all' ? 'general' : filter}
          onClose={() => setBubble(false)}
          onSend={(questionId, text) => {
            setBubble(false);
            sendMessage(id, { text, questionId });
            router.push({ pathname: '/chat/[id]', params: { id } });
          }}
          onWriteOwn={(text) => {
            setBubble(false);
            router.push({ pathname: '/chat/[id]', params: { id, draft: text } });
          }}
        />
      ) : null}
      {!isMe ? <SafetySheet personId={id} visible={safety} onClose={() => setSafety(false)} onBlocked={() => {
        router.dismissAll();
        router.navigate('/discover');
      }} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark.bg },
  sheet: {
    marginTop: -28,
    backgroundColor: colors.dark.bg,
    borderTopLeftRadius: radius.cardLg,
    borderTopRightRadius: radius.cardLg,
    paddingHorizontal: gutter,
    paddingTop: space.xl,
    gap: space.lg,
  },
  preview: { flexDirection: 'row', alignItems: 'center', gap: space.sm, backgroundColor: colors.pink, padding: space.md, borderRadius: radius.button },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shrink: { flexShrink: 1 },
  block: { gap: space.md },
  panel: { gap: space.md, backgroundColor: colors.dark.card, borderRadius: radius.card - 4, padding: space.lg },
  why: { backgroundColor: colors.pink, borderRadius: radius.card - 6, padding: space.lg, gap: 6 },
  apps: { flexDirection: 'row', flexWrap: 'wrap', gap: space.lg },
  appItem: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  emptyPosts: { paddingVertical: space.lg },
  tabsScroll: { marginHorizontal: -gutter },
  flex: { flex: 1 },
  topBar: { position: 'absolute', left: gutter, right: gutter, flexDirection: 'row', justifyContent: 'space-between' },
  topRight: { flexDirection: 'row', gap: space.sm },
  sticky: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: gutter, paddingTop: space.md, backgroundColor: colors.dark.bg, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.dark.line },
});
