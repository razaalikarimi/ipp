import { Card } from './ui/card';

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Current Issue Info */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Current Issue</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Volume:</span> 28
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Issue:</span> 1
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Year:</span> 2026
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Published:</span> February 2026
          </p>
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Submit Article
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Author Guidelines
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Peer Review Process
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Publication Ethics
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Open Access Policy
            </a>
          </li>
        </ul>
      </Card>

      {/* Indexing */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Indexed In</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Google Scholar</li>
          <li>• Scopus</li>
          <li>• Web of Science</li>
          <li>• DOAJ</li>
          <li>• PubMed Central</li>
          <li>• CrossRef</li>
        </ul>
      </Card>

      {/* Impact Factor */}
      <Card className="p-4 bg-blue-50">
        <h3 className="font-semibold mb-2">Impact Factor</h3>
        <p className="text-3xl font-bold text-blue-600">3.245</p>
        <p className="text-xs text-gray-600 mt-1">2025 Impact Factor</p>
      </Card>

      {/* Stats */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Journal Statistics</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Articles Published</span>
            <span className="font-medium">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Acceptance Rate</span>
            <span className="font-medium">32%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg Review Time</span>
            <span className="font-medium">45 days</span>
          </div>
        </div>
      </Card>
    </aside>
  );
}
