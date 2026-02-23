import { ArticleCard } from './ArticleCard';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';

interface Article {
  title: string;
  authors: string[];
  abstract: string;
  pages: string;
  doi: string;
  publishedDate: string;
  category: string;
  pdfUrl: string;
}

interface CurrentIssuesPageProps {
  articles: Article[];
  onReadMore: (article: Article) => void;
  onDownload: (article: Article) => void;
  onFilterClick: () => void;
  searchQuery: string;
  selectedCategories: string[];
}

export function CurrentIssuesPage({
  articles,
  onReadMore,
  onDownload,
  onFilterClick,
  searchQuery,
  selectedCategories,
}: CurrentIssuesPageProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Current Issues</h1>
            <p className="text-sm text-gray-600 mt-1">
              Volume 28, Issue 1 - February 2026
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onFilterClick}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          {articles.length} article{articles.length !== 1 ? 's' : ''} 
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedCategories.length > 0 && ` in selected categories`}
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="border rounded-lg p-12 bg-white text-center">
          <p className="text-gray-500">No articles found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              {...article}
              onReadMore={() => onReadMore(article)}
              onDownload={() => onDownload(article)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
