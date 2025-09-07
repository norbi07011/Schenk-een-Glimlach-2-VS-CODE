
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';
import Button from '../components/common/Button';
import { Page } from '../types';

interface ForMunicipalitiesPageProps {
  navigate: (page: Page) => void;
}

const ForMunicipalitiesPage: React.FC<ForMunicipalitiesPageProps> = ({ navigate }) => {
    const { t } = useLanguage();
    return (
        <Section>
            <PageTitle title={t('navForMunicipalities')} subtitle="Tutaj znajdą się szczegółowe informacje dla gmin i szkół." />
            <div className="text-center">
              <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
                Strona w budowie. Docelowo znajdą się tu informacje o modelu finansowania, korzyściach dla gminy oraz pakiety do pobrania.
              </p>
              <Button onClick={() => navigate('book-event')} variant="primary">
                {t('heroCta1')}
              </Button>
            </div>
        </Section>
    );
};

export default ForMunicipalitiesPage;
