import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Yelp-style task surfaces.

  Every task (archive + detail) now shares one cohesive premium identity:
  clean white surfaces, the signature Yelp red accent, hairline gray borders
  and a single crisp sans-serif — exactly like Yelp. Per-task copy (kicker /
  note) still varies so each section keeps a little voice, but the visual
  language is unified. Tokens are delivered via CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const PLATFORM_FONT = "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Professional platform palette — clean white surfaces, blue accent, light gray backgrounds.
const base = {
  dark: false,
  fontDisplay: PLATFORM_FONT,
  fontBody: PLATFORM_FONT,
  bg: '#f4f5f7',
  surface: '#ffffff',
  raised: '#f9fafb',
  text: '#111827',
  muted: '#6b7280',
  line: '#e2e5ea',
  accent: '#1d6fe8',
  accentSoft: '#eff6ff',
  onAccent: '#ffffff',
  glow: 'rgba(29,111,232,0.06)',
  radius: '0.75rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, professional insights, and business guides from across Southeast Asia.' },
  listing: { ...base, kicker: 'Businesses', note: 'Find, compare and connect with companies and service providers.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh opportunities and classified listings ready to act on.' },
  image: { ...base, kicker: 'Visuals', note: 'A visual gallery of standout images and creative content.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated resources and professional links worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports, and professional references.' },
  profile: { ...base, kicker: 'Professionals', note: 'Discover expert profiles and connect with industry leaders.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
