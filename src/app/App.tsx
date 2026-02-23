import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CurrentIssuesPage } from './components/CurrentIssuesPage';
import { ArchivePage } from './components/ArchivePage';
import { EditorialBoardPage } from './components/EditorialBoardPage';
import { SubmissionGuidelinesPage } from './components/SubmissionGuidelinesPage';
import { ContactPage } from './components/ContactPage';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LoginDialog } from './components/LoginDialog';
import { RegisterDialog } from './components/RegisterDialog';
import { ArticleDetailDialog } from './components/ArticleDetailDialog';
import { FilterPanel } from './components/FilterPanel';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

const allArticles = [
  {
    title: 'Machine Learning Approaches for Climate Change Prediction: A Comprehensive Review',
    authors: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Prof. Emily Rodriguez'],
    abstract: 'This comprehensive review examines the application of machine learning techniques in climate change prediction models. We analyze various algorithms including neural networks, random forests, and support vector machines, evaluating their effectiveness in forecasting temperature patterns, precipitation levels, and extreme weather events. Our findings suggest that ensemble methods combining multiple ML approaches yield the most accurate predictions.',
    pages: '1-18',
    doi: '10.1234/jcsra.2026.001',
    publishedDate: 'February 15, 2026',
    category: 'Environmental Science',
    pdfUrl: '#',
  },
  {
    title: 'Quantum Computing Applications in Drug Discovery: Recent Advances and Future Prospects',
    authors: ['Dr. James Park', 'Dr. Lisa Wang', 'Dr. Ahmed Hassan'],
    abstract: 'This paper explores the revolutionary impact of quantum computing on pharmaceutical research and drug discovery processes. We present recent breakthroughs in molecular simulation, protein folding prediction, and chemical compound analysis using quantum algorithms. The study demonstrates how quantum computing can reduce drug development time from years to months while significantly improving accuracy in identifying viable drug candidates.',
    pages: '19-36',
    doi: '10.1234/jcsra.2026.002',
    publishedDate: 'February 14, 2026',
    category: 'Pharmaceutical Sciences',
    pdfUrl: '#',
  },
  {
    title: 'The Role of Artificial Intelligence in Personalized Education: A Meta-Analysis',
    authors: ['Prof. David Martinez', 'Dr. Sophia Lee', 'Dr. Robert Thompson'],
    abstract: 'This meta-analysis investigates the effectiveness of AI-powered personalized learning systems in educational settings. Analyzing data from 47 studies encompassing over 12,000 students, we examine how adaptive learning platforms, intelligent tutoring systems, and AI-driven assessment tools impact student performance, engagement, and learning outcomes. Results indicate significant improvements in student achievement across diverse demographic groups.',
    pages: '37-55',
    doi: '10.1234/jcsra.2026.003',
    publishedDate: 'February 13, 2026',
    category: 'Education Technology',
    pdfUrl: '#',
  },
  {
    title: 'Novel Biomarkers for Early Detection of Neurodegenerative Diseases',
    authors: ['Dr. Anna Kowalski', 'Dr. Wei Zhang', 'Prof. Carlos Mendez', 'Dr. Nina Patel'],
    abstract: 'Early detection of neurodegenerative diseases such as Alzheimer\'s and Parkinson\'s remains a critical challenge in modern medicine. This study identifies novel protein biomarkers in cerebrospinal fluid and blood plasma that show promise for detecting these conditions up to 10 years before clinical symptoms appear. We discuss the methodology for biomarker discovery, validation processes, and potential clinical applications.',
    pages: '56-74',
    doi: '10.1234/jcsra.2026.004',
    publishedDate: 'February 12, 2026',
    category: 'Neuroscience',
    pdfUrl: '#',
  },
  {
    title: 'Sustainable Urban Development: Integrating Green Infrastructure in Smart Cities',
    authors: ['Dr. Maria Garcia', 'Dr. John O\'Brien', 'Dr. Yuki Tanaka'],
    abstract: 'This research explores the integration of green infrastructure within smart city frameworks to create more sustainable urban environments. We examine case studies from 15 cities worldwide, analyzing the implementation of green roofs, urban forests, permeable pavements, and rain gardens alongside IoT sensors and data analytics. The study demonstrates how combining nature-based solutions with technology can reduce urban heat islands, improve air quality, and enhance citizen well-being.',
    pages: '75-92',
    doi: '10.1234/jcsra.2026.005',
    publishedDate: 'February 11, 2026',
    category: 'Urban Planning',
    pdfUrl: '#',
  },
  {
    title: 'Blockchain Technology in Supply Chain Management: Transparency and Traceability',
    authors: ['Dr. Thomas Anderson', 'Dr. Priya Sharma', 'Dr. Marcus Williams'],
    abstract: 'This paper investigates the application of blockchain technology to enhance transparency and traceability in global supply chains. Through multiple industry case studies, we demonstrate how distributed ledger technology can reduce fraud, improve product authenticity verification, and streamline logistics operations. The research presents a comprehensive framework for blockchain implementation in supply chain systems.',
    pages: '93-110',
    doi: '10.1234/jcsra.2026.006',
    publishedDate: 'February 10, 2026',
    category: 'Supply Chain Management',
    pdfUrl: '#',
  },
];

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [articleDetailOpen, setArticleDetailOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<typeof allArticles[0] | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  // Filter articles based on search and categories
  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(article.category);

    return matchesSearch && matchesCategory;
  });

  const handleReadMore = (article: typeof allArticles[0]) => {
    setSelectedArticle(article);
    setArticleDetailOpen(true);
  };

  const handleDownload = (article: typeof allArticles[0]) => {
    toast.success(`Downloading "${article.title}"`, {
      description: 'PDF download started. This is a demo - no actual file is being downloaded.',
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Auto-navigate to Current Issues when searching so results are visible
    if (query.trim() !== '') {
      setActiveTab('current');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset filters when changing tabs
    if (tab !== 'current') {
      setSearchQuery('');
      setSelectedCategories([]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onTabChange={handleTabChange} />;
      case 'current':
        return (
          <CurrentIssuesPage
            articles={filteredArticles}
            onReadMore={handleReadMore}
            onDownload={handleDownload}
            onFilterClick={() => setFilterOpen(true)}
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
          />
        );
      case 'archive':
        return <ArchivePage />;
      case 'editorial':
        return <EditorialBoardPage />;
      case 'submission':
        return <SubmissionGuidelinesPage onTabChange={handleTabChange} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster />

      <Header
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
        onSearchChange={handleSearchChange}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {(activeTab === 'home' || activeTab === 'current') ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {renderContent()}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        )}
      </main>

      <Footer onTabChange={handleTabChange} />

      {/* Dialogs */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} />
      <ArticleDetailDialog
        open={articleDetailOpen}
        onClose={() => setArticleDetailOpen(false)}
        article={selectedArticle}
        onDownload={() => selectedArticle && handleDownload(selectedArticle)}
      />
      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />
    </div>
  );
}