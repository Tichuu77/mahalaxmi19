"use client"

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"
import { ArrowRight, MapPin, Phone } from "lucide-react"

type Project = {
  id: number
  title: string
  image: string
  description: string
  location: string
  status: string
}

const projects = {
  ongoing: [
    { id: 2,  title: "Mahalaxmi Nagar-31",    image: "/ongoingProject8.webp",   description: "Ready to move residential layout on Besa-Pipla Road, opposite Zudio & Croma. Prime location with up to 90% bank finance.",                                                               location: "MOUZA - BESA",                      status: "ongoing"   },
    { id: 3,  title: "Mahalaxmi Nagar-39",    image: "/ongoingProject5.webp",   description: "New project on Katol Road, Fetri (Chicholi), touching Outer Ring Road. Fully developed NMRDA & RL sanctioned.",                                                                           location: "MOUZA - FETRI",                     status: "ongoing"   },
    { id: 4,  title: "Mahalaxmi Nagar-41",    image: "/ongoingProject3.webp",   description: "Premium layout near Samruddhi Mahamarg with clubhouse & swimming pool. NMRDA + RL approved. Up to 90% finance.",                                                                           location: "MOUZA - GOMGAON",                   status: "ongoing"   },
    { id: 5,  title: "Mahalaxmi Nagar - 42",  image: "/ongoingProject2.webp",   description: "Well-connected plots near Jamtha, Wardha Road. NMRDA & RL sanctioned with excellent amenities.",                                                                                           location: "MOUZA - JAMTHA",                    status: "ongoing"   },
    { id: 6,  title: "Mahalaxmi Nagar - 43",  image: "/project_43.jpg",         description: "Ready-to-move plots behind Royal Gondwana School, Shankarpur. Fully developed with 90% finance.",                                                                                          location: "MOUZA - SHANKARPUR",                status: "ongoing"   },
    { id: 7,  title: "Mahalaxmi Nagar - 45",  image: "/project_M-45.jpg",       description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.",                                                                                               location: "MOUZA - SUMTHANA",                  status: "ongoing"   },
    { id: 8,  title: "Mahalaxmi Nagar - 46",  image: "/ongoingProject11.webp",  description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.",                                                                                               location: "MOUZA - SUMTHANA",                  status: "ongoing"   },
    { id: 9,  title: "Tattva Apas",           image: "/tatava apas.webp",       description: "Tattva Apas offers contemporary living with 100+ meticulously crafted apartments. Featuring landscaped gardens, play areas, and fitness centers, it fosters a vibrant social atmosphere.", location: "MOUZA - BELTARODI",                 status: "ongoing"   },
    { id: 11, title: "Mahalaxmi Nagar - 47",  image: "/ongoingProject12.jpg",   description: "New launch behind Haldiram & AM Cinema on Koradi Road. NMRDA & RL approved with 90% finance.",                                                                                            location: "KORADI ROAD (Behind Haldiram)",     status: "ongoing"   },
  ],
  completed: [
    { id: 12, title: "Mahalaxmi Nagar - 37",  image: "/completedProject1.webp", description: "NMRDA & RL sanctioned layout in Kotewada. 75-80% bank loan approved.",   location: "MOUZA - KOTEWADA", status: "completed" },
    { id: 13, title: "Mahalaxmi Nagar - 35",  image: "/completedProject2.webp", description: "Fully delivered premium layout with all amenities completed.",            location: "MOUZA - KOTEWADA", status: "completed" },
    { id: 14, title: "Mahalaxmi Nagar - 34",  image: "/completedProject3.webp", description: "Successfully delivered project with high appreciation value.",            location: "MOUZA - BAHADURA", status: "completed" },
  ],
  upcoming: [
    { id: 15, title: "Mahalaxmi Nagar - 48",  image: "/plotDef.avif", description: "", location: "", status: "upcoming" },
    { id: 16, title: "Mahalaxmi Nagar - 49",  image: "/plotDef.avif", description: "", location: "", status: "upcoming" },
    { id: 17, title: "Mahalaxmi Nagar - 50",  image: "/plotDef.avif", description: "", location: "", status: "upcoming" },
  ],
}

const ALL_PROJECTS: Project[] = [
  ...projects.completed,
  ...projects.ongoing,
  ...projects.upcoming,
]

const STATUS_CONFIG = {
  completed: { label: "Completed", dot: "#22c55e", bg: "rgba(34,197,94,0.1)",   text: "#16a34a", border: "rgba(34,197,94,0.35)"   },
  ongoing:   { label: "Ongoing",   dot: "#C9862b", bg: "rgba(201,134,43,0.12)", text: "#a86a1a", border: "rgba(201,134,43,0.4)"   },
  upcoming:  { label: "Upcoming",  dot: "#3b82f6", bg: "rgba(59,130,246,0.1)",  text: "#2563eb", border: "rgba(59,130,246,0.35)"  },
}

const TAGS = ["NMRDA Approved", "Bank Finance"]
const FEATURED_TAGS = [...TAGS, "RERA Certified"]

const TABS = [
  { label: "All",       value: "all"       },
  { label: "Ongoing",   value: "ongoing"   },
  { label: "Completed", value: "completed" },
  { label: "Upcoming",  value: "upcoming"  },
] as const

type TabValue = (typeof TABS)[number]["value"]

const waUrl = (title: string, location: string) =>
  `https://wa.me/919322987615?text=${encodeURIComponent(`Hi, I'm interested in "${title}" at ${location}. Could you share more details?`)}`

/* ─── Featured Card ─── */
const FeaturedCard = memo(({ project }: { project: Project }) => {
  const cfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG]
  const handleWA = useCallback(() => window.open(waUrl(project.title, project.location), "_blank"), [project.title, project.location])

  return (
    <div className="proj-featured" style={{
      background: "#fff",
      border: "1px solid rgba(48,83,74,0.13)",
      borderRadius: 24,
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(48,83,74,0.1)",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>

        {/* Image */}
        <div className="proj-feat-img" style={{ position: "relative", overflow: "hidden", minHeight: 240 }}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 1s cubic-bezier(.22,1,.36,1)" }}
            className="proj-feat-photo"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,.72) 0%, rgba(13,13,13,.1) 55%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(48,83,74,.35) 0%, transparent 60%)", pointerEvents: "none" }} />

          {/* Status badge */}
          <div style={{
            position: "absolute", top: 18, left: 18,
            display: "flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,.92)",
            border: `1px solid ${cfg.border}`,
            backdropFilter: "blur(10px)",
            borderRadius: 999,
            padding: "7px 14px",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, flexShrink: 0, boxShadow: `0 0 5px ${cfg.dot}` }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: cfg.text, fontFamily: "'Poppins',sans-serif" }}>
              {cfg.label}
            </span>
          </div>

          {/* Mobile title overlay */}
          <div className="proj-mob-title" style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 24, height: 2, background: "#C9862b", borderRadius: 2 }} />
              <span style={{ color: "#C9862b", fontSize: 9, fontWeight: 700, letterSpacing: ".35em", textTransform: "uppercase", fontFamily: "'Poppins',sans-serif" }}>Featured Project</span>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff", lineHeight: 1.05, margin: 0, textShadow: "0 2px 8px rgba(0,0,0,.4)" }}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "clamp(24px,4vw,44px)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20 }}>
          <div>
            {/* Desktop title */}
            <div className="proj-desk-title" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
                <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".35em", textTransform: "uppercase", fontFamily: "'Poppins',sans-serif" }}>Featured Project</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,2.8vw,2.6rem)", fontWeight: 700, color: "#0d0d0d", lineHeight: 1.05, margin: 0 }}>
                {project.title}
              </h3>
            </div>

            {/* Location */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(201,134,43,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={12} style={{ color: "#C9862b" }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#aaa", fontFamily: "'Poppins',sans-serif" }}>
                {project.location}
              </span>
            </div>

            <p style={{ fontSize: "clamp(.85rem,1.2vw,1rem)", color: "#666", lineHeight: 1.85, margin: "0 0 20px", fontFamily: "'Poppins',sans-serif", fontWeight: 400 }}>
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FEATURED_TAGS.map((tag) => (
                <span key={tag} style={{
                  fontSize: 11, fontWeight: 600,
                  background: "rgba(48,83,74,.07)",
                  border: "1px solid rgba(48,83,74,.18)",
                  color: "#30534A",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontFamily: "'Poppins',sans-serif",
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button onClick={handleWA} className="proj-cta-btn" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "linear-gradient(135deg,#30534A 0%,#3d6b60 100%)",
            color: "#fff",
            fontWeight: 700, fontSize: 13,
            letterSpacing: ".06em",
            padding: "15px 28px",
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 10px 28px rgba(48,83,74,.3)",
            fontFamily: "'Poppins',sans-serif",
            transition: "transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s ease",
          }}>
            <Phone size={14} />
            Contact Us
            <ArrowRight size={14} className="proj-arr" style={{ transition: "transform .28s ease" }} />
          </button>
        </div>
      </div>
    </div>
  )
})
FeaturedCard.displayName = "FeaturedCard"

/* ─── Project Card ─── */
const ProjectCard = memo(({ project, index, visible }: { project: Project; index: number; visible: boolean }) => {
  const cfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG]
  const handleWA = useCallback(() => window.open(waUrl(project.title, project.location), "_blank"), [project.title, project.location])

  return (
    <div className="proj-card" style={{
      background: "#fff",
      border: "1px solid rgba(48,83,74,0.1)",
      borderRadius: 20,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 16px rgba(48,83,74,0.07)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${60 + index * 55}ms, transform .65s cubic-bezier(.22,1,.36,1) ${60 + index * 55}ms, box-shadow .25s ease, border-color .25s ease`,
    }}>

      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 210, flexShrink: 0 }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="proj-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .9s cubic-bezier(.22,1,.36,1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,13,13,.5) 0%,transparent 55%)", pointerEvents: "none" }} />

        {/* Status */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,.92)",
          border: `1px solid ${cfg.border}`,
          backdropFilter: "blur(8px)",
          borderRadius: 999, padding: "6px 12px",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: cfg.text, fontFamily: "'Poppins',sans-serif" }}>
            {cfg.label}
          </span>
        </div>

        {/* Index watermark */}
        <div style={{
          position: "absolute", bottom: 10, right: 14,
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "2.5rem", fontWeight: 700,
          color: "rgba(255,255,255,.18)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "clamp(16px,2vw,22px)", display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem,1.8vw,1.45rem)", fontWeight: 700, color: "#0d0d0d", margin: 0, lineHeight: 1.15 }}>
          {project.title}
        </h3>

        {project.location && (
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <MapPin size={11} style={{ color: "#C9862b", flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#bbb", fontFamily: "'Poppins',sans-serif" }}>
              {project.location}
            </span>
          </div>
        )}

        {project.description && (
          <p style={{
            fontSize: "clamp(11px,1.1vw,13px)", color: "#888", lineHeight: 1.75, margin: 0,
            fontFamily: "'Poppins',sans-serif", fontWeight: 400, flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          } as React.CSSProperties}>
            {project.description}
          </p>
        )}

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TAGS.map((tag) => (
            <span key={tag} style={{
              fontSize: 9, fontWeight: 700,
              background: "rgba(201,134,43,.08)",
              border: "1px solid rgba(201,134,43,.22)",
              color: "#a86a1a",
              borderRadius: 999, padding: "4px 10px",
              letterSpacing: ".06em",
              fontFamily: "'Poppins',sans-serif",
            }}>{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <button onClick={handleWA} className="proj-card-btn" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          background: "rgba(48,83,74,.07)",
          color: "#30534A",
          fontWeight: 700, fontSize: 11,
          letterSpacing: ".06em",
          padding: "12px 20px",
          borderRadius: 12,
          border: "1.5px solid rgba(48,83,74,.18)",
          cursor: "pointer", width: "100%",
          fontFamily: "'Poppins',sans-serif",
          transition: "all .25s cubic-bezier(.22,1,.36,1)",
          marginTop: "auto",
        }}>
          <Phone size={12} />
          Contact Us
          <ArrowRight size={12} style={{ transition: "transform .25s ease" }} className="proj-card-arr" />
        </button>
      </div>

      {/* Bottom bar */}
      <div className="proj-card-bar" style={{
        height: 3,
        background: "linear-gradient(90deg,#C9862b,#30534A)",
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform .4s cubic-bezier(.22,1,.36,1)",
      }} />
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

/* ─── Section ─── */
export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabValue>("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasAnimated.current) { setIsVisible(true); hasAnimated.current = true } },
      { threshold: 0.05, rootMargin: "60px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = useMemo(
    () => activeTab === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.status === activeTab),
    [activeTab]
  )

  const [featured, ...rest] = filtered

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ background: "#f7f4ef", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        /* dot bg */
        .proj-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.065) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* featured card responsive split */
        @media (min-width: 900px) {
          .proj-featured > div { grid-template-columns: 1.4fr 1fr !important; }
          .proj-feat-img { min-height: 420px !important; }
          .proj-mob-title { display: none !important; }
        }
        @media (max-width: 899px) {
          .proj-desk-title { display: none !important; }
          .proj-feat-img { min-height: 260px !important; }
          .proj-feat-photo { min-height: 260px; }
        }

        /* featured hover */
        .proj-featured:hover .proj-feat-photo { transform: scale(1.04); }
        .proj-featured:hover { box-shadow: 0 16px 56px rgba(48,83,74,.16) !important; border-color: rgba(201,134,43,.3) !important; }

        /* CTA hover */
        .proj-cta-btn:hover { transform: translateY(-3px) scale(1.03) !important; box-shadow: 0 18px 40px rgba(48,83,74,.4) !important; }
        .proj-cta-btn:hover .proj-arr { transform: translateX(5px); }

        /* card hover */
        .proj-card:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 44px rgba(48,83,74,.14) !important; border-color: rgba(201,134,43,.35) !important; }
        .proj-card:hover .proj-card-img { transform: scale(1.06); }
        .proj-card:hover .proj-card-bar { transform: scaleX(1) !important; }
        .proj-card:hover .proj-card-btn { background: #30534A !important; color: #fff !important; border-color: transparent !important; box-shadow: 0 6px 18px rgba(48,83,74,.28) !important; }
        .proj-card:hover .proj-card-arr { transform: translateX(4px); }

        /* tab */
        .proj-tab { transition: background .22s, color .22s, box-shadow .22s, transform .22s; cursor: pointer; border: none; }
        .proj-tab:hover { transform: translateY(-1px) scale(1.04); }
        .proj-tab:active { transform: scale(.97); }

        /* reveal */
        .proj-rv { opacity:0; transform:translateY(30px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .proj-rv.on { opacity:1; transform:translateY(0); }
        .pd0{transition-delay:0ms} .pd1{transition-delay:120ms} .pd2{transition-delay:240ms}
      `}</style>

      {/* Dot grid */}
      <div className="proj-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: 0, right: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Portfolio</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>70+ Projects</span>
      </div>

      {/* ─── HEADING + TABS ─── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2rem,4vw,3.5rem) clamp(1.25rem,5vw,6rem) clamp(1.5rem,3vw,2.5rem)", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(1.2rem,3vw,2rem)" }}>

          {/* Heading */}
          <div className={`proj-rv ${isVisible ? "on" : ""} pd0`}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2.6rem,5.5vw,5rem)",
              lineHeight: 1.02,
              fontWeight: 600,
              color: "#0d0d0d",
              margin: 0,
            }}>
              Our{" "}
              <em style={{ color: "#30534A", fontStyle: "italic" }}>Projects</em>
              <br />
              &amp;{" "}
              <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Portfolio</span>
            </h2>
            <p className={`proj-rv ${isVisible ? "on" : ""} pd1`} style={{ marginTop: 12, maxWidth: 420, color: "#888", fontSize: "clamp(.85rem,1.2vw,1rem)", lineHeight: 1.8, fontWeight: 400 }}>
              Explore our completed, ongoing, and upcoming developments across Nagpur.
            </p>
          </div>

          {/* Tabs */}
          <div className={`proj-rv ${isVisible ? "on" : ""} pd1`} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TABS.map((t) => {
              const active = activeTab === t.value
              return (
                <button key={t.value} onClick={() => setActiveTab(t.value)} className="proj-tab" style={{
                  padding: "9px 20px",
                  borderRadius: 999,
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: ".05em",
                  fontFamily: "'Poppins',sans-serif",
                  background: active ? "#30534A" : "rgba(48,83,74,.08)",
                  color: active ? "#fff" : "#30534A",
                  border: `1.5px solid ${active ? "#30534A" : "rgba(48,83,74,.18)"}`,
                  boxShadow: active ? "0 6px 20px rgba(48,83,74,.25)" : "none",
                }}>
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── CARDS ─── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>🏗️</div>
            <p style={{ color: "#bbb", fontFamily: "'Poppins',sans-serif", fontSize: "1rem" }}>No projects in this category yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vw,24px)" }}>

            {/* Featured */}
            {featured && (
              <div className={`proj-rv ${isVisible ? "on" : ""} pd1`}>
                <FeaturedCard project={featured} />
              </div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(260px,28vw,340px),1fr))",
                gap: "clamp(12px,2vw,20px)",
              }}>
                {rest.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} visible={isVisible} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div className={`proj-rv ${isVisible ? "on" : ""} pd2`} style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            Building landmarks since 2012
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["NMRDA Approved", "Up to 90% Finance", "RERA Certified"].map((label) => (
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