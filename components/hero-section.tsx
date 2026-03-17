"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowRight, MapPin, TrendingUp, Award, Shield, CheckCircle2 } from "lucide-react"

const MOBILE_STATS = [
  { value: "70+",  label: "Projects"      },
  { value: "17K+", label: "Families"      },
  { value: "100%", label: "RERA Approved" },
]
const TRUST = [
  { icon: Shield,       label: "NMRDA Sanctioned" },
  { icon: CheckCircle2, label: "RERA Approved"    },
  { icon: Award,        label: "ISO Certified"    },
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const L = isLoaded

  return (
    <section id="home" aria-label="Mahalaxmi Infra – Premium Plots in Nagpur" className="hero">
      <div className="hero__bg" />
      <div className="hero__glow-1" />
      <div className="hero__glow-2" />

      <div className="hero__inner">
        <div className="hero__grid">
          {/* Text column */}
          <div>
            <div className={`rv ${L?"on":""} d0 hero__eyebrow`}>
              <MapPin size={12} className="hero__eyebrow-icon" aria-hidden="true" />
              <span className="hero__eyebrow-text">Nagpur, Maharashtra</span>
            </div>

            <h1 className={`rv ${L?"on":""} d1 hero__h1`}>
              Premium <em>RERA</em><br />
              Approved Plots<br />
              <span>in Nagpur</span>
            </h1>

            <p className={`rv ${L?"on":""} d2 hero__sub`}>
              NMRDA sanctioned residential plots near MIHAN, Wardha Road &amp; Hingna.
              Starting <strong>₹22 Lakh</strong>. Bank loan up to 90% available.
            </p>

            <div className={`rv ${L?"on":""} d2 hero__stats`}>
              {MOBILE_STATS.map(s => (
                <div key={s.label} className="hero__stat">
                  <div className="hero__stat-val">{s.value}</div>
                  <div className="hero__stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            <div className={`rv ${L?"on":""} d3 hero__cta-group`}>
              <a href="#projects" className="hero__btn-primary" aria-label="Explore our projects">
                Explore Projects <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#contact" className="hero__btn-secondary">
                Schedule Visit
              </a>
            </div>
          </div>

          {/* Image column — desktop only */}
          <div className={`rv-r ${L?"on":""} d2 hero__img-panel`}>
            <div className="hero__photo">
              <img src="/hero-bg.jpeg" alt="Mahalaxmi Infra premium residential plots in Nagpur" loading="eager" fetchPriority="high" width={520} height={650} />
              <div className="hero__photo-overlay" />
            </div>
            <div className="hero__badge hero__badge--price">
              <TrendingUp size={16} className="hero__badge--price-icon" aria-hidden="true" />
              <div>
                <div className="hero__badge--price-val">₹22L</div>
                <div className="hero__badge--price-lbl">Starting Price</div>
              </div>
            </div>
            <div className="hero__badge hero__badge--rera">
              <Award size={14} className="icon-gold" aria-hidden="true" />
              <div>
                <div className="hero__badge--rera-title">RERA Approved</div>
                <div className="hero__badge--rera-sub">MAHA RERA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`rv ${L?"on":""} d7 hero__scroll`}>
        <div className="hero__scroll-line">
          <div className="hero__scroll-track" />
          <div className="hero__scroll-dot" />
        </div>
        <span className="hero__scroll-lbl">SCROLL</span>
      </div>

      {/* Trust strip */}
      <div className={`rv ${L?"on":""} d6 hero__trust`}>
        {TRUST.map(t => {
          const Icon = t.icon
          return (
            <div key={t.label} className="hero__trust-item">
              <div className="hero__trust-icon"><Icon size={11} aria-hidden="true" /></div>
              <span className="hero__trust-label">{t.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}