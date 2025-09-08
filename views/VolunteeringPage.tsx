
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Section from '../components/common/Section';
import PageTitle from '../components/common/PageTitle';
import TeamCarousel from '../components/common/TeamCarousel';
import { volunteers } from '../constants';

const initialFormData = {
    fullName: '',
    age: '',
    city: '',
    phone: '',
    email: '',
    availability: 'weekendy',
    roles: [] as string[],
    otherRole: '',
    experience: '',
    consentEvents: false,
    consentRODO: false,
    consentNewsletter: false,
};

type FormData = typeof initialFormData;

interface VolunteerFormProps {
    type: 'whatsapp' | 'email';
    onSubmit: (data: FormData) => void;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({ type, onSubmit }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isOtherRole, setIsOtherRole] = useState(false);

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === 'other') {
            setIsOtherRole(checked);
        }
        setFormData(prev => ({
            ...prev,
            roles: checked ? [...prev.roles, value] : prev.roles.filter(role => role !== value),
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        setFormData(prev => ({
            ...prev,
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ formType: type, data: formData });
        onSubmit(formData);
    };

    const theme = {
        whatsapp: {
            bg: 'bg-green-50 dark:bg-green-900/20',
            border: 'border-green-400 dark:border-green-700',
            text: 'text-green-800 dark:text-green-300',
            button: 'bg-green-600 hover:bg-green-700',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.001 2C5.583 2 2 5.582 2 9.999c0 1.604.465 3.11 1.28 4.439l-1.02 3.684 3.79-1.011c1.284.73 2.768 1.157 4.31 1.157 4.418 0 7.999-3.582 7.999-7.998C18 5.582 14.418 2 10.001 2zM6.999 13.998l-.24-.403c-1.06-.593-1.742-1.716-1.742-2.923 0-1.803 1.464-3.266 3.266-3.266 1.803 0 3.267 1.463 3.267 3.266 0 .015 0 .029-.001.043l-.01.125-.03.25.105.06c.21.12.43.18.65.18h.125c.42 0 .82-.12 1.16-.36l.24-.16.32.24c.48.36 1.02.52 1.56.46l.28-.03c.09-.01.18-.02.27-.04l.12-.03c.09-.03.18-.06.27-.09l.12-.04c.06-.03.12-.06.18-.09h.03c.06-.03.12-.07.18-.1.06-.03.12-.07.18-.1l.09-.06c.06-.04.12-.09.18-.13l.06-.05c.06-.04.12-.09.18-.15l.06-.06c.06-.06.12-.12.18-.18l.03-.03c.06-.06.12-.12.18-.18.06-.06.12-.12.18-.18.03-.03.06-.06.09-.09l.06-.06c.04-.06.09-.12.13-.18l.06-.09c.04-.06.09-.12.13-.18.03-.06.06-.12.09-.18l.04-.09c.03-.06.06-.12.09-.18.01-.03.03-.06.04-.09l.03-.09c.01-.03.03-.06.04-.09v-.03c.01-.03.03-.06.04-.09.01-.03.01-.06.02-.09.01-.03.01-.06.02-.09v-.03c.01-.03.01-.06.02-.09.01-.03.01-.06.01-.09v-.03c0-.03.01-.06.01-.09.01-.03.01-.06.01-.09v-.03c0-.03.01-.06.01-.09 0-.03 0-.06.01-.09v-.03c0-.03 0-.06.01-.09 0-.03 0-.06 0-.09V10c0-1.803-1.464-3.266-3.266-3.266-1.803 0-3.267 1.463-3.267 3.266 0 1.207.682 2.33 1.742 2.923l.24.403z"/></svg>
        },
        email: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            border: 'border-blue-400 dark:border-blue-700',
            text: 'text-blue-800 dark:text-blue-300',
            button: 'bg-blue-600 hover:bg-blue-700',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
        }
    };
    const currentTheme = theme[type];

    return (
        <div className={`rounded-2xl shadow-lg p-6 border ${currentTheme.bg} ${currentTheme.border}`}>
            <h3 className={`text-2xl font-bold text-center mb-4 ${currentTheme.text}`}>{t(type === 'whatsapp' ? 'volunteerFormWhatsAppTitle' : 'volunteerFormEmailTitle')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="fullName" onChange={handleChange} placeholder={t('volunteerFormFullName')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
                <div className="grid grid-cols-2 gap-4">
                    <input name="age" type="number" min="16" max="70" onChange={handleChange} placeholder={t('volunteerFormAge')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
                    <input name="city" onChange={handleChange} placeholder={t('volunteerFormCity')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
                </div>
                <input name="phone" type="tel" onChange={handleChange} placeholder={t(type === 'whatsapp' ? 'volunteerFormPhone' : 'volunteerFormPhoneOptional')} required={type === 'whatsapp'} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
                <input name="email" type="email" onChange={handleChange} placeholder={t(type === 'email' ? 'volunteerFormEmail' : 'volunteerFormEmailOptional')} required={type === 'email'} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
                
                <div>
                    <label className="block text-sm font-medium mb-1">{t('volunteerFormAvailability')}</label>
                    <select name="availability" onChange={handleChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600">
                        <option value="weekendy">{t('volunteerFormAvailabilityOpt1')}</option>
                        <option value="dni powszednie">{t('volunteerFormAvailabilityOpt2')}</option>
                        <option value="elastycznie">{t('volunteerFormAvailabilityOpt3')}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">{t('volunteerFormRole')}</label>
                    <div className="space-y-2">
                        {['volunteerFormRoleOpt1', 'volunteerFormRoleOpt2', 'volunteerFormRoleOpt3', 'volunteerFormRoleOpt4'].map(key => (
                             <label key={key} className="flex items-center gap-2"><input type="checkbox" name="roles" value={t(key as any)} onChange={handleRoleChange} /> {t(key as any)}</label>
                        ))}
                         <label className="flex items-center gap-2"><input type="checkbox" name="roles" value="other" onChange={handleRoleChange} /> {t('volunteerFormRoleOpt5')}</label>
                         {isOtherRole && <textarea name="otherRole" onChange={handleChange} placeholder={t('volunteerFormOtherPlaceholder')} className="w-full mt-2 p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />}
                    </div>
                </div>

                <textarea name="experience" onChange={handleChange} placeholder={t('volunteerFormExperience')} rows={3} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600"></textarea>

                <div>
                    <label className="block text-sm font-medium mb-2">{t('volunteerFormConsents')}</label>
                     <div className="space-y-2">
                         <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="consentEvents" onChange={handleChange} required className="mt-1" />{t('volunteerFormConsentEvents')}</label>
                         <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="consentRODO" onChange={handleChange} required className="mt-1" />{t('volunteerFormConsentRODO')}</label>
                         <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="consentNewsletter" onChange={handleChange} className="mt-1" />{t('volunteerFormConsentNewsletter')}</label>
                    </div>
                </div>

                <button type="submit" className={`w-full flex items-center justify-center font-bold text-white py-3 px-6 rounded-full transition-colors duration-300 ${currentTheme.button}`}>
                    {currentTheme.icon}
                    {t(type === 'whatsapp' ? 'volunteerFormSubmitWhatsApp' : 'volunteerFormSubmitEmail')}
                </button>
            </form>
        </div>
    );
};


const VolunteeringPage: React.FC = () => {
    const { t } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = (formData: FormData) => {
                setLoading(true);
                setError(null);
                fetch('/api/send-mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'volunteer', payload: formData })
                })
                    .then(async res => {
                        if (!res.ok) {
                            const d = await res.json();
                            throw new Error(d.error || 'Błąd wysyłki');
                        }
                        setIsSubmitted(true);
                    })
                    .catch(e => {
                        setError(e.message || 'Błąd wysyłki');
                    })
                    .finally(() => setLoading(false));
    };

    if (isSubmitted) {
        return (
            <Section>
                <div className="text-center max-w-lg mx-auto py-16">
                     <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold text-primary mb-2">{t('volunteerFormSuccessTitle')}</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{t('volunteerFormSuccessMessage')}</p>
                </div>
            </Section>
        );
    } else if (loading) {
        return (
            <Section>
                <div className="text-center text-primary p-16">Wysyłanie zgłoszenia...</div>
            </Section>
        );
    } else if (error) {
        return (
            <Section>
                <div className="text-center text-red-600 p-16">{error}</div>
            </Section>
        );
    }

    return (
        <>
            <Section>
                <PageTitle title={t('volunteerPageTitle')} subtitle={t('volunteerPageLead')} />
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
                    <VolunteerForm type="whatsapp" onSubmit={handleFormSubmit} />
                    <VolunteerForm type="email" onSubmit={handleFormSubmit} />
                </div>
            </Section>
            <Section className="bg-dark dark:bg-black overflow-hidden py-20 md:py-28">
                 <h2 className="text-center text-4xl font-extrabold text-white mb-16">{t('aboutUsTeamVolunteersTitle')}</h2>
                 <TeamCarousel members={volunteers} />
            </Section>
        </>
    );
};

export default VolunteeringPage;