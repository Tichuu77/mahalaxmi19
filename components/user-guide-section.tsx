"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import { ChevronDown, Search, MapPin, FileText, Key, Lightbulb, Clock, Shield, TrendingUp, CheckCircle2 } from "lucide-react"

const guides = [
  { number: "01", icon: Search,   title: "Explore & Shortlist",    description: "Browse projects and shortlist plots matching your budget and location.", details: ["Filter by location, size & budget", "Compare plots side-by-side", "Download project brochures", "Review RERA & NMRDA approvals"], tip: "Start broad, then narrow down based on proximity to AIIMS, schools, and highways." },
  { number: "02", icon: MapPin,   title: "Schedule a Site Visit",  description: "Visit our actual plots — no renders, no stock photos.",                  details: ["Book via WhatsApp or phone", "Our representative accompanies you", "Visit multiple sites in one trip", "Complimentary transport arranged"], tip: "Visit on a weekday for a quieter, more personal walkthrough with our site manager." },
  { number: "03", icon: FileText, title: "Documentation & Finance",description: "We handle legal verification. Get up to 90% bank finance.",              details: ["Title verification & legal due diligence", "RERA certificate & NMRDA sanction copy", "Bank loan up to 90% LTV", "Flexible EMI payment plans"], tip: "Keep your KYC documents ready. Pre-approved bank loans speed up registration by 50%." },
  { number: "04", icon: Key,      title: "Register & Move In",     description: "Sign the sale deed, register, and take possession of your plot.",         details: ["Sale deed execution", "Stamp duty & registration support", "Possession certificate issued", "Handover with site inspection"], tip: "We stay with you through every registration step — from SRO appointment to key handover." },
]
const tips = [
  { icon: Clock,        title: "Check Legal Docs",    body: "Always verify RERA registration and NMRDA sanctions before booking.", dark: true  },
  { icon: Shield,       title: "Verify Clear Title",  body: "Confirm no existing liens, disputes, or encumbrances on the land.",  dark: false },
  { icon: TrendingUp,   title: "Assess Appreciation", body: "Look at proximity to MIHAN, AIIMS, highways for long-term value.",   dark: false },
  { icon: CheckCircle2, title: "Get Pre-Approved",    body: "Arrange bank pre-approval to move fast when you find the right plot.", dark: false },
]

const GuideStep = memo(({ guide, index, isOpen, onToggle, visible }: { guide: typeof guides[0]; index: number; isOpen: boolean; onToggle: (i: number) => void; visible: boolean }) => {
  const Icon = guide.icon
  const toggle = useCallback(() => onToggle(index), [onToggle, index])
  return (
    <div className={`guide__step${isOpen ? " guide__step--open" : ""}${visible ? " on" : ""} s${index}`}>
      <button className="guide__step-btn" onClick={toggle} aria-expanded={isOpen}>
        <span className={`guide__step-num guide__step-num--${isOpen ? "active" : "inactive"}`}>{guide.number}</span>
        <div className={`guide__step-icon-wrap guide__step-icon-wrap--${isOpen ? "active" : "inactive"}`}>
          <Icon size={16} className={`guide__step-icon guide__step-icon--${isOpen ? "active" : "inactive"}`} aria-hidden="true" />
        </div>
        <div className="guide__step-text-wrap">
          <h3 className={`guide__step-title guide__step-title--${isOpen ? "active" : "inactive"}`}>{guide.title}</h3>
          <p className="guide__step-desc">{guide.description}</p>
        </div>
        <div className={`guide__step-chevron guide__step-chevron--${isOpen ? "active" : "inactive"}`}>
          <ChevronDown size={13} className={`chevron-down${isOpen ? " open" : ""}`} aria-hidden="true" />
        </div>
      </button>
      <div className={`guide__mob-detail${isOpen ? " open" : ""}`}>
        <div className="guide__mob-detail-inner">
          <ul className="guide__detail-list">
            {guide.details.map((d, i) => (
              <li key={i} className="guide__detail-item">
                <span className="guide__detail-check"><CheckCircle2 size={9} aria-hidden="true" /></span>
                <span className="guide__detail-text">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
})
GuideStep.displayName = "GuideStep"

const ActivePanel = memo(({ guide }: { guide: typeof guides[0] }) => {
  const Icon = guide.icon
  return (
    <div className="guide__active-panel">
      <div className="guide__panel-card">
        <div className="guide__panel-card-glow" />
        <div className="guide__panel-header">
          <div className="guide__panel-icon-wrap"><Icon size={20} className="guide__panel-icon" aria-hidden="true" /></div>
          <div>
            <span className="guide__panel-step-lbl">Step {guide.number}</span>
            <h3 className="guide__panel-title">{guide.title}</h3>
          </div>
        </div>
        <p className="guide__panel-desc">{guide.description}</p>
      </div>
      <div className="guide__detail-card">
        <div className="guide__detail-header">
          <div className="guide__detail-line" />
          <span className="guide__detail-label">What's Included</span>
        </div>
        <ul className="guide__detail-list">
          {guide.details.map((d, i) => (
            <li key={i} className="guide__detail-item">
              <span className="guide__detail-check"><CheckCircle2 size={9} aria-hidden="true" /></span>
              <span className="guide__detail-text">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="guide__tip">
        <Lightbulb size={16} className="guide__tip-icon" aria-hidden="true" />
        <p className="guide__tip-text">{guide.tip}</p>
      </div>
    </div>
  )
})
ActivePanel.displayName = "ActivePanel"

export function UserGuideSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible]         = useState(false)
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

  const handleToggle = useCallback((i: number) => setExpandedIndex(p => p === i ? null : i), [])
  const handleStep   = useCallback((i: number) => setExpandedIndex(i), [])
  const vis = isVisible

  return (
    <section ref={sectionRef} id="user-guide" aria-label="How to Buy a Plot" className="guide">
      <div className="guide__right-stripe" />
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">How It Works</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">4 Simple Steps</span>
      </div>

      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 mb-section`}>
          <div className="section-eyebrow">
            <div className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Your Journey</span>
          </div>
          <h2 className="section-heading">How to <em>Get</em><br /><span>Started</span></h2>
          <p className="section-sub">Follow our simple guide to find, visit, finance and own your dream plot in Nagpur.</p>
        </div>

        <div className="guide__layout">
          <div className={`rv ${vis ? "on" : ""} d1 guide__left`}>
            <div className="guide__steps">
              {guides.map((g, i) => (
                <GuideStep key={g.number} guide={g} index={i} isOpen={expandedIndex === i} onToggle={handleToggle} visible={vis} />
              ))}
            </div>
          </div>
          <div className="guide__vdiv" />
          <div className={`rv ${vis ? "on" : ""} d2 guide__right`}>
            {expandedIndex !== null && <ActivePanel key={expandedIndex} guide={guides[expandedIndex]} />}
            <div className="mt-auto">
              <div className="guide__progress-bars">
                {guides.map((g, i) => (
                  <button key={g.number} onClick={() => handleStep(i)} aria-label={`Step ${g.number}`}
                    className={`guide__progress-bar guide__progress-bar--${expandedIndex === i ? "active" : "inactive"}`} />
                ))}
              </div>
              <div className="guide__progress-nums">
                {guides.map((g, i) => (
                  <span key={g.number} className={`guide__progress-num guide__progress-num--${expandedIndex === i ? "active" : "inactive"}`}>{g.number}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`rv ${vis ? "on" : ""} d3 mb-tips`}>
          <div className="section-eyebrow mb-heading">
            <div className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Quick Tips</span>
          </div>
          <div className="guide__tips">
            {tips.map((tip, i) => {
              const Icon = tip.icon
              return (
                <div key={i} className={`guide__tip-card guide__tip-card--${tip.dark ? "dark" : "light"}`}>
                  <div className={`guide__tip-card-icon-wrap guide__tip-card-icon-wrap--${tip.dark ? "dark" : "light"}`}>
                    <Icon size={17} className="guide__tip-card-icon" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className={`guide__tip-card-title guide__tip-card-title--${tip.dark ? "dark" : "light"}`}>{tip.title}</h4>
                    <p className={`guide__tip-card-body guide__tip-card-body--${tip.dark ? "dark" : "light"}`}>{tip.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Simple. Transparent. Yours.</p>
          <div className="trust-bar__items">
            {["No Hidden Steps", "Guided Process", "Expert Support"].map(label => (
              <div key={label} className="trust-bar__item"><div className="trust-bar__dot" /><span className="trust-bar__name">{label}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}