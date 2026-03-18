"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import { ChevronDown, MessageCircle, Phone } from "lucide-react"

const faqs = [
  { id: 1, question: "What does NMRDA sanctioned mean?",                    category: "legal",      answer: "NMRDA (Nagpur Metropolitan Region Development Authority) sanctioned means the layout has received official government approval for residential development. It ensures the land is legally designated for housing, roads are planned, and basic infrastructure norms are met. All Mahalaxmi Infra projects carry NMRDA sanction." },
  { id: 2, question: "Is bank loan available on your plots?",                category: "finance",    answer: "Yes. All our projects are eligible for bank finance of up to 90% of the plot value. We work with SBI, Bank of Maharashtra, Axis Bank, HDFC, and other leading banks. Our team assists with documentation, valuation, and loan processing at no extra charge." },
  { id: 3, question: "What is RERA and why does it matter?",                 category: "legal",      answer: "RERA (Real Estate Regulatory Authority) is a government body that protects homebuyers. RERA-registered projects ensure developer accountability, transparent pricing, and legal recourse in case of disputes. Our MAHA RERA number is A50500044725 — verifiable on the MahaRERA portal." },
  { id: 4, question: "How do I book a site visit?",                          category: "process",    answer: "You can book a site visit by calling us at +91 9322987615, messaging on WhatsApp, or filling the contact form on this page. Our representative will accompany you to the site, explain the layout, and answer all questions on-spot. We arrange transport from Nagpur city at no cost." },
  { id: 5, question: "What is the starting price of plots?",                  category: "pricing",    answer: "Our plots start from ₹22 Lakh. Pricing varies by project, size, and location. Plots near MIHAN and Samruddhi Mahamarg are priced higher due to connectivity and appreciation potential. Contact us for a current price list for any specific project." },
  { id: 6, question: "How long does the registration process take?",          category: "process",    answer: "After booking, the registration process typically takes 2–4 weeks, subject to SRO appointment availability. Our team handles all documentation, liaises with the sub-registrar office, and keeps you updated at every step. Stamp duty and registration charges are as per Maharashtra government norms." },
]

const CHIPS = ["all", "legal", "finance", "process", "pricing"] as const
type Chip = typeof CHIPS[number]

const FaqItem = memo(({ faq, index, isOpen, onToggle, visible }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: (id: number) => void; visible: boolean }) => (
  <div className={`faq-item faq-item--${isOpen ? "open" : "closed"} stagger-item${visible ? " on" : ""} s${index}`}>
    <button className="faq-item__btn" onClick={() => onToggle(faq.id)} aria-expanded={isOpen}>
      <div className="faq-item__left">
        <span className={`faq-item__num faq-item__num--${isOpen ? "open" : "closed"}`}>{String(index + 1).padStart(2, "0")}</span>
        <span className={`faq-item__question faq-item__question--${isOpen ? "open" : "closed"}`}>{faq.question}</span>
      </div>
      <div className={`faq-item__chevron-wrap faq-item__chevron-wrap--${isOpen ? "open" : "closed"}`}>
        <ChevronDown size={14} className={`faq-item__chevron faq-item__chevron--${isOpen ? "open" : "closed"} chevron-down${isOpen ? " open" : ""}`} aria-hidden="true" />
      </div>
    </button>
    {isOpen && (
      <div className="faq-item__answer">
        <p className="faq-item__answer-text">{faq.answer}</p>
      </div>
    )}
  </div>
))
FaqItem.displayName = "FaqItem"

export default function FaqSection() {
  const [activeChip, setActiveChip]   = useState<Chip>("all")
  const [expandedId, setExpandedId]   = useState<number | null>(null)
  const [isVisible, setIsVisible]     = useState(false)
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
  const filtered = activeChip === "all" ? faqs : faqs.filter(f => f.category === activeChip)
  const vis = isVisible

  return (
    <section ref={sectionRef} id="faq" aria-label="Frequently Asked Questions" className="faq">
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">FAQ</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">{faqs.length} Questions</span>
      </div>

      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 faq__header`}>
          <div>
            <div className="section-eyebrow">
              <div className="section-eyebrow__line" />
              <span className="section-eyebrow__label">Common Questions</span>
            </div>
            <h2 className="section-heading">Frequently <em>Asked</em><br /><span>Questions</span></h2>
          </div>
          <div className="faq__chips">
            {CHIPS.map(chip => (
              <button key={chip} onClick={() => setActiveChip(chip)} aria-pressed={activeChip === chip}
                className={`faq__chip${activeChip === chip ? " active" : ""}`}>
                {chip.charAt(0).toUpperCase() + chip.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="faq__layout">
          <div className="faq__accordion">
            {filtered.map((faq, i) => (
              <FaqItem key={faq.id} faq={faq} index={i} isOpen={expandedId === faq.id} onToggle={toggle} visible={vis} />
            ))}
            <div className="faq__hint">
              <MessageCircle size={16} className="faq__hint-icon" aria-hidden="true" />
              <p className="faq__hint-text">Still have questions? <strong>Chat with us on WhatsApp</strong> — we respond within minutes.</p>
            </div>
          </div>

          <div className="faq__sidebar">
            <div className="faq__sidebar-stats">
              <div className="faq__sidebar-stats-glow" />
              <div className="faq__sidebar-stats-line" />
              <h3 className="faq__sidebar-stats-title">Why Families Choose Us</h3>
              {[{ icon: "🏆", val: "70+",  lbl: "Completed Projects" }, { icon: "👨‍👩‍👧", val: "17K+", lbl: "Happy Families" }, { icon: "📋", val: "100%", lbl: "RERA Approved" }].map(s => (
                <div key={s.lbl} className="faq__sidebar-stat-row">
                  <div className="faq__sidebar-stat-box"><span role="img" aria-label={s.lbl}>{s.icon}</span></div>
                  <div><div className="faq__sidebar-stat-val">{s.val}</div><div className="faq__sidebar-stat-lbl">{s.lbl}</div></div>
                </div>
              ))}
            </div>
            <div className="faq__sidebar-cta">
              <div className="faq__sidebar-cta-line" />
              <h4 className="faq__sidebar-cta-title">Ready to Visit a Site?</h4>
              <p className="faq__sidebar-cta-sub">Book a free site visit — our team will guide you personally.</p>
              <div className="faq__sidebar-cta-btns">
                <button className="faq__sidebar-cta-primary" onClick={() => window.open("https://wa.me/919970501128", "_blank")}>WhatsApp</button>
                <a href="tel:+919322987615" className="faq__sidebar-cta-secondary"><Phone size={12} aria-hidden="true" /> Call Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Transparent. Honest. Always.</p>
          <div className="trust-bar__items">
            {["No Hidden Charges", "Clear Documentation", "Expert Guidance"].map(label => (
              <div key={label} className="trust-bar__item"><div className="trust-bar__dot" /><span className="trust-bar__name">{label}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}