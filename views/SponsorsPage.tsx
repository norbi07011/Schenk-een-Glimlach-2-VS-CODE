import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';

const SponsorsPage: React.FC = () => {
    const { t } = useLanguage();
    const faqItems = [
        { title: t('sponsorsFaqQ1'), content: t('sponsorsFaqA1') },
        { title: t('sponsorsFaqQ2'), content: t('sponsorsFaqA2') },
        { title: t('sponsorsFaqQ3'), content: t('sponsorsFaqA3') },
    ];

    return (
        <Section className="py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{t('sponsorsFaqTitle')}</h2>
            <div className="max-w-3xl mx-auto">
                <ul>
                    {faqItems.map((item, idx) => (
                        <li key={idx} className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-700">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
                                    <input type="email" name="email" placeholder={t('sponsorsFormEmail')} required className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" />
                                    <input type="tel" name="phone" placeholder={t('sponsorsFormPhone')} required className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" />
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
    );
};

export default SponsorsPage;