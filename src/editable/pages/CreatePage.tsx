'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass =
  'w-full rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-gray,#f9fafb)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-muted-text)] focus:border-[var(--slot4-accent)] focus:bg-white focus:ring-2 focus:ring-[var(--slot4-accent)]/10'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(
    () => SITE_CONFIG.tasks.filter((t) => t.enabled && t.key !== 'listing'),
    []
  )
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--slot4-gray,#f9fafb)] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="flex min-h-56 items-center justify-center bg-[var(--slot4-accent,#1d6fe8)] p-10">
                <Lock className="h-14 w-14 text-white opacity-75" />
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
                <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">{pagesContent.create.locked.title}</h1>
                <p className="mt-4 text-[15px] leading-7 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95">
                    Login <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-gray,#f9fafb)] text-[var(--slot4-page-text)]">

        {/* Page header */}
        <div className="border-b border-[var(--editable-border)] bg-white">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">{pagesContent.create.hero.title}</h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
          </div>
        </div>

        <div className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

            {/* Sidebar */}
            <aside className="space-y-4">
              {/* Task type selector — only rendered when multiple task types are enabled */}
              {enabledTasks.length > 1 ? (
                <div className="rounded-2xl border border-[var(--editable-border)] bg-white p-5 shadow-sm">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">Content type</p>
                  <div className="grid gap-2">
                    {enabledTasks.map((item) => {
                      const Icon = taskIcon[item.key] || FileText
                      const active = item.key === task
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setTask(item.key)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                            active
                              ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent-soft,#eff6ff)] text-[var(--slot4-accent)]'
                              : 'border-[var(--editable-border)] bg-white text-[var(--slot4-page-text)] hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-gray,#f9fafb)]'
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <div className="min-w-0">
                            <span className="block text-sm font-semibold">{item.label}</span>
                            {item.description ? <span className="mt-0.5 block text-xs text-[var(--slot4-muted-text)]">{item.description}</span> : null}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              {/* Author card */}
              <div className="rounded-2xl border border-[var(--editable-border)] bg-white p-5 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">Publishing as</p>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft,#eff6ff)] text-sm font-bold text-[var(--slot4-accent)]">
                    {session.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{session.name}</p>
                    {session.email ? <p className="mt-0.5 truncate text-xs text-[var(--slot4-muted-text)]">{session.email}</p> : null}
                  </div>
                </div>
              </div>
            </aside>

            {/* Form */}
            <form onSubmit={submit} className="rounded-2xl border border-[var(--editable-border)] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 border-b border-[var(--editable-border)] pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">New {activeTask?.label || 'Article'}</p>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.02em]">{pagesContent.create.formTitle}</h2>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Title *</label>
                  <input className={fieldClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Category</label>
                    <input className={fieldClass} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Technology" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Source URL</label>
                    <input className={fieldClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Featured image URL</label>
                  <input className={fieldClass} value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Summary *</label>
                  <textarea className={`${fieldClass} min-h-24 resize-y`} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Short description of this post" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Main content *</label>
                  <textarea className={`${fieldClass} min-h-48 resize-y`} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Full content, details, or description" required />
                </div>
              </div>

              {created ? (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}
                  </p>
                  <p className="mt-1 text-sm text-emerald-700">{created.title}</p>
                </div>
              ) : null}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-8 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </EditableSiteShell>
  )
}
