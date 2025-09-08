import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types';
import { pages } from '../constants';
import Button from './common/Button';
import ThemeSwitcher from './common/ThemeSwitcher';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const switchLang = (lang: 'pl' | 'nl') => {
        setLanguage(lang);
    };

    return (
        <div className="flex items-center space-x-1 bg-dark/10 dark:bg-light/10 rounded-full p-1">
            <button
                onClick={() => switchLang('pl')}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 focus-ring ${
                    language === 'pl' ? 'bg-white text-dark shadow' : 'text-gray-600 hover:bg-white/50 hover:text-dark dark:text-gray-300 dark:hover:bg-white/80 dark:hover:text-dark'
                }`}
                aria-pressed={language === 'pl'}
            >
                PL
            </button>
            <button
                onClick={() => switchLang('nl')}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 focus-ring ${
                    language === 'nl' ? 'bg-white text-dark shadow' : 'text-gray-600 hover:bg-white/50 hover:text-dark dark:text-gray-300 dark:hover:bg-white/80 dark:hover:text-dark'
                }`}
                aria-pressed={language === 'nl'}
            >
                NL
            </button>
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ currentPage, navigate }) => {
    const { t } = useLanguage();
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4">
            <div className="container mx-auto bg-light/80 backdrop-blur-lg rounded-full border border-dark/10 shadow-lg shadow-black/5 dark:bg-dark/80 dark:border-light/10">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                    {/* Logo + Desktop Navigation */}
                    <nav className="flex items-center space-x-2">
                        {pages.map((page) => (
                            <button
                                key={page.id}
                                onClick={() => navigate(page.id)}
                                className={`text-sm font-medium transition-colors duration-300 focus-ring rounded-full px-4 py-2 ${
                                    currentPage === page.id ? 'bg-primary/10 text-primary font-semibold' : 'text-dark/70 hover:text-dark hover:bg-dark/5 dark:text-light/70 dark:hover:text-light dark:hover:bg-light/5'
                                }`}
                            >
                                {t(page.labelKey as any)}
                            </button>
                        ))}
                    </nav>
                    <div className="hidden lg:flex items-center space-x-4">
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                        <Button onClick={() => navigate('book-event')} variant="accent" className="!py-2 !px-4 !text-sm">
                            {t('navBookEvent')}
                        </Button>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <ThemeSwitcher />
                        <button onClick={() => setMenuOpen(!isMenuOpen)} className="p-2 rounded-full text-dark/70 hover:text-dark hover:bg-dark/5 dark:text-light/70 dark:hover:text-light dark:hover:bg-light/5 focus-ring" aria-label="Open menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden container mx-auto mt-2">
                    <div className="bg-light/90 backdrop-blur-xl shadow-lg rounded-2xl border border-dark/10 p-4 dark:bg-dark/90 dark:border-light/10">
                        <nav className="space-y-1">
                            {pages.map((page) => (
                                <button
                                    key={page.id}
                                    onClick={() => { navigate(page.id); setMenuOpen(false); }}
                                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 focus-ring ${
                                        currentPage === page.id ? 'bg-primary/20 text-primary' : 'text-dark/80 hover:bg-dark/10 hover:text-dark dark:text-light/80 dark:hover:bg-light/10 dark:hover:text-light'
                                    }`}
                                >
                                    {t(page.labelKey as any)}
                                </button>
                            ))}
                        </nav>
                        <div className="pt-4 mt-4 border-t border-dark/10 dark:border-light/10 flex flex-col items-center space-y-4">
                            <LanguageSwitcher />
                            <Button onClick={() => {navigate('book-event'); setMenuOpen(false); }} variant="accent" className="w-full">
                               {t('navBookEvent')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;