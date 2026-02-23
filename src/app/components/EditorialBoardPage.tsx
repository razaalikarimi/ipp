import { Card } from './ui/card';
import { Mail, Globe } from 'lucide-react';

const editorInChief = {
  name: 'Prof. Dr. Elizabeth Chen',
  title: 'Editor-in-Chief',
  affiliation: 'Stanford University, USA',
  expertise: 'Computational Biology, Machine Learning',
  email: 'e.chen@jcsra.org',
};

const associateEditors = [
  {
    name: 'Prof. Michael Rodriguez',
    affiliation: 'MIT, USA',
    expertise: 'Quantum Computing, Physics',
    email: 'm.rodriguez@jcsra.org',
  },
  {
    name: 'Dr. Sarah Williams',
    affiliation: 'University of Oxford, UK',
    expertise: 'Climate Science, Environmental Studies',
    email: 's.williams@jcsra.org',
  },
  {
    name: 'Prof. Yuki Tanaka',
    affiliation: 'University of Tokyo, Japan',
    expertise: 'Neuroscience, Cognitive Psychology',
    email: 'y.tanaka@jcsra.org',
  },
  {
    name: 'Dr. Ahmed Hassan',
    affiliation: 'ETH Zurich, Switzerland',
    expertise: 'Pharmaceutical Sciences, Drug Discovery',
    email: 'a.hassan@jcsra.org',
  },
];

const editorialBoard = [
  {
    name: 'Dr. Maria Garcia',
    affiliation: 'University of Barcelona, Spain',
    expertise: 'Urban Planning, Sustainability',
  },
  {
    name: 'Prof. James Park',
    affiliation: 'Seoul National University, South Korea',
    expertise: 'Artificial Intelligence, Robotics',
  },
  {
    name: 'Dr. Nina Patel',
    affiliation: 'Indian Institute of Science, India',
    expertise: 'Biomedical Engineering',
  },
  {
    name: 'Prof. Thomas Anderson',
    affiliation: 'University of Cambridge, UK',
    expertise: 'Economics, Supply Chain Management',
  },
  {
    name: 'Dr. Lisa Wang',
    affiliation: 'Peking University, China',
    expertise: 'Materials Science, Nanotechnology',
  },
  {
    name: 'Prof. Carlos Mendez',
    affiliation: 'University of São Paulo, Brazil',
    expertise: 'Medical Research, Epidemiology',
  },
  {
    name: 'Dr. Sophie Laurent',
    affiliation: 'Sorbonne University, France',
    expertise: 'Renewable Energy, Engineering',
  },
  {
    name: 'Prof. David Thompson',
    affiliation: 'University of Toronto, Canada',
    expertise: 'Education Technology, Pedagogy',
  },
  {
    name: 'Dr. Anna Kowalski',
    affiliation: 'University of Warsaw, Poland',
    expertise: 'Genetics, Molecular Biology',
  },
  {
    name: 'Prof. Robert O\'Brien',
    affiliation: 'Australian National University, Australia',
    expertise: 'Data Science, Statistics',
  },
  {
    name: 'Dr. Priya Sharma',
    affiliation: 'National University of Singapore, Singapore',
    expertise: 'Computer Science, Cybersecurity',
  },
  {
    name: 'Prof. Marcus Williams',
    affiliation: 'University of Cape Town, South Africa',
    expertise: 'Public Health, Social Sciences',
  },
];

export function EditorialBoardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Editorial Board</h1>
        <p className="text-gray-600">
          Our distinguished editorial board comprises leading experts from around the world
        </p>
      </div>

      {/* Editor in Chief */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-blue-600 mb-1">
              {editorInChief.title}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {editorInChief.name}
            </h2>
            <p className="text-gray-700 mb-2">{editorInChief.affiliation}</p>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Expertise:</span> {editorInChief.expertise}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a
                href={`mailto:${editorInChief.email}`}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Mail className="h-4 w-4" />
                {editorInChief.email}
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* Associate Editors */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Associate Editors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {associateEditors.map((editor, idx) => (
            <Card key={idx} className="p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{editor.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{editor.affiliation}</p>
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-medium">Expertise:</span> {editor.expertise}
              </p>
              <a
                href={`mailto:${editor.email}`}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <Mail className="h-4 w-4" />
                {editor.email}
              </a>
            </Card>
          ))}
        </div>
      </div>

      {/* Editorial Board Members */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Editorial Board Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editorialBoard.map((member, idx) => (
            <Card key={idx} className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.affiliation}</p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Expertise:</span> {member.expertise}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Join Board */}
      <Card className="p-6 bg-gray-50">
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">Interested in Joining Our Editorial Board?</h3>
          <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
            We are always looking for qualified experts to join our editorial team. 
            If you are interested in contributing to the peer review process and helping 
            to maintain our high publication standards, please get in touch.
          </p>
          <a
            href="mailto:editorial@jcsra.org"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Mail className="h-4 w-4" />
            editorial@jcsra.org
          </a>
        </div>
      </Card>
    </div>
  );
}
