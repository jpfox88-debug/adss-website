import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every collection is edited through the CMS at /admin (public/admin/config.yml).
// Keep field names here and in config.yml in sync.

// Event times are entered as Abu Dhabi local time, "YYYY-MM-DDTHH:mm" (no offset).
// YAML may also hand us a Date if an editor adds seconds; accept both.
const localDateTime = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/, 'Use YYYY-MM-DDTHH:mm (Abu Dhabi time)'),
  z.date().transform((d) => d.toISOString().slice(0, 16)),
]);

const localDate = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  z.date().transform((d) => d.toISOString().slice(0, 10)),
]);

// Entries marked as placeholders are layout scaffolding, never real content.
// See MISSING-CONTENT.md; they must be removed or excluded before launch.
const placeholder = z.boolean().default(false);

const optionalText = z.string().optional().nullable();

const settings = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/settings' }),
  schema: z.object({
    site_name: z.string(),
    tagline: optionalText,
    committee_term: z.string(),
    contact_email: z.string(),
    general_whatsapp: z.string(),
    phone: optionalText,
    address: optionalText,
    socials: z
      .array(z.object({ platform: z.string(), url: z.string() }))
      .default([]),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/home' }),
  schema: ({ image }) =>
    z.object({
      hero_image: image().optional().nullable(),
      hero_alt: optionalText,
      hero_heading: z.string(),
      hero_intro: z.string(),
      about_heading: z.string(),
      about_intro: z.string(),
      objectives: z.array(z.string()).default([]),
      committee_intro: z.string(),
    }),
});

const membership = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/membership' }),
  schema: z.object({
    intro: z.string(),
    eligibility: z.string(),
    period: z.string(),
    renewal: z.string(),
    how_to_join: z.string(),
    options: z
      .array(z.object({ name: z.string(), price_aed: z.string(), description: optionalText }))
      .default([]),
    benefits: z
      .array(z.object({ title: z.string(), description: optionalText }))
      .default([]),
    whatsapp_number: z.string(),
    whatsapp_message: z.string(),
    email: z.string(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

const committee = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/committee' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      photo: image().optional().nullable(),
      photo_alt: optionalText,
      contact_label: optionalText,
      contact_url: optionalText,
      order: z.number().default(100),
      placeholder,
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: optionalText,
      image: image().optional().nullable(),
      image_alt: optionalText,
      // Stock or artwork rather than a photo of the Society: shown with an "Illustrative image" caption.
      image_illustrative: z.boolean().default(false),
      start: localDateTime,
      end: localDateTime,
      venue: z.string(),
      address: optionalText,
      map_url: optionalText,
      eligibility: optionalText,
      dress_code: optionalText,
      price_member: optionalText,
      price_non_member: optionalText,
      booking_deadline: localDate.optional().nullable(),
      booking_method: z.enum(['url', 'whatsapp', 'email', 'none']).default('none'),
      booking_url: optionalText,
      booking_whatsapp: optionalText,
      booking_email: optionalText,
      booking_label: optionalText,
      status: z.enum(['open', 'sold-out', 'postponed', 'cancelled']).default('open'),
      albums: z.array(z.string()).default([]),
      placeholder,
    }),
});

// Album photos come in two shapes (docs/DECISIONS.md D15):
//  - pipeline photos: `{ image, alt, caption? }`, uploaded through the CMS to src/assets/uploads
//    and resized by Astro at build time;
//  - pre-sized photos: `{ src, thumb, width, height, alt, caption? }`, already resized and stored
//    unchanged in public/albums/<slug>/ (full/ max 2000px, thumb/ max 640px). Used for the
//    albums imported from the old site, which would otherwise put 600+ images through the
//    pipeline on every build. These are managed in the repo, not the CMS.
const staticAlbumPath = z.string().regex(/^\/albums\/[^\s]+\.(jpe?g|png|webp|avif)$/i, 'Use a path under /albums/');

const albums = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/albums' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: localDate,
      event: optionalText,
      cover: z.union([staticAlbumPath, image()]),
      cover_alt: z.string(),
      photos: z
        .array(
          z.union([
            z.object({
              src: staticAlbumPath,
              thumb: staticAlbumPath,
              width: z.number().int().positive(),
              height: z.number().int().positive(),
              alt: z.string(),
              caption: optionalText,
            }),
            z.object({ image: image(), alt: z.string(), caption: optionalText }),
          ]),
        )
        .default([]),
      videos: z.array(z.object({ url: z.string(), title: z.string() })).default([]),
      placeholder,
    }),
});

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['constitution', 'committee-minutes', 'agm', 'other']),
    date: localDate,
    file: z.string().regex(/^\/documents\//, 'Upload the file through the CMS'),
    current: z.boolean().default(false),
    summary: optionalText,
    placeholder,
  }),
});

export const collections = { settings, home, membership, committee, events, albums, documents };
