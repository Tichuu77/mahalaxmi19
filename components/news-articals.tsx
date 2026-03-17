"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"

const newsArticles = [
  { id: 1, title: "MIHAN Nagpur: Why It's Becoming the City's Most Sought-After Corridor",  date: "March 2025",    category: "Market Insight",    readTime: "4 min", image: "/gallery1.jpg", summary: "With AIIMS, IT parks, and logistics hubs expanding along the MIHAN belt, plot demand has surged 35% year-on-year.", content: "The MIHAN Special Economic Zone on Nagpur's Wardha Road has transformed from an ambitious blueprint into a live economic engine. Anchored by AIIMS Nagpur, an expanding cargo hub, and several multinational manufacturing units, the corridor now attracts both end-users and investors. Property prices in MIHAN-adjacent areas have appreciated between 18–35% since 2022, making early movers significant beneficiaries." },
  { id: 2, title: "RERA's Impact on Plot Buying: What Every Nagpur Buyer Must Know",         date: "January 2025",  category: "Legal & Compliance", readTime: "3 min", image: "/gallery2.jpg", summary: "RERA registration protects buyers from project delays and ensures full transparency in layout documents.", content: "Maharashtra's RERA framework has fundamentally changed how residential plots are marketed and sold. All projects above 500 sq meters must be registered. Mahalaxmi Infra's layouts carry MAHA RERA NO. A50500044725, providing buyers complete legal protection." },
  { id: 3, title: "Home Loan for Plots in 2025: Rate Trends & What Banks Offer",             date: "February 2025", category: "Finance",            readTime: "5 min", image: "/gallery3.jpg", summary: "Leading banks now offer up to 90% LTV on NMRDA-approved residential plots — here's how to qualify.", content: "Plot loan rates have stabilised, with most public sector banks offering between 8.5–9.2% for NMRDA/RERA approved plots. Mahalaxmi Infra's projects qualify with SBI, Bank of Maharashtra, and Axis Bank." },
  { id: 4, title: "Green Layouts: How Mahalaxmi Infra is Integrating Sustainability",         date: "December 2024", category: "Projects",           readTime: "3 min", image: "/gallery4.jpg", summary: "Rain harvesting systems, wide green belts, and solar street lighting are now standard in new layouts.", content: "Every new Mahalaxmi Infra layout includes rain water harvesting pits, 30% green belt coverage, energy-efficient street lighting, and proper solid waste management zones." },
]

const CategoryBadge = memo(({ category }: { category: string }) => (
  <span className="news-cat">{category}</span>
))
CategoryBadge.displayName = "CategoryBadge"

const FeaturedCard = memo(({ article, isOpen, onToggle }: { article: typeof newsArticles[0]; isOpen: boolean; onToggle: (id: number) => void }) => (
  <article className="news-feat">
    <div className="news-feat__img-wrap">
      <img src={article.image} alt={article.title} loading="lazy" decoding="async" className="news-feat__img" />
      <div className="news-feat__img-overlay" />
      <div className="news-feat__img-meta">
        <CategoryBadge category={article.category} />
        <span className="news-feat__img-read">{article.readTime} read · {article.date}</span>
      </div>
    </div>
    <div className="news-feat__body">
      <h3 className="news-feat__title">{article.title}</h3>
      <p className="news-feat__summary">{article.summary}</p>
      <button onClick={() => onToggle(article.id)} className="news-feat__expand">
        <span className="news-feat__expand-label">{isOpen ? "Read Less" : "Read More"}</span>
        <ExternalLink size={12} className="icon-green" aria-hidden="true" />
      </button>
      {isOpen && <p className="news-feat__content">{article.content}</p>}
    </div>
    <div className="news-feat__bar" />
  </article>
))
FeaturedCard.displayName = "FeaturedCard"

const SideCard = memo(({ article, isOpen, onToggle }: { article: typeof newsArticles[0]; isOpen: boolean; onToggle: (id: number) => void }) => (
  <article className="news-side">
    <div className="news-side__img-wrap">
      <img src={article.image} alt={article.title} loading="lazy" decoding="async" className="news-side__img" />
      <div className="news-side__img-badge"><CategoryBadge category={article.category} /></div>
    </div>
    <div className="news-side__body">
      <span className="news-side__date">{article.readTime} read · {article.date}</span>
      <h3 className="news-side__title">{article.title}</h3>
      <button onClick={() => onToggle(article.id)} className="news-side__expand">
        <span className="news-side__expand-label">{isOpen ? "Collapse" : "Read More"}</span>
        <ChevronDown size={11} className={`icon-green chevron-down${isOpen ? " open" : ""}`} aria-hidden="true" />
      </button>
      {isOpen && <p className="news-side__content">{article.content}</p>}
    </div>
    <div className="news-side__bar" />
  </article>
))
SideCard.displayName = "SideCard"

const MobCard = memo(({ article, index, visible, isOpen, onToggle }: { article: typeof newsArticles[0]; index: number; visible: boolean; isOpen: boolean; onToggle: (id: number) => void }) => (
  <article className={`news-mob-card stagger-item${visible ? " on" : ""} s${index}`}>
    <button onClick={() => onToggle(article.id)} className="news-mob-card__btn">
      <img src={article.image} alt={article.title} loading="lazy" decoding="async" className="news-mob-card__thumb" />
      <div className="pick-text">
        <CategoryBadge category={article.category} />
        <p className="news-mob-card__title">{article.title}</p>
      </div>
      <ChevronDown size={14} className={`news-mob-card__chevron chevron-down${isOpen ? " open" : ""}`} aria-hidden="true" />
    </button>
    {isOpen && (
      <div className="news-mob-card__content">
        <p className="news-mob-card__text">{article.content}</p>
      </div>
    )}
    <div className={`news-mob-card__bar${isOpen ? " open" : ""}`} />
  </article>
))
MobCard.displayName = "MobCard"

export default function NewsArticles() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasAnimated.current) { setIsVisible(true); hasAnimated.current = true } },
      { threshold: 0.07 }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const toggle = useCallback((id: number) => setExpandedId(p => p === id ? null : id), [])
  const vis = isVisible
  const [featured, ...sides] = newsArticles

  return (
    <section ref={sectionRef} id="news" aria-label="News and Articles" className="news">
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">Latest Updates</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">News &amp; Articles</span>
      </div>

      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 mb-section`}>
          <div className="section-eyebrow">
            <div className="section-eyebrow__line" />
            <span className="section-eyebrow__label">From the Desk</span>
          </div>
          <h2 className="section-heading">News <em>&amp;</em><br /><span>Articles</span></h2>
          <p className="section-sub">Stay updated with the latest news, project launches, and insights from Mahalaxmi Infra.</p>
        </div>

        <div className={`news__desk rv ${vis ? "on" : ""} d1`}>
          <FeaturedCard article={featured} isOpen={expandedId === featured.id} onToggle={toggle} />
          <div className="news__sides">
            {sides.map(a => <SideCard key={a.id} article={a} isOpen={expandedId === a.id} onToggle={toggle} />)}
          </div>
        </div>

        <div className="news__mob">
          {newsArticles.map((a, i) => (
            <MobCard key={a.id} article={a} index={i} visible={vis} isOpen={expandedId === a.id} onToggle={toggle} />
          ))}
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Real insights. Expert advice.</p>
          <div className="trust-bar__items">
            {["Market Updates", "Legal Guides", "Finance Tips"].map(label => (
              <div key={label} className="trust-bar__item"><div className="trust-bar__dot" /><span className="trust-bar__name">{label}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}