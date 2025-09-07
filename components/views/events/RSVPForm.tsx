import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Event, RSVPFormData } from '../../../types';
import ProgressBar from '../../common/ProgressBar';
import Button from '../../common/Button';

interface RSVPFormProps {
  event: Event;
  onClose: () => void;
}

const initialFormData: RSVPFormData = {
  guardianName: '', email: '', phone: '', address: '',
  childName: '', childAge: '',
  disabilityType: '', disabilityOther: '',
  needsWheelchair: false, needsQuietZone: false, needsSignLanguage: false, needsAssistant: false, needsOtherCheck: false, needsOtherText: '',
  allergies: '', meds: '', iceContact: '',
  eventId: '', arrivalTime: '', extraGuests: '0',
  consentParticipation: false, consentFirstAid: false, consentRODO: false, consentPhoto: '',
  needsToEnjoy: '', newsletter: false,
};

const RSVPForm: React.FC<RSVPFormProps> = ({ event, onClose }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RSVPFormData>({ ...initialFormData, eventId: event.id.toString() });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in effect
    setIsVisible(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const validationSchema: Record<number, (keyof RSVPFormData)[]> = {
    1: ['guardianName', 'email', 'phone'],
    2: ['childName', 'childAge', 'disabilityType'],
    3: ['consentParticipation', 'consentFirstAid', 'consentRODO', 'consentPhoto'],
  };

  const isStepValid = useMemo(() => {
    const fieldsToValidate = validationSchema[currentStep] || [];
    return fieldsToValidate.every(field => {
        const value = formData[field];
        if(typeof value === 'boolean') return value === true;
        if(typeof value === 'string') return value.trim() !== '';
        return false;
    });
  }, [formData, currentStep]);

  const handleNext = () => currentStep < 4 && setCurrentStep(s => s + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(s => s - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const stepLabels = [t('rsvpStep1'), t('rsvpStep2'), t('rsvpStep3'), t('rsvpStep4')];

  const renderContent = () => {
    if(submitted) {
        return (
            <div className="text-center p-8 flex flex-col items-center justify-center h-full">
                <div className="text-8xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-primary mb-2">{t('rsvpSuccessTitle')}</h2>
                <p className="text-dark dark:text-light/80 max-w-md">{t('rsvpSuccessMessage')}</p>
                 <div className="mt-8">
                    <Button variant="primary" onClick={handleClose}>Zamknij</Button>
                </div>
            </div>
        )
    }
    
    switch (currentStep) {
      case 1: return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t('rsvpGuardianInfo')}</h3>
          <input name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder={t('rsvpParentName')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('rsvpEmail')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t('rsvpPhone')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder={t('rsvpAddress')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
        </div>
      );
      case 2: return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t('rsvpChildInfo')}</h3>
          <input name="childName" value={formData.childName} onChange={handleChange} placeholder={t('rsvpChildName')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
          <input name="childAge" type="number" value={formData.childAge} onChange={handleChange} placeholder={t('rsvpChildAge')} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
          <select name="disabilityType" value={formData.disabilityType} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600">
            <option value="" disabled>{t('rsvpDisabilityType')}</option>
            <option value="physical">{t('rsvpDisabilityTypePhysical')}</option>
            <option value="sensory">{t('rsvpDisabilityTypeSensory')}</option>
            <option value="intellectual">{t('rsvpDisabilityTypeIntellectual')}</option>
            <option value="other">{t('rsvpDisabilityTypeOther')}</option>
          </select>
          {formData.disabilityType === 'other' && <input name="disabilityOther" value={formData.disabilityOther} onChange={handleChange} placeholder={t('rsvpDisabilityOtherPlaceholder')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />}
          
          <h3 className="text-lg font-semibold pt-4">{t('rsvpAccessibilityNeeds')}</h3>
          <label className="flex items-center gap-2"><input type="checkbox" name="needsWheelchair" checked={formData.needsWheelchair} onChange={handleChange} /> {t('rsvpNeedWheelchair')}</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="needsQuietZone" checked={formData.needsQuietZone} onChange={handleChange} /> {t('rsvpNeedQuietZone')}</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="needsSignLanguage" checked={formData.needsSignLanguage} onChange={handleChange} /> {t('rsvpNeedSignLanguage')}</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="needsAssistant" checked={formData.needsAssistant} onChange={handleChange} /> {t('rsvpNeedAssistant')}</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="needsOtherCheck" checked={formData.needsOtherCheck} onChange={handleChange} /> {t('rsvpNeedOther')}</label>
          {formData.needsOtherCheck && <input name="needsOtherText" value={formData.needsOtherText} onChange={handleChange} placeholder={t('rsvpNeedOtherPlaceholder')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />}
          
          <h3 className="text-xl font-bold pt-4">{t('rsvpHealthInfo')}</h3>
          <textarea name="allergies" value={formData.allergies} onChange={handleChange} placeholder={t('rsvpAllergies')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
          <textarea name="meds" value={formData.meds} onChange={handleChange} placeholder={t('rsvpMeds')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
          <input name="iceContact" value={formData.iceContact} onChange={handleChange} placeholder={t('rsvpIceContact')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
        </div>
      );
      case 3: return (
         <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('rsvpEventInfo')}</h3>
            <p className="p-2 border rounded bg-gray-100 dark:bg-zinc-800 dark:border-zinc-600">{t(event.cityKey as any)} - {t(event.dateKey as any)}</p>
            <input name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} placeholder={t('rsvpArrivalTime')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
            <input name="extraGuests" type="number" value={formData.extraGuests} onChange={handleChange} placeholder={t('rsvpExtraGuests')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />

            <h3 className="text-xl font-bold pt-4">{t('rsvpConsents')}</h3>
            <label className="flex items-start gap-2"><input type="checkbox" name="consentParticipation" checked={formData.consentParticipation} onChange={handleChange} required className="mt-1" /> {t('rsvpConsentParticipation')}</label>
            <label className="flex items-start gap-2"><input type="checkbox" name="consentFirstAid" checked={formData.consentFirstAid} onChange={handleChange} required className="mt-1" /> {t('rsvpConsentFirstAid')}</label>
            <label className="flex items-start gap-2"><input type="checkbox" name="consentRODO" checked={formData.consentRODO} onChange={handleChange} required className="mt-1" /> {t('rsvpConsentRODO')}</label>

            <h4 className="text-lg font-semibold pt-2">{t('rsvpConsentPhoto')}</h4>
             <div className="space-y-2">
                <label className="flex items-center gap-2"><input type="radio" name="consentPhoto" value="full" checked={formData.consentPhoto === 'full'} onChange={handleChange} required /> {t('rsvpConsentPhotoFull')}</label>
                <label className="flex items-center gap-2"><input type="radio" name="consentPhoto" value="group" checked={formData.consentPhoto === 'group'} onChange={handleChange} /> {t('rsvpConsentPhotoGroup')}</label>
                <label className="flex items-center gap-2"><input type="radio" name="consentPhoto" value="none" checked={formData.consentPhoto === 'none'} onChange={handleChange} /> {t('rsvpConsentPhotoNone')}</label>
            </div>
             
            <h3 className="text-xl font-bold pt-4">{t('rsvpAdditionalInfo')}</h3>
            <textarea name="needsToEnjoy" value={formData.needsToEnjoy} onChange={handleChange} placeholder={t('rsvpNeedsToEnjoy')} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-600" />
            <label className="flex items-center gap-2"><input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} /> {t('rsvpNewsletter')}</label>
         </div>
      );
      case 4: return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('rsvpSummary')}</h2>
            <p>{t('rsvpSummaryConfirm')}</p>
            <div className="text-sm space-y-2 max-h-64 overflow-y-auto pr-2">
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key}><strong>{t( `rsvp${key.charAt(0).toUpperCase() + key.slice(1)}` as any, key)}:</strong> {value.toString()}</div>
                ))}
            </div>
        </div>
      );
      default: return null;
    }
  }

  return createPortal(
    <div className={`rsvp-modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`rsvp-modal-container text-dark dark:text-light`} onClick={e => e.stopPropagation()}>
        <div className="p-4 sm:p-6 flex justify-between items-center border-b dark:border-zinc-700">
            <h2 className="text-xl sm:text-2xl font-bold">{t('rsvpModalTitle')}</h2>
            <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 focus-ring">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <div className="py-4 sm:py-6 border-b dark:border-zinc-700">
            <ProgressBar totalSteps={4} currentStep={currentStep} stepLabels={stepLabels} />
        </div>

        <div className="flex-grow p-4 sm:p-8 overflow-y-auto">
            {renderContent()}
        </div>
        
        {!submitted && (
            <div className="p-4 sm:p-6 flex justify-between items-center border-t dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900">
                <Button variant="secondary" onClick={handleBack} disabled={currentStep === 1} className={currentStep === 1 ? '!bg-gray-400 dark:!bg-zinc-700 !cursor-not-allowed' : ''}>
                    {t('rsvpButtonBack')}
                </Button>
                {currentStep < 4 ? (
                    <Button variant="primary" onClick={handleNext} disabled={!isStepValid} className={!isStepValid ? '!bg-gray-400 dark:!bg-zinc-700 !cursor-not-allowed' : ''}>
                        {t('rsvpButtonNext')}
                    </Button>
                ) : (
                    <Button variant="accent" onClick={handleSubmit}>
                        {t('rsvpButtonSubmit')}
                    </Button>
                )}
            </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default RSVPForm;