"use client"

import { Check, Zap, Trophy, Users, Heart, Lightbulb } from "lucide-react"
import { useEffect, useRef, useState, useCallback, memo } from "react"

const reasons = [
  { icon: Trophy,    title: "Proven Excellence", description: "Award-winning projects trusted by thousands of families across Nagpur.",     stat: "70+",  statLabel: "Projects"      },
  { icon: Zap,       title: "Innovation First",  description: "Modern layouts, smart planning, and forward-thinking infrastructure.",       stat: "13+",  statLabel: "Years"         },
  { icon: Users,     title: "Expert Team",       description: "Dedicated professionals with decades of real estate experience.",            stat: "17K+", statLabel: "Clients"       },
  { icon: Heart,     title: "Customer Focused",  description: "Your satisfaction drives every decision we make, from plot to possession.", stat: "100%", statLabel: "RERA Approved" },
  { icon: Lightbulb, title: "Prime Locations",   description: "Strategically chosen land near major highways, hospitals, and schools.",    stat: "9+",   statLabel: "Locations"     },
  { icon: Check,     title: "Quality Assured",   description: "NMRDA sanctioned, legally clear, and bank finance eligible plots.",        stat: "90%",  statLabel: "Finance"       },
]

const trackRecord = [
  "13+ years industry experience",
  "17,000+ satisfied families",
  "Industry-leading satisfaction rate",
]

const support = [
  "24/7 customer support",
  "Dedicated site visit assistance",
  "Transparent documentation process",
]

/* ─── CheckItem ─── */
const CheckItem = memo(({ text, gold }: { text: string; gold?: boolean }) => (
  <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
    <span style={{
      width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: gold ? "rgba(201,134,43,.12)" : "rgba(48,83,74,.1)",
      border: `1px solid ${gold ? "rgba(201,134,43,.3)" : "rgba(48,83,74,.25)"}`,
    }}>
      <Check size={9} style={{ color: gold ? "#C9862b" : "#30534A" }} />
    </span>
    <span style={{ fontSize: "clamp(.82rem,1.1vw,.95rem)", color: "#555", lineHeight: 1.65, fontFamily: "'Poppins',sans-serif", fontWeight: 400 }}>
      {text}
    </span>
  </li>
))
CheckItem.displayName = "CheckItem"

/* ─── Desktop Reason Row ─── */
const DesktopReasonRow = memo(({ reason, index, isActive, onEnter, onLeave }: {
  reason: typeof reasons[0]; index: number
  isActive: boolean; onEnter: (i: number) => void; onLeave: () => void
}) => {
  const Icon = reason.icon
  const handleEnter = useCallback(() => onEnter(index), [onEnter, index])
  return (
    <div
      className="wcu-row"
      onMouseEnter={handleEnter}
      onMouseLeave={onLeave}
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr auto",
        alignItems: "center",
        gap: "clamp(16px,3vw,40px)",
        padding: "clamp(16px,2vw,24px) 0",
        borderBottom: index < reasons.length - 1 ? "1px solid rgba(48,83,74,.09)" : "none",
        cursor: "default",
        transition: "background .2s",
        borderRadius: 12,
        marginLeft: -12, paddingLeft: 12,
        marginRight: -12, paddingRight: 12,
      }}
    >
      {/* Index */}
      <span style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "clamp(1.6rem,2.2vw,2rem)",
        fontWeight: 700,
        color: isActive ? "#C9862b" : "rgba(48,83,74,.15)",
        lineHeight: 1,
        transition: "color .25s",
        userSelect: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon + text */}
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,20px)" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isActive ? "#30534A" : "rgba(48,83,74,.08)",
          border: `1px solid ${isActive ? "#30534A" : "rgba(48,83,74,.14)"}`,
          transition: "all .25s",
          boxShadow: isActive ? "0 6px 18px rgba(48,83,74,.22)" : "none",
        }}>
          <Icon size={18} style={{ color: isActive ? "#C9862b" : "#30534A", transition: "color .25s" }} />
        </div>
        <div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(1.1rem,1.6vw,1.35rem)",
            fontWeight: 700,
            color: isActive ? "#30534A" : "#0d0d0d",
            margin: "0 0 3px",
            lineHeight: 1.1,
            transition: "color .25s",
          }}>{reason.title}</h3>
          <p style={{ fontSize: "clamp(.8rem,1.1vw,.95rem)", color: "#999", lineHeight: 1.7, margin: 0, fontFamily: "'Poppins',sans-serif", fontWeight: 400 }}>
            {reason.description}
          </p>
        </div>
      </div>

      {/* Stat */}
      <div style={{
        flexShrink: 0, textAlign: "right",
        opacity: isActive ? 1 : 0.28,
        transition: "opacity .25s",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.7rem,2.5vw,2.2rem)", fontWeight: 700, color: "#C9862b", lineHeight: 1 }}>
          {reason.stat}
        </div>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".2em", color: "#bbb", fontFamily: "'Poppins',sans-serif", fontWeight: 700, marginTop: 3 }}>
          {reason.statLabel}
        </div>
      </div>
    </div>
  )
})
DesktopReasonRow.displayName = "DesktopReasonRow"

/* ─── Mobile Reason Card ─── */
const MobileReasonCard = memo(({ reason, index, visible }: { reason: typeof reasons[0]; index: number; visible: boolean }) => {
  const Icon = reason.icon
  return (
    <div
      className="wcu-mob-card"
      style={{
        background: "#fff",
        border: "1px solid rgba(48,83,74,.1)",
        borderRadius: 18,
        padding: "clamp(14px,3vw,20px)",
        display: "flex", flexDirection: "column", gap: 12,
        boxShadow: "0 4px 16px rgba(48,83,74,.06)",
        position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${index * 60}ms, transform .65s cubic-bezier(.22,1,.36,1) ${index * 60}ms`,
      }}
    >
      {/* Corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, background: "rgba(201,134,43,.07)", borderRadius: "0 18px 0 100%" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(48,83,74,.08)", border: "1px solid rgba(48,83,74,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} style={{ color: "#C9862b" }} />
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "#C9862b", lineHeight: 1 }}>{reason.stat}</div>
          <div style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#bbb", fontFamily: "'Poppins',sans-serif", fontWeight: 700, marginTop: 2 }}>{reason.statLabel}</div>
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 700, color: "#0d0d0d", margin: "0 0 4px", lineHeight: 1.15 }}>
          {reason.title}
        </h3>
        <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.65, margin: 0, fontFamily: "'Poppins',sans-serif", fontWeight: 400 }}>
          {reason.description}
        </p>
      </div>

      {/* Bottom bar — proportional to index */}
      <div style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg,#C9862b,#30534A)", width: `${32 + index * 11}%` }} />
    </div>
  )
})
MobileReasonCard.displayName = "MobileReasonCard"

/* ─── Section ─── */
export function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
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

  const handleEnter = useCallback((i: number) => setActiveCard(i), [])
  const handleLeave = useCallback(() => setActiveCard(null), [])
  const vis = isVisible

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      style={{ background: "#f7f4ef", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        .wcu-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.065) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* row hover bg flash */
        .wcu-row:hover { background: rgba(48,83,74,.03) !important; }

        /* mobile card hover */
        .wcu-mob-card { transition-property: opacity,transform,box-shadow,border-color; }
        .wcu-mob-card:hover { box-shadow: 0 10px 30px rgba(48,83,74,.14) !important; border-color: rgba(201,134,43,.32) !important; transform: translateY(-4px) !important; }

        /* divider line */
        .wcu-vdiv { display:none; }
        @media(min-width:1024px){ .wcu-vdiv { display:block; } }

        /* checklist UL */
        .wcu-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }

        /* reveal */
        .wcu-rv { opacity:0; transform:translateY(30px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .wcu-rv.on { opacity:1; transform:translateY(0); }
        .wd0{transition-delay:0ms}  .wd1{transition-delay:120ms}
        .wd2{transition-delay:240ms} .wd3{transition-delay:360ms}
      `}</style>

      {/* Dot grid */}
      <div className="wcu-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: 0, right: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "10%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Why Choose Us</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>The Difference We Make</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>

        {/* ─── TOP: HEADING + CHECKLISTS ─── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(2rem,4vw,3rem)",
          marginBottom: "clamp(2.5rem,5vw,4rem)",
        }} className="wcu-top-grid">
          <style>{`@media(min-width:1024px){ .wcu-top-grid { grid-template-columns: 1fr 1px 1fr !important; } }`}</style>

          {/* Heading block */}
          <div className={`wcu-rv ${vis?"on":""} wd0`} style={{ paddingRight: "clamp(0px,3vw,48px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.6rem,1.2vw,1rem)" }}>
              <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
              <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Our Story</span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2.6rem,5.5vw,5rem)",
              lineHeight: 1.02, fontWeight: 600,
              color: "#0d0d0d", margin: "0 0 clamp(1rem,2vw,1.5rem)",
            }}>
              Why Thousands
              <br />
              <em style={{ color: "#30534A", fontStyle: "italic" }}>Trust</em>{" "}
              <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Mahalaxmi</span>
            </h2>
            <p style={{ fontSize: "clamp(.88rem,1.25vw,1.05rem)", color: "#777", lineHeight: 1.85, maxWidth: 460, margin: 0, fontWeight: 400 }}>
              For over a decade, we've been building more than plots — we build confidence, community, and lasting value for families across Nagpur.
            </p>
          </div>

          {/* Vertical divider */}
          <div className="wcu-vdiv" style={{ background: "rgba(48,83,74,.1)", width: 1 }} />

          {/* Checklists */}
          <div className={`wcu-rv ${vis?"on":""} wd1`} style={{ paddingLeft: "clamp(0px,3vw,48px)" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "clamp(1.5rem,3vw,2.5rem)",
            }}>
              {[
                { heading: "Track Record", items: trackRecord, gold: true  },
                { heading: "Our Support",  items: support,     gold: false },
              ].map(({ heading, items, gold }) => (
                <div key={heading}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 20, height: 2, background: gold ? "#C9862b" : "#30534A", borderRadius: 2 }} />
                    <h4 style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: 10, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: ".18em",
                      color: gold ? "#C9862b" : "#30534A", margin: 0,
                    }}>{heading}</h4>
                  </div>
                  <ul className="wcu-list">
                    {items.map(item => <CheckItem key={item} text={item} gold={gold} />)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── REASONS: Desktop ─── */}
        <div className={`wcu-rv ${vis?"on":""} wd2`}>
          <div className="wcu-desk">
            <style>{`.wcu-desk{display:none}@media(min-width:768px){.wcu-desk{display:block}}`}</style>
            {/* Section divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(1.2rem,2.5vw,2rem)" }}>
              <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
              <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>The Six Pillars</span>
              <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.08)" }} />
            </div>
            {reasons.map((r, i) => (
              <DesktopReasonRow
                key={r.title}
                reason={r} index={i}
                isActive={activeCard === i}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
            ))}
          </div>

          {/* ─── REASONS: Mobile ─── */}
          <div className="wcu-mob">
            <style>{`.wcu-mob{display:block}@media(min-width:768px){.wcu-mob{display:none}}`}</style>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(1rem,3vw,1.5rem)" }}>
              <div style={{ width: 28, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
              <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".35em", textTransform: "uppercase" }}>The Six Pillars</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "clamp(10px,2vw,14px)" }}>
              {reasons.map((r, i) => (
                <MobileReasonCard key={r.title} reason={r} index={i} visible={vis} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div className={`wcu-rv ${vis?"on":""} wd3`} style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            Integrity in every step
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["NMRDA Approved", "RERA Certified", "ISO Certified"].map((label) => (
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