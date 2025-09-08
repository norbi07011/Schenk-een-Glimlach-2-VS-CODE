
import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types';
import { pages } from '../constants';

interface FooterProps {
    navigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
    const { t } = useLanguage();
    const socialIconsRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = socialIconsRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const socialLinks = [
        { label: 'Facebook', href: 'https://facebook.com/twojprofil', path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z' },
        { label: 'Instagram', href: 'https://instagram.com/twojprofil', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z' },
        { label: 'YouTube', href: 'https://youtube.com/twojprofil', path: 'M10 15l5.19-3-5.19-3v6zm12-9c0-1.1-.9-2-2-2h-16c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-14zm-2 0v14h-16v-14h16zm-8 3.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/twojprofil', path: 'M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.25h-3v-4.5c0-1.08-.92-2-2-2s-2 .92-2 2v4.5h-3v-9h3v1.25c.41-.59 1.2-1.25 2.25-1.25 1.66 0 3 1.34 3 3v6z' }
    ];

    return (
        <footer className="bg-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Foundation Info */}
                    <div className="space-y-4">
                        <div className="text-2xl font-bold text-white">
                            Schenk een<span className="text-primary"> Glimlach</span>
                        </div>
                        <p className="text-sm text-gray-300">{t('footerFoundationName')}</p>
                        <p className="text-sm text-gray-300">{t('footerAddress')}</p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            <strong>{t('contactPhone')}:</strong> <a href="tel:0687846906" className="hover:underline">0687846906</a><br/>
                            <strong>{t('contactWhatsAppPhone')}:</strong> <a href="https://wa.me/31645094723" target="_blank" rel="noopener noreferrer" className="hover:underline">+31 6 45094723</a><br/>
                            <strong>{t('contactEmail')}:</strong> <a href="mailto:info@segim.ach.nl" className="hover:underline">info@segim.ach.nl</a>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-secondary mb-4">{t('footerLinks')}</h3>
                        <ul className="space-y-2">
                            {pages.slice(0, 6).map(page => (
                                <li key={page.id}>
                                    <button onClick={() => navigate(page.id)} className="text-sm text-gray-300 hover:text-white transition-colors duration-200 focus-ring rounded-sm">
                                        {t(page.labelKey as any)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Legal Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-secondary mb-4">{t('footerLegal')}</h3>
                         <ul className="space-y-2 text-sm text-gray-300">
                             <li><strong>{t('footerKVK')}:</strong> 76198251</li>
                             <li><strong>{t('footerNIP')}:</strong> NL860542531B01</li>
                        </ul>
                         <div className="mt-4">
                            <h3 className="text-lg font-semibold text-secondary mb-2">{t('footerPolicies')}</h3>
                            <ul className="space-y-2">
                                <li><button onClick={() => navigate('privacy-policy')} className="text-sm text-gray-300 hover:text-white transition-colors duration-200 focus-ring rounded-sm">{t('footerPrivacy')}</button></li>
                                <li><button onClick={() => navigate('cookies-policy')} className="text-sm text-gray-300 hover:text-white transition-colors duration-200 focus-ring rounded-sm">{t('footerCookies')}</button></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Social & Powered by */}
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-4">Media Społecznościowe</h3>
                        <div ref={socialIconsRef} className={`flex space-x-4 ${isVisible ? 'icons-visible' : ''}`}>
                             {socialLinks.map((link, index) => (
                                <a 
                                   key={link.label} 
                                   href={link.href} 
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={`social-icon social-icon-${index + 1} text-gray-300 hover:text-white transition-colors duration-200 focus-ring rounded-full p-1`} 
                                   aria-label={link.label}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={link.path}/></svg>
                                </a>
                            ))}
                        </div>
                        <div className="pt-4">
                             <p className="text-sm text-gray-400">{t('footerPoweredBy')}</p>
                             <p className="font-semibold text-gray-200">NORBS SERVICE</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} {t('footerFoundationName')}. {t('footerCopyright')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
