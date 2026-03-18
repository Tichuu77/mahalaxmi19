"use client"

import { useState, useCallback, useEffect, memo } from "react"
import { X, Menu } from "lucide-react"

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

const DesktopLinks = memo(() => (
  <div className="nav__links">
    {navLinks.map(link => (
      <a key={link.href} href={link.href} className="nav__link">{link.label}</a>
    ))}
  </div>
))
DesktopLinks.displayName = "DesktopLinks"

export function Navigation() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const toggle    = useCallback(() => setIsOpen(p => !p), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <nav role="navigation" aria-label="Main navigation" className={`nav ${scrolled ? "nav--scrolled" : "nav--top"}`}>
        <div className="nav__inner">
          <a href="#" aria-label="Mahalaxmi Infra – Home" className="nav__logo">
            <img src="/Malaxmi-Final-Logo-1.png" alt="Mahalaxmi Infra Logo" width={72} height={72} className="nav__logo-img" fetchPriority="high" decoding="sync" />
            <div>
              <div className="nav__logo-name">Mahalaxmi Infra</div>
            </div>
          </a>
          <DesktopLinks />
          <div className="nav__cta">
            <a href="#contact" className="nav__cta-btn">Get Started</a>
          </div>
          <div className="nav__toggle">
            <button onClick={toggle} className="nav__toggle-btn" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="nav__drawer">
          <div className="nav__drawer-label">
            <div className="nav__drawer-label-line" />
            <span className="nav__drawer-label-text">Navigation</span>
          </div>
          <div className="nav__drawer-links">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="nav__drawer-link" onClick={closeMenu}>{link.label}</a>
            ))}
          </div>
          <a href="#contact" className="nav__drawer-cta" onClick={closeMenu}>Get Started</a>
          {/* <p className="nav__drawer-rera">MAHA RERA NO. A50500044725</p> */}
        </div>
      )}
    </>
  )
}