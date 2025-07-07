import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, subject, message } = formData;
    
    if (!firstName || !lastName || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Store in Cloudflare D1 database and/or send via Worker
    // For now, we'll use a Worker endpoint
    const workerResponse = await fetch('https://contact-form-worker.your-subdomain.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.WORKER_API_KEY || '',
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        phone: formData.phone || '',
        interest: formData.interest || '',
        subject,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!workerResponse.ok) {
      throw new Error('Failed to process form submission');
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};