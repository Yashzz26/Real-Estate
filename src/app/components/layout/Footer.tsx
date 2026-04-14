import { Link } from "react-router";
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl text-white tracking-tight">Luxe-estate</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner in finding the perfect home. We connect you with premium properties and verified agents.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-amber-500 transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/listings?type=apartment" className="hover:text-amber-500 transition-colors">Apartments</Link></li>
              <li><Link to="/listings?type=villa" className="hover:text-amber-500 transition-colors">Villas</Link></li>
              <li><Link to="/listings?type=house" className="hover:text-amber-500 transition-colors">Houses</Link></li>
              <li><Link to="/listings?type=commercial" className="hover:text-amber-500 transition-colors">Commercial</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">123 Estate Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm">contact@luxe-estate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 Luxe-estate. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
