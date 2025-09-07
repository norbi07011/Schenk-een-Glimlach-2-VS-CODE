import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types';
import { sponsorshipPackages, sponsorsLogos } from '../constants';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import Accordion from '../components/common/Accordion';
import Card from '../components/common/Card';
import ThreeDCarousel from '../components/common/ThreeDCarousel';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import Carousel from '../components/common/Carousel';

interface SponsorsPageProps {
  navigate: (page: Page) => void;
}

const SponsorsPage: React.FC<SponsorsPageProps> = ({ navigate }) => {
    const { t, language } = useLanguage();
    const formRef = useRef<HTMLElement>(null);
    const [submitted, setSubmitted] = useState(false);
    const { ref: partnersSectionRef, isVisible: partnersVisible } = useAnimateOnScroll({ threshold: 0.1 });
    const { ref: benefitsSectionRef, isVisible: benefitsVisible } = useAnimateOnScroll({ threshold: 0.2 });

    const partners = [
        { name: "Party Accessoires Verhuur", href: "https://partyaccessoiresverhuur.com/", image: "https://picsum.photos/seed/party/400/600" },
        { name: "The Mind Garden", href: "https://www.themindgarden.nl/", image: "https://picsum.photos/seed/mindgarden/400/600" },
        { name: "Jumpfun Ypenburg", href: "https://www.jumpfunypenburg.nl/", image: "https://picsum.photos/seed/jumpfun/400/600" },
        { name: language === 'pl' ? 'Nasz Partner' : 'Onze Partner', image: "https://picsum.photos/seed/partner1/400/600" },
        { name: language === 'pl' ? 'Wkrótce...' : 'Binnenkort...', image: "https://picsum.photos/seed/partner2/400/600" },
        { name: "Partner 6", image: "https://picsum.photos/seed/partner3/400/600" },
        { name: "Partner 7", image: "https://picsum.photos/seed/partner4/400/600" },
        { name: "Partner 8", image: "https://picsum.photos/seed/partner5/400/600" },
    ];
    
    const partnerImages = partners.map(p => p.image);

    const handleDownloadOffer = () => {
        const content = "Sponsorship Offer - Fundacja Schenk een Glimlach\n\nDetails about our packages...";
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sponsorship-offer-schenk-een-glimlach.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleScrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const benefits = [
        { 
            icon: (
                <svg className="w-12 h-12 text-primary mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12.0001 21.3501C11.6901 21.3501 11.3801 21.2301 11.1501 21.0001L4.28009 14.1301C2.39009 12.2401 2.39009 9.14009 4.28009 7.25009C6.17009 5.36009 9.27009 5.36009 11.1601 7.25009L12.0001 8.09009L12.8401 7.25009C14.7301 5.36009 17.8301 5.36009 19.7201 7.25009C21.6101 9.14009 21.6101 12.2401 19.7201 14.1301L12.8501 21.0001C12.6201 21.2301 12.3101 21.3501 12.0001 21.3501Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.7,11.38L21.4,9.55" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.6001,9.55L5.3001,11.38" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.7,4.62L21.4,6.45" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.6001,6.45L5.3001,4.62" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
            title: t('sponsorsBenefit1Title'), desc: t('sponsorsBenefit1Desc')
        },
        { 
            icon: (
                <svg className="w-12 h-12 text-primary mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                     <path d="M15.5,12C15.5,13.93,13.93,15.5,12,15.5C10.07,15.5,8.5,13.93,8.5,12C8.5,10.07,10.07,8.5,12,8.5C13.93,8.5,15.5,10.07,15.5,12Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2,12C3.89,7.11,7.57,4,12,4C16.43,4,20.11,7.11,22,12C20.11,16.89,16.43,20,12,20C7.57,20,3.89,16.89,2,12Z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ), 
            title: t('sponsorsBenefit2Title'), desc: t('sponsorsBenefit2Desc')
        },
        { 
            icon: (
                 <svg className="w-12 h-12 text-primary mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18.4,22H5.6C5.27,22,5,21.73,5,21.4V19.95C5,19.62,5.27,19.35,5.6,19.35H18.4C18.73,19.35,19,19.62,19,19.95V21.4C19,21.73,18.73,22,18.4,22Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.21,19.35L12.54,16.65H11.46L9.79,19.35" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12,14.52V16.65" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.6,9.13C14.6,7.74,13.43,6.58,12,6.58C10.57,6.58,9.4,7.74,9.4,9.13C9.4,9.6,9.54,10.04,9.79,10.42L12,14.52L14.21,10.42C14.46,10.04,14.6,9.6,14.6,9.13Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22,9.13V5.6C22,5.27,21.73,5,21.4,5H17.84" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2,5.6V9.13" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.16,5H2.6C2.27,5,2,5.27,2,5.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
             title: t('sponsorsBenefit3Title'), desc: t('sponsorsBenefit3Desc'),
             highlighted: true,
        },
        { 
            icon: (
                <svg className="w-12 h-12 text-primary mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8.5,10.5C9.32843,10.5 10,9.82843 10,9C10,8.17157 9.32843,7.5 8.5,7.5C7.67157,7.5 7,8.17157 7,9C7,9.82843 7.67157,10.5 8.5,10.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5,5H7.5C4.74,5,2.5,7.24,2.5,10V14C2.5,16.76,4.74,19,7.5,19H16.5C19.26,19,21.5,16.76,21.5,14V10C21.5,7.24,19.26,5,16.5,5Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5,9.5V11.5L16.5,10.5L14.5,11.5V9.5C14.5,8.95 14.95,8.5 15.5,8.5H17.5C18.05,8.5,18.5,8.95,18.5,9.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ), 
            title: t('sponsorsBenefit4Title'), desc: t('sponsorsBenefit4Desc')
        },
    ];
    
    const faqItems = [
        { title: t('sponsorsFaqQ1'), content: t('sponsorsFaqA1') },
        { title: t('sponsorsFaqQ2'), content: t('sponsorsFaqA2') },
        { title: t('sponsorsFaqQ3'), content: t('sponsorsFaqA3') },
    ];

    return (
        <>
            {/* Hero Section */}
            <Section className="relative bg-dark text-white text-center py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Carousel
                        images={partnerImages}
                        autoPlay={true}
                        interval={4000}
                        showControls={false}
                        showDots={false}
                        imageClassName="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-dark/70" />
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-semibold tracking-widest text-gray-300 uppercase">Children playing together</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{t('sponsorsHeroTitle')}</h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-200">{t('sponsorsHeroSubtitle')}</p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" onClick={handleDownloadOffer}>{t('sponsorsCtaDownload')}</Button>
                        <Button variant="secondary" onClick={handleScrollToForm}>{t('sponsorsCtaContact')}</Button>
                    </div>
                </div>
            </Section>

            {/* Current Sponsors */}
            <Section ref={partnersSectionRef} className={`bg-white dark:bg-zinc-900 overflow-hidden ${partnersVisible ? 'is-visible' : 'animate-on-scroll'}`}>
                <h2 className="text-center text-4xl font-extrabold text-dark dark:text-light mb-4">{t('sponsorsLogosTitle')}</h2>
                <ThreeDCarousel items={partners} />
            </Section>

            {/* Benefits Section */}
            <Section ref={benefitsSectionRef} className="bg-light dark:bg-dark relative">
                 <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30" style={{ backgroundImage: 'radial-gradient(circle at top left, var(--tw-color-primary) 0%, transparent 30%), radial-gradient(circle at bottom right, var(--tw-color-accent) 0%, transparent 40%)' }}></div>
                <div className="relative z-10">
                    <h2 className="text-center text-4xl font-extrabold text-dark dark:text-light mb-16">{t('sponsorsBenefitsTitle')}</h2>
                    <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ${benefitsVisible ? 'is-visible' : ''}`}>
                        {benefits.map((benefit, index) => (
                            <div key={index} className={`benefit-card animate-on-scroll animate-delay-${index + 1} rounded-2xl ${benefit.highlighted ? 'highlighted' : ''}`}>
                                <div className="benefit-card-content p-8 flex flex-col items-center text-center">
                                    {benefit.icon}
                                    <h3 className="text-xl font-bold text-dark dark:text-light mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 flex-grow text-sm">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Packages Section */}
            <Section className="bg-light dark:bg-zinc-900">
                <h2 className="text-center text-4xl font-extrabold text-dark dark:text-light mb-12">{t('sponsorsPackagesTitle')}</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    {sponsorshipPackages.map((pkg) => (
                        <div key={pkg.id} className={`benefit-card rounded-2xl ${pkg.highlight ? 'highlighted' : ''}`}>
                            <div className="benefit-card-content p-8 flex flex-col text-center h-full">
                                <h3 className="text-2xl font-bold text-primary mb-2">{t(pkg.titleKey as any)}</h3>
                                <p className="text-3xl font-bold text-dark dark:text-light mb-6">{t(pkg.priceKey as any)}</p>
                                <ul className="space-y-3 text-left text-gray-600 dark:text-gray-300 flex-grow mb-8">
                                    {pkg.featuresKeys.map(key => (
                                        <li key={key} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                            <span>{t(key as any)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant={pkg.highlight ? 'accent' : 'secondary'} onClick={handleScrollToForm} className="mt-auto">
                                    {t('sponsorsPackageCta')}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            
            {/* Sponsor Form Section */}
            <Section ref={formRef} id="sponsor-form" className="bg-light dark:bg-zinc-900">
                <div className="max-w-3xl mx-auto">
                     <h2 className="text-center text-4xl font-extrabold text-dark dark:text-light mb-4">{t('sponsorsFormTitle')}</h2>
                     <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">{t('sponsorsFormSubtitle')}</p>
                     {submitted ? (
                        <Card className="text-center">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-3xl font-bold text-primary mb-2">{t('sponsorsFormSuccessTitle')}</h2>
                            <p className="text-light/80">{t('sponsorsFormSuccessMessage')}</p>
                        </Card>
                     ) : (
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input placeholder={t('sponsorsFormCompany')} required className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" />
                                    <input placeholder={t('sponsorsFormContactPerson')} required className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="email" placeholder={t('sponsorsFormEmail')} required className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" />
                                    <input type="tel" placeholder={t('sponsorsFormPhone')} required className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" />
                                </div>
                                <div>
                                    <select required className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring">
                                        <option value="">{t('sponsorsFormPackage')}</option>
                                        {sponsorshipPackages.map(p => <option key={p.id} value={p.id}>{t(p.titleKey as any)}</option>)}
                                        <option value="other">{t('sponsorsFormPackageOptionOther')}</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea placeholder={t('sponsorsFormIdea')} rows={4} className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" />
                                </div>
                                <div className="pt-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-secondary focus-ring" />
                                        <span className="ml-2 text-sm text-light/80">{t('sponsorsFormInvoice')}</span>
                                    </label>
                                </div>
                                <div className="text-center pt-4">
                                    <Button type="submit" variant="accent" className="w-full md:w-auto">{t('sponsorsFormSubmit')}</Button>
                                </div>
                            </form>
                        </Card>
                     )}
                </div>
            </Section>
            
            {/* Donations Section */}
            <Section>
                <div className="max-w-3xl mx-auto text-center bg-white dark:bg-dark p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-extrabold text-dark dark:text-light mb-4">{t('sponsorsDonationTitle')}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{t('sponsorsDonationDesc')}</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="primary" onClick={() => alert('Redirect to payment gateway for 25€')}>25 €</Button>
                        <Button variant="primary" onClick={() => alert('Redirect to payment gateway for 50€')}>50 €</Button>
                        <Button variant="primary" onClick={() => alert('Redirect to payment gateway for 100€')}>100 €</Button>
                    </div>
                </div>
            </Section>

            {/* FAQ Section */}
            <Section className="bg-light dark:bg-zinc-900">
                <h2 className="text-center text-4xl font-extrabold text-dark dark:text-light mb-12">{t('sponsorsFaqTitle')}</h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion items={faqItems} />
                </div>
            </Section>
        </>
    );
};

export default SponsorsPage;