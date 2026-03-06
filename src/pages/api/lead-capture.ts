import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { turnstileToken, honeypot, formLoadedAt, ...leadData } = body;

    // Honeypot check — bots fill this hidden field
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Time gate — reject submissions faster than 3 seconds
    const elapsed = Date.now() - (formLoadedAt || 0);
    if (elapsed < 3000) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Turnstile verification
    const secret = import.meta.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      console.error('TURNSTILE_SECRET_KEY not configured');
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: turnstileToken || '',
        remoteip: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '',
      }),
    });

    const turnstileResult = await turnstileRes.json();

    if (!turnstileResult.success) {
      console.warn('Turnstile verification failed:', turnstileResult['error-codes']);
      return new Response(JSON.stringify({ error: 'Verification failed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Forward to GHL webhook
    const webhookUrl = import.meta.env.GHL_LEAD_WEBHOOK;
    if (!webhookUrl) {
      console.error('GHL_LEAD_WEBHOOK not configured');
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ghlRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });

    if (!ghlRes.ok) {
      throw new Error(`GHL webhook returned ${ghlRes.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Lead capture error:', err.message);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
