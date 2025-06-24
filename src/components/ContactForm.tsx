import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceOption {
  value: string;
  label: string;
}

interface ContactFormProps {
  serviceOptions?: ServiceOption[];
}

const ContactForm = ({ serviceOptions = [] }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardContent className="p-32">
        <h3 className="mb-24">Send Me a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <label className="block text-sm font-medium mb-8">First Name</label>
              <Input 
                placeholder="Your first name" 
                value={formData.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-8">Last Name</label>
              <Input 
                placeholder="Your last name" 
                value={formData.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('lastName', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Email</label>
            <Input 
              type="email" 
              placeholder="your.email@example.com" 
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Phone (Optional)</label>
            <Input 
              type="tel" 
              placeholder="Your phone number" 
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">I'm Interested In</label>
            <Select 
              value={formData.interest} 
              onValueChange={(value: string) => handleChange('interest', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.length > 0 ? (
                  serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    <SelectItem value="parent-coaching">Parent Coaching</SelectItem>
                    <SelectItem value="teen-coaching">Teen Coaching</SelectItem>
                    <SelectItem value="family-consulting">Family Consulting</SelectItem>
                    <SelectItem value="school-support">School Support</SelectItem>
                    <SelectItem value="workshops">Workshops & Training</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Subject</label>
            <Input 
              placeholder="Brief subject line" 
              value={formData.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('subject', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-8">Message</label>
            <Textarea 
              placeholder="Tell me a bit about your situation and how I might be able to help..."
              rows={5}
              value={formData.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('message', e.target.value)}
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

export default ContactForm;