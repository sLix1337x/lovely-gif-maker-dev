
import React from 'react';
import MainNav from '@/components/MainNav';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <MainNav />
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">About GIFConvert</h1>
          
          <div className="space-y-6 text-gray-300">
            <p>
              GIFConvert was created in 2025 by sLix1337 as a simple, effective solution for converting videos to GIFs without requiring any upload to external servers.
            </p>
            
            <p>
              Our mission is to provide a completely free, privacy-focused tool that makes GIF creation accessible to everyone. We believe that creating GIFs should be easy, fast, and not compromise your privacy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-100">How It Works</h2>
            
            <p>
              GIFConvert uses modern web technologies to process your videos directly in your browser. Your files never leave your device, ensuring complete privacy and security.
            </p>
            
            <p>
              The application uses HTML5 Canvas and JavaScript to extract frames from your video and then compile them into a GIF format that you can download instantly.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-100">Our Values</h2>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Privacy-first: Your files never leave your device</li>
              <li>Simplicity: Easy to use with no technical knowledge required</li>
              <li>Free forever: No hidden costs, subscriptions, or annoying ads</li>
              <li>Quality: Produce high-quality GIFs with customizable settings</li>
            </ul>
            
            <div className="mt-10 pt-6 border-t border-gray-700">
              <p>
                Have questions or suggestions? We'd love to hear from you! Visit our <Link to="/contact" className="text-blue-400 hover:underline">Contact page</Link> or check out our <Link to="/features" className="text-blue-400 hover:underline">Features</Link> to learn more about what GIFConvert can do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
