import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page, Testimonial } from '../types';
import { testimonials } from '../constants';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';
import Accordion from '../components/common/Accordion';
import ChatBox from '../components/views/for-parents/ChatBox';
import Button from '../components/common/Button';
import Carousel from '../components/common/Carousel';
import Card from '../components/common/Card';

interface ForParentsPageProps {
  navigate: (page: Page) => void;
}

const WelcomeSection: React.FC = () => {
    const { t } = useLanguage();
    const heroImages = [
        "https://images.pexels.com/photos/8197627/pexels-photo-8197627.jpeg",
        "https://images.pexels.com/photos/16082613/pexels-photo-16082613/free-photo-of-a-group-of-children-playing-with-a-colorful-parachute.jpeg",
        "https://images.pexels.com/photos/8939988/pexels-photo-8939988.jpeg",
        "https://images.pexels.com/photos/7166613/pexels-photo-7166613.jpeg",
    ];
    return (
        <Section className="py-0 relative h-[60vh] min-h-[500px] w-full text-white flex items-center justify-center text-center">
            <div className="absolute inset-0 z-0">
                 <Carousel images={heroImages} autoPlay={true} interval={6000} />
                 <div className="absolute inset-0 bg-dark/60"></div>
            </div>
            <div className="relative z-10 p-4">
                 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>{t('forParentsWelcomeTitle')}</h1>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.7)' }}>{t('forParentsWelcomeSubtitle')}</p>
            </div>
        </Section>
    );
}

const SafetySection: React.FC = () => {
    const { t } = useLanguage();
    const safetyItems = [
        { icon: '👩‍🏫', title: t('safetyQualifiedStaff') },
        { icon: '🏰', title: t('safetyAdaptedAttractions') },
        { icon: '🧘', title: t('safetyQuietZone') },
        { icon: '🚧', title: t('safetySecureArea') } // Changed icon
    ];
    return (
        <Section className="bg-light dark:bg-zinc-900">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark dark:text-light tracking-tight">{t('safetyTitle')}</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
                {safetyItems.map(item => (
                    <div key={item.title} className="benefit-card rounded-2xl">
                        <div className="benefit-card-content p-6 flex flex-col items-center h-full">
                            <div className="text-5xl mb-4">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-dark dark:text-light">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const WhatToExpectSection: React.FC = () => {
    const { t } = useLanguage();
    const steps = [
        { icon: '🎟️', title: t('expectStep1Title'), desc: t('expectStep1Desc') },
        { icon: '🤸', title: t('expectStep2Title'), desc: t('expectStep2Desc') },
        { icon: '🎭', title: t('expectStep3Title'), desc: t('expectStep3Desc') },
        { icon: '🥪', title: t('expectStep4Title'), desc: t('expectStep4Desc') },
    ];
    return (
        <Section>
            <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-dark dark:text-light tracking-tight">{t('whatToExpectTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <div key={index} className="benefit-card rounded-2xl">
                        <div className="benefit-card-content p-6 flex flex-col items-center text-center h-full">
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 flex-grow">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const FaqSection: React.FC = () => {
    const { t } = useLanguage();
    const faqItems = [
        { title: t('faqQ1'), content: t('faqA1') },
        { title: t('faqQ2'), content: t('faqA2') },
        { title: t('faqQ3'), content: t('faqA3') },
        { title: t('faqQ4'), content: t('faqA4') },
        { title: t('faqQ5'), content: t('faqA5') },
        { title: t('faqQ6'), content: t('faqA6') },
        { title: t('faqQ7'), content: t('faqA7') },
        { title: t('faqQ8'), content: t('faqA8') },
        { title: t('faqQ9'), content: t('faqA9') },
        { title: t('faqQ10'), content: t('faqA10') },
        { title: t('faqQ11'), content: t('faqA11') },
    ];
    return (
        <Section className="bg-light dark:bg-zinc-900">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark dark:text-light tracking-tight">{t('faqTitle')}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
                <Accordion items={faqItems} />
            </div>
        </Section>
    );
};

const TestimonialsSection: React.FC = () => {
    const { t } = useLanguage();
    // Using the first and third testimonials for variety
    const parentTestimonials: Testimonial[] = [testimonials[0], testimonials[2]]; 
    
    return (
        <Section>
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-dark dark:text-light mb-12">{t('testimonialsParentsTitle')}</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {parentTestimonials.map((testimonial, i) => (
                    <Card key={i}>
                        <div className="text-light/90 flex flex-col h-full">
                            <p className="italic flex-grow">"{t(testimonial.quoteKey as any)}"</p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <p className="font-bold text-primary">{testimonial.authorKey}</p>
                                <p className="text-sm text-light/70">{t(testimonial.roleKey as any)}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

const ResourcesSection: React.FC = () => {
    const { t } = useLanguage();
    
    const handleDownload = (type: 'social-story' | 'checklist') => {
        const title = type === 'social-story' ? t('resourcesSocialStoryTitle') : t('resourcesChecklistTitle');
        const desc = type === 'social-story' ? t('resourcesSocialStoryDesc') : t('resourcesChecklistDesc');
        const content = `${title}\n\n${desc}\n\n(To jest przykładowy plik demonstracyjny)`;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const resources = [
        { icon: '📖', title: t('resourcesSocialStoryTitle'), desc: t('resourcesSocialStoryDesc'), type: 'social-story' as const },
        { icon: '📋', title: t('resourcesChecklistTitle'), desc: t('resourcesChecklistDesc'), type: 'checklist' as const }
    ];
    return (
         <Section className="bg-light dark:bg-zinc-900">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark dark:text-light tracking-tight">{t('resourcesTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {resources.map((res, i) => (
                    <div key={i} className="benefit-card rounded-2xl">
                        <div className="benefit-card-content p-8 flex flex-col text-center items-center h-full">
                            <div className="text-5xl mb-4">{res.icon}</div>
                            <h3 className="text-xl font-bold text-dark dark:text-light mb-2">{res.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{res.desc}</p>
                            <Button variant="secondary" onClick={() => handleDownload(res.type)}>{t('resourcesDownloadButton')}</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const ChatSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Section>
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-dark dark:text-light tracking-tight">{t('chatTitle')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">{t('chatDescription')}</p>
            </div>
            <div className="max-w-3xl mx-auto">
                <ChatBox />
            </div>
        </Section>
    )
}

const CtaSection: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    const { t } = useLanguage();
    return (
         <Section className="bg-light dark:bg-zinc-900">
            <div className="text-center bg-white dark:bg-dark p-8 md:p-12 rounded-2xl shadow-xl aurora-border">
              <div className="relative bg-dark/90 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h2 className="text-3xl font-extrabold text-light mb-4">{t('ctaParentsTitle')}</h2>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                     <Button variant="accent" onClick={() => navigate('events')} className="w-full sm:w-auto">
                        {t('ctaParentsButton')}
                    </Button>
                    <button onClick={() => navigate('contact')} className="font-semibold text-primary hover:underline focus-ring rounded-md">
                        {t('ctaParentsLink')}
                    </button>
                </div>
              </div>
            </div>
        </Section>
    )
}


const ForParentsPage: React.FC<ForParentsPageProps> = ({ navigate }) => {
    const { t } = useLanguage();
    return (
        <>
            <WelcomeSection />
            <SafetySection />
            <WhatToExpectSection />
            <FaqSection />
            <TestimonialsSection />
            <ResourcesSection />
            <ChatSection />
            <CtaSection navigate={navigate} />
        </>
    );
};

export default ForParentsPage;