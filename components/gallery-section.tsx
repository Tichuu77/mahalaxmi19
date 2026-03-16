"use client"

import { useEffect, useState, useRef, useCallback, memo } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

const galleryItems = [
  { id: 1,  src: "/gallery1.jpg",  alt: "Morning View",           category: "Exterior"   },
  { id: 2,  src: "/gallery2.jpg",  alt: "Well Maintained Square", category: "Amenities"  },
  { id: 3,  src: "/gallery3.jpg",  alt: "Grand Entrance",         category: "Exterior"   },
  { id: 4,  src: "/gallery4.jpg",  alt: "Tree Covered",           category: "Landscape"  },
  { id: 5,  src: "/gallery5.jpg",  alt: "Night View",             category: "Exterior"   },
  { id: 6,  src: "/gallery6.jpg",  alt: "Cozy Living Space",      category: "Interior"   },
  { id: 7,  src: "/gallery7.jpg",  alt: "Designer Interiors",     category: "Interior"   },
  { id: 8,  src: "/gallery8.jpg",  alt: "Premium Amenities",      category: "Amenities"  },
  { id: 9,  src: "/gallery9.jpg",  alt: "Swimming Pool",          category: "Amenities"  },
  { id: 10, src: "/gallery10.jpg", alt: "Evening View",           category: "Exterior"   },
  { id: 11, src: "/gallery11.jpg", alt: "Playground",             category: "Amenities"  },
  { id: 12, src: "/gallery12.jpg", alt: "Aerial Top View",        category: "Exterior"   },
]

const TOTAL = galleryItems.length
const nextId = (id: number) => galleryItems[(galleryItems.findIndex(i => i.id === id) + 1) % TOTAL].id
const prevId = (id: number) => galleryItems[(galleryItems.findIndex(i => i.id === id) - 1 + TOTAL) % TOTAL].id

/* ─── Grid Layout config ─── */
// Each item: [colSpan, rowSpan, isHero, isWide]
const LAYOUT: [number, number, boolean, boolean][] = [
  [6, 2, true,  false], // 0 — big hero left
  [3, 2, false, false], // 1 — medium right
  [3, 1, false, false], // 2 — small top-right
  [3, 1, false, false], // 3 — small
  [4, 1, false, true ], // 4 — wide
  [4, 1, false, false], // 5
  [4, 1, false, false], // 6
  [3, 1, false, false], // 7
  [3, 1, false, false], // 8
  [3, 1, false, false], // 9
  [3, 1, false, false], // 10
  [3, 1, false, false], // 11
]

/* ─── GalleryTile ─── */
const GalleryTile = memo(({
  item, colSpan, rowSpan, isHero, isWide, onOpen, visible, delay,
}: {
  item: typeof galleryItems[0]
  colSpan: number; rowSpan: number
  isHero: boolean; isWide: boolean
  onOpen: () => void
  visible: boolean; delay: number
}) => (
  <div
    onClick={onOpen}
    className="gal-tile"
    style={{
      gridColumn: `span ${colSpan}`,
      gridRow: `span ${rowSpan}`,
      position: "relative",
      overflow: "hidden",
      borderRadius: isHero ? 22 : 16,
      cursor: "pointer",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(.98)",
      transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      willChange: "transform",
    }}
  >
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      className="gal-img"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 1s cubic-bezier(.22,1,.36,1)" }}
    />

    {/* Overlay */}
    <div style={{
      position: "absolute", inset: 0,
      background: isWide
        ? "linear-gradient(100deg,rgba(13,13,13,.65) 0%,rgba(13,13,13,.1) 60%)"
        : "linear-gradient(to top,rgba(13,13,13,.72) 0%,transparent 55%)",
      transition: "opacity .3s ease",
    }} className="gal-overlay" />

    {/* Hover zoom icon */}
    <div className="gal-zoom" style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: 0, transition: "opacity .3s ease",
    }}>
      <div style={{
        width: isHero ? 56 : 44, height: isHero ? 56 : 44,
        borderRadius: "50%",
        background: "rgba(201,134,43,.85)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 24px rgba(201,134,43,.4)",
      }}>
        <ZoomIn size={isHero ? 22 : 17} style={{ color: "#fff" }} />
      </div>
    </div>

    {/* Text info */}
    <div style={{
      position: "absolute",
      bottom: isHero ? 22 : 12,
      left: isHero ? 22 : 12,
      right: isHero ? 22 : 12,
    }}>
      <span style={{
        display: "block",
        fontSize: 9, fontWeight: 700,
        letterSpacing: ".3em", textTransform: "uppercase",
        color: "#C9862b",
        fontFamily: "'Poppins',sans-serif",
        marginBottom: isHero ? 6 : 3,
      }}>{item.category}</span>
      <p style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: isHero ? "1.5rem" : "1rem",
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.1,
        margin: 0,
        textShadow: "0 2px 6px rgba(0,0,0,.4)",
      }}>{item.alt}</p>
    </div>

    {/* Bottom hover bar */}
    <div className="gal-bar" style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: 3,
      background: "linear-gradient(90deg,#C9862b,#30534A)",
      transform: "scaleX(0)", transformOrigin: "left",
      transition: "transform .4s cubic-bezier(.22,1,.36,1)",
    }} />
  </div>
))
GalleryTile.displayName = "GalleryTile"

/* ─── Lightbox ─── */
const Lightbox = memo(({ selectedId, onClose, onPrev, onNext }: {
  selectedId: number; onClose: () => void; onPrev: () => void; onNext: () => void
}) => {
  const active = galleryItems.find(i => i.id === selectedId)!
  const index = galleryItems.findIndex(i => i.id === selectedId)

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px,3vw,32px)",
        background: "rgba(10,10,10,.95)",
        backdropFilter: "blur(16px)",
        animation: "lb-in .3s cubic-bezier(.22,1,.36,1)",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes lb-in { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
      `}</style>

      <div style={{ position: "relative", width: "100%", maxWidth: 1000 }} onClick={e => e.stopPropagation()}>

        {/* Image */}
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,.6)" }}>
          <img
            src={active.src}
            alt={active.alt}
            decoding="async"
            style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", display: "block", background: "#111" }}
          />
        </div>

        {/* Nav: prev */}
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
          style={{
            position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)",
            width: 44, height: 44, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(48,83,74,.9)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,.1)", cursor: "pointer",
            transition: "transform .2s, background .2s",
          }}
          className="lb-nav-btn"
        >
          <ChevronLeft size={20} style={{ color: "#fff" }} />
        </button>

        {/* Nav: next */}
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next"
          style={{
            position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)",
            width: 44, height: 44, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(48,83,74,.9)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,.1)", cursor: "pointer",
            transition: "transform .2s, background .2s",
          }}
          className="lb-nav-btn"
        >
          <ChevronRight size={20} style={{ color: "#fff" }} />
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: -16, right: -16,
            width: 38, height: 38, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,.1)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,.12)", cursor: "pointer",
            transition: "background .2s",
          }}
        >
          <X size={16} style={{ color: "#fff" }} />
        </button>

        {/* Caption bar */}
        <div style={{
          marginTop: 14,
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 14,
          padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
          backdropFilter: "blur(8px)",
        }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.1 }}>
              {active.alt}
            </p>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#C9862b", fontFamily: "'Poppins',sans-serif" }}>
              {active.category}
            </span>
          </div>
          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {galleryItems.map((_, i) => (
              <div key={i} style={{
                width: i === index ? 20 : 6, height: 6, borderRadius: 3,
                background: i === index ? "#C9862b" : "rgba(255,255,255,.2)",
                transition: "all .3s ease",
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})
Lightbox.displayName = "Lightbox"

/* ─── Section ─── */
export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasAnimated.current) { setIsVisible(true); hasAnimated.current = true } },
      { threshold: 0.06, rootMargin: "80px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (selectedId === null) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); setSelectedId(id => id !== null ? nextId(id) : null) }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setSelectedId(id => id !== null ? prevId(id) : null) }
      if (e.key === "Escape")     { e.preventDefault(); setSelectedId(null) }
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [selectedId])

  const closeModal = useCallback(() => setSelectedId(null), [])
  const modalPrev  = useCallback(() => setSelectedId(id => id !== null ? prevId(id) : null), [])
  const modalNext  = useCallback(() => setSelectedId(id => id !== null ? nextId(id) : null), [])
  const nextSlide  = useCallback(() => setCurrentSlide(p => (p + 1) % TOTAL), [])
  const prevSlide  = useCallback(() => setCurrentSlide(p => (p - 1 + TOTAL) % TOTAL), [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ background: "#f7f4ef", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&display=swap');

        /* dot grid */
        .gal-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.065) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* tile hover */
        .gal-tile:hover .gal-img     { transform: scale(1.07); }
        .gal-tile:hover .gal-zoom    { opacity: 1 !important; }
        .gal-tile:hover .gal-overlay { opacity: 1.3; }
        .gal-tile:hover .gal-bar     { transform: scaleX(1) !important; }

        /* lightbox nav hover */
        .lb-nav-btn:hover { background: rgba(201,134,43,.85) !important; transform: translateY(-50%) scale(1.1) !important; }

        /* reveal */
        .gal-rv { opacity:0; transform:translateY(30px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .gal-rv.on { opacity:1; transform:translateY(0); }
        .gd0{transition-delay:0ms} .gd1{transition-delay:120ms} .gd2{transition-delay:240ms}

        /* mobile slider */
        .gal-mob-dot { transition: all .3s ease; height: 6px; border-radius: 3px; border: none; cursor: pointer; }
      `}</style>

      {/* Dot grid */}
      <div className="gal-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "10%", right: "10%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "8%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Gallery</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>{TOTAL} Photos</span>
      </div>

      {/* ─── HEADING ─── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2rem,4vw,3.5rem) clamp(1.25rem,5vw,6rem) clamp(1.5rem,3vw,2rem)", position: "relative", zIndex: 10 }}>
        <div className={`gal-rv ${isVisible ? "on" : ""} gd0`}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.5rem,1.2vw,.9rem)" }}>
            <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
            <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Visual Inspiration</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(2.6rem,5.5vw,5rem)",
            lineHeight: 1.02, fontWeight: 600,
            color: "#0d0d0d", margin: 0,
          }}>
            Inside Our{" "}
            <em style={{ color: "#30534A", fontStyle: "italic" }}>Projects</em>
            <br />
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>&amp; Spaces</span>
          </h2>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>

        {/* ─── MOBILE SLIDER ─── */}
        <div className={`gal-rv ${isVisible ? "on" : ""} gd1`} style={{ display: "block" }}>
          <div className="md-hide" style={{ marginBottom: 24 }}>
            <style>{`.md-hide { display:block } @media(min-width:768px){.md-hide{display:none}}`}</style>
            <div style={{ position: "relative" }}>
              <div style={{ overflow: "hidden", borderRadius: 20, boxShadow: "0 8px 32px rgba(48,83,74,.12)" }}>
                <div style={{ display: "flex", transition: "transform .5s cubic-bezier(.22,1,.36,1)", transform: `translateX(-${currentSlide * 100}%)` }}>
                  {galleryItems.map((item) => (
                    <div key={item.id} style={{ minWidth: "100%", position: "relative", cursor: "pointer" }} onClick={() => setSelectedId(item.id)}>
                      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,13,13,.7) 0%,transparent 55%)", display: "flex", alignItems: "flex-end", padding: "20px" }}>
                        <div>
                          <span style={{ color: "#C9862b", fontSize: 9, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>{item.category}</span>
                          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.1 }}>{item.alt}</p>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,.5)", margin: "4px 0 0", letterSpacing: ".08em" }}>Tap to enlarge</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav buttons */}
              {[
                { onClick: prevSlide, side: "left" as const, icon: <ChevronLeft size={16} style={{ color: "#fff" }} /> },
                { onClick: nextSlide, side: "right" as const, icon: <ChevronRight size={16} style={{ color: "#fff" }} /> },
              ].map(({ onClick, side, icon }) => (
                <button key={side} onClick={onClick} aria-label={side} style={{
                  position: "absolute", [side]: 12, top: "50%", transform: "translateY(-50%)",
                  width: 36, height: 36, borderRadius: "50%", zIndex: 5, border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(48,83,74,.85)", backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,.3)",
                }}>{icon}</button>
              ))}

              {/* Dot indicators */}
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
                {galleryItems.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Slide ${i + 1}`}
                    className="gal-mob-dot"
                    style={{ width: currentSlide === i ? 24 : 6, background: currentSlide === i ? "#C9862b" : "rgba(48,83,74,.25)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── DESKTOP MASONRY GRID ─── */}
        <div className={`gal-rv ${isVisible ? "on" : ""} gd1`}>
          <div className="md-show" style={{ display: "none" }}>
            <style>{`@media(min-width:768px){.md-show{display:block!important}}`}</style>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(12,1fr)",
              gridAutoRows: "clamp(140px,13vw,190px)",
              gap: "clamp(8px,1.2vw,14px)",
            }}>
              {galleryItems.map((item, i) => {
                const [colSpan, rowSpan, isHero, isWide] = LAYOUT[i] ?? [3, 1, false, false]
                return (
                  <GalleryTile
                    key={item.id}
                    item={item}
                    colSpan={colSpan}
                    rowSpan={rowSpan}
                    isHero={isHero}
                    isWide={isWide}
                    onOpen={() => setSelectedId(item.id)}
                    visible={isVisible}
                    delay={i * 50}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div className={`gal-rv ${isVisible ? "on" : ""} gd2`} style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            Every frame, a promise
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Real Photography", "Actual Sites", "No Renders"].map((label) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9862b" }} />
                <span style={{ color: "rgba(255,255,255,.6)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── LIGHTBOX ─── */}
      {selectedId !== null && (
        <Lightbox selectedId={selectedId} onClose={closeModal} onPrev={modalPrev} onNext={modalNext} />
      )}
    </section>
  )
}