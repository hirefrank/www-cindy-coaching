// Cloudflare Worker for handling contact form submissions
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle contact form API endpoint
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContactForm(request, env);
    }
    
    // For all other requests, serve static assets
    return env.ASSETS.fetch(request);
  },
};

async function handleContactForm(request, env) {
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

    // Create email content
    const emailContent = `
New Contact Form Submission from ${env.CONTACT_EMAIL || 'mindfulbalanceadhdcoaching.com'}

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${formData.phone || 'Not provided'}
Interest: ${formData.interest || 'Not specified'}
Subject: ${subject}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
IP Address: ${request.headers.get('CF-Connecting-IP') || 'Unknown'}
    `;

    // Log the form submission (visible in Cloudflare dashboard logs)
    console.log('📧 Contact form submission received:', {
      name: `${firstName} ${lastName}`,
      email,
      phone: formData.phone || 'Not provided',
      interest: formData.interest || 'Not specified', 
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('CF-Connecting-IP') || 'Unknown'
    });

    // TODO: Add email sending once deployment is stable
    // For now, submissions are logged to Cloudflare dashboard

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully!' 
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

// Handle preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}