import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { toPlainText } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) =>
  typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) =>
  post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? (content.images.find((item) => typeof item === 'string') as string | undefined) : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const summaryOf = (post: SitePost) => {
  const content = getContent(post)
  return toPlainText(
    (typeof post.summary === 'string' && post.summary) ||
      compactRaw(content.description) ||
      compactRaw(content.excerpt) ||
      compactRaw(content.body) ||
      '',
  )
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : ''].some(
    (value) => compactText(value).includes(query),
  )
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const category = compactRaw(getContent(post).category) || post.tags?.[0] || ''
  const wide = index % 5 === 0

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] ${wide ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${wide ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.65))]" />
          <span className="absolute left-3 top-3 cat-badge">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-4 sm:p-5">
        {!image ? (
          <span className="mb-3 cat-badge inline-block">{taskLabel}</span>
        ) : null}
        {category && image ? (
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{category}</p>
        ) : null}
        <h2 className="editable-display line-clamp-2 text-[15px] font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h2>
        {summary ? (
          <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-[var(--slot4-muted-text)]">{summary}</p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--slot4-accent)]">
          Open result <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined,
  )
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] text-white">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">{pagesContent.search.hero.badge}</p>
                <h1 className="editable-display mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl">
                  {pagesContent.search.hero.title}
                </h1>
                <p className="mt-4 max-w-md text-base leading-7 text-white/75">{pagesContent.search.hero.description}</p>
              </div>

              {/* Search form */}
              <div className="self-end rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <form action="/search" className="space-y-3">
                  <input type="hidden" name="master" value="1" />
                  <label className="flex items-center gap-2.5 rounded-xl border border-[var(--editable-border)] bg-white px-4 py-3">
                    <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                    <input
                      name="q"
                      defaultValue={query}
                      placeholder={pagesContent.search.hero.placeholder}
                      className="min-w-0 flex-1 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
                    />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-white px-4 py-3">
                      <Filter className="h-4 w-4 text-[var(--slot4-muted-text)]" />
                      <input
                        name="category"
                        defaultValue={category}
                        placeholder="Category"
                        className="min-w-0 flex-1 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
                      />
                    </label>
                    <select
                      name="task"
                      defaultValue={task}
                      className="rounded-xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm text-[var(--slot4-page-text)] outline-none"
                    >
                      <option value="">All content types</option>
                      {enabledTasks.map((item) => (
                        <option key={item.key} value={item.key}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent)] text-sm font-bold text-white transition hover:brightness-95"
                    type="submit"
                  >
                    <Search className="h-4 w-4" /> Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
                {results.length} results
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-[-0.01em]">
                {query ? `Results for "${query}"` : pagesContent.search.resultsTitle}
              </h2>
            </div>
            <Link
              href="/article"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
            >
              Browse latest <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => (
                <SearchResultCard key={post.id || post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--editable-border)] bg-white px-8 py-14 text-center">
              <Search className="mx-auto h-10 w-10 text-[var(--slot4-muted-text)]" />
              <p className="mt-4 text-lg font-bold">No matching posts found.</p>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, content type, or category.</p>
              <Link
                href="/article"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
              >
                Browse all articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
