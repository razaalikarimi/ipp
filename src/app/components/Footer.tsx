import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="size-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">IJASCA</h3>
            </div>
            <p className="text-sm mb-4">
              International Journal of Applied Sciences & Computer Applications is a peer-reviewed, 
              open access journal that publishes original research articles in all areas of applied 
              sciences and computer applications.
            </p>
            <p className="text-sm">
              <strong className="text-white">ISSN:</strong> 2091-2609 (Online)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Journal
                </Link>
              </li>
              <li>
                <Link to="/editorial-board" className="hover:text-blue-400 transition-colors">
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-blue-400 transition-colors">
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link to="/archives" className="hover:text-blue-400 transition-colors">
                  Archives
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="size-5 mt-0.5 flex-shrink-0 text-blue-400" />
                <span className="text-sm">
                  Al-Zarqa University<br />
                  Zarqa, Jordan
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-5 flex-shrink-0 text-blue-400" />
                <span className="text-sm">ijasca@zuj.edu.jo</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-5 flex-shrink-0 text-blue-400" />
                <span className="text-sm">+962 5 382 6666</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} International Journal of Applied Sciences & Computer Applications. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
