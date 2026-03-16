'use client'

import { Mail, Phone, MapPin } from "lucide-react"
import { memo } from "react"

const navLinks = [
  { href: "#about",     label: "About"     },
  { href: "#amenities", label: "Amenities" },
  { href: "#projects",  label: "Projects"  },
  { href: "#gallery",   label: "Gallery"   },
]

const resourceLinks = [
  { href: "#user-guide",   label: "User Guide"   },
  { href: "#news",         label: "News"         },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact",      label: "Contact"      },
]

const CURRENT_YEAR = new Date().getFullYear()

const linkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#C9862b" }
const linkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "rgba(255,255,255,.45)" }

/* ─── Nav List ─── */
const NavList = memo(({ links }: { links: typeof navLinks }) => (
  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
    {links.map((link) => (
      <li key={link.href}>
        <a
          href={link.href}
          className="ft-link"
          onMouseEnter={linkEnter}
          onMouseLeave={linkLeave}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            color: "rgba(255,255,255,.45)",
            fontFamily: "'Poppins',sans-serif",
            fontSize: "clamp(.82rem,1.1vw,.92rem)",
            fontWeight: 500,
            textDecoration: "none",
            transition: "color .22s, gap .22s",
          }}
        >
          <span className="ft-dash" style={{
            display: "block", height: 1.5, borderRadius: 1,
            background: "#C9862b",
            width: 12,
            transition: "width .25s cubic-bezier(.22,1,.36,1)",
            flexShrink: 0,
          }} />
          {link.label}
        </a>
      </li>
    ))}
  </ul>
))
NavList.displayName = "NavList"

/* ─── Icon Badge ─── */
const IconBadge = memo(({ icon: Icon }: { icon: React.ElementType }) => (
  <span style={{
    width: 30, height: 30, borderRadius: 10, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(201,134,43,.1)",
    border: "1px solid rgba(201,134,43,.22)",
  }}>
    <Icon size={13} style={{ color: "#C9862b" }} />
  </span>
))
IconBadge.displayName = "IconBadge"

/* ─── Footer ─── */
export const Footer = memo(function Footer() {
  return (
    <footer style={{ background: "#30534A", position: "relative", overflow: "hidden", fontFamily: "'Poppins',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        .ft-dotbg {
          background-image: radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* nav link hover expands dash */
        .ft-link:hover { color:#C9862b !important; }
        .ft-link:hover .ft-dash { width:20px !important; }

        /* contact link hover */
        .ft-contact-link { transition:color .22s; }
        .ft-contact-link:hover { color:#C9862b !important; }

        /* grid */
        .ft-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem,4vw,3rem);
        }
        @media(min-width:640px){  .ft-grid { grid-template-columns:1fr 1fr; } }
        @media(min-width:1024px){ .ft-grid { grid-template-columns:2fr 1fr 1fr 1.5fr; gap:clamp(1.5rem,3vw,3rem); } }
      `}</style>

      {/* Dot grid */}
      <div className="ft-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Glow orb */}
      <div style={{ position: "absolute", top: 0, left: "30%", width: 440, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* ─── GOLD TOP BORDER ─── */}
      <div style={{ width: "100%", height: 3, background: "linear-gradient(90deg,#C9862b 0%,rgba(201,134,43,.3) 50%,#C9862b 100%)" }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "18px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>
          Mahalaxmi Infra
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
        <span style={{ color: "rgba(255,255,255,.2)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>
          Premium Real Estate
        </span>
      </div>

      {/* ─── MAIN GRID ─── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,6rem) clamp(2rem,4vw,3rem)", position: "relative", zIndex: 10 }}>
        <div className="ft-grid" style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>

          {/* ─── BRAND ─── */}
          <div>
            {/* Logo + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <img
                src="/Malaxmi-Final-Logo.-2png.png"
                alt="Mahalaxmi Infra Logo"
                loading="lazy" decoding="async"
                style={{ width: 60, height: 60, objectFit: "contain", flexShrink: 0 }}
                width={60} height={60}
              />
              <div>
                <span style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.4rem", fontWeight: 700,
                  color: "#fff", display: "block", lineHeight: 1.1,
                }}>Mahalaxmi Infra</span>
                <span style={{ fontSize: 9, letterSpacing: ".28em", textTransform: "uppercase", color: "#C9862b", fontFamily: "'Poppins',sans-serif", fontWeight: 700 }}>
                  Premium Real Estate
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "clamp(.82rem,1.1vw,.92rem)",
              color: "rgba(255,255,255,.5)",
              lineHeight: 1.85, maxWidth: 280, margin: "0 0 20px", fontWeight: 400,
            }}>
              Delivering premium residential &amp; commercial plots with excellence, transparency, and innovation across Nagpur.
            </p>

            {/* RERA badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(201,134,43,.1)",
              border: "1px solid rgba(201,134,43,.28)",
              borderRadius: 999, padding: "7px 14px",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9862b", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 700, color: "#C9862b", letterSpacing: ".06em" }}>
                MAHA RERA NO. A50500044725
              </span>
            </div>
          </div>

          {/* ─── NAVIGATION ─── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 20, height: 2, background: "#C9862b", borderRadius: 2 }} />
              <h4 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".2em", color: "rgba(255,255,255,.6)", margin: 0 }}>
                Navigation
              </h4>
            </div>
            <NavList links={navLinks} />
          </div>

          {/* ─── RESOURCES ─── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 20, height: 2, background: "#C9862b", borderRadius: 2 }} />
              <h4 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".2em", color: "rgba(255,255,255,.6)", margin: 0 }}>
                Resources
              </h4>
            </div>
            <NavList links={resourceLinks} />
          </div>

          {/* ─── CONTACT ─── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 20, height: 2, background: "#C9862b", borderRadius: 2 }} />
              <h4 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".2em", color: "rgba(255,255,255,.6)", margin: 0 }}>
                Contact
              </h4>
            </div>

            {/* Name */}
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 700, color: "rgba(255,255,255,.85)", margin: "0 0 16px", lineHeight: 1 }}>
              Digvijay Raut
            </p>

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "tel:+919322987615",            icon: Phone,  label: "+91 9322987615"          },
                { href: "tel:+917378624062",            icon: Phone,  label: "+91 7378624062"          },
                { href: "mailto:digvijaycr@gmail.com",  icon: Mail,   label: "digvijaycr@gmail.com"    },
              ].map(({ href, icon: Icon, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="ft-contact-link"
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      color: "rgba(255,255,255,.45)",
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "clamp(.8rem,1vw,.9rem)",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    <IconBadge icon={Icon} />
                    {label}
                  </a>
                </li>
              ))}
              <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ marginTop: 2, flexShrink: 0 }}><IconBadge icon={MapPin} /></span>
                <span style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "clamp(.78rem,.95vw,.88rem)",
                  color: "rgba(255,255,255,.38)",
                  lineHeight: 1.7, fontWeight: 400,
                }}>
                  Flat No. 103, 104, Laxmivihar Apartment, Beside Hotel Airport Centre Point, Wardha Road, Somalwada, Nagpur – 440025
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
          paddingTop: "clamp(1.2rem,2.5vw,1.8rem)",
          borderTop: "1px solid rgba(255,255,255,.07)",
        }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "rgba(255,255,255,.25)", margin: 0, fontWeight: 400 }}>
            © {CURRENT_YEAR} Mahalaxmi Infra. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            {["NMRDA Sanctioned", "RERA Approved", "ISO Certified"].map((label) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9862b", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, color: "rgba(255,255,255,.28)", letterSpacing: ".06em", fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
})