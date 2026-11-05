import { ImageResponse } from 'next/og';
import { blogs } from '@/lib/data';
import { PUBLISHER_NAME, SITE_NAME } from '@/lib/site';

// Blog posts have no cover images, so each post gets a generated title card for social shares.
export const alt = `${SITE_NAME} blog post`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return blogs.map(blog => ({ slug: blog.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find(item => item.slug === slug);
  const title = blog?.title ?? SITE_NAME;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0f172a',
          color: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: '#eab308', fontWeight: 700 }}>
          {(blog?.columnName ?? 'BLOG').toUpperCase()}
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 70 ? 54 : 64, fontWeight: 800, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#94a3b8' }}>
          <span>{SITE_NAME}</span>
          <span>{blog?.date ?? ''} · {PUBLISHER_NAME}</span>
        </div>
      </div>
    ),
    size,
  );
}
