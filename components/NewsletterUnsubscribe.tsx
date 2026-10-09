'use client';

import { useState } from 'react';

type UnsubscribeResponse = {
  message?: string;
};

export default function NewsletterUnsubscribe({ token }: { token: string }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  async function unsubscribe() {
    const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';
    if (!token) {
      setMessage('This unsubscribe link is invalid.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`${apiUrl}/api/newsletter/unsubscribe/${encodeURIComponent(token)}`);

      if (!response.ok) {
        throw new Error('We could not update your email preferences. Please try again.');
      }

      const result: UnsubscribeResponse = { message: 'You have been unsubscribed from the weekly newsletter.' };
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
      {!isComplete && (
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
          {isSubmitting ? 'Updating preferences…' : 'Confirm unsubscribe'}
        </button>
      )}
      {message && <p role="status" style={{ marginTop: 12, color: 'var(--ink-secondary)' }}>{message}</p>}
    </div>
  );
}
