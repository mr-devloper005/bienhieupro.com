'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <img src="/favicon.png" alt={SITE_CONFIG.name} className={`object-cover ${className}`} />
  )
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'listing').map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)]">
      {/* Main navbar */}
      <nav className="border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] shadow-[0_1px_0_var(--editable-border)]">
        <div className="mx-auto flex min-h-[64px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <BrandMark className="h-11 w-11 shrink-0 transition duration-200 group-hover:opacity-90" />
            <span className="hidden min-w-0 sm:block">
              <span className="editable-display block text-[17px] font-bold leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">
                {SITE_CONFIG.name}
              </span>
              <span className="block text-[10px] font-semibold uppercase leading-none tracking-[0.1em] text-[var(--slot4-muted-text)]">
                {SITE_CONFIG.tagline}
              </span>
            </span>
          </Link>

          {/* Search bar */}
          <form action="/search" className="hidden flex-1 max-w-xs sm:flex lg:max-w-sm xl:max-w-md">
            <label className="flex w-full cursor-text items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2.5 transition focus-within:border-[var(--slot4-accent)] focus-within:ring-2 focus-within:ring-[var(--slot4-accent)]/10 hover:border-[#9ca3af]">
              <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                type="search"
                placeholder="Search articles, businesses..."
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
              <span className="shrink-0 rounded-md border border-[#e5e7eb] bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#9ca3af]">
                BETA
              </span>
            </label>
          </form>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navItems.slice(0, 5).map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-0.5 rounded-md px-3 py-2 text-[13px] font-medium transition duration-150 ${
                    active
                      ? 'text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-gray)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-[var(--slot4-accent)]" />
                  ) : null}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="flex items-center gap-0.5 rounded-md px-3 py-2 text-[13px] font-medium text-[var(--slot4-muted-text)] transition duration-150 hover:bg-[var(--slot4-gray)] hover:text-[var(--slot4-page-text)]"
            >
              More <ChevronDown className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1 lg:flex-none" />

          {/* Auth buttons */}
          <div className="flex shrink-0 items-center gap-2">
            {session ? (
              <>
                <span className="hidden items-center gap-1.5 text-[13px] font-semibold text-[var(--slot4-page-text)] sm:flex">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-xs font-bold text-[var(--slot4-accent)]">
                    {session.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                  {session.name}
                </span>
                <Link
                  href="/create"
                  className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-95 sm:inline-flex"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Create
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden items-center px-3 py-2 text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-[7px] text-[13px] font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] sm:inline-flex"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden items-center gap-1.5 rounded-full bg-[#16a34a] px-4 py-[7px] text-[13px] font-semibold text-white transition hover:brightness-95 sm:inline-flex"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Sign up
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {open ? (
        <div className="border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 shadow-lg lg:hidden">
          {/* Mobile search */}
          <form action="/search" className="mb-4">
            <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2.5">
              <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                type="search"
                placeholder="Search articles, businesses..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
            </label>
          </form>
          <div className="grid gap-1">
            {[
              { label: 'Home', href: '/' },
              ...navItems,
              { label: 'Contact', href: '/contact' },
              { label: 'Search', href: '/search' },
              ...(session
                ? [{ label: 'Create Content', href: '/create' }]
                : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }]),
            ].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg border-l-[3px] px-4 py-3 text-[13px] font-medium transition ${
                    active
                      ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'border-transparent text-[var(--slot4-muted-text)] hover:border-[var(--editable-border)] hover:bg-[var(--slot4-gray)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button
                type="button"
                onClick={() => { logout(); setOpen(false) }}
                className="rounded-lg border-l-[3px] border-transparent px-4 py-3 text-left text-[13px] font-medium text-[var(--slot4-muted-text)] hover:border-[var(--editable-border)] hover:bg-[var(--slot4-gray)]"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
