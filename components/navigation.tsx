"use client"

import { useState, useCallback, memo } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

// Static data at module level
const navLinks = [
  { href: "#about",        label: "About"        },
  { href: "#amenities",    label: "Amenities"    },
  { href: "#projects",     label: "Projects"     },
  { href: "#gallery",      label: "Gallery"      },
  { href: "#user-guide",   label: "User Guide"   },
  { href: "#news",         label: "News"         },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact",      label: "Contact"      },
]

// Desktop nav links — purely static, never re-renders
const DesktopLinks = memo(() => (
  <div className="hidden md:flex gap-8">
    {navLinks.map((link) => (
      <a
        key={link.href}
        href={link.href}
        className="text-primary hover:text-amber-900 transition-colors text-sm font-medium"
      >
        {link.label}
      </a>
    ))}
  </div>
))
DesktopLinks.displayName = "DesktopLinks"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle   = useCallback(() => setIsOpen(p => !p), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <nav className="fixed top-0 w-full bg-foreground backdrop-blur-md z-50 border-b border-amber-900/20">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/Mahalaxmi Infra new Logo.png"
              alt="Mahalaxmi Infra Logo"
              className="w-20 h-20"
              fetchPriority="high"
              decoding="sync"
              width={80}
              height={80}
            />
            <span
              style={{ fontFamily: "var(--font-heading, Poppins, sans-serif)" }}
              className="font-bold text-primary text-xl"
            >
              Mahalaxmi Infra
            </span>
          </div>

          {/* Desktop links */}
          <DesktopLinks />

          {/* Desktop CTA */}
          <Link
            href="#contact"
            className="hidden md:block px-10 py-4 bg-primary hover:bg-primary/80 text-white rounded transition-colors font-medium text-sm"
          >
            Get Started
          </Link>

          {/* Mobile toggle */}
          <button onClick={toggle} className="md:hidden text-primary" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block px-4 py-2 text-primary hover:text-primary/80 hover:bg-white/5 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="#contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-poppins font-medium text-center hover-lift transition-all duration-300 ease-out"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}