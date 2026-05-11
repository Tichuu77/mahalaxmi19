import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Phone, Shield, CheckCircle2, Award } from "lucide-react"
import fs from "fs"
import path from "path"

// ── Helpers ────────────────────────────────────────────────────────────────
function getArea(areaSlug: string) {
  // urlPath = "mihan-nagpur" → slug stored in JSON = "mihan"
  try {
    const dir = path.join(process.cwd(), "content/areas")
    const files = fs.readdirSync(dir)
    for (const f of files) {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"))
      if (data.urlPath === areaSlug) return data
    }
    return null
  } catch {
    return null
  }
}

function getAllAreas() {
  const dir = path.join(process.cwd(), "content/areas")
  return fs.readdirSync(dir).map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"))
  )
}

function getAllBlogs() {
  const dir = path.join(process.cwd(), "content/blogs")
  return fs.readdirSync(dir).map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"))
  )
}

// ── Static generation ──────────────────────────────────────────────────────
export async function generateStaticParams() {
  const areas = getAllAreas()
  return areas.map((a: any) => ({ areaSlug: a.urlPath }))
}

// ── Meta ───────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { areaSlug: string }
}): Promise<Metadata> {
  const area = getArea(params.areaSlug)
  if (!area) return {}
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.keywords,
    alternates: { canonical: `https://mm.mahalaxmiinfra.in/${area.urlPath}` },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      images: [area.image],
    },
  }
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function AreaPage({ params }: { params: { areaSlug: string } }) {
  const area = getArea(params.areaSlug)
  if (!area) notFound()

  const allBlogs = getAllBlogs()
  const allAreas = getAllAreas()

  const relatedBlogs = allBlogs.filter((b: any) => area.relatedBlogs?.includes(b.slug))
  const relatedAreas = allAreas.filter((a: any) => area.relatedAreas?.includes(a.slug))

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: area.metaTitle,
    description: area.metaDescription,
    url: `https://mm.mahalaxmiinfra.in/${area.urlPath}`,
    provider: {
      "@type": "RealEstateAgent",
      name: "Mahalaxmi Infra",
      telephone: "+919970501128",
      url: "https://mm.mahalaxmiinfra.in",
    },
    areaServed: {
      "@type": "Place",
      name: `${area.name}, Nagpur, Maharashtra`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="area-page">
        {/* Hero */}
        <section className="area-page__hero">
          <img src={area.image} alt={area.heroHeading} className="area-page__hero-img" />
          <div className="area-page__hero-overlay" />
          <div className="area-page__hero-content section-inner">
            <div className="rv on d0 hero__eyebrow" style={{ marginBottom: "16px" }}>
              <MapPin size={12} className="hero__eyebrow-icon" />
              <span className="hero__eyebrow-text">Nagpur, Maharashtra</span>
            </div>
            <h1 className="blog-detail__title">{area.heroHeading}</h1>
            <p className="blog-detail__meta">{area.heroSubheading}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
              <a href="/#contact" className="hero__btn-primary">Enquire Now</a>
              <a
                href="https://wa.me/919970501128"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__btn-secondary"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        <div className="blog-detail__layout section-inner">
          {/* Main content */}
          <article className="blog-detail__article">

            {/* Introduction */}
            <div className="blog-detail__section">
              <h2 className="blog-detail__h2">About {area.fullName}</h2>
              <p className="blog-detail__p">{area.introduction}</p>
            </div>

            {/* Why Invest */}
            <div className="blog-detail__section">
              <h2 className="blog-detail__h2">Why Invest in {area.name}?</h2>
              <ul className="area-page__why-list">
                {area.whyInvest.map((reason: string, i: number) => (
                  <li key={i} className="area-page__why-item">
                    <span className="wcu__check-bullet wcu__check-bullet--gold">
                      <CheckCircle2 size={9} />
                    </span>
                    <span className="wcu__check-text">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects in this area */}
            {area.projects?.length > 0 && (
              <div className="blog-detail__section">
                <h2 className="blog-detail__h2">Mahalaxmi Infra Projects in {area.name}</h2>
                <div className="area-page__projects">
                  {area.projects.map((p: any, i: number) => (
                    <div key={i} className="area-page__proj-card">
                      <img src={p.image} alt={p.title} className="area-page__proj-img" loading="lazy" />
                      <div className="area-page__proj-body">
                        <div className={`status-badge status-badge--${p.status}`} style={{ marginBottom: "8px" }}>
                          <span className={`status-badge__dot status-badge__dot--${p.status}`} />
                          <span className={`status-badge__label status-badge__label--${p.status}`}>
                            {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                          </span>
                        </div>
                        <h3 className="area-page__proj-title">{p.title}</h3>
                        <div className="proj-card__loc">
                          <MapPin size={10} className="proj-card__loc-icon" />
                          <span className="proj-card__loc-text">{p.location}</span>
                        </div>
                        <a
                          href={`https://wa.me/919970501128?text=Hi, I'm interested in ${p.title} at ${p.location}. Please share details.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-card__btn"
                          style={{ display: "flex", marginTop: "12px" }}
                        >
                          <Phone size={11} /> Enquire
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="blog-detail__section">
              <h2 className="blog-detail__h2">Frequently Asked Questions</h2>
              <div className="area-page__faqs">
                {area.faqs.map((faq: any, i: number) => (
                  <div key={i} className="area-page__faq">
                    <h3 className="area-page__faq-q">{faq.question}</h3>
                    <p className="area-page__faq-a">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related blogs */}
            {relatedBlogs.length > 0 && (
              <div className="blog-detail__section">
                <h2 className="blog-detail__h2">Related Articles</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {relatedBlogs.map((b: any) => (
                    <Link key={b.slug} href={`/blog/${b.slug}`} className="area-page__blog-link">
                      <span className="area-page__blog-cat">{b.category}</span>
                      <span className="area-page__blog-title">{b.title} →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="blog-detail__sidebar">
            {/* CTA */}
            <div className="blog-detail__sidebar-cta">
              <div className="section-eyebrow" style={{ marginBottom: "10px" }}>
                <div className="section-eyebrow__line" />
                <span className="section-eyebrow__label">Get Started</span>
              </div>
              <h3 className="blog-detail__sidebar-title">Interested in {area.name}?</h3>
              <p className="blog-detail__sidebar-sub">
                Book a free site visit. Our team responds within 30 minutes.
              </p>
              <a href="/#contact" className="contact__submit" style={{ display: "flex", marginTop: "12px" }}>
                Enquire Now
              </a>
              <a
                href={`https://wa.me/919970501128?text=Hi, I'm interested in property in ${area.name} Nagpur. Please share details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-detail__sidebar-wa"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Trust badges */}
            <div className="blog-detail__sidebar-cta">
              {[
                { icon: Award, text: "RERA Approved" },
                { icon: Shield, text: "NMRDA Sanctioned" },
                { icon: CheckCircle2, text: "90% Bank Finance" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="contact__badge" style={{ marginBottom: "8px" }}>
                  <Icon size={14} className="contact__badge-icon" />
                  <span className="contact__badge-text">{text}</span>
                </div>
              ))}
            </div>

            {/* Related Areas */}
            {relatedAreas.length > 0 && (
              <div className="blog-detail__sidebar-areas">
                <div className="section-eyebrow" style={{ marginBottom: "10px" }}>
                  <div className="section-eyebrow__line" />
                  <span className="section-eyebrow__label">Nearby Areas</span>
                </div>
                {relatedAreas.map((a: any) => (
                  <Link
                    key={a.slug}
                    href={`/${a.urlPath}`}
                    className="blog-detail__area-pill"
                  >
                    Property in {a.name} Nagpur →
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>

        <div className="trust-bar">
          <div className="trust-bar__inner">
            <p className="trust-bar__label">Mahalaxmi Infra — Building Nagpur since 2012</p>
            <div className="trust-bar__items">
              {["NMRDA Approved", "RERA Certified", "17,000+ Families"].map((l) => (
                <div key={l} className="trust-bar__item">
                  <div className="trust-bar__dot" />
                  <span className="trust-bar__name">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
