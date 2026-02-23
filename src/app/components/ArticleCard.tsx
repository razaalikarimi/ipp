import { Download, ExternalLink, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ArticleCardProps {
  title: string;
  authors: string[];
  abstract: string;
  pages: string;
  doi: string;
  publishedDate: string;
  category: string;
  pdfUrl: string;
  onReadMore: () => void;
  onDownload: () => void;
}

export function ArticleCard({
  title,
  authors,
  abstract,
  pages,
  doi,
  publishedDate,
  category,
  pdfUrl,
  onReadMore,
  onDownload,
}: ArticleCardProps) {
  const handleDOIClick = () => {
    alert(`Opening DOI: ${doi}\nThis would normally redirect to the article's DOI page.`);
  };

  return (
    <article className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <span className="text-xs text-gray-500">Pages {pages}</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
            {title}
          </h2>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Authors:</span>{' '}
          {authors.join(', ')}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-medium">Abstract:</span> {abstract}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500">
            DOI: <span className="text-blue-600 hover:underline cursor-pointer" onClick={handleDOIClick}>{doi}</span>
          </p>
          <p className="text-xs text-gray-500">Published: {publishedDate}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onReadMore}>
            <BookOpen className="h-4 w-4 mr-1" />
            Read More
          </Button>
          <Button size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download PDF
          </Button>
        </div>
      </div>
    </article>
  );
}