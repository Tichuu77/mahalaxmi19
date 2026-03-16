"use client"

import { useState, useCallback, memo } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

const contacts = [
  { icon: Phone,  label: "Phone",   value: "+91 9322987615",                                                                                                                            sub: "Available Mon–Fri, 9am–6pm",    href: "tel:+919322987615"               },
  { icon: Mail,   label: "Email",   value: "digvijaycr@gmail.com",                                                                                                                      sub: "We'll respond within 24 hours",  href: "mailto:digvijaycr@gmail.com"     },
  { icon: MapPin, label: "Address", value: "Flat No. 103, 104, Laxmivihar Apartment, Beside Hotel Airport Centre Point, Wardha Road, Somalwada, Nagpur – 440025", sub: null,           href: null                              },
]

const badges = ["Quick Response", "Free Consultation", "RERA Approved", "Transparent Process"]

const EMPTY_FORM = { name: "", mobile: "", lookingFor: "", interestedIn: "" }
type FormState = typeof EMPTY_FORM

/* ─── Field Label ─── */
const Label = memo(({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} style={{
    display: "block",
    fontSize: 10, fontWeight: 700,
    textTransform: "uppercase", letterSpacing: ".14em",
    color: "#30534A",
    fontFamily: "'Poppins',sans-serif",
    marginBottom: 7,
  }}>{children}</label>
))
Label.displayName = "Label"

/* ─── Contact Card ─── */
const ContactCard = memo(({ contact, index }: { contact: typeof contacts[0]; index: number }) => {
  const Icon = contact.icon
  const dark = index === 0
  const inner = (
    <div
      className="cct-card"
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        background: dark ? "#30534A" : "#fff",
        border: `1px solid ${dark ? "#30534A" : "rgba(48,83,74,.12)"}`,
        borderRadius: 18,
        padding: "clamp(14px,2vw,20px)",
        boxShadow: dark ? "0 10px 28px rgba(48,83,74,.2)" : "0 4px 16px rgba(48,83,74,.06)",
        transition: "transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 40, height: 40, borderRadius: "0 18px 0 100%",
        background: dark ? "rgba(201,134,43,.15)" : "rgba(48,83,74,.05)",
      }} />

      {/* Icon */}
      <div style={{
        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: dark ? "rgba(201,134,43,.18)" : "rgba(48,83,74,.08)",
        border: `1px solid ${dark ? "rgba(201,134,43,.3)" : "rgba(48,83,74,.14)"}`,
      }}>
        <Icon size={17} style={{ color: "#C9862b" }} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".18em", color: "#C9862b", margin: "0 0 5px" }}>
          {contact.label}
        </p>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(.82rem,1.2vw,.95rem)", color: dark ? "rgba(255,255,255,.85)" : "#444", lineHeight: 1.6, margin: "0 0 3px", wordBreak: "break-word" }}>
          {contact.value}
        </p>
        {contact.sub && (
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: dark ? "rgba(255,255,255,.38)" : "#ccc", margin: 0 }}>
            {contact.sub}
          </p>
        )}
      </div>
    </div>
  )

  return contact.href
    ? <a href={contact.href} style={{ display: "block", textDecoration: "none" }}>{inner}</a>
    : <div>{inner}</div>
})
ContactCard.displayName = "ContactCard"

/* ─── Trust Badges ─── */
const TrustBadges = memo(() => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
    {badges.map((label) => (
      <div key={label} style={{
        display: "flex", alignItems: "center", gap: 9,
        background: "rgba(48,83,74,.06)",
        border: "1px solid rgba(48,83,74,.1)",
        borderRadius: 12,
        padding: "10px 14px",
      }}>
        <CheckCircle size={12} style={{ color: "#C9862b", flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#555", fontFamily: "'Poppins',sans-serif" }}>{label}</span>
      </div>
    ))}
  </div>
))
TrustBadges.displayName = "TrustBadges"

/* ─── Success State ─── */
const SuccessState = memo(() => (
  <div style={{ padding: "clamp(40px,8vw,72px) 20px", textAlign: "center" }}>
    <div style={{
      width: 64, height: 64, borderRadius: "50%", background: "#30534A",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 20px",
      boxShadow: "0 12px 32px rgba(48,83,74,.3)",
    }}>
      <svg width="28" height="28" fill="none" stroke="#fff" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", fontWeight: 700, color: "#0d0d0d", margin: "0 0 8px" }}>
      Message Sent!
    </h3>
    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "#999", margin: 0 }}>
      We'll get back to you as soon as possible.
    </p>
  </div>
))
SuccessState.displayName = "SuccessState"

/* ─── Input base style ─── */
const IS: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(48,83,74,.04)",
  border: "1px solid rgba(48,83,74,.18)",
  borderRadius: 12,
  color: "#0d0d0d",
  fontSize: "clamp(.85rem,1.2vw,.95rem)",
  fontFamily: "'Poppins',sans-serif",
  fontWeight: 400,
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
  boxSizing: "border-box" as const,
}
const iFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#C9862b"
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,134,43,.1)"
}
const iBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(48,83,74,.18)"
  e.currentTarget.style.boxShadow = "none"
}

/* ─── Section ─── */
export default function ContactSection() {
  const [formState, setFormState]   = useState<FormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    if (!formState.name || !formState.mobile || !formState.lookingFor || !formState.interestedIn) {
      setSubmitStatus("error"); setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "3ce8f80e-4346-40e1-9502-b1d434ec2be5",
          name: formState.name,
          subject: `New Inquiry – ${formState.lookingFor}`,
          message: `Name: ${formState.name}\nMobile: ${formState.mobile}\nLooking For: ${formState.lookingFor}\nInterested In: ${formState.interestedIn}`.trim(),
        }),
      })
      const data = await res.json()
      if (data.success) { setSubmitStatus("success"); setFormState(EMPTY_FORM) }
      else { setSubmitStatus("error"); setTimeout(() => setSubmitStatus("idle"), 3000) }
    } catch { setSubmitStatus("error"); setTimeout(() => setSubmitStatus("idle"), 3000) }
    finally { setIsSubmitting(false); setTimeout(() => setSubmitStatus("idle"), 6000) }
  }, [formState])

  return (
    <section
      id="contact"
      style={{ background: "#fff", overflow: "hidden", position: "relative", fontFamily: "'Poppins',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');

        .cnt-dotbg {
          background-image: radial-gradient(rgba(48,83,74,.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* contact card hover */
        .cct-card:hover { transform: translateY(-4px) !important; box-shadow: 0 14px 38px rgba(48,83,74,.2) !important; }

        /* submit btn */
        .cnt-submit {
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%;
          border: none; cursor: pointer;
        }
        .cnt-submit:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 16px 36px rgba(48,83,74,.38) !important; }
        .cnt-submit:active:not(:disabled) { transform: scale(.98); }
        .cnt-submit:disabled { opacity: .6; cursor: not-allowed; }
        .cnt-submit .carr { transition: transform .28s ease; }
        .cnt-submit:hover:not(:disabled) .carr { transform: translateX(5px); }

        /* spin */
        @keyframes cnt-spin { to { transform: rotate(360deg); } }
        .cnt-spinner { animation: cnt-spin .8s linear infinite; }

        /* desktop grid */
        .cnt-grid { display: grid; grid-template-columns: 1fr; gap: clamp(2rem,4vw,3rem); }
        @media(min-width:1024px){ .cnt-grid { grid-template-columns: 1fr 1px 1.55fr; gap: 0; } }

        /* vdiv */
        .cnt-vdiv { display:none; }
        @media(min-width:1024px){ .cnt-vdiv { display:block; } }

        /* form wrapper spacing */
        .cnt-form-wrap { }
        @media(min-width:1024px){ .cnt-form-wrap { padding-left: clamp(1.5rem,4vw,56px); } }
        .cnt-left-wrap { }
        @media(min-width:1024px){ .cnt-left-wrap { padding-right: clamp(1.5rem,4vw,56px); } }

        /* spin anim */
        @keyframes cnt-spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* Dot grid */}
      <div className="cnt-dotbg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: 0, left: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,134,43,.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: "10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(48,83,74,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      {/* Right accent stripe */}
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom,#30534A,#C9862b,#30534A)", zIndex: 2 }} />

      {/* ─── LABEL STRIP ─── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "20px clamp(1.25rem,5vw,6rem)",
        borderBottom: "1px solid rgba(48,83,74,.1)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.15))", borderRadius: 2, flexShrink: 0 }} />
        <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Get in Touch</span>
        <div style={{ flex: 1, height: 1, background: "rgba(48,83,74,.1)" }} />
        <span style={{ color: "rgba(48,83,74,.35)", fontSize: 10, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" }}>Free Consultation</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,6rem) clamp(3rem,6vw,5rem)", position: "relative", zIndex: 10 }}>

        {/* ─── HEADING ─── */}
        <div style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(.5rem,1.2vw,.9rem)" }}>
            <div style={{ width: 32, height: 2, background: "linear-gradient(90deg,#C9862b,rgba(201,134,43,.2))", borderRadius: 2 }} />
            <span style={{ color: "#C9862b", fontSize: 10, fontWeight: 700, letterSpacing: ".38em", textTransform: "uppercase" }}>Reach Out</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(2.6rem,5.5vw,5rem)",
            lineHeight: 1.02, fontWeight: 600,
            color: "#0d0d0d", margin: "0 0 12px",
          }}>
            Contact{" "}
            <em style={{ color: "#30534A", fontStyle: "italic" }}>Us</em>
            <br />
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Today</span>
          </h2>
          <p style={{ fontSize: "clamp(.88rem,1.25vw,1.05rem)", color: "#888", lineHeight: 1.85, maxWidth: 460, margin: 0, fontWeight: 400 }}>
            Have a question or ready to invest? We'd love to hear from you — reach out and we'll get back to you fast.
          </p>
        </div>

        {/* ─── CONTENT GRID ─── */}
        <div className="cnt-grid">

          {/* LEFT — Contact info */}
          <div className="cnt-left-wrap" style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem,3vw,2.5rem)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {contacts.map((c, i) => <ContactCard key={c.label} contact={c} index={i} />)}
            </div>
            <TrustBadges />
          </div>

          {/* Vertical divider */}
          <div className="cnt-vdiv" style={{ background: "rgba(48,83,74,.1)", width: 1, alignSelf: "stretch" }} />

          {/* RIGHT — Form */}
          <div className="cnt-form-wrap">
            <div style={{
              background: "rgba(48,83,74,.03)",
              border: "1px solid rgba(48,83,74,.1)",
              borderRadius: 22,
              padding: "clamp(22px,3vw,40px)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Corner decorations */}
              <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: "2px solid rgba(201,134,43,.35)", borderLeft: "2px solid rgba(201,134,43,.35)", borderRadius: "22px 0 0 0" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: "2px solid rgba(201,134,43,.35)", borderRight: "2px solid rgba(201,134,43,.35)", borderRadius: "0 0 22px 0" }} />

              {submitStatus === "success" ? <SuccessState /> : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <input type="hidden" name="from_name" value="Contact Form Website" />
                  <input type="checkbox" name="botcheck" style={{ display: "none" }} />

                  {/* Name + Mobile */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
                    <div>
                      <Label htmlFor="name">Name <span style={{ color: "#e55" }}>*</span></Label>
                      <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required placeholder="John Doe" style={IS} onFocus={iFocus} onBlur={iBlur} />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile <span style={{ color: "#e55" }}>*</span></Label>
                      <input type="tel" id="mobile" name="mobile" value={formState.mobile} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" style={IS} onFocus={iFocus} onBlur={iBlur} />
                    </div>
                  </div>

                  {/* Looking For */}
                  <div>
                    <Label htmlFor="lookingFor">Looking For <span style={{ color: "#e55" }}>*</span></Label>
                    <select
                      id="lookingFor" name="lookingFor"
                      value={formState.lookingFor} onChange={handleChange} required
                      style={{
                        ...IS, appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2330534A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        paddingRight: "40px",
                        color: formState.lookingFor ? "#0d0d0d" : "#aaa",
                        cursor: "pointer",
                      }}
                      onFocus={iFocus} onBlur={iBlur}
                    >
                      <option value="" disabled>Select property type</option>
                      <option value="Residential Plots">Residential Plots</option>
                      <option value="Commercial Plots">Commercial Plots</option>
                      <option value="Residential & Commercial Plots">Residential &amp; Commercial Plots</option>
                    </select>
                  </div>

                  {/* Interested In */}
                  <div>
                    <Label htmlFor="interestedIn">Interested In (Project + Area) <span style={{ color: "#e55" }}>*</span></Label>
                    <input type="text" id="interestedIn" name="interestedIn" value={formState.interestedIn} onChange={handleChange} required placeholder="e.g. Nagar-41 – 1200 sq.ft" style={IS} onFocus={iFocus} onBlur={iBlur} />
                  </div>

                  {/* Error */}
                  {submitStatus === "error" && (
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: "rgba(229,85,85,.07)", border: "1px solid rgba(229,85,85,.25)",
                      borderRadius: 12, padding: "12px 16px",
                      color: "#c44", fontSize: 13, fontFamily: "'Poppins',sans-serif",
                    }}>
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Please fill in all required fields and try again.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cnt-submit"
                    style={{
                      background: "linear-gradient(135deg,#30534A 0%,#3d6b60 100%)",
                      color: "#fff",
                      fontWeight: 700, fontSize: "clamp(12px,1.2vw,14px)",
                      letterSpacing: ".06em",
                      padding: "clamp(13px,1.6vw,17px) 28px",
                      borderRadius: 14,
                      boxShadow: "0 10px 28px rgba(48,83,74,.28)",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="cnt-spinner" style={{ width: 16, height: 16, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,.3)", borderTopColor: "#fff" }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} className="carr" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM TRUST BAR ─── */}
      <div style={{ background: "#30534A", borderTop: "1px solid rgba(48,83,74,.2)" }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto",
          padding: "18px clamp(1.25rem,5vw,6rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", margin: 0 }}>
            We're here for you
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["No Hidden Charges", "Quick Response", "Expert Guidance"].map((label) => (
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