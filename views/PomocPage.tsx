import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { campaigns } from '../constants';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import Accordion from '../components/common/Accordion';
import Carousel from '../components/common/Carousel';

type DonationCategory = 'dzieci' | 'mamy' | 'zwierzęta';
type Campaign = typeof campaigns[0];

const PomocPage: React.FC = () => {
    const { t } = useLanguage();
    
    const [selectedDonation, setSelectedDonation] = useState<{ amount: number; category: DonationCategory | '' }>({ amount: 0, category: '' });
    const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
    const [modalData, setModalData] = useState<Campaign | null>(null);

    const quickDonateRef = useRef<HTMLDivElement>(null);
    const inKindDonateRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleCategorySelect = (amount: number, category: DonationCategory) => {
        setSelectedDonation({ amount, category });
        setTimeout(() => {
            scrollToSection(quickDonateRef);
        }, 100);
    };
    
    const handlePosterCtaClick = () => {
        handleCategorySelect(25, 'zwierzęta');
    };

    const showToast = (message: string) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, 2000);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            showToast(t('pomocQuickDonateCopied'));
        });
    };

    return (
        <div className="bg-light dark:bg-dark">
            <DonateHero 
                onDonateClick={() => scrollToSection(quickDonateRef)}
                onInKindClick={() => scrollToSection(inKindDonateRef)}
            />
            <PosterSection onCtaClick={handlePosterCtaClick} />
            <DonateCategories 
                onSelect={handleCategorySelect} 
                onInKindClick={() => scrollToSection(inKindDonateRef)} 
            />
            <QuickDonate 
                ref={quickDonateRef} 
                selectedDonation={selectedDonation} 
                onDonationChange={setSelectedDonation}
                copyToClipboard={copyToClipboard}
            />
            <InKindDonate ref={inKindDonateRef} />
            <CampaignGrid onSelect={handleCategorySelect} onDetailsClick={setModalData} />
            <TransparencySection />
            <FAQDonors />
            <DonateFooter />
            
            <CampaignDetailsModal 
                campaign={modalData}
                onClose={() => setModalData(null)}
                onSelect={handleCategorySelect}
            />
            
            <div 
                aria-live="assertive" 
                className={`fixed bottom-5 right-5 z-[1000] transition-all duration-300 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
                {toast.show && (
                    <div className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-lg">
                        {toast.message}
                    </div>
                )}
            </div>
        </div>
    );
};

const PosterSection: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
    const { t } = useLanguage();
    return (
        <Section className="bg-light dark:bg-zinc-800">
            <div className="relative max-w-4xl mx-auto p-8 bg-white dark:bg-dark rounded-2xl shadow-2xl border-4 border-dark dark:border-light transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center transform rotate-12 shadow-md z-10">
                    <span className="text-3xl" role="img" aria-label="pin">📌</span>
                </div>
                <h2 className="text-3xl font-extrabold text-primary mb-3">{t('pomocPosterTitle')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('pomocPosterText')}</p>
                <Button variant="accent" onClick={onCtaClick}>{t('pomocPosterCta')}</Button>
            </div>
        </Section>
    );
};

const CampaignDetailsModal: React.FC<{ campaign: Campaign | null, onClose: () => void, onSelect: (amount: number, category: DonationCategory) => void }> = ({ campaign, onClose, onSelect }) => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(campaign) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [campaign]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    if (!campaign) return null;

    const amounts = [10, 25, 50, 100];

    return createPortal(
        <div className={`rsvp-modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose} role="dialog" aria-modal="true">
            <div className={`rsvp-modal-container text-dark dark:text-light`} onClick={e => e.stopPropagation()}>
                <div className="p-4 sm:p-6 flex justify-between items-center border-b dark:border-zinc-700">
                    <h2 className="text-xl sm:text-2xl font-bold">{t('pomocModalTitle')}</h2>
                    <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 focus-ring">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
                    <img src={campaign.imageUrl} alt={t(campaign.titleKey as any)} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h3 className="text-3xl font-extrabold text-primary">{t(campaign.titleKey as any)}</h3>
                    <div className="my-4">
                        <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-4">
                            <div className="bg-accent h-4 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ width: `${(campaign.collected / campaign.goal) * 100}%` }}>
                                {Math.round((campaign.collected / campaign.goal) * 100)}%
                            </div>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span>{t('pomocCampaignCollected')}: {campaign.collected}€</span>
                            <span>{t('pomocModalGoal')}: {campaign.goal}€</span>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{t(campaign.descKey as any)}</p>
                </div>
                <div className="p-4 sm:p-6 border-t dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900">
                    <h4 className="font-semibold text-center mb-3">{t('pomocModalDonateNow')}</h4>
                    <div className="grid grid-cols-4 gap-2">
                         {amounts.map(amount => (
                            <button key={amount} onClick={() => { handleClose(); onSelect(amount, campaign.id as DonationCategory); }} className="py-3 px-2 bg-accent/10 text-accent font-bold rounded-lg hover:bg-accent/20 transition-colors focus-ring">
                                {amount} €
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};


const DonateHero: React.FC<{ onDonateClick: () => void; onInKindClick: () => void; }> = ({ onDonateClick, onInKindClick }) => {
    const { t } = useLanguage();
    const heroImages = [
        "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg", // happy kid
        "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg", // mom and kid
        "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg", // pets
        "https://images.pexels.com/photos/8434771/pexels-photo-8434771.jpeg" // diverse kids playing
    ];
    return (
        <Section className="py-0 relative h-[60vh] min-h-[500px] w-full text-white flex items-center justify-center text-center">
             <div className="absolute inset-0 z-0">
                 <Carousel images={heroImages} autoPlay={true} interval={5000} showControls={false} showDots={false} />
                 <div className="absolute inset-0 bg-dark/70"></div>
            </div>
            <div className="relative z-10 p-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>{t('pomocHeroTitle')}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.7)' }}>{t('pomocHeroSubtitle')}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" onClick={onDonateClick}>{t('pomocHeroCtaDonate')}</Button>
                    <Button variant="secondary" onClick={onInKindClick}>{t('pomocHeroCtaInKind')}</Button>
                </div>
            </div>
        </Section>
    );
};

const DonateCategories: React.FC<{ onSelect: (amount: number, category: DonationCategory) => void; onInKindClick: () => void; }> = ({ onSelect, onInKindClick }) => {
    const { t } = useLanguage();
    const categories: { id: DonationCategory, titleKey: any, descKey: any, progress: number }[] = [
        { id: 'dzieci', titleKey: 'pomocCatTitleDzieci', descKey: 'pomocCatDescDzieci', progress: 65 },
        { id: 'mamy', titleKey: 'pomocCatTitleMamy', descKey: 'pomocCatDescMamy', progress: 40 },
        { id: 'zwierzęta', titleKey: 'pomocCatTitleZwierzeta', descKey: 'pomocCatDescZwierzeta', progress: 80 },
    ];
    const amounts = [10, 20, 50, 100];

    return (
        <Section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map(cat => (
                    <div key={cat.id} className="benefit-card rounded-2xl">
                        <div className="benefit-card-content p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-dark dark:text-light mb-2">{t(cat.titleKey)}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{t(cat.descKey)}</p>
                            <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5 mb-1">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${cat.progress}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mb-4">{`${t('pomocCatProgressLabel')}: ${cat.progress}%`}</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {amounts.map(amount => (
                                    <button key={amount} onClick={() => onSelect(amount, cat.id)} className="py-2 px-3 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors focus-ring">
                                        {amount} €
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                               <Button onClick={() => onSelect(50, cat.id)} variant="primary" className="w-full !py-2 !text-sm">{t('pomocCatButtonDonate')}</Button>
                               <Button onClick={onInKindClick} variant="secondary" className="w-full !py-2 !text-sm">{t('pomocCatButtonInKind')}</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const QuickDonate = React.forwardRef<HTMLDivElement, { selectedDonation: { amount: number; category: string }, onDonationChange: Function, copyToClipboard: (text: string) => void }>((props, ref) => {
    const { selectedDonation, onDonationChange, copyToClipboard } = props;
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ amount: '', category: '', name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (selectedDonation.amount > 0 && selectedDonation.category) {
            setFormData(prev => ({ ...prev, amount: selectedDonation.amount.toString(), category: selectedDonation.category }));
        }
    }, [selectedDonation]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                setLoading(true);
                setError(null);
                setSuccess(false);
                fetch('/api/send-mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'quick-donate', payload: formData })
                })
                    .then(async res => {
                        if (!res.ok) {
                            const d = await res.json();
                            throw new Error(d.error || 'Błąd wysyłki');
                        }
                        setSuccess(true);
                        onDonationChange({ amount: 0, category: '' });
                        setFormData({ amount: '', category: '', name: '', email: '' });
                    })
                    .catch(e => {
                        setError(e.message || 'Błąd wysyłki');
                    })
                    .finally(() => setLoading(false));
    };

    return (
                <Section id="quick-donate" ref={ref} className="bg-white dark:bg-zinc-900">
                        <h2 className="text-3xl font-extrabold text-center text-dark dark:text-light mb-8">{t('pomocQuickDonateTitle')}</h2>
                        <div className="max-w-2xl mx-auto p-8 bg-light dark:bg-dark rounded-2xl shadow-inner">
                                {success ? (
                                    <div className="text-center text-green-600 p-8">Dziękujemy za darowiznę! 🎉</div>
                                ) : loading ? (
                                    <div className="text-center text-primary p-8">Wysyłanie zgłoszenia...</div>
                                ) : error ? (
                                    <div className="text-center text-red-600 p-8">{error}</div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="amount">{t('pomocQuickDonateAmount')}</label>
                                                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} required placeholder="50" className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring" />
                                            </div>
                                            <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="category">{t('pomocQuickDonateCategory')}</label>
                                                    <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring">
                                                            <option value="" disabled>{t('pomocQuickDonateCategorySelect')}</option>
                                                            <option value="dzieci">{t('pomocCatTitleDzieci')}</option>
                                                            <option value="mamy">{t('pomocCatTitleMamy')}</option>
                                                            <option value="zwierzęta">{t('pomocCatTitleZwierzeta')}</option>
                                                    </select>
                                            </div>
                                            <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="name">{t('pomocQuickDonateName')}</label>
                                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring" />
                                            </div>
                                            <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="email">{t('pomocQuickDonateEmail')}</label>
                                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring" />
                                            </div>
                                            <Button type="submit" variant="accent" className="w-full" disabled={loading}>{t('pomocQuickDonateSubmit')}</Button>
                                    </form>
                                )}
                        </div>
                </Section>
    );
});
QuickDonate.displayName = 'QuickDonate';

const InKindDonate = React.forwardRef<HTMLDivElement>((props, ref) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'items' | 'pets'>('items');
    const [submitted, setSubmitted] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [otherItemsChecked, setOtherItemsChecked] = useState(false);
    const [otherPetsChecked, setOtherPetsChecked] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Section id="inkind-donate" ref={ref}>
            {submitted ? (
                 <div className="text-center p-8 bg-green-100 dark:bg-green-900/50 rounded-2xl max-w-2xl mx-auto">
                    <p className="text-2xl mb-2">🎉</p>
                    <p className="font-semibold text-green-800 dark:text-green-200">{t('pomocInKindSuccess')}</p>
                 </div>
            ) : (
                <>
                    <h2 className="text-3xl font-extrabold text-center text-dark dark:text-light">{t('pomocInKindTitle')}</h2>
                    <p className="mt-2 text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">{t('pomocInKindLead')}</p>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-dark p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700">
                        <div role="tablist" className="flex border-b border-gray-200 dark:border-zinc-600 mb-6">
                            <button role="tab" aria-selected={activeTab === 'items'} onClick={() => setActiveTab('items')} className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'items' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-dark dark:hover:text-light'}`}>{t('pomocInKindTabItems')}</button>
                            <button role="tab" aria-selected={activeTab === 'pets'} onClick={() => setActiveTab('pets')} className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'pets' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-dark dark:hover:text-light'}`}>{t('pomocInKindTabPets')}</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {activeTab === 'items' && (
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindItemsCheck1')}</label>
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindItemsCheck2')}</label>
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindItemsCheck3')}</label>
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindItemsCheck4')}</label>
                                    <div className="flex items-center gap-2">
                                       <input type="checkbox" checked={otherItemsChecked} onChange={(e) => setOtherItemsChecked(e.target.checked)}/> 
                                       <label>{t('pomocInKindItemsCheckOther')}</label>
                                       {otherItemsChecked && <input type="text" placeholder={t('pomocInKindOtherPlaceholder')} className="ml-1 flex-grow p-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600" />}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'pets' && (
                                 <div className="space-y-2">
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindPetsCheck1')}</label>
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindPetsCheck2')}</label>
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindPetsCheck3')}</label>
                                    <label className="flex items-center gap-2"><input type="checkbox"/> {t('pomocInKindPetsCheck4')}</label>
                                     <div className="flex items-center gap-2">
                                       <input type="checkbox" checked={otherPetsChecked} onChange={(e) => setOtherPetsChecked(e.target.checked)}/> 
                                       <label>{t('pomocInKindPetsCheckOther')}</label>
                                       {otherPetsChecked && <input type="text" placeholder={t('pomocInKindOtherPlaceholder')} className="ml-1 flex-grow p-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600" />}
                                    </div>
                                </div>
                            )}
                            <hr className="!my-6 border-gray-200 dark:border-zinc-600"/>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input placeholder={t('pomocInKindCity')} required className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring"/>
                                <select required className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring">
                                    <option value="" disabled selected>{t('pomocInKindDelivery')}</option>
                                    <option>{t('pomocInKindDeliveryOption1')}</option>
                                    <option>{t('pomocInKindDeliveryOption2')}</option>
                                    <option>{t('pomocInKindDeliveryOption3')}</option>
                                </select>
                            </div>
                            <textarea placeholder={t('pomocInKindDescription')} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring"></textarea>
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('pomocInKindPhoto')}</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"/>
                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium mb-1">{t('pomocInKindImagePreview')}</p>
                                        <img src={imagePreview} alt="Podgląd" className="max-w-xs h-auto rounded-lg shadow-md" />
                                    </div>
                                )}
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <input type="email" placeholder={t('pomocInKindEmail')} required className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring"/>
                                <input type="tel" placeholder={t('pomocInKindPhone')} className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 focus-ring"/>
                            </div>
                            <Button type="submit" variant="primary" className="w-full">{t('pomocInKindSubmit')}</Button>
                        </form>
                    </div>
                </>
            )}
        </Section>
    );
});
InKindDonate.displayName = 'InKindDonate';


const CampaignGrid: React.FC<{ onSelect: (amount: number, category: DonationCategory) => void, onDetailsClick: (campaign: Campaign) => void }> = ({ onSelect, onDetailsClick }) => {
    const { t } = useLanguage();
    
    return (
        <Section className="bg-white dark:bg-zinc-900">
            <h2 className="text-3xl font-extrabold text-center text-dark dark:text-light mb-8">{t('pomocCampaignsTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {campaigns.map(c => (
                     <div key={c.id} className="bg-light dark:bg-dark p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700">
                        <h3 className="text-xl font-bold mb-2">{t(c.titleKey as any)}</h3>
                        <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5 mb-1">
                            <div className="bg-accent h-2.5 rounded-full" style={{ width: `${(c.collected / c.goal) * 100}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{t('pomocCampaignCollected')}: {c.collected}€ / {c.goal}€</p>
                        <div className="flex gap-2 mb-4">
                           {[10, 20, 50].map(a => <button key={a} onClick={() => onSelect(a, c.id as DonationCategory)} className="flex-1 py-2 px-2 text-sm bg-accent/10 text-accent font-semibold rounded-lg hover:bg-accent/20 transition-colors">{a}€</button>)}
                        </div>
                        <Button onClick={() => onDetailsClick(c)} variant="accent" className="w-full !py-2 !text-sm">{t('pomocCampaignDetails')}</Button>
                     </div>
                ))}
            </div>
        </Section>
    );
};

const TransparencySection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Section>
            <div className="max-w-3xl mx-auto text-center">
                 <h2 className="text-3xl font-extrabold text-dark dark:text-light">{t('pomocTransparencyTitle')}</h2>
                 <p className="mt-4 text-gray-600 dark:text-gray-400">{t('pomocTransparencyDesc')}</p>
            </div>
        </Section>
    )
}

const FAQDonors: React.FC = () => {
    const { t } = useLanguage();
    const items = [
        { title: t('pomocFaqQ1'), content: t('pomocFaqA1') },
        { title: t('pomocFaqQ2'), content: t('pomocFaqA2') },
        { title: t('pomocFaqQ3'), content: t('pomocFaqA3') },
        { title: t('pomocFaqQ4'), content: t('pomocFaqA4') },
    ];
    return (
        <Section className="bg-white dark:bg-zinc-900">
             <h2 className="text-3xl font-extrabold text-center text-dark dark:text-light mb-8">{t('pomocFaqTitle')}</h2>
             <div className="max-w-3xl mx-auto">
                <Accordion items={items} />
             </div>
        </Section>
    );
};

const DonateFooter: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Section className="bg-light dark:bg-dark">
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-dark text-light shadow-lg aurora-border">
                <div className="relative bg-dark/90 backdrop-blur-sm border border-white/10 rounded-xl p-8 grid md:grid-cols-2 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-bold mb-2">{t('pomocFooterTitle')}</h3>
                        <p className="text-gray-400 mb-4">{t('pomocFooterDesc')}</p>
                        <p><strong>IBAN:</strong> NL64INGB0006405427</p>
                        <p><strong>BIC:</strong> INGBNL2A</p>
                        <p><strong>{t('pomocQuickDonateTransferTitle')}:</strong> Darowizna - [kategoria] - [Imię/Nick]</p>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-2">{t('pomocFooterContactTitle')}</h3>
                        <p><a href="mailto:info@segim.ach.nl" className="hover:underline">info@segim.ach.nl</a></p>
                        <p>Tel: <a href="tel:0687846906" className="hover:underline">0687846906</a></p>
                        <div className="mt-4 space-x-4">
                            <a href="#" className="text-sm text-gray-400 hover:text-white">{t('pomocFooterPolicyDonations')}</a>
                            <a href="#" className="text-sm text-gray-400 hover:text-white">{t('pomocFooterAnnualReports')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default PomocPage;