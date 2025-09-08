export type Language = 'pl' | 'nl' | 'en';

// FIX: Add 'volunteering' to the Page type to allow navigation to the volunteering page.
export type Page = 'home' | 'events' | 'for-municipalities' | 'book-event' | 'for-parents' | 'sponsors' | 'impact' | 'gallery' | 'blog' | 'about-us' | 'contact' | 'policies' | 'volunteering' | 'privacy-policy' | 'cookies-policy' | 'pomoc';

export interface NavLink {
    id: Page;
    labelKey: string;
}

export interface Testimonial {
    quoteKey: string;
    authorKey: string;

    roleKey: string;
}

export interface Event {
    id: number;
    date: string; // e.g., "2024-07-20"
    coordinates: { lat: number; lon: number }; // Geographical coordinates (Latitude, Longitude)
    dateKey: string;
    cityKey: string;
    venueKey: string;
    type: 'indoor' | 'outdoor';
    descriptionKey: string;
    spots?: number;
    mapQuery: string;
    imageUrl: string;
}

export interface TeamMember {
    id: number;
    name: string;
    roleKey: string;
    imageUrl: string;
    email?: string;
    phone?: string;
}

export interface GalleryImage {
    id: number;
    src: string;
    altKey: string;
}

export interface GalleryVideo {
    id: number;
    src: string;
    posterSrc: string;
    altKey: string;
}

export interface SponsorshipPackage {
    id: 'bronze' | 'silver' | 'gold' | 'city_partner';
    titleKey: string;
    priceKey: string;
    featuresKeys: string[];
    highlight?: boolean;
}

export interface SponsorLogo {
    name: string;
    logoSrc: string;
    href: string;
}

export interface EventPackageCategory {
    id: string;
    titleKey: string;
    icon: string;
    itemsKeys: { key: string; icon: string }[];
    imageUrl: string;
}

export interface RSVPFormData {
  guardianName: string;
  email: string;
  phone: string;
  address: string;
  childName: string;
  childAge: string;
  disabilityType: 'physical' | 'sensory' | 'intellectual' | 'other' | '';
  disabilityOther: string;
  needsWheelchair: boolean;
  needsQuietZone: boolean;
  needsSignLanguage: boolean;
  needsAssistant: boolean;
  needsOtherCheck: boolean;
  needsOtherText: string;
  allergies: string;
  meds: string;
  iceContact: string;
  eventId: string;
  arrivalTime: string;
  extraGuests: string;
  consentParticipation: boolean;
  consentFirstAid: boolean;
  consentRODO: boolean;
  consentPhoto: 'full' | 'group' | 'none' | '';
  needsToEnjoy: string;
  newsletter: boolean;
}