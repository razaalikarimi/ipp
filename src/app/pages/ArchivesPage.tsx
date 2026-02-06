import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Download } from 'lucide-react';

export function ArchivesPage() {
  const volumes = [
    {
      year: '2026',
      volume: 15,
      issues: [
        {
          issue: 1,
          month: 'March',
          articles: [
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
          ],
        },
      ],
    },
    {
      year: '2025',
      volume: 14,
      issues: [
        {
          issue: 4,
          month: 'December',
          articles: [
            {
              title: 'Deep Learning for Medical Image Analysis',
              authors: 'Jennifer Lee, Robert Taylor',
              pages: '112-128',
              doi: '10.1234/ijasca.2025.048',
            },
            {
              title: 'Blockchain Technology in Supply Chain Management',
              authors: 'Carlos Martinez, Elena Popov',
              pages: '129-145',
              doi: '10.1234/ijasca.2025.049',
            },
          ],
        },
        {
          issue: 3,
          month: 'September',
          articles: [
            {
              title: 'Edge Computing for IoT Applications',
              authors: 'Wei Zhang, Yuki Tanaka',
              pages: '78-95',
              doi: '10.1234/ijasca.2025.035',
            },
            {
              title: 'Automated Software Testing Using AI',
              authors: 'David Williams, Priya Sharma',
              pages: '96-111',
              doi: '10.1234/ijasca.2025.036',
            },
          ],
        },
        {
          issue: 2,
          month: 'June',
          articles: [
            {
              title: 'Quantum Computing Applications in Cryptography',
              authors: 'Sophie Martin, James Brown',
              pages: '45-62',
              doi: '10.1234/ijasca.2025.022',
            },
            {
              title: 'Augmented Reality in Education',
              authors: 'Lisa Anderson, Mohammed Khalil',
              pages: '63-77',
              doi: '10.1234/ijasca.2025.023',
            },
          ],
        },
        {
          issue: 1,
          month: 'March',
          articles: [
            {
              title: 'Big Data Analytics for Smart Cities',
              authors: 'Ahmed Hassan, Anna Kowalski',
              pages: '1-18',
              doi: '10.1234/ijasca.2025.001',
            },
            {
              title: '5G Network Security Challenges',
              authors: 'Thomas Mueller, Aisha Rahman',
              pages: '19-34',
              doi: '10.1234/ijasca.2025.002',
            },
          ],
        },
      ],
    },
    {
      year: '2024',
      volume: 13,
      issues: [
        {
          issue: 4,
          month: 'December',
          articles: [
            {
              title: 'Federated Learning for Privacy-Preserving ML',
              authors: 'Nina Patel, Lucas Silva',
              pages: '95-110',
              doi: '10.1234/ijasca.2024.048',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Archives</h1>
          <p className="text-xl mt-2 text-blue-100">Browse all published issues and articles</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="2026" className="w-full">
          <TabsList className="mb-8">
            {volumes.map((vol) => (
              <TabsTrigger key={vol.year} value={vol.year}>
                {vol.year} (Vol. {vol.volume})
              </TabsTrigger>
            ))}
          </TabsList>

          {volumes.map((vol) => (
            <TabsContent key={vol.year} value={vol.year}>
              <div className="space-y-6">
                {vol.issues.map((issue) => (
                  <Card key={`${vol.year}-${issue.issue}`}>
                    <CardHeader className="bg-gray-50">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <CardTitle className="text-xl">
                          Volume {vol.volume}, Issue {issue.issue} - {issue.month} {vol.year}
                        </CardTitle>
                        <Button variant="outline" size="sm">
                          <Download className="size-4 mr-2" />
                          Download Full Issue
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {issue.articles.map((article, idx) => (
                          <div key={idx} className="pb-6 border-b last:border-b-0">
                            <div className="flex gap-3 mb-3">
                              <FileText className="size-5 text-blue-900 flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {article.title}
                                </h3>
                                <p className="text-gray-600 mb-2">{article.authors}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                                  <span>Pages: {article.pages}</span>
                                  <span>DOI: {article.doi}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Button size="sm" variant="outline">
                                    Abstract
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Download className="size-3 mr-1" />
                                    PDF
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Cite
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Search and Filter Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Browse by Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Artificial Intelligence',
                    'Machine Learning',
                    'Cloud Computing',
                    'Network Security',
                    'Data Science',
                    'Software Engineering',
                    'IoT',
                    'Blockchain',
                    'Computer Vision',
                  ].map((topic) => (
                    <Button key={topic} variant="outline" size="sm" className="justify-start">
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Archive Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Volumes:</span>
                  <span className="font-bold text-gray-900">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Issues:</span>
                  <span className="font-bold text-gray-900">60</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Articles:</span>
                  <span className="font-bold text-gray-900">850+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Years Active:</span>
                  <span className="font-bold text-gray-900">2011-2026</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
