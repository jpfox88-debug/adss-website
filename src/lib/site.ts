// Shared helpers for content display. Kept framework-free so they can be unit-checked.

/** UAE has no daylight saving: Abu Dhabi is always UTC+04:00. */
export const DUBAI_OFFSET = '+04:00';
export const TIME_ZONE = 'Asia/Dubai';

/** "2026-12-01T19:00" (Abu Dhabi local) → absolute Date. */
export function dubaiDate(local: string): Date {
  const withSeconds = local.length === 16 ? `${local}:00` : local.slice(0, 19);
  return new Date(`${withSeconds}${DUBAI_OFFSET}`);
}

/** "2026-12-01" → absolute Date at midnight Abu Dhabi time. */
export function dubaiDay(day: string): Date {
  return new Date(`${day}T00:00:00${DUBAI_OFFSET}`);
}

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, ...opts });

const dayFmt = fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const shortDayFmt = fmt({ day: 'numeric', month: 'short', year: 'numeric' });
const monthYearFmt = fmt({ month: 'long', year: 'numeric' });
const timeFmt = fmt({ hour: 'numeric', minute: '2-digit', hour12: true });

export const formatDay = (d: Date) => dayFmt.format(d);
export const formatShortDay = (d: Date) => shortDayFmt.format(d);
export const formatMonthYear = (d: Date) => monthYearFmt.format(d);
export const formatTime = (d: Date) => timeFmt.format(d).replace(' ', '').toLowerCase();

/** "7:00pm – 11:30pm", or with the end date when the event runs past midnight into another day's listing. */
export function formatTimeRange(start: Date, end: Date): string {
  const sameDay = formatShortDay(start) === formatShortDay(end);
  return sameDay
    ? `${formatTime(start)} – ${formatTime(end)}`
    : `${formatTime(start)} – ${formatTime(end)} (${formatShortDay(end)})`;
}

/** Day-of-month and short month for date badges, in Abu Dhabi time. */
export function dateParts(d: Date) {
  return {
    day: fmt({ day: 'numeric' }).format(d),
    month: fmt({ month: 'short' }).format(d),
    weekday: fmt({ weekday: 'short' }).format(d),
  };
}

/** Any value still containing a [SQUARE BRACKET] marker is an unconfirmed placeholder. */
export const isPlaceholder = (value?: string | null) => !value || /\[[^\]]+\]/.test(value);

/** Normalise "+971 50 123 4567" → "971501234567" for wa.me; null if it isn't a usable number. */
export function waNumber(value?: string | null): string | null {
  if (isPlaceholder(value)) return null;
  const digits = value!.replace(/[^\d]/g, '').replace(/^00/, '');
  return digits.length >= 8 ? digits : null;
}

export function waLink(number?: string | null, message?: string | null): string | null {
  const n = waNumber(number);
  if (!n) return null;
  return message ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : `https://wa.me/${n}`;
}

export function mailLink(email?: string | null, subject?: string): string | null {
  if (isPlaceholder(email) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email!)) return null;
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

export function safeUrl(url?: string | null): string | null {
  if (isPlaceholder(url)) return null;
  return /^(https?:|mailto:|tel:)/.test(url!) ? url! : null;
}

export type EventStatus = 'open' | 'sold-out' | 'postponed' | 'cancelled';

export const STATUS_LABEL: Record<EventStatus, string> = {
  open: 'Bookings open',
  'sold-out': 'Sold out',
  postponed: 'Postponed',
  cancelled: 'Cancelled',
};

/** Statuses that can never be the homepage "next event". */
export const isInactive = (status: EventStatus) => status === 'cancelled' || status === 'postponed';

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** YouTube/Vimeo link → privacy-enhanced embed URL (no autoplay). Null for anything else. */
export function videoEmbed(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([\da-f]+))?/);
  if (vimeo) {
    const hash = vimeo[2] ? `h=${vimeo[2]}&` : '';
    return `https://player.vimeo.com/video/${vimeo[1]}?${hash}dnt=1`;
  }
  return null;
}
