import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";
import { EmailMessage } from "cloudflare:email";

export const onRequest = staticFormsPlugin({
  respondWith: async ({ formData, name, env }) => {
    // Extract form data
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const interest = formData.get("interest");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Log the submission
    console.log('📧 Contact form received:', {
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || 'Not provided',
      interest: interest || 'Not specified',
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
Phone: ${phone || 'Not provided'}
Interest: ${interest || 'Not specified'}
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
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
});