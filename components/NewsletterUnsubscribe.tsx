'use client';

import { useState } from 'react';

type UnsubscribeResponse = {
  message?: string;
};

export default function NewsletterUnsubscribe({ token }: { token: string }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  async function unsubscribe() {
    const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';
    if (!token) {
      setMessage('This unsubscribe link is invalid.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`${apiUrl}/api/newsletter/unsubscribe/${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmed: true }),
      });

      if (!response.ok) {
        throw new Error('We could not update your email preferences. Please try again.');
      }

      const result: UnsubscribeResponse = {
        message: 'Your email address has been removed. You will no longer receive the weekly newsletter.',
      };
      setIsComplete(true);
      setMessage(result.message || 'You have been unsubscribed from the weekly newsletter.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'We could not update your email preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ marginTop: 24 }}>
      {!isComplete && !isCancelled && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={unsubscribe}
            disabled={isSubmitting}
            style={{
              borderRadius: 8,
              background: 'var(--ochre)',
              color: '#fff',
              padding: '12px 18px',
              fontWeight: 700,
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Removing your email…' : 'Yes, unsubscribe me'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsCancelled(true);
              setMessage('No changes were made. You will continue receiving the weekly newsletter.');
            }}
            disabled={isSubmitting}
            style={{
              borderRadius: 8,
              background: 'transparent',
              color: 'var(--ink-secondary)',
              padding: '12px 18px',
              fontWeight: 700,
              border: '1px solid var(--border-light)',
            }}
          >
            No, keep me subscribed
          </button>
        </div>
      )}
      {message && <p role="status" style={{ marginTop: 12, color: 'var(--ink-secondary)' }}>{message}</p>}
    </div>
  );
}
