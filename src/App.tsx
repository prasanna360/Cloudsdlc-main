import { useState, useEffect } from 'react';
import { Layout, type PageId } from '@/components/Layout';
import { EvaluationProvider } from '@/context/EvaluationContext';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { EvaluationPage } from '@/pages/EvaluationPage';
import { PRPLWPage } from '@/pages/PRPLWPage';
import { ComparisonPage } from '@/pages/ComparisonPage';
import { PredictivePage } from '@/pages/PredictivePage';
import { SDLCPage } from '@/pages/SDLCPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { MethodologyPage } from '@/pages/MethodologyPage';
import { ArchitecturePage } from '@/pages/ArchitecturePage';
import { AboutPage } from '@/pages/AboutPage';
import { FutureScopePage } from '@/pages/FutureScopePage';

function App() {
  const [page, setPage] = useState<PageId>('landing');

  const handleNavigate = (target: PageId) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'evaluation':
        return <EvaluationPage onNavigate={handleNavigate} />;
      case 'prplw':
        return <PRPLWPage />;
      case 'comparison':
        return <ComparisonPage />;
      case 'predictive':
        return <PredictivePage />;
      case 'sdlc':
        return <SDLCPage />;
      case 'results':
        return <ResultsPage />;
      case 'methodology':
        return <MethodologyPage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'about':
        return <AboutPage />;
      case 'future':
        return <FutureScopePage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <EvaluationProvider>
      <Layout currentPage={page} onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
    </EvaluationProvider>
  );
}

export default App;
