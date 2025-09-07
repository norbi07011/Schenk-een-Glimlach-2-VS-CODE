import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';
import { galleryImages, galleryVideos } from '../constants';
import GalleryCarousel from '../components/common/GalleryCarousel';
import VideoCarousel from '../components/common/VideoCarousel';

const GalleryPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="dark:bg-dark bg-light">
            <Section className="overflow-hidden pt-12">
                <PageTitle title={t('navGallery')} subtitle={t('gallerySubtitle')} />
                <div className="relative w-full h-[70vh] min-h-[600px] mt-8">
                    <GalleryCarousel items={galleryImages} />
                </div>
            </Section>
            <Section className="overflow-hidden">
                <PageTitle title={t('videoGalleryTitle')} subtitle={t('videoGallerySubtitle')} />
                <div className="relative w-full h-[70vh] min-h-[600px] mt-8">
                    <VideoCarousel items={galleryVideos} />
                </div>
            </Section>
        </div>
    );
};

export default GalleryPage;