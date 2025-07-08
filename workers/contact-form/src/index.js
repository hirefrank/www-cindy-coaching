// Contact form worker for Cindy Coaching
import { EmailMessage } from "cloudflare:email";

export default {
  async fetch(request, env) {
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

    // Only handle POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Handle both /api/contact (when routed) and / (when accessed directly)
    const url = new URL(request.url);
    if (url.pathname === '/api/contact' || url.pathname === '/') {
      return handleContactForm(request, env);
    }

    return new Response('Not found', { status: 404 });
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

    // Send email notification
    try {
      const emailContent = `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${formData.phone || 'Not provided'}
Interest: ${formData.interest || 'Not specified'}
Subject: ${subject}

Message:
${message}

Submitted: ${new Date().toISOString()}
      `.trim();

      const recipients = ["cindy@mindfulbalanceadhdcoaching.com", "fcharris@gmail.com"];
      
      // Send email to both recipients
      for (const recipient of recipients) {
        const emailMessage = new EmailMessage(
          "contact@mindfulbalanceadhdcoaching.com", // sender (must be from your domain)
          recipient,
          `Subject: New Contact Form: ${subject}\r\n\r\n${emailContent}`
        );

        await env.CONTACT_EMAIL.send(emailMessage);
      }
      
      console.log('✅ Emails sent successfully to both recipients');
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError);
      // Continue anyway - form submission still logged
    }
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
