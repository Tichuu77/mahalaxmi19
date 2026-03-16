"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { Award, Users, Building2, CheckCircle2, TrendingUp, Shield } from "lucide-react"

const TARGETS = { projects: 70, clients: 17000, years: 13, sqft: 500 } as const
const DURATION = 2000
const STEPS = 60

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, sqft: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animatedRef = useRef(false)

  const animateCounters = useCallback(() => {
    if (animatedRef.current) return
    animatedRef.current = true
    const interval = DURATION / STEPS
    let cur = { projects: 0, clients: 0, years: 0, sqft: 0 }
    timerRef.current = setInterval(() => {
      cur.projects = Math.min(cur.projects + TARGETS.projects / STEPS, TARGETS.projects)
      cur.clients  = Math.min(cur.clients  + TARGETS.clients  / STEPS, TARGETS.clients)
      cur.years    = Math.min(cur.years    + TARGETS.years    / STEPS, TARGETS.years)
      cur.sqft     = Math.min(cur.sqft     + TARGETS.sqft     / STEPS, TARGETS.sqft)
      setCounters({
        projects: Math.floor(cur.projects),
        clients:  Math.floor(cur.clients),
        years:    Math.floor(cur.years),
        sqft:     Math.floor(cur.sqft),
      })
      if (cur.projects >= TARGETS.projects && cur.clients >= TARGETS.clients && cur.years >= TARGETS.years && cur.sqft >= TARGETS.sqft) {
        clearInterval(timerRef.current!)
        setCounters(TARGETS)
      }
    }, interval)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setIsVisible(true); animateCounters() } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current) }
  }, [animateCounters])

  const features = useMemo(() => [
    { icon: Award,        text: "Premium Materials"    },
    { icon: Users,        text: "Expert Craftsmanship" },
    { icon: Shield,       text: "Quality Assurance"    },
    { icon: CheckCircle2, text: "Timely Delivery"      },
    { icon: TrendingUp,   text: "Value Appreciation"   },
    { icon: Building2,    text: "Modern Architecture"  },
  ], [])

  const stats = useMemo(() => [
    { value: counters.projects, suffix: "+",  label: "Completed Projects", icon: Building2  },
    { value: counters.clients,  suffix: "+",  label: "Happy Families",     icon: Users      },
    { value: counters.years,    suffix: "+",  label: "Years Experience",   icon: Award      },
    { value: counters.sqft,     suffix: "K+", label: "Sq.Ft Delivered",    icon: TrendingUp },
  ], [counters])

  const trust = useMemo(() => [
    { icon: Shield,       label: "NMRDA Sanctioned" },
    { icon: CheckCircle2, label: "RERA Approved"    },
    { icon: Award,        label: "ISO Certified"    },
  ], [])

  const vis = isVisible

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: "#f7f4ef", fontFamily: "'Poppins', sans-serif", overflow: "hidden", position: "relative" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        /* ─── Reveal ─── */
        .rv  { opacity:0; transform:translateY(38px); transition:opacity .75s cubic-bezier(.22,1,.36,1),transform .75s cubic-bezier(.22,1,.36,1); }
        .rv.on { opacity:1; transform:translateY(0); }
        .rv-l{ opacity:0; transform:translateX(-36px); transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1); }
        .rv-l.on{ opacity:1; transform:translateX(0); }

        .d0{transition-delay:0ms!important}   .d1{transition-delay:110ms!important}
        .d2{transition-delay:220ms!important} .d3{transition-delay:340ms!important}
        .d4{transition-delay:460ms!important} .d5{transition-delay:580ms!important}
        .d6{transition-delay:700ms!important}

        /* ─── Image ─── */
        .img-zoom { overflow:hidden; width:100%; height:100%; }
        .img-zoom img { display:block; width:100%; height:100%; object-fit:cover; transition:transform 1.1s cubic-bezier(.22,1,.36,1); will-change:transform; }
        .img-zoom:hover img { transform:scale(1.05); }

        /* ─── Stat card ─── */
        .scard { transition:transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s ease; }
        .scard:hover { transform:translateY(-5px) scale(1.025); }

        /* ─── Pill ─── */
        .pill { transition:background .2s,border-color .2s,transform .2s cubic-bezier(.22,1,.36,1); cursor:default; }
        .pill:hover { background:rgba(48,83,74,.14)!important; border-color:rgba(201,134,43,.5)!important; transform:scale(1.07) translateY(-1px); }

        /* ─── CTA ─── */
        .cta { transition:transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s ease; display:inline-flex; align-items:center; gap:10px; text-decoration:none; }
        .cta:hover { transform:translateY(-3px) scale(1.04); box-shadow:0 18px 40px rgba(48,83,74,.42)!important; }
        .cta svg { transition:transform .28s ease; }
        .cta:hover svg { transform:translateX(5px); }

        /* ─── Trust item ─── */
        .titem { transition:all .2s; cursor:default; display:flex; align-items:center; gap:9px; }
        .titem:hover span { color:#C9862b!important; }

        /* ─── Badge pulse ─── */
        @keyframes bpulse {
          0%,100%{ box-shadow:0 0 0 0 rgba(201,134,43,.4); }
          50%    { box-shadow:0 0 0 9px rgba(201,134,43,0); }
        }
        .bpulse { animation:bpulse 3s ease-in-out infinite; }

        /* ─── Dot grid bg ─── */
        .dotbg {
          background-image:radial-gradient(circle,rgba(48,83,74,.07) 1px,transparent 1px);
          background-size:20px 20px;
        }

        /* ─── Corner bracket decorations ─── */
        .cbracket { position:absolute; inset:20px; pointer-events:none; }
        .cbracket::before,.cbracket::after {
          content:''; position:absolute;
          width:20px; height:20px;
          border-style:solid; border-color:rgba(201,134,43,.35);
        }
        .cbracket::before { top:0; left:0; border-width:2px 0 0 2px; }
        .cbracket::after  { bottom:0; right:0; border-width:0 2px 2px 0; }

        /* ─── Vertical text ─── */
        .vtext {
          writing-mode:vertical-rl; text-orientation:mixed;
          transform:rotate(180deg); user-select:none; pointer-events:none;
          position:absolute; left:16px; top:50%; translate:0 -50%;
          color:rgba(255,255,255,.18); font-size:9px; font-weight:700;
          letter-spacing:.28em; text-transform:uppercase;
        }

        /* ─── Desktop layout ─── */
        .about-wrap {
          max-width:1400px; margin:0 auto;
          display:grid;
          grid-template-columns:1fr;
        }
        @media(min-width:1024px){
          .about-wrap {
            grid-template-columns:46% 54%;
            align-items:stretch;
          }
          .img-panel { min-height:700px; }
          .img-zoom  { height:100% !important; aspect-ratio:unset !important; }
          .content-panel { padding:72px 80px 72px 80px !important; }
        }
        @media(min-width:1280px){
          .about-wrap { grid-template-columns:44% 56%; }
          .img-panel  { min-height:740px; }
        }

        /* ─── Marquee ─── */
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mq-track { animation:mq 13s linear infinite; display:flex; white-space:nowrap; }
        .mq-track:hover { animation-play-state:paused; }
      `}</style>

      {/* ════════ TOP HEADER ROW ════════ */}
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"clamp(2.5rem,5vw,4.5rem) clamp(1.25rem,4vw,5rem) clamp(1.5rem,3vw,2.5rem)" }}>
        {/* Label */}
        <div className={`rv ${vis?"on":""} d0`} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"clamp(.5rem,1.2vw,.9rem)" }}>
          <div style={{ width:36, height:3, background:"linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius:2 }} />
          <span style={{ color:"#C9862b", fontSize:10, fontWeight:700, letterSpacing:".38em", textTransform:"uppercase" }}>Who We Are</span>
        </div>

        {/* Headline */}
        <h2 className={`rv ${vis?"on":""} d1`} style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(2.6rem,5.8vw,5rem)",
          lineHeight:1.02,
          fontWeight:600,
          color:"#0d0d0d",
          margin:0,
        }}>
          Where Luxury{" "}
          <em style={{ color:"#30534A", fontStyle:"italic" }}>Meets</em>
          <br />
          <span style={{ WebkitTextStroke:"2px #C9862b", color:"transparent" }}>Craft</span>
        </h2>
      </div>

      {/* ════════ SPLIT GRID ════════ */}
      <div className="about-wrap">

        {/* ── IMAGE PANEL ── */}
        <div className={`img-panel rv-l ${vis?"on":""} d1`} style={{ position:"relative" }}>
          <div className="img-zoom" style={{ aspectRatio:"4/3", position:"relative" }}>
            <img src="/aboutUs.webp" alt="Mahalaxmi Infra Premium Projects" loading="lazy" decoding="async" width={800} height={600} />

            {/* Overlay gradients */}
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(150deg,rgba(13,13,13,.55) 0%,rgba(13,13,13,.05) 50%,rgba(48,83,74,.5) 100%)", pointerEvents:"none" }} />

            {/* Vertical label */}
            <span className="vtext">Since 2012 · Nagpur · Since 2012 · Nagpur ·</span>

            {/* RERA badge */}
            <div className="bpulse" style={{
              position:"absolute", top:20, left:20,
              display:"flex", alignItems:"center", gap:7,
              background:"rgba(48,83,74,.92)", backdropFilter:"blur(14px)",
              border:"1px solid rgba(255,255,255,.18)",
              borderRadius:999, padding:"8px 16px",
            }}>
              <Award size={12} style={{ color:"#C9862b" }} />
              <span style={{ color:"#fff", fontSize:10, fontWeight:700, letterSpacing:".07em" }}>RERA Approved</span>
            </div>

            {/* Floating 13 yrs badge */}
            <div style={{
              position:"absolute", bottom:24, right:24,
              background:"#C9862b", borderRadius:18,
              padding:"18px 26px", textAlign:"center",
              boxShadow:"0 14px 40px rgba(201,134,43,.5)",
            }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3.2rem", color:"#fff", lineHeight:1, fontWeight:700 }}>13</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,.8)", letterSpacing:".3em", textTransform:"uppercase", marginTop:4 }}>Years</div>
            </div>

            {/* Bottom caption */}
            <div style={{
              position:"absolute", bottom:0, left:0, right:0,
              background:"linear-gradient(to top,rgba(13,13,13,.75) 0%,transparent 100%)",
              padding:"56px 24px 16px",
            }}>
              <p style={{ color:"rgba(255,255,255,.55)", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", margin:0, fontWeight:500 }}>
                Mahalaxmi Infra — Nagpur's Premier Developer
              </p>
            </div>
          </div>
        </div>

        {/* ── CONTENT PANEL ── */}
        <div
          className="content-panel dotbg"
          style={{
            padding:"clamp(2rem,5vw,3rem) clamp(1.25rem,4vw,5rem)",
            display:"flex", flexDirection:"column", justifyContent:"center",
            position:"relative",
          }}
        >
          <div className="cbracket" />

          {/* Body copy */}
          <div className={`rv ${vis?"on":""} d2`} style={{ marginBottom:"1.5rem" }}>
            <p style={{ fontSize:"clamp(.88rem,1.25vw,1.05rem)", color:"#3a3a3a", lineHeight:1.88, margin:"0 0 .85rem" }}>
              With over a decade of excellence in real estate development,{" "}
              <strong style={{ color:"#30534A", fontWeight:600 }}>Mahalaxmi Infra</strong> is committed to creating
              architectural landmarks that blend luxury, sustainability, and innovation in the heart of Nagpur.
            </p>
            <p style={{ fontSize:"clamp(.88rem,1.25vw,1.05rem)", color:"#3a3a3a", lineHeight:1.88, margin:0 }}>
              We build not just structures, but{" "}
              <strong style={{ color:"#C9862b", fontWeight:600 }}>thriving communities</strong>{" "}
              where families create lasting memories.
            </p>
          </div>

          {/* Feature pills */}
          <div className={`rv ${vis?"on":""} d3`} style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:"1.75rem" }}>
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="pill" style={{
                  display:"flex", alignItems:"center", gap:7,
                  background:"rgba(48,83,74,.07)",
                  border:"1px solid rgba(48,83,74,.14)",
                  borderRadius:999, padding:"8px 14px",
                }}>
                  <Icon size={12} style={{ color:"#C9862b", flexShrink:0 }} />
                  <span style={{ fontSize:12, fontWeight:600, color:"#30534A" }}>{f.text}</span>
                </div>
              )
            })}
          </div>

          {/* Stats bento 2×2 */}
          <div className={`rv ${vis?"on":""} d4`} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:"1.75rem" }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon
              const dark = i % 2 === 0
              return (
                <div key={i} className="scard" style={{
                  borderRadius:18,
                  padding:"clamp(14px,1.8vw,22px)",
                  background: dark ? "#30534A" : "#fff",
                  border: dark ? "none" : "1px solid rgba(48,83,74,.1)",
                  boxShadow: dark ? "0 10px 34px rgba(48,83,74,.22)" : "0 4px 20px rgba(0,0,0,.06)",
                  display:"flex", flexDirection:"column", gap:10,
                  position:"relative", overflow:"hidden",
                }}>
                  {/* Corner accent */}
                  <div style={{
                    position:"absolute", top:0, right:0,
                    width:44, height:44,
                    background: dark ? "rgba(201,134,43,.12)" : "rgba(48,83,74,.05)",
                    borderRadius:"0 18px 0 100%",
                  }} />
                  {/* Icon */}
                  <div style={{
                    width:38, height:38, borderRadius:10,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background: dark ? "rgba(255,255,255,.1)" : "rgba(48,83,74,.08)",
                  }}>
                    <Icon size={17} style={{ color:"#C9862b" }} />
                  </div>
                  {/* Number */}
                  <div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:"clamp(1.7rem,2.8vw,2.3rem)",
                      fontWeight:700, lineHeight:1,
                      color:"#C9862b",
                    }}>
                      {stat.value.toLocaleString()}<span style={{ fontSize:".72em" }}>{stat.suffix}</span>
                    </div>
                    <div style={{
                      marginTop:4, fontSize:11, fontWeight:500,
                      letterSpacing:".04em",
                      color: dark ? "rgba(255,255,255,.5)" : "#999",
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className={`rv ${vis?"on":""} d5`}>
            <a href="#projects" className="cta" style={{
              background:"linear-gradient(135deg,#30534A 0%,#3d6b60 100%)",
              color:"#fff",
              fontWeight:700, fontSize:13,
              letterSpacing:".06em",
              padding:"15px 30px",
              borderRadius:14,
              boxShadow:"0 10px 28px rgba(48,83,74,.3)",
            }}>
              Explore Our Projects
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ════════ TRUST STRIP ════════ */}
      <div className={`rv ${vis?"on":""} d6`} style={{ background:"#30534A", borderTop:"1px solid rgba(48,83,74,.2)" }}>
        {/* Desktop trust row */}
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 clamp(1.25rem,5vw,5rem)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16, padding:"20px 0" }}>
            <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"clamp(16px,3vw,48px)" }}>
              {trust.map((t, i) => {
                const Icon = t.icon
                return (
                  <div key={i} className="titem">
                    <div style={{
                      width:30, height:30, borderRadius:8,
                      background:"rgba(201,134,43,.15)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0,
                    }}>
                      <Icon size={13} style={{ color:"#C9862b" }} />
                    </div>
                    <span style={{ color:"rgba(255,255,255,.72)", fontSize:11, fontWeight:600, letterSpacing:".12em", textTransform:"uppercase" }}>
                      {t.label}
                    </span>
                  </div>
                )
              })}
            </div>
            <p style={{ color:"rgba(255,255,255,.28)", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", margin:0 }}>
              Building Trust Since 2012
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}