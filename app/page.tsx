import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogs, newsItems } from '@/lib/data';

export const metadata: Metadata = {
  title: 'DerivionAcademy.in - The Hedge Front & Quantitative Intelligence',
  description: 'The authoritative digital chronicle and research bureau providing institutional analysis, quantitative derivative intelligence, and sovereign market reports.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function HomePage() {
  const featuredNews = newsItems[0];
  const secondaryNews = newsItems.slice(1, 4);
  const latestBlogs = blogs.slice(0, 3);
  const secondaryNewsImages = [
    '/images/news/30th-news-1.png',
    '/images/news/30th-news-2.png',
    '/images/news/29th-news.png',
  ];
  const blogImages = [
    '/images/blogs/blog-image.png',
    '/images/blogs/onshore-vs-offshore.png',
    '/images/news/28th-blog-1.png',
  ];

  return (
    <div className="home-editorial">
      <div className="home-container">
        <header className="home-intro">
          <div>
            <p className="home-eyebrow">THE HEDGE FRONT / GLOBAL MARKETS</p>
            <h1>Latest News</h1>
          </div>
          <p className="home-intro-note">
            Daily market briefings and recurring perspectives from the Derivion research desk.
          </p>
        </header>

        {featuredNews && (
          <section aria-label="Featured news" className="home-feature">
            <Link href={`/news/${featuredNews.slug}`} className="home-feature-media">
              <Image
                src={featuredNews.coverImage ?? '/images/news/2nd-oct.png'}
                alt={featuredNews.coverImage ? `${featuredNews.title} cover image` : 'Bank economist estimates for September nonfarm payrolls'}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 58vw"
                className="home-feature-image"
              />
              <span className="home-image-caption">Daily market briefing</span>
            </Link>
            <div className="home-feature-copy">
              <div className="home-meta-line">
                <span className="home-category">{featuredNews.category}</span>
                <span>{featuredNews.date}</span>
              </div>
              <h2>{featuredNews.title}</h2>
              <p className="home-feature-excerpt">{featuredNews.excerpt}</p>
              <div className="home-feature-byline">
                <span className="home-byline-mark">HF</span>
                <span>{featuredNews.author.name}</span>
              </div>
              <Link href={`/news/${featuredNews.slug}`} className="home-read-link">
                Read the briefing <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </section>
        )}

        <section aria-labelledby="home-dispatches-title" className="home-dispatches">
          <div className="home-section-heading home-dispatches-heading">
            <div>
              <p className="home-eyebrow">UPDATED DAILY</p>
              <h2 id="home-dispatches-title">The latest dispatches</h2>
            </div>
            <Link href="/news" className="home-section-link">All news <span aria-hidden="true">&#8594;</span></Link>
          </div>
          <div className="home-dispatch-grid">
            {secondaryNews.map((item, index) => (
              <Link href={`/news/${item.slug}`} className="home-dispatch" key={item.id}>
                <div className="home-dispatch-image">
                  <Image
                    src={item.coverImage ?? secondaryNewsImages[index]}
                    alt={item.coverImage ? `${item.title} cover image` : ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                    className="home-card-image"
                  />
                </div>
                <div className="home-dispatch-copy">
                  <div className="home-meta-line">
                    <span className="home-category">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="home-columns-title" className="home-columns">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">RECURRING DESK NOTES</p>
              <h2 id="home-columns-title">Columns &amp; analysis</h2>
            </div>
            <Link href="/blogs" className="home-section-link">All columns <span aria-hidden="true">&#8594;</span></Link>
          </div>
          <div className="home-column-grid">
            {latestBlogs.map((blog, index) => (
              <Link href={`/blogs/${blog.slug}`} className="home-column" key={blog.id}>
                <div className="home-column-image">
                  <Image
                    src={blogImages[index]}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                    className="home-card-image"
                  />
                  <span className="home-column-frequency">{blog.frequency}</span>
                </div>
                <div className="home-column-copy">
                  <div className="home-meta-line">
                    <span className="home-category">{blog.tags[0]}</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>
                  <span className="home-column-author">By {blog.author.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <nav aria-label="More from Derivion" className="home-more-sections">
          <span className="home-more-label">Explore the journal</span>
          <Link href="/magazine">The Magazine</Link>
          <Link href="/articles">Longform Articles</Link>
          <Link href="/special-reports">Special Reports</Link>
        </nav>
      </div>
    </div>
  );
}
