import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Users, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function HomePage() {
  const currentIssueArticles = [
    {
      title: 'Machine Learning Approaches for Network Security',
      authors: 'Ahmed Al-Rashid, Sarah Johnson, Michael Chen',
      pages: '1-15',
      doi: '10.1234/ijasca.2026.001',
    },
    {
      title: 'Cloud Computing Architecture for Healthcare Systems',
      authors: 'Maria Garcia, John Smith',
      pages: '16-28',
      doi: '10.1234/ijasca.2026.002',
    },
    {
      title: 'Natural Language Processing in Arabic Sentiment Analysis',
      authors: 'Omar Hassan, Fatima Ahmed',
      pages: '29-45',
      doi: '10.1234/ijasca.2026.003',
    },
  ];

  const announcements = [
    {
      date: 'Feb 1, 2026',
      title: 'Call for Papers: Special Issue on AI in Education',
      description: 'We invite submissions for our upcoming special issue on Artificial Intelligence applications in educational systems.',
    },
    {
      date: 'Jan 15, 2026',
      title: 'New Editorial Board Members',
      description: 'We are pleased to announce the addition of three distinguished researchers to our editorial board.',
    },
    {
      date: 'Jan 1, 2026',
      title: 'Volume 15, Issue 1 Published',
      description: 'The first issue of 2026 is now available online with 12 research articles.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1588144606768-3a6a1edf7729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGpvdXJuYWwlMjByZXNlYXJjaHxlbnwxfHx8fDE3NzAyMDIzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Academic Research"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            International Journal of Applied Sciences<br />& Computer Applications
          </h1>
          <p className="text-xl mb-8 max-w-3xl">
            A peer-reviewed, open access journal dedicated to publishing high-quality research 
            in applied sciences, computer science, and information technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/submit">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Submit Manuscript
              </Button>
            </Link>
            <Link to="/archives">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Archives
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Calendar className="size-8 text-blue-900" />
              </div>
              <div className="text-3xl font-bold text-gray-900">15</div>
              <div className="text-gray-600">Years Publishing</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <FileText className="size-8 text-blue-900" />
              </div>
              <div className="text-3xl font-bold text-gray-900">850+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="size-8 text-blue-900" />
              </div>
              <div className="text-3xl font-bold text-gray-900">2,500+</div>
              <div className="text-gray-600">Authors</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="size-8 text-blue-900" />
              </div>
              <div className="text-3xl font-bold text-gray-900">45</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Issue */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Current Issue: Volume 15, Issue 1 (2026)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentIssueArticles.map((article, index) => (
                    <div key={index} className="pb-6 border-b last:border-b-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{article.authors}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>Pages: {article.pages}</span>
                        <span>DOI: {article.doi}</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">Abstract</Button>
                        <Button size="sm" variant="outline">PDF</Button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Link to="/archives">
                      <Button variant="outline">View Full Issue</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scope */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Scope & Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  IJASCA publishes original research articles, review articles, and case studies in:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Computer Science & Engineering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Artificial Intelligence & Machine Learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Data Science & Big Data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Software Engineering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Network & Information Security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Cloud & Mobile Computing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Internet of Things (IoT)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-1">•</span>
                    <span>Applied Mathematics & Statistics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="pb-4 border-b last:border-b-0">
                      <div className="text-sm text-gray-500 mb-1">{announcement.date}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{announcement.title}</h4>
                      <p className="text-sm text-gray-600">{announcement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Author Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to="/submit" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      Submission Guidelines
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    Article Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Peer Review Process
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Publication Ethics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Indexing */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Indexing & Abstracting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-0.5">✓</span>
                    <span>Google Scholar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-0.5">✓</span>
                    <span>CrossRef</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-0.5">✓</span>
                    <span>Directory of Open Access Journals (DOAJ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-900 mt-0.5">✓</span>
                    <span>Academic Search Complete</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
