"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowRight, MapPin, TrendingUp, Award, Shield, CheckCircle2 } from "lucide-react"

const STATS = [
  { value: "70+",     label: "Completed\nProjects",  icon: Award        },
  { value: "17,000+", label: "Happy\nFamilies",      icon: Shield       },
  { value: "100%",    label: "RERA\nApproved",       icon: CheckCircle2 },
]

const MOBILE_STATS = [
  { value: "70+",  label: "Projects"     },
  { value: "17K+", label: "Families"     },
  { value: "100%", label: "RERA Approved"},
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const L = isLoaded

  return (
    <section
      className="relative min-h-screen flex items-stretch overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

        /* ─── Base reveal ─── */
        .h-rv  { opacity:0; transform:translateY(40px); transition:opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1); }
        .h-rv.on { opacity:1; transform:translateY(0); }
        .h-rv-r { opacity:0; transform:translateX(40px); transition:opacity .85s cubic-bezier(.22,1,.36,1), transform .85s cubic-bezier(.22,1,.36,1); }
        .h-rv-r.on { opacity:1; transform:translateX(0); }

        .hd0{transition-delay:0ms!important}    .hd1{transition-delay:100ms!important}
        .hd2{transition-delay:210ms!important}  .hd3{transition-delay:320ms!important}
        .hd4{transition-delay:440ms!important}  .hd5{transition-delay:560ms!important}
        .hd6{transition-delay:680ms!important}  .hd7{transition-delay:800ms!important}

        /* ─── BG image zoom-in ─── */
        .hero-img {
          width:100%; height:100%; object-fit:cover; object-position:center;
          transition: transform 8s cubic-bezier(.22,1,.36,1);
          will-change: transform;
          transform: scale(1.06);
        }
        .hero-img.on { transform: scale(1); }

        /* ─── Grain overlay ─── */
        .grain::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.028; z-index:3;
        }

        /* ─── Scroll line pulse ─── */
        @keyframes scrollPulse {
          0%   { height:0;   opacity:0; top:0; }
          30%  { opacity:1; }
          100% { height:52px; opacity:0; top:100%; }
        }
        .scroll-line::after {
          content:''; position:absolute; left:0; top:0; width:1px;
          background:#C9862b;
          animation: scrollPulse 2.2s ease-in-out infinite;
        }
        .scroll-line { position:relative; width:1px; height:52px; overflow:hidden; }

        /* ─── CTA primary ─── */
        .h-cta-primary {
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
          display:inline-flex; align-items:center; gap:10px;
          text-decoration:none; cursor:pointer; border:none;
        }
        .h-cta-primary:hover { transform:translateY(-3px) scale(1.04); box-shadow:0 18px 44px rgba(48,83,74,.45)!important; }
        .h-cta-primary:active { transform:scale(.98); }
        .h-cta-primary .arrow { transition:transform .28s ease; }
        .h-cta-primary:hover .arrow { transform:translateX(5px); }

        /* ─── CTA secondary ─── */
        .h-cta-sec {
          transition: all .28s cubic-bezier(.22,1,.36,1);
          display:inline-flex; align-items:center; gap:10px;
          text-decoration:none; cursor:pointer; border:none;
        }
        .h-cta-sec:hover {
          background: rgba(255,255,255,0.12) !important;
          border-color: #C9862b !important;
          color: #C9862b !important;
          transform: translateY(-2px) scale(1.03);
        }
        .h-cta-sec:active { transform:scale(.98); }

        /* ─── Stat card hover ─── */
        .h-stat {
          transition: transform .28s cubic-bezier(.22,1,.36,1), background .2s;
          cursor:default;
        }
        .h-stat:hover { transform: translateY(-4px) scale(1.03); }

        /* ─── Glow pulse on investment pill ─── */
        @keyframes goldGlow {
          0%,100% { box-shadow:0 0 0 0 rgba(201,134,43,.35); }
          50%      { box-shadow:0 0 0 8px rgba(201,134,43,0); }
        }
        .gold-glow { animation:goldGlow 3s ease-in-out infinite; }

        /* ─── Diagonal accent line ─── */
        .diag-line {
          position:absolute; pointer-events:none;
          background:linear-gradient(to bottom, transparent, rgba(201,134,43,.28), transparent);
        }

        /* ─── Location pill ─── */
        .loc-pill { transition: border-color .2s, background .2s; }
        .loc-pill:hover { border-color: rgba(201,134,43,.5)!important; background:rgba(13,13,13,.5)!important; }

        /* ─── Vertical label ─── */
        .vert-lbl {
          writing-mode:vertical-rl; text-orientation:mixed;
          transform:rotate(180deg);
          user-select:none; pointer-events:none;
        }

        /* ─── Desktop gold rule ─── */
        .gold-rule {
          position:absolute; top:0; bottom:0; z-index:4;
          left:50%;
          width:1px;
          background:linear-gradient(to bottom,transparent 0%,rgba(201,134,43,.3) 25%,rgba(201,134,43,.3) 75%,transparent 100%);
        }

        /* ─── Dot grid on overlay panel ─── */
        .dotbg {
          background-image:radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px);
          background-size:18px 18px;
        }

        /* ─── Mobile stat cards ─── */
        .mob-stat { transition: transform .25s cubic-bezier(.22,1,.36,1); cursor:default; }
        .mob-stat:hover { transform:translateY(-3px) scale(1.04); }

        /* ─── Corner bracket ─── */
        .bracket::before, .bracket::after {
          content:''; position:absolute;
          width:16px; height:16px;
          border-style:solid; border-color:rgba(201,134,43,.4);
        }
        .bracket::before { top:0; left:0; border-width:1.5px 0 0 1.5px; }
        .bracket::after  { bottom:0; right:0; border-width:0 1.5px 1.5px 0; }
      `}</style>

      {/* ════════ BG IMAGE ════════ */}
      <div className="absolute inset-0 z-0 grain">
        <img
          src="/hero-bg.jpeg"
          alt="Mahalaxmi Infra — Nagpur"
          className={`hero-img ${L ? "on" : ""}`}
          fetchPriority="high"
          decoding="sync"
          width={1440}
          height={900}
        />
      </div>

      {/* Multi-layer overlays for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:"linear-gradient(110deg, rgba(13,13,13,.82) 0%, rgba(13,13,13,.55) 48%, rgba(13,13,13,.2) 100%)" }} />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:"linear-gradient(to top, rgba(13,13,13,.7) 0%, transparent 40%)" }} />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:"radial-gradient(ellipse 70% 80% at 20% 50%, rgba(48,83,74,.18) 0%, transparent 70%)" }} />

      {/* Gold vertical rule — desktop */}
      <div className="gold-rule hidden lg:block" />

      {/* Diagonal accent lines */}
      <div className="diag-line hidden lg:block" style={{ right:"8%", top:0, bottom:0, width:"1px", opacity:.5 }} />

      {/* Vertical side label — desktop */}
      <div className="vert-lbl hidden lg:flex absolute left-8 top-1/2 z-10"
        style={{ transform:"translateX(-50%) translateY(-50%) rotate(180deg)", color:"rgba(255,255,255,.2)", fontSize:9, fontWeight:700, letterSpacing:".3em" }}>
        SINCE 2012 · NAGPUR · MAHALAXMI INFRA ·
      </div>

      {/* ════════ MAIN LAYOUT ════════ */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid lg:grid-cols-2 items-center px-6 sm:px-10 lg:px-20 py-28 sm:py-32 gap-10 lg:gap-0">

        {/* ── LEFT: Text column ── */}
        <div className="flex flex-col justify-center">

          {/* Eyebrow label */}
          <div className={`h-rv ${L?"on":""} hd0`} style={{ marginBottom:"clamp(1.2rem,2.5vw,2rem)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:2, background:"linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius:2, flexShrink:0 }} />
              <span style={{ color:"#C9862b", fontSize:"clamp(9px,1.1vw,11px)", fontWeight:700, letterSpacing:".35em", textTransform:"uppercase" }}>
                NMRDA Sanctioned · RERA Approved
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className={`h-rv ${L?"on":""} hd1`} style={{ marginBottom:"clamp(1.2rem,2vw,1.8rem)" }}>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(3rem,6.5vw,6.2rem)",
              lineHeight:1.0,
              fontWeight:600,
              color:"#ffffff",
              margin:0,
            }}>
              Build Your
              <br />
              <span style={{ fontStyle:"italic", color:"rgba(255,255,255,.85)" }}>Dream</span>{" "}
              <span style={{ WebkitTextStroke:"1.5px #C9862b", color:"transparent" }}>Home</span>
              <br />
              <span style={{ fontSize:".62em", fontStyle:"normal", fontWeight:400 }}>
                With{" "}
                <span style={{ color:"#C9862b", fontStyle:"italic", fontWeight:600 }}>Mahalaxmi</span>
                {" "}
                <span style={{ color:"#6eaa97" }}>Infra</span>
              </span>
            </h1>
          </div>

          {/* Sub-heading */}
          <div className={`h-rv ${L?"on":""} hd2`} style={{ marginBottom:"clamp(1.2rem,2vw,1.8rem)" }}>
            <p style={{
              fontSize:"clamp(.88rem,1.3vw,1.08rem)",
              color:"rgba(255,255,255,.75)",
              lineHeight:1.85,
              maxWidth:480,
              margin:0,
            }}>
              Residential &amp; Commercial Plots in the Heart of Nagpur —
              crafted for those who invest in more than just land.
            </p>
          </div>

          {/* Location pill */}
          <div className={`h-rv ${L?"on":""} hd3`} style={{ marginBottom:"clamp(1.5rem,2.5vw,2.2rem)" }}>
            <div className="loc-pill" style={{
              display:"flex", alignItems:"flex-start", gap:12,
              background:"rgba(13,13,13,.4)",
              border:"1px solid rgba(201,134,43,.3)",
              borderRadius:14,
              padding:"14px 18px",
              maxWidth:520,
              backdropFilter:"blur(12px)",
            }}>
              <MapPin size={15} style={{ color:"#C9862b", flexShrink:0, marginTop:2 }} />
              <p style={{ fontSize:"clamp(.8rem,1.1vw,.92rem)", color:"rgba(240,237,232,.85)", lineHeight:1.75, margin:0 }}>
                <strong style={{ color:"#f5c06a", fontWeight:600 }}>Prime Locations: </strong>
                Besa, Beltarodi, Shankarpur, Wardha Road, Jamtha, Katol Road,
                Umred Road, Koradi Road &amp; Samruddhi Circle Nagpur
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className={`h-rv ${L?"on":""} hd4`} style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:"clamp(1.5rem,2.5vw,2.2rem)" }}>
            <button
              onClick={() => scrollTo("contact")}
              className="h-cta-primary"
              style={{
                background:"linear-gradient(135deg,#30534A 0%,#3d6b60 100%)",
                color:"#fff",
                fontWeight:700,
                fontSize:"clamp(12px,1.1vw,14px)",
                letterSpacing:".06em",
                padding:"clamp(12px,1.4vw,16px) clamp(20px,2vw,28px)",
                borderRadius:14,
                boxShadow:"0 10px 30px rgba(48,83,74,.38)",
              }}
            >
              Contact Us Now
              <ArrowRight size={16} className="arrow" />
            </button>

            <button
              onClick={() => scrollTo("projects")}
              className="h-cta-sec"
              style={{
                background:"rgba(255,255,255,.06)",
                border:"1.5px solid rgba(255,255,255,.45)",
                color:"#fff",
                fontWeight:700,
                fontSize:"clamp(12px,1.1vw,14px)",
                letterSpacing:".06em",
                padding:"clamp(12px,1.4vw,16px) clamp(20px,2vw,28px)",
                borderRadius:14,
                backdropFilter:"blur(8px)",
              }}
            >
              Explore Projects
            </button>
          </div>

          {/* Investment highlight */}
          <div className={`h-rv ${L?"on":""} hd5`}>
            <div className="gold-glow" style={{
              display:"inline-flex", alignItems:"center", gap:10,
              background:"rgba(201,134,43,.1)",
              border:"1px solid rgba(201,134,43,.35)",
              borderRadius:999,
              padding:"10px 20px",
            }}>
              <TrendingUp size={14} style={{ color:"#C9862b", flexShrink:0 }} />
              <span style={{ color:"rgba(255,255,255,.9)", fontSize:"clamp(10px,1vw,12px)", fontWeight:600, letterSpacing:".04em" }}>
                Best Investment @ ₹22 Lakh on Samruddhi Circle
              </span>
            </div>
          </div>

          {/* Mobile stats */}
          <div className={`h-rv ${L?"on":""} hd6 lg:hidden`}
            style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:"clamp(1.5rem,4vw,2rem)" }}
          >
            {MOBILE_STATS.map((s) => (
              <div key={s.value} className="mob-stat" style={{
                background:"rgba(255,255,255,.88)",
                border:"1px solid rgba(201,134,43,.18)",
                backdropFilter:"blur(10px)",
                borderRadius:14,
                padding:"14px 10px",
                textAlign:"center",
              }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.7rem", fontWeight:700, color:"#C9862b", lineHeight:1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize:10, color:"#555", marginTop:4, fontWeight:500, letterSpacing:".03em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Desktop stats card ── */}
        <div className={`h-rv-r ${L?"on":""} hd5 hidden lg:flex flex-col items-end justify-center`} style={{ paddingRight:"clamp(0px,2vw,24px)" }}>
          <div style={{ position:"relative" }}>
            {/* Main card */}
            <div className="dotbg bracket" style={{
              position:"relative",
              background:"rgba(10,10,10,.72)",
              border:"1px solid rgba(201,134,43,.25)",
              backdropFilter:"blur(18px)",
              WebkitBackdropFilter:"blur(18px)",
              borderRadius:22,
              overflow:"hidden",
              minWidth:"clamp(260px,22vw,320px)",
              boxShadow:"0 24px 64px rgba(0,0,0,.45)",
              padding:0,
            }}>

              {/* Card header */}
              <div style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"18px 24px",
                borderBottom:"1px solid rgba(201,134,43,.12)",
                background:"rgba(48,83,74,.25)",
              }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"rgba(201,134,43,.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Award size={13} style={{ color:"#C9862b" }} />
                </div>
                <span style={{ color:"rgba(255,255,255,.6)", fontSize:10, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase" }}>
                  Certified Excellence
                </span>
              </div>

              {/* Stat rows */}
              {STATS.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={s.value} className="h-stat" style={{
                    display:"flex", alignItems:"center", gap:16,
                    padding:"20px 24px",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,.06)" : "none",
                  }}>
                    {/* Icon */}
                    <div style={{
                      width:36, height:36, borderRadius:10, flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background:"rgba(201,134,43,.1)",
                    }}>
                      <Icon size={15} style={{ color:"#C9862b" }} />
                    </div>
                    {/* Value + label */}
                    <div>
                      <div style={{
                        fontFamily:"'Cormorant Garamond',serif",
                        fontSize:"clamp(1.7rem,2.2vw,2.1rem)",
                        fontWeight:700, lineHeight:1,
                        color:"#C9862b",
                      }}>
                        {s.value}
                      </div>
                      <div style={{ fontSize:11, color:"rgba(255,255,255,.45)", marginTop:3, fontWeight:500, whiteSpace:"pre-line" }}>
                        {s.label}
                      </div>
                    </div>
                    {/* Right accent bar */}
                    <div style={{ marginLeft:"auto", width:3, height:28, borderRadius:2, background:"rgba(201,134,43,.2)" }} />
                  </div>
                )
              })}

              {/* Bottom strip */}
              <div style={{
                background:"rgba(201,134,43,.08)",
                borderTop:"1px solid rgba(201,134,43,.12)",
                padding:"12px 24px",
                display:"flex", alignItems:"center", gap:8,
              }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#C9862b", boxShadow:"0 0 6px #C9862b" }} />
                <span style={{ fontSize:10, color:"rgba(255,255,255,.4)", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase" }}>
                  Trusted by 17,000+ Families
                </span>
              </div>
            </div>

            {/* Floating accent card — overlapping bottom */}
            <div className={`h-rv ${L?"on":""} hd7`} style={{
              position:"absolute",
              bottom:-20,
              left:-28,
              background:"#C9862b",
              borderRadius:14,
              padding:"14px 20px",
              boxShadow:"0 14px 40px rgba(201,134,43,.45)",
              display:"flex", alignItems:"center", gap:10,
            }}>
              <TrendingUp size={16} style={{ color:"#fff", flexShrink:0 }} />
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#fff", lineHeight:1 }}>₹22L</div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,.75)", marginTop:2, letterSpacing:".08em", textTransform:"uppercase" }}>Starting Price</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ SCROLL INDICATOR ════════ */}
      <div className={`h-rv ${L?"on":""} hd7 absolute bottom-8 left-10 z-10 hidden lg:flex flex-col items-center gap-3`}>
        <div className="scroll-line" style={{ background:"rgba(255,255,255,.12)" }} />
        <span className="vert-lbl" style={{ color:"rgba(255,255,255,.25)", fontSize:8, fontWeight:700, letterSpacing:".3em" }}>
          SCROLL
        </span>
      </div>

      {/* ════════ BOTTOM STRIP ════════ */}
      <div className={`h-rv ${L?"on":""} hd6`} style={{
        position:"absolute", bottom:0, left:0, right:0, zIndex:10,
        background:"rgba(10,10,10,.6)",
        borderTop:"1px solid rgba(201,134,43,.15)",
        backdropFilter:"blur(12px)",
        padding:"clamp(10px,1.5vw,14px) clamp(1.25rem,5vw,5rem)",
        display:"flex", alignItems:"center", justifyContent:"center",
        gap:"clamp(16px,4vw,56px)",
        flexWrap:"wrap",
      }}>
        {[
          { icon:Shield,       label:"NMRDA Sanctioned" },
          { icon:CheckCircle2, label:"RERA Approved"    },
          { icon:Award,        label:"ISO Certified"    },
        ].map((t, i) => {
          const Icon = t.icon
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, cursor:"default" }}>
              <div style={{ width:24, height:24, borderRadius:6, background:"rgba(201,134,43,.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon size={11} style={{ color:"#C9862b" }} />
              </div>
              <span style={{ color:"rgba(255,255,255,.55)", fontSize:"clamp(9px,1vw,11px)", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase" }}>
                {t.label}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}