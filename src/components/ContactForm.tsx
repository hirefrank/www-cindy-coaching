import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContactForm = () => {
  return (
    <Card>
      <CardContent className="p-32">
        <h3 className="mb-24">Send Me a Message</h3>
        <form className="space-y-24" data-static-form-name="contact">
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
              name="email"
              type="email" 
              placeholder="your.email@example.com" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Phone (Optional)</label>
            <Input 
              name="phone"
              type="tel" 
              placeholder="Your phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Interest</label>
            <select 
              name="interest"
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select your interest</option>
              <option value="Individual Coaching">Individual Coaching</option>
              <option value="Parent Coaching">Parent Coaching</option>
              <option value="Consultation">Consultation</option>
              <option value="Workshop">Workshop</option>
              <option value="Other">Other</option>
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
              placeholder="Tell me about your situation and how I can help..."
              className="min-h-[120px]"
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;