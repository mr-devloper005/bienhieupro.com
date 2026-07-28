import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  ChevronRight,
  FileText,
  MessageSquare,
  Search,
  Share2,
  Star,
  ThumbsUp,
  TrendingUp,
  Globe,
  Award,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ─────────────────────────── Quick-action icons ─────────────────────────── */
const quickActions = [
  { label: 'Read Articles', href: '/article', Icon: FileText, bg: '#eff6ff', color: '#1d6fe8' },
  { label: 'Trending Now', href: '/article', Icon: TrendingUp, bg: '#f0fdf4', color: '#16a34a' },
  { label: 'Expert Insights', href: '/article', Icon: Award, bg: '#faf5ff', color: '#9333ea' },
  { label: 'Premium Reads', href: '/article', Icon: Bookmark, bg: '#fffbeb', color: '#d97706' },
  { label: 'Search Articles', href: '/search', Icon: Search, bg: '#fff7ed', color: '#ea580c' },
  { label: 'Global News', href: '/article', Icon: Globe, bg: '#ecfeff', color: '#0891b2' },
  { label: 'Publish Article', href: '/create', Icon: Share2, bg: '#fff1f2', color: '#e11d48' },
  { label: 'Contact Us', href: '/contact', Icon: MessageSquare, bg: '#f5f3ff', color: '#7c3aed' },
] as const

/* ───────────────────────── SECTION 1: Hero / Icon grid ───────────────────── */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const heroImages = latestPostImages(pool)

  return (
    <section className="bg-[var(--slot4-dark-bg)]">
      <div className={`py-6 sm:py-8 ${container}`}>
        {/* White card with icon grid */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.15)] sm:p-8">
          <div className="grid grid-cols-4 gap-3 sm:gap-5 md:grid-cols-8">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group flex flex-col items-center gap-2 text-center transition duration-200 hover:scale-105"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition duration-200 group-hover:shadow-lg sm:h-16 sm:w-16"
                  style={{ background: action.bg, color: action.color }}
                >
                  <action.Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <span className="text-[10px] font-semibold leading-tight text-[#374151] sm:text-[11px]">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Hero image strip (subtle preview of latest posts) */}
        {heroImages.length >= 3 ? (
          <div className="mt-4 hidden gap-2 overflow-hidden rounded-xl md:flex" style={{ height: '72px' }}>
            {heroImages.slice(0, 4).map((img, i) => (
              <div key={img} className={`relative overflow-hidden rounded-lg ${i === 0 ? 'flex-[2]' : 'flex-1'}`}>
                <img src={img} alt="" className="h-full w-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-[var(--slot4-dark-bg)]/40" />
              </div>
            ))}
            <div className="flex flex-1 items-center justify-center rounded-lg bg-white/10 text-center">
              <Link href={primaryRoute} className="text-xs font-bold text-white underline-offset-2 hover:underline">
                Latest on {SITE_CONFIG.name} →
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ──────────────── SECTION 2: Featured Posts + Sidebar ────────────────────── */
function FeaturedCard({ post, href, large = false }: { post: SitePost; href: string; large?: boolean }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  const excerpt = getExcerpt(post, large ? 160 : 100)

  if (large) {
    return (
      <Link href={href} className="group relative block overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(0,0,0,0.85))]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          {category ? <span className="cat-badge mb-2 inline-block">{category}</span> : null}
          <h3 className="editable-display line-clamp-3 text-lg font-bold leading-snug text-white sm:text-xl">
            {post.title}
          </h3>
          {excerpt ? <p className="mt-2 line-clamp-2 text-sm text-white/80">{excerpt}</p> : null}
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group flex gap-3 overflow-hidden rounded-lg border border-[var(--editable-border)] bg-white p-3 transition duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        {category ? <span className="cat-badge mb-1 inline-block">{category}</span> : null}
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--slot4-muted-text)]">{excerpt}</p>
      </div>
    </Link>
  )
}

function SidebarPostRow({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className="group flex gap-3 py-3 transition hover:opacity-80">
      <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </p>
        <p className="mt-1 line-clamp-1 text-[11px] text-[var(--slot4-muted-text)]">
          {categoryOf(post) || SITE_CONFIG.name}
        </p>
      </div>
    </Link>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const allPosts = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const featured = allPosts.slice(0, 5)
  const sidebarPosts = allPosts.slice(5, 10)
  if (!allPosts.length) return null

  const [hero, ...restFeatured] = featured

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-8 sm:py-10 ${container}`}>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--slot4-page-text)]">Featured Posts</h2>
              <Link href={primaryRoute} className="flex items-center gap-1 text-sm font-medium text-[var(--slot4-accent)] hover:underline">
                Read More <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {hero ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <FeaturedCard post={hero} href={postHref(primaryTask, hero, primaryRoute)} large />
                </div>
                <div className="flex flex-col gap-3 sm:col-span-1">
                  {restFeatured.slice(0, 3).map((post) => (
                    <FeaturedCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Join Platform CTA */}
            <div className="rounded-xl border border-[var(--editable-border)] bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h3 className="text-base font-bold text-[var(--slot4-page-text)]">Join {SITE_CONFIG.name}</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
                Stay informed with professional articles, expert insights, and business knowledge from across Southeast Asia.
              </p>
              <Link
                href="/signup"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-[var(--slot4-accent)] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-95"
              >
                Sign up now
              </Link>
            </div>

            {/* Pro Content list */}
            {sidebarPosts.length ? (
              <div className="rounded-xl border border-[var(--editable-border)] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[var(--slot4-page-text)]">Pro Content</h3>
                    <span className="premium-badge">Premium</span>
                  </div>
                  <Link href={primaryRoute} className="text-[11px] font-semibold text-[var(--slot4-accent)] hover:underline">
                    View all
                  </Link>
                </div>
                <div className="mt-2 divide-y divide-[var(--editable-border)]">
                  {sidebarPosts.map((post) => (
                    <SidebarPostRow
                      key={post.id || post.slug}
                      post={post}
                      href={postHref(primaryTask, post, primaryRoute)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── SECTION 3: Latest Posts Carousel ───────────────── */
function LatestPostCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  const excerpt = getExcerpt(post, 110)
  const rating = ratingOf(post)
  const filledStars = Math.round(rating)

  return (
    <article className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 cat-badge">{category}</span>
        ) : null}
      </div>
      <div className="p-4">
        <Link href={href} className="group/link">
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-[var(--slot4-page-text)] transition group-hover/link:text-[var(--slot4-accent)]">
            {post.title}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className={`h-3 w-3 ${i < filledStars ? 'fill-[#f59e0b] text-[#f59e0b]' : 'fill-[#e5e7eb] text-[#e5e7eb]'}`} />
            ))}
          </span>
          <span className="text-[11px] font-semibold text-[var(--slot4-muted-text)]">{rating.toFixed(1)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[var(--slot4-muted-text)]">{excerpt}</p>
        <Link href={href} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--slot4-accent)] hover:underline">
          Read more <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="flex items-center gap-4 border-t border-[var(--editable-border)] px-4 py-2.5">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--slot4-muted-text)]">
          <ThumbsUp className="h-3.5 w-3.5" /> Helpful
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--slot4-muted-text)]">
          <MessageSquare className="h-3.5 w-3.5" /> Comment
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--slot4-muted-text)]">
          <Share2 className="h-3.5 w-3.5" /> Share
        </span>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const allPosts = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  const latestPosts = allPosts.slice(0, 12)
  if (!latestPosts.length) return null

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`py-8 sm:py-10 ${container}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--slot4-page-text)]">Latest Posts</h2>
          <Link href={primaryRoute} className="flex items-center gap-1 text-sm font-medium text-[var(--slot4-accent)] hover:underline">
            Read More <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div className="post-rail">
          {latestPosts.map((post) => (
            <LatestPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────── SECTION 4: Category Sections ──────────────────────────── */
function CategoryPostCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const excerpt = getExcerpt(post, 100)
  const author = (post?.content as Record<string, unknown> | undefined)
  const authorName = typeof author?.author === 'string' ? author.author : SITE_CONFIG.name

  return (
    <article className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
            {post.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-[var(--slot4-muted-text)]">{excerpt}</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-[var(--slot4-accent-soft)] ring-1 ring-[var(--slot4-accent)]/20" />
            <span className="truncate text-[11px] font-medium text-[var(--slot4-muted-text)]">{authorName}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string; color?: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Latest articles', color: '#1d6fe8' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month', color: '#16a34a' },
  index: { eyebrow: 'Evergreen reads', title: 'From the archive', color: '#d97706' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((s) => s.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore', color: '#1d6fe8' }
        const accentColor = copy.color || '#1d6fe8'
        const tasks = SITE_CONFIG.tasks.filter((t) => t.enabled)
        const taskLabel = tasks.find((t) => t.key === primaryTask)?.label || 'Posts'

        return (
          <section key={section.key} className="bg-[var(--slot4-page-bg)]">
            <div className={`py-6 sm:py-8 ${container}`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-4 w-1 rounded-full"
                    style={{ background: accentColor }}
                  />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                      {copy.eyebrow}
                    </p>
                    <h2 className="mt-0.5 text-lg font-bold text-[var(--slot4-page-text)]">
                      {copy.title}
                    </h2>
                  </div>
                </div>
                <Link
                  href={section.href || primaryRoute}
                  className="flex items-center gap-1 text-sm font-medium hover:underline"
                  style={{ color: accentColor }}
                >
                  Read More <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Horizontal scroll */}
              <div className="post-rail">
                {section.posts.slice(0, 8).map((post) => (
                  <CategoryPostCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(primaryTask, post, primaryRoute)}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="mt-6 border-t border-[var(--editable-border)]" />
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ─────────────────────── SECTION 5: CTA Band ────────────────────────────── */
export function EditableHomeCta() {
  return (
    <>
      {/* Publish CTA banner */}
      <section className="bg-[var(--slot4-page-bg)]">
        <div className={`pb-8 sm:pb-10 ${container}`}>
          <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#1d6fe8_0%,#1e40af_100%)] p-8 sm:p-10">
            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -right-4 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-lg">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Get published on {SITE_CONFIG.name}
                </h2>
                <p className="mt-3 text-base text-white/85">
                  Build credibility with professionals, entrepreneurs, and businesses across Southeast Asia. Publishing is fast, easy, and free to start.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1d6fe8] transition hover:brightness-95"
                >
                  Publish an Article
                </Link>
                <Link
                  href="/article"
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Browse Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investors / Listings spotlight */}
      <section className="bg-[var(--slot4-page-bg)]">
        <div className={`pb-10 sm:pb-12 ${container}`}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[var(--editable-border)] bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eff6ff]">
                <TrendingUp className="h-6 w-6 text-[#1d6fe8]" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[var(--slot4-page-text)]">Stay Ahead</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
                Get the latest business insights, market trends, and professional knowledge from across Southeast Asia.
              </p>
              <Link href="/article" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1d6fe8] hover:underline">
                Read articles <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl border border-[var(--editable-border)] bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdf4]">
                <TrendingUp className="h-6 w-6 text-[#16a34a]" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[var(--slot4-page-text)]">Trending Articles</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
                Explore the most-read articles, in-depth guides, and market insights curated for professionals this week.
              </p>
              <Link href="/article" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#16a34a] hover:underline">
                Read more <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl border border-[var(--editable-border)] bg-white p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#faf5ff]">
                <Share2 className="h-6 w-6 text-[#9333ea]" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[var(--slot4-page-text)]">Share Your Story</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">
                Write and publish your article to reach thousands of professionals and business leaders across Southeast Asia.
              </p>
              <Link href="/create" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#9333ea] hover:underline">
                Start writing <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
