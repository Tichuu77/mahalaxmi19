"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  { id: 1, name: "Rajkumar Gharjale", location: "Nagpur", rating: 5, image: "/testonomials1.webp", content: "Investing with Maha Laxmi Developers was an effortless experience. Their transparent process and clear documentation gave me full confidence. The best decision I ever made." },
  { id: 2, name: "Priya Shah",        location: "Mumbai", rating: 5, image: "/testonomials2.jpg",  content: "I wanted to invest in a growing area, and plots in Nagpur Besa seemed perfect. Maha Laxmi Developers exceeded my expectations in every way. Highly recommended!" },
  { id: 3, name: "Karan Akojwar",     location: "Pune",   rating: 5, image: "/testonomials3.jpg",  content: "Investing in residential plots with Mahalaxmi Developers was one of my best decisions. Their transparency, clear titles, and prompt assistance gave me real peace of mind." },
]
const TOTAL = testimonials.length
const RATING_WIDTHS = ["rating-bar-w5", "rating-bar-w4", "rating-bar-w3", "rating-bar-w2", "rating-bar-w1"]

const Stars = memo(({ count }: { count: number }) => (
  <div className="stars">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={13} className="star-filled" aria-hidden="true" />
    ))}
  </div>
))
Stars.displayName = "Stars"

export function TestimonialsSection() {
  const [current, setCurrent]     = useState(0)
  const [autoplay, setAutoplay]   = useState(true)
  const [isVisible, setIsVisible] = useState(false)
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

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => setCurrent(p => (p + 1) % TOTAL), 5200)
    return () => clearInterval(id)
  }, [autoplay])

  const prev = useCallback(() => { setCurrent(p => (p - 1 + TOTAL) % TOTAL); setAutoplay(false) }, [])
  const next = useCallback(() => { setCurrent(p => (p + 1) % TOTAL); setAutoplay(false) }, [])
  const goTo = useCallback((i: number) => { setCurrent(i); setAutoplay(false) }, [])

  const vis    = isVisible
  const active = testimonials[current]

  return (
    <section ref={sectionRef} id="testimonials" aria-label="Customer Testimonials" className="testimonials">
      <div className="dot-bg dot-bg--dark" />
      <div className="label-strip label-strip--dark">
        <div className="label-strip__line" />
        <span className="label-strip__text">Testimonials</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">17,000+ Happy Families</span>
      </div>

      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 mb-section`}>
          <div className="section-eyebrow">
            <div className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Real Stories</span>
          </div>
          <h2 className="section-heading section-heading--white">
            Words from Our <em>Happy</em><br /><span className="green">Families</span>
          </h2>
        </div>

        <div className="testimonials__layout">
          <div className={`rv ${vis ? "on" : ""} d1`}>
            <div key={active.id} className="testimonials__quote">
              <div className="testimonials__quote-mark">"</div>
              <div className="testimonials__quote-glow" />
              <div className="testimonials__quote-line" />
              <Stars count={active.rating} />
              <p className="testimonials__quote-text">"{active.content}"</p>
              <div className="testimonials__quote-author">
                <div className="testimonials__quote-avatar-wrap">
                  <img src={active.image} alt={active.name} loading="lazy" decoding="async" className="testimonials__quote-avatar" />
                  <div className="testimonials__quote-online" />
                </div>
                <div>
                  <p className="testimonials__quote-name">{active.name}</p>
                  <p className="testimonials__quote-loc">{active.location} · Verified Buyer</p>
                </div>
              </div>
            </div>
            <div className="testimonials__nav">
              <button onClick={prev} aria-label="Previous testimonial" className="testimonials__nav-btn"><ChevronLeft size={18} /></button>
              <div className="testimonials__dots">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} aria-label={`Testimonial ${i + 1}`}
                    className={`testimonials__dot${i === current ? " active" : ""}`} />
                ))}
              </div>
              <button onClick={next} aria-label="Next testimonial" className="testimonials__nav-btn"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className={`rv ${vis ? "on" : ""} d2 testimonials__right`}>
            <div className="testimonials__picker">
              {testimonials.map((t, i) => (
                <button key={t.id} onClick={() => goTo(i)}
                  className={`testimonials__pick-btn testimonials__pick-btn--${i === current ? "active" : "inactive"}`}>
                  <img src={t.image} alt={t.name} loading="lazy" decoding="async"
                    className={`testimonials__pick-avatar testimonials__pick-avatar--${i === current ? "active" : "inactive"}`} />
                  <div className="testimonials__pick-text">
                    <p className={`testimonials__pick-name testimonials__pick-name--${i === current ? "active" : "inactive"}`}>{t.name}</p>
                    <p className={`testimonials__pick-loc  testimonials__pick-loc--${i === current ? "active" : "inactive"}`}>{t.location}</p>
                  </div>
                  <Stars count={t.rating} />
                </button>
              ))}
            </div>

            <div className="testimonials__rating">
              <div className="testimonials__rating-top">
                <div className="testimonials__rating-score">5.0</div>
                <div><Stars count={5} /><p className="testimonials__rating-sub">Based on 500+ reviews</p></div>
              </div>
              {[5, 4, 3, 2, 1].map((n, i) => (
                <div key={n} className="testimonials__rating-bar">
                  <span className="testimonials__rating-bar-num">{n}</span>
                  <Star size={10} className="star-filled" aria-hidden="true" />
                  <div className="testimonials__rating-bar-track">
                    <div className={`testimonials__rating-bar-fill ${RATING_WIDTHS[i]}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="trust-bar trust-bar--dark">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Every word, a true story</p>
          <div className="trust-bar__items">
            {["Verified Reviews", "Real Families", "No Paid Promotions"].map(label => (
              <div key={label} className="trust-bar__item"><div className="trust-bar__dot" /><span className="trust-bar__name">{label}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}