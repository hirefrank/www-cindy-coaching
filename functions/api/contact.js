// Contact form handler for Cloudflare Pages
import { EmailMessage } from "cloudflare:email";

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Handle CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

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
          headers: corsHeaders,
        }
      );
    }

    // Log the submission
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
      if (env.CONTACT_EMAIL) {
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
            "contact@mindfulbalanceadhdcoaching.com",
            recipient,
            `Subject: New Contact Form: ${subject}\r\n\r\n${emailContent}`
          );

          await env.CONTACT_EMAIL.send(emailMessage);
        }
        
        console.log('✅ Emails sent successfully to both recipients');
      } else {
        console.log('⚠️ Email binding not configured - form submission logged only');
      }
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
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}