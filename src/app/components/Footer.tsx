import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  onTabChange?: (tab: string) => void;
}

export function Footer({ onTabChange }: FooterProps) {
  const handleLinkClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-white mb-3">About the Journal</h3>
            <p className="text-sm leading-relaxed">
              Journal of Contemporary Scientific Research & Analysis is a peer-reviewed, open-access journal dedicated to publishing high-quality research across all scientific disciplines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-white text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('editorial')} className="hover:text-white text-left">
                  Editorial Board
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('submission')} className="hover:text-white text-left">
                  Author Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('submission')} className="hover:text-white text-left">
                  Peer Review
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-white text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleLinkClick('submission')} className="hover:text-white text-left">
                  Submit Manuscript
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('archive')} className="hover:text-white text-left">
                  Archive
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('current')} className="hover:text-white text-left">
                  Citations
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('submission')} className="hover:text-white text-left">
                  Article Processing Charges
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-white text-left">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-3">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Ram Nagar, Mukundwadi, Chhatrapati Sambhajinagar, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:editor@jcsra.com" className="hover:text-white">editor@jcsra.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 8855063215 / +91 8855664420</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white" onClick={(e) => e.preventDefault()}>
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2026 Journal of Contemporary Scientific Research & Analysis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}