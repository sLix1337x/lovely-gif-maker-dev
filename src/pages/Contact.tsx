
import React, { useState } from 'react';
import MainNav from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-dark">
      <MainNav />
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Contact Us</h1>
          
          <div className="mb-8 text-gray-300">
            <p>Have questions, feedback, or suggestions? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="bg-gray-800/50 border-gray-700 text-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="bg-gray-800/50 border-gray-700 text-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-200">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Enter your message"
                className="min-h-[150px] bg-gray-800/50 border-gray-700 text-gray-200"
              />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 button-glow">
              Send Message
            </Button>
          </form>
          
          <div className="mt-10 text-center text-gray-400">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Other Ways to Reach Us</h3>
            <p>Email: contact@gifconvert.example.com</p>
            <p>Twitter: @GIFConvert</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
