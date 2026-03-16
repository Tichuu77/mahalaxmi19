"use client"

import { ChevronDown, Home, Calendar, Briefcase, CheckCircle } from "lucide-react"
import { useState, useEffect, useRef, useCallback, memo } from "react"

const guides = [
  {
    number: "01",
    title: "Explore Properties",
    description: "Browse our extensive collection of premium residential and commercial properties in Nagpur.",
    icon: Home,
    details: [
      "Filter properties by location, price, and amenities",
      "Save your favourite properties to a wishlist",
      "Compare multiple plots side by side",
    ],
  },
  {
    number: "02",
    title: "Schedule Site Visit",
    description: "Book a personalised site visit with our expert consultants to experience the property firsthand.",
    icon: Calendar,
    details: [
      "Select your preferred date and time",
      "Our team confirms your visit within 24 hours",
      "Receive directions and consultant contact details",
    ],
  },
  {
    number: "03",
    title: "Consultation & Financing",
    description: "Get expert advice on financing options and investment benefits from our experienced team.",
    icon: Briefcase,
    details: [
      "Discuss investment strategies with our experts",
      "Explore financing and payment plan options",
      "Get personalised financial guidance",
    ],
  },
  {
    number: "04",
    title: "Complete Purchase",
    description: "Finalise your investment with our transparent, hassle-free documentation process.",
    icon: CheckCircle,
    details: [
      "Sign all required legal documents",
      "Complete payment processing securely",
      "Receive your property documentation",
    ],
  },
]

const tips = [
  { emoji: "💡", label: "Pro Tip",       text: "Visit plots at different times of day — morning light and evening atmosphere matter." },
  { emoji: "🎯", label: "Best Practice", text: "Review all legal documents carefully and ask our experts for any clarifications." },
  { emoji: "📞", label: "Support",       text: "Our team is reachable anytime — we're with you at every step of the journey." },
]

/* ─── Detail List ─── */
const DetailList = memo(({ details, compact = false }: { details: string[]; compact?: boolean }) => (
  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: compact ? 8 : 12 }}>
    {details.map((d, i) => (
      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{
          width: compact ? 18 : 22, height: compact ? 18 : 22,
          borderRadius: "50%", flexShrink: 0, marginTop: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(201,134,43,.1)",
          border: "1px solid rgba(201,134,43,.25)",
        }}>
          {compact
            ? <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9862b", display: "block" }} />
            : <CheckCircle size={11} style={{ color: "#C9862b" }} />
          }
        </span>
        <span style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: compact ? "clamp(.78rem,1vw,.88rem)" : "clamp(.85rem,1.1vw,.95rem)",
          color: "#666", lineHeight: 1.75, fontWeight: 400,
        }}>{d}</span>
      </li>
    ))}
  </ul>
))
DetailList.displayName = "DetailList"

/* ─── Active Step Panel (desktop right) ─── */
const ActiveStepPanel = memo(({ guide }: { guide: typeof guides[0] }) => {
  const Icon = guide.icon
  return (
    <div style={{
      background: "rgba(48,83,74,.04)",
      border: "1px solid rgba(48,83,74,.1)",
      borderRadius: 22,
      padding: "clamp(22px,3vw,36px)",
      marginBottom: 20,
      position: "relative", overflow: "hidden",
      animation: "ugPanelIn .4s cubic-bezier(.22,1,.36,1)",
    }}>
      {/* Corner decoration */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: "rgba(201,134,43,.06)", borderRadius: "0 22px 0 100%" }} />

      {/* Watermark number */}
      <div style={{
        position: "absolute", bottom: -10, right: 16,
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "6rem", fontWeight: 700,
        color: "rgba(48,83,74,.06)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>{guide.number}</div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#30534A",
          border: "1px solid rgba(48,83,74,.2)",
          boxShadow: "0 8px 22px rgba(48,83,74,.22)",
        }}>
          <Icon size={22} style={{ color: "#C9862b" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 2, background: "#C9862b", borderRadius: 2 }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#C9862b" }}>
            Step {guide.number}
          </span>
        </div>
      </div>

      <h3 style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "clamp(1.4rem,2.2vw,1.75rem)",
        fontWeight: 700, color: "#0d0d0d",
        margin: "0 0 8px", lineHeight: 1.15,
      }}>{guide.title}</h3>

      <p style={{
        fontFamily: "'Poppins',sans-serif",
        fontSize: "clamp(.85rem,1.2vw,.95rem)",
        color: "#888", lineHeight: 1.8, margin: "0 0 22px", fontWeight: 400,
      }}>{guide.description}</p>

      <DetailList details={guide.details} />
    </div>
  )
})
ActiveStepPanel.displayName = "ActiveStepPanel"

/* ─── Guide Step (accordion) ─── */
const GuideStep = memo(({ guide, index, isOpen, onToggle, visible }: {
  guide: typeof guides[0]; index: number
  isOpen: boolean; onToggle: (i: number) => void; visible: boolean
}) => {
  const Icon = guide.icon
  const handleClick = useCallback(() => onToggle(index), [onToggle, index])

  return (
    <div
      className="ug-step"
      style={{
        border: `1px solid ${isOpen ? "rgba(201,134,43,.38)" : "rgba(48,83,74,.1)"}`,
        background: isOpen ? "#fff" : "rgba(48,83,74,.025)",
        borderRadius: 18, overflow: "hidden",
        boxShadow: isOpen ? "0 8px 28px rgba(48,83,74,.1)" : "none",
        transform: isOpen ? "translateX(5px)" : "translateX(0)",
        transition: "all .32s cubic-bezier(.22,1,.36,1)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 70}ms`,
      }}
    >
      <button
        onClick={handleClick}
        style={{
          width: "100%", textAlign: "left",
          display: "flex", alignItems: "center", gap: 14,
          padding: "clamp(14px,2vw,20px) clamp(16px,2.5vw,22px)",
          background: "none", border: "none", cursor: "pointer",
        }}
      >
        {/* Cormorant index */}
        <span style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(1.4rem,2.2vw,1.75rem)",
          fontWeight: 700, lineHeight: 1, flexShrink: 0,
          color: isOpen ? "#C9862b" : "rgba(48,83,74,.18)",
          transition: "color .28s",
          minWidth: 38, userSelect: "none",
        }}>{guide.number}</span>

        {/* Icon box */}
        <div style={{
          width: 40, height: 40, borderRadius: 11, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isOpen ? "#30534A" : "rgba(48,83,74,.08)",
          border: `1px solid ${isOpen ? "#30534A" : "rgba(48,83,74,.14)"}`,
          boxShadow: isOpen ? "0 6px 18px rgba(48,83,74,.22)" : "none",
          transition: "all .28s",
        }}>
          <Icon size={17} style={{ color: isOpen ? "#C9862b" : "#30534A", transition: "color .28s" }} />
        </div>

        {/* Title + description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(1.05rem,1.6vw,1.25rem)",
            fontWeight: 700,
            color: isOpen ? "#30534A" : "#0d0d0d",
            margin: "0 0 3px", lineHeight: 1.15,
            transition: "color .28s",
          }}>{guide.title}</h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(11px,1vw,13px)", color: "#aaa", margin: 0, lineHeight: 1.6, fontWeight: 400 }}>
            {guide.description}
          </p>
        </div>

        {/* Chevron in circle */}
        <div style={{
          width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isOpen ? "rgba(201,134,43,.12)" : "rgba(48,83,74,.07)",
          border: `1px solid ${isOpen ? "rgba(201,134,43,.25)" : "rgba(48,83,74,.12)"}`,
          transition: "all .28s",
        }}>
          <ChevronDown size={14} style={{
            color: isOpen ? "#C9862b" : "rgba(48,83,74,.35)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .32s cubic-bezier(.22,1,.36,1)",
          }} />
        </div>
      </button>

      {/* Expanded detail (mobile only — desktop shows in right panel) */}
      <div style={{ maxHeight: isOpen ? "240px" : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.22,1,.36,1)" }} className="ug-mob-detail">
        <div style={{
          padding: `0 clamp(16px,2.5vw,22px) clamp(14px,2vw,20px)`,
          paddingLeft: `calc(clamp(16px,2.5vw,22px) + 38px + 14px + 40px + 14px)`,
          borderTop: "1px solid rgba(48,83,74,.07)",
          paddingTop: 14,
        }}>
          <DetailList details={guide.details} compact />
        </div>
      </div>
    </div>
  )
})
GuideStep.displayName = "GuideStep"

/* ─── Tips Grid ─── */
const TipsGrid = memo(({ visible }: { visible: boolean }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "clamp(10px,2vw,16px)" }}>
    {tips.map((tip, i) => (
      <div key={i} style={{
        background: i === 0 ? "#30534A" : "#fff",
        border: `1px solid ${i === 0 ? "#30534A" : "rgba(48,83,74,.1)"}`,
        borderRadius: 18,
        padding: "clamp(16px,2.5vw,24px)",
        display: "flex", flexDirection: "column", gap: 12,
        boxShadow: i === 0 ? "0 10px 30px rgba(48,83,74,.2)" : "0 4px 16px rgba(48,83,74,.06)",
        position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${i * 90}ms, transform .65s cubic-bezier(.22,1,.36,1) ${i * 90}ms`,
      }}>
        {/* Corner accent */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: 40, height: 40,
          background: i === 0 ? "rgba(201,134,43,.15)" : "rgba(48,83,74,.05)",
          borderRadius: "0 18px 0 100%",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{tip.emoji}</span>
          <span style={{
            fontFamily: "'Poppins',sans-serif", fontSize: 9, fontWeight: 700,
            letterSpacing: ".22em", textTransform: "uppercase",
            color: i === 0 ? "#C9862b" : "#30534A",
          }}>{tip.label}</span>
        </div>

        <p style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: "clamp(.82rem,1.1vw,.92rem)",
          color: i === 0 ? "rgba(255,255,255,.7)" : "#777",
          lineHeight: 1.75, margin: 0, fontWeight: 400,
        }}>{tip.text}</p>

        {/* Bottom accent bar */}
        <div style={{ height: 2, borderRadius: 1, background: i === 0 ? "rgba(201,134,43,.4)" : "rgba(48,83,74,.12)", marginTop: "auto" }} />
      </div>
    ))}
  </div>
))
TipsGrid.displayName = "TipsGrid"

/* ─── Section ─── */
export function UserGuideSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
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

  const handleToggle    = useCallback((i: number) => setExpandedIndex(prev => prev === i ? null : i), [])
  const handleStepClick = useCallback((i: number) => setExpandedIndex(i), [])
  const vis = isVisible

  return (
    <section
      ref={sectionRef}
      id="user-guide"
      style={{ background: "#fff", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        .ug-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* step hover */
        .ug-step:hover { border-color: rgba(48,83,74,.22) !important; background: rgba(48,83,74,.04) !important; }

        /* panel entry */
        @keyframes ugPanelIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

        /* show/hide mobile detail vs desktop panel */
        .ug-mob-detail { display:block; }
        @media(min-width:1024px){ .ug-mob-detail { display:none !important; } }

        /* desktop right panel */
        .ug-right { display:none; }
        @media(min-width:1024px){ .ug-right { display:flex; flex-direction:column; justify-content:flex-start; padding-left:clamp(1.5rem,3vw,48px); padding-top:4px; } }

        /* vdiv */
        .ug-vdiv { display:none; }
        @media(min-width:1024px){ .ug-vdiv { display:block; } }

        /* main grid */
        .ug-grid { display:grid; grid-template-columns:1fr; }
        @media(min-width:1024px){ .ug-grid { grid-template-columns:1fr 1px 1fr; align-items:start; } }

        /* reveal */
        .ug-rv { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .ug-rv.on { opacity:1; transform:translateY(0); }
        .ud0{transition-delay:0ms}   .ud1{transition-delay:120ms}
        .ud2{transition-delay:240ms} .ud3{transition-delay:360ms}
      `}</style>

      {/* Dot grid */}
      <div className="ug-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", bottom: "10%", left: "20%", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "10%", right: "12%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      {/* Right stripe */}
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom,#30534A,#C9862b,#30534A)", zIndex: 2 }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>How It Works</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>4 Simple Steps</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>

        {/* ─── HEADING ─── */}
        <div className={`ug-rv ${vis?"on":""} ud0`} style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.5rem,1.2vw,.9rem)" }}>
            <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
            <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Your Journey</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(2.6rem,5.5vw,5rem)",
            lineHeight: 1.02, fontWeight: 600,
            color: "#0d0d0d", margin: "0 0 12px",
          }}>
            How to{" "}
            <em style={{ color: "#30534A", fontStyle: "italic" }}>Get</em>
            <br />
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Started</span>
          </h2>
          <p style={{ fontSize: "clamp(.88rem,1.25vw,1.05rem)", color: "#888", lineHeight: 1.85, maxWidth: 480, margin: 0, fontWeight: 400 }}>
            Follow our simple step-by-step guide to find, visit, finance, and own your dream plot in Nagpur.
          </p>
        </div>

        {/* ─── TWO-COLUMN ─── */}
        <div className="ug-grid">

          {/* LEFT — accordion */}
          <div className={`ug-rv ${vis?"on":""} ud1`} style={{ paddingRight: "clamp(0px,3vw,48px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1.5vw,12px)" }}>
              {guides.map((guide, i) => (
                <GuideStep
                  key={guide.number}
                  guide={guide} index={i}
                  isOpen={expandedIndex === i}
                  onToggle={handleToggle}
                  visible={vis}
                />
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="ug-vdiv" style={{ background: "rgba(48,83,74,.1)", width: 1, alignSelf: "stretch" }} />

          {/* RIGHT — active step panel */}
          <div className={`ug-right ug-rv ${vis?"on":""} ud2`}>
            {expandedIndex !== null && (
              <ActiveStepPanel key={expandedIndex} guide={guides[expandedIndex]} />
            )}

            {/* Step progress bar */}
            <div>
              <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                {guides.map((g, i) => (
                  <button key={g.number} onClick={() => handleStepClick(i)} aria-label={`Step ${g.number}`} style={{
                    flex: 1, height: 6, borderRadius: 3, border: "none", cursor: "pointer",
                    background: expandedIndex === i ? "linear-gradient(90deg,#C9862b,#30534A)" : "rgba(48,83,74,.12)",
                    transition: "background .3s ease",
                  }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {guides.map((g, i) => (
                  <span key={g.number} style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1rem", fontWeight: 700,
                    color: expandedIndex === i ? "#C9862b" : "rgba(48,83,74,.22)",
                    transition: "color .3s",
                  }}>{g.number}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── QUICK TIPS ─── */}
        <div className={`ug-rv ${vis?"on":""} ud3`} style={{ marginTop: "clamp(2.5rem,5vw,4rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(1.2rem,2.5vw,2rem)" }}>
            <div style={{ width: 28, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".35em", textTransform: "uppercase", color: "#C9862b" }}>
              Quick Tips
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.08)" }} />
          </div>
          <TipsGrid visible={vis} />
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            Simple. Transparent. Yours.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["No Hidden Steps", "Guided Process", "Expert Support"].map((label) => (
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