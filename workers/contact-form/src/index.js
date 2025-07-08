// Contact form worker for Cindy Coaching
export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only handle POST requests to /api/contact
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    return handleContactForm(request);
  },
};

async function handleContactForm(request) {
  try {
    // Parse the form data
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
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Log the submission (visible in Cloudflare dashboard)
    console.log('📧 Contact form received:', {
      name: `${firstName} ${lastName}`,
      email,
      phone: formData.phone || 'Not provided',
      interest: formData.interest || 'Not specified', 
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // For now, just return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message received! Thank you for contacting us.' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
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
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
