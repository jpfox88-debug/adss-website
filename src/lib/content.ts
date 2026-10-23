import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { statSync } from 'node:fs';
import path from 'node:path';
import { dubaiDate, dubaiDay, formatBytes, isInactive, isPlaceholder } from './site';

// For the launch build set EXCLUDE_PLACEHOLDERS=true in Cloudflare Pages so that entries
// marked `placeholder: true` never reach the public site (BRIEF Section 13B).
const excludePlaceholders = process.env.EXCLUDE_PLACEHOLDERS === 'true';
const keep = (e: { data: { placeholder?: boolean } }) => !(excludePlaceholders && e.data.placeholder);

export async function getSettings() {
  const s = (await getEntry('settings', 'site'))!.data;
  if (!excludePlaceholders) return s;
  // Optional contact details are left out of the launch build until they are supplied.
  // Required ones (email, WhatsApp, committee term) stay, so the launch gate reports them.
  return {
    ...s,
    phone: isPlaceholder(s.phone) ? undefined : s.phone,
    address: isPlaceholder(s.address) ? undefined : s.address,
    socials: s.socials.filter((so) => !isPlaceholder(so.url)),
  };
}

export async function getHome() {
  return (await getEntry('home', 'home'))!.data;
}

export async function getMembership() {
  return (await getEntry('membership', 'membership'))!.data;
}

export async function getCommittee() {
  return (await getCollection('committee', keep)).sort(
    (a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name),
  );
}

export type EventEntry = CollectionEntry<'events'> & { start: Date; end: Date };

/** All events, soonest first, with absolute start/end dates (Abu Dhabi time). */
export async function getEvents(): Promise<EventEntry[]> {
  const events = await getCollection('events', keep);
  return events
    .map((e) => ({ ...e, start: dubaiDate(e.data.start), end: dubaiDate(e.data.end) }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** Build-time split; the client script re-evaluates against the visitor's clock. */
export const isPastAtBuild = (e: EventEntry, now = new Date()) => e.end.getTime() <= now.getTime();
export const canBeNext = (e: EventEntry) => !isInactive(e.data.status);

export type AlbumEntry = CollectionEntry<'albums'> & { date: Date };

/** Albums of actual Society photos (placeholder albums are layout scaffolding only). */
export const isGenuineAlbum = (a: { data: { placeholder?: boolean } }) => !a.data.placeholder;

export async function getAlbums(): Promise<AlbumEntry[]> {
  const albums = await getCollection('albums', keep);
  return albums
    .map((a) => ({ ...a, date: dubaiDay(a.data.date) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

// ── Album photos: two shapes (docs/DECISIONS.md D15) ──
export type AlbumPhoto = AlbumEntry['data']['photos'][number];
/** Pre-sized photo stored unchanged in public/albums/ (imported albums, managed in the repo). */
export type StaticPhoto = Extract<AlbumPhoto, { src: string }>;
/** Photo uploaded through the CMS and resized by the Astro image pipeline. */
export type PipelinePhoto = Extract<AlbumPhoto, { image: unknown }>;

export const isStaticPhoto = (p: AlbumPhoto): p is StaticPhoto => 'src' in p;

/** How many photos a long album shows per page (/photos/<slug>/, /photos/<slug>/2/, …). */
export const PHOTOS_PER_PAGE = 60;
export const albumPageCount = (a: AlbumEntry) => Math.max(1, Math.ceil(a.data.photos.length / PHOTOS_PER_PAGE));

/**
 * The album cover in a form the templates can render: either the pipeline image, or the
 * pre-sized photo's thumb (grids) and full-size path (share image), with its dimensions
 * when the cover is one of the album's own photos.
 */
export function albumCover(a: AlbumEntry) {
  const cover = a.data.cover;
  if (typeof cover !== 'string') return { kind: 'image' as const, image: cover };
  const match = a.data.photos.find((p) => isStaticPhoto(p) && p.src === cover) as StaticPhoto | undefined;
  return {
    kind: 'static' as const,
    full: cover,
    thumb: match?.thumb ?? cover,
    width: match?.width,
    height: match?.height,
  };
}

export const DOCUMENT_CATEGORIES = {
  constitution: 'Constitution',
  'committee-minutes': 'Committee meeting minutes',
  agm: 'AGM minutes and reports',
  other: 'Other society documents',
} as const;

export async function getDocuments() {
  const docs = await getCollection('documents', keep);
  return docs
    .map((d) => {
      const filePath = path.join(process.cwd(), 'public', d.data.file);
      let size: string | null = null;
      try {
        size = formatBytes(statSync(filePath).size);
      } catch {
        // Missing file: the build keeps going but the listing shows no size.
        console.warn(`[downloads] File not found for "${d.data.title}": ${d.data.file}`);
      }
      const ext = path.extname(d.data.file).slice(1).toUpperCase() || 'FILE';
      return { ...d, date: dubaiDay(d.data.date), size, type: ext };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
