import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EditorialBoardPage } from './pages/EditorialBoardPage';
import { SubmitPage } from './pages/SubmitPage';
import { ArchivesPage } from './pages/ArchivesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/editorial-board" element={<EditorialBoardPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/archives" element={<ArchivesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
