import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, ExternalLink } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Article {
  title: string;
  authors: string[];
  abstract: string;
  pages: string;
  doi: string;
  publishedDate: string;
  category: string;
  fullText?: string;
}

interface ArticleDetailDialogProps {
  open: boolean;
  onClose: () => void;
  article: Article | null;
  onDownload: () => void;
}

export function ArticleDetailDialog({ open, onClose, article, onDownload }: ArticleDetailDialogProps) {
  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2">
                {article.category}
              </Badge>
              <DialogTitle className="text-2xl leading-tight">{article.title}</DialogTitle>
              <DialogDescription className="mt-2">
                <span className="font-medium text-gray-700">Authors:</span> {article.authors.join(', ')}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">DOI:</span>{' '}
                <span className="text-blue-600">{article.doi}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Published:</span> {article.publishedDate}
              </div>
              <div>
                <span className="font-medium text-gray-700">Pages:</span> {article.pages}
              </div>
              <div>
                <span className="font-medium text-gray-700">Category:</span> {article.category}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Abstract</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{article.abstract}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Full Article</h3>
              <p className="text-sm text-gray-600 mb-4">
                This is a preview of the article. Download the full PDF to read the complete research paper including methodology, results, discussion, and references.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">1. Introduction</h4>
                  <p className="text-gray-700">
                    This section provides background information and establishes the research context. The full text is available in the downloadable PDF version of this article.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">2. Methodology</h4>
                  <p className="text-gray-700">
                    Detailed research methods and experimental procedures are described in the complete article.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">3. Results</h4>
                  <p className="text-gray-700">
                    Comprehensive results including figures, tables, and statistical analyses are presented in the full PDF.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">4. Discussion & Conclusion</h4>
                  <p className="text-gray-700">
                    In-depth discussion of findings and conclusions are available in the complete article.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Research</Badge>
                <Badge variant="outline">Scientific Analysis</Badge>
                <Badge variant="outline">{article.category}</Badge>
                <Badge variant="outline">Peer-Reviewed</Badge>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-2 border-t pt-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Full PDF
          </Button>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Cite
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
