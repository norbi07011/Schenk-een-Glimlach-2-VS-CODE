
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Section>
            <PageTitle title={t('privacyPolicyTitle')} subtitle="" />
            <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                   {t('privacyPolicyContent')}
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                 <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </Section>
    );
};

export default PrivacyPolicyPage;
