"use client"

import { Wifi, Dumbbell, Trees, Zap, Shield, Users } from "lucide-react"
import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"

const amenities = [
  { icon: Wifi,      title: "Smart Home",        description: "Advanced IoT integration for modern living.",     category: "facilities"    },
  { icon: Dumbbell,  title: "Fitness Center",    description: "State-of-the-art gym facilities.",                category: "wellness"      },
  { icon: Trees,     title: "Green Spaces",      description: "Lush landscaping and parks.",                    category: "wellness"      },
  { icon: Zap,       title: "Power Backup",      description: "Uninterrupted power supply 24/7.",               category: "facilities"    },
  { icon: Shield,    title: "Security",          description: "CCTV surveillance and on-site personnel.",       category: "facilities"    },
  { icon: Users,     title: "Community Hub",     description: "Spaces for social gatherings.",                  category: "entertainment" },
  { emoji: "🏊",     title: "Swimming Pool",     description: "Olympic-sized pool with children's area.",       category: "wellness"      },
  { emoji: "🎮",     title: "Gaming Zone",       description: "Indoor games and entertainment facilities.",     category: "entertainment" },
  { emoji: "🧘",     title: "Yoga & Meditation", description: "Dedicated spaces for wellness activities.",      category: "wellness"      },
  { emoji: "🚗",     title: "Covered Parking",   description: "Secure multi-level parking facilities.",         category: "facilities"    },
  { emoji: "🎪",     title: "Banquet Hall",      description: "Event spaces for celebrations.",                 category: "entertainment" },
  { emoji: "👶",     title: "Kids Play Area",    description: "Safe and fun playground for children.",          category: "entertainment" },
]

const marqueeItems = [...amenities, ...amenities]

const tabs = [
  { key: "all",           label: "All Amenities" },
  { key: "wellness",      label: "Wellness"      },
  { key: "entertainment", label: "Fun & Social"  },
  { key: "facilities",    label: "Facilities"    },
]

const categoryColors: Record<string, string> = {
  wellness:      "#30534A",
  entertainment: "#C9862b",
  facilities:    "#0d0d0d",
}

const MarqueeStrip = memo(() => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      padding: "12px 0",
      maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    }}
  >
    <div style={{ display: "flex", gap: 12, width: "max-content", animation: "amen-mq 32s linear infinite" }}>
      {marqueeItems.map((a, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 9, flexShrink: 0,
          background: "rgba(48,83,74,0.07)",
          border: "1px solid rgba(48,83,74,0.13)",
          borderRadius: 999,
          padding: "9px 18px",
        }}>
          {(a as any).emoji
            ? <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{(a as any).emoji}</span>
            : <a.icon size={14} style={{ color: "#C9862b" }} />
          }
          <span style={{ fontSize: 12, fontWeight: 600, color: "#30534A", whiteSpace: "nowrap", fontFamily: "'Poppins',sans-serif" }}>
            {a.title}
          </span>
        </div>
      ))}
    </div>
  </div>
))
MarqueeStrip.displayName = "MarqueeStrip"

const AmenityCard = memo(({ amenity, index, visible }: { amenity: (typeof amenities)[number]; index: number; visible: boolean }) => {
  const Icon = (amenity as any).icon
  const isEmoji = !!(amenity as any).emoji
  const catColor = categoryColors[amenity.category] || "#30534A"

  return (
    <div
      className="amen-card"
      style={{
        position: "relative",
        background: "#fff",
        border: "1px solid rgba(48,83,74,0.1)",
        borderRadius: 20,
        padding: "clamp(16px,2vw,24px)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        overflow: "hidden",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${index * 45}ms, transform .65s cubic-bezier(.22,1,.36,1) ${index * 45}ms, box-shadow .25s ease, border-color .25s ease`,
      }}
    >
      {/* Top row: icon + index */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: 44, height: 44,
          borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(201,134,43,0.1)",
          border: "1px solid rgba(201,134,43,0.2)",
          flexShrink: 0,
        }}>
          {isEmoji
            ? <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{(amenity as any).emoji}</span>
            : <Icon size={19} style={{ color: "#C9862b" }} />
          }
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(48,83,74,0.18)", fontFamily: "'Cormorant Garamond',serif", lineHeight: 1, paddingTop: 2 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Text */}
      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.05rem,1.5vw,1.25rem)", fontWeight: 700, color: "#0d0d0d", margin: "0 0 5px", lineHeight: 1.15 }}>
          {amenity.title}
        </h3>
        <p style={{ fontSize: "clamp(11px,1vw,12.5px)", color: "#999", lineHeight: 1.7, margin: 0, fontFamily: "'Poppins',sans-serif", fontWeight: 400 }}>
          {amenity.description}
        </p>
      </div>

      {/* Category badge */}
      <div style={{
        display: "inline-flex", alignItems: "center",
        alignSelf: "flex-start",
        background: `${catColor}12`,
        border: `1px solid ${catColor}28`,
        borderRadius: 999,
        padding: "4px 10px",
      }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: catColor, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'Poppins',sans-serif" }}>
          {amenity.category}
        </span>
      </div>

      {/* Bottom hover bar */}
      <div className="amen-bar" style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 3,
        background: "linear-gradient(90deg,#C9862b,#30534A)",
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform .4s cubic-bezier(.22,1,.36,1)",
        borderRadius: "0 0 20px 20px",
      }} />
    </div>
  )
})
AmenityCard.displayName = "AmenityCard"

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.06 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = useMemo(
    () => activeTab === "all" ? amenities : amenities.filter((a) => a.category === activeTab),
    [activeTab]
  )

  return (
    <section
      id="amenities"
      ref={sectionRef}
      style={{ background: "#f7f4ef", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        @keyframes amen-mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* dot grid */
        .amen-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.065) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* card hover */
        .amen-card:hover {
          border-color: rgba(201,134,43,0.38) !important;
          box-shadow: 0 12px 36px rgba(48,83,74,0.12) !important;
          transform: translateY(-5px) !important;
        }
        .amen-card:hover .amen-bar { transform: scaleX(1) !important; }

        /* tab btn */
        .amen-tab {
          transition: background .22s, color .22s, border-color .22s, transform .22s;
          cursor: pointer; border: none;
        }
        .amen-tab:hover { transform: translateY(-1px) scale(1.04); }
        .amen-tab:active { transform: scale(.97); }

        /* reveal */
        .amen-rv { opacity:0; transform:translateY(32px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .amen-rv.on { opacity:1; transform:translateY(0); }
        .ad0{transition-delay:0ms}  .ad1{transition-delay:120ms}
        .ad2{transition-delay:240ms} .ad3{transition-delay:360ms}
      `}</style>

      {/* Dot grid bg */}
      <div className="amen-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: 0, left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* ─── TOP LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>
          Life Inside
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>
          12 Amenities
        </span>
      </div>

      {/* ─── HEADING + TABS ROW ─── */}
      <div
        style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "clamp(2rem,4vw,3.5rem) clamp(1.25rem,5vw,6rem) clamp(1.5rem,3vw,2.5rem)",
          position: "relative", zIndex: 10,
        }}
      >
        {/* Desktop: heading left, tabs right. Mobile: stacked */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(1.5rem,3vw,2rem)" }}>

          {/* Heading block */}
          <div className={`amen-rv ${isVisible ? "on" : ""} ad0`}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2.6rem,5.5vw,5rem)",
              lineHeight: 1.02,
              fontWeight: 600,
              color: "#0d0d0d",
              margin: 0,
            }}>
              Everything{" "}
              <em style={{ color: "#C9862b", fontStyle: "italic" }}>You</em>
              <br />
              <span style={{ WebkitTextStroke: "1.5px #30534A", color: "transparent" }}>Need</span>
            </h2>
            <p className={`amen-rv ${isVisible ? "on" : ""} ad1`} style={{ marginTop: 12, maxWidth: 440, color: "#888", fontSize: "clamp(.85rem,1.2vw,1rem)", lineHeight: 1.8, fontWeight: 400 }}>
              Comprehensive features designed to exceed your expectations — built for the way you actually live.
            </p>
          </div>

          {/* Tab group */}
          <div className={`amen-rv ${isVisible ? "on" : ""} ad1`} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tabs.map((t) => {
              const active = activeTab === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className="amen-tab"
                  style={{
                    padding: "9px 18px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".05em",
                    fontFamily: "'Poppins',sans-serif",
                    background: active ? "#30534A" : "rgba(48,83,74,.08)",
                    color: active ? "#fff" : "#30534A",
                    border: `1.5px solid ${active ? "#30534A" : "rgba(48,83,74,.18)"}`,
                    boxShadow: active ? "0 6px 20px rgba(48,83,74,.25)" : "none",
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── MARQUEE ─── */}
      <div className={`amen-rv ${isVisible ? "on" : ""} ad2`} style={{ position: "relative", zIndex: 10, marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
        <MarqueeStrip />
      </div>

      {/* ─── CARDS GRID ─── */}
      <div
        style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "0 clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)",
          position: "relative", zIndex: 10,
        }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px,18vw,240px),1fr))",
          gap: "clamp(10px,1.5vw,16px)",
        }}>
          {filtered.map((amenity, i) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={i} visible={isVisible} />
          ))}
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div
        className={`amen-rv ${isVisible ? "on" : ""} ad3`}
        style={{
          background: "#30534A",
          borderTop: "1px solid rgba(48,83,74,.2)",
          position: "relative", zIndex: 10,
        }}
      >
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            Designed for modern living
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Premium Build Quality", "Vastu Compliant", "24×7 Maintenance"].map((label) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9862b" }} />
                <span style={{ color: "rgba(255,255,255,.6)", fontSize: 11, fontWeight: 600, letterSpacing: ".08em" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}