import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Ellipsis, Eye, MessageCircle, UserX } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AboutList } from '@/components/AboutList';
import { AppGlyph } from '@/components/AppGlyph';
import { Button } from '@/components/Button';
import { Chip, ChipRow } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { IconButton } from '@/components/IconButton';
import { IdCard } from '@/components/IdCard';
import { PostCard } from '@/components/PostCard';
import { SafetySheet } from '@/components/SafetySheet';
import { FlirtBubble } from '@/components/FlirtBubble';
import { SaveButton } from '@/components/SaveButton';
import { TextTabs } from '@/components/TextTabs';
import { Txt } from '@/components/Txt';
import { appInfo, appOrder } from '@/data/catalog';
import { others, personById, postsOf, shared } from '@/store/selectors';
import { useApp } from '@/store/useApp';
import { categories, categoryOrder, colors, gutter, hit, radius, space, type CategoryId } from '@/theme';
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
  const reason = !isMe && person?.reason ? person.reason : undefined;
  const write = (quote?: string) =>
    router.push({ pathname: '/chat/[id]', params: quote ? { id, quote } : { id } });

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + hit + space.md, paddingBottom: 120 + insets.bottom }}>
        <View style={styles.body}>
          {isMe ? (
            <View style={styles.preview}>
              <Eye size={16} color={colors.ink} />
              <Txt variant="footnoteStrong" color={colors.ink} style={styles.flex}>
                Así ven tu perfil los demás
              </Txt>
            </View>
          ) : null}

          <IdCard
            asHeader
            id={isMe ? 'me' : id}
            name={profile.name}
            age={profile.age}
            verified={profile.verified}
            color={profile.color}
            place={
              profile.hood +
              (profile.km !== undefined && !isMe ? ` · a ${profile.km.toLocaleString('es-ES')} km` : '') +
              (isMe ? (showDistance ? ' · distancia visible' : ' · distancia oculta') : '')
            }
            common={common}
            commonLabel={isMe ? 'Tus intereses' : 'En común contigo'}
            highlight={reason ? { label: `Por qué ${profile.name}`, text: reason } : { label: 'Bio', text: profile.bio }}
            photoAction={!isMe ? <SaveButton personId={id} name={profile.name} onPhoto /> : undefined}
          />

          <View style={styles.section}>
            <Txt variant="headline">{isMe ? 'Sobre ti' : `Sobre ${profile.name}`}</Txt>
            {reason ? <Txt variant="body">{profile.bio}</Txt> : null}
            <AboutList about={profile} own={isMe} />
          </View>

          {rest.length ? (
            <View style={styles.section}>
              <Txt variant="headline">También le gusta</Txt>
              <ChipRow>
                {rest.map((i) => (
                  <Chip key={i} label={i} />
                ))}
              </ChipRow>
            </View>
          ) : null}

          {profile.apps.length ? (
            <View style={styles.section}>
              <Txt variant="headline">Apps conectadas</Txt>
              <View style={styles.apps}>
                {profile.apps.map((a) => (
                  <View key={a} style={styles.appItem}>
                    <AppGlyph app={a} size={32} />
                    <Txt variant="subheadStrong">{appInfo[a].name}</Txt>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          <View style={styles.section}>
            <Txt variant="headline">Publicaciones</Txt>
            <View style={styles.tabsScroll}>
              <TextTabs
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
              <Txt variant="subhead" color={colors.text2} style={styles.emptyPosts}>
                {filter === 'all' ? 'Todavía no ha publicado nada.' : `Aún no ha publicado nada de ${categories[filter].label.toLowerCase()}. Pregúntale tú.`}
              </Txt>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.topBg, { height: insets.top + hit + space.sm }]} />
      <View style={[styles.topBar, { top: insets.top + space.xs }]}>
        <IconButton icon={ChevronLeft} label="Volver" onPress={() => router.back()} />
        {!isMe ? <IconButton icon={Ellipsis} label="Más opciones: silenciar, bloquear o reportar" onPress={() => setSafety(true)} /> : null}
      </View>

      <View style={[styles.sticky, { paddingBottom: Math.max(insets.bottom, space.md) }]}>
        {isMe ? (
          <Button label="Volver a mi perfil" variant="dark" onPress={() => router.back()} />
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
  root: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: gutter, gap: space.md },
  preview: { flexDirection: 'row', alignItems: 'center', gap: space.sm, backgroundColor: colors.pink, padding: space.md, borderRadius: radius.button },
  section: { gap: space.md, marginTop: space.md },
  apps: { flexDirection: 'row', flexWrap: 'wrap', gap: space.lg },
  appItem: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  emptyPosts: { paddingVertical: space.lg },
  tabsScroll: { marginHorizontal: -gutter },
  flex: { flex: 1 },
  topBar: { position: 'absolute', left: gutter, right: gutter, flexDirection: 'row', justifyContent: 'space-between' },
  topBg: { position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: 'rgba(255,255,255,0.9)' },
  sticky: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: gutter, paddingTop: space.md, backgroundColor: colors.bg, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
});
