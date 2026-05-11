import type { Metadata } from "next"
import Link from "next/link"
import fs from "fs"
import path from "path"

export const metadata: Metadata = {
  title: "Blog | Real Estate Insights for Nagpur Property Buyers | Mahalaxmi Infra",
  description: "Expert blogs on Nagpur real estate — property investment tips, NMRDA & RERA guides, home loan advice, and area insights for buyers in 2025.",
  alternates: { canonical: "https://mm.mahalaxmiinfra.in/blog" },
}

function getAllBlogs() {
  const dir = path.join(process.cwd(), "content/blogs")
  const files = fs.readdirSync(dir)
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf-8")
    return JSON.parse(raw)
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogIndexPage() {
  const blogs = getAllBlogs()

  return (
    <main className="blog-index">
      {/* Hero */}
      <section className="blog-index__hero">
        <div className="section-inner">
          <div className="section-eyebrow">
            <div className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Expert Insights</span>
          </div>
          <h1 className="section-heading">
            Nagpur Real Estate <em>Blog</em>
          </h1>
          <p className="section-sub">
            Investment tips, legal guides, area insights and market updates for property buyers in Nagpur.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-inner">
        <div className="blog-index__grid">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="blog-card">
              <div className="blog-card__img-wrap">
                <img src={blog.image} alt={blog.title} loading="lazy" className="blog-card__img" />
                <span className="news-cat blog-card__cat">{blog.category}</span>
              </div>
              <div className="blog-card__body">
                <p className="blog-card__meta">{blog.date} · {blog.readTime} read</p>
                <h2 className="blog-card__title">{blog.title}</h2>
                <p className="blog-card__excerpt">
                  {blog.content.find((c: any) => c.type === "intro")?.text?.slice(0, 130)}...
                </p>
                <span className="blog-card__cta">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Ready to buy a plot in Nagpur?</p>
          <div className="trust-bar__items">
            <Link href="/#contact" className="trust-bar__item" style={{ color: "var(--gold)", fontWeight: 700 }}>
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
