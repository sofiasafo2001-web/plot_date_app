import { BadgeCheck, MapPin, Sparkles } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, space, type CategoryId } from '@/theme';

import { Chip, ChipRow } from './Chip';
import { ProfilePhoto } from './ProfilePhoto';
import { Txt } from './Txt';

const MAX_COMMON = 4;

type Props = {
  id: string;
  name: string;
  age: number;
  verified: boolean;
  color: CategoryId;
  /** Barrio y distancia, ya formateados. */
  place: string;
  /** Intereses en común (o los tuyos, en tu propio perfil). */
  common: string[];
  commonLabel: string;
  /** Bloque destacado bajo la ficha: por qué os parecéis, o la bio. */
  highlight?: { label: string; text: string };
  /** Acción sobre la foto (guardar). */
  photoAction?: ReactNode;
  /** Contenido extra al final de la tarjeta (última publicación, botones…). */
  children?: ReactNode;
  /** Nombre como encabezado de pantalla (en el perfil completo). */
  asHeader?: boolean;
  /** Cuántos intereses caben antes del «+N». */
  maxCommon?: number;
};

/**
 * Perfil en formato «carné»: foto en retrato a la izquierda, nombre y lo que tenéis
 * en común a la derecha, y debajo el porqué de la recomendación.
 */
export function IdCard({ id, name, age, verified, color, place, common, commonLabel, highlight, photoAction, children, asHeader, maxCommon = MAX_COMMON }: Props) {
  const shown = common.slice(0, maxCommon);
  const more = common.length - shown.length;
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.photoCol}>
          <ProfilePhoto id={id} name={name} color={color} style={styles.photo} />
          {photoAction ? <View style={styles.photoAction}>{photoAction}</View> : null}
        </View>

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Txt variant="title1" accessibilityRole={asHeader ? 'header' : undefined} style={styles.shrink}>
              {name}, {age}
            </Txt>
            {verified ? <BadgeCheck size={22} color={colors.white} fill={colors.info} accessibilityLabel="Perfil verificado" /> : null}
          </View>
          <View style={styles.meta}>
            <MapPin size={14} color={colors.text2} />
            <Txt variant="footnote" color={colors.text2} style={styles.shrink}>
              {place}
            </Txt>
          </View>

          <View style={styles.divider} />

          <Txt variant="caption" color={colors.text2}>
            {commonLabel.toUpperCase()}
          </Txt>
          {shown.length ? (
            <ChipRow>
              {shown.map((i) => (
                <Chip key={i} label={i} solid size="sm" />
              ))}
              {more > 0 ? (
                <Txt variant="footnoteStrong" color={colors.text2} style={styles.more}>
                  +{more}
                </Txt>
              ) : null}
            </ChipRow>
          ) : (
            <Txt variant="footnote" color={colors.text2}>
              Aún nada. Quizá descubras algo nuevo.
            </Txt>
          )}
        </View>
      </View>

      {highlight ? (
        <View style={styles.highlight}>
          <View style={styles.hlHead}>
            <Sparkles size={14} color={colors.primaryInk} />
            <Txt variant="caption" color={colors.primaryInk}>
              {highlight.label.toUpperCase()}
            </Txt>
          </View>
          <Txt variant="subhead" color={colors.ink}>
            {highlight.text}
          </Txt>
        </View>
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.cardLg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: space.md,
    gap: space.md,
    overflow: 'hidden',
  },
  top: { flexDirection: 'row', gap: space.md },
  photoCol: { width: '42%' },
  photo: { width: '100%', aspectRatio: 3 / 4, borderRadius: radius.card - 4 },
  photoAction: { position: 'absolute', top: space.sm, right: space.sm },
  info: { flex: 1, gap: 6, paddingTop: space.xs },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5, flexWrap: 'wrap' },
  shrink: { flexShrink: 1 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.line, marginVertical: space.xs },
  more: { alignSelf: 'center' },
  highlight: { backgroundColor: colors.primarySoft, borderRadius: radius.card - 6, padding: space.md, gap: 4 },
  hlHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
