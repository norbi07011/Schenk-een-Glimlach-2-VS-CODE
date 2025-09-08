import React, { useState, useCallback, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { pages, translations } from './constants';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import EventsPage from './views/EventsPage';
import PomocPage from './views/PomocPage';
import ForMunicipalitiesPage from './views/ForMunicipalitiesPage';
import BookEventPage from './views/BookEventPage';
import ForParentsPage from './views/ForParentsPage';
import SponsorsPage from './views/SponsorsPage';
import ImpactPage from './views/ImpactPage';
import AboutUsPage from './views/AboutUsPage';
import ContactPage from './views/ContactPage';
import GalleryPage from './views/GalleryPage';
import VolunteeringPage from './views/VolunteeringPage';
import PrivacyPolicyPage from './views/PrivacyPolicyPage';
import CookiesPolicyPage from './views/CookiesPolicyPage';
import { routes } from '@/routes';

const usePageMetadata = (page: Page) => {
  const { language } = useLanguage();

  useEffect(() => {
    const translationSet = translations[language] || translations.pl;

    const pageKey = page.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const capitalizedPageKey = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);

    const titleKey = `metaTitle${capitalizedPageKey}` as keyof typeof translationSet;
    const descKey = `metaDesc${capitalizedPageKey}` as keyof typeof translationSet;

    const title = translationSet[titleKey] || "Schenk een Glimlach";
    const description = translationSet[descKey] || translationSet.metaDescHome;

    document.title = `${title} | Schenk een Glimlach`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
    
  }, [page, language]);
};


const PageRenderer: React.FC<{ currentPage: Page; navigate: (page: Page) => void; }> = ({ currentPage, navigate }) => {
    usePageMetadata(currentPage);

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'events':
        return <EventsPage />;
      case 'pomoc':
        return <PomocPage />;
      case 'for-municipalities':
        return <ForMunicipalitiesPage navigate={navigate} />;
      case 'book-event':
        return <BookEventPage />;
      case 'for-parents':
        return <ForParentsPage navigate={navigate} />;
      case 'sponsors':
        return <SponsorsPage navigate={navigate} />;
      case 'impact':
        return <ImpactPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'about-us':
        return <AboutUsPage navigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      case 'volunteering':
        return <VolunteeringPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'cookies-policy':
        return <CookiesPolicyPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
};


// Map pathname to Page type
const getPageFromPath = (path: string): Page => {
  switch (path) {
    case '/': return 'home';
    case '/events': return 'events';
    case '/pomoc': return 'pomoc';
    case '/for-municipalities': return 'for-municipalities';
    case '/book-event': return 'book-event';
    case '/for-parents': return 'for-parents';
    case '/sponsors': return 'sponsors';
    case '/impact': return 'impact';
    case '/gallery': return 'gallery';
    case '/about-us': return 'about-us';
    case '/contact': return 'contact';
    case '/volunteering': return 'volunteering';
    case '/privacy-policy': return 'privacy-policy';
    case '/cookies-policy': return 'cookies-policy';
    default: return 'home';
  }
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPath(window.location.pathname));

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', routes[page]);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPage(getPageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-light text-dark dark:bg-dark dark:text-light">
          <Header currentPage={currentPage} navigate={navigate} />
          <main className="flex-grow pt-28">
            <PageRenderer currentPage={currentPage} navigate={navigate} />
          </main>
          <Footer navigate={navigate}/>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;