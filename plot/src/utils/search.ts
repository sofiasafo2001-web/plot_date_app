import { postSummary } from '@/components/PostCard';
import type { Person, Post } from '@/types';

/** Minúsculas y sin tildes, para que «ciclísmo» o «MURAKAMI» también encuentren. */
export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

/** Por qué una persona aparece en la búsqueda: lo que se muestra en su tarjeta. */
export type SearchMatch = { label: string; text: string };

/**
 * Busca en lo que la persona comparte: intereses, bio, trabajo y publicaciones
 * (textos, canciones, rutas y sitios). Devuelve la primera coincidencia, o nada.
 */
export function matchPerson(person: Person, posts: Post[], query: string): SearchMatch | undefined {
  const q = normalize(query);
  if (!q) return undefined;
  const interest = person.interests.find((i) => normalize(i).includes(q));
  if (interest) return { label: 'Le gusta', text: interest };
  const post = posts.find(
    (p) =>
      p.authorId === person.id &&
      [p.text, p.tag, p.photoLabel, postSummary(p)].some((t) => t && normalize(t).includes(q)),
  );
  if (post) return { label: 'Ha publicado', text: postSummary(post) };
  if (normalize(person.bio).includes(q)) return { label: 'En su bio', text: person.bio };
  if (normalize(person.job).includes(q)) return { label: 'Trabaja de', text: person.job };
  return undefined;
}
