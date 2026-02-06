import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-xl mt-2 text-blue-100">Get in touch with our editorial team</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    Thank you! Your message has been sent successfully. We will get back to you soon.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" required placeholder="Enter subject" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="Enter your message"
                      rows={8}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="size-12 mx-auto mb-2" />
                    <p>Al-Zarqa University</p>
                    <p>Zarqa, Jordan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Mail className="size-6 text-blue-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-sm text-gray-600">General Inquiries:</p>
                    <a href="mailto:ijasca@zuj.edu.jo" className="text-blue-600 text-sm">
                      ijasca@zuj.edu.jo
                    </a>
                    <p className="text-sm text-gray-600 mt-2">Submissions:</p>
                    <a href="mailto:submissions@zuj.edu.jo" className="text-blue-600 text-sm">
                      submissions@zuj.edu.jo
                    </a>
                    <p className="text-sm text-gray-600 mt-2">Editorial:</p>
                    <a href="mailto:editor@zuj.edu.jo" className="text-blue-600 text-sm">
                      editor@zuj.edu.jo
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="size-6 text-blue-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+962 5 382 6666</p>
                    <p className="text-gray-600">+962 5 382 6777</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <MapPin className="size-6 text-blue-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Al-Zarqa University<br />
                      P.O. Box 132222<br />
                      Zarqa 13110<br />
                      Jordan
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Clock className="size-6 text-blue-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Sunday - Thursday<br />
                      8:00 AM - 4:00 PM (GMT+3)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Editorial Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900">Editor-in-Chief</div>
                  <div className="text-sm text-gray-600">Prof. Dr. Mohammed Al-Khalidi</div>
                  <a href="mailto:editor@zuj.edu.jo" className="text-sm text-blue-600">
                    editor@zuj.edu.jo
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Managing Editor</div>
                  <div className="text-sm text-gray-600">Dr. Fatima Ahmed</div>
                  <a href="mailto:managing@zuj.edu.jo" className="text-sm text-blue-600">
                    managing@zuj.edu.jo
                  </a>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Technical Support</div>
                  <div className="text-sm text-gray-600">Editorial Office</div>
                  <a href="mailto:support@zuj.edu.jo" className="text-sm text-blue-600">
                    support@zuj.edu.jo
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Submission Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Author Resources
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Reviewer Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
