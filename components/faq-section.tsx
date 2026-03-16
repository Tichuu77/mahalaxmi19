"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"

const faqs = [
  { id: 1, question: "What types of properties do you offer?",     answer: "We offer a wide range of residential and commercial plots in prime locations across Nagpur, including Besa, Beltarodi, Shankarpur, Wardha Road, and more. All properties are NMRDA sanctioned and RERA approved.", category: "Properties" },
  { id: 2, question: "What is the price range for your plots?",    answer: "Our plots start from ₹22 Lakh onwards, depending on the location, size, and amenities. We offer flexible payment plans and financing options to suit various budgets.",                                          category: "Pricing"    },
  { id: 3, question: "Are all your projects RERA approved?",       answer: "Yes, all our projects are 100% RERA approved and NMRDA sanctioned. We ensure complete legal compliance and transparency in all our dealings.",                                                                       category: "Legal"      },
  { id: 4, question: "What financing options are available?",      answer: "We offer multiple financing options including bank loans, in-house payment plans, and EMI facilities. Our team will help you choose the best option based on your financial situation.",                              category: "Finance"    },
  { id: 5, question: "How can I schedule a site visit?",           answer: "You can schedule a site visit by contacting us through our website, calling our helpline, or using the WhatsApp button. Our team will confirm your visit within 24 hours and provide all necessary details.",        category: "Visits"     },
  { id: 6, question: "What amenities are included?",               answer: "Our properties come with world-class amenities including 24/7 security, power backup, green spaces, community halls, and more. Specific amenities vary by project location.",                                       category: "Amenities"  },
]

const categories = ["all", "properties", "pricing", "legal", "finance"]

const QUICK_STATS = [
  { stat: "13+",  label: "Years of Experience"    },
  { stat: "100%", label: "RERA Approved Projects" },
  { stat: "17K+", label: "Happy Families"         },
]

const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })

/* ─── FAQ Item ─── */
const FAQItem = memo(({ faq, isOpen, onToggle, index, visible }: {
  faq: typeof faqs[0]; isOpen: boolean
  onToggle: (id: number) => void; index: number; visible: boolean
}) => {
  const handleClick = useCallback(() => onToggle(faq.id), [onToggle, faq.id])

  return (
    <div
      className="faq-item"
      style={{
        background: isOpen ? "#fff" : "rgba(48,83,74,.025)",
        border: `1px solid ${isOpen ? "rgba(201,134,43,.38)" : "rgba(48,83,74,.1)"}`,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: isOpen ? "0 8px 28px rgba(48,83,74,.1)" : "none",
        transform: isOpen ? "translateX(5px)" : "translateX(0)",
        transition: "all .32s cubic-bezier(.22,1,.36,1)",
        opacity: visible ? 1 : 0,
        willChange: "transform",
        // stagger translate on entry
        ...(visible ? {} : { transform: "translateY(20px)" }),
        transitionDelay: `${index * 55}ms`,
      }}
    >
      {/* Trigger */}
      <button
        onClick={handleClick}
        style={{
          width: "100%", textAlign: "left",
          display: "flex", alignItems: "flex-start", gap: 14,
          padding: "clamp(14px,2vw,20px) clamp(16px,2.5vw,24px)",
          background: "none", border: "none", cursor: "pointer",
        }}
      >
        {/* Index */}
        <span style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(1.3rem,2vw,1.6rem)",
          fontWeight: 700,
          color: isOpen ? "#C9862b" : "rgba(48,83,74,.18)",
          lineHeight: 1, flexShrink: 0, marginTop: 1,
          transition: "color .28s",
          minWidth: 32, userSelect: "none",
        }}>
          {String(faq.id).padStart(2, "0")}
        </span>

        {/* Question + category */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(1.05rem,1.6vw,1.25rem)",
            fontWeight: 700,
            color: isOpen ? "#30534A" : "#0d0d0d",
            margin: "0 0 7px", lineHeight: 1.2,
            transition: "color .28s",
          }}>
            {faq.question}
          </p>
          <span style={{
            display: "inline-block",
            fontSize: 9, fontWeight: 700,
            letterSpacing: ".14em", textTransform: "uppercase",
            background: isOpen ? "rgba(201,134,43,.1)" : "rgba(48,83,74,.07)",
            border: `1px solid ${isOpen ? "rgba(201,134,43,.25)" : "rgba(48,83,74,.12)"}`,
            color: isOpen ? "#a86a1a" : "#999",
            borderRadius: 999,
            padding: "3px 10px",
            fontFamily: "'Poppins',sans-serif",
            transition: "all .28s",
          }}>
            {faq.category}
          </span>
        </div>

        {/* Chevron */}
        <div style={{
          width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isOpen ? "rgba(201,134,43,.12)" : "rgba(48,83,74,.07)",
          border: `1px solid ${isOpen ? "rgba(201,134,43,.25)" : "rgba(48,83,74,.12)"}`,
          transition: "all .28s",
          marginTop: 2,
        }}>
          <ChevronDown size={15} style={{
            color: isOpen ? "#C9862b" : "rgba(48,83,74,.35)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .32s cubic-bezier(.22,1,.36,1)",
          }} />
        </div>
      </button>

      {/* Answer */}
      <div style={{
        maxHeight: isOpen ? "320px" : "0px",
        overflow: "hidden",
        transition: "max-height .4s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{
          display: "flex", gap: 12,
          padding: "0 clamp(16px,2.5vw,24px) clamp(16px,2vw,22px)",
          paddingLeft: `calc(clamp(16px,2.5vw,24px) + 32px + 14px)`,
          borderTop: "1px solid rgba(48,83,74,.07)",
          paddingTop: 14,
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: 8, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(201,134,43,.1)",
            border: "1px solid rgba(201,134,43,.2)",
            marginTop: 1,
          }}>
            <MessageCircle size={11} style={{ color: "#C9862b" }} />
          </div>
          <p style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "clamp(.85rem,1.2vw,.95rem)",
            color: "#666", lineHeight: 1.8, margin: 0, fontWeight: 400,
          }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
})
FAQItem.displayName = "FAQItem"

/* ─── Side Panel (desktop) ─── */
const SidePanel = memo(() => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

    {/* CTA card */}
    <div style={{
      background: "#30534A", borderRadius: 22,
      padding: "clamp(22px,2.5vw,32px)",
      position: "relative", overflow: "hidden",
      boxShadow: "0 12px 36px rgba(48,83,74,.22)",
    }}>
      {/* Decorative Cormorant watermark */}
      <div style={{
        position: "absolute", bottom: -16, right: -8,
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "7rem", fontWeight: 700,
        color: "rgba(255,255,255,.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>?</div>

      <div style={{
        width: 44, height: 44, borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(201,134,43,.18)",
        border: "1px solid rgba(201,134,43,.3)",
        marginBottom: 18,
      }}>
        <HelpCircle size={19} style={{ color: "#C9862b" }} />
      </div>

      <div style={{ width: 28, height: 2, background: "#C9862b", borderRadius: 2, marginBottom: 14 }} />

      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.55rem", fontWeight: 700, color: "#fff", margin: "0 0 10px", lineHeight: 1.15 }}>
        Still have questions?
      </h3>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.75, margin: "0 0 22px", fontWeight: 400 }}>
        Our team is here to help with personalised assistance — reach out anytime.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={scrollToContact}
          className="faq-cta-gold"
          style={{
            width: "100%", padding: "13px 20px", borderRadius: 12,
            background: "#C9862b", color: "#fff",
            fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13,
            letterSpacing: ".06em", border: "none", cursor: "pointer",
            transition: "transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease",
            boxShadow: "0 6px 18px rgba(201,134,43,.38)",
          }}
        >
          Contact Us
        </button>
        <a
          href="tel:+919322987615"
          className="faq-cta-ghost"
          style={{
            display: "block", width: "100%", padding: "13px 20px", borderRadius: 12,
            background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)",
            border: "1px solid rgba(255,255,255,.12)",
            fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13,
            letterSpacing: ".06em", textDecoration: "none", textAlign: "center",
            transition: "all .25s cubic-bezier(.22,1,.36,1)",
          }}
        >
          Call Now
        </a>
      </div>
    </div>

    {/* Stats card */}
    <div style={{
      background: "#fff",
      border: "1px solid rgba(48,83,74,.1)",
      borderRadius: 22, padding: "clamp(18px,2vw,26px)",
      boxShadow: "0 4px 16px rgba(48,83,74,.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{ width: 20, height: 2, background: "#C9862b", borderRadius: 2 }} />
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".22em", color: "#C9862b", margin: 0 }}>
          Why Trust Us
        </p>
      </div>
      {QUICK_STATS.map((s, i) => (
        <div key={s.stat} style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "clamp(10px,1.5vw,14px) 0",
          borderBottom: i < 2 ? "1px solid rgba(48,83,74,.07)" : "none",
        }}>
          <div style={{
            width: 44, minWidth: 44, height: 44, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(201,134,43,.08)",
            border: "1px solid rgba(201,134,43,.15)",
          }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 700, color: "#C9862b", lineHeight: 1 }}>
              {s.stat}
            </span>
          </div>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#777", fontWeight: 500, lineHeight: 1.4 }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  </div>
))
SidePanel.displayName = "SidePanel"

/* ─── Mobile CTA ─── */
const MobileCTA = memo(() => (
  <div style={{ marginTop: "clamp(1.5rem,4vw,2.5rem)" }}>
    <div style={{
      background: "#30534A", borderRadius: 20,
      padding: "clamp(20px,4vw,28px)",
      textAlign: "center",
      position: "relative", overflow: "hidden",
      boxShadow: "0 10px 32px rgba(48,83,74,.22)",
    }}>
      <div style={{ width: 28, height: 2, background: "#C9862b", borderRadius: 2, margin: "0 auto 14px" }} />
      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
        Still have questions?
      </h3>
      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "rgba(255,255,255,.55)", margin: "0 0 20px", lineHeight: 1.7, fontWeight: 400 }}>
        Our team is here to help with personalised assistance.
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={scrollToContact} style={{
          flex: 1, padding: "12px", borderRadius: 12,
          background: "#C9862b", color: "#fff",
          fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13,
          border: "none", cursor: "pointer",
          boxShadow: "0 6px 16px rgba(201,134,43,.35)",
        }}>Contact Us</button>
        <a href="tel:+919322987615" style={{
          flex: 1, padding: "12px", borderRadius: 12, textAlign: "center",
          background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.8)",
          border: "1px solid rgba(255,255,255,.12)",
          fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13,
          textDecoration: "none",
        }}>Call Now</a>
      </div>
    </div>
  </div>
))
MobileCTA.displayName = "MobileCTA"

/* ─── Section ─── */
export function FAQSection() {
  const [openId, setOpenId]     = useState<number | null>(1)
  const [filter, setFilter]     = useState("all")
  const [isVisible, setIsVisible] = useState(false)
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

  const handleToggle = useCallback((id: number) => setOpenId(prev => prev === id ? null : id), [])
  const filtered = filter === "all" ? faqs : faqs.filter(f => f.category.toLowerCase() === filter)
  const vis = isVisible

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{ background: "#f7f4ef", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        .faq-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.065) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* faq item entry animation helper */
        .faq-item {
          opacity: 0;
          transform: translateY(20px);
        }
        .faq-item.visible {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        /* CTA hover */
        .faq-cta-gold:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 10px 28px rgba(201,134,43,.45) !important; }
        .faq-cta-ghost:hover { background: rgba(255,255,255,.14) !important; color: #fff !important; }

        /* filter tab */
        .faq-tab { transition: background .22s, color .22s, box-shadow .22s, transform .22s; cursor: pointer; border: none; }
        .faq-tab:hover { transform: translateY(-1px) scale(1.04); }
        .faq-tab:active { transform: scale(.97); }

        /* desktop grid */
        .faq-desk-grid { display: grid; grid-template-columns: 1fr; }
        @media(min-width:1024px){ .faq-desk-grid { grid-template-columns: 1fr 1px 340px; align-items: start; } }

        .faq-vdiv { display:none; }
        @media(min-width:1024px){ .faq-vdiv { display:block; } }

        .faq-sidepanel { display:none; }
        @media(min-width:1024px){ .faq-sidepanel { display:block; padding-left: clamp(1.5rem,3vw,48px); } }

        .faq-mob-cta { display:block; }
        @media(min-width:1024px){ .faq-mob-cta { display:none; } }

        /* reveal */
        .faq-rv { opacity:0; transform:translateY(30px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .faq-rv.on { opacity:1; transform:translateY(0); }
        .fd0{transition-delay:0ms}  .fd1{transition-delay:120ms}
        .fd2{transition-delay:240ms} .fd3{transition-delay:360ms}
      `}</style>

      {/* Dot grid */}
      <div className="faq-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "5%", right: "15%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "8%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>FAQ</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>{faqs.length} Questions</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>

        {/* ─── HEADING + FILTERS ─── */}
        <div className={`faq-rv ${vis?"on":""} fd0`} style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(1.2rem,3vw,2rem)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.5rem,1.2vw,.9rem)" }}>
                <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
                <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Common Questions</span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(2.6rem,5.5vw,5rem)",
                lineHeight: 1.02, fontWeight: 600,
                color: "#0d0d0d", margin: "0 0 12px",
              }}>
                Frequently{" "}
                <em style={{ color: "#30534A", fontStyle: "italic" }}>Asked</em>
                <br />
                <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Questions</span>
              </h2>
              <p style={{ fontSize: "clamp(.88rem,1.25vw,1.05rem)", color: "#888", lineHeight: 1.8, maxWidth: 440, margin: 0, fontWeight: 400 }}>
                Find answers to common questions about our properties, pricing, and services.
              </p>
            </div>

            {/* Filter tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {categories.map((cat) => {
                const active = filter === cat
                return (
                  <button key={cat} onClick={() => setFilter(cat)} className="faq-tab" style={{
                    padding: "9px 18px", borderRadius: 999,
                    fontSize: 12, fontWeight: 700, letterSpacing: ".05em",
                    fontFamily: "'Poppins',sans-serif",
                    background: active ? "#30534A" : "rgba(48,83,74,.08)",
                    color: active ? "#fff" : "#30534A",
                    border: `1.5px solid ${active ? "#30534A" : "rgba(48,83,74,.18)"}`,
                    boxShadow: active ? "0 6px 18px rgba(48,83,74,.22)" : "none",
                  }}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ─── MAIN GRID ─── */}
        <div className="faq-desk-grid">

          {/* FAQ accordion */}
          <div className={`faq-rv ${vis?"on":""} fd1`} style={{ paddingRight: "clamp(0px,3vw,48px)" }}>
            {filtered.length === 0 ? (
              <p style={{ color: "#bbb", fontFamily: "'Poppins',sans-serif", fontSize: 14, padding: "60px 0", textAlign: "center" }}>
                No questions in this category yet.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1.5vw,12px)" }}>
                {filtered.map((faq, i) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={handleToggle}
                    index={i}
                    visible={vis}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Vertical divider */}
          <div className="faq-vdiv" style={{ background: "rgba(48,83,74,.1)", width: 1, alignSelf: "stretch" }} />

          {/* Side panel */}
          <div className={`faq-sidepanel faq-rv ${vis?"on":""} fd2`}>
            <SidePanel />
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="faq-mob-cta">
          <MobileCTA />
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div className={`faq-rv ${vis?"on":""} fd3`} style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            No question is too small
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Personalised Advice", "Zero Obligation", "Expert Guidance"].map((label) => (
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