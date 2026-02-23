import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message Sent!', {
      description: 'Thank you for contacting us. We will respond within 24-48 hours.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600">
          Get in touch with our editorial team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Dr. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Inquiry about manuscript submission"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your inquiry in detail..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Address</div>
                  <p className="text-sm text-gray-600">
                    Ram Nagar, Mukundwadi<br />
                    Chhatrapati Sambhajinagar (formerly Aurangabad)<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Email</div>
                  <a href="mailto:editor@jcsra.org" className="text-sm text-blue-600 hover:underline">
                    editor@jcsra.org
                  </a>
                  <br />
                  <a href="mailto:submissions@jcsra.org" className="text-sm text-blue-600 hover:underline">
                    submissions@jcsra.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Phone</div>
                  <p className="text-sm text-gray-600">
                    +91 8855063215<br />
                    +91 8855664420
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Office Hours</div>
                  <p className="text-sm text-gray-600">
                    Monday - Friday<br />
                    9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Response</h3>
            <p className="text-sm text-blue-800">
              We typically respond to all inquiries within 24-48 hours during business days.
            </p>
          </Card>
        </div>
      </div>

      {/* Department Contacts */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Department Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Editorial Office</h3>
            <p className="text-sm text-gray-600 mb-2">
              Questions about the editorial process, peer review, and publication
            </p>
            <a href="mailto:editorial@jcsra.org" className="text-sm text-blue-600 hover:underline">
              editorial@jcsra.org
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
            <p className="text-sm text-gray-600 mb-2">
              Issues with online submission system, account access, or downloads
            </p>
            <a href="mailto:support@jcsra.org" className="text-sm text-blue-600 hover:underline">
              support@jcsra.org
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Subscriptions</h3>
            <p className="text-sm text-gray-600 mb-2">
              Questions about subscriptions, access rights, and institutional licenses
            </p>
            <a href="mailto:subscriptions@jcsra.org" className="text-sm text-blue-600 hover:underline">
              subscriptions@jcsra.org
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
