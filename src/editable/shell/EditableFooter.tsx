'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <img src="/favicon.png" alt={SITE_CONFIG.name} className={`object-cover ${className}`} />
  )
}

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* Top accent divider */}
      <div className="h-[3px] bg-[linear-gradient(90deg,transparent_0%,#1d6fe8_25%,#16a34a_75%,transparent_100%)]" />

      {/* Main footer grid */}
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1.4fr] xl:gap-14">

          {/* ── Brand column ── */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <BrandMark className="h-12 w-12 shrink-0" />
              <div>
                <span className="editable-display block text-[17px] font-bold leading-tight tracking-[-0.02em] text-white">
                  {SITE_CONFIG.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6b7280]">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-[13px] leading-7 text-[#9ca3af]">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>

          </div>

          {/* ── Links column ── */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9ca3af]">Links</h3>
            <nav className="mt-4 grid gap-2.5">
              <Link href="/" className="text-[13px] text-[#9ca3af] transition hover:text-white">Home</Link>
              <Link href="/about" className="text-[13px] text-[#9ca3af] transition hover:text-white">About</Link>
              <Link href="/contact" className="text-[13px] text-[#9ca3af] transition hover:text-white">Contact</Link>
              <Link href="/search" className="text-[13px] text-[#9ca3af] transition hover:text-white">Search</Link>
              {session ? (
                <button
                  type="button"
                  onClick={logout}
                  className="text-left text-[13px] text-[#9ca3af] transition hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="text-[13px] text-[#9ca3af] transition hover:text-white">Login</Link>
                  <Link href="/signup" className="text-[13px] text-[#9ca3af] transition hover:text-white">Register</Link>
                </>
              )}
            </nav>
          </div>

          {/* ── Newsletter column ── */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9ca3af]">Newsletter</h3>
            <p className="mt-4 text-[13px] leading-6 text-[#6b7280]">
              Get weekly business insights, market updates, and professional knowledge from across Southeast Asia.
            </p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 transition focus-within:border-white/25">
                <Mail className="h-4 w-4 shrink-0 text-[#6b7280]" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#6b7280]"
                />
              </label>
              <button
                type="submit"
                className="rounded-lg bg-[var(--slot4-accent)] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:brightness-95"
              >
                Subscribe to updates
              </button>
            </form>
            <p className="mt-3 text-[11px] text-[#4b5563]">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BrandMark className="h-6 w-6 opacity-40" />
            <p className="text-xs text-[#4b5563]">© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          </div>
          <p className="text-xs text-[#4b5563]">{globalContent.footer.bottomNote}</p>
        </div>
      </div>
    </footer>
  )
}
