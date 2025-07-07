// Cloudflare Worker for handling contact form submissions
export default {
  async fetch(request, env, ctx) {
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

    // Send email using Cloudflare Email Workers
    try {
      await env.EMAIL.send({
        from: `noreply@mindfulbalanceadhdcoaching.com`,
        to: env.CONTACT_EMAIL || 'cindy@cindyromanzo.com',
        subject: `Contact Form: ${subject}`,
        text: emailContent,
        headers: {
          'Reply-To': email,
        },
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Still return success to user but log the error
      // You could also store in D1 database as backup
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Form submitted successfully. We will get back to you soon!' 
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

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