'use client';

import { FormEvent, useId, useState } from 'react';

type SubscribeResponse = {
  message?: string;
};

export default function NewsletterSignup({ variant = 'default' }: { variant?: 'default' | 'navbar' }) {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL?.replace(/\/+$/, '') ?? '';

    try {
      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as SubscribeResponse;

      if (!response.ok) {
        throw new Error(result.message || 'We could not complete your subscription. Please try again.');
      }

      setEmail('');
      setStatus('success');
      setMessage(result.message || 'You are subscribed. Watch for our weekly newsletter.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not complete your subscription. Please try again.');
    }
  }

  return (
    <div className={`da-newsletter${variant === 'navbar' ? ' da-newsletter--navbar' : ''}`}>
      <form className="da-newsletter__form" onSubmit={handleSubmit}>
        <label className="da-newsletter__label" htmlFor={inputId}>Email address</label>
        <div className="da-newsletter__controls">
          <input
            id={inputId}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@example.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === 'submitting'}
          />
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </div>
      </form>
      <p className={`da-newsletter__message da-newsletter__message--${status}`} aria-live="polite">
        {message || 'Subscribe for the weekly briefing. Unsubscribe at any time.'}
      </p>

      <style jsx>{`
        .da-newsletter {
          width: min(100%, 460px);
        }

        .da-newsletter__label {
          display: block;
          margin-bottom: 6px;
          color: var(--ink-secondary);
          font-size: 11px;
          font-weight: 600;
        }

        .da-newsletter__controls {
          display: flex;
          gap: 8px;
        }

        .da-newsletter__controls input {
          width: 100%;
          min-width: 0;
          height: 42px;
          padding: 0 12px;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          background: #fff;
          color: var(--ink-black);
          font-size: 13px;
        }

        .da-newsletter__controls input:focus {
          outline: 2px solid var(--ochre);
          outline-offset: 1px;
        }

        .da-newsletter__controls button {
          flex: 0 0 auto;
          min-width: 112px;
          padding: 0 16px;
          border-radius: var(--radius-sm);
          background: var(--ochre);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          transition: background 0.15s ease;
        }

        .da-newsletter__controls button:hover:not(:disabled) {
          background: var(--ochre-dark);
        }

        .da-newsletter__controls button:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .da-newsletter__message {
          min-height: 18px;
          margin-top: 7px;
          color: var(--ink-muted);
          font-size: 10px;
        }

        .da-newsletter__message--success {
          color: #166534;
        }

        .da-newsletter__message--error {
          color: #b91c1c;
        }

        .da-newsletter--navbar {
          width: 250px;
          flex: 0 0 250px;
        }

        .da-newsletter--navbar .da-newsletter__label,
        .da-newsletter--navbar .da-newsletter__message {
          display: none;
        }

        .da-newsletter--navbar .da-newsletter__controls {
          gap: 5px;
        }

        .da-newsletter--navbar .da-newsletter__controls input {
          height: 36px;
          padding: 0 9px;
          font-size: 11px;
        }

        .da-newsletter--navbar .da-newsletter__controls button {
          min-width: 84px;
          padding: 0 10px;
          font-size: 11px;
        }

        .da-newsletter--navbar .da-newsletter__message--success,
        .da-newsletter--navbar .da-newsletter__message--error {
          display: block;
          position: absolute;
          z-index: 110;
          margin-top: 6px;
          padding: 5px 8px;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          background: #fff;
          box-shadow: var(--shadow-card);
          font-size: 10px;
        }

        @media (max-width: 420px) {
          .da-newsletter__controls {
            flex-direction: column;
          }

          .da-newsletter__controls button {
            height: 42px;
          }
        }
      `}</style>
    </div>
  );
}
