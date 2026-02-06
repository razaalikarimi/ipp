import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Submit Manuscript</h1>
          <p className="text-xl mt-2 text-blue-100">Submit your research to IJASCA</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!submitted ? (
              <Card>
                <CardHeader>
                  <CardTitle>Manuscript Submission Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required placeholder="Enter first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required placeholder="Enter last name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required placeholder="author@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="affiliation">Affiliation *</Label>
                      <Input id="affiliation" required placeholder="University or Institution" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" required placeholder="Enter country" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Manuscript Title *</Label>
                      <Input id="title" required placeholder="Enter manuscript title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Article Category *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="research">Research Article</SelectItem>
                          <SelectItem value="review">Review Article</SelectItem>
                          <SelectItem value="technical">Technical Note</SelectItem>
                          <SelectItem value="case">Case Study</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject Area *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="ai">Artificial Intelligence</SelectItem>
                          <SelectItem value="ds">Data Science</SelectItem>
                          <SelectItem value="se">Software Engineering</SelectItem>
                          <SelectItem value="ns">Network Security</SelectItem>
                          <SelectItem value="cc">Cloud Computing</SelectItem>
                          <SelectItem value="iot">Internet of Things</SelectItem>
                          <SelectItem value="am">Applied Mathematics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="abstract">Abstract *</Label>
                      <Textarea 
                        id="abstract" 
                        required 
                        placeholder="Enter abstract (max 300 words)"
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords *</Label>
                      <Input 
                        id="keywords" 
                        required 
                        placeholder="Enter 4-6 keywords, separated by commas"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coAuthors">Co-Authors</Label>
                      <Textarea 
                        id="coAuthors" 
                        placeholder="List co-authors with their affiliations"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Manuscript (DOC/DOCX/PDF) *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <Upload className="size-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                        <Input type="file" className="hidden" accept=".doc,.docx,.pdf" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Cover Letter (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <FileText className="size-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Upload cover letter</p>
                        <Input type="file" className="hidden" accept=".doc,.docx,.pdf" />
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="agreement" required className="mt-1" />
                      <Label htmlFor="agreement" className="text-sm">
                        I confirm that this manuscript is original and has not been published elsewhere, 
                        nor is it currently under consideration for publication by another journal. I agree 
                        to the journal's publication ethics and policies.
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Submit Manuscript
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="size-16 mx-auto text-green-600 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Successful!</h2>
                  <p className="text-gray-600 mb-6">
                    Your manuscript has been successfully submitted. You will receive a confirmation 
                    email shortly with a manuscript ID and further instructions.
                  </p>
                  <Button onClick={() => setSubmitted(false)}>Submit Another Manuscript</Button>
                </CardContent>
              </Card>
            )}

            {/* Guidelines */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Manuscript Preparation</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Manuscripts should be written in English and prepared in MS Word or LaTeX format</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Use Times New Roman, 12pt font, double-spaced</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Research articles should typically be 4,000-8,000 words</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Include title, abstract (max 300 words), keywords (4-6), introduction, methodology, results, discussion, conclusion, and references</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">References</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Follow APA citation style</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Ensure all references are complete and accurate</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Figures and Tables</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Submit high-resolution figures (minimum 300 dpi)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>All figures and tables should be numbered and captioned</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 size-8 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-semibold">Submit</div>
                      <div className="text-sm text-gray-600">Submit your manuscript online</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 size-8 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-semibold">Review</div>
                      <div className="text-sm text-gray-600">Peer review (4-6 weeks)</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 size-8 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-semibold">Revision</div>
                      <div className="text-sm text-gray-600">Revise based on feedback</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 size-8 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <div className="font-semibold">Publish</div>
                      <div className="text-sm text-gray-600">Article published online</div>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">Issue 1 (March 2026)</div>
                  <div className="text-gray-600">Submission deadline: January 15, 2026</div>
                </div>
                <div>
                  <div className="font-semibold">Issue 2 (June 2026)</div>
                  <div className="text-gray-600">Submission deadline: April 15, 2026</div>
                </div>
                <div>
                  <div className="font-semibold">Issue 3 (September 2026)</div>
                  <div className="text-gray-600">Submission deadline: July 15, 2026</div>
                </div>
                <div>
                  <div className="font-semibold">Issue 4 (December 2026)</div>
                  <div className="text-gray-600">Submission deadline: October 15, 2026</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-blue-900" />
                  <span>Download Article Template</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-blue-900" />
                  <span>View Submission Guidelines</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-gray-700">
                    For questions, contact:<br />
                    <a href="mailto:submissions@zuj.edu.jo" className="text-blue-600">
                      submissions@zuj.edu.jo
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
