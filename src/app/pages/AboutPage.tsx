import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">About IJASCA</h1>
          <p className="text-xl mt-2 text-blue-100">International Journal of Applied Sciences & Computer Applications</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Journal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The International Journal of Applied Sciences & Computer Applications (IJASCA) is a peer-reviewed, 
                  open access journal published by Al-Zarqa University, Jordan. The journal aims to provide a platform 
                  for researchers, academics, and practitioners to publish their innovative research and developments 
                  in the fields of applied sciences and computer applications.
                </p>
                <p>
                  IJASCA publishes original research articles, review articles, technical notes, and case studies 
                  that contribute to the advancement of knowledge in computer science, information technology, 
                  applied mathematics, and related interdisciplinary fields.
                </p>
                <div className="mt-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1721552023489-6c2ec21d297f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGJvb2tzfGVufDF8fHx8MTc3MDE4MzY2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="University Library"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aims and Scope</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  IJASCA aims to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-900 mt-1 flex-shrink-0">•</span>
                    <span>Provide a premier forum for the publication of high-quality research in applied sciences and computer applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-900 mt-1 flex-shrink-0">•</span>
                    <span>Foster interdisciplinary research and collaboration among researchers worldwide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-900 mt-1 flex-shrink-0">•</span>
                    <span>Promote the dissemination of innovative ideas and practical applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-900 mt-1 flex-shrink-0">•</span>
                    <span>Support the advancement of technology and scientific knowledge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-900 mt-1 flex-shrink-0">•</span>
                    <span>Maintain the highest standards of publication ethics and peer review</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publication Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  IJASCA is published quarterly (four issues per year) in March, June, September, and December. 
                  Special issues on selected topics are also published periodically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Open Access Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  IJASCA is an open access journal, which means that all content is freely available without charge 
                  to users or their institutions. Users are allowed to read, download, copy, distribute, print, 
                  search, or link to the full texts of the articles in this journal without asking prior permission 
                  from the publisher or the author.
                </p>
                <p>
                  This is in accordance with the Budapest Open Access Initiative (BOAI) definition of open access. 
                  All articles are published under a Creative Commons Attribution License.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Journal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900">ISSN</div>
                  <div className="text-gray-600">2091-2609 (Online)</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Publisher</div>
                  <div className="text-gray-600">Al-Zarqa University</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Frequency</div>
                  <div className="text-gray-600">Quarterly</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Language</div>
                  <div className="text-gray-600">English</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">First Published</div>
                  <div className="text-gray-600">2011</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Computer Science</li>
                  <li>Information Technology</li>
                  <li>Software Engineering</li>
                  <li>Artificial Intelligence</li>
                  <li>Data Science</li>
                  <li>Network Security</li>
                  <li>Cloud Computing</li>
                  <li>Mobile Computing</li>
                  <li>Applied Mathematics</li>
                  <li>Computational Sciences</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-blue-600">ijasca@zuj.edu.jo</div>
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div>+962 5 382 6666</div>
                </div>
                <div>
                  <div className="font-semibold">Address</div>
                  <div>Al-Zarqa University<br />Zarqa, Jordan</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
