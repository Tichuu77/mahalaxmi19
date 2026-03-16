"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content: "Investing with Maha Laxmi Developers was an effortless experience. Their transparent process and clear documentation gave me full confidence. The best decision I ever made.",
    name: "Rajkumar Gharjale",
    location: "Nagpur",
    image: "/testonomials1.webp",
    rating: 5,
  },
  {
    id: 2,
    content: "I wanted to invest in a growing area, and plots in Nagpur Besa seemed perfect. Maha Laxmi Developers exceeded my expectations in every way. Highly recommended!",
    name: "Priya Shah",
    location: "Mumbai",
    image: "/testonomials2.jpg",
    rating: 5,
  },
  {
    id: 3,
    content: "Investing in residential plots with Mahalaxmi Developers was one of my best decisions. Their transparency, clear titles, and prompt assistance gave me real peace of mind.",
    name: "Karan Akojwar",
    location: "Pune",
    image: "/testonomials3.jpg",
    rating: 5,
  },
]

const TOTAL = testimonials.length

/* ─── Stars ─── */
const Stars = memo(({ count, size }: { count: number; size: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={size} style={{ fill: "#f59e0b", color: "#f59e0b" }} />
    ))}
  </div>
))
Stars.displayName = "Stars"

/* ─── Rating Strip ─── */
const RatingStrip = memo(() => (
  <div style={{
    display: "flex", alignItems: "center", gap: 16,
    background: "rgba(201,134,43,.08)",
    border: "1px solid rgba(201,134,43,.22)",
    borderRadius: 16,
    padding: "16px 20px",
  }}>
    <div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#C9862b", lineHeight: 1 }}>5.0</div>
      <div style={{ marginTop: 4 }}><Stars count={5} size={11} /></div>
    </div>
    <div style={{ width: 1, height: 36, background: "rgba(201,134,43,.2)", flexShrink: 0 }} />
    <div>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 700, color: "#0d0d0d", margin: "0 0 2px" }}>Average Rating</p>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#999", margin: 0, fontWeight: 400 }}>From 17,000+ verified clients</p>
    </div>
  </div>
))
RatingStrip.displayName = "RatingStrip"

/* ─── Active Quote Card ─── */
const ActiveCard = memo(({ t, large }: { t: typeof testimonials[0]; large?: boolean }) => (
  <div style={{
    position: "relative",
    background: "#30534A",
    borderRadius: large ? 22 : 18,
    padding: large ? "clamp(28px,3.5vw,44px)" : "24px",
    overflow: "hidden",
    boxShadow: "0 16px 48px rgba(48,83,74,.28)",
  }}>
    {/* Big decorative quote mark */}
    <div style={{
      position: "absolute", top: -12, right: -8,
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: "clamp(8rem,14vw,13rem)",
      fontWeight: 700,
      color: "rgba(255,255,255,.04)",
      lineHeight: 1,
      userSelect: "none",
      pointerEvents: "none",
    }}>"</div>

    {/* Gold top line */}
    <div style={{ width: 32, height: 2, background: "#C9862b", borderRadius: 2, marginBottom: large ? 20 : 14 }} />

    <Stars count={t.rating} size={large ? 14 : 12} />

    <p style={{
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: large ? "clamp(1.15rem,1.8vw,1.45rem)" : "1.1rem",
      fontWeight: 400,
      fontStyle: "italic",
      color: "rgba(255,255,255,.88)",
      lineHeight: 1.75,
      margin: large ? "18px 0 28px" : "14px 0 20px",
    }}>
      "{t.content}"
    </p>

    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative" }}>
        <img
          src={t.image} alt={t.name}
          loading="lazy" decoding="async"
          style={{
            width: large ? 48 : 42, height: large ? 48 : 42,
            borderRadius: "50%", objectFit: "cover",
            display: "block",
            border: "2.5px solid #C9862b",
            boxShadow: "0 0 0 3px rgba(201,134,43,.2)",
          }}
        />
        {/* Online dot */}
        <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid #30534A" }} />
      </div>
      <div>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>{t.name}</p>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#C9862b", margin: 0, fontWeight: 500, letterSpacing: ".06em" }}>
          {t.location} · Verified Buyer
        </p>
      </div>
    </div>
  </div>
))
ActiveCard.displayName = "ActiveCard"

/* ─── Testimonial Picker Row ─── */
const PickerRow = memo(({ t, i, current, onSelect }: { t: typeof testimonials[0]; i: number; current: number; onSelect: (i: number) => void }) => {
  const active = i === current
  return (
    <button
      onClick={() => onSelect(i)}
      className="tpicker-row"
      style={{
        width: "100%", textAlign: "left",
        display: "flex", alignItems: "center", gap: 14,
        background: active ? "#fff" : "rgba(48,83,74,.03)",
        border: `1px solid ${active ? "rgba(201,134,43,.38)" : "rgba(48,83,74,.1)"}`,
        borderRadius: 16,
        padding: "clamp(12px,1.5vw,18px) clamp(14px,2vw,20px)",
        cursor: "pointer",
        boxShadow: active ? "0 6px 22px rgba(48,83,74,.1)" : "none",
        transform: active ? "translateX(5px)" : "translateX(0)",
        transition: "all .3s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={t.image} alt={t.name}
          loading="lazy" decoding="async"
          style={{
            width: 44, height: 44, borderRadius: "50%", objectFit: "cover",
            border: `2px solid ${active ? "#C9862b" : "rgba(48,83,74,.2)"}`,
            display: "block",
            transition: "border-color .3s",
          }}
        />
        {active && (
          <div style={{
            position: "absolute", inset: -3,
            borderRadius: "50%",
            border: "1.5px solid rgba(201,134,43,.3)",
          }} />
        )}
      </div>

      {/* Name + snippet */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 700, color: active ? "#30534A" : "#555", margin: 0, lineHeight: 1 }}>{t.name}</p>
          <Stars count={t.rating} size={10} />
        </div>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: active ? "#888" : "#bbb", margin: "0 0 2px", fontWeight: 400 }}>
          {t.location}
        </p>
        <p style={{
          fontFamily: "'Poppins',sans-serif", fontSize: 11, color: active ? "#777" : "#ccc",
          margin: 0, fontStyle: "italic", fontWeight: 400,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "90%",
        }}>
          "{t.content.slice(0, 55)}…"
        </p>
      </div>

      {/* Active indicator */}
      {active && (
        <div style={{ width: 4, height: 32, borderRadius: 2, background: "#C9862b", flexShrink: 0 }} />
      )}
    </button>
  )
})
PickerRow.displayName = "PickerRow"

/* ─── Nav Controls ─── */
const NavControls = memo(({ current, onPrev, onNext, onDot }: {
  current: number; onPrev: () => void; onNext: () => void; onDot: (i: number) => void
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    {[{ fn: onPrev, icon: <ChevronLeft size={17} style={{ color: "#30534A" }} /> }, { fn: onNext, icon: <ChevronRight size={17} style={{ color: "#30534A" }} /> }].map(({ fn, icon }, idx) => (
      <button key={idx} onClick={fn} style={{
        width: 40, height: 40, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(48,83,74,.08)",
        border: "1px solid rgba(48,83,74,.18)",
        cursor: "pointer",
        transition: "all .22s cubic-bezier(.22,1,.36,1)",
      }} className="tnav-btn">{icon}</button>
    ))}
    <div style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: 4 }}>
      {testimonials.map((_, i) => (
        <button key={i} onClick={() => onDot(i)} aria-label={`Testimonial ${i + 1}`} style={{
          height: 6, borderRadius: 3, border: "none", cursor: "pointer",
          width: i === current ? 24 : 6,
          background: i === current ? "#C9862b" : "rgba(48,83,74,.2)",
          transition: "all .3s ease",
        }} />
      ))}
    </div>
  </div>
))
NavControls.displayName = "NavControls"

/* ─── Section ─── */
export function TestimonialsSection() {
  const [current, setCurrent]     = useState(0)
  const [autoplay, setAutoplay]   = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasAnimated.current) { setIsVisible(true); hasAnimated.current = true } },
      { threshold: 0.07 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => setCurrent(p => (p + 1) % TOTAL), 5200)
    return () => clearInterval(id)
  }, [autoplay])

  const prev  = useCallback(() => { setCurrent(p => (p - 1 + TOTAL) % TOTAL); setAutoplay(false) }, [])
  const next  = useCallback(() => { setCurrent(p => (p + 1) % TOTAL); setAutoplay(false) }, [])
  const goTo  = useCallback((i: number) => { setCurrent(i); setAutoplay(false) }, [])

  const vis = isVisible
  const active = testimonials[current]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ background: "#f7f4ef", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        .tm-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.065) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .tpicker-row:hover { transform: translateX(4px) !important; box-shadow: 0 4px 16px rgba(48,83,74,.09) !important; border-color: rgba(48,83,74,.2) !important; }

        .tnav-btn:hover { background: rgba(48,83,74,.15) !important; transform: scale(1.08); }
        .tnav-btn:active { transform: scale(.96); }

        .tm-rv { opacity:0; transform:translateY(30px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .tm-rv.on { opacity:1; transform:translateY(0); }
        .td0{transition-delay:0ms}  .td1{transition-delay:130ms}
        .td2{transition-delay:260ms} .td3{transition-delay:390ms}

        /* desktop grid */
        .tm-desk-grid { display:none; }
        @media(min-width:1024px){ .tm-desk-grid { display:grid; } }
        .tm-mob { display:block; }
        @media(min-width:1024px){ .tm-mob { display:none; } }
      `}</style>

      {/* Dot grid */}
      <div className="tm-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "5%", right: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "8%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Testimonials</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>17,000+ Happy Families</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>

        {/* ─── HEADING ─── */}
        <div className={`tm-rv ${vis?"on":""} td0`} style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.5rem,1.2vw,.9rem)" }}>
            <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
            <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>What They Say</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(2.6rem,5.5vw,5rem)",
            lineHeight: 1.02, fontWeight: 600,
            color: "#0d0d0d", margin: "0 0 12px",
          }}>
            Loved by{" "}
            <em style={{ color: "#30534A", fontStyle: "italic" }}>Our</em>
            <br />
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Clients</span>
          </h2>
          <p style={{ fontSize: "clamp(.88rem,1.25vw,1.05rem)", color: "#888", lineHeight: 1.8, maxWidth: 460, margin: 0, fontWeight: 400 }}>
            Real stories from families who found their dream plots with Mahalaxmi Infra.
          </p>
        </div>

        {/* ─── DESKTOP: Left quote + Right picker ─── */}
        <div
          className="tm-desk-grid"
          style={{ gridTemplateColumns: "1fr 1px 1fr", alignItems: "start", gap: 0 }}
        >
          {/* Left */}
          <div className={`tm-rv ${vis?"on":""} td1`} style={{ paddingRight: "clamp(1.5rem,4vw,56px)" }}>
            <div style={{ marginBottom: 24 }}>
              <ActiveCard t={active} large />
            </div>
            <NavControls current={current} onPrev={prev} onNext={next} onDot={goTo} />
          </div>

          {/* Vertical divider */}
          <div style={{ background: "rgba(48,83,74,.1)", width: 1, alignSelf: "stretch" }} />

          {/* Right: picker list + rating */}
          <div className={`tm-rv ${vis?"on":""} td2`} style={{ paddingLeft: "clamp(1.5rem,4vw,56px)", display: "flex", flexDirection: "column", gap: 10 }}>
            {testimonials.map((t, i) => (
              <PickerRow key={t.id} t={t} i={i} current={current} onSelect={goTo} />
            ))}
            <div style={{ marginTop: 8 }}>
              <RatingStrip />
            </div>
          </div>
        </div>

        {/* ─── MOBILE ─── */}
        <div className="tm-mob">
          <div className={`tm-rv ${vis?"on":""} td1`} style={{ marginBottom: 20 }}>
            <ActiveCard t={active} />
          </div>
          <div className={`tm-rv ${vis?"on":""} td2`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <NavControls current={current} onPrev={prev} onNext={next} onDot={goTo} />
          </div>
          <div className={`tm-rv ${vis?"on":""} td3`}>
            <RatingStrip />
          </div>
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div className={`tm-rv ${vis?"on":""} td3`} style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            Every word, a true story
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Verified Reviews", "Real Families", "No Paid Promotions"].map((label) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9862b" }} />
                <span style={{ color: "rgba(255,255,255,.6)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}