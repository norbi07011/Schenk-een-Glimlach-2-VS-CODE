
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// A simple form input component to reduce repetition
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
const FormInput: React.FC<FormInputProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-light/90 mb-1">{label}</label>
        <input id={id} className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" {...props} />
    </div>
);

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: string[];
}
const FormSelect: React.FC<FormSelectProps> = ({ label, id, options, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-light/90 mb-1">{label}</label>
        <select id={id} className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" {...props}>
            {options.map(opt => <option key={opt} value={opt} className="bg-dark">{opt}</option>)}
        </select>
    </div>
);


const BookEventPage: React.FC = () => {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Section className="flex items-center justify-center min-h-[60vh]">
                <Card className="text-center max-w-lg">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold text-primary mb-2">{t('rfpSuccessTitle')}</h2>
                    <p className="text-light/80">{t('rfpSuccessMessage')}</p>
                </Card>
            </Section>
        );
    }

    return (
        <Section>
            <PageTitle title={t('bookEventTitle')} subtitle={t('bookEventSubtitle')} />
            <div className="max-w-4xl mx-auto">
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormSelect label={t('rfpEntityType')} id="entity-type" options={t('rfpEntityTypeOptions').split(',')} />
                            <FormInput label={t('rfpEntityName')} id="entity-name" type="text" required />
                        </div>
                         <FormInput label={t('rfpNipKvk')} id="nip-kvk" type="text" required />
                        <hr className="border-white/20"/>
                         <h3 className="text-lg font-semibold text-light pt-2">Dane Kontaktowe</h3>
                         <div className="grid md:grid-cols-2 gap-6">
                           <FormInput label={t('rfpContactPerson')} id="contact-person" type="text" required />
                           <FormInput label={t('rfpEmail')} id="email" type="email" required />
                           <FormInput label={t('rfpPhone')} id="phone" type="tel" required />
                           <FormInput label={t('rfpWhatsApp')} id="whatsapp" type="tel" />
                        </div>
                        <hr className="border-white/20"/>
                        <h3 className="text-lg font-semibold text-light pt-2">Szczegóły Wydarzenia</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                             <FormInput label={t('rfpCity')} id="city" type="text" required />
                             <FormInput label={t('rfpProposedDate')} id="proposed-date" type="date" required />
                             <FormInput label={t('rfpAlternativeDates')} id="alt-dates" type="text" />
                             <FormInput label={t('rfpVenueAddress')} id="venue-address" type="text" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormSelect label={t('rfpVenueType')} id="venue-type" options={t('rfpVenueTypeOptions').split(',')} />
                             <div>
                                <label className="block text-sm font-medium text-light/90 mb-1">{t('rfpElectricityAccess')}</label>
                                <div className="flex items-center space-x-4 text-light/90">
                                     <label className="flex items-center"><input type="radio" name="electricity" className="focus-ring mr-2" /> Tak</label>
                                     <label className="flex items-center"><input type="radio" name="electricity" className="focus-ring mr-2"/> Nie</label>
                                </div>
                            </div>
                        </div>
                         <FormInput label={t('rfpParticipants')} id="participants" type="text" />
                         <FormInput label={t('rfpAccessibilityNeeds')} id="accessibility" type="text" placeholder="np. rampa, toalety, ciche strefy"/>

                        <div className="grid md:grid-cols-2 gap-6">
                           <FormInput label={t('rfpBudget')} id="budget" type="text" />
                           <FormSelect label={t('rfpFundingSource')} id="funding-source" options={t('rfpFundingSourceOptions').split(',')} />
                        </div>

                         <div>
                            <label htmlFor="file-upload" className="block text-sm font-medium text-light/90 mb-1">{t('rfpFileUpload')}</label>
                            <input id="file-upload" type="file" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 focus-ring"/>
                        </div>
                        
                        <div className="pt-4">
                             <label className="flex items-start">
                                <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-secondary focus-ring mt-0.5" required />
                                <span className="ml-2 text-sm text-light/80">{t('rfpConsent')}</span>
                            </label>
                        </div>
                        
                        <div className="text-center pt-4">
                             <Button type="submit" variant="accent" className="w-full md:w-auto">{t('rfpSubmit')}</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Section>
    );
};

export default BookEventPage;