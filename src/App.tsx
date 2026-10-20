import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIBackground from './components/background/AIBackground';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { validateEnvironment } from './config/env';

// Lazy-loaded routes for optimal bundle chunking and performance
const Home = lazy(() => import('./pages/Home'));
const Community = lazy(() => import('./pages/Community'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Chat = lazy(() => import('./pages/Chat'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  useEffect(() => {
    validateEnvironment();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen relative flex flex-col justify-between">
          <AIBackground />

          <div className="relative z-10 flex-1 flex flex-col">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
              <Suspense fallback={<LoadingSpinner label="Loading page..." />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
