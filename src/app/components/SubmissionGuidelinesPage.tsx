import { Card } from './ui/card';
import { Button } from './ui/button';
import { FileText, CheckCircle2, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SubmissionGuidelinesPageProps {
  onTabChange?: (tab: string) => void;
}

export function SubmissionGuidelinesPage({ onTabChange }: SubmissionGuidelinesPageProps = {}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Submission Guidelines</h1>
        <p className="text-gray-600">
          Guidelines for authors submitting manuscripts to JCSRA
        </p>
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <Upload className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">Ready to Submit?</h3>
            <p className="text-sm text-blue-800 mb-4">
              Review our guidelines below, then submit your manuscript through our online submission system.
            </p>
            <Button onClick={() => toast.success('Submission Portal', { description: 'Opening the online submission portal. This is a demo.' })}>
              Submit Manuscript
            </Button>
          </div>
        </div>
      </Card>

      {/* Manuscript Preparation */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Manuscript Preparation</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">File Format</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Submit manuscripts in Microsoft Word (.doc or .docx) or LaTeX format</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Use Times New Roman, 12-point font, double-spaced</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Number all pages consecutively</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Manuscript Structure</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Title Page</h4>
                <p className="text-sm text-gray-600">
                  Include article title, author names, affiliations, corresponding author contact information, and acknowledgments
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Abstract</h4>
                <p className="text-sm text-gray-600">
                  Maximum 300 words, structured with Background, Methods, Results, and Conclusions
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Keywords</h4>
                <p className="text-sm text-gray-600">
                  Provide 4-6 keywords for indexing purposes
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">Main Text</h4>
                <p className="text-sm text-gray-600">
                  Introduction, Methods, Results, Discussion, Conclusions
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900">References</h4>
                <p className="text-sm text-gray-600">
                  Use APA 7th edition citation style
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Article Types */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Article Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Original Research</h3>
            <p className="text-sm text-gray-600 mb-2">Maximum 6,000 words</p>
            <p className="text-sm text-gray-700">
              Full-length articles reporting original research findings
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Review Articles</h3>
            <p className="text-sm text-gray-600 mb-2">Maximum 8,000 words</p>
            <p className="text-sm text-gray-700">
              Comprehensive reviews of current knowledge in a specific field
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Short Communications</h3>
            <p className="text-sm text-gray-600 mb-2">Maximum 2,000 words</p>
            <p className="text-sm text-gray-700">
              Brief reports of preliminary or focused findings
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Case Studies</h3>
            <p className="text-sm text-gray-600 mb-2">Maximum 3,000 words</p>
            <p className="text-sm text-gray-700">
              Detailed examination of specific cases or phenomena
            </p>
          </div>
        </div>
      </Card>

      {/* Peer Review Process */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Peer Review Process</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Initial Screening</h4>
              <p className="text-sm text-gray-600">
                Editorial office reviews for completeness and scope (5-7 days)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Peer Review</h4>
              <p className="text-sm text-gray-600">
                Double-blind review by 2-3 expert reviewers (3-4 weeks)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
              3
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Editorial Decision</h4>
              <p className="text-sm text-gray-600">
                Accept, revise, or reject based on reviewer feedback (1-2 weeks)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
              4
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Revision & Publication</h4>
              <p className="text-sm text-gray-600">
                Authors revise and resubmit, followed by final review and publication
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Ethical Guidelines */}
      <Card className="p-6 border-orange-200 bg-orange-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-900 mb-2">Ethical Guidelines</h3>
            <ul className="space-y-1 text-sm text-orange-800">
              <li>• All research must comply with ethical standards and regulations</li>
              <li>• Plagiarism and data fabrication will result in immediate rejection</li>
              <li>• Human and animal studies require ethics approval documentation</li>
              <li>• Conflicts of interest must be declared</li>
              <li>• Authors must have consent from all co-authors for submission</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Contact */}
      <Card className="p-6 bg-gray-50">
        <div className="text-center">
          <FileText className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have questions about the submission process, please contact our editorial office
          </p>
          <Button variant="outline" onClick={() => onTabChange && onTabChange('contact')}>
            Contact Editorial Office
          </Button>
        </div>
      </Card>
    </div>
  );
}
