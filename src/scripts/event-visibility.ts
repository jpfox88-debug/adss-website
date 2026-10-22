// Keeps "upcoming" accurate between builds (BRIEF §6). Pages render every event they might
// need with its end time and status as data attributes; this decides what to show using the
// visitor's clock. Without JavaScript the build-time split rendered in the HTML stands.

type Mode = 'upcoming' | 'past' | 'next';

const INACTIVE = new Set(['cancelled', 'postponed']);

function isPast(el: HTMLElement, now: number) {
  return Date.parse(el.dataset.end ?? '') <= now;
}

function apply(list: HTMLElement, now: number) {
  const mode = list.dataset.eventList as Mode;
  const items = Array.from(list.querySelectorAll<HTMLElement>('[data-event]'));
  let shown = 0;

  if (mode === 'next') {
    const next = items.find((el) => !isPast(el, now) && !INACTIVE.has(el.dataset.status ?? ''));
    items.forEach((el) => (el.hidden = el !== next));
    shown = next ? 1 : 0;
  } else {
    items.forEach((el) => {
      const show = mode === 'upcoming' ? !isPast(el, now) : isPast(el, now);
      el.hidden = !show;
      if (show) shown++;
    });
  }

  const empty = document.querySelector<HTMLElement>(`[data-event-empty="${list.id}"]`);
  if (empty) empty.hidden = shown > 0;
}

function applyEventPage(page: HTMLElement, now: number) {
  const past = isPast(page, now);
  page.querySelectorAll<HTMLElement>('[data-when="upcoming"]').forEach((el) => (el.hidden = past));
  page.querySelectorAll<HTMLElement>('[data-when="past"]').forEach((el) => (el.hidden = !past));
}

const now = Date.now();
document.querySelectorAll<HTMLElement>('[data-event-list]').forEach((list) => apply(list, now));
document.querySelectorAll<HTMLElement>('[data-event-page]').forEach((page) => applyEventPage(page, now));
