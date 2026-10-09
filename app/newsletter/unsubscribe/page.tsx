import type { Metadata } from 'next';
import NewsletterUnsubscribe from '@/components/NewsletterUnsubscribe';

export const metadata: Metadata = {
  title: 'Unsubscribe from the newsletter',
  robots: { index: false, follow: false },
};

export default async function NewsletterUnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <section className="container" style={{ maxWidth: 680, paddingTop: 72, paddingBottom: 72 }}>
      <p className="eyebrow-text">THE HEDGE FRONT / EMAIL PREFERENCES</p>
      <h1 className="page-title">Unsubscribe from the newsletter</h1>
      <p style={{ marginTop: 12, color: 'var(--ink-secondary)' }}>
        Confirm below to stop receiving the weekly market briefing.
      </p>
      <NewsletterUnsubscribe token={token ?? ''} />
    </section>
  );
}
