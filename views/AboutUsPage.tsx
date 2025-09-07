
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';
import { teamMembers } from '../constants';
import TeamCarousel from '../components/common/TeamCarousel';
import Button from '../components/common/Button';
import Carousel from '../components/common/Carousel';

interface AboutUsPageProps {
  navigate: (page: Page) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ navigate }) => {
    const { t } = useLanguage();

    const aboutUsImages = [
        "https://images.pexels.com/photos/16082613/pexels-photo-16082613/free-photo-of-a-group-of-children-playing-with-a-colorful-parachute.jpeg",
        "https://images.pexels.com/photos/8197627/pexels-photo-8197627.jpeg",
        "https://images.pexels.com/photos/7166613/pexels-photo-7166613.jpeg",
        "https://images.pexels.com/photos/8477298/pexels-photo-8477298.jpeg",
    ];

    const values = [
        { 
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ), 
            title: t('valueInclusionTitle'), 
            desc: t('valueInclusionDesc') 
        },
        { 
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ), 
            title: t('valueJoyTitle'), 
            desc: t('valueJoyDesc') 
        },
        { 
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ), 
            title: t('valueSafetyTitle'), 
            desc: t('valueSafetyDesc') 
        },
        { 
            icon: (
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ), 
            title: t('valueCommunityTitle'), 
            desc: t('valueCommunityDesc') 
        },
    ];

    const stats = [
        { value: '50+', label: t('impactEvents') },
        { value: '3000+', label: t('impactChildren') },
        { value: '25+', label: t('impactMunicipalities') },
    ];

    return (
        <>
            {/* Hero Section */}
            <Section className="relative bg-dark text-white text-center py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Carousel
                        images={aboutUsImages}
                        autoPlay={true}
                        interval={5000}
                        showControls={false}
                        showDots={false}
                        imageClassName="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-dark/60" />
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-semibold tracking-widest text-gray-300 uppercase">Children playing with a parachute</p>
                    <PageTitle title={t('navAboutUs')} subtitle={t('aboutUsSubtitle')} />
                    <p className="max-w-3xl mx-auto text-lg text-gray-200 leading-relaxed mt-[-2rem]">
                        {t('aboutUsMission')}
                    </p>
                </div>
            </Section>

            {/* Our Story Section */}
            <Section className="bg-white dark:bg-zinc-900">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl font-extrabold text-dark dark:text-light mb-6">{t('aboutUsStoryTitle')}</h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>{t('aboutUsStoryTextP1')}</p>
                            <p>{t('aboutUsStoryTextP2')}</p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <img src="https://i.pravatar.cc/500?u=1" alt="Alicja Vermeer, Founder" className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-square" />
                    </div>
                </div>
            </Section>

            {/* Our Values Section */}
            <Section className="bg-light dark:bg-dark">
                <h2 className="text-center text-4xl font-extrabold text-dark dark:text-light mb-12">{t('aboutUsValuesTitle')}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="benefit-card rounded-2xl">
                            <div className="benefit-card-content p-8 flex flex-col items-center text-center h-full">
                                <div className="w-20 h-20 mb-6 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center glow-shadow-primary">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-dark dark:text-light mb-2">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 flex-grow text-sm">{value.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>


            {/* Team Section */}
            <Section className="bg-dark dark:bg-black overflow-hidden py-20 md:py-28">
                <TeamCarousel members={teamMembers} />
            </Section>
            
            {/* Impact Highlights Section */}
             <Section className="bg-zinc-900 dark:bg-black text-light">
                <h2 className="text-center text-4xl font-extrabold mb-10">{t('impactTitle')}</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                    {stats.map(stat => (
                        <div key={stat.label}>
                            <p className="text-5xl font-extrabold text-primary">{stat.value}</p>
                            <p className="mt-2 text-lg font-medium text-light/80">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Join Us CTA Section */}
            <Section>
                <div className="text-center bg-dark p-8 md:p-12 rounded-2xl shadow-xl aurora-border max-w-4xl mx-auto">
                    <div className="relative bg-dark/90 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                        <h2 className="text-3xl font-extrabold text-light mb-4">{t('joinUsTitle')}</h2>
                        <p className="text-light/80 max-w-2xl mx-auto mb-8">{t('joinUsDesc')}</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button variant="accent" onClick={() => navigate('volunteering')}>
                                {t('joinUsButtonVolunteer')}
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('sponsors')}>
                                {t('joinUsButtonSponsor')}
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default AboutUsPage;