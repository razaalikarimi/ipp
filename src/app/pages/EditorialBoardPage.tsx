import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Mail } from 'lucide-react';

export function EditorialBoardPage() {
  const editorInChief = {
    name: 'Prof. Dr. Mohammed Al-Khalidi',
    affiliation: 'Al-Zarqa University, Jordan',
    email: 'editor@zuj.edu.jo',
    expertise: 'Computer Science, Artificial Intelligence',
  };

  const associateEditors = [
    {
      name: 'Prof. Dr. Sarah Johnson',
      affiliation: 'MIT, USA',
      email: 'sjohnson@mit.edu',
      expertise: 'Machine Learning, Data Science',
    },
    {
      name: 'Prof. Dr. Ahmed Hassan',
      affiliation: 'Cairo University, Egypt',
      email: 'ahassan@cu.edu.eg',
      expertise: 'Software Engineering, Cloud Computing',
    },
    {
      name: 'Dr. Maria Garcia',
      affiliation: 'University of Barcelona, Spain',
      email: 'mgarcia@ub.edu',
      expertise: 'Network Security, Cryptography',
    },
  ];

  const editorialBoard = [
    {
      name: 'Prof. Dr. Michael Chen',
      affiliation: 'Stanford University, USA',
      expertise: 'Artificial Intelligence',
    },
    {
      name: 'Prof. Dr. Fatima Al-Zahra',
      affiliation: 'King Saud University, Saudi Arabia',
      expertise: 'Data Mining, Big Data',
    },
    {
      name: 'Dr. John Smith',
      affiliation: 'Oxford University, UK',
      expertise: 'Software Engineering',
    },
    {
      name: 'Prof. Dr. Yuki Tanaka',
      affiliation: 'University of Tokyo, Japan',
      expertise: 'Computer Vision, Robotics',
    },
    {
      name: 'Dr. Elena Petrova',
      affiliation: 'Moscow State University, Russia',
      expertise: 'Natural Language Processing',
    },
    {
      name: 'Prof. Dr. David Williams',
      affiliation: 'University of Cambridge, UK',
      expertise: 'Distributed Systems',
    },
    {
      name: 'Dr. Priya Sharma',
      affiliation: 'IIT Delhi, India',
      expertise: 'Mobile Computing, IoT',
    },
    {
      name: 'Prof. Dr. Carlos Rodriguez',
      affiliation: 'University of São Paulo, Brazil',
      expertise: 'Database Systems',
    },
    {
      name: 'Dr. Lisa Anderson',
      affiliation: 'University of Toronto, Canada',
      expertise: 'Human-Computer Interaction',
    },
    {
      name: 'Prof. Dr. Omar Ibrahim',
      affiliation: 'American University of Beirut, Lebanon',
      expertise: 'Cybersecurity',
    },
    {
      name: 'Dr. Sophie Martin',
      affiliation: 'Sorbonne University, France',
      expertise: 'Algorithms, Computational Complexity',
    },
    {
      name: 'Prof. Dr. Wei Zhang',
      affiliation: 'Tsinghua University, China',
      expertise: 'Cloud Computing, Edge Computing',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Editorial Board</h1>
          <p className="text-xl mt-2 text-blue-100">Meet our distinguished team of editors</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Editor-in-Chief */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Editor-in-Chief</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{editorInChief.name}</h3>
              <p className="text-gray-600 mb-1">{editorInChief.affiliation}</p>
              <p className="text-sm text-gray-500 mb-3">
                <strong>Expertise:</strong> {editorInChief.expertise}
              </p>
              <div className="flex items-center gap-2 text-blue-600">
                <Mail className="size-4" />
                <a href={`mailto:${editorInChief.email}`}>{editorInChief.email}</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Associate Editors */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Associate Editors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {associateEditors.map((editor, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">{editor.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{editor.affiliation}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    <strong>Expertise:</strong> {editor.expertise}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 text-sm">
                    <Mail className="size-3" />
                    <a href={`mailto:${editor.email}`}>{editor.email}</a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Editorial Board Members */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Editorial Board Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {editorialBoard.map((member, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.affiliation}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Expertise:</strong> {member.expertise}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Join Our Editorial Board</h3>
          <p className="text-gray-700">
            We are always looking for qualified researchers to join our editorial board. If you are 
            interested in contributing to the peer review process and helping shape the future of 
            research in applied sciences and computer applications, please contact us at{' '}
            <a href="mailto:editorial@zuj.edu.jo" className="text-blue-600 underline">
              editorial@zuj.edu.jo
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
