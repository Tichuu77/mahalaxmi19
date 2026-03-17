"use client"

import { Check, Zap, Trophy, Users, Heart, Lightbulb } from "lucide-react"
import { useEffect, useRef, useState, memo } from "react"

const reasons = [
  { icon: Trophy,    title: "Proven Excellence", description: "Award-winning projects trusted by thousands of families across Nagpur.",    stat: "70+",  statLabel: "Projects"      },
  { icon: Zap,       title: "Innovation First",  description: "Modern layouts, smart planning, and forward-thinking infrastructure.",       stat: "13+",  statLabel: "Years"         },
  { icon: Users,     title: "Expert Team",       description: "Dedicated professionals with decades of real estate experience.",            stat: "17K+", statLabel: "Clients"       },
  { icon: Heart,     title: "Customer Focused",  description: "Your satisfaction drives every decision we make, from plot to possession.", stat: "100%", statLabel: "RERA Approved" },
  { icon: Lightbulb, title: "Prime Locations",   description: "Strategically chosen land near MIHAN, highways, hospitals & schools.",      stat: "9+",   statLabel: "Locations"     },
  { icon: Check,     title: "Quality Assured",   description: "NMRDA sanctioned, legally clear, and bank finance eligible plots.",        stat: "90%",  statLabel: "Finance Avail" },
]
const trackRecord = ["13+ years industry experience", "17,000+ satisfied families", "Industry-leading satisfaction"]
const support     = ["24/7 customer support", "Dedicated site visit assistance", "Transparent documentation process"]

const MobCard = memo(({ reason, index, visible }: { reason: typeof reasons[0]; index: number; visible: boolean }) => {
  const Icon = reason.icon
  return (
    <div className={`wcu__mob-card stagger-item${visible ? " on" : ""} s${index}`}>
      <div className="wcu__mob-corner" />
      <div className="wcu__mob-top">
        <div className="wcu__mob-icon-wrap"><Icon size={18} className="wcu__mob-icon" aria-hidden="true" /></div>
        <div className="wcu__mob-stat">
          <div className="wcu__mob-stat-val">{reason.stat}</div>
          <div className="wcu__mob-stat-lbl">{reason.statLabel}</div>
        </div>
      </div>
      <div>
        <h3 className="wcu__mob-title">{reason.title}</h3>
        <p className="wcu__mob-desc">{reason.description}</p>
      </div>
      <div className={`wcu__mob-bar wcu__mob-bar--${index}`} />
    </div>
  )
})
MobCard.displayName = "MobCard"

export function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHovered]     = useState<number | null>(null)
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

  const vis = isVisible

  return (
    <section ref={sectionRef} id="why-choose-us" aria-label="Why Choose Mahalaxmi Infra" className="wcu">
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">Why Choose Us</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">The Difference We Make</span>
      </div>

      <div className="section-inner">
        <div className={`wcu__top rv ${vis ? "on" : ""} d0`}>
          <div>
            <div className="section-eyebrow">
              <div className="section-eyebrow__line" />
              <span className="section-eyebrow__label">Our Story</span>
            </div>
            <h2 className="section-heading">Why Thousands<br /><em>Trust</em> <span>Mahalaxmi</span></h2>
            <p className="section-sub">For over a decade, we've been building more than plots — we build confidence, community, and lasting value for families across Nagpur.</p>
          </div>
          <div className="wcu__vdiv" />
          <div className={`wcu__checks rv ${vis ? "on" : ""} d1`}>
            <div className="wcu__checks-grid">
              {[{ heading: "Track Record", items: trackRecord, gold: true }, { heading: "Our Support", items: support, gold: false }].map(({ heading, items, gold }) => (
                <div key={heading}>
                  <div className="wcu__check-group-header">
                    <div className={`wcu__check-group-line wcu__check-group-line--${gold ? "gold" : "green"}`} />
                    <h4 className={`wcu__check-group-label wcu__check-group-label--${gold ? "gold" : "green"}`}>{heading}</h4>
                  </div>
                  <ul className="wcu__check-list">
                    {items.map(item => (
                      <li key={item} className="wcu__check-item">
                        <span className={`wcu__check-bullet wcu__check-bullet--${gold ? "gold" : "green"}`}><Check size={9} aria-hidden="true" /></span>
                        <span className="wcu__check-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`rv ${vis ? "on" : ""} d2`}>
          <div className="wcu__desk">
            <div className="wcu__pillars-header">
              <div className="wcu__pillars-line" />
              <span className="wcu__pillars-label">The Six Pillars</span>
              <div className="wcu__pillars-fill" />
            </div>
            {reasons.map((r, i) => {
              const Icon = r.icon
              const active = hovered === i
              return (
                <div key={r.title}>
                  <div className="wcu__row" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                    <span className={`wcu__row-num wcu__row-num--${active ? "active" : "inactive"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <div className="wcu__row-icon-area">
                      <div className={`wcu__row-icon-wrap wcu__row-icon-wrap--${active ? "active" : "inactive"}`}>
                        <Icon size={18} className={`wcu__row-icon wcu__row-icon--${active ? "active" : "inactive"}`} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className={`wcu__row-title wcu__row-title--${active ? "active" : "inactive"}`}>{r.title}</h3>
                        <p className="wcu__row-desc">{r.description}</p>
                      </div>
                    </div>
                    <div className={`wcu__row-stat wcu__row-stat--${active ? "active" : "inactive"}`}>
                      <div className="wcu__row-stat-val">{r.stat}</div>
                      <div className="wcu__row-stat-lbl">{r.statLabel}</div>
                    </div>
                  </div>
                  {i < reasons.length - 1 && <div className="wcu__row-div" />}
                </div>
              )
            })}
          </div>
          <div className="wcu__mob">
            {reasons.map((r, i) => <MobCard key={r.title} reason={r} index={i} visible={vis} />)}
          </div>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Integrity in every step</p>
          <div className="trust-bar__items">
            {["NMRDA Approved", "RERA Certified", "ISO Certified"].map(label => (
              <div key={label} className="trust-bar__item"><div className="trust-bar__dot" /><span className="trust-bar__name">{label}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}