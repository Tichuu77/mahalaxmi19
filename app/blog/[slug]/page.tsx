import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"

// ── Static generation ──────────────────────────────────────────────────────
export const dynamicParams = false

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blogs")
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"))
  return files.map((f) => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"))
    return { slug: data.slug }
  })
}

function getBlog(slug: string) {
  try {
    const dir = path.join(process.cwd(), "content/blogs")
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(".json")) continue
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"))
      if (data.slug === slug) return data
    }
    return null
  } catch {
    return null
  }
}

function getAllBlogs() {
  const dir = path.join(process.cwd(), "content/blogs")
  return fs.readdirSync(dir).map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"))
  )
}

// ── Meta ───────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) return {}
  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    keywords: blog.keywords,
    authors: [{ name: blog.author }],
    alternates: { canonical: `https://mm.mahalaxmiinfra.in/blog/${blog.slug}` },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.image],
      type: "article",
      publishedTime: blog.date,
    },
  }
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = getBlog(slug)
  if (!blog) notFound()

  const allBlogs = getAllBlogs()
  const related = allBlogs.filter((b: any) => blog.relatedBlogs?.includes(b.slug))

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.metaDescription,
    image: `https://mm.mahalaxmiinfra.in${blog.image}`,
    datePublished: blog.date,
    author: { "@type": "Organization", name: blog.author },
    publisher: {
      "@type": "Organization",
      name: "Mahalaxmi Infra",
      logo: { "@type": "ImageObject", url: "https://mm.mahalaxmiinfra.in/Malaxmi-Final-Logo-1.png" },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="blog-detail">
        {/* Hero */}
        <section className="blog-detail__hero">
          <img src={blog.image} alt={blog.title} className="blog-detail__hero-img" />
          <div className="blog-detail__hero-overlay" />
          <div className="blog-detail__hero-content section-inner">
            <span className="news-cat">{blog.category}</span>
            <h1 className="blog-detail__title">{blog.title}</h1>
            <p className="blog-detail__meta">{blog.date} · {blog.readTime} read · By {blog.author}</p>
          </div>
        </section>

        <div className="blog-detail__layout section-inner">
          {/* Article */}
          <article className="blog-detail__article">
            {blog.content.map((block: any, i: number) => {
              if (block.type === "intro") {
                return <p key={i} className="blog-detail__intro">{block.text}</p>
              }
              if (block.type === "section") {
                return (
                  <div key={i} className="blog-detail__section">
                    <h2 className="blog-detail__h2">{block.heading}</h2>
                    <p className="blog-detail__p">{block.text}</p>
                    {block.areaLink && (
                      <Link href={block.areaLink} className="blog-detail__area-link">
                        View properties in this area →
                      </Link>
                    )}
                  </div>
                )
              }
              if (block.type === "conclusion") {
                return (
                  <div key={i} className="blog-detail__conclusion">
                    <p className="blog-detail__p">{block.text}</p>
                    {block.cta && (
                      <Link href={block.cta.link} className="hero__btn-primary" style={{ display: "inline-flex", marginTop: "16px" }}>
                        {block.cta.text} →
                      </Link>
                    )}
                  </div>
                )
              }
              return null
            })}
          </article>

          {/* Sidebar */}
          <aside className="blog-detail__sidebar">
            {/* CTA card */}
            <div className="blog-detail__sidebar-cta">
              <div className="section-eyebrow" style={{ marginBottom: "10px" }}>
                <div className="section-eyebrow__line" />
                <span className="section-eyebrow__label">Interested?</span>
              </div>
              <h3 className="blog-detail__sidebar-title">Talk to Our Team</h3>
              <p className="blog-detail__sidebar-sub">Get a free site visit and personalised plot recommendation in Nagpur.</p>
              <a href="/#contact" className="contact__submit" style={{ display: "flex", marginTop: "12px" }}>
                Enquire Now
              </a>
              <a
                href="https://wa.me/919970501128?text=Hi, I read your blog and want to know more about plots in Nagpur."
                target="_blank"
                rel="noopener noreferrer"
                className="blog-detail__sidebar-wa"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Related Area Pages */}
            {blog.relatedAreas?.length > 0 && (
              <div className="blog-detail__sidebar-areas">
                <div className="section-eyebrow" style={{ marginBottom: "10px" }}>
                  <div className="section-eyebrow__line" />
                  <span className="section-eyebrow__label">Explore Areas</span>
                </div>
                {blog.relatedAreas.map((areaSlug: string) => (
                  <Link
                    key={areaSlug}
                    href={`/property-in-${areaSlug}-nagpur`}
                    className="blog-detail__area-pill"
                  >
                    Property in {areaSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Nagpur →
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>

        {/* Related Blogs */}
        {related.length > 0 && (
          <section className="section-inner">
            <div className="section-eyebrow" style={{ marginBottom: "16px" }}>
              <div className="section-eyebrow__line" />
              <span className="section-eyebrow__label">Related Articles</span>
            </div>
            <div className="blog-index__grid blog-index__grid--3">
              {related.map((b: any) => (
                <Link key={b.slug} href={`/blog/${b.slug}`} className="blog-card">
                  <div className="blog-card__img-wrap">
                    <img src={b.image} alt={b.title} loading="lazy" className="blog-card__img" />
                  </div>
                  <div className="blog-card__body">
                    <p className="blog-card__meta">{b.readTime} read</p>
                    <h3 className="blog-card__title" style={{ fontSize: "1rem" }}>{b.title}</h3>
                    <span className="blog-card__cta">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="trust-bar">
          <div className="trust-bar__inner">
            <p className="trust-bar__label">Mahalaxmi Infra — Building Nagpur since 2012</p>
            <div className="trust-bar__items">
              {["NMRDA Approved", "RERA Certified", "90% Finance Available"].map((l) => (
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
