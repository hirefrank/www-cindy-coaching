# Cal.com Setup Guide for Mindful Balance ADHD Coaching

## Overview

Your website uses Cal.com for scheduling consultations and office hours. This guide will help you set up and manage your Cal.com account.

## Initial Setup

### 1. Create Your Cal.com Account

1. Go to [Cal.com](https://cal.com)
2. Click "Get Started" or "Sign up"
3. Sign up using your Google account
4. Choose the **Free** plan to start (you can upgrade later if needed, but you shouldn't need any features of the paid plan)

### 2. Complete Your Profile (illustrative example)
This is where you will set up your profile and add your availability.

1. Navigate to Settings → Profile
2. Fill in:
   - **Name**: Cindy Romanzo
   - **Bio**: ICF Certified ADHD Coach specializing in brain-body strategies
   - **Timezone**: America/New_York (Eastern Time)
3. Upload a professional photo (use your headshot)
4. Click "Save"

### 3. Set Your Availability (illustrative example)
This is where you will set up your availability.

1. Go to "Availability" in the sidebar
2. Set your default schedule:
   ```
   Monday - Friday: 9:00 AM - 5:00 PM EST
   Saturday - Sunday: Unavailable
   ```
3. Add buffer time between meetings:
   - Before event: 15 minutes
   - After event: 15 minutes
4. Set minimum notice: 24 hours

## Creating Event Types

Your website references two specific event types. Create them exactly as shown:

### Event Type 1: Free Consultation

1. Click "Event Types" → "New Event Type"
2. Configure as follows:

**Basic Information:**
- **Title**: Free Consultation
- **URL**: `mindfulbalance/consultation`
- **Duration**: 15 minutes
- **Description**:
  ```
  A complimentary 15-minute discovery call to discuss your ADHD coaching needs
  and how I can support your journey. We'll explore your challenges and goals
  to determine if we're a good fit to work together.
  ```

**Location:**
- Select: Phone call
- You can also add Zoom if you prefer video calls

**Additional Settings:**
- Enable confirmation emails
- Add reminder email: 1 hour before
- Add calendar reminder: 15 minutes before

### Event Type 2: Office Hours

1. Create another event type
2. Configure as follows:

**Basic Information:**
- **Title**: Office Hours
- **URL**: `mindfulbalance/office-hours`
- **Duration**: 30 minutes
- **Description**:
  ```
  Quick check-ins for existing clients or follow-up questions.
  Perfect for addressing specific challenges or getting unstuck.
  ```

**Scheduling Settings:**
- Limit: 4 bookings per day
- Buffer time: 15 minutes before and after

## Customizing Your Booking Page

### Brand Settings

1. Go to Settings → Appearance
2. Set your brand color: `#2563eb` (matches your website blue)
3. Upload logo if you have one
4. Choose light theme

### Booking Questions

For each event type, add screening questions:

1. Edit the event type
2. Go to "Booking questions"
3. Add these fields:

**For Consultation:**
- What brings you to seek ADHD coaching? (Required, Long text)
- Are you seeking support for yourself or your child? (Required, Radio buttons: Self/Child/Both)
- What's your biggest challenge right now? (Required, Short text)

**For Office Hours:**
- What would you like to discuss? (Required, Long text)
- Any specific materials to review beforehand? (Optional, Short text)

## Integrations

### 1. Calendar Sync

**Connect your calendar to avoid double bookings:**

1. Go to Settings → Calendars
2. Click "Connect a calendar"
3. Choose your calendar provider (Google Calendar recommended)
4. Authorize access
5. Select which calendar to:
   - Check for conflicts (your main calendar)
   - Add events to (can be same or separate coaching calendar)

### 2. Email Notifications

Customize email templates:

1. Go to Workflows → Email Workflows
2. Edit the confirmation email to include:
   - What to expect in the call
   - Your Zoom/phone details
   - Preparation suggestions
   - Link to your website

Example confirmation email:
```
Hi {{attendee.name}},

Thank you for scheduling a consultation with me! I'm looking forward to our conversation.

Our {{event.title}} is confirmed for:
📅 {{event.date}}
🕐 {{event.time}} ({{event.timezone}})
📞 {{event.location}}

To make the most of our time together, please:
- Think about your top 3 challenges
- Have any questions ready
- Be in a quiet space for our call

If you need to reschedule, you can do so using the link in this email.

Looking forward to speaking with you!

Best,
Cindy Romanzo
ICF Certified ADHD Coach
mindfulbalanceadhdcoaching.com
```

### 3. Zoom Integration (Optional)

If you prefer video calls:

1. Go to Apps → Zoom
2. Click "Install"
3. Connect your Zoom account
4. Set as default for video calls

## Managing Bookings

### Daily Workflow

1. **Check your dashboard daily** for new bookings
2. **Review booking details** before each call
3. **Take notes** during calls (Cal.com has a notes feature)

### Handling Cancellations

1. Set cancellation policy in event settings
2. Minimum notice: 24 hours
3. Enable rescheduling options
4. Be flexible for emergencies

### Block Time Off

For vacations or busy periods:

1. Go to Availability → Date Overrides
2. Click "Add date override"
3. Select dates you're unavailable
4. Add reason (shown to you only)

## Website Integration

Your website is already set up to use Cal.com. The buttons work as follows:

- **"Schedule Consultation"** → Opens your consultation booking
- **"Schedule Office Hours"** → Opens your office hours booking

No changes needed on your website - just ensure your Cal.com event URLs match:
- `mindfulbalance/consultation`
- `mindfulbalance/office-hours`

## Best Practices

### 1. **Respond Promptly**
- Check for new bookings daily
- Send welcome emails for first-time clients
- Follow up after consultations

### 2. **Keep Your Calendar Updated**
- Block out personal time immediately
- Update availability for holidays
- Sync all your calendars

### 3. **Prepare for Calls**
- Review booking questions before each call
- Have your coaching materials ready
- Test your phone/video connection

### 4. **After Each Call**
- Take notes in Cal.com
- Send follow-up email if promised
- Update your CRM/notes system

## Troubleshooting

**Client can't book:**
- Check your availability settings
- Ensure minimum notice isn't too restrictive
- Verify calendar sync is working

**Double bookings:**
- Check all calendars are synced
- Ensure buffer time is set
- Verify timezone settings

**Not receiving notifications:**
- Check email settings in Cal.com
- Verify email isn't going to spam
- Test with a friend booking

## Upgrading Your Plan

Consider upgrading to Cal.com Pro ($12/month) if you need:
- Multiple calendars/availability schedules
- Team features (if you add associates)
- Advanced customization
- Priority support
- Remove Cal.com branding

## Support

- **Cal.com Help**: help.cal.com
- **Video Tutorials**: YouTube search "Cal.com tutorial"
- **Community**: Cal.com Slack community

## Your Cal.com Checklist

- [ ] Create account with professional email
- [ ] Complete profile with photo and bio
- [ ] Set default availability (Mon-Fri 9-5)
- [ ] Create "Free Consultation" event (15 min)
- [ ] Create "Office Hours" event (30 min)
- [ ] Set brand colors to match website
- [ ] Add booking questions to both events
- [ ] Connect and sync your calendar
- [ ] Customize email notifications
- [ ] Test booking flow with a friend
- [ ] Block out any upcoming unavailable dates

Once complete, your scheduling will be fully automated and professional!