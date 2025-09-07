import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';

// Reusable input component for consistency
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
const FormInput: React.FC<FormInputProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-light/90 mb-1">{label}</label>
        <input id={id} className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" {...props} required />
    </div>
);

// Reusable textarea component
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}
const FormTextarea: React.FC<FormTextareaProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-light/90 mb-1">{label}</label>
        <textarea id={id} rows={5} className="w-full px-3 py-2 border border-gray-600 bg-dark/50 text-light rounded-md shadow-sm focus:ring-primary focus:border-primary focus-ring" {...props} required />
    </div>
);

const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    
    const [emailForm, setEmailForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [whatsappForm, setWhatsappForm] = useState({ name: '', message: '' });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
    };

    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setWhatsappForm({ ...whatsappForm, [e.target.name]: e.target.value });
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, subject, message } = emailForm;
        const body = `Wiadomość od: ${name} (${email})\n\n${message}`;
        const mailto = `mailto:info@segim.ach.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    };

    const handleWhatsappSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, message } = whatsappForm;
        const text = `Wiadomość od ${name}:\n${message}`;
        const url = `https://wa.me/31645094723?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Section>
            <PageTitle title={t('navContact')} subtitle={t('contactSubtitle')} />
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                {/* Email Form */}
                <div className="aurora-border rounded-2xl glow-shadow-blue">
                    <div className="bg-dark/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full w-full">
                        <h3 className="text-2xl font-bold text-light text-center mb-1">{t('contactEmailTitle')}</h3>
                        <p className="text-sm text-center text-gray-300 mb-6">{t('contactFormSend')}</p>
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <FormInput label={t('contactFormName')} id="name" name="name" type="text" value={emailForm.name} onChange={handleEmailChange} placeholder={t('contactFormName')} />
                            <FormInput label={t('contactFormEmail')} id="email" name="email" type="email" value={emailForm.email} onChange={handleEmailChange} placeholder={t('contactFormEmail')} />
                            <FormInput label={t('contactFormSubject')} id="subject" name="subject" type="text" value={emailForm.subject} onChange={handleEmailChange} placeholder={t('contactFormSubject')} />
                            <FormTextarea label={t('contactFormMessage')} id="message" name="message" value={emailForm.message} onChange={handleEmailChange} placeholder={t('contactFormMessage')} />
                            <div className="text-left">
                                <button type="submit" className="font-bold text-white py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:brightness-110 focus-ring bg-gradient-to-br from-secondary to-sky-600 glow-shadow-secondary">
                                    {t('contactFormSend')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* WhatsApp Form */}
                <div className="aurora-border-green rounded-2xl glow-shadow-green">
                     <div className="bg-dark/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full w-full">
                        <h3 className="text-2xl font-bold text-light text-center mb-1">{t('contactWhatsAppTitle')}</h3>
                        <p className="text-sm text-center text-gray-300 mb-6">{t('contactWhatsAppSubtitle')}</p>
                        <form onSubmit={handleWhatsappSubmit} className="space-y-6">
                            <FormInput label={t('contactWhatsAppName')} id="wa-name" name="name" type="text" value={whatsappForm.name} onChange={handleWhatsappChange} placeholder={t('contactWhatsAppName')} />
                            <FormTextarea label={t('contactWhatsAppMessage')} id="wa-message" name="message" value={whatsappForm.message} onChange={handleWhatsappChange} placeholder={t('contactWhatsAppMessage')} />
                            <div className="text-left">
                               <button type="submit" className="font-bold text-white py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:brightness-110 focus-ring bg-whatsapp">
                                    {t('contactWhatsAppSend')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-gray-200 dark:border-zinc-700">
                <h2 className="text-3xl font-bold text-dark dark:text-light text-center mb-8">{t('contactInfoTitle')}</h2>
                <div className="space-y-6 text-lg text-center">
                    <div>
                        <h3 className="font-semibold text-dark dark:text-light">{t('contactEmail')}</h3>
                        <a href="mailto:info@segim.ach.nl" className="text-gray-600 dark:text-gray-300 hover:text-primary break-all">info@segim.ach.nl</a>
                        <h3 className="font-semibold text-dark dark:text-light mt-2">{t('contactEmailSocialHelp')}</h3>
                        <a href="mailto:socialhulp@segim.ach.nl" className="text-gray-600 dark:text-gray-300 hover:text-primary break-all">socialhulp@segim.ach.nl</a>
                        <h3 className="font-semibold text-dark dark:text-light mt-2">{t('contactEmailAnimals')}</h3>
                        <a href="mailto:dieren@segim.ach.nl" className="text-gray-600 dark:text-gray-300 hover:text-primary break-all">dieren@segim.ach.nl</a>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                           <h3 className="font-semibold text-dark dark:text-light">{t('contactPhone')}</h3>
                           <a href="tel:0687846906" className="text-gray-600 dark:text-gray-300 hover:text-primary">0687846906</a>
                        </div>
                        <div>
                           <h3 className="font-semibold text-dark dark:text-light">{t('contactWhatsAppPhone')}</h3>
                           <a href="https://wa.me/31645094723" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary">+31 6 45094723</a>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold text-dark dark:text-light">{t('contactAddress')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{t('footerAddress')}</p>
                     </div>
                </div>
            </div>
        </Section>
    );
};

export default ContactPage;