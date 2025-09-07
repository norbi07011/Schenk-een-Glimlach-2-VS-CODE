
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';

const ImpactPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Section>
            <PageTitle title={t('navImpact')} subtitle="Zobacz, jak nasza działalność zmienia świat na lepsze." />
            <div className="text-center">
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Strona w budowie. Wkrótce pojawią się tu liczniki, raporty roczne, case studies i mapa naszych działań.
              </p>
            </div>
        </Section>
    );
};

export default ImpactPage;
