// Meta Pixel (Facebook Pixel) Integration
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

import { META_PIXEL_CONFIG } from '../config/metaPixel';

// Get Meta Pixel ID from config
const META_PIXEL_ID = META_PIXEL_CONFIG.PIXEL_ID;

// Initialize Meta Pixel
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;

  // Check if fbq is already loaded
  if (window.fbq) return;

  // Create fbq function
  window.fbq = function () {
    window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
  };

  // Initialize fbq
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  window.fbq.queue = [];

  // Create script element
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';

  // Insert script
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  // Initialize pixel
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.fbq) return;

  window.fbq('track', 'PageView', {
    page_title: document.title,
    page_location: url,
  });
};

export interface MetaUserData {
  em?: string; // Email
  ph?: string; // Phone
  fn?: string; // First Name
  ln?: string; // Last Name
  ct?: string; // City
  st?: string; // State
  zp?: string; // Zip
  country?: string; // Country
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>, userData?: MetaUserData) => {
  if (typeof window === 'undefined' || !window.fbq) return;

  if (userData) {
    window.fbq('track', eventName, parameters, userData);
  } else {
    window.fbq('track', eventName, parameters);
  }
};

// Photobooth-specific event tracking
export const trackPhotoboothEvents = {
  // Lead generation events
  leadGenerated: (source: string, location?: string, userData?: MetaUserData) => {
    trackEvent('Lead', {
      content_name: 'Photobooth Lead',
      content_category: 'Lead Generation',
      value: 1,
      currency: 'CAD',
      source: source,
      location: location || 'Toronto',
    }, userData);
  },

  // Form submissions
  formSubmitted: (formType: string, location?: string, userData?: MetaUserData) => {
    trackEvent('Lead', {
      content_name: `${formType} Form Submission`,
      content_category: 'Form Submission',
      value: 1,
      currency: 'CAD',
      form_type: formType,
      location: location || 'Toronto',
    }, userData);
  },

  // Package views
  packageViewed: (packageType: string) => {
    trackEvent('ViewContent', {
      content_name: `${packageType} Package`,
      content_category: 'Package View',
      value: 1,
      currency: 'CAD',
      package_type: packageType,
    });
  },

  // Contact button clicks
  contactClicked: (page: string, location?: string) => {
    trackEvent('Contact', {
      content_name: 'Contact Button Click',
      content_category: 'Contact',
      value: 1,
      currency: 'CAD',
      page: page,
      location: location || 'Toronto',
    });
  },

  // Booking inquiries
  bookingInquiry: (eventType: string, location?: string, userData?: MetaUserData) => {
    trackEvent('InitiateCheckout', {
      content_name: `${eventType} Booking Inquiry`,
      content_category: 'Booking',
      value: 1,
      currency: 'CAD',
      event_type: eventType,
      location: location || 'Toronto',
    }, userData);
  },

  // Video views
  videoViewed: (videoType: string) => {
    trackEvent('ViewContent', {
      content_name: `${videoType} Video`,
      content_category: 'Video View',
      value: 1,
      currency: 'CAD',
      video_type: videoType,
    });
  },

  // Gallery views
  galleryViewed: (galleryType: string) => {
    trackEvent('ViewContent', {
      content_name: `${galleryType} Gallery`,
      content_category: 'Gallery View',
      value: 1,
      currency: 'CAD',
      gallery_type: galleryType,
    });
  },

  // Phone number clicks
  phoneClicked: (page: string, location?: string) => {
    trackEvent('Contact', {
      content_name: 'Phone Number Click',
      content_category: 'Phone Contact',
      value: 1,
      currency: 'CAD',
      page: page,
      location: location || 'Toronto',
    });
  },

  // Email clicks
  emailClicked: (page: string, location?: string) => {
    trackEvent('Contact', {
      content_name: 'Email Click',
      content_category: 'Email Contact',
      value: 1,
      currency: 'CAD',
      page: page,
      location: location || 'Toronto',
    });
  },
};

// GTA cities for location tracking
export const GTA_CITIES = [
  'Toronto',
  'Ajax',
  'Oshawa',
  'Whitby',
  'Markham',
  'Vaughan',
  'Courtice',
  'Etobicoke',
  'King City',
  'Pickering',
  'North York',
  'Bowmanville',
  'Mississauga',
  'Richmond Hill',
  'East Gwillimbury',
  'Barrie',
  'Whitchurch-Stouffville'
];

// Track location-based events
export const trackLocationEvent = (eventName: string, city: string, additionalParams?: Record<string, any>) => {
  const params = {
    location: city,
    region: 'GTA',
    province: 'Ontario',
    country: 'Canada',
    ...additionalParams
  };

  trackEvent(eventName, params);
}; 