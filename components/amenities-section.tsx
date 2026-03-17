"use client"

import { Wifi, Dumbbell, Trees, Zap, Shield, Users } from "lucide-react"
import { useState, useRef, useEffect, useMemo, memo } from "react"

const amenities = [
  { icon: Wifi,      title: "Smart Home",      description: "Advanced IoT integration for modern living.",      category: "facilities"    },
  { icon: Dumbbell,  title: "Fitness Center",  description: "State-of-the-art gym & workout facilities.",       category: "wellness"      },
  { icon: Trees,     title: "Green Spaces",    description: "Lush landscaping, parks and tree-lined paths.",    category: "wellness"      },
  { icon: Zap,       title: "Power Backup",    description: "Uninterrupted power supply around the clock.",    category: "facilities"    },
  { icon: Shield,    title: "24/7 Security",   description: "CCTV surveillance and on-site security team.",    category: "facilities"    },
  { icon: Users,     title: "Community Hub",   description: "Vibrant spaces designed for social gatherings.",  category: "entertainment" },
  { emoji: "🏊",     title: "Swimming Pool",   description: "Olympic-sized pool with children's splash zone.", category: "wellness"      },
  { emoji: "🎮",     title: "Gaming Zone",     description: "Indoor games & entertainment for all ages.",      category: "entertainment" },
  { emoji: "🧘",     title: "Yoga Studio",     description: "Dedicated wellness spaces for mind & body.",      category: "wellness"      },
  { emoji: "🚗",     title: "Covered Parking", description: "Secure multi-level parking for every resident.", category: "facilities"    },
  { emoji: "🎪",     title: "Banquet Hall",    description: "Premium event spaces for celebrations.",          category: "entertainment" },
  { emoji: "👶",     title: "Kids Play Area",  description: "Safe, colorful playground for children.",         category: "entertainment" },
]

const TABS = ["all", "facilities", "wellness", "entertainment"] as const
type Tab = typeof TABS[number]

const AmenityCard = memo(({ amenity, index, visible }: { amenity: typeof amenities[0]; index: number; visible: boolean }) => {
  const Icon = "icon" in amenity ? amenity.icon : null
  return (
    <article className={`amenity-card stagger-item${visible ? " on" : ""} s${index}`}>
      <div className="amenity-card__corner" />
      <div className="amenity-card__icon-wrap">
        {Icon ? <Icon size={20} className="amenity-card__icon" aria-hidden="true" /> : <span role="img" aria-label={amenity.title}>{(amenity as any).emoji}</span>}
      </div>
      <div>
        <h3 className="amenity-card__title">{amenity.title}</h3>
        <p className="amenity-card__desc">{amenity.description}</p>
      </div>
      <div className="amenity-card__bar" />
    </article>
  )
})
AmenityCard.displayName = "AmenityCard"

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasAnimated.current) { setIsVisible(true); hasAnimated.current = true } },
      { threshold: 0.07, rootMargin: "60px" }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const filtered = useMemo(() => activeTab === "all" ? amenities : amenities.filter(a => a.category === activeTab), [activeTab])
  const vis = isVisible

  return (
    <section ref={sectionRef} id="amenities" aria-label="Amenities" className="amenities">
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">World-Class Amenities</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">{amenities.length} Amenities</span>
      </div>
      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 amenities__header`}>
          <div>
            <div className="section-eyebrow">
              <div className="section-eyebrow__line" />
              <span className="section-eyebrow__label">Lifestyle Features</span>
            </div>
            <h2 className="section-heading">Designed for <em>Modern</em><br /><span>Living</span></h2>
          </div>
          <div className="amenities__tabs">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab}
                className={`amenities__tab${activeTab === tab ? " active" : ""}`}>
                {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="amenities__grid">
          {filtered.map((amenity, i) => <AmenityCard key={amenity.title} amenity={amenity} index={i} visible={vis} />)}
        </div>
      </div>
      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Designed for modern living</p>
          <div className="trust-bar__items">
            {["Premium Build Quality", "Vastu Compliant", "24×7 Maintenance"].map(label => (
              <div key={label} className="trust-bar__item"><div className="trust-bar__dot" /><span className="trust-bar__name">{label}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}