import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { statSync } from 'node:fs';
import path from 'node:path';
import { dubaiDate, dubaiDay, formatBytes, isInactive } from './site';

// For the launch build set EXCLUDE_PLACEHOLDERS=true in Netlify so that entries
// marked `placeholder: true` never reach the public site (BRIEF Section 13B).
const excludePlaceholders = process.env.EXCLUDE_PLACEHOLDERS === 'true';
const keep = (e: { data: { placeholder?: boolean } }) => !(excludePlaceholders && e.data.placeholder);

export async function getSettings() {
  return (await getEntry('settings', 'site'))!.data;
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

export async function getAlbums(): Promise<AlbumEntry[]> {
  const albums = await getCollection('albums', keep);
  return albums
    .map((a) => ({ ...a, date: dubaiDay(a.data.date) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
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
