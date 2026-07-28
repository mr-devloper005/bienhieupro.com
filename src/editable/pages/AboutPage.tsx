import Link from 'next/link'
import { ArrowRight, Building2, FileText, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        {/* Hero */}
        <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] text-white">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/60">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{pagesContent.about.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/article"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
              >
                Browse Articles <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Story */}
            <article className="rounded-2xl border border-[var(--editable-border)] bg-white p-8 lg:p-10">
              <h2 className="editable-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Our story</h2>
              <div className="mt-5 space-y-5 text-[15px] leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {/* Stats strip */}
              <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl bg-[var(--slot4-page-bg)] p-5">
                {[
                  { label: 'Articles', value: '1,000+', icon: FileText, color: '#1d6fe8' },
                  { label: 'Listings', value: '500+', icon: Building2, color: '#16a34a' },
                  { label: 'Profiles', value: '200+', icon: UserRound, color: '#9333ea' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${color}18` }}>
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                    <p className="text-xl font-bold text-[var(--slot4-page-text)]">{value}</p>
                    <p className="text-xs text-[var(--slot4-muted-text)]">{label}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Values */}
            <aside className="space-y-4">
              {pagesContent.about.values.map((value, i) => {
                const colors = ['#1d6fe8', '#16a34a', '#9333ea']
                const bgs = ['#eff6ff', '#f0fdf4', '#faf5ff']
                const color = colors[i % colors.length]
                const bg = bgs[i % bgs.length]
                return (
                  <div
                    key={value.title}
                    className="rounded-xl border border-[var(--editable-border)] bg-white p-6"
                  >
                    <div
                      className="mb-3 h-1 w-8 rounded-full"
                      style={{ background: color }}
                    />
                    <h3 className="editable-display text-lg font-bold tracking-[-0.01em]">{value.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                )
              })}

              {/* CTA card */}
              <div className="rounded-xl bg-[var(--slot4-dark-bg)] p-6 text-white">
                <h3 className="font-bold">Ready to get started?</h3>
                <p className="mt-2 text-sm text-white/75">
                  Join Southeast Asia&apos;s professional platform and start connecting with the business community.
                </p>
                <Link
                  href="/signup"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-95"
                >
                  Create account <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
