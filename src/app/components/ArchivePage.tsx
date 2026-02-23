import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronRight, Download, X, FileText, Calendar, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface VolumeData {
  volume: number;
  issue: number;
  month: string;
  articles: number;
  published: string;
}

// Sample article titles for each issue (demo data)
const sampleArticleTitles: Record<string, string[]> = {
  '28-1': [
    'Machine Learning Approaches for Climate Change Prediction',
    'Quantum Computing Applications in Drug Discovery',
    'The Role of Artificial Intelligence in Personalized Education',
    'Novel Biomarkers for Early Detection of Neurodegenerative Diseases',
    'Sustainable Urban Development: Integrating Green Infrastructure',
    'Blockchain Technology in Supply Chain Management',
  ],
  '27-4': [
    'Advances in CRISPR Gene Editing Technology',
    'Deep Learning for Medical Image Analysis',
    'Renewable Energy Storage Solutions: A Comparative Study',
    'Impact of Social Media on Mental Health: A Longitudinal Study',
    'Nanomaterials for Water Purification Systems',
    'Smart Agriculture: IoT Applications in Modern Farming',
    'Cybersecurity Threats in Cloud Computing',
    'Sustainable Fashion: Materials and Manufacturing',
  ],
};

const getArticlesForIssue = (volume: number, issue: number, count: number): string[] => {
  const key = `${volume}-${issue}`;
  if (sampleArticleTitles[key]) return sampleArticleTitles[key];
  // Generate placeholder titles for other issues
  return Array.from({ length: count }, (_, i) =>
    `Research Article ${i + 1} — Volume ${volume}, Issue ${issue}`
  );
};

const archiveData = [
  {
    year: 2026,
    volumes: [
      { volume: 28, issue: 1, month: 'February', articles: 6, published: 'Feb 15, 2026' },
      { volume: 27, issue: 4, month: 'January', articles: 8, published: 'Jan 20, 2026' },
    ],
  },
  {
    year: 2025,
    volumes: [
      { volume: 27, issue: 3, month: 'October', articles: 10, published: 'Oct 15, 2025' },
      { volume: 27, issue: 2, month: 'July', articles: 9, published: 'Jul 20, 2025' },
      { volume: 27, issue: 1, month: 'April', articles: 11, published: 'Apr 15, 2025' },
      { volume: 26, issue: 4, month: 'January', articles: 7, published: 'Jan 25, 2025' },
    ],
  },
  {
    year: 2024,
    volumes: [
      { volume: 26, issue: 3, month: 'October', articles: 12, published: 'Oct 10, 2024' },
      { volume: 26, issue: 2, month: 'July', articles: 9, published: 'Jul 15, 2024' },
      { volume: 26, issue: 1, month: 'April', articles: 10, published: 'Apr 20, 2024' },
      { volume: 25, issue: 4, month: 'January', articles: 8, published: 'Jan 30, 2024' },
    ],
  },
  {
    year: 2023,
    volumes: [
      { volume: 25, issue: 3, month: 'October', articles: 11, published: 'Oct 12, 2023' },
      { volume: 25, issue: 2, month: 'July', articles: 10, published: 'Jul 18, 2023' },
      { volume: 25, issue: 1, month: 'April', articles: 9, published: 'Apr 22, 2023' },
      { volume: 24, issue: 4, month: 'January', articles: 7, published: 'Jan 28, 2023' },
    ],
  },
];

export function ArchivePage() {
  const [selectedIssue, setSelectedIssue] = useState<{ volume: VolumeData; year: number } | null>(null);

  const handleViewIssue = (volume: VolumeData, year: number) => {
    setSelectedIssue({ volume, year });
  };

  const handleExportList = () => {
    toast.success('Export Started', {
      description: 'The archive list is being exported as CSV. This is a demo — no actual file is being generated.',
    });
  };

  const handleLegacyArchive = () => {
    toast.info('Legacy Archive', {
      description: 'The legacy archive system (1998-2022) would open in a new window. This is a demo feature.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Archive</h1>
        <p className="text-gray-600">
          Browse all published issues of the Journal of Contemporary Scientific Research & Analysis
        </p>
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">Archive Statistics</h3>
            <p className="text-sm text-blue-800">
              Over 1,200 peer-reviewed articles published since 1998, spanning multiple scientific disciplines
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportList}>
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>
      </Card>

      {archiveData.map((yearData) => (
        <Card key={yearData.year} className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{yearData.year}</h2>
          <div className="space-y-3">
            {yearData.volumes.map((volume, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewIssue(volume, yearData.year)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      Volume {volume.volume}, Issue {volume.issue}
                    </h3>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{volume.month} {yearData.year}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{volume.articles} articles</span>
                    <span>•</span>
                    <span>Published: {volume.published}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewIssue(volume, yearData.year); }}>
                  View Issue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Card className="p-6 bg-gray-50">
        <div className="text-center">
          <h3 className="font-semibold mb-2">Looking for older issues?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Issues from 1998-2022 are available in our legacy archive system
          </p>
          <Button variant="outline" onClick={handleLegacyArchive}>
            Access Legacy Archive
          </Button>
        </div>
      </Card>

      {/* View Issue Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          {selectedIssue && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">
                    {selectedIssue.volume.month} {selectedIssue.year}
                  </Badge>
                  <Badge variant="outline">
                    {selectedIssue.volume.articles} Articles
                  </Badge>
                </div>
                <DialogTitle className="text-xl">
                  Volume {selectedIssue.volume.volume}, Issue {selectedIssue.volume.issue}
                </DialogTitle>
                <DialogDescription>
                  Published: {selectedIssue.volume.published}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
                {getArticlesForIssue(
                  selectedIssue.volume.volume,
                  selectedIssue.volume.issue,
                  selectedIssue.volume.articles,
                ).map((title, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm leading-snug">{title}</h4>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Pages {idx * 15 + 1}-{(idx + 1) * 15}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {selectedIssue.volume.published}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                      onClick={() => {
                        toast.success(`Opening "${title}"`, {
                          description: 'This would navigate to the full article. This is a demo.',
                        });
                      }}
                    >
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 border-t pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedIssue(null)}>
                  Close
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    toast.success('Downloading Issue', {
                      description: `Downloading Volume ${selectedIssue.volume.volume}, Issue ${selectedIssue.volume.issue} as PDF. This is a demo.`,
                    });
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Issue
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
