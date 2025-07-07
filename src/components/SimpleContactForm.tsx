import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const SimpleContactForm = () => {
  return (
    <Card>
      <CardContent className="p-32">
        <h3 className="mb-24">Send Me a Message</h3>
        <form 
          action="https://formspree.io/f/YOUR_FORM_ID" 
          method="POST"
          className="space-y-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <label className="block text-sm font-medium mb-8">First Name</label>
              <Input 
                name="firstName"
                placeholder="Your first name" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-8">Last Name</label>
              <Input 
                name="lastName"
                placeholder="Your last name" 
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Email</label>
            <Input 
              type="email" 
              name="email"
              placeholder="your.email@example.com" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Phone (Optional)</label>
            <Input 
              type="tel" 
              name="phone"
              placeholder="Your phone number" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">I'm Interested In</label>
            <select 
              name="interest"
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a service</option>
              <option value="parent-coaching">Parent Coaching</option>
              <option value="teen-coaching">Individual Coaching for Teens</option>
              <option value="family-consulting">Family Consulting</option>
              <option value="adult-coaching">Adult ADHD Coaching</option>
              <option value="teacher-training">Teacher Training</option>
              <option value="presentations">Parent Group Presentations</option>
              <option value="office-hours">Professional Office Hours</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Subject</label>
            <Input 
              name="subject"
              placeholder="Brief subject line" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Message</label>
            <Textarea 
              name="message"
              placeholder="Tell me a bit about your situation and how I might be able to help..."
              rows={5}
              required
            />
          </div>
          
          <Button type="submit" className="btn-primary w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SimpleContactForm;