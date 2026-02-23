import { Search, Menu } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ onLoginClick, onRegisterClick, onSearchChange, activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600">ISSN: 2456-7890</span>
            <span className="text-sm text-gray-600">|</span>
            <span className="text-sm text-gray-600">Volume 28, Issue 1, 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onLoginClick}>
              Login
            </Button>
            <Button variant="ghost" size="sm" onClick={onRegisterClick}>
              Register
            </Button>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Journal of Contemporary Scientific Research & Analysis
              </h1>
              <p className="text-sm text-gray-600">An International Peer-Reviewed Research Journal</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 border rounded-md w-64 text-sm"
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t">
          <ul className="flex items-center gap-1">
            <li>
              <button
                onClick={() => onTabChange('home')}
                className={`px-4 py-3 inline-block text-sm font-medium ${
                  activeTab === 'home' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('current')}
                className={`px-4 py-3 inline-block text-sm font-medium ${
                  activeTab === 'current' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                Current Issues
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('archive')}
                className={`px-4 py-3 inline-block text-sm font-medium ${
                  activeTab === 'archive' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                Archive
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('editorial')}
                className={`px-4 py-3 inline-block text-sm font-medium ${
                  activeTab === 'editorial' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                Editorial Board
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('submission')}
                className={`px-4 py-3 inline-block text-sm font-medium ${
                  activeTab === 'submission' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                Submission Guidelines
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('contact')}
                className={`px-4 py-3 inline-block text-sm font-medium ${
                  activeTab === 'contact' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}