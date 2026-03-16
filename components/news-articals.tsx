"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Calendar, User, ChevronDown, ChevronUp } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Mahalaxmi Launches New Luxury Residential Complex",
    excerpt: "Introducing our latest project featuring smart homes and sustainable living spaces in the heart of the city.",
    fullContent: "The Mahalaxmi Luxury Residential Complex marks a new milestone in sustainable architecture. Each unit is designed with eco-conscious materials, smart home integration, and green terraces for a natural lifestyle. Residents can enjoy modern amenities, lush gardens, and easy access to urban hotspots. This launch redefines urban luxury with purpose and sustainability at its core.",
    date: "March 15, 2025",
    author: "Mahalaxmi Team",
    category: "Project Launch",
    image: "/luxury-residential-comple.jpeg",
  },
  {
    id: 2,
    title: "Sustainable Development: Our Commitment to Green Living",
    excerpt: "Learn how Mahalaxmi Infra is pioneering eco-friendly construction practices and green spaces.",
    fullContent: "At Mahalaxmi Infra, sustainability isn't just a trend — it's a commitment. From solar energy integration to rainwater harvesting, every project embraces green building standards. Our mission is to create living spaces that harmonize with nature while minimizing carbon footprint, offering a healthier and cleaner future for generations to come.",
    date: "March 10, 2025",
    author: "Sustainability Team",
    category: "Sustainability",
    image: "/green-sustainable-residential-development.jpg",
  },
  {
    id: 3,
    title: "Customer Success Story: From Dream to Reality",
    excerpt: "Meet the families who found their perfect home with Mahalaxmi. Read their inspiring stories.",
    fullContent: "For many families, Mahalaxmi projects have turned their dream homes into reality. Our customer-first approach ensures personalised experiences — from choosing the right floor plan to post-possession support. Their heartfelt testimonials remind us why we build not just homes, but lifelong happiness.",
    date: "March 5, 2025",
    author: "Marketing Team",
    category: "Success Stories",
    image: "/happy-family-new-home.jpg",
  },
]

const CATEGORY_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  "Project Launch":  { bg: "rgba(48,83,74,.1)",   text: "#30534A", border: "rgba(48,83,74,.2)"    },
  "Sustainability":  { bg: "rgba(34,197,94,.09)", text: "#16a34a", border: "rgba(34,197,94,.22)"  },
  "Success Stories": { bg: "rgba(201,134,43,.1)", text: "#a86a1a", border: "rgba(201,134,43,.25)" },
}

const [featured, ...sideArticles] = newsArticles

/* ─── ArticleMeta ─── */
const ArticleMeta = memo(({ date, author }: { date: string; author: string }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 16,
    borderBottom: "1px solid rgba(48,83,74,.07)",
    paddingBottom: 10, marginBottom: 12,
  }}>
    {[{ icon: <Calendar size={11} style={{ color: "#C9862b" }} />, label: date },
      { icon: <User    size={11} style={{ color: "#C9862b" }} />, label: author }
    ].map(({ icon, label }, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {icon}
        <span style={{ fontSize: 11, color: "#bbb", fontFamily: "'Poppins',sans-serif", fontWeight: 500 }}>{label}</span>
      </div>
    ))}
  </div>
))
ArticleMeta.displayName = "ArticleMeta"

/* ─── ExpandButton ─── */
const ExpandButton = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: (e: React.MouseEvent) => void }) => (
  <button
    onClick={onClick}
    className="news-expand-btn"
    style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "none", border: "none", cursor: "pointer",
      fontFamily: "'Poppins',sans-serif", fontWeight: 700,
      fontSize: 11, letterSpacing: ".06em",
      color: isOpen ? "#C9862b" : "#30534A",
      padding: 0,
      transition: "color .2s",
    }}
  >
    {isOpen ? <><ChevronUp size={13} />Show Less</> : <><ChevronDown size={13} />Read More</>}
  </button>
))
ExpandButton.displayName = "ExpandButton"

/* ─── ExpandedContent ─── */
const ExpandedContent = memo(({ isOpen, content }: { isOpen: boolean; content: string }) => (
  <div style={{ maxHeight: isOpen ? "320px" : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.22,1,.36,1)" }}>
    <p style={{
      fontFamily: "'Poppins',sans-serif", fontSize: "clamp(.82rem,1.1vw,.92rem)",
      color: "#666", lineHeight: 1.8, margin: 0,
      borderTop: "1px solid rgba(48,83,74,.07)",
      paddingTop: 12, marginTop: 10, fontWeight: 400,
    }}>
      {content}
    </p>
  </div>
))
ExpandedContent.displayName = "ExpandedContent"

/* ─── FeaturedCard ─── */
const FeaturedCard = memo(({ article, isOpen, onToggle }: { article: typeof featured; isOpen: boolean; onToggle: (e: React.MouseEvent) => void }) => {
  const catStyle = CATEGORY_STYLE[article.category] ?? CATEGORY_STYLE["Project Launch"]
  return (
    <article className="news-card" style={{
      background: "#fff",
      border: `1px solid ${isOpen ? "rgba(201,134,43,.4)" : "rgba(48,83,74,.1)"}`,
      borderRadius: 22, overflow: "hidden",
      display: "flex", flexDirection: "column",
      boxShadow: isOpen ? "0 12px 40px rgba(48,83,74,.12)" : "0 4px 18px rgba(48,83,74,.07)",
      transition: "all .32s cubic-bezier(.22,1,.36,1)",
      willChange: "transform",
    }}>

      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: "clamp(220px,22vw,300px)", flexShrink: 0 }}>
        <img
          src={article.image} alt={article.title}
          loading="lazy" decoding="async"
          className="news-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 1s cubic-bezier(.22,1,.36,1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(13,13,13,.6) 0%,rgba(13,13,13,.05) 55%,rgba(48,83,74,.4) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,13,13,.6) 0%,transparent 50%)", pointerEvents: "none" }} />

        {/* Featured badge */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(201,134,43,.92)", backdropFilter: "blur(8px)",
          borderRadius: 999, padding: "6px 14px",
          boxShadow: "0 4px 14px rgba(201,134,43,.35)",
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", color: "#fff", fontFamily: "'Poppins',sans-serif" }}>
            ★ Featured
          </span>
        </div>

        {/* Category + title overlay */}
        <div style={{ position: "absolute", bottom: 18, left: 20, right: 20 }}>
          <span style={{
            display: "inline-block",
            fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase",
            background: "rgba(255,255,255,.92)",
            border: `1px solid ${catStyle.border}`,
            color: catStyle.text, borderRadius: 999,
            padding: "4px 12px", marginBottom: 8,
            fontFamily: "'Poppins',sans-serif",
          }}>{article.category}</span>
          <h3 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(1.35rem,2.2vw,1.7rem)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.15, margin: 0,
            textShadow: "0 2px 8px rgba(0,0,0,.4)",
          }}>{article.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(18px,2.5vw,28px)", display: "flex", flexDirection: "column", flex: 1, gap: 12 }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(.85rem,1.2vw,.98rem)", color: "#666", lineHeight: 1.8, margin: 0, fontWeight: 400, flex: 1 }}>
          {article.excerpt}
        </p>
        <ArticleMeta date={article.date} author={article.author} />
        <ExpandButton isOpen={isOpen} onClick={onToggle} />
        <ExpandedContent isOpen={isOpen} content={article.fullContent} />
      </div>

      {/* Bottom bar */}
      <div className="news-bar" style={{ height: 3, background: "linear-gradient(90deg,#C9862b,#30534A)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform .4s cubic-bezier(.22,1,.36,1)" }} />
    </article>
  )
})
FeaturedCard.displayName = "FeaturedCard"

/* ─── SideCard ─── */
const SideCard = memo(({ article, isOpen, onToggle, index }: { article: typeof newsArticles[0]; isOpen: boolean; onToggle: (e: React.MouseEvent) => void; index: number }) => {
  const catStyle = CATEGORY_STYLE[article.category] ?? CATEGORY_STYLE["Project Launch"]
  return (
    <article className="news-card" style={{
      background: "#fff",
      border: `1px solid ${isOpen ? "rgba(201,134,43,.4)" : "rgba(48,83,74,.1)"}`,
      borderRadius: 20, overflow: "hidden",
      display: "flex", flexDirection: "column",
      flex: 1,
      boxShadow: isOpen ? "0 10px 32px rgba(48,83,74,.11)" : "0 3px 12px rgba(48,83,74,.06)",
      transition: "all .3s cubic-bezier(.22,1,.36,1)",
    }}>
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 150, flexShrink: 0 }}>
        <img src={article.image} alt={article.title} loading="lazy" decoding="async"
          className="news-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 1s cubic-bezier(.22,1,.36,1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,13,13,.55) 0%,transparent 55%)", pointerEvents: "none" }} />

        {/* Index watermark */}
        <div style={{
          position: "absolute", bottom: 8, right: 14,
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "2.8rem", fontWeight: 700,
          color: "rgba(255,255,255,.15)", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
        }}>
          {String(index + 2).padStart(2, "0")}
        </div>

        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase",
            background: "rgba(255,255,255,.92)", border: `1px solid ${catStyle.border}`,
            color: catStyle.text, borderRadius: 999, padding: "4px 10px",
            fontFamily: "'Poppins',sans-serif",
          }}>{article.category}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(14px,2vw,20px)", display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(1.05rem,1.5vw,1.25rem)",
          fontWeight: 700, color: "#0d0d0d", margin: 0, lineHeight: 1.2,
        }}>{article.title}</h3>
        <p style={{
          fontFamily: "'Poppins',sans-serif", fontSize: "clamp(11px,1vw,13px)",
          color: "#888", lineHeight: 1.7, margin: 0, fontWeight: 400,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        } as React.CSSProperties}>{article.excerpt}</p>
        <ArticleMeta date={article.date} author={article.author} />
        <ExpandButton isOpen={isOpen} onClick={onToggle} />
        <ExpandedContent isOpen={isOpen} content={article.fullContent} />
      </div>

      <div className="news-bar" style={{ height: 3, background: "linear-gradient(90deg,#C9862b,#30534A)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform .4s cubic-bezier(.22,1,.36,1)" }} />
    </article>
  )
})
SideCard.displayName = "SideCard"

/* ─── MobileCard ─── */
const MobileCard = memo(({ article, isOpen, onToggle, index, visible }: { article: typeof newsArticles[0]; isOpen: boolean; onToggle: (e: React.MouseEvent) => void; index: number; visible: boolean }) => {
  const catStyle = CATEGORY_STYLE[article.category] ?? CATEGORY_STYLE["Project Launch"]
  return (
    <article style={{
      background: "#fff",
      border: `1px solid ${isOpen ? "rgba(201,134,43,.4)" : "rgba(48,83,74,.1)"}`,
      borderRadius: 20, overflow: "hidden",
      boxShadow: isOpen ? "0 8px 28px rgba(48,83,74,.1)" : "0 3px 12px rgba(48,83,74,.06)",
      transition: "all .3s cubic-bezier(.22,1,.36,1)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transitionDelay: `${index * 70}ms`,
    }}>
      <div style={{ position: "relative", overflow: "hidden", height: 190, flexShrink: 0 }}>
        <img src={article.image} alt={article.title} loading="lazy" decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,13,13,.6) 0%,transparent 55%)", pointerEvents: "none" }} />
        {index === 0 && (
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(201,134,43,.92)", borderRadius: 999, padding: "5px 12px",
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#fff", fontFamily: "'Poppins',sans-serif" }}>★ Featured</span>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 14, left: 14 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
            background: "rgba(255,255,255,.92)", border: `1px solid ${catStyle.border}`,
            color: catStyle.text, borderRadius: 999, padding: "4px 10px",
            fontFamily: "'Poppins',sans-serif",
          }}>{article.category}</span>
        </div>
      </div>
      <div style={{ padding: "clamp(14px,3vw,20px)", display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.1rem,4vw,1.35rem)", fontWeight: 700, color: "#0d0d0d", margin: 0, lineHeight: 1.2 }}>
          {article.title}
        </h3>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#888", lineHeight: 1.75, margin: 0, fontWeight: 400 }}>
          {article.excerpt}
        </p>
        <ArticleMeta date={article.date} author={article.author} />
        <ExpandButton isOpen={isOpen} onClick={onToggle} />
        <ExpandedContent isOpen={isOpen} content={article.fullContent} />
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg,#C9862b,#30534A)`, transform: isOpen ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .4s cubic-bezier(.22,1,.36,1)" }} />
    </article>
  )
})
MobileCard.displayName = "MobileCard"

/* ─── Section ─── */
export default function NewsArticles() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
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
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setExpandedId(null) }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [])

  const makeToggle = useCallback((id: number) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  const vis = isVisible

  return (
    <section
      ref={sectionRef}
      id="news"
      style={{ background: "#fff", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        .news-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* card hover */
        .news-card:hover { transform: translateY(-5px) !important; box-shadow: 0 16px 46px rgba(48,83,74,.14) !important; border-color: rgba(201,134,43,.32) !important; }
        .news-card:hover .news-card-img { transform: scale(1.06); }
        .news-card:hover .news-bar { transform: scaleX(1) !important; }

        /* expand btn hover */
        .news-expand-btn:hover { opacity: .8; }
        .news-expand-btn:active { transform: scale(.97); }

        /* reveal */
        .news-rv { opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .news-rv.on { opacity:1; transform:translateY(0); }
        .nd0{transition-delay:0ms}  .nd1{transition-delay:120ms}
        .nd2{transition-delay:240ms} .nd3{transition-delay:360ms}

        /* layout */
        .news-desk { display:none; }
        @media(min-width:1024px){ .news-desk { display:grid; } }
        .news-mob { display:flex; flex-direction:column; gap:clamp(10px,2vw,16px); }
        @media(min-width:1024px){ .news-mob { display:none; } }
      `}</style>

      {/* Dot grid */}
      <div className="news-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: 0, left: "25%", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: "12%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
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
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Latest Updates</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>News &amp; Articles</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>

        {/* ─── HEADING ─── */}
        <div className={`news-rv ${vis?"on":""} nd0`} style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.5rem,1.2vw,.9rem)" }}>
            <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
            <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>From the Desk</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(2.6rem,5.5vw,5rem)",
            lineHeight: 1.02, fontWeight: 600,
            color: "#0d0d0d", margin: "0 0 12px",
          }}>
            News{" "}
            <em style={{ color: "#30534A", fontStyle: "italic" }}>&amp;</em>
            <br />
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Articles</span>
          </h2>
          <p style={{ fontSize: "clamp(.88rem,1.25vw,1.05rem)", color: "#888", lineHeight: 1.85, maxWidth: 460, margin: 0, fontWeight: 400 }}>
            Stay updated with the latest news, project launches, and insights from Mahalaxmi Infra.
          </p>
        </div>

        {/* ─── DESKTOP ─── */}
        <div
          className={`news-desk news-rv ${vis?"on":""} nd1`}
          style={{ gridTemplateColumns: "1.35fr 1fr", gap: "clamp(12px,2vw,20px)", alignItems: "start" }}
        >
          <FeaturedCard article={featured} isOpen={expandedId === featured.id} onToggle={makeToggle(featured.id)} />
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,2vw,16px)", height: "100%" }}>
            {sideArticles.map((article, i) => (
              <SideCard key={article.id} article={article} index={i} isOpen={expandedId === article.id} onToggle={makeToggle(article.id)} />
            ))}
          </div>
        </div>

        {/* ─── MOBILE ─── */}
        <div className="news-mob">
          {newsArticles.map((article, i) => (
            <MobileCard
              key={article.id} article={article} index={i}
              isOpen={expandedId === article.id}
              onToggle={makeToggle(article.id)}
              visible={vis}
            />
          ))}
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div className={`news-rv ${vis?"on":""} nd3`} style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            Always in the know
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Project Updates", "Market Insights", "Community Stories"].map((label) => (
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