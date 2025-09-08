import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types';
import Button from '../components/common/Button';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import { testimonials, eventPackageCategories, events } from '../constants';
import Carousel from '../components/common/Carousel';
import HeroCarousel from '../components/common/HeroCarousel';
import InteractiveCanvas from '../components/common/InteractiveCanvas';
import ThreeDCarousel from '../components/common/ThreeDCarousel';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import HomeEventsPreview, { EventItem } from '../components/home/HomeEventsPreview';
import GlassCard from '../components/common/GlassCard';
import { HomeHeroCTA } from '../components/HomeHeroCTA';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const Hero: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    const { t } = useLanguage();
    const heroImages = [
        "/images/Zrzut%20ekranu%202025-09-07%20011033.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011047.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011102.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011112.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011125.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011149.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011219.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011245.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011919.png",
        "/images/Zrzut%20ekranu%202025-09-07%20011931.png",
        "/images/Zrzut%20ekranu%202025-09-07%20012025.png",
        "/images/Zrzut%20ekranu%202025-09-07%20012101.png"
    ];

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full bg-dark text-white overflow-hidden">
        <InteractiveCanvas />
        {/* The combined carousel component renders its own background and the 3D panel */}
        <HeroCarousel images={heroImages} />

        {/* Container for the text content, positioned on top and to the left */}
        <div className="absolute inset-0 z-10 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                        {t('heroHeadline')}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-200" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.7)' }}>
                        {t('heroSub')}
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Button variant="accent" onClick={() => navigate('book-event')}>{t('heroCta1')}</Button>
                        <Button variant="secondary" onClick={() => navigate('events')}>{t('heroCta2')}</Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

const Partners: React.FC = () => {
    const { t, language } = useLanguage();
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

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

    return (
        <Section ref={ref} className={`bg-white dark:bg-zinc-900 overflow-hidden ${isVisible ? 'is-visible' : 'animate-on-scroll'}`}>
            <h2 className="text-center text-4xl font-extrabold text-dark dark:text-light mb-4">{t('partnersTitle')}</h2>
            <ThreeDCarousel items={partners} />
        </Section>
    );
};

const EventPackage: React.FC = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });
    const [activeCategoryId, setActiveCategoryId] = useState(eventPackageCategories[0].id);

    const activeCategory = eventPackageCategories.find(c => c.id === activeCategoryId);

    return (
        <Section ref={ref} className={`bg-dark ${isVisible ? 'is-visible' : 'animate-on-scroll'}`}>
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-white">{t('eventPackageTitle')}</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">{t('eventPackageDesc')}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Panel: Category List */}
                <GlassCard className="lg:col-span-4 xl:col-span-3 p-3">
                    <div className="flex flex-col gap-2 h-full max-h-[480px] overflow-y-auto pr-1">
                        {eventPackageCategories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategoryId(cat.id)}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 focus-ring flex items-center gap-3 ${
                                    cat.id === activeCategoryId
                                    ? 'ring-2 ring-cyan-400 bg-white/15 border-white/30'
                                    : 'border border-transparent hover:bg-white/10'
                                }`}
                            >
                                <span className="text-2xl">{cat.icon}</span>
                                <div>
                                    <p className="font-semibold text-light text-base">{t(cat.titleKey as any)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </GlassCard>

                {/* Middle Panel: Image & Title */}
                <GlassCard className="lg:col-span-5 xl:col-span-5 p-4">
                    {activeCategory ? (
                        <div key={activeCategory.id} className="fade-in-content w-full h-full flex flex-col">
                            <img
                                src={activeCategory.imageUrl}
                                alt={t(activeCategory.titleKey as any)}
                                className="w-full flex-grow object-cover rounded-xl shadow-lg"
                            />
                             <h3 className="text-2xl font-extrabold text-cyan-300 mt-3">{t(activeCategory.titleKey as any)}</h3>
                        </div>
                    ) : null }
                </GlassCard>

                {/* Right Panel: List of items */}
                <GlassCard className="lg:col-span-3 xl:col-span-4 p-4">
                    {activeCategory && (
                        <div className="fade-in-content h-full overflow-y-auto pr-1">
                             <ul className="space-y-3">
                                {activeCategory.itemsKeys.map(item => (
                                    <li key={item.key} className="flex items-start text-slate-200 text-sm">
                                        <span className="text-xl mr-3">{item.icon}</span>
                                        <span>{t(item.key as any)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </GlassCard>
            </div>
        </Section>
    );
};


const Impact: React.FC = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.3 });
    const stats = [
        { value: '50+', label: t('impactEvents') },
        { value: '3000+', label: t('impactChildren') },
        { value: '25+', label: t('impactMunicipalities') },
    ];
    return (
        <Section ref={ref} className={`bg-zinc-900 dark:bg-black text-light ${isVisible ? 'is-visible' : 'animate-on-scroll'}`}>
            <h2 className="text-center text-4xl font-extrabold mb-10">{t('impactTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-5xl font-extrabold text-primary">{stat.value}</p>
                        <p className="mt-2 text-lg font-medium text-light/80">{stat.label}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const WhySupportUs: React.FC = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.2 });

    const benefits = [
        { 
            icon: (
                <svg className="w-12 h-12 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: t('valueInclusionTitle'), desc: t('valueInclusionDesc')
        },
        { 
            icon: (
                <svg className="w-12 h-12 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ), 
            title: t('valueJoyTitle'), desc: t('valueJoyDesc')
        },
        { 
            icon: (
                <svg className="w-12 h-12 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ), 
            title: t('valueSafetyTitle'), desc: t('valueSafetyDesc')
        },
        { 
            icon: (
                <svg className="w-12 h-12 text-primary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ), 
            title: t('valueCommunityTitle'), desc: t('valueCommunityDesc')
        },
    ];

    return (
        <Section ref={ref} className="bg-dark relative">
             <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30" style={{ backgroundImage: 'radial-gradient(circle at top left, var(--tw-color-primary) 0%, transparent 30%), radial-gradient(circle at bottom right, var(--tw-color-accent) 0%, transparent 40%)' }}></div>
            <div className="relative z-10">
                <h2 className="text-center text-4xl font-extrabold text-light mb-16">{t('sponsorsBenefitsTitle')}</h2>
                <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ${isVisible ? 'is-visible' : ''}`}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className={`benefit-card animate-on-scroll animate-delay-${index + 1} rounded-2xl`}>
                            <div className="benefit-card-content p-8 flex flex-col items-center text-center h-full">
                                {benefit.icon}
                                <h3 className="text-xl font-bold text-light mb-2">{benefit.title}</h3>
                                <p className="text-gray-300 flex-grow text-sm">{benefit.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const Testimonials: React.FC = () => {
    const { t } = useLanguage();
    const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.2 });
    return (
        <Section ref={ref} className={`bg-dark ${isVisible ? 'is-visible' : 'animate-on-scroll'}`}>
            <h2 className="text-center text-4xl font-extrabold text-light mb-12">{t('testimonialsTitle')}</h2>
            <div className="grid lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, i) => (
                    <Card key={i}>
                        <div className="text-light/90">
                            <p className="italic">"{t(testimonial.quoteKey as any)}"</p>
                            <div className="mt-4">
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


const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { t } = useLanguage();

  const mappedEvents = useMemo((): EventItem[] => {
    return events.map(event => {
      const { lat, lon } = event.coordinates;
      return {
        id: event.id.toString(),
        city: t(event.cityKey as any),
        venue: t(event.venueKey as any),
        dateISO: event.date,
        time: "12:00–16:00", // Default time
        outdoor: event.type === 'outdoor',
        imageUrl: event.imageUrl,
        summary: t(event.descriptionKey as any),
        mapLink: `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lon}`
      };
    });
  }, [t]);

  return (
    <div className="bg-dark">
            <Hero navigate={navigate} />
            <HomeHeroCTA />
      <Partners />
      <HomeEventsPreview events={mappedEvents} />
      <EventPackage />
      <Impact />
      <WhySupportUs />
      <Testimonials />
    </div>
  );
};

export default HomePage;