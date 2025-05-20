import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amoled-gray-900 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4 text-amoled-accent-primary">LocalSaver.in</h4>
            <p className="text-amoled-gray-200 mb-4">Helping you find the best grocery deals in your neighborhood.</p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-amoled-gray-800 rounded-full hover:bg-amoled-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-amoled-gray-800 rounded-full hover:bg-amoled-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-amoled-gray-800 rounded-full hover:bg-amoled-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Quick Links</h5>
            <ul className="space-y-2 text-amoled-gray-200">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/smart-basket" className="hover:text-white transition-colors">Smart Basket</Link></li>
              <li><Link to="/compare/popular" className="hover:text-white transition-colors">Price Trends</Link></li>
              <li><Link to="/vendor" className="hover:text-white transition-colors">For Vendors</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Support</h5>
            <ul className="space-y-2 text-amoled-gray-200">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium mb-4">Download App</h5>
            <p className="text-amoled-gray-200 mb-3">Coming soon to Android and iOS</p>
            <div className="flex items-center space-x-2 text-amoled-accent-secondary">
              <Smartphone className="h-5 w-5" />
              <span>Get notified when our app launches</span>
            </div>
            <div className="mt-4">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input w-full mb-2" 
              />
              <button className="btn btn-secondary w-full">Notify Me</button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-amoled-gray-700 text-center text-amoled-gray-300 text-sm">
          <p>© {new Date().getFullYear()} LocalSaver.in - All rights reserved.</p>
          <p className="mt-2">Prices and product information are provided by third parties and are subject to change without notice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;